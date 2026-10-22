import { notFound } from "next/navigation";
import PaymentAttemptsView from "@/app/components/PaymentAttemptsView";
import PaymentHelp from "@/app/components/PaymentHelp";
import ContactForm from "@/app/contact/ContactForm";
export const dynamic = "force-dynamic";
export const metadata = { title: "Checkout and support review", robots: { index: false, follow: false } };
export default function CheckoutReview() {
  if (process.env.NODE_ENV !== "development" || process.env.CHECKOUT_REVIEW_DEMO !== "1" || process.env.VERCEL === "1") notFound();
  const at = "2026-10-22T10:00:00.000Z";
  const samples = [
    { reference: "CHK-DEMO-FAILED", email: "customer-one@example.com", stage: "gateway_failed", outcome: "failed", currency: "USD", amount: 4.99, gatewayOrderId: "order_demo_001", gatewayPaymentId: "pay_demo_001", gatewayMode: "test", error: { code: "BAD_REQUEST_ERROR", source: "bank", step: "payment_authorization", reason: "insufficient_funds" }, events: ["initiated", "order_created", "checkout_opened", "gateway_failed"] },
    { reference: "CHK-DEMO-SDK", email: "customer-two@example.com", stage: "sdk_failed", outcome: "unconfirmed", events: ["initiated", "sdk_failed"] },
    { reference: "CHK-DEMO-CLOSED", email: "customer-three@example.com", stage: "checkout_closed", outcome: "unconfirmed", gatewayOrderId: "order_demo_003", currency: "INR", amount: 499, gatewayMode: "test", events: ["initiated", "order_created", "checkout_opened", "checkout_closed"] },
    { reference: "CHK-DEMO-PAID", email: "customer-four@example.com", stage: "captured", outcome: "captured", gatewayOrderId: "order_demo_004", gatewayPaymentId: "pay_demo_004", currency: "USD", amount: 4.99, gatewayMode: "test", events: ["initiated", "order_created", "checkout_opened", "captured"] },
  ].map(a => ({ ...a, kind: "photo", documentType: "us-passport", createdAt: at, events: a.events.map(type => ({ type, at, source: type.startsWith("gateway") || type === "captured" ? "gateway" : ["initiated", "order_created"].includes(type) ? "server" : "browser" })) }));
  return <div className="bg-slate-50 px-4 py-10 text-slate-900"><div className="mx-auto max-w-6xl space-y-12">
    <div className="rounded-2xl bg-slate-900 p-6 text-white"><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Local review · Not deployed</p><h1 className="mt-2 text-2xl font-bold">Payment visibility & customer support</h1><p className="mt-2 text-sm text-slate-300">Sample data only. Expand attempt cards and try the contact form. This page cannot send email, charge a card, or read customer records.</p><nav className="mt-4 flex flex-wrap gap-4 text-sm"><a href="#admin-view" className="underline">Admin view</a><a href="#customer-view" className="underline">Customer guidance</a><a href="#contact-view" className="underline">Contact form</a></nav></div>
    <section id="admin-view"><PaymentAttemptsView attempts={samples} counts={{ initiated: 4, orders: 3, captured: 1, attention: 3 }} demo /></section>
    <section id="customer-view" className="max-w-2xl"><h2 className="text-2xl font-bold">What the customer sees</h2><div className="mt-4 rounded-2xl border bg-white p-6"><p className="font-semibold">Payment update</p><p className="mt-2 text-sm text-slate-600">Your payment provider reported insufficient funds. Check your balance or choose another payment method.</p><PaymentHelp reference="CHK-DEMO-FAILED" /></div></section>
    <section id="contact-view" className="grid gap-8 lg:grid-cols-[1fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-widest text-blue-700">Customer support</p><h2 className="mt-3 text-3xl font-bold">Let’s get you unstuck.</h2><p className="mt-4 text-slate-600">A short form with a clear next step, a support reference, and a direct email address.</p><p className="mt-5 font-semibold text-blue-700">support@pixpassvisa.com</p><p className="mt-5 text-sm leading-6 text-slate-500">The production form requires a server-verified bot check and enforces one submission per network and email every five minutes.</p></div><ContactForm demo /></section>
  </div></div>;
}
