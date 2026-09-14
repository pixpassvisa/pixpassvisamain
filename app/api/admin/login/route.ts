import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const configuredAdminEmail = (
      process.env.ADMIN_EMAIL || "shikha5389@gmail.com"
    ).trim().toLowerCase();
    const configuredAdminPassword = process.env.ADMIN_PASSWORD;

    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
      : [configuredAdminEmail];

    if (!adminEmails.includes(email)) {
      return NextResponse.json(
        { error: "Unauthorized. You do not have administrator permissions." },
        { status: 403 }
      );
    }

    await dbConnect();
    let user = await User.findOne({ email });

    let isMatch = false;
    if (configuredAdminPassword && password === configuredAdminPassword) {
      isMatch = true;
    } else if (user && user.role === "admin" && user.password) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    // Upsert admin user in database to ensure records and references are consistent
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        email,
        name: "Admin Shikha",
        password: hashedPassword,
        role: "admin",
      });
    } else if (!user.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Admin credentials verified successfully",
      admin: {
        id: user._id.toString(),
        email: user.email,
        name: user.name || "Admin",
      },
    });
  } catch (error: any) {
    console.error("Admin login API validation error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
