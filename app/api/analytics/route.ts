import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AnalyticsSession from "@/models/AnalyticsSession";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import { sanitizeAnalyticsPayload } from "@/lib/analytics-payload";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sanitized = body && typeof body === "object" ? sanitizeAnalyticsPayload(body) : null;
    if (!sanitized) {
      return NextResponse.json({ error: "Invalid analytics payload" }, { status: 400 });
    }
    const { sessionId, type, url, duration } = sanitized;

    await connectToDatabase();

    // The x-vercel-ip-country header helps get standard country codes natively on Vercel
    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    // Upsert the session atomically to prevent race conditions (duplicate key errors)
    await AnalyticsSession.findOneAndUpdate(
      { sessionId },
      {
        $setOnInsert: {
          sessionId,
          country,
          userAgent,
          firstSeenAt: new Date(),
        },
        $set: {
          lastSeenAt: new Date(),
        },
        $inc: {
          pageViews: type === "page_view" ? 1 : 0,
        },
        ...(duration && typeof duration === "number" ? { $max: { duration } } : {})
      },
      { upsert: true }
    );

    // Log the event
    if (type) {
      await AnalyticsEvent.create({
        sessionId,
        eventType: type, // 'page_view', 'razorpay_open'
        url: url || "",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to record analytics" },
      { status: 500 }
    );
  }
}
