"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import Image from "next/image";

const ukDocuments = [
  { id: "uk-seamans-card", label: "British Seaman's card 35x45 mm", size: "35 × 45 mm" },
  { id: "uk-seamans-discharge", label: "British Seaman's discharge book 35x45 mm", size: "35 × 45 mm" },
  { id: "uk-london-freedom", label: "London Freedom pass 35x45 mm", size: "35 × 45 mm" },
  { id: "uk-oyster", label: "Oyster travel photocard", size: "Digital upload" },
  { id: "uk-basc", label: "UK BASC Firearms / Shotgun Licensing 35x45 mm", size: "35 × 45 mm" },
  { id: "uk-bno", label: "UK BNO passport", size: "35 × 45 mm" },
  { id: "uk-boat", label: "UK Boat licence 35x45 mm", size: "35 × 45 mm" },
  { id: "uk-bus", label: "UK Bus pass online form", size: "Digital upload" },
  { id: "uk-driving", label: "UK Driving Licence 35x45 mm (3.5x4.5 cm)", size: "35 × 45 mm" },
  { id: "uk-id", label: "UK ID / residence card 45x35 mm cm)", size: "35 × 45 mm" },
  { id: "uk-leisure", label: "UK Leisure pass 35x45 mm", size: "35 × 45 mm" },
  { id: "uk-passport-offline", label: "UK Passport offline 35x45 mm (3.5x4.5 cm)", size: "35 × 45 mm" },
  { id: "uk-passport-online", label: "UK Passport online", size: "Digital upload" },
  { id: "uk-railcard", label: "UK Railcard 35x45 mm", size: "35 × 45 mm" },
  { id: "uk-school", label: "UK School card 35x45 mm", size: "35 × 45 mm" },
];

const faqs = [
  {
    q: "What size does a UK passport photo need to be?",
    a: "A UK passport photo must be 35mm wide and 45mm tall, with your face centred and taking up 29-34mm from chin to crown. Our tool crops and sizes your upload to this exact spec automatically.",
  },
  {
    q: "Can I use the same photo for my driving licence and my passport?",
    a: "Yes. The UK driving licence photo uses the same 35 x 45mm format as the passport, so one compliant photo works for both, as long as the background and pose meet each document's rules.",
  },
  {
    q: "Do I need a printed photo for the Oyster card or bus pass?",
    a: "No. Oyster photocards and most bus pass applications accept a digital photo upload through the online form, so you only need a correctly cropped image file rather than a physical print.",
  },
  {
    q: "Will a photo taken on my phone be accepted?",
    a: "Yes, provided the lighting is even, the background is plain, and your expression is neutral. Our tool checks framing and resizes the image, so a well-lit phone photo is usually enough.",
  },
  {
    q: "How long does it take to get my photo?",
    a: "Processing takes under a minute. Upload your photo, choose your document, and download or print your compliant image straight away.",
  },
  {
    q: "Can I apply the same photo to more than one document?",
    a: "Yes. Upload one photo, then switch the document type at the top of the page to generate a new crop for each application, so you don't need to photograph yourself again for every form.",
  },
  {
    q: "What background do UK documents require?",
    a: "Almost every UK document on this list asks for a plain, light-coloured background with no patterns, shadows, or other people visible. Our tool flags backgrounds that are too busy or too dark before you download the photo.",
  },
];

export default function UKDocumentClient() {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState(ukDocuments[12].id); // Default to online passport
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

  const filteredDocs = ukDocuments.filter((doc) =>
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
      formData.append("country_code", "GB"); // GB for UK
      formData.append(
        "document_type",
        selectedDoc.includes("visa") ? "visa" : "passport"
      );
      formData.append("source", "uk_document_maker");

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

      router.push(`/preview/${data.photoId}?from=uk-passport`);
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

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          UK Passport Size ID Photo Maker 
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Create a compliant photo for any United Kingdom government ID passport size photo — passports, driving licences, railcards, and more — in under a minute.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-8 sm:p-10">
            {/* Step 1: Select Document */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-3 text-sm">
                  1
                </span>
                Select United kingdom government photo type
              </h2>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-medium cursor-pointer hover:border-slate-400 flex items-center justify-between text-left"
                >
                  <span className="truncate pr-4">
                    {ukDocuments.find((d) => d.id === selectedDoc)?.label}{" "}
                    {ukDocuments.find((d) => d.id === selectedDoc)?.size ? `(${ukDocuments.find((d) => d.id === selectedDoc)?.size})` : ""}
                  </span>
                  <svg className={`w-5 h-5 shrink-0 text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                      <div className="relative">
                        <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search documents..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          autoFocus
                        />
                      </div>
                    </div>
                    <ul className="max-h-64 overflow-auto py-2 scrollbar-thin scrollbar-thumb-slate-200">
                      {filteredDocs.length > 0 ? (
                        filteredDocs.map((doc) => (
                          <li
                            key={doc.id}
                            onClick={() => {
                              setSelectedDoc(doc.id);
                              setIsDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className={`px-4 py-3 cursor-pointer text-sm transition-colors
                              ${selectedDoc === doc.id ? "bg-blue-50/70 text-blue-900 font-medium" : "text-slate-700 hover:bg-slate-50"}
                            `}
                          >
                            {doc.label} {doc.size && <span className="text-slate-400 ml-1">({doc.size})</span>}
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

            {/* Step 2: Upload Photo */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold mr-3 text-sm">
                  2
                </span>
                Upload your photo
              </h2>

              {!selectedFile ? (
                <div
                  className={`relative rounded-xl border-2 border-dashed p-12 text-center cursor-pointer
                    ${dragOver ? "border-blue-600 bg-blue-50/70" : "border-slate-300 hover:border-blue-500"}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/webp,image/heic"
                    className="hidden"
                  />
                  <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Drag & drop your potrait photo</h3>
                  <p className="text-sm text-slate-500 mb-6">Or click to browse from your device</p>
                  <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                    Select image
                  </button>
                </div>
              ) : (
                <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-32 h-40 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                      {previewUrl && (
                        <Image
                          src={previewUrl}
                          alt="Selected photo"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-medium text-slate-900 mb-1 line-clamp-1">{selectedFile.name}</h4>
                      <p className="text-sm text-slate-500 mb-4">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        onClick={clearSelection}
                        className="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center justify-center sm:justify-start gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove photo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-rose-800">Processing failed</h4>
                  <p className="text-sm text-rose-600 mt-1">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Step 3: Process */}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={processFile}
                disabled={!selectedFile || isProcessing}
                className={`w-full py-4 px-6 rounded-xl text-lg font-bold flex items-center justify-center gap-2
                  ${!selectedFile
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : isProcessing
                      ? "bg-blue-600 text-white cursor-wait"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                `}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* SEO CONTENT SECTION                                         */}
        {/* ---------------------------------------------------------- */}
        <article className="mt-16 prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-700">
          <h2 className="text-2xl font-semibold text-slate-900 mt-0">
            UK passport and document photos, sized right the first time
          </h2>
          
          <figure className="my-8 rounded-xl overflow-hidden  border border-slate-200">
            {/* HERO IMAGE */}
            <picture>
              <source type="image/webp" srcSet="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp" />
              <img 
                src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp" 
                alt="Collage of compliant UK passport, driving licence, and ID card photos" 
                width={800} 
                height={400} 
                className="w-full h-auto object-cover m-0"
                loading="eager"
              />
            </picture>
            <figcaption className="text-sm text-center text-slate-500 mt-2 px-4 pb-2">
              Generate compliant photos for all official UK documents instantly.
            </figcaption>
          </figure>

          <p className="text-slate-700 leading-relaxed">
            Every official document in the United Kingdom that carries a photo has its own size, background, and pose rules. Get one detail wrong and <a href="https://www.gov.uk/government/organisations/hm-passport-office" target="_blank" rel="noopener noreferrer">HMPO</a>, the <a href="https://www.gov.uk/government/organisations/driver-and-vehicle-licensing-agency" target="_blank" rel="noopener noreferrer">DVLA</a>, or your local council can reject the application outright, costing you the fee and another trip to a photo booth. This tool builds a compliant photo for fifteen UK documents from a single upload, so you crop, check, and download once instead of guessing at a printer.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Why the photo trips up so many applications</h2>
          <p className="text-slate-700 leading-relaxed">
            Photo booths are built for one shot, not for fifteen different documents. A background that passes for a passport photo can be too dark for a driving licence, and a crop that suits a printed 35 × 45mm card is the wrong shape for a digital Oyster upload. Each UK issuer, <a href="https://www.gov.uk/photos-for-passports" target="_blank" rel="noopener noreferrer">HMPO</a>, the <a href="https://www.gov.uk/renew-driving-licence" target="_blank" rel="noopener noreferrer">DVLA</a>, Transport for London, local councils, and the police, checks the photo before it looks at anything else in an application. Getting that one detail wrong is the single most common reason a first attempt bounces back, so it pays to solve it before you submit anything.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Every UK document we support</h2>
          <p className="text-slate-700 leading-relaxed">
            Most UK identity and travel documents share the same 35 × 45mm photo format, the same size HMPO uses for the passport. A handful, like the Oyster photocard, the bus pass, and the online passport application, only need a digital upload rather than a print. The table below covers everything you can create here.
          </p>
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="p-3 font-semibold text-slate-900 border-b border-slate-200">Document</th>
                  <th className="p-3 font-semibold text-slate-900 border-b border-slate-200">Photo format</th>
                </tr>
              </thead>
              <tbody>
                {ukDocuments.map((doc, i) => (
                  <tr key={doc.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{doc.label.replace(/\s*35x45.*$/i, "").replace(/\s*45x35.*$/i, "")}</td>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{doc.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900">UK passport photos: online and offline</h2>
          <p className="text-slate-700 leading-relaxed">
            HMPO runs two application routes, and each expects a different file. The <strong>online passport</strong> service uploads a digital photo directly into your application, so it checks lighting, framing, and background as a JPEG. The <strong>offline passport</strong> route, used for paper applications and renewals by post, needs a printed 35 × 45mm photo signed by a countersignatory on the back. Our tool produces both: a print-ready file for the paper form, and a correctly cropped digital file for the online portal, from the same source photo.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Driving licence, ID cards, and BNO passports</h2>
          <p className="text-slate-700 leading-relaxed">
            A <strong>UK driving licence</strong> photo follows the same 35 × 45mm spec as the passport, which is why one good photo can usually serve both applications. The same format covers the <strong>UK BNO passport</strong> for British National (Overseas) status holders, and the <strong>UK ID or residence card</strong>, where a plain background and neutral expression matter as much as the crop itself. Uniforms, sunglasses, and heavy shadows are the most common reasons these get sent back, so the tool checks for a plain backdrop and even lighting before it exports your image.
          </p>
          
          <figure className="my-8 rounded-xl overflow-hidden  border border-slate-200">
            {/* IN-CONTENT IMAGE 1 */}
            <picture>
              <source type="image/webp" srcSet="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690632/uk-driving-licence-example_wk6h56.webp" />
              <img 
                src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690632/uk-driving-licence-example_wk6h56.webp" 
                alt="Correct photo specifications for a UK driving licence and BNO passport" 
                width={800} 
                height={400} 
                className="w-full h-auto object-cover m-0"
                loading="lazy"
              />
            </picture>
            <figcaption className="text-sm text-center text-slate-500 mt-2 px-4 pb-2">
              A compliant UK driving licence photo using standard 35 × 45mm framing.
            </figcaption>
          </figure>

          <h2 className="text-2xl font-semibold text-slate-900">Travelcards and passes: Oyster, Freedom, and Railcard</h2>
          <p className="text-slate-700 leading-relaxed">
            London's <strong>Oyster travel photocard</strong> and the <strong>Bus pass online form</strong> both take a digital upload rather than a printed photo, which makes framing the single thing that trips people up. The <strong>London Freedom pass</strong>, offered to older and disabled residents for free travel, uses the standard 35 × 45mm crop, as does the <strong>UK Railcard</strong>, needed for discounted rail fares, and the <strong>UK Leisure pass</strong>, issued by local councils for subsidised access to sports and leisure centres. Upload once, pick the pass you need, and the crop adjusts automatically.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Firearms, boat, and seaman's documents</h2>
          <p className="text-slate-700 leading-relaxed">
            Specialist licences are held to the same photo standard as a passport, and they're just as easy to get rejected. <strong>UK BASC firearms and shotgun licensing</strong> photos go to the police alongside your certificate application, so the pose and background rules are strict. A <strong>UK boat licence</strong> photo, required for some inland waterway and coastal licences, follows the same 35 × 45mm rule. Mariners applying for a <strong>British Seaman's card</strong> or a <strong>British Seaman's discharge book</strong> need a photo that meets Merchant Navy identification standards, which again map to the standard passport crop.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">School cards and other everyday documents</h2>
          <p className="text-slate-700 leading-relaxed">
            Not every UK document is a government form. A <strong>UK school card</strong>, used for identification, library access, or discounted entry, still asks for a clean 35 × 45mm photo so it prints clearly on the card stock schools use. The same principles apply here as everywhere else on this list: plain background, even lighting, and a neutral expression looking straight at the camera.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">Common mistakes that get UK photos rejected</h2>
          <ul className="text-slate-700 leading-relaxed list-disc pl-5 space-y-2">
            <li><strong>Busy or shadowed backgrounds.</strong> HMPO and the DVLA both want a plain, light-coloured background with no visible texture, furniture, or shadow behind the head.</li>
            <li><strong>Wrong file size or shape.</strong> A photo cropped for a passport at 35 × 45mm is the wrong ratio for a digital Oyster or bus pass upload, which expects a different aspect and file size.</li>
            <li><strong>Head too small or too large in the frame.</strong> HMPO expects the face to fill roughly 29-34mm of the 45mm height; too far back or too close and the photo is rejected on framing alone.</li>
            <li><strong>Glasses, hats, or heavy makeup.</strong> Tinted glasses, headwear without a religious or medical reason, and heavy shadowing across the face are among the most common reasons UK photo ID gets sent back.</li>
            <li><strong>Old photos reused across documents.</strong> A photo older than a few months, or one already used on an existing document, is often rejected for a fresh application, even if it still looks like you.</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            Our tool checks framing, background, and proportions against the rules for whichever document you select, so these issues get caught before you download the photo, not after your application has already been submitted and rejected.
          </p>
          
          <figure className="my-8 rounded-xl overflow-hidden  border border-slate-200">
            {/* IN-CONTENT IMAGE 2 */}
            <picture>
              <source type="image/webp" srcSet="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690775/uk-photo-mistakes_g0kywo.webp" />
              <img 
                src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690775/uk-photo-mistakes_g0kywo.webp" 
                alt="Examples of common mistakes in UK passport photos including bad lighting, shadows, and improper cropping" 
                width={800} 
                height={400} 
                className="w-full h-auto object-cover m-0"
                loading="lazy"
              />
            </picture>
            <figcaption className="text-sm text-center text-slate-500 mt-2 px-4 pb-2">
              Common rejection reasons: busy backgrounds, uneven lighting, and incorrect cropping.
            </figcaption>
          </figure>

          <h2 className="text-2xl font-semibold text-slate-900">A faster alternative to the photo booth</h2>
          <p className="text-slate-700 leading-relaxed">
            A high-street photo booth or chemist typically prints one fixed format, charges per visit, and can't adjust the crop if you decide to apply for a second document later. Uploading a photo here instead means you keep one source image and generate a compliant version for any of the fifteen UK documents above, at any time, without a second trip out. It also removes the guesswork around lighting and background that causes most booth photos to fail on a first submission.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900">How the photo maker works</h2>
          <ol className="text-slate-700 leading-relaxed list-decimal pl-5 space-y-2">
            <li><strong>Pick your document.</strong> Choose from all fifteen UK document types above, from passports to railcards.</li>
            <li><strong>Upload one photo.</strong> Drag in a phone photo or a webcam shot; no studio setup needed.</li>
            <li><strong>Download or print.</strong> The tool crops, sizes, and checks your photo against the document's rules in under a minute.</li>
          </ol>

          <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
          <div className="not-prose divide-y divide-slate-200 border-t border-b border-slate-200 my-6">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
                  {f.q}
                  <span className="ml-4 text-blue-700 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-slate-900">Get your photo right, first time</h2>
          <p className="text-slate-700 leading-relaxed">
            Whichever UK document you're applying for, the photo rules exist to keep identification consistent, not to slow you down. Choose your document type above, upload a photo, and let the tool handle the crop, size, and background check, so your application moves forward on the first try.
          </p>
        </article>
      </div>
    </div>
  );
}