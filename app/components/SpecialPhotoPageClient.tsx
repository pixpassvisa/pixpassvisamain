"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { compressImage } from "@/lib/compressImage";
import Image from "next/image";
import { Check } from "lucide-react";

interface DocumentItem {
  id: string;
  label: string;
  size: string;
  type: string;
}

interface FAQItem {
  q: string;
  a: string;
}

export interface SpecialPhotoPageProps {
  countryCode: string;
  heroTitle: string;
  heroSubtitle: string;
  documents: DocumentItem[];
  contentHtml: string;
  faqs: FAQItem[];
}

const TRUST_ITEMS = [
  { tag: "01", title: "Privacy first", desc: "Photos never stored on our servers" },
  { tag: "02", title: "ICAO compliant", desc: "Meets 9303 biometric standards" },
  { tag: "03", title: "Instant result", desc: "AI processing in under 10 seconds" },
  { tag: "04", title: "Free preview", desc: "Check before you pay anything" },
];

export default function SpecialPhotoPageClient({
  countryCode,
  heroTitle,
  heroSubtitle,
  documents,
  contentHtml,
  faqs,
}: SpecialPhotoPageProps) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(documents[0]?.id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const filteredDocs = documents.filter((doc) =>
    doc.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const processFile = async () => {
    if (!selectedFile) return;
    setErrorMsg("");
    setIsProcessing(true);

    try {
      const compressed = await compressImage(selectedFile);
      const doc = documents.find((d) => d.id === selectedDoc);

      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", countryCode);
      formData.append("document_type", doc?.type || "passport");
      formData.append("source", "special-photo-page");

      const res = await fetch("/api/external-process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Processing failed");

      const photoRes = await fetch(`/api/photo/${data.photoId}`);
      const photoResult = await photoRes.json();
      if (!photoRes.ok || !photoResult.success) {
        throw new Error("Failed to load generated photo details.");
      }

      router.push(`/preview/${data.photoId}?from=special-photo-page`);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setSelectedFile(file);
      setErrorMsg("");
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const activeDoc = documents.find((d) => d.id === selectedDoc);

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      {/* Breadcrumb strip */}
      <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
            <li><a href="/" className="hover:text-blue-700">Home</a></li>
            <li aria-hidden>/</li>
            <li className="text-slate-900 font-semibold" aria-current="page">{countryCode}</li>
          </ol>
        </nav>
      </div>

      {/* Hero + Form: single column on mobile, two columns from lg up */}
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-5 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-0 rounded-2xl border border-slate-200 overflow-hidden">
          {/* LEFT — heading + document select + submit */}
          <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col">
            <span className="inline-flex w-fit items-center text-xs uppercase tracking-widest text-blue-800 bg-blue-100 rounded-full px-3 py-1 mb-3 sm:mb-4">
              Photo · {countryCode}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight leading-[1.1]">
              {heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 lg:mb-10">
              {heroSubtitle}
            </p>

            {/* Field 01 — document type */}
            <div className="mb-2 sm:mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center bg-blue-600 text-white shrink-0">
                  01
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Photo type
                </h2>
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  className={`w-full bg-white border rounded-xl text-slate-900 py-3 px-4 transition-colors font-medium cursor-pointer flex items-center justify-between text-left
                    ${isDropdownOpen ? "border-blue-600 ring-2 ring-blue-500" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <span className="truncate pr-4 text-sm">
                    {activeDoc?.label} {activeDoc?.size ? `(${activeDoc.size})` : ""}
                  </span>
                  <svg
                    className={`w-4 h-4 shrink-0 text-blue-700 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-slate-200 rounded-xl max-h-[60vh] sm:max-h-80 overflow-hidden flex flex-col shadow-lg">
                    <div className="p-3 border-b border-slate-100 bg-slate-50">
                      <div className="relative">
                        <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search documents..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    </div>
                    <ul className="overflow-auto py-1.5 px-1.5" role="listbox">
                      {filteredDocs.length > 0 ? (
                        filteredDocs.map((doc) => (
                          <li
                            key={doc.id}
                            role="option"
                            aria-selected={selectedDoc === doc.id}
                            onClick={() => {
                              setSelectedDoc(doc.id);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className={`px-3.5 py-3 rounded-lg cursor-pointer text-sm transition-colors border-l-[3px]
                              ${selectedDoc === doc.id
                                ? "bg-blue-50/70 border-l-blue-600 text-blue-900 font-semibold"
                                : "border-l-transparent text-slate-700 hover:bg-slate-50 hover:border-l-slate-200"}`}
                          >
                            {doc.label} {doc.size && <span className={selectedDoc === doc.id ? "text-blue-600" : "text-slate-400 ml-1"}>({doc.size})</span>}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-6 text-sm text-slate-500 text-center">No documents found</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {errorMsg && (
              <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3" role="alert">
                <svg className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-rose-700 uppercase tracking-wide">Processing failed</h4>
                  <p className="text-sm text-rose-600 mt-1">{errorMsg}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — upload & submit */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 bg-slate-50 border-t border-slate-200 lg:border-t-0 lg:border-l flex flex-col">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className={`text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 ${selectedFile ? "bg-blue-600" : "bg-slate-900"}`}>
                {selectedFile ? <Check className="w-4 h-4" /> : "02"}
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                Upload your photo
              </h2>
            </div>

            {!selectedFile ? (
              <div
                className={`relative flex-1 min-h-[200px] sm:min-h-[260px] rounded-xl border-2 border-dashed p-6 sm:p-8 lg:p-12 text-center cursor-pointer transition-colors flex flex-col items-center justify-center
                  ${dragOver ? "border-blue-600 bg-blue-50/70" : "border-slate-300 hover:border-blue-400 bg-white"}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload your photo"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  className="hidden"
                />
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-1.5 sm:mb-2 px-2">Drag and drop your portrait photo</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">JPG · PNG · WEBP · HEIC</p>
                <button className="px-5 sm:px-6 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
                  Select image
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col xs:flex-row sm:flex-row items-center gap-5 sm:gap-8 bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
                {/* Preview with crop-guide corner marks */}
                <div className="relative w-28 h-36 sm:w-36 sm:h-44 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  {previewUrl && (
                    <Image src={previewUrl} alt="Selected photo" fill className="object-cover" />
                  )}
                  {/* crop marks */}
                  <span className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-blue-500" />
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-blue-500" />
                  <span className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-blue-500" />
                  <span className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-blue-500" />
                </div>
                <div className="flex-1 w-full text-center sm:text-left min-w-0">
                  <h4 className="font-medium text-slate-900 mb-1 line-clamp-1 break-all">{selectedFile.name}</h4>
                  <p className="text-sm text-slate-500 mb-4">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm font-medium text-slate-900 rounded-lg border border-slate-300 px-4 py-2 hover:border-slate-900 transition-colors"
                    >
                      Replace photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      className="hidden"
                    />
                    <button
                      onClick={clearSelection}
                      className="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center justify-center sm:justify-start gap-1.5"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 03 — submit (desktop only, mobile uses sticky bar below) */}
            <div className="mt-6 pt-6 border-t border-slate-200 hidden lg:block">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center bg-slate-900 text-white shrink-0">
                  03
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Submit
                </h2>
              </div>
              <button
                onClick={processFile}
                disabled={!selectedFile || isProcessing}
                className={`w-full py-4 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-colors
                  ${!selectedFile
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : isProcessing
                    ? "bg-blue-600 text-white cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing photo...
                  </>
                ) : (
                  <>
                    Proceed to verification
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">
                Free to preview · pay only to download or print
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-slate-200 p-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={processFile}
          disabled={!selectedFile || isProcessing}
          className={`w-full py-3.5 px-6 rounded-xl text-base font-bold flex items-center justify-center gap-2
            ${!selectedFile ? "bg-slate-100 text-slate-400" : "bg-blue-600 text-white"}`}
        >
          {isProcessing ? "Processing..." : "Proceed to verification"}
        </button>
      </div>

      {/* Trust strip — flat, colorful, no shadow */}
      <div className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200">
            {TRUST_ITEMS.map(({ tag, title, desc }, i) => (
              <div
                key={title}
                className={`py-5 sm:py-6 px-3 sm:px-6 ${i >= 2 ? "border-t border-slate-200 sm:border-t-0" : ""}`}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-2 sm:mb-3">
                  {tag}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">{title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-snug hidden sm:block">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rich Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <article className="rich-content">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* Section: FAQ */}
          {faqs && faqs.length > 0 && (
            <div className="mt-10 sm:mt-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-5 sm:mb-6 pb-3 border-b-2 border-blue-500">
                Frequently asked questions
              </h2>
              <div>
                {faqs.map((item) => (
                  <details key={item.q} className="group border-b border-slate-200 last:border-b-0">
                    <summary className="p-4 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4 hover:bg-blue-50/70 transition-colors">
                      <span className="text-sm sm:text-base">{item.q}</span>
                      <svg
                        className="w-4 h-4 shrink-0 text-blue-700 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 text-sm sm:text-base text-slate-600 bg-slate-50 border-t border-slate-200">
                      <p>{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
          {/* Section: Related Sizing Tools */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6">
              Popular Sizing & Photo Checker Tools
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              <Link href="/us-passport-photo-editor" className="text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 p-3 rounded-xl border border-slate-200 transition-colors block text-center">
                US Passport Photo Editor
              </Link>
              <Link href="/us-visa-photo-editor" className="text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 p-3 rounded-xl border border-slate-200 transition-colors block text-center">
                US Visa Photo Editor
              </Link>
              <Link href="/indian-passport-size-photograph" className="text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 p-3 rounded-xl border border-slate-200 transition-colors block text-center">
                India ICAO Standard Photo
              </Link>
              <Link href="/ca" className="text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 p-3 rounded-xl border border-slate-200 transition-colors block text-center">
                Canada Visa Size Photo
              </Link>
              <Link href="/uk-passport-photo-checker-online-free" className="text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 p-3 rounded-xl border border-slate-200 transition-colors block text-center">
                UK Photo Checker
              </Link>
              <Link href="/digital-visa-photo-specs-2026" className="text-xs font-semibold text-slate-700 hover:text-blue-700 bg-slate-50 p-3 rounded-xl border border-slate-200 transition-colors block text-center">
                Digital Visa Specs 2026
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}