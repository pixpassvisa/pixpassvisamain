"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle2, Globe, Sun, User, Ruler, Sparkles, Zap, Palette } from "lucide-react";
import { documentTypes, bgColors } from "@/app/passport-photo-online/constants";
import { compressImage } from "@/lib/compressImage";
import PreviewClient from "@/app/preview/[id]/PreviewClient";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { LocalPrice } from "@/app/preview/[id]/hooks/usePayment";
import { countryMapping } from "@/lib/external-api";

/* ─── Types ─── */
type Step = "setup" | "processing" | "preview";

/* ─── Constants ─── */
const STAGES = [
  { label: "Compressing image", icon: Zap },
  { label: "Biometric analysis", icon: User },
  { label: "Generating results", icon: Sparkles },
];

const TIPS = [
  { icon: Sun, tip: "Good lighting, no shadows" },
  { icon: User, tip: "Face camera, neutral look" },
  { icon: Ruler, tip: "~1.5m (5 ft) distance" },
];

const TRUST = [
  { icon: Lock, text: "Deleted after 24h" },
  { icon: CheckCircle2, text: "30+ checks" },
  { icon: Globe, text: "100+ countries" },
];

/* ─── Sub-components ─── */
function StepBadge({ n, current }: { n: number; current: number }) {
  const active = n <= current;
  return (
    <div
      className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
    >
      {n < current ? (
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        n
      )}
    </div>
  );
}

function ProcessingRing({
  stage,
  previewUrl,
}: {
  stage: number;
  previewUrl: string | null;
}) {
  return (
    <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 sm:mb-8 mx-auto">
      <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse" />
      <div className="absolute inset-1 rounded-full border-[3px] border-slate-100" />
      <div
        className="absolute inset-1 rounded-full border-[3px] border-transparent border-t-blue-600 animate-spin"
        style={{ animationDuration: "1s" }}
      />
      <div
        className="absolute inset-4 rounded-full border-[3px] border-transparent border-t-blue-400 animate-spin"
        style={{ animationDuration: "1.6s", animationDirection: "reverse" }}
      />
      <div className="absolute inset-6 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Processing"
            className={`w-full h-full object-cover transition-all duration-500 ${stage >= 2 ? "opacity-40 saturate-50" : ""}`}
          />
        ) : (
          <svg
            className="w-7 h-7 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

/* Hero mockup: flat preview container showing full uncropped image */
function HeroMockup({
  previewUrl,
  img,
}: {
  previewUrl: string | null;
  img?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg flex items-center justify-center">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Your photo"
          className="w-full h-auto max-h-[550px] object-contain rounded-lg"
        />
      ) : img ? (
        <img
          src={img}
          alt="Passport photo preview"
          className="w-full h-auto max-h-[550px] object-contain rounded-lg"
        />
      ) : (
        <div className="relative aspect-[3/4] w-full flex items-center justify-center bg-slate-100 rounded-lg">
          <svg
            className="w-20 h-20 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function CustomDocumentDropdown({
  selectedDoc,
  setSelectedDoc,
}: {
  selectedDoc: string;
  setSelectedDoc: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeDoc = documentTypes.find((d) => d.id === selectedDoc);
  const filteredDocs = documentTypes.filter((doc) =>
    `${doc.label} ${doc.country || ""} ${doc.id} ${doc.size}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border text-left bg-white transition-all duration-200 ${
          isOpen
            ? "border-blue-500 ring-2 ring-blue-500 shadow-md"
            : "border-slate-200 hover:border-slate-300 shadow-xs"
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {activeDoc?.flag && (
            <span className="text-xl sm:text-2xl leading-none shrink-0">{activeDoc.flag}</span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm md:text-base font-bold text-slate-900 truncate">
              {activeDoc?.label || "Select country & document"}
            </p>
            {activeDoc && (
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                {activeDoc.size} · {activeDoc.bg_color || "White"} background
              </p>
            )}
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search bar inside dropdown */}
          <div className="p-2.5 sm:p-3 border-b border-slate-100 bg-slate-50/90 sticky top-0 z-10">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search country or document type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-9 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400 transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* List of documents */}
          <div className="max-h-64 sm:max-h-72 overflow-y-auto divide-y divide-slate-100">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => {
                const isSelected = selectedDoc === doc.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => {
                      setSelectedDoc(doc.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 text-left transition-all ${
                      isSelected
                        ? "bg-blue-50/70/80 text-blue-900 font-semibold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-lg sm:text-xl leading-none shrink-0">{doc.flag}</span>
                      <div className="min-w-0">
                        <p className={`text-xs sm:text-sm truncate ${isSelected ? "font-bold text-slate-950" : "font-medium text-slate-900"}`}>
                          {doc.label}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {doc.size} {doc.bg_color ? `· ${doc.bg_color}` : ""}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-5 text-center">
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  No document found for &quot;{searchTerm}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function PassportMakerApp({
  title,
  subtitle,
  defaultDoc = "uk-passport",
  img,
  hideDocSelector = false,
  isIcaoPage = false,
}: {
  title?: string;
  subtitle?: string;
  defaultDoc?: string;
  img?: string;
  hideDocSelector?: boolean;
  isIcaoPage?: boolean;
} = {}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("setup");
  const [selectedDoc, setSelectedDoc] = useState(defaultDoc);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [photoData, setPhotoData] = useState<any>(null);
  const [localPrice, setLocalPrice] = useState<LocalPrice | null>(null);
  const [expertPrice, setExpertPrice] = useState<LocalPrice | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultDoc) {
      setSelectedDoc(defaultDoc);
    }
  }, [defaultDoc]);

  useEffect(() => {
    if (!selectedFile) return setPreviewUrl(null);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    const fetchPrice = (isExpert = false) =>
      fetch(
        `/api/currency?currency=${tzCurrency}${isExpert ? "&isExpert=true" : ""}`,
      )
        .then((r) => r.json())
        .then(
          (d) =>
            d?.formatted && (isExpert ? setExpertPrice(d) : setLocalPrice(d)),
        )
        .catch(console.error);
    fetchPrice();
    fetchPrice(true);
  }, []);

  // Ensure selected document is valid when search term changes
  useEffect(() => {
    if (hideDocSelector) return;
    const docs = documentTypes.filter((doc) =>
      `${doc.label} ${doc.country || ""} ${doc.id} ${doc.size}`.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (docs.length > 0 && !docs.some((d) => d.id === selectedDoc)) {
      setSelectedDoc(docs[0].id);
    }
  }, [searchTerm, selectedDoc, hideDocSelector, isIcaoPage]);

  const resetToSetup = (clearError = true) => {
    setStep("setup");
    setSelectedFile(null);
    setPhotoData(null);
    if (clearError) setErrorMsg("");
    setProcessingStage(0);
  };

  const processFile = async (file: File) => {
    setErrorMsg("");
    setProcessingStage(0);
    setStep("processing");
    const compressed = await compressImage(file);
    setSelectedFile(compressed);

    const countrySlug = selectedDoc
      .replace(/-passport$/, "")
      .replace(/-visa$/, "")
      .toLowerCase();
    let countryCode = countryMapping[countrySlug] || "US";
    if (selectedDoc.includes("ds-160")) countryCode = "US";
    if (isIcaoPage && selectedDoc === defaultDoc) countryCode = "EU";
    else if (!isIcaoPage && (selectedDoc.includes("schengen") || selectedDoc.includes("icao") || selectedDoc.startsWith("eu"))) countryCode = "EU";
    if (selectedDoc.startsWith("france-")) countryCode = "FR";

    const formData = new FormData();
    formData.append("image", compressed);
    formData.append("country_code", countryCode);
    formData.append(
      "document_type",
      selectedDoc.includes("visa") ? "visa" : "passport",
    );
    formData.append("full_doc_id", isIcaoPage ? (selectedDoc !== defaultDoc ? selectedDoc : "icao-passport") : selectedDoc);
    formData.append("source", "pixpassvisa_maker");

    try {
      setProcessingStage(1);
      const res = await fetch("/api/external-process", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.details || data.error || "Processing failed");

      setProcessingStage(2);
      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();
      if (!photoRes.ok || !photoResult.success)
        throw new Error("Failed to load generated photo details.");

      setPhotoData(photoResult.data);
      router.push(`/preview/${data.photoId}`);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      resetToSetup(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) await processFile(file);
  };

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectedDocSpec = documentTypes.find((d) => d.id === selectedDoc);
  const filteredDocs = documentTypes.filter((doc) =>
    `${doc.label} ${doc.country || ""} ${doc.id} ${doc.size}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* ── PREVIEW ── */
  if (step === "preview" && photoData && localPrice && expertPrice) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 mb-1">
          <button
            onClick={() => resetToSetup()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <span className="w-7 h-7 rounded-full bg-blue-50/70 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </span>
            Create another photo
          </button>
        </div>
        <PreviewClient
          {...{
            photoId: photoData.photoId,
            previewUrl: photoData.previewUrl,
            documentType: photoData.documentType,
            metrics: photoData.metrics,
            localPrice,
            expertPrice,
            initialIsPaid: photoData.isPaid,
          }}
        />
      </div>
    );
  }

  /* ── PROCESSING ── */
  if (step === "processing") {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-3 py-8 sm:py-12">
        <div className="w-full max-w-sm text-center">
          <ProcessingRing stage={processingStage} previewUrl={previewUrl} />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
            {STAGES[processingStage].label}…
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8">
            Hang tight — almost done!
          </p>
          <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 space-y-2.5 sm:space-y-3">
            {STAGES.map(({ label, icon: IconComponent }, i) => {
              const isDone = i < processingStage;
              const isActive = i === processingStage;
              return (
                <div key={i} className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm shrink-0 transition-all duration-300 ${isDone ? "bg-emerald-100 text-emerald-600" : isActive ? "bg-blue-100 text-blue-600 animate-pulse" : "bg-white text-slate-300 border border-slate-200"}`}
                  >
                    {isDone ? (
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium flex-1 text-left transition-colors duration-300 ${isDone ? "text-emerald-600 line-through decoration-emerald-300" : isActive ? "text-blue-700 font-semibold" : "text-slate-400"}`}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                  )}
                  {isDone && (
                    <span className="text-[11px] sm:text-xs font-bold text-emerald-500">
                      Done
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── SETUP ── */
  return (
    <div className="pb-4 sm:pb-6">
      {/* ── Hero: split text / image ── */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 pt-3 sm:pt-6 pb-4 sm:pb-6">
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-center">
          {/* Left: text */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/70 border border-blue-200 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-blue-700 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Official photo specs
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-[1.15]">
              {title || "Passport photos, done right in seconds"}
            </h1>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-500 max-w-md mx-auto md:mx-0">
              {subtitle ||
                "Upload any photo. We crop it, fix the background and check it against 30+ official rules for your country's passport, visa or ID."}
            </p>

            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center md:items-start gap-2.5">
              <button
                onClick={scrollToUpload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-sm hover:bg-blue-600 active:scale-95 transition-all"
              >
                Start with your photo
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5">
              {TRUST.map(({ icon: IconComponent, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold"
                >
                  <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image / mockup */}
          <div>
            <HeroMockup previewUrl={previewUrl} img={img} />
          </div>
        </div>
      </section>

      {/* ── Below hero: split country support / upload ── */}
      <section
        ref={uploadSectionRef}
        className="max-w-6xl mx-auto px-3 sm:px-4 scroll-mt-4 pt-8 sm:pt-10"
      >
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* ── Left: Document / country support ── */}
          <div className="relative z-20 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="rounded-t-2xl px-4 py-3.5 sm:px-5 sm:py-4 border-b border-slate-100 flex items-start gap-3 bg-slate-50/40">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 shadow-xs">
                  1
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm sm:text-base font-bold text-slate-900">
                      {hideDocSelector || isIcaoPage ? "ICAO Standard Photograph" : "Select country & document"}
                    </p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wide ${hideDocSelector || isIcaoPage ? "bg-blue-100 text-blue-700" : "bg-blue-100 text-blue-700"}`}>
                      {hideDocSelector || isIcaoPage ? "Standard Active" : "Required"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {hideDocSelector || isIcaoPage
                      ? "International Civil Aviation Organization (ICAO Doc 9303 / EU standard)"
                      : "Search and choose your passport, visa, ID card, or government photo specification."}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                {hideDocSelector || isIcaoPage ? (
                  <div className="space-y-3 sm:space-y-4">
                   

                  

                    {/* Country / Document selector for ICAO page */}
                    <div className="pt-3 sm:pt-4  border-slate-100 mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                     
                       <span>Or select a specific country for ICAO-compliant photo & document requirements</span>
                        
                      </p>
                      <CustomDocumentDropdown
                        selectedDoc={selectedDoc}
                        setSelectedDoc={setSelectedDoc}
                      />
                      {/* Show selected country doc specs if user picked one */}
                      {selectedDocSpec && selectedDoc !== defaultDoc && (
                        <div className="flex flex-wrap gap-2 pt-2 mt-2">
                          {[
                            {
                              label: "Photo Size",
                              value: selectedDocSpec.size,
                              icon: Ruler,
                            },
                            {
                              label: "Background",
                              value: selectedDocSpec.bg_color || "White",
                              icon: Palette,
                            },
                          ].map(({ label, value, icon: IconComponent }) => (
                            <div
                              key={label}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70/70 px-3 py-1.5 text-xs font-semibold text-blue-800"
                            >
                              <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                              <span className="text-blue-700">{label}:</span>
                              <span className="text-slate-900 font-bold">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Custom Searchable Select Dropdown */}
                    <CustomDocumentDropdown
                      selectedDoc={selectedDoc}
                      setSelectedDoc={setSelectedDoc}
                    />

                    {/* Spec pills */}
                    {selectedDocSpec && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          {
                            label: "Photo Size",
                            value: selectedDocSpec.size,
                            icon: Ruler,
                          },
                          {
                            label: "Background",
                            value: selectedDocSpec.bg_color || "White",
                            icon: Palette,
                          },
                        ].map(({ label, value, icon: IconComponent }) => (
                          <div
                            key={label}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70/70 px-3 py-1.5 text-xs font-semibold text-blue-800"
                          >
                            <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-blue-700">{label}:</span>
                            <span className="text-slate-900 font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Upload ── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-slate-100 bg-slate-50/60 flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 shadow-xs">
                  2
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    Upload your photo
                  </p>
                  <p className="text-xs text-slate-500">
                    JPEG, PNG or WEBP · max 15 MB
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                <input
                  ref={fileInputRef}
                  id="photo-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 select-none ${
                    dragOver
                      ? "border-blue-500 bg-blue-50/70"
                      : "border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-blue-50/70/30"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center py-7 sm:py-10 px-4 text-center">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                        dragOver ? "bg-blue-100 text-blue-600" : "bg-white border border-slate-200 text-slate-400 shadow-xs"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-slate-500 mb-3.5">
                      Click here or drag and drop your photo
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-700 active:scale-98 transition-all shadow-sm"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Upload Your Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {TIPS.map(({ icon: IconComponent, tip }) => (
                    <div
                      key={tip}
                      className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-center"
                    >
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-tight">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error banner */}
        {errorMsg && (
          <div className="mt-4 flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <svg
              className="w-5 h-5 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-semibold">Processing failed</p>
              <p className="text-xs sm:text-sm mt-0.5 text-red-600">{errorMsg}</p>
            </div>
            <button
              onClick={() => setErrorMsg("")}
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label="Dismiss"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
