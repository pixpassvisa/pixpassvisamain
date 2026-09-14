import type { Metadata } from "next";
import Link from "next/link";
import { getAllUKPages } from "@/lib/uk-content";
import UKEmbeddedTool from "./components/UKEmbeddedTool";
import UKBeforeAfterSlider from "./components/UKBeforeAfterSlider";
import { Upload, Zap, ClipboardCheck, Sparkles, Download, Lightbulb, Check, Sun, Ruler, Camera, ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "UK Passport Size Photo Maker & Visa Photo Tool HMPO Compliant",
  description:
    "Create UK passport, visa and ID photos online with automatic cropping, background checks and UK photo requirements for passports and driving licences.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/uk",
    languages: {
      en: "https://www.pixpassvisa.com/uk",
      "x-default": "https://www.pixpassvisa.com/uk",
    },
  },
  openGraph: {
    title: "UK Passport & Document Photo Maker | PixPassVisa",
    description:
      "Create UK passport, visa, and ID photos online. 100% compliant for HMPO, Driving Licences, Railcards, and more.",
    url: "https://www.pixpassvisa.com/uk",
    siteName: "PixPassVisa UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp",
        width: 1200,
        height: 630,
        alt: "UK Passport Size Photo Maker",
      },
    ],
  },
};

const steps = [
  {
    num: "01",
    title: "Upload UK Photo",
    desc: "Upload any selfie or portrait photo from your phone or computer.",
    icon: Upload,
  },
  {
    num: "02",
    title: "Instant Biometric Check",
    desc: "Automated verification against official HMPO and DVLA biometric rules.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Compliance Report",
    desc: "Detailed PASS/FAIL check for 35x45mm sizing, lighting, and background.",
    icon: ClipboardCheck,
  },
  {
    num: "04",
    title: "Instant Output",
    desc: "Automatic background removal & replacement with official UK light grey/white background.",
    icon: Sparkles,
  },
  {
    num: "05",
    title: "Download & Print",
    desc: "Get digital JPEG for online HMPO forms and 4x6 print sheet for paper applications.",
    icon: Download,
  },
];

const officialUKSources = [
  {
    agency: "GOV.UK — HM Passport Office",
    doc: "UK Passport Photo Rules & Code",
    url: "https://www.gov.uk/photos-for-passports",
    note: "Official UK government standards for passport photos and digital photo codes.",
    badge: "HMPO",
  },
  {
    agency: "DVLA — Driver & Vehicle Licensing Agency",
    doc: "Driving Licence Photo Guidelines",
    url: "https://www.gov.uk/renew-driving-licence",
    note: "Official UK specs for photocard driving licence applications.",
    badge: "DVLA",
  },
  {
    agency: "UKVI — UK Visas & Immigration",
    doc: "Visa & BRP Biometric Standards",
    url: "https://www.gov.uk/government/organisations/uk-visas-and-immigration",
    note: "Biometric specifications for UK residency and visa approvals.",
    badge: "UKVI",
  },
  {
    agency: "International Civil Aviation Org",
    doc: "Doc 9303 Biometric Specifications",
    url: "https://www.icao.int/publications/doc-series/doc-9303",
    note: "Global biometric standard enforced across all UK travel documents.",
    badge: "ICAO",
  },
];

export default function UKIndexPage() {
  const pages = getAllUKPages();

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      {/* Gov-style top accent bar */}
      <div className="h-1 bg-blue-700 w-full" />

      {/* ── HERO SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Column: Headline & 2 CTAs */}
            <div className="flex-1 w-full text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-200 rounded-full px-3 py-1 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-extrabold text-blue-800 tracking-wide uppercase">
                  Official UK Biometric Photo Tool · HMPO &amp; DVLA Compliant
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-800 leading-tight tracking-tight mb-3">
               Create UK Passport Photo Online & UK Passport Photo Checker online
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-normal mb-5 leading-snug">
                Create and check your UK passport photo online in under a minute
                 free to try
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Automated biometric checks against official UK government rules
                — 35x45mm sizing, background removal, face detection, eye
                position — all processed instantly.
              </p>

              {/* 2 CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
                <a
                  href="#uk-tool"
                  className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white text-sm sm:text-base font-bold px-4 py-3  transition-all active:scale-95 gap-2"
                >
                  <span>Upload &amp; Create Photo</span>
               
                </a>
                <a
                  href="/uk-passport-photo-checker-online-free"
                  className="inline-flex items-center justify-center bg-white border-2 border-slate-300 hover:border-blue-600 hover:text-blue-700 text-slate-800 text-sm sm:text-base font-bold px-4 py-3  transition-all active:scale-95 gap-2"
                >
                  
                  <span>Free Passport Photo Checker</span>
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
                      fill="#15803d"
                    >
                      <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-700 font-bold">
                  4.9 · Trusted by 17,000+ UK applicants
                </span>
              </div>
            </div>

            {/* Right Column: Before & After Slider */}
            <div className="w-full lg:w-auto flex justify-center">
              <UKBeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

    

      {/* ── MAIN EMBEDDED PHOTO GENERATOR TOOL ── */}
      <section id="uk-tool" className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 py-6 scroll-mt-6">
        <UKEmbeddedTool
         
        />
      </section>

      {/* ── EXAMPLE OUTPUT SECTION (RESPONSIVE 4-STEP FLOW PROCESS) ── */}
      <section className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-7">
            <span className="text-xs font-black text-blue-700 uppercase tracking-widest block mb-1">
              Automatic Photo Transformation Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              4-Step UK Photo Processing Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
              From raw camera upload to biometric verification, 35×45mm compliance, and print-ready sheet.
            </p>
          </div>

          {/* 4 Cards Grid Flow */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {/* Step 1: Normal Camera Upload */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116243/uk_before_image_passport_photo_d4sqnr.webp"
                    alt="1. Camera Upload - Raw Selfie"
                    className="w-full h-full object-cover  transition-transform duration-300"
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
                    Casual selfie or home portrait photo from any phone.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-blue-700">
                Next: Biometric scan →
              </div>
            </div>

            {/* Step 2: Biometric Check */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118128/passport_photo_biometric_check_truryq.webp"
                    alt="2. Biometric Scan & Analysis"
                    className="w-full h-full object-cover  transition-transform duration-300"
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
                    Chin-to-crown (29–34mm) &amp; eye position AI scan.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-blue-700">
                Next: HMPO Crop →
              </div>
            </div>

            {/* Step 3: UK Compliant 35x45mm Photo */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp"
                    alt="3. Compliant 35x45mm UK Passport Photo"
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-blue-700 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 3
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    3. Compliant 35×45mm
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Light grey background &amp; 100% HMPO ready.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-blue-700">
                Next: Print sheet →
              </div>
            </div>

            {/* Step 4: Print-Ready Sheet */}
            <div className="group relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:border-blue-500 hover:shadow-xs transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-[35/45] relative bg-slate-100 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786118129/final_result_vzs9an.jpg"
                    alt="4. Print-Ready 4x6 Inch Sheet"
                    className="w-full h-full object-cover  transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    STEP 4
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    4. Print Sheet (4×6″)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Physical copy sheet for Boots, Snappy Snaps or home.
                  </p>
                </div>
              </div>
              <div className="px-3 pb-3 hidden md:flex items-center text-[10px] font-bold text-emerald-700">
                Ready to submit <Check className="w-3 h-3 inline-block ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* ── VERIFIED OFFICIAL SOURCES (COMPACT / SMALL) ── */}
      <section className="bg-white border-y border-slate-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest block mb-0.5">
              Official Government Specifications
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Verified Against Official UK Authorities
            </h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto mt-0.5">
              Rules sourced directly from HM Passport Office, GOV.UK, DVLA, and ICAO publications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {officialUKSources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 sm:p-3.5 bg-blue-50/40 border border-blue-200/80 rounded-xl hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {src.badge}
                    </span>
                    <span className="text-[10px] text-blue-700 font-bold">↗</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    {src.agency}
                  </div>
                  <div className="text-xs font-extrabold text-blue-900 mt-0.5 mb-1 leading-tight">
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

      {/* ── UK PASSPORT PHOTO SIZE & GUIDELINES ── */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 text-slate-800">
          {/* Section 1: UK Photo Size Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                UK Passport Photo Online Requirements
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Photo size must be <strong>35 millimetres (mm) wide × 45 millimetres (mm) high</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">
              A close-up of your head and shoulders so that your face, from the bottom of your chin to your crown, is between <strong>29 mm and 34 mm high</strong> (64% to 75% of photo height).
            </p>

            {/* Helpful Crop Tool Box */}
            <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm font-semibold flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Automated Sizing:</p>
                <p className="text-slate-700 font-normal mt-0.5">
                  You don&apos;t need to manually measure millimeters. Our online tool crops and aligns your photo to exact UK specifications automatically.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                  <a href="#uk-tool" className="text-blue-800 font-extrabold hover:underline">
                    Create UK Passport Photo →
                  </a>
                  <a href="/uk" className="text-blue-800 font-extrabold hover:underline">
                    Check UK Visa Photo Specs →
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
                How to Take a UK Passport Photo at Home
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">
              Follow these official HM Passport Office photo guidelines using any digital camera or smartphone:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>Passport photo must be in colour (24-bit sRGB).</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>Clear contrast against a plain, light-coloured (light grey or cream) background.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>Look straight at the camera. Both sides of the face and ears should be visible.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>Neutral facial expression with mouth closed and eyes open.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>Both eyes fully visible — no tinted glasses or sunglasses.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>No hats or head coverings except for religious or medical purposes.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>Forehead and eyebrows should be visible (do not cover with hair).</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>No shadow on face or behind head. Even facial lighting required.</span>
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <Check className="w-4 h-4 text-blue-600 font-bold shrink-0 mt-0.5" />
                <span>Lighting on the face must be even and natural.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: Lighting and Positioning Tips */}
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
                  <span>Bright Room &amp; White Background</span>
                </p>
                <p className="text-slate-600 text-xs">Take photo in bright room. Use a white wall as background.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Stand 1 Metre Away</span>
                </p>
                <p className="text-slate-600 text-xs">Stand one meter away from the wall, otherwise there may be shadow on the wall.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tripod at Eye Level</span>
                </p>
                <p className="text-slate-600 text-xs">Use a tripod. Adjust the camera position to the eye level.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Leave Head Space</span>
                </p>
                <p className="text-slate-600 text-xs">When adjusting camera distance, leave enough space between top of head and top border of photo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UK MARKDOWN GUIDES DIRECTORY (COMPACT / 70% SMALLER) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-5">
          <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest block mb-0.5">
            Comprehensive Knowledge Base
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            UK Passport &amp; Document Guides
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Guides generated dynamically from Markdown files in{" "}
            <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 text-[10px]">
              content/uk/
            </code>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/uk/${page.slug}`}
              className="group bg-white rounded-xl p-3.5 border border-slate-200 hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                    {page.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    🇬🇧 UK Spec
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                  {page.h1 || page.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                  {page.description}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>{page.readingTime} read</span>
                <span className="text-blue-700 group-hover:translate-x-0.5 transition-transform">
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
