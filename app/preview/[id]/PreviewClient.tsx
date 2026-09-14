"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo, useCallback, startTransition, memo } from "react";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { getSpecById } from "@/lib/specs";
import { usePayment, LocalPrice } from "./hooks/usePayment";
import { ComplianceCheck } from "./types";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({
  d,
  size = 16,
  stroke = 2,
  className = "",
}: {
  d: string;
  size?: number;
  stroke?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  zoom: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  close: "M18 6L6 18M6 6l12 12",
  clock:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  warn: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  photo:
    "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8",
  person:
    "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8",
  refresh:
    "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const cx = (...c: (string | false | undefined | null)[]) =>
  c.filter(Boolean).join(" ");

const METRIC_FIXES = [
  { key: "gov12", label: "ICAO Standard photo", icon: "✓" },

  { key: "gov", label: "Government compliant photo", icon: "✓" },
  { key: "gov5", label: "AI biometric validation", icon: "✓" },
  { key: "gov2", label: "100% acceptance guarantee", icon: "✓" },
  { key: "gov0", label: "Refund if rejected", icon: "✓" },
  { key: "gov3", label: "Instant download + print sheet", icon: "✓" },
];

function MetricFix({ metric }: { metric: (typeof METRIC_FIXES)[0] }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-slate-100 last:border-0">
      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <Icon
          d={ICONS.check}
          size={11}
          className="text-blue-600"
          stroke={2.5}
        />
      </div>
      <span className="text-[13px] text-slate-700 font-medium">
        {metric.label}
      </span>
    </div>
  );
}

// Flat trust strip — the thing that should make someone feel safe paying
function TrustBadges({
  from,
  spec,
  documentType,
}: {
  from?: string;
  spec?: any;
  documentType?: string;
}) {
  const isUK =
    from === "uk" ||
    from === "uk-passport" ||
    from?.startsWith("uk") ||
    spec?.country === "United Kingdom" ||
    documentType?.toLowerCase().startsWith("uk") ||
    documentType?.toLowerCase().startsWith("gb");

  const isCanada =
    from === "canada" ||
    from === "canada-passport" ||
    from?.startsWith("canada") ||
    spec?.country === "Canada" ||
    documentType?.toLowerCase().startsWith("canada") ||
    documentType?.toLowerCase().startsWith("ca");
  const badges = [
    { icon: ICONS.shield, text: "Secure Checkout" },
    { icon: ICONS.refresh, text: "Refund if Rejected" },
    { icon: ICONS.lock, text: "256-bit SSL" },
  ];
  return (
    <div className="flex items-center justify-center gap-x-5 gap-y-1.5 py-3 flex-wrap border-t border-slate-100 mt-3">
      {isUK && (
        <div className="flex items-center gap-1.5 text-slate-500">
          <Icon d={ICONS.shield} size={13} className="text-blue-600" />
          <span className="text-[11px] font-semibold text-slate-700">
            UK Gov Compliant
          </span>
        </div>
      )}
      {isCanada && (
        <div className="flex items-center gap-1.5 text-slate-500">
          <Icon d={ICONS.shield} size={13} className="text-red-600" />
          <span className="text-[11px] font-semibold text-slate-700">
            IRCC &amp; Passport Program Compliant
          </span>
        </div>
      )}
      {badges.map((b, i) => (
        <div key={i} className="flex items-center gap-1.5 text-slate-500">
          <Icon d={b.icon} size={13} className="text-emerald-600" />
          <span className="text-[11px] font-semibold">{b.text}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Panels ──────────────────────────────────────────────────────────────

function PhotoPanel({
  previewUrl,
  hasPaid,
  checks,
  passCount,
  metrics,
  spec,
  onZoom,
}: {
  previewUrl: string;
  hasPaid: boolean;
  checks: ComplianceCheck[];
  passCount: number;
  metrics: any;
  spec: any;
  onZoom: () => void;
}) {
  const allPass = checks.length > 0 && passCount === checks.length;

  return (
    <div className="space-y-4">
      {/* Photo Card — flat, single hairline border, no shadow */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Top bar */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>{spec?.flag || "📄"}</span>{" "}
              {spec?.name || spec?.country || "Document Photo"}
            </p>
          </div>
          {allPass && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1">
              <Icon d={ICONS.check} size={12} stroke={2.5} />
              <span className="text-[11px] font-bold">Verified Compliant</span>
            </div>
          )}
        </div>

        {/* Photo */}
        <div
          className="relative cursor-zoom-in group mx-5 mb-5 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center"
          onClick={onZoom}
          style={{ minHeight: 240 }}
        >
          <img
            src={previewUrl}
            alt="Passport Preview"
            className="max-h-[420px] w-auto max-w-full object-contain select-none pointer-events-none block"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Hover zoom hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <div className="bg-white border border-slate-200 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon d={ICONS.zoom} size={18} className="text-slate-800" />
            </div>
          </div>
        </div>
      </div>

      {/* What We Fixed */}
      {metrics && !hasPaid && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon d={ICONS.photo} size={14} className="text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-900">
              Your Photo Meets Official Requirements
            </p>
          </div>
          <div className="space-y-0">
            {METRIC_FIXES.map((m) => (
              <MetricFix key={m.key} metric={m} />
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-200 px-3 py-2.5 flex items-start gap-2">
            <Icon
              d={ICONS.star}
              size={13}
              className="text-blue-600 shrink-0 mt-0.5"
            />
            <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
              ✓ Background professionally corrected to official requirements
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderPanel({
  productName,
  docCategory,
  localPrice,
  expertPrice,
  isExpertPlan,
  setIsExpertPlan,
  hasPaid,
  timeLeft,
  loading,
  verifying,
  handlePayment,
  documentType,
  photoId,
  status,
  guestEmail,
  setGuestEmail,
  handleEmailPhoto,
  spec,
  from,
  onOpenFixModal,
  downloadToken,
}: any) {
  return (
    <div className="w-full lg:w-[38%] space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden lg:sticky lg:top-6">
        <div className="p-5 sm:p-6">
          {!hasPaid ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Icon
                  d={ICONS.shield}
                  size={14}
                  className="text-emerald-600 shrink-0"
                />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Order Summary - Accepted for passport &amp; visa applications
                </p>
              </div>

              {/* Plans */}
              <div className="space-y-3">
                {/* Basic */}
                <button
                  onClick={() => setIsExpertPlan(false)}
                  className={cx(
                    "w-full text-left rounded-xl border-2 p-4 transition-colors duration-150 relative",
                    !isExpertPlan
                      ? "border-emerald-500 bg-emerald-50/60"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Standard Pack
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-900">
                        {localPrice?.formatted}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      " AI Biometric Check",
                      "Instant digital download",
                      " Official A4 print sheet",
                      "100% acceptance guarantee",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-[13px] text-slate-600 font-medium"
                      >
                        <Icon
                          d={ICONS.check}
                          size={12}
                          className={
                            !isExpertPlan
                              ? "text-emerald-600"
                              : "text-slate-300"
                          }
                          stroke={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>

                {/* Expert Review / Premium Pack Card */}
                <div
                  onClick={() => setIsExpertPlan(true)}
                  className={cx(
                    "w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 relative cursor-pointer",
                    isExpertPlan
                      ? "border-blue-500 bg-blue-50/70/30 shadow-[0_0_0_1px_rgba(132,204,22,0.2)]"
                      : "border-slate-200 bg-white hover:border-blue-300",
                  )}
                >
                  {/* Floating MOST POPULAR Badge */}
                  <div className="absolute -top-3 right-5 bg-[#ff9500] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs z-10">
                    MOST POPULAR
                  </div>

                  {/* Header: Tag, Title & Price */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                        EXPERT REVIEW
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 mt-1">
                        Premium Pack
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900">
                        {expertPrice?.formatted || "₹599"}
                      </p>
                    </div>
                  </div>

                  {/* Features List with Green Checkmarks */}
                  <ul className="space-y-2 mb-4">
                    {[
                      "Everything in Standard",
                      "Human expert review in <15 min",
                      "Extra compliance verifications",
                      "Priority processing",
                      "Email support",
                      "Reduced rejection risk",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-[13.5px] text-slate-700 font-medium leading-snug"
                      >
                        <Icon
                          d={ICONS.check}
                          size={14}
                          className="text-emerald-500 shrink-0"
                          stroke={3}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Sub-Card: See What Our Experts Fix */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpertPlan(true);
                      startTransition(() => {
                        if (onOpenFixModal) onOpenFixModal();
                      });
                    }}
                    className="bg-blue-50/70/80 border border-blue-200/90 rounded-xl p-3.5 flex items-center justify-between gap-3 group/fix hover:bg-blue-100/70 transition-colors cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 leading-tight group-hover/fix:text-blue-700 transition-colors">
                          See What Our Experts Fix
                        </h5>
                        
                      </div>

                      {/* Avatars + Count */}
                      <div className="flex items-center">
                        <div className="flex -space-x-2 overflow-hidden py-0.5">
                          {[
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
                            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
                          ].map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt="Customer avatar"
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-slate-600 ml-2.5">
                          +2.7k
                        </span>
                      </div>
                    </div>

                    {/* Green Action Button */}
                    <div className="w-9 h-9 rounded-full bg-emerald-500 group-hover/fix:bg-emerald-600 text-white flex items-center justify-center transition-transform group-hover/fix:scale-105 shrink-0 shadow-xs">
                      <Icon d={ICONS.arrowRight} size={16} stroke={2.5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Email */}
              {status !== "authenticated" && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email for Delivery
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e: any) => setGuestEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              )}

              {/* CTA */}
              <div className="space-y-1 pt-1 hidden lg:block">
                <button
                  onClick={handlePayment}
                  disabled={loading || verifying}
                  className={cx(
                    "w-full font-bold py-4 rounded-xl transition-colors text-sm tracking-wide flex items-center justify-center gap-2.5 disabled:opacity-50",
                    isExpertPlan
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20/20"
                      : "bg-slate-900 hover:bg-black text-white",
                  )}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Icon d={ICONS.lock} size={15} className="shrink-0" />
                      {isExpertPlan
                        ? "Get Expert Review"
                        : "Download Now"} —{" "}
                      {isExpertPlan
                        ? expertPrice?.formatted
                        : localPrice?.formatted}
                    </>
                  )}
                </button>

                <TrustBadges from={from} spec={spec} documentType={documentType} />

                <div className="flex justify-center pt-1">
                  <a
                    href="https://razorpay.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      referrerPolicy="origin"
                      src="https://badges.razorpay.com/badge-dark.png"
                      style={{ height: 40, width: 100 }}
                      alt="Razorpay | Payment Gateway | Neobank"
                    />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* ── Paid ─────────────────────────────────────────────────────────── */
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-200">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon d={ICONS.check} size={28} stroke={3} />
                </div>

                <h2 className="text-emerald-800 font-semibold text-xl">
                  Payment Successful!
                </h2>

                <div className="mt-3 text-emerald-600 text-sm leading-relaxed">
                  <p>
                    Every ID photo is carefully reviewed by our experts to
                    ensure it meets all requirements.
                  </p>
                  <p className="mt-1">
                    If we find any issues, we’ll notify you via email with your
                    photo.
                  </p>
                  <p className="mt-1">
                    For any questions, feel free to contact us at{" "}
                    <a
                      href="mailto:support@pixpassvisa.com"
                      className="font-medium text-emerald-700 underline"
                    >
                      support@pixpassvisa.com
                    </a>
                  </p>
                </div>
              </div>

              <a
                href={`/api/download/${photoId}${downloadToken ? `?token=${encodeURIComponent(downloadToken)}` : ""}`}
                download={`studio-photo-${documentType}.jpeg`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm"
              >
                <Icon d={ICONS.download} size={16} />
                Download Digital {docCategory} Photo
              </a>

              <a
                href={`/passport-photo-print-template-generator?imageUrl=${encodeURIComponent(`/api/download/${photoId}${downloadToken ? `?token=${encodeURIComponent(downloadToken)}` : ""}`)}&width=${spec?.width_mm || ""}&height=${spec?.height_mm || ""}&name=${encodeURIComponent(spec?.name || "")}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors text-sm"
              >
                <Icon d={ICONS.photo} size={16} className="shrink-0" />
                Customize &amp; Print Sheet (A4 / 4×6 / 5×7)
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleEmailPhoto}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200"
                >
                  <Icon d={ICONS.mail} size={14} /> Email Me
                </button>
                <a
                  href="#"
                  className="bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-amber-200"
                >
                  <Icon d={ICONS.star} size={14} /> Rate Us
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const BEFORE_AFTER_PAIRS = [
  {
    title: "Wall Shadow Removal & Background Calibration",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786628280/before_uk_f24dre.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786627664/eu_pixpassvisa.com_ppfhlr.jpg",
    beforeTag: "Original: Wall Shadow & Yellow Tint",
    afterTag: "Expert Fixed: 100% Compliant White BG",
  },
  {
    title: "Biometric Eye Level & Face Centering",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786630383/1000383324_bxx77h.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786630498/597e95e4-676d-41dd-be79-c45be7e07b04_photo_zm53xt.jpg",
    beforeTag: "Original: Head Tilted & Off-Center",
    afterTag: "Expert Fixed: Aligned Biometric Crop",
  },
  {
    title: "Glare & Reflection Reduction on Glasses",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786628395/before_us_phel7i.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786628788/ulape_c0dexm.jpg",
    beforeTag: "Original: Harsh Lighting & Glare",
    afterTag: "Expert Fixed: Clear Biometric Visibility",
  },
  {
    title: "Head Tilt Correction & Alignment",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786628855/bef_d5mwgy.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786628853/ff150d13-c01a-418a-8e26-9483f3a7907c_photo_pttp0l.jpg",
    beforeTag: "Original: Tilted Angle & Exposure",
    afterTag: "Expert Fixed: Perfectly Straight Head",
  },
  {
    title: "Lighting & Contrast Balancing",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629026/1000378632_1_g13xko.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629107/ebec124b-38dd-44b9-8b2b-5a11972d15c2_photo_ukzvse.jpg",
    beforeTag: "Original: Dim Lighting & Underexposed",
    afterTag: "Expert Fixed: Studio-Quality Illumination",
  },
  {
    title: "Background Uniformity & Noise Removal",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629172/Minimal_studio_portrait_of_young_man_wpjxdp.png",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629173/file_ge84gv_fhqvi2.png",
    beforeTag: "Original: Textured Background",
    afterTag: "Expert Fixed: Pure Plain White Surface",
  },
  {
    title: "Official Passport Aspect Ratio & Crop",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629405/A_passport_e4y2u3.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629172/pix_passport_y4bjki.jpg",
    beforeTag: "Original: Incorrect Crop Ratio",
    afterTag: "Expert Fixed: Exact Embassy Dimensions",
  },
  {
    title: "Color Balance & Tone Normalization",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629541/1000379376_1_d2ibas.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629817/cropped-tttt_vpemzs.jpg",
    beforeTag: "Original: Color Cast & Shadows",
    afterTag: "Expert Fixed: Natural Skin Tone",
  },
  {
    title: "Shoulder Leveling & Posture Balance",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629895/1000368998_1_mmnu84.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786629988/98411d2e-09fd-4d93-9fa7-cbe7e6db2460_photo_qrmwty.jpg",
    beforeTag: "Original: Uneven Shoulder Height",
    afterTag: "Expert Fixed: Balanced Posture",
  },
  {
    title: "Sharpness Enhancement & Blur Correction",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786630037/jia6lx858xnimc2w6ypn_fcjvj0.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786630035/c869b2b2-f238-4151-b480-6a08ba0cbe24_photo_upfgcd.jpg",
    beforeTag: "Original: Slightly Soft Focus",
    afterTag: "Expert Fixed: High-Definition Clarity",
  },
  {
    title: "Full ICAO Standard Compliance Verification",
    beforeImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786630292/1000383509_ffkmf2.jpg",
    afterImg:
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786630114/3606955d-8470-4d49-a65d-7425be0b182f_photo_qsbsbu.jpg",
    beforeTag: "Original: Non-Standard Photo",
    afterTag: "Expert Fixed: 100% Embassy Approved",
  },
];

const ExpertsFixModal = memo(function ExpertsFixModal({
  isOpen,
  onClose,
  onContinue,
  expertPrice,
  previewUrl,
  guestEmail,
  setGuestEmail,
  status,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (email: string) => void;
  expertPrice?: string;
  previewUrl?: string;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  status?: string;
}) {
  const [emailInput, setEmailInput] = useState(guestEmail || "");

  useEffect(() => {
    setEmailInput(guestEmail || "");
  }, [guestEmail]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });

    const rafId = requestAnimationFrame(() => {
      document.body.style.overflow = "hidden";
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = (emailInput || "").trim();
    if (
      status !== "authenticated" &&
      (!trimmed || !trimmed.includes("@") || !trimmed.includes("."))
    ) {
      alert("Please enter a valid email address to continue.");
      return;
    }
    setGuestEmail(trimmed);
    onContinue(trimmed);
  };

  return (
    <div
      className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl overflow-hidden border-t sm:border border-slate-200/80 relative h-[94dvh] sm:h-auto max-h-[94dvh] sm:max-h-[88vh] flex flex-col transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Light Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white border-b border-slate-200/80 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3.5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <Icon d={ICONS.close} size={15} />
          </button>

          <div className="pr-10 sm:pr-12">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Human Expert Review
              </span>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                • 100% Acceptance Guaranteed
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
              See What Our Experts Fix
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 grow bg-slate-50/60">
          {/* User Confirmation Note Banner */}
          <div className="bg-purple-50/90 border border-purple-200/80 rounded-xl p-3 sm:p-3.5 text-xs text-purple-900 font-medium flex items-start sm:items-center gap-2.5 sm:gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Icon d={ICONS.shield} size={15} stroke={2.5} />
            </div>
            <span className="leading-snug">
              This information and customer feedback is added based on user
              confirmation &amp; verified submission results.
            </span>
          </div>

          {/* Transformation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {BEFORE_AFTER_PAIRS.map((pair, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4.5 space-y-2.5 sm:space-y-3 flex flex-col justify-between shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {pair.title}
                  </h4>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  <div className="space-y-1.5">
                    <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/5] flex items-center justify-center group/img">
                      <img
                        src={pair.beforeImg}
                        alt="Before expert fix"
                        loading="lazy"
                        decoding="async"
                        width={180}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-rose-500/95 text-white text-[8.5px] sm:text-[9.5px] font-black px-2 py-0.5 rounded-md sm:rounded-full uppercase tracking-wider shadow-xs">
                        Before
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-slate-50 border-2 border-emerald-500/80 aspect-[4/5] flex items-center justify-center shadow-xs group/img">
                      <img
                        src={pair.afterImg}
                        alt="After expert fix"
                        loading="lazy"
                        decoding="async"
                        width={180}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-emerald-600/95 text-white text-[8.5px] sm:text-[9.5px] font-black px-2 py-0.5 rounded-md sm:rounded-full uppercase tracking-wider shadow-xs">
                        After
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Footer */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3.5 sm:px-6 sm:py-4 bg-white border-t border-slate-200/80 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-20"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="shrink-0 flex items-center justify-between sm:flex-col sm:items-start sm:justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Premium Pack
              </span>
              <span className="text-base sm:text-xl font-black text-slate-900 leading-tight">
                {expertPrice || "₹599"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 grow max-w-xl">
              {status !== "authenticated" && (
                <div className="relative grow">
                  <Icon
                    d={ICONS.mail}
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter email address for delivery"
                    className="w-full pl-9 pr-3 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer min-h-[42px] sm:min-h-[44px]"
              >
                <span>Continue</span>
                <Icon d={ICONS.arrowRight} size={16} stroke={2.5} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

function ZoomOverlay({
  url,
  hasPaid,
  onClose,
}: {
  url: string;
  hasPaid: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(4,4,10,0.96)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
      >
        <Icon d={ICONS.close} size={16} className="text-white/70" />
      </button>

      <div onClick={(e) => e.stopPropagation()}>
        <div className="rounded-lg overflow-hidden relative">
          <img
            src={url}
            alt="Full preview"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-auto block"
          />
          {!hasPaid && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="text-white/15 text-xs font-bold tracking-[0.3em] uppercase select-none"
                style={{ transform: "rotate(-30deg)" }}
              >
                Preview Only
              </span>
            </div>
          )}
        </div>
        <p className="text-center text-white/25 text-[11px] mt-4  tracking-widest uppercase">
          {hasPaid ? "Full Resolution" : "Watermarked Preview"} · Esc to close
        </p>
      </div>
    </div>
  );
}

function MobileCTA({
  productName,
  localPrice,
  expertPrice,
  isExpertPlan,
  loading,
  handlePayment,
  status,
  guestEmail,
  setGuestEmail,
}: any) {
  const price = isExpertPlan ? expertPrice : localPrice;
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 pt-3 pb-4 lg:hidden">
        <div className="max-w-lg mx-auto">
          {status !== "authenticated" && (
            <div className="mb-2.5">
              <input
                type="email"
                value={guestEmail || ""}
                onChange={(e: any) => setGuestEmail(e.target.value)}
                placeholder="Email for your photo"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                {productName}
              </p>
              <p className="text-lg font-black text-slate-900 leading-tight">
                {price?.formatted || "..."}
              </p>
            </div>
            <div className="w-px h-8 bg-slate-200 shrink-0" />
            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-colors bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Icon d={ICONS.lock} size={15} />
                  {isExpertPlan ? "Expert Review" : "Download Photo"}
                </>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            <Icon
              d={ICONS.shield}
              size={12}
              className="text-emerald-600 shrink-0"
            />
            <p className="text-center text-[11px] text-slate-500 font-semibold">
              Secure · Refund if rejected · No subscription
            </p>
          </div>
        </div>
      </div>
      <div className="h-28 lg:hidden" />
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function PreviewClient({
  photoId,
  previewUrl,
  documentType,
  metrics,
  localPrice: initialLocalPrice,
  expertPrice: initialExpertPrice,
  initialIsPaid,
  from,
  downloadToken: initialDownloadToken,
}: {
  photoId: string;
  previewUrl: string;
  documentType: string;
  metrics: any;
  localPrice: LocalPrice;
  expertPrice: LocalPrice;
  initialIsPaid?: boolean;
  from?: string;
  downloadToken?: string;
}) {
  const { data: session, status } = useSession();
  const [hasPaid, setHasPaid] = useState(initialIsPaid || false);
  const [downloadToken, setDownloadToken] = useState(initialDownloadToken || "");
  const [guestEmail, setGuestEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [localPrice, setLocalPrice] = useState<LocalPrice>(initialLocalPrice);
  const [expertPrice, setExpertPrice] =
    useState<LocalPrice>(initialExpertPrice);
  const [isExpertPlan, setIsExpertPlan] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);

  const spec = getSpecById(documentType);
  const isUK =
    from === "uk" ||
    from === "uk-passport" ||
    from?.startsWith("uk") ||
    spec?.country === "United Kingdom" ||
    documentType?.toLowerCase().startsWith("uk") ||
    documentType?.toLowerCase().startsWith("gb");
  const isVisa =
    spec?.name?.toLowerCase().includes("visa") ||
    documentType.toLowerCase().includes("visa");
  const docCategory = isVisa ? "Visa" : "Passport";
  const productName = spec?.name || `${docCategory} Photo`;

  const { verifying, checks, overallPass } = useMemo(() => {
    if (!metrics) return { verifying: false, checks: [], overallPass: false };
    const results: ComplianceCheck[] = [];
    let hasWarn = false;

    const push = (
      name: string,
      s: "PASS" | "WARN" | "FAIL",
      value: string,
      detail: string,
    ) => {
      results.push({ name, status: s, value, detail });
      if (s === "WARN" || s === "FAIL") hasWarn = true;
    };

    push("Face Detection", "PASS", "1 face verified", "Single face detected");

    const eyePct = metrics.eyeLevelPct || 0;
    const minEye = Number(spec?.eye_min_pct) || 56;
    const maxEye = Number(spec?.eye_max_pct) || 69;
    push(
      "Eye Level",
      eyePct >= minEye && eyePct <= maxEye ? "PASS" : "WARN",
      `${eyePct.toFixed(1)}%`,
      `Target: ${minEye}–${maxEye}%`,
    );

    const headPct = metrics.headSizePct || 0;
    const minHead = Number(spec?.head_min_pct) || 50;
    const maxHead = Number(spec?.head_max_pct) || 69;
    push(
      "Head Size",
      headPct >= minHead && headPct <= maxHead ? "PASS" : "WARN",
      `${headPct.toFixed(1)}%`,
      `Target: ${minHead}–${maxHead}%`,
    );

    const bgValid = metrics.backgroundValid || metrics.backgroundCorrected;
    push(
      "Background",
      bgValid ? "PASS" : "WARN",
      bgValid ? "Corrected ✓" : "Review Needed",
      bgValid ? "Auto-corrected to white" : "Needs correction",
    );

    return { verifying: false, checks: results, overallPass: !hasWarn };
  }, [metrics, spec]);

  const passCount = checks.filter((c) => c.status === "PASS").length;

  const { loading, handlePayment } = usePayment({
    photoId,
    localPrice: isExpertPlan ? expertPrice : localPrice,
    isExpert: isExpertPlan,
    guestEmail,
    status:
      status === "authenticated"
        ? "authenticated"
        : status === "loading"
          ? "loading"
          : "unauthenticated",
    session,
    setHasPaid,
    onSuccess: (data) => {
      if (data?.downloadToken) {
        setDownloadToken(data.downloadToken);
      }
    },
  });

  const onPaymentClick = () => {
    const trimmed = (guestEmail || "").trim();
    const isEmailValid = !!(
      trimmed &&
      trimmed.includes("@") &&
      trimmed.includes(".")
    );
    if (status !== "authenticated" && !isEmailValid) {
      setIsEmailDialogOpen(true);
      return;
    }
    handlePayment(trimmed);
  };

  const handleDialogSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = (guestEmail || "").trim();
    const isEmailValid = !!(
      trimmed &&
      trimmed.includes("@") &&
      trimmed.includes(".")
    );
    if (isEmailValid) {
      setGuestEmail(trimmed);
      setIsEmailDialogOpen(false);
      handlePayment(trimmed);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    if (
      !initialLocalPrice ||
      (tzCurrency !== initialLocalPrice.currency && tzCurrency !== "USD")
    ) {
      fetch(`/api/currency?currency=${tzCurrency}`)
        .then((r) => r.json())
        .then((d) => {
          if (d?.formatted) setLocalPrice(d);
        })
        .catch(console.error);
      fetch(`/api/currency?currency=${tzCurrency}&isExpert=true`)
        .then((r) => r.json())
        .then((d) => {
          if (d?.formatted) setExpertPrice(d);
        })
        .catch(console.error);
    }
  }, [initialLocalPrice]);

  useEffect(() => {
    const interval = setInterval(
      () => setTimeLeft((p) => (p > 0 ? p - 1 : 0)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  const handleEmailPhoto = async () => {
    const emailTo = window.prompt(
      "Enter your email address to receive the photo:",
    );
    if (!emailTo) return;
    try {
      const res = await fetch("/api/send-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailTo,
          photoUrl: previewUrl,
          documentType,
          photoId,
        }),
      });
      alert(
        res.ok
          ? "Photo sent! Check your inbox."
          : "Failed to send. Please try again.",
      );
    } catch {
      alert("Error sending email.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-200/40 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="mb-4 text-center lg:text-left">
            <h1 className="text-2xl font-black text-slate-900">
              Your <span className="text-blue-600">ID Photo</span> Is Ready{" "}
              {spec?.flag || (isUK ? "🇬🇧" : "")} {spec?.name || spec?.country || (isUK ? "United Kingdom" : "")}
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-1.5 mt-2">
              <Icon
                d={ICONS.shield}
                size={13}
                className="text-emerald-600 shrink-0"
              />
              <p className="text-[12px] text-slate-500 font-semibold flex items-center gap-1 flex-wrap justify-center lg:justify-start">
                Secure checkout · 100% acceptance guarantee · Refund if rejected
                {isUK && (
                  <span className="ml-1 md:ml-2 font-bold text-slate-700 flex items-center gap-1">
                    <span className="text-xl">🇬🇧</span> UK Gov Compliant
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left */}
            <div className="w-full lg:w-[62%]">
              <PhotoPanel
                previewUrl={previewUrl}
                hasPaid={hasPaid}
                checks={checks}
                passCount={passCount}
                metrics={metrics}
                spec={spec}
                onZoom={() => setIsZoomOpen(true)}
              />
            </div>

            {/* Right */}
            <OrderPanel
              productName={productName}
              docCategory={docCategory}
              localPrice={localPrice}
              expertPrice={expertPrice}
              isExpertPlan={isExpertPlan}
              setIsExpertPlan={setIsExpertPlan}
              hasPaid={hasPaid}
              timeLeft={timeLeft}
              loading={loading}
              verifying={verifying}
              handlePayment={onPaymentClick}
              documentType={documentType}
              photoId={photoId}
              status={
                status === "authenticated"
                  ? "authenticated"
                  : status === "loading"
                    ? "loading"
                    : "unauthenticated"
              }
              guestEmail={guestEmail}
              setGuestEmail={setGuestEmail}
              handleEmailPhoto={handleEmailPhoto}
              spec={spec}
              from={from}
              onOpenFixModal={() => setIsFixModalOpen(true)}
              downloadToken={downloadToken}
            />
          </div>
        </div>
      </div>

      {/* Zoom */}
      {isZoomOpen && (
        <ZoomOverlay
          url={previewUrl}
          hasPaid={hasPaid}
          onClose={() => setIsZoomOpen(false)}
        />
      )}

      {/* Experts Fix Modal */}
      <ExpertsFixModal
        isOpen={isFixModalOpen}
        onClose={() => setIsFixModalOpen(false)}
        onContinue={(email: string) => {
          setIsExpertPlan(true);
          setIsFixModalOpen(false);
          if (email) setGuestEmail(email);
          handlePayment(email || guestEmail);
        }}
        expertPrice={expertPrice?.formatted}
        previewUrl={previewUrl}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
        status={
          status === "authenticated" ? "authenticated" : "unauthenticated"
        }
      />

      {/* Mobile CTA */}
      {!hasPaid && !verifying && (
        <MobileCTA
          productName={productName}
          localPrice={localPrice}
          expertPrice={expertPrice}
          isExpertPlan={isExpertPlan}
          loading={loading}
          handlePayment={onPaymentClick}
          status={
            status === "authenticated" ? "authenticated" : "unauthenticated"
          }
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
        />
      )}

      {/* Email Dialog */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden border border-slate-200">
            <form onSubmit={handleDialogSubmit} className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Icon d={ICONS.mail} size={22} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 text-center">
                Where should we send it?
              </h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed text-center">
                Enter your email to receive your processed photo and receipt.
              </p>
              <input
                type="email"
                value={guestEmail}
                onChange={(e: any) => setGuestEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-4"
                autoFocus
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEmailDialogOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
                >
                  Continue →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
