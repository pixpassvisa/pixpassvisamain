"use client";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="mx-auto max-w-xl px-6 py-24 text-center">
    <h1 className="text-3xl font-bold">This page could not load</h1>
    <p className="mt-4">Please try again. If you have just paid, keep your receipt and contact support before starting another payment.</p>
    <button className="mt-6 rounded-xl bg-emerald-800 px-6 py-3 text-white" onClick={reset}>Try again</button>
    <p className="mt-6"><a href="/" className="underline">Home</a> · <a href="/support" className="underline">Contact support</a></p>
    {error.digest && <p className="mt-4 text-sm">Support reference: {error.digest}</p>}
  </main>;
}
