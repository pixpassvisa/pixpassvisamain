"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminLogoutButton from "./AdminLogoutButton";
import { 
  BarChart3, 
  Package, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  Zap, 
  Globe, 
  Menu, 
  X,
  ExternalLink 
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Analytics Overview", icon: BarChart3 },
  { href: "/admin/orders", label: "Permanent Orders", icon: Package },
  { href: "/admin/audit-events", label: "Audit Events Log", icon: ShieldCheck },
  { href: "/admin/blogs", label: "Manage Blogs", icon: FileText },
  { href: "/admin/feedback", label: "Customer Feedback", icon: MessageSquare },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-black text-white text-base tracking-tight">PixPassVisa Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col z-40 transform transition-transform duration-200 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="font-black text-white text-base tracking-tight leading-none">
                PixPassVisa
              </div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
                Admin Console
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 text-cyan-400 border border-slate-700/60 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Live
          </span>
        </div>

        {/* Current Admin User Badge */}
        <div className="px-4 py-3.5 bg-slate-950/40 border-b border-slate-800/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/15 text-cyan-400 border border-blue-500/30 flex items-center justify-center font-black text-xs shadow-xs">
            {userEmail ? userEmail[0].toUpperCase() : "A"}
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-xs font-bold text-white truncate" title={userEmail}>
              {userEmail}
            </div>
            <div className="text-[10px] text-cyan-400 font-medium flex items-center gap-1 mt-0.5">
              <span>●</span>
              <span>Super Administrator</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3.5 flex flex-col gap-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Modules
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3.5 py-2.5 rounded-xl transition-all font-medium text-xs flex items-center gap-3 ${
                  isActive
                    ? "bg-blue-600/15 text-cyan-400 font-bold border border-blue-500/30 shadow-xs"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                }`}
              >
                <ItemIcon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                )}
              </Link>
            );
          })}

          <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-slate-800/80">
            <AdminLogoutButton />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 hover:bg-slate-800/70 rounded-xl transition-colors font-medium text-xs flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span>View Live Website</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
