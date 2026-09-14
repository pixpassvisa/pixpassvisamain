import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { message, photoId, rating } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    await dbConnect();

    const userEmail = session?.user?.email || null;

    const feedback = await Feedback.create({
      message,
      photoId,
      userEmail,
      rating,
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error: any) {
    console.error("Feedback Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
