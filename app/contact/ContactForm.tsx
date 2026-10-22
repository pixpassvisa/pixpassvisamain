"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const topics = ["Payment did not start", "Payment failed", "Charged but no download", "Photo or download help", "Other"];
export default function ContactForm({ demo = false }: { demo?: boolean }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [reference, setReference] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  useEffect(() => { setReference(new URLSearchParams(window.location.search).get("reference")?.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80) || ""); }, []);
  useEffect(() => { if (!cooldown) return; const timer = setTimeout(() => setCooldown(cooldown - 1), 1000); return () => clearTimeout(timer); }, [cooldown]);
  function renderChallenge() {
    const turnstile = (window as any).turnstile;
    if (!siteKey || !container.current || !turnstile || widget.current !== null) return;
    widget.current = turnstile.render(container.current, { sitekey: siteKey, action: "contact", callback: setToken, "expired-callback": () => setToken(""), "error-callback": () => { setToken(""); setFeedback("Security check could not load. Try again or email support@pixpassvisa.com."); } });
  }
  useEffect(() => { renderChallenge(); return () => { if (widget.current !== null) (window as any).turnstile?.remove(widget.current); widget.current = null; }; }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || cooldown || sent) return;
    if (demo) { setSent(true); setFeedback("Preview only: your request would be saved with reference SUP-DEMO1234. No email was sent."); return; }
    setBusy(true); setFeedback("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), topic: form.get("topic"), message: form.get("message"), website: form.get("website"), reference, challengeToken: token }), signal: AbortSignal.timeout(25000) });
      const data = await response.json();
      if (response.status === 429) setCooldown(Number(response.headers.get("Retry-After")) || 300);
      if (!response.ok) throw new Error(data.error || "Unable to send your request.");
      setSent(true); setFeedback(`${data.message} Reference: ${data.reference}`);
    } catch (error: any) { setFeedback(error.message || "Unable to confirm submission. Email support@pixpassvisa.com for help."); }
    finally { setBusy(false); setToken(""); if (widget.current !== null) (window as any).turnstile?.reset(widget.current); }
  }
  const field = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600";
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
    <h2 className="text-2xl font-bold text-slate-900">Tell us what happened</h2>
    <p className="mt-2 text-sm text-slate-600">No account needed. Just your email and a short description.</p>
    <form onSubmit={submit} className="mt-6 space-y-5">
      <label className="block text-sm font-semibold">Your email<input className={field} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" disabled={sent} /></label>
      <label className="block text-sm font-semibold">What can we help with?<select className={field} name="topic" disabled={sent}>{topics.map(t => <option key={t}>{t}</option>)}</select></label>
      <label className="block text-sm font-semibold">Reference <span className="font-normal text-slate-500">(optional)</span><input className={field} value={reference} onChange={e => setReference(e.target.value)} maxLength={80} pattern="[A-Za-z0-9_-]*" placeholder="Checkout, order, or payment reference" disabled={sent} /></label>
      <label className="block text-sm font-semibold">What happened?<textarea className={field} name="message" rows={4} minLength={10} maxLength={1500} required placeholder="Tell us what you tried and the message you saw…" disabled={sent} /><span className="mt-1 block text-xs font-normal text-slate-500">10–1,500 characters. Do not include card details, passwords, OTPs, or photos.</span></label>
      <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {demo ? <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Interactive preview · No messages or payments are sent.</p> : siteKey ? <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={renderChallenge} onError={() => setFeedback("Security check unavailable. Please email support@pixpassvisa.com.")} /><div ref={container} /></> : <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">The contact form is temporarily unavailable. Please email <a className="underline" href="mailto:support@pixpassvisa.com">support@pixpassvisa.com</a>.</p>}
      <button disabled={busy || sent || cooldown > 0 || (!demo && !token)} className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">{sent ? "Request saved" : busy ? "Sending…" : cooldown ? `Try again in ${cooldown}s` : "Send support request"}</button>
      {feedback && <p role="status" aria-live="polite" className={`rounded-xl p-4 text-sm ${sent ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-900"}`}>{feedback}</p>}
      <p className="text-xs leading-relaxed text-slate-500">One request per network and email every five minutes. We use your email to respond and keep support requests for up to 90 days. <a href="/privacy-policy" className="underline">Privacy policy</a></p>
    </form>
  </div>;
}
