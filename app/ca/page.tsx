import type { Metadata } from "next";
import Link from "next/link";
import { getAllCAPages } from "@/lib/ca-content";
import CAEmbeddedTool from "./components/CAEmbeddedTool";
import CABeforeAfterSlider from "./components/CABeforeAfterSlider";
import { Lightbulb, Check, Sun, Ruler, Camera, ImageIcon, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Canada Passport Size Photo Maker Photo Tool IRCC Compliant",
  description:
    "Create Canadian passport, visa, PR card and ID photos online with automatic 50x70mm & 35x45mm cropping, background checks, and official IRCC & Service Canada photo requirements.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/ca",
    languages: {
      en: "https://www.pixpassvisa.com/ca",
      "x-default": "https://www.pixpassvisa.com/ca",
    },
  },
  openGraph: {
    title: "Canada Passport & Visa Photo Maker | PixPassVisa",
    description:
      "Create Canada passport, visa, PR card, and citizenship photos online. 100% compliant for Service Canada, IRCC, and RCMP.",
    url: "https://www.pixpassvisa.com/ca",
    siteName: "PixPassVisa Canada",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp",
        width: 1200,
        height: 630,
        alt: "Canada Passport Size Photo Maker",
      },
    ],
  },
};

const officialCASources = [
  {
    agency: "Government of Canada — Passport Program",
    doc: "Passport Photo Rules & Specifications",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html",
    note: "Official Canadian standards for 50×70 mm passport photos and guarantor requirements.",
    badge: "Service Canada",
  },
  {
    agency: "IRCC — Immigration & Citizenship",
    doc: "Visa & PR Card Photo Specifications",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/temporary-resident-visa-application-photograph-specifications.html",
    note: "Official specifications for Temporary Resident Visas (TRV), Study/Work Permits, and PR cards.",
    badge: "IRCC",
  },
  {
    agency: "RCMP — Canadian Firearms Program",
    doc: "PAL Firearms Licence Photo Standards",
    url: "https://rcmp.ca/en/firearms",
    note: "Official photo guidelines for Canadian Possession and Acquisition Licence (PAL) cards.",
    badge: "RCMP",
  },
  {
    agency: "International Civil Aviation Org",
    doc: "Doc 9303 Biometric Specifications",
    url: "https://www.icao.int/publications/doc-series/doc-9303",
    note: "Global biometric standard enforced across all Canadian machine-readable travel documents.",
    badge: "ICAO",
  },
];

export default function CAIndexPage() {
  const pages = getAllCAPages();

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      {/* Canada red top accent bar */}
      <div className="h-1 bg-red-700 w-full" />

      {/* ── HERO SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Column: Headline & 2 CTAs */}
            <div className="flex-1 w-full text-left">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 py-1 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-extrabold text-red-800 tracking-wide uppercase">
               Canada Passport & Visa Photo Tool · Based on IRCC & Passport Program Requirements
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-800 leading-tight tracking-tight mb-3">
                Create Canada Passport Photo Online &amp; Canada Visa Photo Checker
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal mb-5 leading-snug">
                Create and check your Canadian passport &amp; IRCC visa photo online in under a minute — free to try
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Automated biometric checks against official Canadian government rules — 50×70 mm &amp; 35×45 mm sizing, chin-to-crown 31–36 mm, background removal, and face alignment processed instantly.
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
                <a
                  href="#ca-tool"
                  className="inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white text-sm sm:text-base font-bold px-4 py-3 rounded-xl transition-all active:scale-95 gap-2 shadow-sm"
                >
                  <span>Upload &amp; Create Photo</span>
                </a>
                <a
                  href="/ca"
                  className="inline-flex items-center justify-center bg-white border-2 border-slate-300 hover:border-red-600 hover:text-red-700 text-slate-800 text-sm sm:text-base font-bold px-4 py-3 rounded-xl transition-all active:scale-95 gap-2"
                >
                  <span>Canada Visa Photo Guide</span>
                </a>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#b91c1c"
                    >
                      <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-700 font-bold">
                  4.9 · Trusted by 15,000+ Canadian applicants
                </span>
              </div>
            </div>

            {/* Right Column: Before & After Slider */}
            <div className="w-full lg:w-auto flex justify-center">
              <CABeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN EMBEDDED PHOTO GENERATOR TOOL ── */}
      <section id="ca-tool" className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-6 scroll-mt-6">
        <CAEmbeddedTool />
      </section>

      {/* ── EXAMPLE OUTPUT SECTION (RESPONSIVE 4-STEP FLOW PROCESS) ── */}
      <section className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-7">
            <span className="text-xs font-black text-red-700 uppercase tracking-widest block mb-1">
              Automatic Photo Transformation Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              4-Step Canada Photo Processing Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
              From raw selfie to biometric verification, 50×70 mm / 35×45 mm compliance, and print-ready output.
            </p>
          </div>

          {/* 4 Cards Grid Flow */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {/* Step 1: Normal Camera Upload */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-red-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[50/70] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116243/uk_before_image_passport_photo_d4sqnr.webp"
                    alt="1. Camera Upload - Raw Selfie"
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 1
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    1. Camera Upload
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Casual selfie or portrait photo from any smartphone.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-red-700">
                Next: Biometric scan →
              </div>
            </div>

            {/* Step 2: Biometric Check */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-red-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[50/70] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118128/passport_photo_biometric_check_truryq.webp"
                    alt="2. Biometric Scan & Analysis"
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-blue-700/80 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 2
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    2. Biometric Scan
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Chin-to-crown (31–36 mm) &amp; eye position AI scan.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-red-700">
                Next: IRCC Crop →
              </div>
            </div>

            {/* Step 3: Compliant 50x70mm Photo */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-red-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[50/70] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp"
                    alt="3. Compliant 50x70mm Canada Passport Photo"
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-red-700 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 3
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    3. Compliant 50×70mm
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Plain white background &amp; 100% IRCC ready.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-red-700">
                Next: Print template →
              </div>
            </div>

            {/* Step 4: Print-Ready Sheet */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-red-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[50/70] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118129/final_result_vzs9an.jpg"
                    alt="4. Print-Ready Template"
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 4
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    4. Print Sheet / Digital JPEG
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Print-ready copy for Shoppers Drug Mart, Walmart, or home.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-emerald-700">
                Ready to submit ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERIFIED OFFICIAL SOURCES ── */}
      <section className="bg-white border-y border-slate-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[11px] font-black text-red-700 uppercase tracking-widest block mb-0.5">
              Official Canadian Specifications
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Verified Against Official Canadian Authorities
            </h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto mt-0.5">
              Rules sourced directly from IRCC, Service Canada, RCMP, and ICAO publications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {officialCASources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 sm:p-3.5 bg-red-50/40 border border-red-200/80 rounded-xl hover:border-red-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-black text-red-800 bg-red-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {src.badge}
                    </span>
                    <span className="text-[10px] text-red-700 font-bold">↗</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    {src.agency}
                  </div>
                  <div className="text-xs font-extrabold text-red-900 mt-0.5 mb-1 leading-tight">
                    {src.doc}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug mt-1">
                  {src.note}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CANADA PASSPORT PHOTO SIZE & GUIDELINES ── */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 text-slate-800">
          {/* Section 1: Canadian Photo Size Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Canada Passport Photo Online Requirements
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Photo size must be exactly <strong>50 millimetres (mm) wide × 70 millimetres (mm) high</strong> (2 inches × 2 3/4 inches).
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">
              A close-up of your head and shoulders so that your face, from the bottom of your chin to your crown, is between <strong>31 mm and 36 mm high</strong> (44% to 51% of photo height).
            </p>

            {/* Helpful Crop Tool Box */}
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm font-semibold flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Automated Biometric Sizing:</p>
                <p className="text-slate-700 font-normal mt-0.5">
                  You don&apos;t need to manually measure millimeters. Our online tool crops and aligns your photo to exact Canadian specifications automatically.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                  <a href="#ca-tool" className="text-red-800 font-extrabold hover:underline">
                    Create Canada Passport Photo →
                  </a>
                  <a href="/ca" className="text-red-800 font-extrabold hover:underline">
                    Check Canada Visa Photo Specs →
                  </a>
                  <a href="/passport-photos" className="text-slate-600 hover:text-slate-900 underline font-medium">
                    Check photo requirements for other countries
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Take Passport Photo Guidelines */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                How to Take a Canadian Passport Photo at Home
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">
              Follow these official Canadian Passport Program photo guidelines using any digital camera or smartphone:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Passport photo must be in full color (24-bit sRGB).</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Plain, solid white or light-coloured background with no decorations or patterns.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Look straight at the camera. Both sides of the face and ears should be visible.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Neutral facial expression with mouth closed and no smiling.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Both eyes fully open and looking directly into the camera lens.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>No hats or headgear except for verified religious or medical reasons.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Remove eyeglasses if possible. No glare, tint, or thick frames allowed.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Forehead and eyebrows clearly visible — do not cover with bangs or hair.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>No shadows on face, under chin, or behind head on the background.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>Taken within the last six (6) months of application.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Lighting and Positioning */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Lighting and Positioning Tips
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Bright Natural Light</span>
                </p>
                <p className="text-slate-600 text-xs">Take the photo facing a window for natural, even illumination across both sides of the face.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Stand 1–1.5 Metres Away</span>
                </p>
                <p className="text-slate-600 text-xs">Stand about 3–4 feet from the wall to prevent casting a shadow on the background.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Camera at Eye Level</span>
                </p>
                <p className="text-slate-600 text-xs">Position the camera directly at eye level to eliminate perspective distortion.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Leave Headroom</span>
                </p>
                <p className="text-slate-600 text-xs">Leave ample space around your head and upper shoulders so our AI can accurately position the 31–36 mm facial crop.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CANADA MARKDOWN GUIDES DIRECTORY ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-5">
          <span className="text-[11px] font-black text-red-700 uppercase tracking-widest block mb-0.5">
            Comprehensive Knowledge Base
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Canada Passport &amp; Document Guides
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Guides generated dynamically from Markdown files in{" "}
            <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 text-[10px]">
              content/ca/
            </code>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/ca/${page.slug}`}
              className="group bg-white rounded-xl p-3.5 border border-slate-200 hover:border-red-500 transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold uppercase">
                    {page.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-red-600" /> Canada Spec
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-1 leading-snug">
                  {page.h1 || page.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {page.description}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>{page.readingTime} read</span>
                <span className="text-red-700 group-hover:translate-x-0.5 transition-transform">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
