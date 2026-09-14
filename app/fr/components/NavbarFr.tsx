"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { fr } from "../translations";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const navLinks = [
  { href: "/fr/photo-passeport", label: fr.nav.passportPhoto },
  { href: "/fr/photo-identite", label: fr.nav.idPhoto },
  { href: "/fr/photo-identite-en-ligne", label: "Photo d'identité en ligne" },
  { href: "/fr/photo-visa", label: fr.nav.visaPhoto },
  { href: "/fr/guides", label: fr.nav.guides },
];

export default function NavbarFr() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-md shadow-black/[0.04]"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] lg:h-[66px]">
            <Link href="/fr" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 lg:w-9 lg:h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/20/30 group-hover:bg-blue-700 group-hover:shadow-blue-500/20/40 transition-all duration-200">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors duration-200">
                PixPassVisa
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5 flex-1 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className="relative px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 rounded-lg hover:bg-blue-50/70/80 transition-all duration-150 whitespace-nowrap group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <LanguageSwitcher />
              {status === "loading" ? (
                <div className="flex items-center gap-3">
                  <div className="w-14 h-5 bg-slate-100 animate-pulse rounded-md" />
                  <div className="w-36 h-9 bg-slate-100 animate-pulse rounded-xl" />
                </div>
              ) : session ? (
                <>
                  <Link href="/dashboard" prefetch={true} className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors duration-150">
                    {fr.nav.dashboard}
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/fr" })} className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors duration-150">
                    {fr.nav.logout}
                  </button>
                  <Link href="/fr/passport-photo-online" prefetch={true} className="bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-150 shadow-sm hover:shadow-md hover:shadow-black/10 hover:-translate-y-px">
                    {fr.nav.newPhoto} →
                  </Link>
                </>
              ) : (
                <>
                  {/* <Link href="/login" prefetch={true} className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors duration-150">
                    {fr.nav.login}
                  </Link> */}
                  <Link href="/fr/passport-photo-online" prefetch={true} className="bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-800 rounded-sm px-5 py-2.5 text-sm font-bold transition-all duration-150  hover:-translate-y-px whitespace-nowrap">
                    {fr.nav.getPhoto} →
                  </Link>
                </>
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2">
              {status !== "loading" && !session && (
                <Link href="/fr/passport-photo-online" className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors shadow-sm shadow-blue-500/20/20">
                  {fr.nav.getPhoto}
                </Link>
              )}
              {status !== "loading" && session && (
                <Link href="/fr/passport-photo-online" className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors shadow-sm">
                  {fr.nav.newPhoto}
                </Link>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150"
                aria-label="Basculer le menu"
                aria-expanded={mobileOpen}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="border-t border-gray-100 pt-3 pb-5 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50/70 rounded-xl transition-all duration-150">
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2 mx-1" />
              <Link href="/fr/guides" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-blue-700 hover:bg-blue-50/70 rounded-xl transition-all duration-150">
                {fr.nav.faq}
              </Link>
              {status !== "loading" && (
                <div className="mt-2 mx-1 flex flex-col gap-2">
                  <div className="flex justify-center mb-2">
                    <LanguageSwitcher />
                  </div>
                  {session ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-center py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors">
                        {fr.nav.dashboard}
                      </Link>
                      <button onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/fr" }); }} className="py-2.5 text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors">
                        {fr.nav.logout}
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-4 py-1">
                     
                    </div>
                  )}
                  <Link href="/fr/passport-photo-online" onClick={() => setMobileOpen(false)} className="bg-blue-600 text-white text-center hover:bg-blue-700 active:bg-blue-800 rounded-xl px-5 py-3 text-sm font-bold transition-all shadow-sm shadow-blue-500/20/25">
                    {fr.buttons.getApprovedPhoto}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
