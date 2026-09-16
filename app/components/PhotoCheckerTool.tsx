"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Lock, Zap, Globe, ShieldCheck, Ruler, Camera, Sparkles } from "lucide-react";
import { useFaceVerification } from "@/hooks/useFaceVerification";
import ValidationReportView from "@/app/visa-photo-validator/components/ValidationReport";
import { getFilteredDocumentTypes, SUPPORTED_COUNTRIES } from "@/lib/specs";
import { countryMapping } from "@/lib/external-api";
import DirectAnswerBox from "./DirectAnswerBox";
import OfficialSourceBadge from "./OfficialSourceBadge";

export interface SpecHighlight {
  label: string;
  value: string;
}

export interface RequirementItem {
  icon?: string | React.ReactNode;
  title: string;
  desc: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedToolItem {
  title: string;
  desc: string;
  href: string;
  icon?: string | React.ReactNode;
}

export interface PhotoCheckerToolProps {
  // Country & Document configuration
  initialCountry?: string; // e.g. "AU", "US", "GB", "IN"
  lockCountry?: boolean;
  countryName?: string;
  countryFlag?: string;
  initialDocType?: "passport" | "visa";
  lockDocType?: boolean;
  docTypeName?: string;

  // Hero & Header
  badgeText?: string;
  title: string;
  highlightTitle?: string;
  subtitle: string;

  // Specs & Details
  specs?: SpecHighlight[];
  requirements?: RequirementItem[];
  faqs?: FAQItem[];
  relatedTools?: RelatedToolItem[];
  directAnswer?: {
    question: string;
    answer: string;
    keyPoints?: string[];
    lastReviewed?: string;
    sourceAuthority?: string;
  };
  officialSources?: {
    name: string;
    url: string;
    authority: string;
  }[];
}

// ─── Trust Badges ────────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: Lock, text: "Secure & Private" },
  { icon: Zap, text: "Results in < 3s" },
  { icon: Globe, text: "Official Specs" },
  { icon: ShieldCheck, text: "100% Free Check" },
];

// ─── Country Selector Component ──────────────────────────────────────────────
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
      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        Issuing Authority / Country
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-3.5 flex items-center justify-between text-sm font-semibold text-slate-800 hover:border-blue-500 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="flex items-center gap-2.5 truncate">
          <span className="text-xl leading-none">{selected?.flag ?? "🏳️"}</span>
          <span className="truncate">{selected?.country ?? "Select Country"}</span>
        </span>
        <span className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-72 flex flex-col"
          role="listbox"
        >
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                autoFocus
              />
            </div>
          </div>

          <div className="overflow-y-auto divide-y divide-slate-50 py-1">
            {countryMap.length === 0 ? (
              <p className="px-4 py-3 text-xs text-slate-400 text-center font-medium">No countries found</p>
            ) : (
              countryMap.map(([name, { code, flag }]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    onSelect(code);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full px-3.5 py-2.5 flex items-center gap-2.5 text-left text-xs font-semibold transition-colors hover:bg-blue-50/70/80 ${
                    selectedCountry === code ? "bg-blue-50/70 text-blue-800" : "text-slate-700"
                  }`}
                >
                  <span className="text-base leading-none">{flag}</span>
                  <span className="truncate">{name}</span>
                  {selectedCountry === code && (
                    <svg className="w-3.5 h-3.5 text-blue-700 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Compact Upload Zone ─────────────────────────────────────────────────────
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
        accept="image/jpeg,image/png,image/webp"
        onChange={onFileChange}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label="Upload photo for verification"
      />
      <div
        className={`h-40 sm:h-44 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-200 ${
          isDragging
            ? "border-blue-600 bg-blue-50/70/80 scale-[1.005]"
            : previewUrl
            ? "border-blue-300 bg-blue-50/70/30"
            : "border-slate-200 bg-slate-50/60 group-hover:border-blue-400 group-hover:bg-white"
        }`}
      >
        {previewUrl ? (
          <div className="w-full h-full relative flex items-center justify-center p-3">
            <img
              src={previewUrl}
              alt="Passport photo preview"
              className="h-full w-auto object-contain rounded-md shadow-sm"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center rounded-xl">
              <span className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Change Photo
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center px-4 py-6 flex flex-col items-center gap-2.5">
            <div className="w-11 h-11 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-700 group-hover:border-blue-200 transition-all duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">
                {isDragging ? "Drop your photo right here" : "Upload photo or drag & drop"}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Supports JPEG, PNG, WebP · Up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50/70 transition-colors"
      >
        <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {item.question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-50">
          {item.answer}
        </div>
      )}
    </div>
  );
}

// ─── Main Reusable Checker Component ─────────────────────────────────────────
export default function PhotoCheckerTool({
  initialCountry = "US",
  lockCountry = false,
  countryName,
  countryFlag,
  initialDocType = "passport",
  lockDocType = false,
  docTypeName,
  badgeText = "Official Biometric Photo Tool · Free & Instant",
  title,
  highlightTitle,
  subtitle,
  specs = [],
  requirements = [],
  faqs = [],
  relatedTools = [],
  directAnswer,
  officialSources,
}: PhotoCheckerToolProps) {
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedDocType, setSelectedDocType] = useState<"passport" | "visa">(initialDocType);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { verifyPhoto, isProcessing, loadingMessage, report, setReport, error, setError } = useFaceVerification();

  const documentTypes = getFilteredDocumentTypes();

  const handleReset = useCallback(() => {
    setReport(null);
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  }, [setReport, setError, previewUrl]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  }, []);

  const handleVerify = useCallback(() => {
    if (!file) return;
    verifyPhoto(file, selectedCountry, selectedDocType);
  }, [file, selectedCountry, selectedDocType, verifyPhoto]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Document matching for Price & Order redirect
  const matchedDoc = documentTypes.find((d) => {
    const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
    const code = countryMapping[slug] || slug.toUpperCase();
    return code === selectedCountry && d.id.endsWith(`-${selectedDocType}`);
  }) || documentTypes.find((d) => {
    const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
    const code = countryMapping[slug] || slug.toUpperCase();
    return code === selectedCountry;
  });

  const selectedDocId = matchedDoc?.id || (selectedCountry === "AU" ? "australia-passport" : selectedCountry === "GB" ? "uk-passport" : (selectedCountry === "CHE" || selectedCountry === "CH") ? "switzerland-passport" : (selectedCountry === "NI") ? "nigeria-passport" : "us-passport");
  const selectedDocPrice = matchedDoc?.price || 6.99;

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* ── GOV/BRAND ACCENT BAR (Same as Homepage) ── */}
      <div className="h-1 bg-blue-700 w-full" />

      {/* ── HERO SECTION ── */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Official Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-200 rounded px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse" />
              <span className="text-xs font-semibold text-blue-800 tracking-wide uppercase">
                {badgeText}
              </span>
            </div>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
            {title}{" "}
            {highlightTitle && (
              <span className="text-blue-700 font-extrabold">{highlightTitle}</span>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-3xl mb-6">
            {subtitle}
          </p>

          {/* Direct Answer Box for AI (GEO) & Search Featured Snippets */}
          {directAnswer && (
            <DirectAnswerBox
              question={directAnswer.question}
              answer={directAnswer.answer}
              keyPoints={directAnswer.keyPoints}
              lastReviewed={directAnswer.lastReviewed}
              sourceAuthority={directAnswer.sourceAuthority}
            />
          )}

          {/* Trust Rating Strip (Matching Homepage) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1d4ed8">
                    <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.6l-6.4 5.4 2.8-8.7L2 10.9h8.1z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                4.9 <span className="text-slate-400 font-normal">· Trusted by 17,000+ applicants</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
              {TRUST_BADGES.map((b) => {
                const IconComponent = b.icon;
                return (
                  <span key={b.text} className="inline-flex items-center gap-1.5">
                    <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                    <span>{b.text}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOL & CHECKER SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Upload & Config Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">1</span>
              Step 1: Check Photo Requirements
            </h2>

            {/* Document / Country Configuration */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <CountrySelector
                documentTypes={documentTypes}
                selectedCountry={selectedCountry}
                onSelect={(code) => {
                  setSelectedCountry(code);
                  if (report) setReport(null);
                }}
              />

              <div>
                <label htmlFor="tool-doc-type" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Document Standard
                </label>
                {lockDocType ? (
                  <div className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-3.5 flex items-center text-sm font-bold text-slate-800">
                    <span className="truncate">{docTypeName || "Passport Photo"}</span>
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      id="tool-doc-type"
                      value={selectedDocType}
                      onChange={(e) => setSelectedDocType(e.target.value as "passport" | "visa")}
                      className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-3.5 pr-10 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none hover:bg-white hover:border-blue-400 transition-all cursor-pointer"
                    >
                      <option value="passport">Passport Photo</option>
                      <option value="visa">Visa Photo</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Upload */}
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">2</span>
              Step 2: Upload Your Photo
            </h3>

            <UploadZone
              previewUrl={previewUrl}
              onFileChange={handleFileChange}
              isDragging={isDragging}
              onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            />

            {/* Checklist Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Plain background", "Eyes open & clear", "Centered face", "No glasses / glare"].map((req) => (
                <span
                  key={req}
                  className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-full px-2.5 py-1 text-[11px] font-medium text-slate-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {req}
                </span>
              ))}
            </div>

            {/* Verify CTA Button */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={!file || isProcessing}
              className={`w-full mt-6 h-12 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 flex items-center justify-center gap-2 shadow-sm ${
                !file || isProcessing
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-blue-700 hover:bg-blue-800 text-white shadow-blue-500/20/20 active:scale-[0.99]"
              }`}
              aria-busy={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{loadingMessage}</span>
                </>
              ) : (
                <>
                  <span>Verify Photo Biometrics</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg flex items-start gap-2.5" role="alert">
                <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>{error}</div>
              </div>
            )}
          </div>

          {/* RIGHT: Validation Report OR Specs Overview */}
          <div className="lg:col-span-6 lg:sticky lg:top-8">
            {report ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm">
                <ValidationReportView
                  report={report}
                  onReset={handleReset}
                  selectedDocId={selectedDocId}
                  selectedDocPrice={selectedDocPrice}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      Official Document Specifications
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Exact criteria tested during verification
                    </p>
                  </div>
                </div>

                {/* Specs Highlights Grid */}
                {specs.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {specs.map((s) => (
                      <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                          {s.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Biometric Checklist */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Automated Verification Checks:
                  </p>
                  {[
                    { title: "Facial Geometry & Head Proportions", desc: "Measures face height, chin-to-crown ratio, and centering" },
                    { title: "Background Uniformity", desc: "Validates solid color, lack of shadows, patterns, or gradients" },
                    { title: "Lighting & Glare Detection", desc: "Checks balance, absence of harsh flashes, shadows, or red-eye" },
                    { title: "Facial Expression & Eyes", desc: "Confirms neutral expression, eyes fully visible and open" },
                    { title: "Eyewear & Obstruction Check", desc: "Detects prohibited glasses, hair covering eyes or face" },
                  ].map((check) => (
                    <div key={check.title} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block leading-tight">{check.title}</span>
                        <span className="text-[11px] text-slate-500 leading-normal">{check.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>⚡ Analysis completes in &lt; 3 seconds</span>
                  <span>🔒 Ephemeral secure session</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS & FEATURE GRID ── */}
      {requirements.length > 0 && (
        <section className="bg-white border-y border-slate-200 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50/70 border border-blue-200/60 rounded px-2.5 py-1">
                Official Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3 mb-2">
                What the Biometric Validator Checks
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                Every photo undergoes the exact geometric and visual checks enforced by consular offices and automated border e-Gates.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {requirements.map((r) => (
                <div
                  key={r.title}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50/70 text-blue-700 flex items-center justify-center text-xl mb-3 group-hover:scale-105 transition-transform">
                    {r.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{r.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS (3 SIMPLE STEPS) ── */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            How to Validate Your Photo in 3 Steps
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            No software installation or account creation required. Fast, private, and 100% free.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Upload Your Photo",
              desc: "Take a picture on your smartphone facing a window or upload an existing photo. Any clear portrait works.",
            },
            {
              step: "02",
              title: "Automated Biometric Scan",
              desc: "Our engine maps key facial points, evaluates background uniformity, and verifies exact specifications.",
            },
            {
              step: "03",
              title: "Review Scored Report",
              desc: "Get an instant pass/fail report with actionable recommendations before submitting to government portals.",
            },
          ].map((s) => (
            <div key={s.step} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-black text-blue-700 bg-blue-50/70 px-2.5 py-1 rounded border border-blue-100 inline-block mb-3">
                STEP {s.step}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OFFICIAL VERIFICATION LAYER & CITATIONS (E-E-A-T) ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <OfficialSourceBadge
          sources={officialSources}
          documentType={`${countryName || "Passport"} Photo Requirements`}
        />
      </section>

      {/* ── FAQ SECTION ── */}
      {faqs.length > 0 && (
        <section className="bg-white border-t border-slate-200 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 font-normal">
                Everything you need to know about photo compliance and verification rules.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQAccordionItem key={faq.question} item={faq} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED TOOLS SECTION (Matching Homepage) ── */}
      {relatedTools.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Related Photo Tools &amp; Creators
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Fix, crop, or generate print-ready passport templates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {typeof tool.icon === "string" && tool.icon ? <span>{tool.icon}</span> : tool.icon || <Camera className="w-4 h-4" />}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {tool.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-700 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Tool →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
