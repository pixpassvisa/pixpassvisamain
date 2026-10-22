import crypto from "crypto";
import { NextResponse } from "next/server";
import { sameOrigin, smallJson, clientAddress, reserveWindow } from "@/lib/request-protection";
import { validateContact, verifyContactChallenge } from "@/lib/contact-validation";
import SupportRequest from "@/models/SupportRequest";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Please submit from our contact page." }, { status: 403 });
  let body;
  try { body = await smallJson(req); } catch { return NextResponse.json({ error: "Invalid or oversized request." }, { status: 400 }); }
  const input = validateContact(body);
  if (!input || body.website) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  if (!process.env.TURNSTILE_SECRET_KEY || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return NextResponse.json({ error: "The contact form is temporarily unavailable. Email support@pixpassvisa.com." }, { status: 503 });
  try {
    const address = clientAddress(req);
    if (!(await reserveWindow("contact-check", address, 3))) return NextResponse.json({ error: "Please wait before trying again." }, { status: 429, headers: { "Retry-After": "3" } });
    const hostname = new URL(process.env.NEXT_PUBLIC_APP_URL || req.url).hostname;
    if (!(await verifyContactChallenge(body.challengeToken, hostname))) return NextResponse.json({ error: "Please complete the security check again." }, { status: 400 });
    // Both reservations must succeed before any email is attempted. Failed sends also consume the window.
    if (!(await reserveWindow("contact-ip", address, 300)) || !(await reserveWindow("contact-email", input.email, 300))) return NextResponse.json({ error: "A request was submitted recently from this network or email. Please wait five minutes before sending another." }, { status: 429, headers: { "Retry-After": "300" } });
    const reference = `SUP-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
    const ticket = await SupportRequest.create({ ...input, reference });
    const result = await sendEmail({
      to: "support@pixpassvisa.com", replyTo: input.email,
      subject: `Support request ${reference}: ${input.topic}`,
      text: `Reference: ${reference}\nFrom: ${input.email}\nTopic: ${input.topic}\nCheckout reference (visitor supplied): ${input.checkoutReference || "None"}\n\n${input.message}`,
    });
    ticket.delivery = result.success ? "accepted" : "failed";
    await ticket.save();
    return NextResponse.json({ success: true, reference, message: result.success ? "Your request is saved and the support email was accepted for delivery. Keep this reference for follow-up." : "Your request is saved, but its email notification could not be sent. You can email support@pixpassvisa.com with this reference." }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "We could not confirm submission. Please email support@pixpassvisa.com rather than repeatedly submitting." }, { status: 503 });
  }
}
