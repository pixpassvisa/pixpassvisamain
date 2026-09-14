"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import Image from "next/image";
import { Check, X } from "lucide-react";

const twoByTwoDocuments = [
  { id: "us-visa", label: "US Visa 2x2 inch (600x600 px, 51x51mm)", size: "2 × 2 inch" },
  { id: "baby-passport", label: "Baby Passport Photo", size: "2 × 2 inch" },
  { id: "cibtvisas", label: "CIBTvisas visa photo (any country)", size: "2 × 2 inch" },
  { id: "cvs", label: "CVS photo", size: "2 × 2 inch" },
  { id: "digital-passport", label: "Digital Passport Photo", size: "Digital upload" },

  { id: "us-citizenship", label: "US Citizenship (naturalization) 2x2 inch (51x51 mm)", size: "2 × 2 inch" },
  { id: "us-dv-lottery", label: "US Electronic Diversity Visa Lottery (600x600 px, 2x2 inches, white bg)", size: "600 × 600 px" },
  { id: "us-employment-auth", label: "US Employment Authorization 2x2 inch (51x51 mm)", size: "2 × 2 inch" },
  { id: "us-green-card", label: "US Green Card (Permanent Resident) 2x2", size: "2 × 2 inch" },
  { id: "us-nfa-atf", label: "US NFA ATF form 2x2 inch", size: "2 × 2 inch" },
  { id: "us-ny-gun-license", label: "US NY Gun License 1.5x1.5 inch", size: "1.5 × 1.5 inch" },
  { id: "us-ny-mta-metrocard", label: "US NY MTA Metrocard for Seniors", size: "2 × 2 inch" },
  { id: "us-passport", label: "US Passport 2x2 inch (51x51 mm)", size: "2 × 2 inch" },
  { id: "us-veteran-id", label: "US Veteran ID Card 2x2 inch", size: "2 × 2 inch" },
  { id: "us-passport-card", label: "US passport card 2x2 inch", size: "2 × 2 inch" },

  { id: "usa-foid", label: "USA FOID 1.25x1.5 inch", size: "1.25 × 1.5 inch" },
  { id: "usa-form-i-130", label: "USA Form I-130 2x2 inch", size: "2 × 2 inch" },
  { id: "usa-nursing-license", label: "USA Nursing License 2x2 inch", size: "2 × 2 inch" },

  { id: "usa-re-entry-permit", label: "USA Re-entry Permit 2x2 inch", size: "2 × 2 inch" },
  { id: "usa-sat", label: "USA SAT 2x2 inch", size: "2 × 2 inch" },
  { id: "usa-advance-parole", label: "USA advance parole 2x2 inch", size: "2 × 2 inch" },
  { id: "usa-bar-examination", label: "USA bar examination 300x300 pixels", size: "300 × 300 px" },
  { id: "usa-crew-visa", label: "USA crew visa 2x2 inch", size: "2 × 2 inch" },
  { id: "usa-welding-cert", label: "USA welding certificate 2x2 inch", size: "2 × 2 inch" },

];

const TRUST_ITEMS = [
  { tag: "01", title: "Privacy first", desc: "Photos never stored on our servers" },
  { tag: "02", title: "ICAO compliant", desc: "Meets 9303 biometric standards" },
  { tag: "03", title: "Instant result", desc: "AI processing in under 10 seconds" },
  { tag: "04", title: "Free preview", desc: "Check before you pay anything" },
];

const FAQ_ITEMS = [
  {
    q: "What is the official America visa size photo?",
    a: "Every US visa application, including the DS-160 online form, requires a photo that is exactly 2 x 2 inches (51 x 51 mm), with your head measuring 1 to 1 3/8 inches from chin to crown. Digital uploads must be 600 x 600 pixels on a plain white or off-white background.",
  },
  {
    q: "Can I reuse my passport photo for my visa application?",
    a: "Yes, in most cases. US passport and US visa photos share the same 2x2 inch specification, so a photo that passes one will usually pass the other. Just confirm the photo is less than six months old before you submit it.",
  },
  {
    q: "Can I wear glasses in a US visa photo?",
    a: "No. The State Department has banned eyeglasses in visa and passport photos since 2016, except with a signed doctor's note confirming a recent eye surgery. Remove glasses, hats, and headphones before you take the shot.",
  },
  {
    q: "How much does a visa photo cost near me?",
    a: "Pharmacies and shipping centers typically charge $10 to $16 per printed photo. Taking your own photo at home and formatting it with our tool costs nothing for the preview, so you only pay if you want a print-ready or digital download.",
  },
  {
    q: "What happens if my visa photo gets rejected at the embassy?",
    a: "A rejected photo delays your interview or online submission until you resubmit a compliant one. Our tool checks size, background, and head position automatically before you download, which removes the most common rejection causes.",
  },
  {
    q: "Is the online america visa photo maker really free?",
    a: "Yes. Uploading, cropping, and previewing your photo costs nothing. You can adjust and reprocess as many times as you need before deciding whether to download or order a print.",
  },
  {
    q: "Is an America visa photo different from a passport photo?",
    a: "The size and composition rules are identical — 2 x 2 inches, plain background, neutral expression. The only real difference is where you submit the file: visa photos usually upload directly into the DS-160 form, while passport photos get mailed with a paper application or handed over at renewal.",
  },
  {
    q: "Can I reuse an old photo for a visa renewal?",
    a: "Only if it was taken within the last six months and your appearance hasn't changed significantly. Major surgery, a large weight change, or new large piercings and tattoos all require a fresh photo, while normal aging or a new haircut do not.",
  },
];

function ImagePlaceholder({
  label,
  hint,
  tone = "neutral",
  src,
}: {
  label: string;
  hint: string;
  tone?: "good" | "bad" | "neutral";
  src?: string;
}) {
  const toneStyles =
    tone === "good"
      ? "border-blue-300 bg-blue-50/70/60"
      : tone === "bad"
      ? "border-rose-200 bg-rose-50/60"
      : "border-slate-300 bg-slate-50";

  const badge =
    tone === "good" ? (
      <span className="absolute top-2 left-2 z-20 flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
        <Check className="w-3 h-3" /> Correct
      </span>
    ) : tone === "bad" ? (
      <span className="absolute top-2 left-2 z-20 flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
        <X className="w-3 h-3" /> Rejected
      </span>
    ) : null;

  return (
    <div className={`relative aspect-square w-full rounded-xl ${src ? 'border-none shadow-sm' : `border-2 border-dashed ${toneStyles}`} flex flex-col items-center justify-end overflow-hidden group`}>
      {badge}
      {src ? (
        <>
          <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
          <div className="relative z-10 p-3 sm:p-4 text-left w-full">
            <p className="text-sm font-semibold text-white leading-tight mb-1">{label}</p>
            <p className="text-[10px] sm:text-[11px] text-slate-200 leading-snug">{hint}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <svg className="w-9 h-9 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
          </svg>
          <p className="text-xs font-semibold text-slate-600">{label}</p>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">{hint}</p>
        </div>
      )}
    </div>
  );
}

export default function AmericaVisaSizePhotoClient() {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(twoByTwoDocuments[0].id); // Default to US Visa
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

  const filteredDocs = twoByTwoDocuments.filter((doc) =>
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

      const formData = new FormData();
      formData.append("image", compressed);
      formData.append("country_code", "US");
      formData.append(
        "document_type",
        selectedDoc.includes("visa") || selectedDoc.includes("lottery") ? "visa" : "passport"
      );
      formData.append("source", "america-visa-size-photo");

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

      router.push(`/preview/${data.photoId}?from=america-visa-size-photo`);
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

  const activeDoc = twoByTwoDocuments.find((d) => d.id === selectedDoc);

  return (
    <div className="min-h-screen bg-white  pb-28 lg:pb-0">
      {/* Breadcrumb strip */}
      <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto">
          <ol className="flex items-center gap-2 text-xs  uppercase tracking-wide text-slate-500">
            <li><a href="/" className="hover:text-blue-700">Home</a></li>
            <li aria-hidden>/</li>
            <li className="text-slate-900 font-semibold" aria-current="page">America Visa Size Photo</li>
          </ol>
        </nav>
      </div>

      {/* Hero + Form: two columns on desktop */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8 lg:py-10">
        <div className="grid lg:grid-cols-12 lg:gap-0 rounded-2xl border border-slate-200">
          {/* LEFT — heading + document select + submit */}
          <div className="lg:col-span-5  p-6 sm:p-8 lg:p-10 flex flex-col rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
            <span className="inline-flex w-fit items-center  text-xs uppercase tracking-widest text-blue-800 bg-blue-100 rounded-full px-3 py-1 mb-4">
              America visa size photo maker
            </span>
            <h1 className="text-2xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight leading-[1.05]">
              America Visa Size Photo Maker: Get a Compliant Photo in Seconds
            </h1>
            <p className="text-md sm:text-md text-slate-600 leading-relaxed mb-7 max-w-lg">
              Upload a portrait photo of yourself and get a properly sized America visa photo 2 × 2 inches, correct head size, and a clean white background ready for your DS-160 or in-person application.
            </p>

            {/* Field 01 — document type */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className=" text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center bg-blue-600 text-white shrink-0">
                  01
                </span>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Select Photo type
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
                  <span className="truncate pr-4  text-sm">
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
                  <div className="absolute z-10 mt-2 w-full bg-white border border-slate-200 rounded-xl max-h-80 overflow-hidden flex flex-col shadow-xl">
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
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm  focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
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
                            className={`px-3.5 py-3 rounded-lg cursor-pointer text-sm  transition-colors border-l-[3px]
                              ${selectedDoc === doc.id
                                ? "bg-blue-50/70 border-l-blue-600 text-blue-900 font-semibold"
                                : "border-l-transparent text-slate-700 hover:bg-slate-50 hover:border-l-slate-200"}`}
                          >
                            {doc.label} {doc.size && <span className={selectedDoc === doc.id ? "text-blue-600" : "text-slate-400 ml-1"}>({doc.size})</span>}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-6 text-sm text-slate-500 text-center ">No documents found</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3" role="alert">
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
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-slate-50 lg:border-l lg:border-slate-200 flex flex-col rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 ${selectedFile ? "bg-blue-600" : "bg-slate-900"}`}>
                {selectedFile ? <Check className="w-4 h-4" /> : "02"}
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                Upload your photo
              </h2>
            </div>

            {!selectedFile ? (
              <div
                className={`relative flex-1 min-h-[260px] rounded-xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-colors flex flex-col items-center justify-center
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
                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Drag and drop your portrait photo</h3>
                <p className="text-sm text-slate-500 mb-6">JPG · PNG · WEBP · HEIC</p>
                <button className="px-6 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
                  Select image
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col sm:flex-row items-center gap-8 bg-white rounded-xl border border-slate-200 p-6">
                {/* Preview with crop-guide corner marks */}
                <div className="relative w-36 h-44 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  {previewUrl && (
                    <Image src={previewUrl} alt="Selected photo" fill className="object-cover" />
                  )}
                  {/* crop marks */}
                  <span className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-blue-500" />
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-blue-500" />
                  <span className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-blue-500" />
                  <span className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-blue-500" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-medium text-slate-900 mb-1 line-clamp-1">{selectedFile.name}</h4>
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

            {/* Step 03 — submit (desktop) */}
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
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-slate-200 p-3">
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
            {TRUST_ITEMS.map(({ tag, title, desc }) => (
              <div key={title} className="py-6 px-4 sm:px-6">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800  text-[11px] font-bold mb-3">
                  {tag}
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-tight">{title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-snug hidden sm:block">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rich Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <article className="text-slate-600 leading-relaxed space-y-16">

          {/* Intro */}
          <div>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Every American visa application lives or dies on one small detail: the photo. Consular officers reject
              a large share of DS-160 submissions because the picture does not match the required{" "}
              <strong className="text-slate-900">America visa size photo</strong> standard — exactly 2 × 2 inches,
              on a plain background, with a neutral expression. Our tool fixes that in under ten seconds.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Upload a portrait photo of yourself, and the AI resizes your photo, centers your head, and replaces the background with
              pure white so it matches the exact American visa photo size the State Department publishes. You skip
              the pharmacy line, the booth fee, and the risk of a second visit because the first print didn't pass.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              This page covers the exact America visa photo size, a step-by-step home photography guide, the
              digital upload specs for the DS-160 form, and the mistakes that cause the most rejections — so you
              can format your photo once and get it right the first time.
            </p>
          </div>

          {/* Section 1: Size */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              What Size Is an America Visa Photo?
            </h2>
            <p className="mb-4">
              The US ds-160 visa photo size is 2 × 2 inches (51 × 51 mm), and it applies to every nonimmigrant and
              immigrant visa category. Your head must measure 1 to 1 3/8 inches from chin to crown, which keeps
              your face between roughly 50% and 69% of the frame. For the online DS-160 form, the digital photo
              needs to be 600 × 600 pixels, saved as a JPEG under 240 KB.
            </p>
            <p className="mb-4">
              This is the same specification used for a US passport photo, a green card photo, and most immigration
              forms, so one correctly sized photo often covers several applications at once.
            </p>
            <p>
              Beyond the raw measurements, the photo also has to satisfy a short checklist: full color with no
              filters, a neutral expression with both eyes open, daily clothing rather than a uniform, and no head
              covering unless you wear one daily for religious reasons. Get any one of these wrong, and the review
              still fails even if the dimensions are perfect.
            </p>
          </div>

          {/* Section 2: Visual examples with placeholders */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              What a Compliant Photo Looks Like for us visa photo maker
            </h2>
            <p className="mb-6">
              Seeing the difference is faster than reading about it. Compare a compliant shot against the most
              common rejection causes before you upload your own photo.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <ImagePlaceholder tone="good" label="Compliant example" hint="Neutral face, white background, correct head size" src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784780191/ds-160-photo-example_zpjrq9.webp" />
              <ImagePlaceholder tone="bad" label="Glasses worn" hint="Eyewear is not accepted, even with light frames" src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784780191/us-visa-photo-glass-worn-example_bblpwa.webp" />
              <ImagePlaceholder tone="bad" label="Shadowed background" hint="Uneven lighting creates a gray or textured backdrop" src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784780191/us-passport-photo-shaddow-example_jcv8bf.webp" />
              <ImagePlaceholder tone="bad" label="Head tilted" hint="Face must point straight at the camera" src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784780191/us-passport-photo-head-tilt_aow5p6.webp" />
              <ImagePlaceholder tone="good" label="Infant example" hint="Baby laid flat on a white sheet, photographed from above" src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784780191/us-children-passport-sizephoto-example_j2zkqa.webp" />
            </div>
          </div>

          {/* Section 3: Step by step */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              How to Take Your Own America Visa Photo at Home
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-bold text-slate-900 mb-2">Set up your background</h3>
                <p className="text-sm text-slate-600">Stand 3–4 feet from a plain white or off-white wall, with soft daylight coming from in front of you.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-bold text-slate-900 mb-2">Take the photo</h3>
                <p className="text-sm text-slate-600">Face the camera directly, keep a neutral expression, and remove glasses, hats, and headphones.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center shadow-sm">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-bold text-slate-900 mb-2">Upload and download</h3>
                <p className="text-sm text-slate-600">Our tool crops, centers, and formats the photo to 2 × 2 inches, then hands you a print-ready or digital file.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Common mistakes */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              Common Reasons America Visa Photos Get Rejected
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  What consular officers expect
                </h3>
                <ul className="space-y-3 text-slate-600 list-none pl-0">
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-blue-600 before:rounded-full">A photo taken within the last six months</li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-blue-600 before:rounded-full">Full color, with no filters or retouching</li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-blue-600 before:rounded-full">Both eyes open and visible, mouth closed</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <span className="bg-rose-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    <X className="w-3.5 h-3.5" />
                  </span>
                  What causes an automatic rejection
                </h3>
                <ul className="space-y-3 text-slate-600 list-none pl-0">
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">Eyeglasses, shadows, or a busy background</li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">A smile, tilted head, or off-center framing</li>
                  <li className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-red-400 before:rounded-full">A photo of a printed photo instead of an original digital file</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: DS-160 digital specs */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              DS-160 Photo Requirements for Digital Upload
            </h2>
            <p className="mb-4">
              If you apply online, the embassy website only accepts a JPEG file that is exactly 600 × 600 pixels
              and under 240 KB. Scanned prints need a resolution of at least 300 pixels per inch. Our tool exports
              a file that already matches these DS-160 photo requirements, so you can upload it straight into your
              application without resizing it yourself.
            </p>
          </div>

          {/* Section 6: Babies */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              America Visa Photos for Infants and Toddlers
            </h2>
            <p className="mb-4">
              Every visa applicant needs a compliant photo, including newborns. Lay your baby on their back on a
              plain white sheet and photograph them from directly above, or drape a white sheet over a car seat and
              shoot from the front. Keep the baby's eyes open, avoid shadows, and make sure no other person or
              object appears in the frame.
            </p>
          </div>

          {/* Section 6b: Cost */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              How Much Does an America Visa Photo Cost?
            </h2>
            <p className="mb-4">
              Pharmacies such as CVS and Walgreens typically charge $10 to $16 for a printed 2 × 2 photo. Shipping
              centers like FedEx and UPS charge a similar amount, and dedicated photo studios often ask $15 to $25
              because they include retouching you don't actually need for a visa photo.
            </p>
            <p>
              Formatting your own photo online removes that cost. Preview and adjust your crop for free, and only
              pay when you're ready to download the digital file or order a print, so you never pay twice for a
              photo that gets rejected.
            </p>
          </div>

          {/* Section 6c: Where to get one */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              Prefer Not to DIY? Where to Get a Visa Photo Near You
            </h2>
            <p className="mb-6">
              If you'd rather not photograph yourself, several everyday stops double as photo counters. Each option
              below understands the America visa size photo standard, so you can walk in and out in minutes.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Pharmacies</h3>
                <p className="text-sm text-slate-600">CVS, Walgreens, and Rite Aid all offer walk-in visa and passport photo counters in most locations.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Shipping centers</h3>
                <p className="text-sm text-slate-600">FedEx Office and UPS Store staff print and format visa photos while you handle other errands.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">Retail stores</h3>
                <p className="text-sm text-slate-600">Photo desks at Walmart and Costco are a budget-friendly option in cities like New York, Chicago, and Los Angeles.</p>
              </div>
            </div>
          </div>

          {/* Section 7: FAQ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="border border-slate-200 rounded-xl overflow-hidden group">
                  <summary className="p-4 bg-slate-50 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4 hover:bg-blue-50/70 transition-colors">
                    <span>{item.q}</span>
                    <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform duration-200 shrink-0">+</span>
                  </summary>
                  <div className="p-4 text-slate-600 bg-white border-t border-slate-100">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}