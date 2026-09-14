"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Zap, Globe, ShieldCheck } from "lucide-react";

const trustBadges = [
  { icon: Lock, iconColor: "text-amber-500", text: "100% Private & Encrypted" },
  { icon: Zap, iconColor: "text-blue-600", text: "Instant Result in 5s" },
  { icon: Globe, iconColor: "text-cyan-600", text: "50+ Countries Supported" },
  { icon: ShieldCheck, iconColor: "text-emerald-600", text: "Free Biometric Pre-check" },
];

export default function HomeHero() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const calcPos = useCallback((clientX: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.min(97, Math.max(3, pct)));
      setHasInteracted(true);
    });
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      calcPos(e.clientX);
    },
    [calcPos],
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => calcPos(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, calcPos]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      calcPos(e.touches[0].clientX);
    },
    [calcPos],
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: TouchEvent) => {
      if (e.touches.length > 0) calcPos(e.touches[0].clientX);
    };
    const end = () => setIsDragging(false);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, [isDragging, calcPos]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle glowing ambient accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── TEXT COLUMN ── */}
            <div className="flex-1 w-full text-center lg:text-left">
              {/* Official badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 rounded-full px-4 py-1.5 mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse inline-block" />
                <span className="text-xs font-bold text-blue-800 tracking-wide uppercase">
                  Official Biometric Photo Tool · ICAO Compliant
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4">
                Create &amp; Resize Passport &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">Visa Photos Online</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-medium mb-5 leading-relaxed">
                ICAO-compliant passport &amp; visa photo maker with AI background removal in 30 seconds
              </p>

              <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Automated compliance checks against official embassy specifications for 50+ countries. Get exact dimensions (2×2 in, 35×45 mm, 600×600 px) and file sizes (20KB–200KB).
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <Link
                  href="/passport-photo-online"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  Create Approved Photo Now →
                </Link>
                <Link
                  href="/visa-photo-validator"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-base font-bold px-7 py-4 rounded-xl shadow-xs hover:-translate-y-0.5 transition-all duration-200"
                >
                  Free Photo Validator
                </Link>
              </div>

              {/* Stars & Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                  <span className="text-slate-900 font-bold">4.9 / 5.0</span> · Trusted by 17,000+ applicants worldwide
                </span>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {trustBadges.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white border border-slate-200/90 shadow-xs rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 transition-colors"
                    >
                      <Icon className={`w-3.5 h-3.5 ${t.iconColor}`} />
                      <span>{t.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── BEFORE / AFTER SLIDER ── */}
            <div className="w-full lg:w-auto flex flex-col items-center gap-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Live AI Transformation Preview
              </div>

              <div
                ref={containerRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                className="relative rounded-2xl overflow-hidden border-2 border-slate-200/80 shadow-2xl shadow-slate-900/10 bg-slate-900"
                style={{
                  aspectRatio: "1 / 1",
                  width: "100%",
                  maxWidth: "400px",
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  cursor: isDragging ? "ew-resize" : "col-resize",
                }}
              >
                {/* BEFORE — base layer */}
                <Image
                  src="/us_non_imigrant_before.webp"
                  alt="Before – original casual photo"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                />

                {/* AFTER — clipped right */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    clipPath: `inset(0 0 0 ${sliderPos}%)`,
                    willChange: "clip-path",
                    pointerEvents: "none",
                  }}
                >
                  <Image
                    src="/us_non_imigrant.png"
                    alt="After – 100% compliant biometric photo"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 8%",
                      pointerEvents: "none",
                    }}
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>

                {/* Divider Line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: `${sliderPos}%`,
                    width: "3px",
                    background: "linear-gradient(to bottom, #38BDF8, #3B82F6, #6366F1)",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    pointerEvents: "none",
                    boxShadow: "0 0 12px rgba(59,130,246,0.8)",
                    willChange: "left",
                  }}
                />

                {/* Slider Handle Button */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: `${sliderPos}%`,
                    transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})`,
                    width: "42px",
                    height: "42px",
                    background: "#0F172A",
                    border: "2px solid #38BDF8",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2px",
                    zIndex: 3,
                    pointerEvents: "none",
                    willChange: "left, transform",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* BEFORE badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "14px",
                    background: "rgba(15, 23, 42, 0.75)",
                    backdropFilter: "blur(4px)",
                    color: "#e2e8f0",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    pointerEvents: "none",
                    zIndex: 4,
                    opacity: sliderPos > 15 ? 1 : 0,
                    transition: "opacity 0.2s",
                  }}
                >
                  ORIGINAL
                </div>

                {/* AFTER badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    right: "14px",
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    pointerEvents: "none",
                    zIndex: 4,
                    opacity: sliderPos < 85 ? 1 : 0,
                    transition: "opacity 0.2s",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.4)",
                  }}
                >
                  COMPLIANT ✓
                </div>

                {/* Drag hint */}
                {!hasInteracted && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "50px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(15, 23, 42, 0.8)",
                      backdropFilter: "blur(6px)",
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 600,
                      pointerEvents: "none",
                      zIndex: 5,
                      whiteSpace: "nowrap",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    ↔ Drag slider to compare
                  </div>
                )}
              </div>

              {/* Caption */}
              <p className="text-xs text-slate-500 text-center max-w-xs font-medium">
                Plain White/Grey Background · Biometric Head Scaling · 300 DPI
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── EXAMPLE OUTPUT SECTION ── */}
      <section className="bg-slate-50/60 border-b border-slate-200/80 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Example Output &amp; Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Transform Any Casual Selfie Into Government-Compliant Photos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
              From upload to official print sheet with biometric measurements guaranteed.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
                alt: "Passport photo with measurements",
                label: "1. Biometric Analysis",
                note: "Face detection with eye-level & head-ratio measurement guides",
                badge: "AI SCAN",
                href: undefined as string | undefined,
                featured: false,
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779008017/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_photo_eyp4a3.jpg",
                alt: "Final compliant photo",
                label: "2. Final Compliant Photo",
                note: "Official plain white/grey background & exact 300 DPI crop",
                badge: "OFFICIAL OUTPUT",
                href: undefined as string | undefined,
                featured: true,
              },
              {
                src: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_auto,q_auto,w_600/v1779076959/MakePassportPhoto_ph2uog.jpg",
                alt: "4x6 print sheet",
                label: "3. Print Sheet Template",
                note: "Ready-to-print 4×6 inch sheet with cutting guides",
                badge: "PRINT READY",
                href: "/passport-photo-print-template-generator",
                featured: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden bg-white transition-all duration-300 ${
                  item.featured
                    ? "border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-[1.02] relative"
                    : "border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md hover:-translate-y-1"
                }`}
              >
                {item.featured && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black text-center py-1 tracking-wider uppercase">
                    ★ Guaranteed Compliant
                  </div>
                )}
                <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block w-full h-full relative group/img"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </Link>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <div className="p-5 border-t border-slate-100">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 mb-1.5 group/link"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs group-hover/link:translate-x-0.5 transition-transform">↗</span>
                    </Link>
                  ) : (
                    <div className="text-sm font-bold text-slate-900 mb-1.5">
                      {item.label}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}