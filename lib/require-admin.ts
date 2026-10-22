import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(v => v.trim().toLowerCase()).filter(Boolean);
  if (!session?.user?.email || !allowed.includes(session.user.email.toLowerCase())) redirect("/admin/login");
}
