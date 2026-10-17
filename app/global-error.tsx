"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body style={{ fontFamily: "system-ui", margin: "64px auto", padding: 24, maxWidth: 560 }}>
    <h1>Let’s get you back to your photo</h1>
    <p>The page could not load. Try again, or contact support with the reference below. If you have paid, keep your receipt and avoid making another payment.</p>
    <button onClick={reset} style={{ padding: 12 }}>Try again</button>
    <p><a href="/">Home</a> · <a href="mailto:support@pixpassvisa.com">Contact support</a></p>
    {error.digest && <p>Support reference: {error.digest}</p>}
  </body></html>;
}
