import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import SupportHubClient from "./SupportHubClient";
import { ShieldCheck, Lock, CreditCard, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Support & Resource Center | PixPassVisa",
  description:
    "PixPassVisa Help Center and Support Hub. Direct support desks, FAQ, biometric compliance standards, refund policy, and data privacy safeguards.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/support",
    languages: {
      en: "https://www.pixpassvisa.com/support",
      "x-default": "https://www.pixpassvisa.com/support",
    },
  },
  openGraph: {
    title: "Support & Resource Center | PixPassVisa",
    description:
      "Find instant answers, contact our 24/7 support team, check official biometric photo rules, and view all legal & refund policies.",
    url: "https://www.pixpassvisa.com/support",
    siteName: "PixPassVisa",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassVisa Support & Resource Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function SupportPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Breadcrumbs />

      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-10 sm:py-14 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Support &amp; Resource Hub
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-2">
             PixPassVisa Help Center &amp; Support Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore support desks, official photo standards, 100% money-back guarantees, and legal &amp; privacy policies.
            </p>
          </div>
        </div>
      </header>

      {/* Main Interactive Sidebar + Tabbed Layout */}
      <main>
        <SupportHubClient />
      </main>

      {/* Bottom Guarantee Banner */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900 uppercase">100% Refund</p>
              <p className="text-[10px] text-slate-500">Government rejection guarantee</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900 uppercase">24h Auto-Purge</p>
              <p className="text-[10px] text-slate-500">Zero permanent photo storage</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-2">
                <CreditCard className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900 uppercase">Stripe Protected</p>
              <p className="text-[10px] text-slate-500">PCI-DSS Level 1 security</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-2">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900 uppercase">&lt; 5 Sec Processing</p>
              <p className="text-[10px] text-slate-500">Instant AI compliance check</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
