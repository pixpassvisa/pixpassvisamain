"use client";

export default function PreviewError({ reset }: { reset: () => void }) {
  return <main className="mx-auto max-w-lg px-6 py-20 text-center">
    <h1 className="text-2xl font-bold">Your preview couldn’t load</h1>
    <p className="mt-3 text-slate-600">Please retry. If you already paid, keep your receipt and contact support before paying again.</p>
    <button onClick={reset} className="mt-6 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white">Retry preview</button>
    <a href="/support" className="mt-5 block underline">Contact support</a>
  </main>;
}
