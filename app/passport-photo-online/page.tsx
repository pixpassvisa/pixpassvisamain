"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { compressImage } from "@/lib/compressImage";

// New specialized components

import UploadArea from "./components/UploadArea";
import GuidePrompt from "./components/GuidePrompt";
import { WarnIcon } from "./components/Icons";

// Constants and Types
import { documentTypes, bgColors } from "./constants";
import { Feedback } from "./types";
import { countryMapping } from "@/lib/external-api";

function ProcessingText() {
  const [index, setIndex] = useState(0);
  const messages = [
    "Fixing lighting & exposure...",
    "Removing background color...",
    "Calibrating head size to spec...",
    "Aligning eye level height...",
    "Checking ICAO biometric standards...",
    "Verifying facial landmarks...",
    "Finalizing high-res output..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return <span>{messages[index]}</span>;
}

function ToolForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const [selectedDoc, setSelectedDoc] = useState("general");
  const [isLocked, setIsLocked] = useState(false);
  const [selectedBg, setSelectedBg] = useState("white");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cropMsg, setCropMsg] = useState("");
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Header inline document selector
  const [headerSelectorOpen, setHeaderSelectorOpen] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const headerSelectorRef = useRef<HTMLDivElement>(null);
  const headerSearchRef = useRef<HTMLInputElement>(null);

  const headerFilteredDocs = documentTypes.filter(
    (doc) =>
      doc.label.toLowerCase().includes(headerSearchTerm.toLowerCase()) ||
      doc.country?.toLowerCase().includes(headerSearchTerm.toLowerCase())
  );

  // Close header selector on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerSelectorRef.current && !headerSelectorRef.current.contains(e.target as Node)) {
        setHeaderSelectorOpen(false);
        setHeaderSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search input when header selector opens
  useEffect(() => {
    if (headerSelectorOpen && headerSearchRef.current) {
      headerSearchRef.current.focus();
    }
  }, [headerSelectorOpen]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedDoc");
    if (saved && documentTypes.some((d) => d.id === saved)) {
      setSelectedDoc(saved);
    }
  }, []);

  useEffect(() => {
    if (initialType && documentTypes.some((d) => d.id === initialType)) {
      setSelectedDoc(initialType);
      setIsLocked(true);
    }
  }, [initialType]);

  useEffect(() => {
    if (selectedDoc) {
      localStorage.setItem("selectedDoc", selectedDoc);
    }
  }, [selectedDoc]);



  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  // Sync background color with country requirements
  useEffect(() => {
    const spec = documentTypes.find(d => d.id === selectedDoc);
    if (spec?.bg_color && bgColors.some(b => b.id === spec.bg_color)) {
      setSelectedBg(spec.bg_color as string);
    }
  }, [selectedDoc]);

  const activeDoc = documentTypes.find((d) => d.id === selectedDoc) || documentTypes[4];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg("");
    const compressed = await compressImage(file);
    setSelectedFile(compressed);

    // Automatically trigger external process
    await handleExternalProcess(compressed);
  };

  const handleExternalProcess = async (file: File) => {
    setIsUploading(true);
    setErrorMsg("");
    setCropMsg("Processing Your Photo...");

    // Better country/doc type extraction
    const countrySlug = activeDoc.id.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
    let countryCode = countryMapping[countrySlug] || "US";

    // Handle special cases for country mapping
    if (activeDoc.id.includes("ds-160")) countryCode = "US";
    if (activeDoc.id.includes("schengen")) countryCode = "EU";
    if (activeDoc.id.startsWith("france-")) countryCode = "FR";

    const documentType = activeDoc.id.includes("visa") ? "visa" : "passport";

    const formData = new FormData();
    formData.append("image", file);
    formData.append("country_code", countryCode);
    formData.append("document_type", documentType);
    formData.append("full_doc_id", activeDoc.id);
    formData.append("source", "pixpassvisa_tool"); // Add extra key

    try {
      const res = await fetch("/api/external-process", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

      setCropMsg("Redirecting to your photo...");
      await new Promise(r => setTimeout(r, 800));
      router.push(`/preview/${data.photoId}`);
    } catch (err: any) {
      setErrorMsg(err.message || "Processing failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setErrorMsg("");
  };



  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto px-3 lg:px-0 pb-6 relative w-full">
      <div className="flex flex-col lg:min-h-[calc(100vh-200px)] gap-4">





        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-100 border border-white rounded-2xl p-3 lg:p-5 overflow-y-auto">

          {/* Selected Document Header — clickable to change */}
          <div className="mb-3 relative" ref={headerSelectorRef}>
         
            <button
              type="button"
              onClick={() => setHeaderSelectorOpen((v) => !v)}
              className={`w-full flex items-center justify-between bg-white/60 backdrop-blur-sm px-3 py-2.5 rounded-xl border shadow-sm cursor-pointer transition-all duration-200 ${headerSelectorOpen
                ? "border-blue-400 ring-1 ring-blue-500/20"
                : "border-white hover:border-green-400"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-inner border border-slate-100 text-lg">
                  {activeDoc.flag}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Active Requirement</span>
                  <h2 className="text-xs font-black text-slate-900 leading-none">{activeDoc.label}</h2>
                </div>
              </div>
              <div className="flex items-center gap-4">
             
                <svg
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${headerSelectorOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {headerSelectorOpen && (
              <>
                {/* Mobile Backdrop */}
                <div
                  className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
                  onClick={() => setHeaderSelectorOpen(false)}
                />

                {/* Dropdown Container */}
                <div className="fixed inset-x-4 top-20 bottom-4 lg:absolute lg:inset-x-0 lg:top-full lg:bottom-auto z-[70] lg:z-50 lg:mt-1 bg-white border border-slate-200 rounded-2xl lg:rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-3 lg:p-2 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        ref={headerSearchRef}
                        type="text"
                        placeholder="Search country or document type…"
                        value={headerSearchTerm}
                        onChange={(e) => setHeaderSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 lg:py-2 text-sm lg:text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                      />
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
                        <button
                          key={doc.id}
                          onClick={() => {
                            setSelectedDoc(doc.id);
                            handleReset();
                            setHeaderSelectorOpen(false);
                            setHeaderSearchTerm("");
                          }}
                          className={`relative group w-full flex flex-col px-4 py-4 lg:px-3 lg:py-2.5 text-left transition-all duration-150 border-b border-slate-50 last:border-b-0 ${selectedDoc === doc.id ? "bg-blue-50" : "bg-transparent hover:bg-slate-50"
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {doc.flag && <span className="text-xl lg:text-sm leading-none">{doc.flag}</span>}
                              <p className={`text-sm lg:text-xs font-bold leading-tight ${selectedDoc === doc.id ? "text-blue-900" : "text-slate-600"}`}>{doc.label}</p>
                            </div>
                            {selectedDoc === doc.id && (
                              <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                          </div>
                          <p className="text-[11px] lg:text-[10px] text-slate-400 mt-1 font-medium ml-8 lg:ml-6">{doc.size} · {doc.bg_color} bg</p>
                        </button>
                      ))
                    ) : (
                      <div className="py-12 px-6 text-center">
                        <p className="text-sm lg:text-xs text-slate-400 font-medium">No documents found</p>
                        <button onClick={() => setHeaderSearchTerm("")} className="text-xs lg:text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-3 hover:text-blue-700">Clear Search</button>
                      </div>
                    )}
                  </nav>
                </div>
              </>
            )}
          </div>
        
          {/* Initial State: Upload Area */}
          {!selectedFile && (
            <UploadArea
              onFileChange={handleFileChange}
              guidelinesOpen={guidelinesOpen}
              setGuidelinesOpen={setGuidelinesOpen}
              onShowGuide={() => setShowGuide(true)}
            />
          )}

          {/* Advanced Inline Processing State */}
          {isUploading && (
            <div className="mt-4 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                {/* Photo with Scanning Animation */}
                <div className="relative shrink-0 w-32 h-40 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Processing" className="w-full h-full object-cover opacity-60" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <svg width="40" height="50" viewBox="0 0 80 100" fill="none">
                        <circle cx="40" cy="28" r="18" fill="#6366f1" />
                        <path d="M10 90 Q10 62 40 62 Q70 62 70 90" fill="#6366f1" />
                      </svg>
                    </div>
                  )}
                  {/* Scan line */}
                  <div
                    className="absolute left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-10"
                    style={{ animation: 'scanPingPong 2s ease-in-out infinite' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
                </div>

                {/* Status Messages */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Official Biometric Engine</span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-2">
                    <span className="inline-block" style={{ minWidth: '200px' }}>
                      {cropMsg === "Processing Your Photo..." ? (
                        <ProcessingText />
                      ) : (
                        cropMsg
                      )}
                    </span>
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto sm:mx-0">
                    Calibrating head size, fixing background lighting, and verifying ICAO biometric standards.
                  </p>

                  {/* Tiny progress bar */}
                  <div className="mt-4 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full animate-shimmer" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>

              <style>{`
                @keyframes scanPingPong {
                  0%, 100% { top: 0%; opacity: 0; }
                  10%, 90% { opacity: 1; }
                  50% { top: 100%; }
                }
                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
                .animate-shimmer {
                  animation: shimmer 2s infinite linear;
                  background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%);
                  background-size: 200% 100%;
                }
              `}</style>
            </div>
          )}



          {/* error messaging */}
          {errorMsg && (
            <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
              <WarnIcon className="w-5 h-5 text-red-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-red-900">Validation Error</p>
                <p className="text-[11px] text-red-700 mt-0.5">{errorMsg}</p>
                <button onClick={handleReset} className="mt-2 text-[10px] font-black uppercase tracking-tighter text-red-600 hover:text-red-800 underline">Start Over</button>
              </div>
            </div>
          )}

          {/* Guide Prompt Modal */}
          <GuidePrompt
            isOpen={showGuide}
            onClose={() => setShowGuide(false)}
            onUploadClick={() => {
              const input = document.getElementById("tool-photo-input");
              if (input) (input as HTMLInputElement).click();
              setShowGuide(false);
            }}
          />

        </div>
      </div>
    </div>
  );
}

export default function ToolPage() {
  return (
    <div className="bg-slate-50 min-h-screen ">
      <div className="max-w-xl mx-auto px-4 pt-2 sm:pt-2 text-center">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Passport size photo maker  & Visa Photo maker
        </h1>
        <h2 className="mt-1.5 text-sm text-slate-500 font-normal">
          Free visa photo Validator & Maker for 50+ Countries
        </h2>
      </div>
      <div className="py-4">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <ToolForm />
        </Suspense>
      </div>
    </div>
  );
}