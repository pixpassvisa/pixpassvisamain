import React from "react";
import connectToDatabase from "@/lib/mongodb";
import AnalyticsSession from "@/models/AnalyticsSession";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import Order from "@/models/Order";
import Photo from "@/models/Photo";
import AnalyticsPeriodFilter from "./AnalyticsPeriodFilter";
import {
  DollarSign,
  Package,
  Users,
  Clock,
  Zap,
  Globe,
  MapPin,
  Activity,
  CreditCard,
  LucideIcon,
} from "lucide-react";

export const revalidate = 0;

interface Props {
  searchParams: Promise<{ period?: string }>;
}

export default async function AdminDashboardPage(props: Props) {
  const searchParams = await props.searchParams;
  const period = searchParams?.period || "all";

  await connectToDatabase();

  // Date filter criteria
  let dateFilter: any = {};
  const now = new Date();
  if (period === "today") {
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    dateFilter = { createdAt: { $gte: startOfDay } };
  } else if (period === "7d") {
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    dateFilter = { createdAt: { $gte: sevenDaysAgo } };
  } else if (period === "30d") {
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    dateFilter = { createdAt: { $gte: thirtyDaysAgo } };
  }

  // 1. Analytics Sessions & Engagement
  const totalSessions = await AnalyticsSession.countDocuments(dateFilter);
  const totalPageViews = await AnalyticsSession.aggregate([
    { $match: dateFilter },
    { $group: { _id: null, total: { $sum: "$pageViews" } } },
  ]);
  const avgDuration = await AnalyticsSession.aggregate([
    { $match: dateFilter },
    { $group: { _id: null, avg: { $avg: "$duration" } } },
  ]);

  // 2. Funnel Events
  const totalPhotosProcessed = await Photo.countDocuments(dateFilter);
  const razorpayOpens = await AnalyticsEvent.countDocuments({
    eventType: "razorpay_open",
    ...dateFilter,
  });

  // 3. Paid Orders & Revenue
  const paidOrders = await Order.find({
    status: "paid",
    ...dateFilter,
  }).lean();

  const totalPaidOrdersCount = paidOrders.length;
  const revenueUSD = paidOrders
    .filter((o: any) => o.currency === "USD" || !o.currency)
    .reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);
  const revenueINR = paidOrders
    .filter((o: any) => o.currency === "INR")
    .reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);

  // 4. Country distribution
  const countryStatsRaw = await AnalyticsSession.aggregate([
    { $match: dateFilter },
    { $group: { _id: "$country", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  const pageViews = totalPageViews[0]?.total || 0;
  const timeSpentRaw = avgDuration[0]?.avg || 0;
  const timeSpentFormatted =
    timeSpentRaw > 60
      ? `${Math.floor(timeSpentRaw / 60)}m ${Math.floor(timeSpentRaw % 60)}s`
      : `${Math.floor(timeSpentRaw)}s`;

  const checkoutRate = totalSessions > 0 ? ((razorpayOpens / totalSessions) * 100).toFixed(1) : "0.0";
  const overallConversionRate = totalSessions > 0 ? ((totalPaidOrdersCount / totalSessions) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      {/* Header with Period Filter */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Overview Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time traffic, conversion funnel, and financial performance
          </p>
        </div>
        <AnalyticsPeriodFilter currentPeriod={period} />
      </header>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI
          value={revenueINR > 0 ? `₹${revenueINR}${revenueUSD > 0 ? ` + $${revenueUSD.toFixed(2)}` : ""}` : `$${revenueUSD.toFixed(2)}`}
          label="Paid Revenue"
          icon={DollarSign}
          highlight
        />
        <KPI
          value={totalPaidOrdersCount.toString()}
          label={`Paid Orders (${overallConversionRate}% Conv.)`}
          icon={Package}
        />
        <KPI
          value={totalSessions.toString()}
          label={`Unique Sessions (${pageViews} Views)`}
          icon={Users}
        />
        <KPI
          value={timeSpentFormatted}
          label={`Avg Duration (${checkoutRate}% Checkout Rate)`}
          icon={Clock}
        />
      </div>

      {/* Conversion Funnel Breakdown */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Conversion Funnel Analysis</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Drop-off visualization from initial visit to completed payment
            </p>
          </div>
          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
            End-to-End Conversion: <span className="text-blue-700 font-extrabold">{overallConversionRate}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Stage 1 */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl relative overflow-hidden">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stage 1: Visitors</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalSessions}</div>
            <div className="text-xs text-slate-500 mt-0.5">Unique Sessions</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-slate-800 h-full rounded-full w-full"></div>
            </div>
            <span className="text-[10px] text-slate-400 font-bold block mt-1.5">100% of traffic</span>
          </div>

          {/* Stage 2 */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl relative overflow-hidden">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stage 2: Processed</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalPhotosProcessed}</div>
            <div className="text-xs text-slate-500 mt-0.5">Photos Validated</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${Math.min(100, totalSessions > 0 ? (totalPhotosProcessed / totalSessions) * 100 : 0)}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-blue-700 font-bold block mt-1.5">
              {totalSessions > 0 ? ((totalPhotosProcessed / totalSessions) * 100).toFixed(1) : 0}% of visitors
            </span>
          </div>

          {/* Stage 3 */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl relative overflow-hidden">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stage 3: Checkout</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{razorpayOpens}</div>
            <div className="text-xs text-slate-500 mt-0.5">Razorpay Opened</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${Math.min(100, totalSessions > 0 ? (razorpayOpens / totalSessions) * 100 : 0)}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-amber-700 font-bold block mt-1.5">
              {checkoutRate}% initiated checkout
            </span>
          </div>

          {/* Stage 4 */}
          <div className="bg-blue-50/70/60 border border-blue-200/80 p-4 rounded-2xl relative overflow-hidden">
            <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Stage 4: Paid</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalPaidOrdersCount}</div>
            <div className="text-xs text-blue-800 mt-0.5">Completed Orders</div>
            <div className="w-full bg-blue-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: `${Math.min(100, razorpayOpens > 0 ? (totalPaidOrdersCount / razorpayOpens) * 100 : 0)}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-emerald-800 font-bold block mt-1.5">
              {razorpayOpens > 0 ? ((totalPaidOrdersCount / razorpayOpens) * 100).toFixed(1) : 0}% of checkouts paid
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Top Locations & Real-Time Conversion Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Stats */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Top Visitor Locations</span>
            </h3>
            <span className="text-[11px] font-bold text-slate-400">Total: {totalSessions}</span>
          </div>
          <div className="space-y-3">
            {countryStatsRaw.map((stat) => (
              <div
                key={stat._id || "Unknown"}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                    {stat._id === "Unknown" ? (
                      <>
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>Unknown (Local/VPN)</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{stat._id}</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{stat.count}</span>
                  <div className="w-28 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          (stat.count / Math.max(1, totalSessions)) * 100 * 2,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {countryStatsRaw.length === 0 && (
              <div className="text-center py-6 text-slate-400 text-xs">
                No visitor location sessions recorded for this period.
              </div>
            )}
          </div>
        </div>

        {/* Operational Intelligence Card */}
        <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-cyan-400 border border-blue-500/30 flex items-center justify-center text-lg mb-3">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-base font-black text-white mb-1.5">
              Live Checkout Optimization
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Out of {totalSessions} total visitors, {razorpayOpens} opened the Razorpay gateway ({checkoutRate}% checkout initiation). 
              {totalPaidOrdersCount} orders were successfully completed ({overallConversionRate}% total conversion rate).
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Razorpay Completion
              </span>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                {totalPaidOrdersCount} completed / {razorpayOpens} opened
              </span>
            </div>
            <span className="text-xl font-black text-cyan-400">
              {razorpayOpens > 0 ? ((totalPaidOrdersCount / razorpayOpens) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-3xl border transition-all ${
        highlight
          ? "bg-slate-900 text-white border-slate-800 shadow-md"
          : "bg-white border-slate-200/90 text-slate-900 shadow-xs"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`p-2.5 rounded-xl ${
            highlight ? "bg-blue-600/20 text-cyan-400 border border-blue-500/30" : "bg-blue-50 text-blue-600"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className={`text-2xl font-black tracking-tight mb-1 ${highlight ? "text-white" : "text-slate-900"}`}>
        {value}
      </div>
      <div className={`text-xs font-semibold ${highlight ? "text-cyan-400" : "text-slate-500"}`}>
        {label}
      </div>
    </div>
  );
}
