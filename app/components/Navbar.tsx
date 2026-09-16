"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import LiveActivityChip from "./LiveActivityChip";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const navLinks = [
  { href: "/passport-photo-online", label: "Create Photo" },
  { href: "/visa-photo-validator", label: "Free Validator" },
  { href: "/passport-photo-sizes", label: "Passport Sizes" },
  { href: "/blog", label: "Blog & Guides" },
  { href: "/support", label: "Support" },
];

const checkerLinks = [
  { href: "/visa-photo-validator", label: "Free Photo Validator", desc: "Universal ICAO compliance checker for 50+ countries" },
  { href: "/passport-photo-checker", label: "Passport Photo Checker", desc: "Global biometric passport photo validation" },
  { href: "/online-passport-photo-checker", label: "Online Photo Checker", desc: "Instant in-browser check without app installation" },
  { href: "/australian-passport-photo-checker", label: "Australian Photo Checker", desc: "DFAT & APO 35×45mm compliance checker" },
  { href: "/diversity-visa-lottery-photo-checker", label: "DV Lottery Photo Checker", desc: "Green card lottery 600×600 px photo test" },
  { href: "/uk-passport-photo-checker-online-free", label: "UK Photo Checker", desc: "HMPO 35×45mm compliance checker" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <LiveActivityChip />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-900/[0.04]"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] lg:h-[70px]">

            {/* ── Logo ── */}
            <Link href="/" className="group">
              <Logo size="md" />
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-1 flex-1 ml-10">
              {navLinks.map((link) => (
                link.href === "/visa-photo-validator" ? (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      prefetch={true}
                      className="relative px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/80 transition-all duration-150 whitespace-nowrap flex items-center gap-1.5"
                    >
                      {link.label}
                      <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform duration-150 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                    </Link>
                    {/* Dropdown Menu */}
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 pt-2 w-80 z-50">
                      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-2 space-y-1">
                        {checkerLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            prefetch={true}
                            className="flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-blue-50/70 transition-colors group/item"
                          >
                            <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {item.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className="relative px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/80 transition-all duration-150 whitespace-nowrap group"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  </Link>
                )
              ))}
            </div>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <LanguageSwitcher />
              {status === "loading" ? (
                <div className="flex items-center gap-3">
                  <div className="w-14 h-5 bg-slate-100 animate-pulse rounded-md" />
                  <div className="w-36 h-9 bg-slate-100 animate-pulse rounded-xl" />
                </div>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    prefetch={true}
                    className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-150"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors duration-150"
                  >
                    Log out
                  </button>
                  <Link
                    href="/passport-photo-online"
                    prefetch={true}
                    className="bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-150 shadow-sm hover:shadow-md hover:shadow-black/10 hover:-translate-y-px"
                  >
                    New Photo →
                  </Link>
                </>
              ) : (
                <Link
                  href="/passport-photo-online"
                  prefetch={true}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white hover:from-blue-700 hover:to-indigo-800 active:scale-[0.98] rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-150 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-px whitespace-nowrap"
                >
                  Create Approved Photo →
                </Link>
              )}
            </div>

            {/* ── Mobile right: CTA + hamburger ── */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Compact CTA on mobile */}
              {status === "loading" && (
                <div className="w-[84px] h-[32px] bg-slate-100 animate-pulse rounded-lg" />
              )}
              {status !== "loading" && !session && (
                <Link
                  href="/passport-photo-online"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-3.5 py-2 text-xs font-bold transition-colors shadow-sm shadow-blue-600/20"
                >
                  Create Photo
                </Link>
              )}
              {status !== "loading" && session && (
                <Link
                  href="/passport-photo-online"
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors shadow-sm"
                >
                  New Photo
                </Link>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150"
                aria-label="Toggle menu"
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

          {/* ── Mobile menu ── */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-slate-100 pt-3 pb-5 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                link.href === "/visa-photo-validator" ? (
                  <div key={link.href} className="flex flex-col">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-150"
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">6 Checkers</span>
                    </Link>
                    <div className="pl-4 pr-2 pb-2 grid grid-cols-2 gap-1.5">
                      {checkerLinks.slice(1).map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-slate-100 bg-slate-50/60"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                )
              ))}

              <div className="h-px bg-slate-100 my-2 mx-1" />

              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-150"
              >
                FAQ
              </Link>

              {/* Auth section on mobile */}
              {status !== "loading" && (
                <div className="mt-2 mx-1 flex flex-col gap-2">
                  <div className="flex justify-center mb-2">
                    <LanguageSwitcher />
                  </div>
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="text-center py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/login" }); }}
                        className="py-2.5 text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-4 py-1">
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Log in
                      </Link>
                      <span className="text-slate-200 text-lg">·</span>
                      <Link
                        href="/signup"
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}

                  <Link
                    href="/passport-photo-online"
                    onClick={() => setMobileOpen(false)}
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-center hover:from-blue-700 hover:to-indigo-800 rounded-xl px-5 py-3 text-sm font-bold transition-all shadow-md shadow-blue-600/25"
                  >
                    Get My Approved Photo →
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