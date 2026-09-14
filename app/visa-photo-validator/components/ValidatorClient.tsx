"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Sun, Image as ImageIcon, Smartphone, UserCheck, Target, Ruler, Eye, Globe, FileCheck, CheckCircle2, GraduationCap, Ticket, ShieldCheck, Scissors } from "lucide-react";
import { useFaceVerification } from "@/hooks/useFaceVerification";
import ValidationReportView from "@/app/visa-photo-validator/components/ValidationReport";
import { getFilteredDocumentTypes, SUPPORTED_COUNTRIES } from "@/lib/specs";
import { countryMapping } from "@/lib/external-api";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "How does the biometric photo check work?",
    a: "The validator runs your photo through MediaPipe's 468-point facial landmark model. It measures head-to-frame ratio, inter-ocular distance, background uniformity, lighting gradients, and expression — the same geometric checks automated embassy kiosks perform at border control.",
  },
  {
    q: "Which countries does this tool support?",
    a: "It supports 60+ countries including the United States, United Kingdom, India, Canada, all Schengen zone nations, Australia, and China. Each country uses its official ICAO or national embassy specification — not generic estimates.",
  },
  {
    q: "Is this a US visa photo requirements checker for DS-160?",
    a: "Yes. Select United States and Visa Photo to run a US visa photo test against the same 2×2 inch, plain white background, and head-size rules used on the DS-160 form. It also works as a general US embassy photo tool for other visa categories.",
  },
  {
    q: "Can I use this as a green card or DV lottery (EDV) photo tool?",
    a: "Yes. The same US specification applies to green card photos and the Electronic Diversity Visa (EDV) lottery, so this also works as a green card photo validator and a DV lottery photo checker before you upload to the official entry system.",
  },
  {
    q: "Does the tool store or share my photo?",
    a: "No. All processing runs client-side or in an ephemeral secure session. Your photo never touches a permanent server, never gets stored, and is never shared with any third party.",
  },
  {
    q: "What exactly makes a photo 'embassy-grade' compliant?",
    a: "Compliance means passing every strict criterion: correct pixel dimensions, neutral plain background, even shadow-free lighting, centered face, neutral expression, open eyes, closed mouth, no eyewear, and a head size that fills 70–80% of the frame height — depending on country.",
  },
  {
    q: "Can I submit this report with my visa application?",
    a: "This tool reduces rejection risk by catching issues before you submit. Always verify the latest photo requirements directly on your target country's official embassy, consulate, or U.S. Department of State website before applying.",
  },
  {
    q: "What file formats and sizes are accepted?",
    a: "You can upload JPEG, PNG, or WebP files up to 10 MB. The tool works best with high-resolution photos taken against a plain white or off-white background in good natural or studio light.",
  },
];

// ─── Trust Stats ──────────────────────────────────────────────────────────────

const TRUST_STATS = [
  { value: "60+", label: "Countries Supported" },
  { value: "ICAO", label: "Official Standard" },
  { value: "99.2%", label: "Accuracy Rate" },
  { value: "<3s", label: "Analysis Time" },
];

// ─── Requirement Steps ────────────────────────────────────────────────────────

const REQUIREMENTS = [
  {
    icon: Target,
    title: "Facial Geometry",
    desc: "Measures 12+ biometric ratios: head tilt, face symmetry, and eye-line angle — all checked against official specs.",
  },
  {
    icon: ImageIcon,
    title: "Background Check",
    desc: "Detects background color uniformity, shadow presence, pattern violations, and edge contrast issues.",
  },
  {
    icon: Sun,
    title: "Lighting Analysis",
    desc: "Evaluates shadow intensity on the face and background, and flags flash glare or uneven exposure.",
  },
  {
    icon: Ruler,
    title: "Dimension Validation",
    desc: "Verifies pixel dimensions, DPI, file size, and the head-to-photo-height ratio for your country.",
  },
  {
    icon: Eye,
    title: "Expression & Eyes",
    desc: "Confirms neutral expression, open eyes, closed mouth, and checks for hair or glasses obstructing the face.",
  },
  {
    icon: Globe,
    title: "Country-Specific Rules",
    desc: "Applies the exact embassy specification for your destination — not a one-size-fits-all approximation.",
  },
];

// ─── US Immigration & Visa Document Types ─────────────────────────────────────

const US_DOC_USE_CASES = [
  {
    icon: FileCheck,
    title: "DS-160 Visa Photo",
    desc: "Run a DS-160 photo check before you upload to the CEAC portal. This US visa photo requirements checker applies the 2×2 in, plain-white-background, 50–69% head-height rule the State Department uses to accept or reject your file.",
  },
  {
    icon: CheckCircle2,
    title: "Green Card & Adjustment of Status",
    desc: "Use it as a green card photo validator for I-485 and immigrant visa submissions. It checks the same head positioning and background rules USCIS applies before you print or upload your photo.",
  },
  {
    icon: GraduationCap,
    title: "OPT & Student Visa Photos",
    desc: "F-1, OPT, and student visa photos follow the identical U.S. Department of State passport photo specification. Run an OPT photo check here before submitting through your school's portal or USCIS.",
  },
  {
    icon: Ticket,
    title: "DV Lottery / EDV Photo",
    desc: "The Diversity Visa (EDV / DV Lottery) program is strict about photo composition — a rejected photo can disqualify an otherwise-winning entry. Use this as a DV lottery photo checker or EDV photo maker reference before you submit at dvprogram.state.gov.",
  },
  {
    icon: ShieldCheck,
    title: "US Passport & Passport Renewal",
    desc: "Works as a standalone US passport photo checker and US passport tool for new applications, renewals, and child passports — all of which share the 2×2 inch specification.",
  },
  {
    icon: Scissors,
    title: "Free Online Cropping & Editing",
    desc: "Beyond validation, use the upload zone as a free US visa photo cropping tool: drop in a phone photo and the report tells you exactly how to crop, resize, or edit the photo for US visa online before you download it.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ValidatorClient() {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedDocType, setSelectedDocType] = useState("passport");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { verifyPhoto, isProcessing, loadingMessage, report, setReport, error, setError } = useFaceVerification();

  useEffect(() => {
    const savedCountry = localStorage.getItem("validator_country");
    const savedDocType = localStorage.getItem("validator_doctype");
    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedDocType) setSelectedDocType(savedDocType);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("validator_country", selectedCountry);
      localStorage.setItem("validator_doctype", selectedDocType);
    }
  }, [selectedCountry, selectedDocType, isMounted]);

  const handleReset = useCallback(() => {
    setReport(null);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, [setReport, setError]);

  const documentTypes = getFilteredDocumentTypes();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPreviewUrl(URL.createObjectURL(f)); }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) { setFile(f); setPreviewUrl(URL.createObjectURL(f)); }
  }, []);

  const handleVerify = useCallback(() => {
    if (file) verifyPhoto(file, selectedCountry, selectedDocType);
  }, [file, selectedCountry, selectedDocType, verifyPhoto]);

  return (
    <main className="min-h-screen bg-slate-100">

      {/* ── HERO / TOOL ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200" aria-labelledby="validator-heading">

    

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-8">

          {/* Badge */}
          <div className="flex justify-start mb-6">
            <span className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-100 rounded-full px-4 py-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              ICAO Compliant · Embassy-Grade · Free &amp; Instant
            </span>
          </div>

          {/* H1 — primary SEO keyword */}
          <h1 id="validator-heading" className="text-left text-xl sm:text-2xl lg:text-[2rem] font-black text-slate-900 tracking-tight leading-[1.07] mb-5">
            Passport &amp;  Visa Photo{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600"> Requirements Checker for 50 countries</span>
     
            </span>
          </h1>

          {/* Meta description-quality subhead */}
          <p className="text-left text-sm sm:text-base text-slate-500 font-medium max-w-2xl mb-10 leading-relaxed">
            A free <strong className="text-slate-700">US visa photo checker and cropping tool</strong> for DS-160, green card, OPT, and DV lottery photos — plus official embassy specs for the UK, India, Canada, Schengen, China, and 55+ more countries. Done in under 3 seconds.
          </p>

          {/* Trust stats */}
          <div className="flex justify-start gap-8 sm:gap-14 mb-10">
            {TRUST_STATS.map(({ value, label }) => (
              <div key={label} className="text-left">
                <div className="text-xl sm:text-xl font-black text-blue-600 leading-none">{value}</div>
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Tool grid */}
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">

            {/* Left: config + upload */}
            <div className="space-y-6">

              {/* Step 1 */}
              <div className=" bg-gray-100 rounded-md p-3 sm:p-4 ">
                <h2 className="text-base font-black text-slate-900 mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">1</span>
                  Choose Country &amp; Document
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <CountrySelector documentTypes={documentTypes} selectedCountry={selectedCountry} onSelect={setSelectedCountry} />
                  <div>
                    <label htmlFor="doc-type" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Document Type
                    </label>
                    <div className="relative">
                      <select
                        id="doc-type"
                        value={selectedDocType}
                        onChange={(e) => setSelectedDocType(e.target.value)}
                        className="w-full h-[52px] bg-slate-50 border border-slate-200 rounded-xl px-4 pr-10 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 appearance-none hover:border-blue-300 hover:bg-white transition-all"
                      >
                        <option value="passport">Passport Photo</option>
                        <option value="visa">Visa Photo</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-gray-100 rounded-md p-3 sm:p-4 ">
                <h2 className="text-base font-black text-slate-900 mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">2</span>
                  Upload Your Photo
                </h2>

                <UploadZone
                  previewUrl={previewUrl}
                  onFileChange={handleFileChange}
                  isDragging={isDragging}
                  onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                />

                <div className="flex flex-wrap gap-2 mt-4">
                  {["Neutral background", "Eyes open", "Centered face", "No glasses"].map((req) => (
                    <span key={req} className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      {req}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleVerify}
                  disabled={!file || isProcessing}
                  className={`w-full mt-5 h-14 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                    !file || isProcessing
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-[0.99]"
                  }`}
                  aria-busy={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="block w-4 h-4 border-[2.5px] border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                      {loadingMessage}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Check My Photo
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                  )}
                </button>

                {error && (
                  <p className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl flex items-start gap-2" role="alert">
                    <svg className="shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>
            </div>

            {/* Right: result */}
            <div className="lg:sticky lg:top-8">
              {report ? (
                <ValidationReportView 
                  report={report} 
                  onReset={handleReset} 
                  selectedDocId={
                    (documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry && d.id.endsWith(`-${selectedDocType}`);
                    }) || documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry;
                    }))?.id || (selectedCountry === "CHE" || selectedCountry === "CH" ? "switzerland-passport" : selectedCountry === "NI" || selectedCountry === "NI" ? "nigeria-passport" : "us-passport")
                  }
                  selectedDocPrice={
                    (documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry && d.id.endsWith(`-${selectedDocType}`);
                    }) || documentTypes.find((d) => {
                      const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
                      const code = countryMapping[slug] || slug.toUpperCase();
                      return code === selectedCountry;
                    }))?.price || 6.99
                  }
                />
              ) : (
                <div
                  className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-12 flex flex-col items-center justify-center min-h-[520px] text-center"
                  aria-label="Awaiting analysis"
                >
                  <div className="w-20 h-20 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-200 mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" />
                    </svg>
                  </div>
                  <p className="text-base font-bold text-slate-800 mb-2">Ready to validate</p>
                  <p className="text-sm text-slate-400 font-medium max-w-xs leading-relaxed">
                    Upload a photo and select your country to get an official biometric compliance report.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-2 w-full max-w-xs">
                    {["Face Detection", "Background Check", "Lighting Analysis", "Size Validation", "Eye Line Test", "Expression Check"].map((item) => (
                      <div key={item} className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
  {/* ── RELATED TOOLS ─────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100" aria-labelledby="related-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Related tools</p>
            <h2 id="related-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              More passport &amp; visa photo tools
            </h2>
            <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              Once your photo passes validation, use these dedicated editors from PixPassVisa to crop, resize, and export it to the exact spec.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto ">
            {[
              { href: "/passport-photo-checker", label: "Passport Photo Checker" },
              { href: "/online-passport-photo-checker", label: "Online Passport Photo Checker" },
              { href: "/australian-passport-photo-checker", label: "Australian Passport Photo Checker" },
              { href: "/diversity-visa-lottery-photo-checker", label: "DV Lottery Photo Checker" },
              { href: "/uk-passport-photo-checker-online-free", label: "UK Passport Photo Checker" },
              { href: "/passport-size-photo-maker", label: "Passport Size Photo Maker" },
              { href: "/us-passport-photo-editor", label: "US Passport Photo Editor" },
              { href: "/us-visa-photo-editor", label: "US Visa Photo Editor" },
              { href: "/icao-standard-photo", label: "ICAO Standard Photo Tool" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 bg-white hover:bg-blue-50/70/80 border border-slate-200 hover:border-blue-300 rounded-xl px-5 py-4 text-sm font-bold text-slate-700 hover:text-blue-700 transition-all shadow-xs"
              >
                {label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ── WHAT THIS TOOL CHECKS ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24" aria-labelledby="checks-heading">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Six-point analysis</p>
          <h2 id="checks-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What the validator checks
          </h2>
          <p className="mt-4 text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Every photo goes through the same geometric checks that automated embassy kiosks run at border control worldwide.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REQUIREMENTS.map(({ icon: ReqIcon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 hover:border-blue-100 hover:shadow-blue-500/20/30 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3.5">
                <ReqIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── US VISA & IMMIGRATION PHOTO USE CASES ─────────────────── */}
      <section className="bg-white border-y border-slate-100" aria-labelledby="us-uses-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Built for US immigration paperwork</p>
            <h2 id="us-uses-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              One US visa photo tool, every document type
            </h2>
            <p className="mt-4 text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              The U.S. Department of State and USCIS use the same underlying photo composition rules across almost every visa and immigration form. That means one accurate photo cropping tool for US visa applications can double as a DS-160 photo tool, a green card photo validator, an OPT photo check, and a DV lottery photo checker.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {US_DOC_USE_CASES.map(({ icon: DocIcon, title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3.5">
                  <DocIcon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONG-FORM SEO CONTENT ─────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">

          {/* Block 1: Why photo rejections happen */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">
            <div>
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">The hidden cost of a bad photo</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Why embassies reject passport &amp; visa photos
              </h2>
              <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  Passport and visa offices reject millions of photos every year — not because applicants look wrong, but because their photos fail to meet precise technical specifications. A shadow on the background, a head that sits too high in the frame, or a slightly warm background tint are enough to trigger rejection and delay your application by weeks.
                </p>
                <p>
                  US visa and immigration photos follow the <strong className="text-slate-700">U.S. Department of State specification</strong>, which mirrors the international ICAO Doc 9303 biometric standard used for machine-readable passports worldwide. It defines exact pixel dimensions, head-to-frame ratios, inter-ocular distances, background luminance, and lighting conditions — the same rules an american visa photo checker needs to apply to be useful.
                </p>
                <p>
                  Our validator applies those specifications to your photo before you submit — whether you're editing a photo for a US visa online, running a DS-160 photo check, or testing a photo for the DV lottery — so you catch the problem at home, not at the consulate counter.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "35%", label: "of first-time applicants submit a non-compliant photo" },
                { stat: "14 days", label: "average delay a rejected photo adds to a visa timeline" },
                { stat: "ICAO 9303", label: "the standard every passport-issuing country follows" },
                { stat: "468 pts", label: "facial landmarks MediaPipe checks in every scan" },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-white border border-slate-100 rounded-xl p-5">
                  <div className="text-2xl font-black text-blue-600 mb-1">{stat}</div>
                  <p className="text-xs text-slate-500 font-medium leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 1b: DS-160 / State Dept / DV lottery deep dive */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-20">
            <div className="order-2 lg:order-1 grid grid-cols-1 gap-4">
              {[
                { title: "DS-160 & nonimmigrant visas", desc: "Applicants filing the DS-160 online often search for a \"ds160 photo tool\" or \"ds-160 photo checker\" only after a photo is rejected on the CEAC upload screen. Running your photo through this US embassy photo tool first — checking size, background, and head position — avoids that resubmission loop." },
                { title: "State Department photo cropping", desc: "There is no single official \"us department of state photo cropping tool,\" but the department publishes an exact 2×2 inch, 600×600 pixel specification. This validator functions as an unofficial state dept passport photo tool: upload, get scored, then crop to match before you print or upload." },
                { title: "DV Lottery / EDV submissions", desc: "The Electronic Diversity Visa program is unusually strict — an out-of-spec photo can disqualify an entry outright. Use this page as a dv lottery photo size editor reference or edv photo maker check: it flags head-size, background, and expression issues before you submit at dvprogram.state.gov." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Form-specific guidance</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                DS-160, State Department, and DV Lottery photo rules
              </h2>
              <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  US visa and lottery photo requirements are published across multiple government portals, which is why so many applicants search separately for a ds 160 photo tool, a us visa photo test, and a us green card lottery photo tool — even though they all check the same underlying spec.
                </p>
                <p>
                  This page consolidates that logic into a single free us visa photo tool: choose "United States" and either Passport or Visa Photo, upload your image, and get a scored, itemized report you can act on immediately — no download, no account, no watermark.
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: Country guide */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Country requirements</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Passport photo rules by country
              </h2>
              <p className="mt-4 text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                Every country sets its own exact photo dimensions and rules. Here are the most common requirements our tool validates against:
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-lg shadow-slate-200/40 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Country</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Size</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Background</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Head coverage</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Glasses</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { flag: "🇺🇸", country: "USA (Passport / Visa / DS-160)", size: "2×2 in (51×51 mm)", bg: "White", head: "50–69% of frame", glasses: "Not permitted" },
                    { flag: "🇬🇧", country: "UK", size: "35×45 mm", bg: "Cream / light grey", head: "29–34 mm tall", glasses: "Not permitted" },
                    { flag: "🇮🇳", country: "India", size: "35×35 mm", bg: "White", head: "70–80% of frame", glasses: "Not permitted" },
                    { flag: "🇨🇦", country: "Canada", size: "50×70 mm", bg: "White", head: "31–36 mm tall", glasses: "Not permitted" },
                    { flag: "🇩🇪", country: "Germany (Schengen)", size: "35×45 mm", bg: "Light grey / white", head: "70–80% of frame", glasses: "Not permitted" },
                    { flag: "🇨🇳", country: "China", size: "33×48 mm", bg: "White", head: "28–33 mm tall", glasses: "Not permitted" },
                    { flag: "🇦🇺", country: "Australia", size: "35×45 mm", bg: "White or off-white", head: "32–36 mm tall", glasses: "Not permitted" },
                  ].map(({ flag, country, size, bg, head, glasses }) => (
                    <tr key={country} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-800 flex items-center gap-2">
                        <span>{flag}</span>{country}
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-medium">{size}</td>
                      <td className="px-5 py-4 text-slate-500 font-medium">{bg}</td>
                      <td className="px-5 py-4 text-slate-500 font-medium">{head}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-100">{glasses}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 font-medium text-center mt-4">
              Requirements shown are current as of 2025. Always confirm on the official embassy or U.S. Department of State website before submitting.
            </p>
          </div>

          {/* Block 3: How our system works */}
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            <div>
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Under the hood</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                How this passport &amp; visa photo checker works
              </h2>
              <div className="space-y-4 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  When you upload a photo, <strong className="text-slate-700">Google MediaPipe Face Mesh</strong> detects and maps 468 facial landmarks in real time — key points around your eyes, nose, mouth, jawline, and forehead. From those points, the tool calculates more than twelve geometric ratios used by passport and visa agencies, including the U.S. Department of State.
                </p>
                <p>
                  It checks your <strong className="text-slate-700">head-to-frame height ratio</strong> to confirm your face fills the correct percentage of the image. It measures the <strong className="text-slate-700">inter-ocular distance</strong> — the pixel gap between your pupils — to verify the photo meets the biometric alignment standard. It samples the background to check for shadows, color cast, and pattern violations, which matters just as much for a USCIS photo composition tool check as it does for a Schengen visa photo.
                </p>
                <p>
                  All results score against the specification loaded for your country and document type. The final report tells you exactly which checks passed, which failed, and what you need to do to fix each issue before you print, crop, or submit — whether that's a passport photo, a US visa photo, or a DV lottery entry.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { step: "01", title: "Select country and document type", desc: "The tool loads the exact embassy specification — pixel dimensions, head ratios, background rules, and expression requirements — for your destination, including United States passport, visa, and DS-160 profiles." },
                { step: "02", title: "Upload your JPEG, PNG, or WebP photo", desc: "Drop your photo into the upload zone. No account required. Your photo stays in the browser and is never saved to any server." },
                { step: "03", title: "Biometric scan runs in under 3 seconds", desc: "MediaPipe maps 468 facial landmarks and runs all geometric, lighting, and background checks against the loaded specification." },
                { step: "04", title: "Read your scored compliance report", desc: "Every check shows as Pass, Warning, or Fail with a reason and a fix instruction. Your overall compliance score tells you at a glance whether the photo is ready to submit." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                  <span className="text-[11px] font-black text-slate-300 leading-none shrink-0 mt-0.5">{step}</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 mb-1">{title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── TIPS SECTION ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24" aria-labelledby="tips-heading">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Before you upload</p>
          <h2 id="tips-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How to take a compliant passport photo at home
          </h2>
          <p className="mt-4 text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            You do not need a studio. These steps produce an embassy-grade photo with any modern smartphone — ready for a passport, US visa, or green card application.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Sun, title: "Use natural light", desc: "Stand facing a window. Natural indirect light fills your face evenly and eliminates shadows without harsh highlights." },
            { icon: ImageIcon, title: "Find a plain white wall", desc: "A white or light grey wall works as your background. Move at least 1 metre away from it to avoid casting shadows on the surface behind you." },
            { icon: Smartphone, title: "Shoot at eye level", desc: "Place your phone at the same height as your eyes. Shooting from above or below distorts facial geometry and fails the head-tilt check." },
            { icon: UserCheck, title: "Neutral expression, eyes open", desc: "Look directly into the camera, keep your mouth closed, eyes fully open, and hold a relaxed neutral expression. No smiling." },
          ].map(({ icon: TipIcon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-lg shadow-slate-200/40 hover:border-blue-100 transition-colors duration-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3.5">
                <TipIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24" aria-labelledby="faq-heading">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">FAQ</p>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden bg-blue-600 rounded-xl p-10 sm:p-14 text-center">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-600/50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-blue-600/40 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[11px] font-bold text-blue-200 uppercase tracking-[0.2em] mb-3">Ready?</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Check your passport or US visa photo in seconds
            </h2>
            <p className="text-blue-100 font-medium text-base max-w-md mx-auto mb-8 leading-relaxed">
              Avoid a costly rejection. Upload your photo now and get a full embassy-grade compliance report — no account needed, completely free.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-black text-sm px-8 py-4 rounded-xl hover:bg-blue-50/70 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20/20 uppercase tracking-widest"
            >
              Validate My Photo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

// ─── Country Dropdown ─────────────────────────────────────────────────────────

function CountrySelector({
  documentTypes,
  selectedCountry,
  onSelect,
}: {
  documentTypes: ReturnType<typeof getFilteredDocumentTypes>;
  selectedCountry: string;
  onSelect: (code: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const countryMap = Array.from(
    new Map(
      documentTypes
        .map((d) => {
          const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
          const code = countryMapping[slug] || slug.toUpperCase();
          return { ...d, code };
        })
        .filter((d) => SUPPORTED_COUNTRIES.includes(d.code))
        .map((d) => [d.country, { code: d.code, flag: d.flag }])
    ).entries()
  )
    .filter(([name]) => name && name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a[0] || "").localeCompare(b[0] || ""));

  const selected = documentTypes.find(
    (d) =>
      countryMapping[d.id.replace(/-passport$/, "").replace(/-visa$/, "")] === selectedCountry ||
      d.id.replace(/-passport$/, "").replace(/-visa$/, "").toUpperCase() === selectedCountry
  );

  return (
    <div ref={ref} className="relative">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        Country
      </label>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-[52px] bg-slate-50 border border-slate-200 rounded-xl px-4 flex items-center justify-between text-sm font-bold text-slate-800 hover:border-blue-400 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{selected?.flag ?? "🏳️"}</span>
          <span className="truncate">{selected?.country ?? "Select Country"}</span>
        </span>
        <span className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl shadow-slate-300/30 overflow-hidden"
          role="listbox"
        >
          <div className="p-2.5 border-b border-slate-100">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search country…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/15 border border-transparent focus:border-blue-200 transition-all"
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto overscroll-contain">
            {countryMap.map(([name, { code, flag }]) => (
              <li key={code}>
                <button
                  role="option"
                  aria-selected={selectedCountry === code}
                  onClick={() => { onSelect(code); setOpen(false); setSearch(""); }}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors border-b border-slate-50 last:border-0 ${
                    selectedCountry === code ? "bg-blue-50/70 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{flag}</span>
                  <span className="text-xs font-bold flex-1">{name}</span>
                  {selectedCountry === code && (
                    <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
            {countryMap.length === 0 && (
              <li className="px-4 py-6 text-center text-xs text-slate-400 font-medium">No results for "{search}"</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

function UploadZone({
  previewUrl,
  onFileChange,
  isDragging,
  onDragEnter,
  onDragLeave,
  onDrop,
}: {
  previewUrl: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}) {
  return (
    <div className="relative group">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label="Upload photo"
      />
      <div
        className={`aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50/70 scale-[1.01]"
            : previewUrl
            ? "border-blue-200 bg-blue-50/70"
            : "border-slate-200 bg-slate-50 group-hover:border-blue-300 group-hover:bg-white"
        }`}
      >
        {previewUrl ? (
          <div className="w-full h-full relative">
            <img src={previewUrl} className="w-full h-full object-contain p-4" alt="Photo preview" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-xl flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-bold text-slate-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Click to change photo
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center px-6">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-sm font-bold text-slate-800">{isDragging ? "Release to upload" : "Drop your photo here"}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-semibold uppercase tracking-widest">or click to browse</p>
            <p className="text-[10px] text-slate-300 mt-3 font-medium">JPEG · PNG · WebP · Max 10 MB</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ item }: { item: (typeof FAQ_ITEMS)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/60 transition-colors"
      >
        <span className="text-sm font-bold text-slate-900 leading-snug">{item.q}</span>
        <span className={`shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed font-medium">{item.a}</p>
      )}
    </div>
  );
}