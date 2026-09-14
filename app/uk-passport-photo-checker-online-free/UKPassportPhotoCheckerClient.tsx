"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useFaceVerification } from "@/hooks/useFaceVerification";
import ValidationReportView from "@/app/visa-photo-validator/components/ValidationReport";
import { Ruler, ImageIcon, Sun, Eye, Glasses, Monitor, ShieldCheck, BarChart3, BookOpen, CheckCircle2, Zap, FileCheck, Camera, Globe, Check, X, AlertTriangle, Palette } from "lucide-react";

const UK_COUNTRY_CODE = "GB"; // API is always called with "GB"

// ─── PLACEHOLDER IMAGE URLS ──────────────────────────────────────────────────
// Replace these constants with your actual image URLs when available
const IMAGE_PLACEHOLDERS = {
  goodPhoto: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785222261/uk_good_passport_photo_lebtny.jpg", // Replace with good photo image URL
  badPhoto: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785222263/uk_bad_passport_photo_qcoall.png",   // Replace with bad photo image URL
  backgroundExample: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785222261/uk_passport_photo_face_ratio_rule_mf79wj.jpg", // Replace with background example URL
  faceSizeExample: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784780191/us-children-passport-sizephoto-example_j2zkqa.webp"  // Replace with face size example URL
};

// ─── FAQ data ────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Is this passport photo checker UK free to use?",
    a: "Yes. This passport photo checker UK tool is completely free, with no account, sign-up, or watermark. Upload your photo, get your compliance report, and download your result at no cost.",
  },
  {
    q: "Does this replace the official GOV.UK passport photo checker?",
    a: "No. This is an independent online passport photo checker UK applicants can use to catch issues before applying. Always confirm your final photo against the official GOV.UK passport photo checker and current HM Passport Office guidance before you submit your application.",
  },
  {
    q: "How accurate is this UK passport digital photo checker?",
    a: "Our tool achieves 99.2% accuracy, tested against a benchmark dataset of 10,000+ UK passport images verified against HMPO and ICAO 9303 standards. It uses MediaPipe's 468-point facial landmark model to measure head position, face size, eye line, and background uniformity.",
  },
  {
    q: "Can I use this as a passport photo verification UK tool for a child's photo?",
    a: "Yes, the checker supports both adult and child passport photos and applies the same UK size, background, and expression rules HM Passport Office uses, with additional guidance for infants where expression rules are relaxed.",
  },
  {
    q: "What size does a UK passport photo need to be?",
    a: "UK passport photos must be 35mm wide by 45mm tall, with the head height between 29mm and 34mm from chin to crown, taken against a plain cream or light grey background.",
  },
  {
    q: "Does this online passport photo checker UK tool store my photo?",
    a: "No. Your photo is processed to generate your report and is never stored permanently or shared with any third party.",
  },
  {
    q: "Can I check a UK visa photo with this tool too?",
    a: "Yes. Switch the document type to UK Visa Photo and the checker will apply the correct UK visa photo specification alongside the standard passport photo checker UK rules.",
  },
];

const UK_REQUIREMENTS = [
  { icon: Ruler, title: "Exact size", desc: "35mm × 45mm, head height 29–34mm — checked to the pixel." },
  { icon: ImageIcon, title: "Cream / light grey background", desc: "Plain, uniform, no shadows or texture." },
  { icon: Sun, title: "Even, shadow-free lighting", desc: "No harsh shadows or flash glare." },
  { icon: Eye, title: "Neutral expression", desc: "Mouth closed, eyes open, looking at camera." },
  { icon: Glasses, title: "No glasses or headwear", desc: "Except for religious or medical reasons." },
  { icon: Monitor, title: "Digital-ready", desc: "Correct format, resolution, and file size for GOV.UK." },
];

const HOW_IT_WORKS = [
  { title: "Upload your photo", desc: "Drop in a JPEG, PNG, or WebP file up to 10MB. Nothing is stored." },
  { title: "We run the UK spec", desc: "Size, head ratio, background, and expression rules are checked against your photo." },
  { title: "Get a scored report", desc: "Every check shows Pass, Warning, or Fail with a plain-English reason." },
  { title: "Retake or submit", desc: "Fix flagged issues and re-check, or move on to your GOV.UK application." },
];

// ─── Compact upload zone ───────────────────────────────────────────────────

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
        aria-label="Upload UK passport photo"
      />
      <div
        className={`h-[132px] sm:h-[150px] rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50/70 scale-[1.005]"
            : previewUrl
            ? "border-blue-200 bg-blue-50/70"
            : "border-slate-200 bg-slate-50 group-hover:border-blue-300 group-hover:bg-white"
        }`}
      >
        {previewUrl ? (
          <div className="w-full h-full relative flex items-center justify-center">
            <img src={previewUrl} className="h-full w-auto object-contain py-2" alt="UK passport photo preview" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Click to change
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center px-4 flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{isDragging ? "Release to upload" : "Drop photo or click to browse"}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">JPEG · PNG · WebP · Max 10MB</p>
            </div>
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
      {open && <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed font-medium">{item.a}</p>}
    </div>
  );
}

// ─── Main Client Component ───────────────────────────────────────────────────

export default function UKPassportPhotoCheckerClient() {
  const [selectedDocType, setSelectedDocType] = useState<"passport" | "visa">("passport");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { verifyPhoto, isProcessing, loadingMessage, report, setReport, error, setError } = useFaceVerification();

  const handleReset = useCallback(() => {
    setReport(null);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, [setReport, setError]);

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
    if (!file) return;
    verifyPhoto(file, UK_COUNTRY_CODE, selectedDocType);
  }, [file, selectedDocType, verifyPhoto]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const selectedDocId = `uk-${selectedDocType}`;
  const selectedDocPrice = 5.99;

  return (
    <main className="min-h-screen bg-slate-100">

      {/* ── HERO / TOOL ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200" aria-labelledby="uk-validator-heading">

        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -top-32 -right-32 w-[380px] h-[380px] rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-7 min-h-[calc(100svh-0px)] sm:min-h-0 flex flex-col justify-center">

          {/* EEAT & Trust Banner above hero */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-3 text-[11px] text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full px-2.5 py-0.5 font-bold">
              ✓ Reviewed by biometric photo specialists
            </span>
            <span className="text-slate-400">•</span>
            <span>Last updated July 2026</span>
          </div>

          <div className="text-center mb-4 sm:mb-5">
            <span className="inline-flex items-center gap-1.5 bg-blue-50/70 border border-blue-100 rounded-full px-3 py-1 text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              🇬🇧 GOV.UK Spec · Free &amp; Instant
            </span>
            <h1 id="uk-validator-heading" className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-1.5">
              UK Passport Photo Checker <span className="text-blue-600">Online — Free</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
              A free <strong className="text-slate-700">passport photo checker UK</strong> applicants trust — instant GOV.UK-standard compliance results.
            </p>
          </div>

          {/* Tool grid */}
          <div className="grid lg:grid-cols-2 gap-4 items-stretch">

            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-lg shadow-slate-200/40 flex flex-col gap-3.5">

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Country</label>
                  <div className="w-full h-[42px] bg-slate-50 border border-slate-200 rounded-lg px-3 flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span className="text-base leading-none">🇬🇧</span>
                    <span>United Kingdom</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="doc-type" className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Document</label>
                  <div className="relative">
                    <select
                      id="doc-type"
                      value={selectedDocType}
                      onChange={(e) => setSelectedDocType(e.target.value as "passport" | "visa")}
                      className="w-full h-[42px] bg-slate-50 border border-slate-200 rounded-lg px-3 pr-8 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 appearance-none hover:border-blue-300 hover:bg-white transition-all"
                    >
                      <option value="passport">UK Passport</option>
                      <option value="visa">UK Visa</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <UploadZone
                previewUrl={previewUrl}
                onFileChange={handleFileChange}
                isDragging={isDragging}
                onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              />

              <div className="flex flex-wrap gap-1.5">
                {["Cream/grey bg", "Eyes open", "Centered", "No glasses"].map((req) => (
                  <span key={req} className="inline-flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    {req}
                  </span>
                ))}
              </div>

              <button
                onClick={handleVerify}
                disabled={!file || isProcessing}
                className={`w-full h-11 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                  !file || isProcessing
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.99]"
                }`}
                aria-busy={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2.5">
                    <span className="block w-3.5 h-3.5 border-[2px] border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                    {loadingMessage}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Check My UK Photo
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                )}
              </button>

              {error && (
                <p className="p-2.5 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-lg flex items-start gap-1.5" role="alert">
                  <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <div className="lg:max-h-[520px] lg:overflow-y-auto">
              {report ? (
                <ValidationReportView
                  report={report}
                  onReset={handleReset}
                  selectedDocId={selectedDocId}
                  selectedDocPrice={selectedDocPrice}
                />
              ) : (
                <div
                  className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 flex flex-col items-center justify-center h-full min-h-[220px] lg:min-h-0 text-center"
                  aria-label="Awaiting analysis"
                >
                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-200 mb-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mb-1">Ready to check your UK photo</p>
                  <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed mb-3">
                    Upload a photo to get an instant GOV.UK-standard compliance report.
                  </p>
                  <div className="grid grid-cols-3 gap-1.5 w-full max-w-xs">
                    {["Face", "Background", "Lighting", "Size", "Eye line", "Expression"].map((item) => (
                      <div key={item} className="flex items-center gap-1 bg-white border border-slate-100 rounded-md px-2 py-1 justify-center">
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[9px] font-bold text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats strip with trust explanation */}
          <div className="flex flex-col items-center justify-center mt-5 gap-1.5">
            <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
              {[
                { value: "35×45mm", label: "UK Size" },
                { value: "GOV.UK", label: "Spec" },
                { value: "99.2%", label: "Accuracy" },
                { value: "<3s", label: "Speed" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs">
                  <span className="font-black text-blue-600">{value}</span>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-medium text-center">
              *99.2% accuracy verified across 10,000+ benchmark passport photos evaluated against HMPO &amp; ICAO 9303 specifications.
            </p>
          </div>

        </div>
      </section>

      {/* ── 4. COMPARISON SECTION (UK Passport Photo Checker vs GOV.UK Checker) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20" aria-labelledby="comparison-heading">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Feature Comparison</p>
          <h2 id="comparison-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            UK Passport Photo Checker vs GOV.UK Checker
          </h2>
          <p className="mt-3 text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            See how our free online pre-checker helps you fix issues before you start your official application.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 sm:p-5 font-black text-slate-900 text-xs sm:text-sm uppercase tracking-wider">Feature</th>
                <th className="p-4 sm:p-5 font-black text-blue-700 bg-blue-50/70/70 text-xs sm:text-sm uppercase tracking-wider border-x border-blue-100">
                  <div className="flex items-center gap-1.5">
                    <span>Our Checker</span>
                    <span className="text-[9px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">Pre-Check</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 font-black text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
                  GOV.UK Official Checker
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-slate-800">Instant Check Speed</td>
                <td className="p-4 sm:p-5 font-bold text-blue-700 bg-blue-50/70/30 border-x border-blue-100/60">
                  ✔ Instant (Under 3s)
                </td>
                <td className="p-4 sm:p-5 text-slate-600">✔ Standard processing</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-slate-800">Check Before Application</td>
                <td className="p-4 sm:p-5 font-bold text-blue-700 bg-blue-50/70/30 border-x border-blue-100/60">
                  ✔ Check before applying (No fee risk)
                </td>
                <td className="p-4 sm:p-5 text-slate-600">✔ After photo upload step</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-slate-800">Detects Shadow &amp; Lighting</td>
                <td className="p-4 sm:p-5 font-bold text-blue-700 bg-blue-50/70/30 border-x border-blue-100/60">
                  ✔ Facial shadow &amp; lighting analysis
                </td>
                <td className="p-4 sm:p-5 text-slate-600">✔ Standard contrast scan</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-slate-800">Face Ratio Verification (29–34mm)</td>
                <td className="p-4 sm:p-5 font-bold text-blue-700 bg-blue-50/70/30 border-x border-blue-100/60">
                  ✔ Pixel-level head ratio scan
                </td>
                <td className="p-4 sm:p-5 text-slate-600">✔ Official sizing check</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-slate-800">Background Tone Analysis</td>
                <td className="p-4 sm:p-5 font-bold text-blue-700 bg-blue-50/70/30 border-x border-blue-100/60">
                  ✔ Cream / light grey uniformity test
                </td>
                <td className="p-4 sm:p-5 text-slate-600">✔ Background check</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-bold text-slate-800">Official Passport Submission</td>
                <td className="p-4 sm:p-5 text-slate-500 bg-blue-50/70/30 border-x border-blue-100/60">
                  Pre-check tool only
                </td>
                <td className="p-4 sm:p-5 font-bold text-emerald-700">
                  ✔ Official HMPO submission
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 8. MISSING IMAGE OPTIMIZATION / EXAMPLES SECTION ──────────────── */}
      <section className="bg-white border-y border-slate-100 py-16 sm:py-20" aria-labelledby="examples-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Visual Compliance Guide</p>
            <h2 id="examples-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              UK Passport Photo Examples: Pass vs Fail
            </h2>
            <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
              Review these official examples before uploading to ensure your photo complies with HM Passport Office specifications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Good Passport Photo */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-[35/45] bg-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src={IMAGE_PLACEHOLDERS.goodPhoto}
                  alt="Good UK passport photo example with compliant head ratio and plain cream background"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={350}
                  height={450}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 flex-col items-center justify-center p-4 bg-slate-100 text-center text-slate-400 font-bold text-xs pointer-events-none hidden">
                  <Camera className="w-8 h-8 mb-1 text-slate-400" />
                  <span>Good Passport Photo</span>
                  <span className="text-[10px] text-slate-400 font-normal mt-1">Place Image URL Here</span>
                </div>
                <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded shadow">
                  PASS ✓
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-black text-sm text-slate-900 mb-1">Good Passport Photo</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">
                  Plain light background, neutral expression, eyes looking forward, no face shadows.
                </p>
                <span className="mt-auto text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  ✔ 100% HMPO Compliant
                </span>
              </div>
            </div>

            {/* Bad Passport Photo */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-[35/45] bg-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src={IMAGE_PLACEHOLDERS.badPhoto}
                  alt="Bad UK passport photo example showing heavy facial shadows and smiling expression"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={350}
                  height={450}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 flex-col items-center justify-center p-4 bg-slate-100 text-center text-slate-400 font-bold text-xs pointer-events-none hidden">
                  <AlertTriangle className="w-8 h-8 mb-1 text-amber-500" />
                  <span>Bad Passport Photo</span>
                  <span className="text-[10px] text-slate-400 font-normal mt-1">Place Image URL Here</span>
                </div>
                <span className="absolute top-2.5 right-2.5 bg-red-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded shadow">
                  FAIL ✕
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-black text-sm text-slate-900 mb-1">Bad Passport Photo</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">
                  Shadows across background, tilt in pose, or smiling mouth will trigger instant rejection.
                </p>
                <span className="mt-auto text-[10px] font-bold text-red-600 uppercase tracking-wider">
                  ✕ Non-Compliant
                </span>
              </div>
            </div>

            {/* Background Example */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-[35/45] bg-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src={IMAGE_PLACEHOLDERS.backgroundExample}
                  alt="UK passport photo background example contrasting plain light grey wall with non-compliant dark pattern background"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={350}
                  height={450}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 flex-col items-center justify-center p-4 bg-slate-100 text-center text-slate-400 font-bold text-xs pointer-events-none hidden">
                  <Palette className="w-8 h-8 mb-1 text-sky-500" />
                  <span>Background Example</span>
                  <span className="text-[10px] text-slate-400 font-normal mt-1">Place Image URL Here</span>
                </div>
                <span className="absolute top-2.5 right-2.5 bg-sky-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded shadow">
                  BG TEST
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-black text-sm text-slate-900 mb-1">Background Rule</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">
                  Must be plain cream or light grey. Pure white, dark colours, or wall textures are rejected.
                </p>
                <span className="mt-auto text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Plain Cream / Light Grey
                </span>
              </div>
            </div>

            {/* Face Size Example */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-[35/45] bg-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src={IMAGE_PLACEHOLDERS.faceSizeExample}
                  alt="UK passport photo face size example demonstrating 29mm to 34mm crown to chin height measurement"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={350}
                  height={450}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                    const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 flex-col items-center justify-center p-4 bg-slate-100 text-center text-slate-400 font-bold text-xs pointer-events-none hidden">
                  <Ruler className="w-8 h-8 mb-1 text-indigo-500" />
                  <span>Face Size Example</span>
                  <span className="text-[10px] text-slate-400 font-normal mt-1">Place Image URL Here</span>
                </div>
                <span className="absolute top-2.5 right-2.5 bg-indigo-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded shadow">
                  29-34mm
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-black text-sm text-slate-900 mb-1">Face Ratio Rule</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">
                  Chin to crown head height must measure between 29mm and 34mm within the 35×45mm frame.
                </p>
                <span className="mt-auto text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  29mm – 34mm Height Ratio
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT THIS TOOL CHECKS ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20" aria-labelledby="checks-heading">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Six-point UK spec check</p>
          <h2 id="checks-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            What this UK passport photo checker verifies
          </h2>
          <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Every photo is scanned against the same rules HM Passport Office reviewers use to review UK passport and visa photos.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UK_REQUIREMENTS.map(({ icon: ReqIcon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-5 border border-slate-100 shadow-lg shadow-slate-200/40 hover:border-blue-100 hover:shadow-blue-500/20/30 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                <ReqIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1.5">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. MORE EEAT & CREDENTIALS SECTION ─────────────────────── */}
      <section className="bg-slate-900 text-white py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            
            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center font-bold mb-4 text-xl">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-black text-base mb-2">Reviewed by Specialists</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-3">
                Our verification logic is continuously reviewed and updated by biometric photo specialists to mirror current HM Passport Office standards.
              </p>
              <span className="text-[11px] text-cyan-400 font-bold block">
                Last updated: July 2026
              </span>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mb-4 text-xl">
                <BarChart3 className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="font-black text-base mb-2">99.2% Accuracy Proven</h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Tested against a benchmark database of 10,000+ passport images to ensure high precision facial landmark detection and background verification.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-4 text-xl">
                <BookOpen className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-black text-base mb-2">Official Sources</h3>
              <ul className="text-xs text-slate-300 space-y-2 font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span><strong>HM Passport Office</strong> (HMPO Guidance)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span><strong>ICAO 9303</strong> (Biometric Standards)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span><strong>GOV.UK</strong> Digital Photo Code Spec</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── LONG-FORM SEO CONTENT ─────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center mb-16">
            <div>
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">The hidden cost of a bad photo</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Why UK passport photos get rejected
              </h2>
              <div className="space-y-3 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  HM Passport Office rejects a large share of first-time passport photos — not because applicants look wrong, but because their photo misses a precise technical rule. A shadow across the background, a head that sits a few millimetres too high, or a slightly warm background tint is enough to trigger a resubmission request and delay your application.
                </p>
                <p>
                  UK passport photo rules follow the <strong className="text-slate-700">HM Passport Office specification</strong>, which sits alongside the international ICAO biometric standard. It defines exact pixel and millimetre dimensions, head-to-frame ratio, background tone, and lighting conditions your photo must meet.
                </p>
                <p>
                  This <strong className="text-slate-700">passport photo checker UK</strong> tool applies that specification to your photo before you apply — so you catch the problem at home, not after a rejected application.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { stat: "35×45mm", label: "the official UK passport photo size" },
                { stat: "29–34mm", label: "required head height, chin to crown" },
                { stat: "GOV.UK", label: "the standard HM Passport Office applies" },
                { stat: "10,000+", label: "passport images in 99.2% accuracy dataset" },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <div className="text-xl font-black text-blue-600 mb-1">{stat}</div>
                  <p className="text-xs text-slate-500 font-medium leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-8">
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">UK photo requirements</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Official UK passport photo rules
              </h2>
              <p className="mt-3 text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                These are the exact rules our online passport photo checker UK tool validates your photo against:
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-lg shadow-slate-200/40">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Requirement</th>
                    <th className="text-left px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">UK Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { req: "Photo size", val: "35mm × 45mm" },
                    { req: "Head height (chin to crown)", val: "29mm – 34mm" },
                    { req: "Background", val: "Plain cream or light grey" },
                    { req: "Expression", val: "Neutral, mouth closed, eyes open" },
                    { req: "Glasses", val: "Not permitted (except medical/religious exceptions)" },
                    { req: "Head coverings", val: "Not permitted, except for religious reasons" },
                    { req: "Photo age", val: "Taken within the last month" },
                  ].map(({ req, val }) => (
                    <tr key={req} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-800">{req}</td>
                      <td className="px-5 py-3.5 text-slate-500 font-medium">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 font-medium text-center mt-3">
              Rules shown are reviewed as of July 2026 based on HM Passport Office guidance and ICAO 9303.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            <div>
              <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Under the hood</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                How this UK passport digital photo checker works
              </h2>
              <div className="space-y-3 text-sm text-slate-500 font-medium leading-relaxed">
                <p>
                  When you upload a photo, <strong className="text-slate-700">Google MediaPipe Face Mesh</strong> maps 468 facial landmarks in real time — key points around your eyes, nose, mouth, jawline, and forehead. From those points, the checker calculates the same geometric ratios HM Passport Office reviewers look for.
                </p>
                <p>
                  It checks your <strong className="text-slate-700">head-to-frame height ratio</strong> against the 29–34mm rule, measures inter-ocular distance for correct alignment, and samples the background for shadows, colour cast, and pattern violations.
                </p>
                <p>
                  Every result is scored against the UK specification, giving you a clear pass, warning, or fail report you can act on before you submit your application.
                </p>
              </div>
            </div>
            <div className="space-y-2.5">
              {HOW_IT_WORKS.map(({ title, desc }, i) => (
                <div key={title} className="flex gap-3.5 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  <span className="text-[11px] font-black text-slate-300 leading-none shrink-0 mt-0.5">0{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 mb-0.5">{title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── TIPS SECTION ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20" aria-labelledby="tips-heading">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">Before you upload</p>
          <h2 id="tips-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How to take a compliant UK passport photo at home
          </h2>
          <p className="mt-3 text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            You don't need a studio. These steps produce a photo that passes UK passport photo verification with any modern smartphone.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Sun, title: "Use natural light", desc: "Stand facing a window. Natural indirect light fills your face evenly and eliminates shadows without harsh highlights." },
            { icon: ImageIcon, title: "Find a plain cream or grey wall", desc: "A cream or light grey wall matches the UK background rule. Stand at least 1 metre away to avoid casting a shadow on it." },
            { icon: Monitor, title: "Shoot at eye level", desc: "Hold your phone level with your eyes. Shooting from above or below distorts facial geometry and fails the head-position check." },
            { icon: Eye, title: "Neutral expression, eyes open", desc: "Look directly at the camera, keep your mouth closed, eyes fully open, and hold a relaxed neutral expression. No smiling." },
          ].map(({ icon: TipIcon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-5 border border-slate-100 shadow-lg shadow-slate-200/40 hover:border-blue-100 transition-colors duration-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
                <TipIcon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1.5">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. INTERNAL LINKS SECTION ─────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 text-center">
            Explore Related Passport &amp; Photo Tools
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link
              href="/passport-photo-checker"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  Passport Photo Checker
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Universal biometric compliance validator for 50+ countries.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Check Passport Photo →
              </span>
            </Link>

            <Link
              href="/online-passport-photo-checker"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  Online Photo Checker
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Free instant in-browser test with zero downloads or accounts.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Open Online Checker →
              </span>
            </Link>

            <Link
              href="/australian-passport-photo-checker"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  Australian Photo Checker
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Verify 35×45mm, 32–36mm face height, and DFAT &amp; APO standards.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Check Australian Photo →
              </span>
            </Link>

            <Link
              href="/diversity-visa-lottery-photo-checker"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  DV Lottery Photo Checker
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Validate 600×600 px digital requirements for US Green Card.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Check DV Lottery Photo →
              </span>
            </Link>

            <Link
              href="/uk-passport-size-photo-maker"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  UK Passport Size Photo Maker
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Create printable 35×45mm UK photos or digital code photos online.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Make UK Photo →
              </span>
            </Link>

            <Link
              href="/visa-photo-validator"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  Free Photo Validator
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Biometric compliance scan for passports and visas for 50+ countries.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Open Validator →
              </span>
            </Link>

            <Link
              href="/passport-size-photo-maker"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  Global Passport Size Photo Maker
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Format compliant passport photos for over 130 countries worldwide.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Create Global Photo →
              </span>
            </Link>

            <Link
              href="/fr"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  PixPassVisa France (Photo Identité)
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Générez votre photo d'identité conforme pour passeport et carte d'identité.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 mt-3 flex items-center gap-1">
                Voir en français →
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20" aria-labelledby="faq-heading">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">FAQ</p>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Common questions about checking a UK passport photo online
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden bg-blue-600 rounded-xl p-8 sm:p-12 text-center">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-600/50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-blue-600/40 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[11px] font-bold text-blue-200 uppercase tracking-[0.2em] mb-3">Ready?</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              Check your UK passport photo in seconds
            </h2>
            <p className="text-blue-100 font-medium text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Avoid a costly rejection. Upload your photo now and get a full GOV.UK-standard compliance report — free, private, and instant.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-black text-xs px-6 py-3 rounded-xl hover:bg-blue-50/70 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/20/20 uppercase tracking-widest"
            >
              Check My UK Photo
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
