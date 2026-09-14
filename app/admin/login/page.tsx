import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminLoginForm from "./AdminLoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Admin Login | PixPassVisa",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const userEmail = session?.user?.email?.toLowerCase() || "";

  // If already logged in with admin credentials, redirect to /admin directly
  if (session && adminEmails.includes(userEmail)) {
    redirect("/admin");
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
          Loading Admin Portal...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
