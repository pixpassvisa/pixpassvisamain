import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import SupportRequest from "@/models/SupportRequest";
import { requireAdmin } from "@/lib/require-admin";
export const dynamic = "force-dynamic";
export default async function SupportInbox({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireAdmin();
  const params = await searchParams;
  const page = Math.max(1, Math.min(1000, Number.parseInt(params.page || "1") || 1));
  await dbConnect();
  const tickets = await SupportRequest.find().sort({ createdAt: -1 }).skip((page - 1) * 25).limit(26).lean();
  return <div className="space-y-5"><h1 className="text-3xl font-bold">Support inbox</h1><p className="text-sm text-slate-600">Requests remain here even if email delivery fails. “Accepted” means the email provider accepted the notification, not that it reached the inbox. Retained for 90 days.</p>{tickets.length === 0 && <p className="rounded-xl border bg-white p-6">No support requests yet.</p>}{tickets.slice(0, 25).map((t: any) => <article key={String(t._id)} className="rounded-2xl border bg-white p-6"><div className="flex flex-wrap justify-between gap-3"><h2 className="font-semibold">{t.topic}</h2><span className={`rounded-full px-3 py-1 text-xs ${t.delivery === "accepted" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>Email {t.delivery}</span></div><p className="mt-2 text-sm">{t.email} · {new Date(t.createdAt).toISOString().slice(0,16).replace("T", " ")} UTC</p><p className="mt-2 font-mono text-xs">{t.reference}</p>{t.checkoutReference && <Link className="mt-2 block text-sm text-blue-700 underline" href={`/admin/payment-attempts?q=${encodeURIComponent(t.checkoutReference)}`}>Find checkout: {t.checkoutReference}</Link>}<p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">{t.message}</p><a className="mt-4 inline-block text-sm font-semibold text-blue-700 underline" href={`mailto:${encodeURIComponent(t.email)}?subject=${encodeURIComponent(`Re: ${t.reference}`)}`}>Reply by email</a></article>)}<nav className="flex gap-5 text-sm">{page > 1 && <Link href={`?page=${page - 1}`}>Previous</Link>}{tickets.length > 25 && <Link href={`?page=${page + 1}`}>Next</Link>}</nav></div>;
}
