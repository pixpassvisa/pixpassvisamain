import { NextRequest, NextResponse } from "next/server";

// Sliding window rate limiter to protect upstream paid API credits
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string, limit = 15, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = (forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip")) || "anonymous";

    if (!checkRateLimit(ip, 15, 60000)) {
      return NextResponse.json(
        { error: "Too many background removal requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 15MB maximum limit" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Uploaded file must be a valid image" }, { status: 400 });
    }

    const apiUrl = process.env.REMOVE_BG_API_URL;
    const apiToken = process.env.REMOVE_BG_API_TOKEN;

    if (!apiUrl || !apiToken) {
      console.error("Missing REMOVE_BG_API_URL or REMOVE_BG_API_TOKEN configuration");
      return NextResponse.json({ error: "Background removal service is not configured" }, { status: 500 });
    }

    const backendFormData = new FormData();
    backendFormData.append("image", file);

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${apiToken}`,
      },
      body: backendFormData,
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("BG removal API failed:", res.status, errorData);
      return NextResponse.json({ error: "Background removal API failed", details: errorData }, { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
      },
    });

  } catch (err: any) {
    console.error("Proxy remove-bg error:", err);
    return NextResponse.json({ error: "Failed to process background removal", details: err.message }, { status: 500 });
  }
}
