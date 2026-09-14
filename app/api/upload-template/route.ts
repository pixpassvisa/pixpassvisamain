import { NextRequest, NextResponse } from "next/server";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

// Rate limiting map
const uploadRateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string, limit = 20, windowMs = 60000): boolean {
  const now = Date.now();
  const record = uploadRateLimit.get(ip);
  if (!record || now > record.resetAt) {
    uploadRateLimit.set(ip, { count: 1, resetAt: now + windowMs });
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

    if (!checkRateLimit(ip, 20, 60000)) {
      return NextResponse.json(
        { error: "Too many upload requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { image, paperSize, photoSize, format } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Image data URL is required" },
        { status: 400 }
      );
    }

    // Extract base64 part if it's a data URL
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    if (buffer.length > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image exceeds 15MB limit" },
        { status: 400 }
      );
    }

    const tags = [
      "us-visa-photo", // Included so 24h Cloudinary cleanup job auto-purges old templates
      "print-template",
      "print-sheet",
      paperSize ? `paper-${paperSize}` : "paper-custom",
      photoSize ? `photo-${photoSize}` : "photo-custom",
      format ? `format-${format}` : "format-jpg",
    ];

    const cloudinaryUrl = await uploadBufferToCloudinary(
      buffer,
      "visa-photos-pixpassvisa",
      tags
    );

    return NextResponse.json({
      success: true,
      url: cloudinaryUrl,
    });
  } catch (error: any) {
    console.error("[upload-template] Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to upload image to Cloudinary", details: error.message },
      { status: 500 }
    );
  }
}
