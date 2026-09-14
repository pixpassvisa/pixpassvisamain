import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import Photo from "@/models/Photo";
import User from "@/models/User";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import OrderFilters from "./OrderFilters";
import OrderDetailModal from "./OrderDetailModal";
import { Package, Search, ShieldCheck } from "lucide-react";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{
    status?: string;
    q?: string;
    docType?: string;
    datePreset?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function AdminOrdersPage(props: Props) {
  const searchParams = await props.searchParams;
  const filterStatus = (searchParams?.status || "all").toLowerCase();
  const filterSearch = (searchParams?.q || "").trim().toLowerCase();
  const filterDocType = (searchParams?.docType || "all").toLowerCase();
  const filterDatePreset = (searchParams?.datePreset || "all").toLowerCase();
  const filterStartDate = searchParams?.startDate || "";
  const filterEndDate = searchParams?.endDate || "";

  await dbConnect();

  // 1. Fetch all orders
  const rawOrders = await Order.find().sort({ createdAt: -1 }).lean();
  const orderIds = rawOrders.map((o: any) => o._id);

  // 2. Fetch associated payments
  const rawPayments = await Payment.find({ orderId: { $in: orderIds } }).lean();

  // 3. Fetch associated photos
  const photoIds = rawOrders.map((o: any) => o.photoId).filter(Boolean);
  const rawPhotos = await Photo.find({ _id: { $in: photoIds } }).lean();

  // Convert to plain serializable objects for Client Components (removes BSON ObjectIds and toJSON methods)
  const allOrders = JSON.parse(JSON.stringify(rawOrders));
  const payments = JSON.parse(JSON.stringify(rawPayments));
  const photos = JSON.parse(JSON.stringify(rawPhotos));

  const paymentMap = payments.reduce((acc: any, p: any) => {
    if (p.orderId) acc[p.orderId.toString()] = p;
    return acc;
  }, {});

  const photoMap = photos.reduce((acc: any, p: any) => {
    acc[p._id.toString()] = p;
    return acc;
  }, {});

  // 4. Fetch users for user email mapping
  const userIds = Array.from(new Set(allOrders.map((o: any) => o.userId).filter(Boolean)));
  const users = await User.find({ _id: { $in: userIds } }).select("email").lean();
  const userMap = users.reduce((acc: any, u: any) => {
    acc[u._id.toString()] = u.email;
    return acc;
  }, {});

  // 5. Load country specs for human-readable mapping
  const specsPath = path.join(process.cwd(), "data", "countries-specs.json");
  const specsData = JSON.parse(await fs.readFile(specsPath, "utf-8"));
  const countryMap = specsData.reduce((acc: any, country: any) => {
    acc[country.id] = country.name;
    return acc;
  }, {});

  const documentTypesList = specsData.map((c: any) => ({
    id: c.id,
    name: c.name,
  }));

  // Date range timestamps calculation
  let minDateTimestamp: number | null = null;
  let maxDateTimestamp: number | null = null;
  const now = new Date();

  if (filterDatePreset === "today") {
    minDateTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  } else if (filterDatePreset === "yesterday") {
    minDateTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime();
    maxDateTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() - 1;
  } else if (filterDatePreset === "7d") {
    minDateTimestamp = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  } else if (filterDatePreset === "30d") {
    minDateTimestamp = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  } else if (filterDatePreset === "custom") {
    if (filterStartDate) {
      minDateTimestamp = new Date(filterStartDate + "T00:00:00").getTime();
    }
    if (filterEndDate) {
      maxDateTimestamp = new Date(filterEndDate + "T23:59:59.999").getTime();
    }
  }

  // Counts by status across all orders
  const counts = {
    all: allOrders.length,
    paid: allOrders.filter((o: any) => {
      const p = photoMap[o.photoId?.toString()];
      const pay = paymentMap[o._id.toString()];
      return o.status === "paid" || p?.status === "paid" || pay?.status === "captured";
    }).length,
    pending: allOrders.filter((o: any) => {
      const p = photoMap[o.photoId?.toString()];
      const pay = paymentMap[o._id.toString()];
      const isPaid = o.status === "paid" || p?.status === "paid" || pay?.status === "captured";
      return !isPaid && o.status === "pending";
    }).length,
    refunded: allOrders.filter((o: any) => o.status === "refunded").length,
    disputed: allOrders.filter((o: any) => o.status === "disputed").length,
  };

  // Calculate revenue totals
  const revenueUSD = allOrders
    .filter((o: any) => {
      const p = photoMap[o.photoId?.toString()];
      const pay = paymentMap[o._id.toString()];
      return (o.status === "paid" || p?.status === "paid" || pay?.status === "captured") && (o.currency === "USD" || !o.currency);
    })
    .reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);

  const revenueINR = allOrders
    .filter((o: any) => {
      const p = photoMap[o.photoId?.toString()];
      const pay = paymentMap[o._id.toString()];
      return (o.status === "paid" || p?.status === "paid" || pay?.status === "captured") && o.currency === "INR";
    })
    .reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);

  // Apply search, status, country, and date filters
  const filteredOrders = allOrders.filter((order: any) => {
    const payment = paymentMap[order._id.toString()] || {};
    const photo = order.photoId ? photoMap[order.photoId.toString()] : null;
    const email = (order.guestEmail || (order.userId && userMap[order.userId.toString()]) || "").toLowerCase();
    const orderNumber = (order.orderNumber || "").toLowerCase();
    const paymentId = (payment.gatewayPaymentId || photo?.razorpayPaymentId || "").toLowerCase();
    const docType = (order.documentType || "").toLowerCase();

    const isPaid = order.status === "paid" || photo?.status === "paid" || payment.status === "captured";
    const effectiveStatus = isPaid ? "paid" : order.status;

    // Filter by date
    const orderTime = new Date(order.createdAt).getTime();
    if (minDateTimestamp && orderTime < minDateTimestamp) return false;
    if (maxDateTimestamp && orderTime > maxDateTimestamp) return false;

    // Filter by status
    if (filterStatus !== "all" && effectiveStatus !== filterStatus) {
      return false;
    }

    // Filter by document type
    if (filterDocType !== "all" && docType !== filterDocType) {
      return false;
    }

    // Filter by search term
    if (filterSearch) {
      const matchesSearch =
        email.includes(filterSearch) ||
        orderNumber.includes(filterSearch) ||
        paymentId.includes(filterSearch);
      if (!matchesSearch) return false;
    }

    return true;
  });

  const activePhotosCount = photos.filter((p: any) => {
    const ageHours = (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60);
    return !p.isExpired && ageHours < 24 && (p.previewUrl || p.secureUrl);
  }).length;

  const statusBadgeClasses: Record<string, string> = {
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-rose-50 text-rose-700 border-rose-200",
    refunded: "bg-purple-50 text-purple-700 border-purple-200",
    disputed: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 text-lg shadow-xs">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Permanent Orders &amp; Transactions
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Financial records, audit receipts, and 24-hour biometric lifecycle monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Quick KPI Stat Chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Records</div>
            <div className="text-base font-black text-slate-900">{allOrders.length}</div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-emerald-600">Paid Orders</div>
            <div className="text-base font-black text-emerald-700">{counts.paid}</div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-blue-600">Total Revenue</div>
            <div className="text-base font-black text-slate-900">
              {revenueINR > 0 ? `₹${revenueINR}` : ""}{revenueINR > 0 && revenueUSD > 0 ? " + " : ""}{revenueUSD > 0 ? `$${revenueUSD.toFixed(2)}` : (revenueINR === 0 ? "$0.00" : "")}
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400">24h Active Photos</div>
            <div className="text-base font-black text-slate-700">{activePhotosCount}</div>
          </div>
        </div>
      </header>

      {/* Advanced Filter Suite with Date Range */}
      <OrderFilters
        documentTypes={documentTypesList}
        currentStatus={filterStatus}
        currentSearch={filterSearch}
        currentDocType={filterDocType}
        currentDatePreset={filterDatePreset}
        currentStartDate={filterStartDate}
        currentEndDate={filterEndDate}
        counts={counts}
      />

      {/* Orders Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Order &amp; Customer</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Document / Spec</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Amount / Gateway ID</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date &amp; Status</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">24h Retention</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                      <Search className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="font-bold text-slate-700">No orders match your filter criteria</div>
                    <p className="text-xs text-slate-400 mt-1">Try clearing your date range, search query, or status filters.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => {
                  const payment = paymentMap[order._id.toString()] || {};
                  const photo = order.photoId ? photoMap[order.photoId.toString()] : null;
                  const email = order.guestEmail || (order.userId && userMap[order.userId.toString()]) || "Customer";
                  const countryName = countryMap[order.documentType] || order.documentType;

                  const photoAgeHours = (Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60);
                  const isPurged = photo?.isExpired || photoAgeHours >= 24 || (!photo?.secureUrl && !photo?.previewUrl);

                  const paymentId = payment.gatewayPaymentId || photo?.razorpayPaymentId || "";
                  const isPaid = order.status === "paid" || photo?.status === "paid" || payment.status === "captured";
                  const effectiveStatus = isPaid ? "paid" : order.status;

                  return (
                    <tr key={order._id.toString()} className="hover:bg-slate-50/70 transition-colors">
                      {/* Customer & Order Number */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{email}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                              {order.orderNumber}
                            </code>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                              {order.userId ? "Registered" : "Guest"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Country & Spec */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{countryName}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-slate-400 font-mono">{order.documentType}</span>
                            {order.isExpert && (
                              <span className="text-[9px] bg-blue-50/70 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded font-bold">
                                Expert Edit
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Amount & Payment ID */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-slate-900">
                            {order.currency || "USD"} {Number(order.amount).toFixed(2)}
                          </div>
                          {paymentId ? (
                            <code className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 font-mono w-fit" title={paymentId}>
                              {paymentId}
                            </code>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">No payment ID</span>
                          )}
                        </div>
                      </td>

                      {/* Date & Status */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit uppercase tracking-wider ${statusBadgeClasses[effectiveStatus] || "bg-slate-100 text-slate-600"}`}>
                            {effectiveStatus}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>

                      {/* 24h Purge Status */}
                      <td className="px-5 py-4">
                        {isPurged ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200">
                            <ShieldCheck className="w-3 h-3 text-slate-400" />
                            <span>Purged (24h)</span>
                          </span>
                        ) : photo && (photo.previewUrl || photo.secureUrl) ? (
                          <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                              <Image
                                src={photo.previewUrl || photo.secureUrl}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              Active ({Math.max(0, 24 - Math.floor(photoAgeHours))}h left)
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No Image</span>
                        )}
                      </td>

                      {/* Modal Action */}
                      <td className="px-5 py-4 text-right">
                        <OrderDetailModal
                          order={order}
                          payment={payment}
                          photo={photo}
                          countryName={countryName}
                          email={email}
                          effectiveStatus={effectiveStatus}
                          paymentId={paymentId}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
