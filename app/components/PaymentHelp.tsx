import Link from "next/link";
export default function PaymentHelp({ reference = "" }: { reference?: string }) {
  return <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
    <p className="font-semibold text-slate-900">Need help with this payment?</p>
    <p className="mt-1">If money was debited but no download appeared, keep your payment ID and ask us to check before paying again.</p>
    {reference && <p className="mt-2 break-all font-mono text-xs">Support reference: {reference}</p>}
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2"><Link className="font-semibold text-blue-700 underline" href={`/contact${reference ? `?reference=${encodeURIComponent(reference)}` : ""}`}>Contact support</Link><a className="text-blue-700 underline" href="mailto:support@pixpassvisa.com">support@pixpassvisa.com</a></div>
    <p className="mt-2 text-xs">Never send your card number, CVV, password, or OTP.</p>
  </div>;
}
