import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Must provide name, email, and password" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Prevent unauthorized registration of administrative accounts
    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
      : [];
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();

    if (
      adminEmails.includes(normalizedEmail) ||
      (configuredAdminEmail && normalizedEmail === configuredAdminEmail)
    ) {
      return NextResponse.json(
        { error: "Registration is not permitted for this email address." },
        { status: 403 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists. Please log in using your original sign-in method or reset your password." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to register", details: error.message },
      { status: 500 }
    );
  }
}
