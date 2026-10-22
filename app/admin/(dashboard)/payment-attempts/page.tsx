import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import CheckoutAttempt from "@/models/CheckoutAttempt";
import PaymentAttemptsView from "@/app/components/PaymentAttemptsView";
import { requireAdmin } from "@/lib/require-admin";
export const dynamic = "force-dynamic";
export default async function PaymentAttemptsPage({ searchParams }: { searchParams: Promise<{ q?: string; outcome?: string; page?: string }> }) {
  await requireAdmin();
  const params = await searchParams;
  const page = Math.max(1, Math.min(1000, Number.parseInt(params.page || "1") || 1));
  const outcome = ["captured", "failed", "unconfirmed"].includes(params.outcome || "") ? params.outcome : "";
  const q = (params.q || "").trim().slice(0, 254);
  const query: any = {};
  if (outcome) query.outcome = outcome;
  if (q) query.$or = [{ reference: q }, { gatewayOrderId: q }, { gatewayPaymentId: q }, { email: q.toLowerCase() }];
  await dbConnect();
  const since = { createdAt: { $gte: new Date(Date.now() - 7 * 86400000) } };
  const [attempts, total, initiated, orders, captured, attention] = await Promise.all([
    CheckoutAttempt.find(query).sort({ createdAt: -1 }).skip((page - 1) * 25).limit(25).lean(), CheckoutAttempt.countDocuments(query),
    CheckoutAttempt.countDocuments(since), CheckoutAttempt.countDocuments({ ...since, gatewayOrderId: { $exists: true } }),
    CheckoutAttempt.countDocuments({ ...since, outcome: "captured" }), CheckoutAttempt.countDocuments({ ...since, outcome: { $ne: "captured" } }),
  ]);
  const pageLink = (n: number) => `?${new URLSearchParams({ q, outcome: outcome || "", page: String(n) })}`;
  return <><form className="mb-6 flex flex-wrap gap-3"><input aria-label="Search exact email or reference" className="min-w-0 flex-1 rounded-xl border bg-white p-3 text-sm" name="q" defaultValue={q} placeholder="Exact email, checkout reference, order or payment ID" /><select name="outcome" aria-label="Payment outcome" defaultValue={outcome} className="rounded-xl border bg-white p-3 text-sm"><option value="">All outcomes</option><option value="unconfirmed">Unconfirmed</option><option value="failed">Gateway failed</option><option value="captured">Confirmed paid</option></select><button className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white">Apply filters</button></form><PaymentAttemptsView attempts={JSON.parse(JSON.stringify(attempts))} counts={{ initiated, orders, captured, attention }} /><nav className="mt-6 flex gap-5 text-sm"><span>{total} matches · Page {page}</span>{page > 1 && <Link href={pageLink(page - 1)}>Previous</Link>}{page * 25 < total && <Link href={pageLink(page + 1)}>Next</Link>}</nav></>;
}
