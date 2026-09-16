import React from "react";
import dbConnect from "@/lib/mongodb";
import AuditEvent, { AuditEventType } from "@/models/AuditEvent";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import User from "@/models/User";
import AuditEventFilters from "./AuditEventFilters";
import AuditDetailModal from "./AuditDetailModal";
import {
  ShieldCheck,
  Settings,
  Mail,
  Download,
  CreditCard,
  Scale,
  Pin,
  Search,
  FileText,
  LucideIcon,
} from "lucide-react";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{
    type?: string;
    q?: string;
    datePreset?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function AdminAuditEventsPage(props: Props) {
  const searchParams = await props.searchParams;
  const filterType = searchParams?.type as AuditEventType | undefined;
  const filterSearch = (searchParams?.q || "").trim().toLowerCase();
  const filterDatePreset = (searchParams?.datePreset || "all").toLowerCase();
  const filterStartDate = searchParams?.startDate || "";
  const filterEndDate = searchParams?.endDate || "";

  await dbConnect();

  // Counts by type across all events
  const countsRaw = await AuditEvent.aggregate([
    { $group: { _id: "$eventType", count: { $sum: 1 } } },
  ]);
  const countsMap = countsRaw.reduce((acc: any, c: any) => {
    acc[c._id] = c.count;
    return acc;
  }, {});
  const totalCount = Object.values(countsMap).reduce((a: number, b: any) => a + Number(b), 0);

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

  // Fetch events based on query
  const query: any = {};
  if (filterType) query.eventType = filterType;
  if (minDateTimestamp || maxDateTimestamp) {
    query.createdAt = {};
    if (minDateTimestamp) query.createdAt.$gte = new Date(minDateTimestamp);
    if (maxDateTimestamp) query.createdAt.$lte = new Date(maxDateTimestamp);
  }

  const rawEventsList = await AuditEvent.find(query).sort({ createdAt: -1 }).limit(200).lean();

  // Resolve customer emails across associated orders and photos
  const orderIds = rawEventsList.map((e: any) => e.orderId).filter(Boolean);
  const photoIds = rawEventsList.map((e: any) => e.photoId).filter(Boolean);

  const [orders, photos] = await Promise.all([
    Order.find({ _id: { $in: orderIds } }).select("_id guestEmail userId").lean(),
    Photo.find({ _id: { $in: photoIds } }).select("_id guestEmail userId").lean(),
  ]);

  // Convert to plain serializable objects for Client Components (removes BSON ObjectIds and toJSON methods)
  const rawEvents = JSON.parse(JSON.stringify(rawEventsList));

  const userIds = Array.from(new Set([
    ...orders.map((o: any) => o.userId).filter(Boolean),
    ...photos.map((p: any) => p.userId).filter(Boolean),
  ]));
  const users = await User.find({ _id: { $in: userIds } }).select("_id email").lean();
  const userMap = users.reduce((acc: any, u: any) => {
    acc[u._id.toString()] = u.email;
    return acc;
  }, {});

  const orderMap = orders.reduce((acc: any, o: any) => {
    acc[o._id.toString()] = o.guestEmail || (o.userId && userMap[o.userId.toString()]);
    return acc;
  }, {});

  const photoMap = photos.reduce((acc: any, p: any) => {
    acc[p._id.toString()] = p.guestEmail || (p.userId && userMap[p.userId.toString()]);
    return acc;
  }, {});

  // Apply search query and date filters
  const events = rawEvents.filter((event: any) => {
    const eventTime = new Date(event.createdAt).getTime();
    if (minDateTimestamp && eventTime < minDateTimestamp) return false;
    if (maxDateTimestamp && eventTime > maxDateTimestamp) return false;

    if (!filterSearch) return true;

    const email = (
      (event.actor && event.actor.includes("@") ? event.actor : null) ||
      event.metadata?.email ||
      (event.orderId && orderMap[event.orderId.toString()]) ||
      (event.photoId && photoMap[event.photoId.toString()]) ||
      ""
    ).toLowerCase();

    const actor = (event.actor || "").toLowerCase();
    const photoId = (event.photoId?.toString() || "").toLowerCase();
    const orderId = (event.orderId?.toString() || "").toLowerCase();
    const ip = (event.ipAddress || "").toLowerCase();
    const fileName = (event.metadata?.fileName || "").toLowerCase();

    return (
      email.includes(filterSearch) ||
      actor.includes(filterSearch) ||
      photoId.includes(filterSearch) ||
      orderId.includes(filterSearch) ||
      ip.includes(filterSearch) ||
      fileName.includes(filterSearch)
    );
  });

  const eventBadgeStyles: Record<AuditEventType, { badge: string; icon: LucideIcon; label: string }> = {
    processing: {
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Settings,
      label: "Processing",
    },
    email_sent: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Mail,
      label: "Email sent",
    },
    download: {
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Download,
      label: "Download",
    },
    refund: {
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      icon: CreditCard,
      label: "Refund",
    },
    dispute: {
      badge: "bg-red-50 text-red-700 border-red-200",
      icon: Scale,
      label: "Dispute",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Permanent Audit Events Log
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Immutable operational log for biometric processing, customer downloads, and gateway events
              </p>
            </div>
          </div>
        </div>

        {/* Quick Count Metric */}
        <div className="bg-white border border-slate-200/80 rounded-2xl px-4 py-2 text-center shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Audit Events</div>
          <div className="text-base font-black text-slate-900">{totalCount}</div>
        </div>
      </header>

      {/* Advanced Filter Suite with Date Range */}
      <AuditEventFilters
        currentType={filterType}
        currentSearch={filterSearch}
        currentDatePreset={filterDatePreset}
        currentStartDate={filterStartDate}
        currentEndDate={filterEndDate}
        counts={countsMap}
        totalCount={totalCount}
      />

      {/* Audit Events Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Event Type</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date &amp; Time</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actor &amp; Network</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">References</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Details Summary</th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                      <Search className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="font-bold text-slate-700">No audit events match your filter criteria</div>
                    <p className="text-xs text-slate-400 mt-1">Try clearing your date range, search query, or event type filters.</p>
                  </td>
                </tr>
              ) : (
                events.map((event: any) => {
                  const conf = eventBadgeStyles[event.eventType as AuditEventType] || {
                    badge: "bg-slate-100 text-slate-700 border-slate-200",
                    icon: Pin,
                    label: event.eventType,
                  };
                  const Icon = conf.icon;

                  const email =
                    (event.actor && event.actor.includes("@") ? event.actor : null) ||
                    event.metadata?.email ||
                    (event.orderId && orderMap[event.orderId.toString()]) ||
                    (event.photoId && photoMap[event.photoId.toString()]) ||
                    null;

                  return (
                    <tr key={event._id.toString()} className="hover:bg-slate-50/70 transition-colors">
                      {/* Event Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${conf.badge}`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span>{conf.label}</span>
                        </span>
                      </td>

                      {/* Timestamp */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-900">
                          {new Date(event.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {new Date(event.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* Actor & IP */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          {email ? (
                            <>
                              <span className="font-bold text-slate-900 truncate max-w-[220px]" title={email}>
                                {email}
                              </span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] text-blue-700 font-semibold bg-blue-50/70 border border-blue-200/80 px-1.5 py-0.2 rounded">
                                  Customer
                                </span>
                                {event.actor && !event.actor.includes("@") && (
                                  <span className="text-[9px] text-slate-400 capitalize">({event.actor})</span>
                                )}
                              </div>
                            </>
                          ) : (
                            <span className="font-semibold text-slate-800 capitalize">
                              {event.actor || "system"}
                            </span>
                          )}
                          {event.ipAddress && (
                            <code className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {event.ipAddress}
                            </code>
                          )}
                        </div>
                      </td>

                      {/* References */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1 text-[11px] font-mono text-slate-600">
                          {event.photoId && (
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400 text-[10px]">Photo:</span>
                              <code className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                                {event.photoId.toString().slice(-8)}
                              </code>
                            </div>
                          )}
                          {event.orderId && (
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400 text-[10px]">Order:</span>
                              <code className="bg-slate-100 px-1 py-0.2 rounded border border-slate-200">
                                {event.orderId.toString().slice(-8)}
                              </code>
                            </div>
                          )}
                          {!event.photoId && !event.orderId && (
                            <span className="text-slate-400 text-xs italic font-sans">System Level</span>
                          )}
                        </div>
                      </td>

                      {/* Details Summary */}
                      <td className="px-5 py-4">
                        <div className="max-w-xs text-xs text-slate-600 truncate">
                          {event.metadata?.fileName && (
                            <div className="font-mono text-[11px] text-slate-800 truncate flex items-center gap-1" title={event.metadata.fileName}>
                              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{event.metadata.fileName}</span>
                            </div>
                          )}
                          {event.metadata?.documentType && (
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Spec: <span className="font-semibold text-slate-700">{event.metadata.documentType}</span>
                            </div>
                          )}
                          {event.metadata?.template && (
                            <div className="text-[11px] text-slate-500">
                              Template: <span className="font-semibold">{event.metadata.template}</span>
                            </div>
                          )}
                          {!event.metadata?.fileName && !event.metadata?.documentType && !event.metadata?.template && (
                            <span className="text-slate-400 italic">Metadata recorded</span>
                          )}
                        </div>
                      </td>

                      {/* Modal Action */}
                      <td className="px-5 py-4 text-right">
                        <AuditDetailModal
                          event={event}
                          email={email}
                          badgeClass={conf.badge}
                          badgeLabel={conf.label}
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
