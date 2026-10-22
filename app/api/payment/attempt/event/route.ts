import { NextResponse } from "next/server";
import { authenticatedAttempt, clientEvents, recordAttempt, safeError } from "@/lib/checkout-diagnostics";
import { sameOrigin, smallJson, reserveWindow } from "@/lib/request-protection";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({}, { status: 403 });
  let body;
  try { body = await smallJson(req); } catch { return NextResponse.json({}, { status: 400 }); }
  try {
    if (!clientEvents.includes(body.type)) return NextResponse.json({}, { status: 400 });
    const attempt = await authenticatedAttempt(body.reference, body.token);
    if (!attempt) return NextResponse.json({}, { status: 403 });
    if (!(await reserveWindow("checkout-event", `${attempt.reference}:${body.type}`, 5))) return NextResponse.json({}, { status: 429 });
    await recordAttempt(attempt.reference, body.type, "browser", body.type === "client_payment_failed" ? { error: safeError(body.error) } : {});
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({}, { status: 503 }); }
}
