"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import Image from "next/image";
import { Zap, User, Sparkles, Lock, CheckCircle2, ShieldCheck, Ruler, Palette, Trash2, Camera, AlertTriangle, Check } from "lucide-react";

export const caDocumentsList = [
  { id: "canada-passport", label: "Canada Passport (50 × 70 mm)", size: "50 × 70 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-passport-online", label: "Canada Passport (Digital Upload)", size: "50 × 70 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-visa", label: "Canada Visa (IRCC Portal 35 × 45 mm)", size: "35 × 45 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-pr-card", label: "Canada Permanent Resident (PR) Card", size: "50 × 70 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-citizenship", label: "Canada Citizenship Photo", size: "50 × 70 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-study", label: "Canada Study Permit (IRCC)", size: "35 × 45 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-work", label: "Canada Work Permit (IRCC)", size: "35 × 45 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-super-visa", label: "Canada Super Visa", size: "35 × 45 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-express-entry", label: "Canada Express Entry Digital", size: "35 × 45 mm", bg: "Plain White", head: "31–36 mm" },
  { id: "canada-firearms", label: "Canada PAL Firearms Licence (RCMP)", size: "50 × 70 mm", bg: "Plain White", head: "Centered" },
  { id: "canada-driving", label: "Canada Driving Licence / Provincial ID", size: "50 × 70 mm", bg: "Plain White", head: "Centered" },
];

const STAGES = [
  { label: "Compressing image", icon: <Zap className="w-4 h-4 text-red-600" /> },
  { label: "Biometric analysis for Canada (CA)", icon: <User className="w-4 h-4 text-cyan-600" /> },
  { label: "Generating compliant results", icon: <Sparkles className="w-4 h-4 text-emerald-600" /> },
];

const TRUST = [
  { icon: <Lock className="w-3.5 h-3.5 text-red-600" />, text: "Deleted after 24h" },
  { icon: <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />, text: "30+ checks" },
  { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />, text: "IRCC & Passport Program ready" },
];

interface CAEmbeddedToolProps {
  defaultDoc?: string;
  toolTitle?: string;
  toolSubtitle?: string;
}

export default function CAEmbeddedTool({
  defaultDoc = "canada-passport",
  toolTitle,
  toolSubtitle,
}: CAEmbeddedToolProps) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(defaultDoc);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const filteredDocs = caDocumentsList.filter((doc) =>
    doc.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDocObj = caDocumentsList.find((d) => d.id === selectedDoc) || caDocumentsList[0];

  const processFile = async (fileToProcess?: File) => {
    const file = fileToProcess || selectedFile;
    if (!file) return;

    setErrorMsg("");
    setIsProcessing(true);
    setProcessingStage(0);

    try {
      setProcessingStage(0); // Compressing
      const compressed = await compressImage(file);

      setProcessingStage(1); // External API for CA
      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", "CA"); // Canada / CA
      const isVisaType =
        selectedDoc.includes("visa") ||
        selectedDoc.includes("study") ||
        selectedDoc.includes("work") ||
        selectedDoc.includes("super-visa") ||
        selectedDoc.includes("express-entry");
      formData.append("document_type", isVisaType ? "visa" : "passport");
      formData.append("full_doc_id", selectedDoc);
      formData.append("source", "ca_embedded_tool");

      const res = await fetch("/api/external-process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

      setProcessingStage(2); // Finalizing
      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();

      if (!photoRes.ok || !photoResult.success) {
        throw new Error("Failed to load generated photo details.");
      }

      router.push(`/preview/${data.photoId}?from=ca`);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await processFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setSelectedFile(file);
      await processFile(file);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-3 sm:p-4 bg-slate-50/50">
      {/* Split Grid: Step 1 (Select Document) + Step 2 (Upload Photo) */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        
        {/* STEP 1: Select Document */}
        <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Select Canada Document Type
                </h3>
                <p className="text-xs text-slate-500">
                  Official IRCC or Canadian Passport Program specification
                </p>
              </div>
            </div>

            {/* Custom Searchable Dropdown */}
            <div className="relative mb-5" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border text-left bg-white transition-all ${
                  isDropdownOpen
                    ? "border-red-600 ring-2 ring-red-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl leading-none shrink-0">🇨🇦</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {activeDocObj.label}
                    </p>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                      {activeDocObj.size} · {activeDocObj.bg}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    isDropdownOpen ? "rotate-180 text-red-600" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 z-30 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in duration-150">
                  <div className="p-3 border-b border-slate-100 bg-slate-50">
                    <input
                      type="text"
                      placeholder="Search Canadian documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-300"
                      autoFocus
                    />
                  </div>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-slate-100">
                    {filteredDocs.map((doc) => (
                      <li
                        key={doc.id}
                        onClick={() => {
                          setSelectedDoc(doc.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-4 py-3 cursor-pointer text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                          selectedDoc === doc.id
                            ? "bg-red-50 text-red-900 font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>🇨🇦</span>
                          <span>{doc.label}</span>
                        </div>
                        <span className="text-xs text-slate-400">{doc.size}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Spec Pills */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
                <Ruler className="w-3.5 h-3.5 text-red-600" /> Size: <strong className="text-slate-900">{activeDocObj.size}</strong>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800">
                <Palette className="w-3.5 h-3.5 text-red-600" /> BG: <strong className="text-slate-900">{activeDocObj.bg}</strong>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-900">
                <User className="w-3.5 h-3.5 text-purple-600" /> Head: <strong className="text-slate-900">{activeDocObj.head}</strong>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
            {TRUST.map((t) => (
              <div key={t.text} className="flex items-center gap-1.5 whitespace-nowrap">
                {t.icon}
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 2: Upload Photo & Process */}
        <div className="bg-white rounded-md border border-slate-200 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Upload Your Photo
                </h3>
                <p className="text-xs text-slate-500">
                  JPEG, PNG or WEBP · Max 15 MB
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              className="hidden"
              onChange={handleFileChange}
            />

            {isProcessing ? (
              <div className="rounded-md border-2 border-red-400 bg-slate-50 p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
                  <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Processing preview"
                      className="w-full h-full object-cover rounded-full p-1.5"
                    />
                  )}
                </div>
                <p className="text-base font-bold text-slate-900 mb-1">
                  {STAGES[processingStage]?.label}…
                </p>
                <p className="text-xs text-slate-400 mb-4">
                  Running 30+ Canadian biometric checks against IRCC standards...
                </p>

                <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2 text-left text-xs">
                  {STAGES.map((st, i) => {
                    const isDone = i < processingStage;
                    const isActive = i === processingStage;
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <span className={`font-semibold flex items-center gap-1.5 ${isDone ? "text-emerald-600 line-through" : isActive ? "text-red-700" : "text-slate-400"}`}>
                          {st.icon} {st.label}
                        </span>
                        {isDone && <span className="text-emerald-600 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Done</span>}
                        {isActive && <span className="text-red-600 font-bold animate-pulse">Running…</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : selectedFile ? (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                    {previewUrl && (
                      <Image
                        src={previewUrl}
                        alt="Selected photo"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="mt-2 text-xs font-bold text-rose-600 hover:underline flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Change photo
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`rounded-md border-2 border-dashed p-5 sm:p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-red-600 bg-red-50"
                    : "border-slate-300 bg-slate-50/60 hover:border-red-500 hover:bg-red-50/30"
                }`}
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-md bg-red-100 text-red-700 flex items-center justify-center">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-900 mb-1">
                  Drag &amp; Drop portrait photo here
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Or click to browse from device · Free preview
                </p>
                <button
                  type="button"
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
                >
                  Select Photo for Canada Verification
                </button>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" /> {errorMsg}
            </div>
          )}

          {!isProcessing && selectedFile && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => processFile()}
                className="w-full py-3.5 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Proceed to Canada Verification →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
