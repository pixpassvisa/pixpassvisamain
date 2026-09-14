"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

export default function AdminLogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full px-4 py-2 hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 border border-rose-900/40 hover:border-rose-800/60 rounded-lg transition-colors font-semibold text-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      title="Sign out of Admin Portal"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <LogOut className="w-3.5 h-3.5" />
      )}
      <span>{loading ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}

