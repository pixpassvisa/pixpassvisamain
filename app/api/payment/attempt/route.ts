import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Photo from "@/models/Photo";
import dbConnect from "@/lib/mongodb";
import { newAttempt } from "@/lib/checkout-diagnostics";
import { sameOrigin, smallJson, normalizedEmail, clientAddress, reserveWindow } from "@/lib/request-protection";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  let body;
  try { body = await smallJson(req); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  try {
    const session = await getServerSession(authOptions);
    const email = normalizedEmail(session?.user?.email || body.email);
    if (!email) return NextResponse.json({ error: "Enter a valid email for your receipt." }, { status: 400 });
    if (!(await reserveWindow("checkout-start", clientAddress(req), 3))) return NextResponse.json({ error: "Please wait a moment before retrying." }, { status: 429 });
    await dbConnect();
    let photo;
    if (body.kind !== "expert") {
      if (typeof body.photoId !== "string" || !/^[a-f\d]{24}$/i.test(body.photoId)) return NextResponse.json({ error: "Invalid photo" }, { status: 400 });
      photo = await Photo.findById(body.photoId);
      if (!photo || (photo.userId && photo.userId.toString() !== (session?.user as any)?.id)) return NextResponse.json({ error: "Photo unavailable" }, { status: 403 });
      if (photo.status === "paid") return NextResponse.json({ error: "This photo is already paid. Refresh to view downloads." }, { status: 409 });
    }
    const { attempt, token } = await newAttempt({ kind: body.kind === "expert" ? "expert" : "photo", photoId: photo?._id.toString(), documentType: photo?.documentType, email });
    return NextResponse.json({ reference: attempt.reference, token }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Checkout could not start. Please try again or email support@pixpassvisa.com." }, { status: 503 }); }
}
