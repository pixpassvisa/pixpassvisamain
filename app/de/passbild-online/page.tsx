"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { compressImage } from "@/lib/compressImage";
import UploadArea from "@/app/passport-photo-online/components/UploadArea";
import GuidePrompt from "@/app/passport-photo-online/components/GuidePrompt";
import { WarnIcon } from "@/app/passport-photo-online/components/Icons";
import { documentTypes } from "@/app/passport-photo-online/constants";
import { countryMapping } from "@/lib/external-api";
import { de } from "../translations";

function ProcessingTextDe() {
  const [index, setIndex] = useState(0);
  const messages = de.status.processingSteps;
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % messages.length), 2000);
    return () => clearInterval(timer);
  }, [messages.length]);
  return <span>{messages[index]}</span>;
}

const germanySubDocs = [
  { id: "germany-passport", label: "Deutschland – Reisepass" },
  { id: "germany-id-card", label: "Deutschland – Personalausweis" },
  { id: "germany-driving-license", label: "Deutschland – Führerschein" },
  { id: "germany-health-insurance", label: "Deutschland – Gesundheitskarte" },
  { id: "germany-cv", label: "Deutschland – Bewerbungsfoto" },
  { id: "germany-student-id", label: "Deutschland – Studierendenausweis" },
  { id: "germany-visa", label: "Deutschland – Visum" },
];

const baseGermany = documentTypes.find((d) => d.id === "germany-passport") || {
  size: "35×45 mm",
  bg_color: "hellgrau",
  country: "Deutschland",
  flag: "🇩🇪",
  price: 6.99,
  printSize: "A4" as const,
};

const localizedDocumentTypes = documentTypes.flatMap((doc) => {
  if (doc.id === "germany-passport") {
    return germanySubDocs.map((sub) => ({
      ...baseGermany,
      id: sub.id,
      label: sub.label,
    }));
  }
  return doc;
});

function ToolFormDe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const [selectedDoc, setSelectedDoc] = useState("germany-passport");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cropMsg, setCropMsg] = useState("");
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [headerSelectorOpen, setHeaderSelectorOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const headerSelectorRef = useRef<HTMLDivElement>(null);
  const headerSearchRef = useRef<HTMLInputElement>(null);

  const headerFilteredDocs = localizedDocumentTypes.filter(
    (doc) => doc.label.toLowerCase().includes(headerSearchTerm.toLowerCase()) || doc.country?.toLowerCase().includes(headerSearchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerSelectorRef.current && !headerSelectorRef.current.contains(e.target as Node)) { setHeaderSelectorOpen(false); setHeaderSearchTerm(""); }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { if (headerSelectorOpen && headerSearchRef.current) headerSearchRef.current.focus(); }, [headerSelectorOpen]);
  useEffect(() => { const saved = localStorage.getItem("selectedDocDe"); if (saved && localizedDocumentTypes.some((d) => d.id === saved)) setSelectedDoc(saved); }, []);
  useEffect(() => { if (initialType && localizedDocumentTypes.some((d) => d.id === initialType)) setSelectedDoc(initialType); }, [initialType]);
  useEffect(() => { if (selectedDoc) localStorage.setItem("selectedDocDe", selectedDoc); }, [selectedDoc]);

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("hasSeenGuideDe");
    if (hasSeenGuide) return;
    const timer = setTimeout(() => { if (!selectedFile) { setShowGuide(true); localStorage.setItem("hasSeenGuideDe", "true"); } }, 6000);
    return () => clearTimeout(timer);
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFile) { setPreviewUrl(""); return; }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const activeDoc = localizedDocumentTypes.find((d) => d.id === selectedDoc) || localizedDocumentTypes.find((d) => d.id === "germany-passport") || localizedDocumentTypes[0];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg("");
    const compressed = await compressImage(file);
    setSelectedFile(compressed);
    await handleExternalProcess(compressed);
  };

  const handleExternalProcess = async (file: File) => {
    setIsUploading(true);
    setErrorMsg("");
    setCropMsg(de.status.processing);
    const countrySlug = activeDoc.id.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
    let countryCode = countryMapping[countrySlug] || "DE";
    if (activeDoc.id.includes("ds-160")) countryCode = "US";
    if (activeDoc.id.includes("schengen")) countryCode = "EU";
    if (activeDoc.id.startsWith("germany-")) countryCode = "DE";
    const documentType = activeDoc.id.includes("visa") ? "visa" : "passport";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("country_code", countryCode);
    formData.append("document_type", documentType);
    formData.append("full_doc_id", activeDoc.id);
    formData.append("source", "pixpassvisa_tool");

    try {
      const res = await fetch("/api/external-process", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || de.errors.genericError);
      setCropMsg(de.status.redirecting);
      await new Promise((r) => setTimeout(r, 800));
      // Redirect to German preview page
      router.push(`/de/preview/${data.photoId}`);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : de.errors.retry);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => { setSelectedFile(null); setErrorMsg(""); };

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto px-3 lg:px-0 pb-6 relative w-full">
      <div className="flex flex-col lg:min-h-[calc(100vh-200px)] gap-4">
        <div className="flex-1 flex flex-col min-w-0 bg-gray-100 border border-white rounded-2xl p-3 lg:p-5 overflow-y-auto">
          {/* Document header selector */}
          <div className="mb-3 relative" ref={headerSelectorRef}>
            <button
              type="button"
              onClick={() => setHeaderSelectorOpen((v) => !v)}
              className={`w-full flex items-center justify-between bg-white/60 backdrop-blur-sm px-3 py-2.5 rounded-xl border shadow-sm cursor-pointer transition-all duration-200 ${headerSelectorOpen ? "border-blue-400 ring-1 ring-blue-500/20" : "border-white hover:border-slate-200"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-inner border border-slate-100 text-lg">{activeDoc.flag}</div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">{de.tool.activeRequirement}</span>
                  <h2 className="text-xs font-black text-slate-900 leading-none">{activeDoc.label}</h2>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-right">
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{de.tool.dimensions}</span>
                    <span className="text-xs font-bold text-slate-600 leading-none">{activeDoc.size}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 hidden sm:block" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{de.tool.background}</span>
                    <span className="text-xs font-bold text-blue-600 leading-none">{activeDoc.bg_color}</span>
                  </div>
                </div>
                <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${headerSelectorOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {headerSelectorOpen && (
              <>
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden" onClick={() => setHeaderSelectorOpen(false)} />
                <div className="fixed inset-x-4 top-20 bottom-4 lg:absolute lg:inset-x-0 lg:top-full lg:bottom-auto z-[70] lg:z-50 lg:mt-1 bg-white border border-slate-200 rounded-2xl lg:rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-3 lg:p-2 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <input ref={headerSearchRef} type="text" placeholder={de.tool.searchPlaceholder} value={headerSearchTerm} onChange={(e) => setHeaderSearchTerm(e.target.value)} className="w-full pl-10 pr-10 py-3 lg:py-2 text-sm lg:text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" />
                      {headerSearchTerm && (
                        <button onClick={() => setHeaderSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <nav className="flex-1 overflow-y-auto custom-scrollbar lg:max-h-64">
                    {headerFilteredDocs.length > 0 ? (
                      headerFilteredDocs.map((doc) => (
                        <button key={doc.id} onClick={() => { setSelectedDoc(doc.id); handleReset(); setHeaderSelectorOpen(false); setHeaderSearchTerm(""); }}
                          className={`relative group w-full flex flex-col px-4 py-4 lg:px-3 lg:py-2.5 text-left transition-all duration-150 border-b border-slate-50 last:border-b-0 ${selectedDoc === doc.id ? "bg-blue-50" : "bg-transparent hover:bg-slate-50"}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {doc.flag && <span className="text-xl lg:text-sm leading-none">{doc.flag}</span>}
                              <p className={`text-sm lg:text-xs font-bold leading-tight ${selectedDoc === doc.id ? "text-blue-900" : "text-slate-600"}`}>{doc.label}</p>
                            </div>
                            {selectedDoc === doc.id && (<svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>)}
                          </div>
                          <p className="text-[11px] lg:text-[10px] text-slate-400 mt-1 font-medium ml-8 lg:ml-6">{doc.size} · {doc.bg_color}</p>
                        </button>
                      ))
                    ) : (
                      <div className="py-12 px-6 text-center">
                        <p className="text-sm lg:text-xs text-slate-400 font-medium">{de.errors.noDocuments}</p>
                        <button onClick={() => setHeaderSearchTerm("")} className="text-xs lg:text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-3 hover:text-blue-700">{de.buttons.clearSearch}</button>
                      </div>
                    )}
                  </nav>
                </div>
              </>
            )}
          </div>

          {/* Disclaimer banner */}
          <div className="mt-4 mb-4 rounded-2xl border border-emerald-200/70 bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-800 max-w-full sm:max-w-2xl">{de.tool.noAiDisclaimer}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-red-300 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-center">{de.tool.noAiBadge}</span>
                    <span className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-amber-800 text-center">{de.tool.expertReview}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload area */}
          {!selectedFile && (
            <UploadArea onFileChange={handleFileChange} guidelinesOpen={guidelinesOpen} setGuidelinesOpen={setGuidelinesOpen} onShowGuide={() => setShowGuide(true)} locale="de" />
          )}

          {/* Processing state */}
          {isUploading && (
            <div className="mt-4 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                <div className="relative shrink-0 w-32 h-40 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {previewUrl ? (<img src={previewUrl} alt="Verarbeitung" className="w-full h-full object-cover opacity-60" />) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20"><svg width="40" height="50" viewBox="0 0 80 100" fill="none"><circle cx="40" cy="28" r="18" fill="#6366f1" /><path d="M10 90 Q10 62 40 62 Q70 62 70 90" fill="#6366f1" /></svg></div>
                  )}
                  <div className="absolute left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-10" style={{ animation: "scanPingPong 2s ease-in-out infinite" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{de.tool.biometricEngine}</span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">
                    <span className="inline-block" style={{ minWidth: "200px" }}>
                      {cropMsg === de.status.processing ? <ProcessingTextDe /> : cropMsg}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto sm:mx-0">{de.tool.calibrating}</p>
                  <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full animate-shimmer" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
              <style>{`@keyframes scanPingPong { 0%, 100% { top: 0%; opacity: 0; } 10%, 90% { opacity: 1; } 50% { top: 100%; } } @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } } .animate-shimmer { animation: shimmer 2s infinite linear; background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%); background-size: 200% 100%; }`}</style>
            </div>
          )}

          {/* Error */}
          {errorMsg && (
            <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
              <WarnIcon className="w-5 h-5 text-red-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-red-900">{de.errors.validationError}</p>
                <p className="text-[11px] text-red-700 mt-0.5">{errorMsg}</p>
                <button onClick={handleReset} className="mt-2 text-[10px] font-black uppercase tracking-tighter text-red-600 hover:text-red-800 underline">{de.buttons.startOver}</button>
              </div>
            </div>
          )}

          <GuidePrompt isOpen={showGuide} onClose={() => setShowGuide(false)} onUploadClick={() => { const input = document.getElementById("tool-photo-input"); if (input) (input as HTMLInputElement).click(); setShowGuide(false); }} locale="de" />
        </div>
      </div>
    </div>
  );
}

export default function DeToolPage() {
  return (
    <div className="bg-slate-50 min-h-screen ">
      <div className="py-4">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <ToolFormDe />
        </Suspense>
      </div>
    </div>
  );
}
