"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, ImagePlus, LoaderCircle, ShieldCheck, Upload } from "lucide-react";
import PriceDisplay from "@/app/components/PriceDisplay";
import PhotoPolicyNote from "@/app/components/PhotoPolicyNote";
import { takeCheckerPhoto } from "@/lib/checker-handoff";
import { trackCheckerEvent } from "@/lib/checker-events";
import { compressImage } from "@/lib/compressImage";
import { countryMapping } from "@/lib/external-api";
import { documentTypes } from "./constants";
import styles from "./studio.module.css";

function ToolForm() {
  const router = useRouter();
  const params = useSearchParams();
  const initialType = params.get("type");
  const [docId, setDocId] = useState(documentTypes.find(d => d.id === initialType)?.id || "us-passport");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<"idle" | "reading" | "processing" | "opening">("idle");
  const [dragging, setDragging] = useState(false);
  const [comparison, setComparison] = useState(55);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const generation = useRef(0);
  const handoffRead = useRef(false);
  const activeDoc = documentTypes.find(d => d.id === docId) || documentTypes[0];
  const pending = phase !== "idle";

  useEffect(() => {
    if (initialType && documentTypes.some(d => d.id === initialType)) setDocId(initialType);
  }, [initialType]);
  useEffect(() => {
    if (handoffRead.current) return;
    handoffRead.current = true;
    if (params.get("from") === "checker" && initialType && documentTypes.some(d => d.id === initialType)) {
      const transferred = takeCheckerPhoto(initialType);
      if (transferred) setFile(transferred);
    }
  }, [initialType, params]);
  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  useEffect(() => () => { generation.current++; request.current?.abort(); }, []);

  async function selectPhoto(files: File[]) {
    setDragging(false);
    if (busy.current) return;
    setError("");
    if (files.length !== 1) { setError("Please choose one photo at a time."); return; }
    const photo = files[0];
    if (!/\.(jpe?g|png|webp)$/i.test(photo.name) || (photo.type && !["image/jpeg", "image/png", "image/webp"].includes(photo.type))) {
      setError("Choose a JPG, PNG or WebP image. For HEIC photos, export as JPG first."); return;
    }
    if (!photo.size || photo.size > 20 * 1024 * 1024) { setError("Choose a photo smaller than 20 MB that is not empty."); return; }
    busy.current = true;
    const current = ++generation.current;
    setPhase("reading");
    const url = URL.createObjectURL(photo);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      if (image.naturalWidth < 300 || image.naturalHeight < 300) throw new Error("Choose an original image at least 300 × 300 pixels.");
      const compressed = await compressImage(photo);
      if (compressed.size > 3 * 1024 * 1024) throw new Error("This image is too large to upload. Export a smaller JPG and try again.");
      if (current === generation.current) setFile(compressed);
    } catch (err) {
      if (current === generation.current) setError(err instanceof Error && err.name !== "EncodingError" ? err.message : "We couldn’t read this image. Try exporting it as a new JPG.");
    } finally {
      URL.revokeObjectURL(url);
      if (current === generation.current) { busy.current = false; setPhase("idle"); }
    }
  }

  async function processPhoto() {
    if (!file || busy.current) return;
    busy.current = true;
    setError("");
    setPhase("processing");
    const controller = new AbortController();
    request.current = controller;
    const current = ++generation.current;
    const timeout = setTimeout(() => controller.abort(), 120000);
    const fromChecker = params.get("from") === "checker";
    if (fromChecker) trackCheckerEvent("checker_preview_started");
    let opening = false;
    try {
      const slug = activeDoc.id.replace(/-passport$/, "").replace(/-visa$/, "").toLowerCase();
      let code = countryMapping[slug];
      if (activeDoc.id.includes("ds-160")) code = "US";
      if (activeDoc.id.includes("schengen")) code = "EU";
      if (activeDoc.id.startsWith("france-")) code = "FR";
      if (!code) throw new Error("Please select a supported country and document before continuing.");
      const data = new FormData();
      data.append("image", file);
      data.append("country_code", code);
      data.append("document_type", activeDoc.id.includes("visa") ? "visa" : "passport");
      data.append("full_doc_id", activeDoc.id);
      data.append("source", "pixpassvisa_tool");
      const response = await fetch("/api/external-process", { method: "POST", body: data, signal: controller.signal });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(response.status === 503 ? "Photo processing is temporarily unavailable. Your photo is still here; please try again shortly." : typeof result?.error === "string" ? result.error : "We couldn’t process your photo. Please try again.");
      if (!result?.photoId || typeof result.photoId !== "string") throw new Error("The preview wasn’t returned. Please try again.");
      if (current !== generation.current) return;
      if (fromChecker) trackCheckerEvent("checker_preview_ready");
      opening = true;
      setPhase("opening");
      router.push(`/preview/${encodeURIComponent(result.photoId)}`);
    } catch (err) {
      if (current !== generation.current) return;
      if (fromChecker) trackCheckerEvent("checker_preview_failed");
      setError(controller.signal.aborted ? "Processing took too long. Your photo is still here; please try again." : err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      clearTimeout(timeout);
      if (current === generation.current && !opening) { busy.current = false; setPhase("idle"); }
    }
  }

  return <main className={styles.studio}><div className={styles.shell}>
    <header className={styles.intro}><span className={styles.eyebrow}>● THE PIXPASSVISA PHOTO STUDIO</span><h1>Your next journey.<br /><em>One great photo.</em></h1><p>Passport & visa photos, made simple. Choose your document, add a photo, and preview the result before you pay.</p></header>
    <ol className={styles.steps} aria-label="Photo creation steps">{["Choose & upload", "Preview your photo", "Purchase & download"].map((label, i) => <li key={label} aria-current={i === 0 ? "step" : undefined}><span>{i + 1}</span>{label}</li>)}</ol>
    <div className={styles.workspace}>
      <section className={styles.editor} aria-label="Create your photo" aria-busy={pending}>
        <div className={styles.sectionHeading}><div><span className={styles.kicker}>LET’S GET YOU READY</span><h2>{file ? "Ready to preview?" : "Start with your photo"}</h2></div><span className={styles.free}>Free preview</span></div>
        <label className={styles.label} htmlFor="document-type">Country & document</label>
        <select id="document-type" className={styles.select} value={activeDoc.id} disabled={pending} onChange={e => { setDocId(e.target.value); setError(""); const next = new URLSearchParams(params.toString()); next.set("type", e.target.value); router.replace(`?${next.toString()}`, { scroll: false }); }}>{documentTypes.map(d => <option key={d.id} value={d.id}>{d.flag} {d.label}</option>)}</select>
        <div className={styles.specs}><span><Check size={14} />{activeDoc.size}</span><span>Background: {activeDoc.bg_color?.replaceAll("-", " ")}</span></div>
        <input ref={input} id="tool-photo-input" type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose a photo" className={styles.fileInput} disabled={pending} onChange={e => { const files = Array.from(e.target.files || []); e.target.value = ""; if (files.length) void selectPhoto(files); }} />
        {!file ? <button type="button" disabled={pending} className={`${styles.dropzone} ${dragging ? styles.dragging : ""}`} onClick={() => input.current?.click()} onDragOver={e => { e.preventDefault(); if (!pending) setDragging(true); }} onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false); }} onDrop={e => { e.preventDefault(); void selectPhoto(Array.from(e.dataTransfer.files)); }}>
          <span className={styles.uploadIcon}>{phase === "reading" ? <LoaderCircle className={styles.spin} size={30} /> : <ImagePlus size={30} />}</span><strong>{phase === "reading" ? "Preparing your photo…" : dragging ? "Drop your photo here" : "A fresh photo. A fresh start."}</strong><span>Drag & drop your photo, or browse your files</span><span className={styles.uploadButton}><Upload size={18} />Choose a photo<ArrowRight size={18} /></span><small>JPG, PNG or WebP · Up to 20 MB</small>
        </button> : <div className={styles.review}><div className={styles.photoFrame}>{preview && <img src={preview} alt="Your selected photo before processing" />}{phase === "processing" && <span className={styles.scan} />}</div><div className={styles.reviewInfo}><span className={styles.kicker}>YOUR ORIGINAL PHOTO</span><h3>{file.name}</h3><p>{(file.size / 1024 / 1024).toFixed(1)} MB · {activeDoc.label}</p><p>We’ll prepare a preview using your selected document settings.</p><button type="button" disabled={pending} onClick={() => input.current?.click()}>Change photo</button><button type="button" disabled={pending} onClick={() => { setFile(null); setError(""); }}>Remove</button></div></div>}
        <div role="status" aria-live="polite" className={styles.status}>{phase === "reading" ? "Checking and preparing your image locally…" : phase === "processing" ? "Your photo is processing. This can take up to two minutes." : phase === "opening" ? "Your preview is ready. Opening it now…" : ""}</div>
        {error && <div role="alert" className={styles.error}>{error}</div>}
        {file && <button type="button" className={styles.primary} disabled={pending} onClick={() => void processPhoto()}>{pending && <LoaderCircle size={20} className={styles.spin} />}{pending ? phase === "opening" ? "Opening preview…" : "Preparing your preview…" : error ? "Try creating preview again" : "Create my free preview"}{!pending && <ArrowRight size={20} />}</button>}
        <p className={styles.price}><ShieldCheck size={17} />Preview first. Downloads <PriceDisplay basePrice={7.99} /> once. No subscription.</p><PhotoPolicyNote />
      </section>
      <aside className={styles.aside}><div className={styles.exampleHeading}><span className={styles.kicker}>THE POSSIBILITIES, IN PICTURE</span><h2>A little preparation.<br />A polished result.</h2><p>Slide to explore an example transformation.</p></div>
        <div className={styles.comparison}><img src="/assets/hero-compliant.png" alt="Example photo with a plain background" /><img src="/assets/hero-raw.png" alt="Original example photo" style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }} /><div className={styles.divider} style={{ left: `${comparison}%` }}><span>↔</span></div><span className={styles.before}>Before</span><span className={styles.after}>After</span><input type="range" min="0" max="100" value={comparison} aria-label="Compare original and prepared example photo" onChange={e => setComparison(Number(e.target.value))} /></div>
        <p className={styles.caption}>Illustrative example · Your result depends on your photo and document rules.</p><div className={styles.tips}><h3>A better photo starts here</h3>{["Face the camera with a neutral expression", "Use even daylight and a plain background", "Keep your full head and shoulders in frame"].map((tip, i) => <p key={tip}><span>0{i + 1}</span>{tip}</p>)}</div>
      </aside>
    </div>
    <section className={styles.faq}><h2>A few things worth knowing</h2><details><summary>When do I pay?</summary><p>Create and review your preview first. Digital photo and print-sheet downloads require a one-time payment of <PriceDisplay basePrice={7.99} />.</p></details><details><summary>Can I use a photo from my phone?</summary><p>Yes. Choose a JPG, PNG or WebP from your camera roll. Export HEIC photos as JPG first. Use the original photo rather than a screenshot.</p></details><details><summary>Is acceptance guaranteed?</summary><p>No. Automated checks are guidance; your issuing authority makes the final decision. Check your application’s rules, especially whether digital editing is permitted.</p></details></section>
  </div></main>;
}
export default function ToolPage() { return <Suspense fallback={<div className={styles.loading} role="status">Loading your photo studio…</div>}><ToolForm /></Suspense>; }
