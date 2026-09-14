import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminSidebar from "./AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const userEmail = session?.user?.email?.toLowerCase() || "";

  if (!session || !adminEmails.includes(userEmail)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans antialiased text-slate-800">
      {/* Dedicated Admin Sidebar */}
      <AdminSidebar userEmail={userEmail} />

      {/* Main Content Area with Top Bar */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Admin Workspace
            </span>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50/70 border border-blue-200 rounded-full text-[11px] font-bold text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Live Sync Active
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-800">{userEmail}</div>
              <div className="text-[10px] text-slate-400">Administrator Access</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-cyan-400 font-black text-xs flex items-center justify-center border border-slate-700 shadow-xs">
              {userEmail ? userEmail[0].toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
