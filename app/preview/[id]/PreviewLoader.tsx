"use client";

import { useEffect, useState } from "react";
import PreviewClient from "./PreviewClient";
import type { LocalPrice } from "./hooks/usePayment";

export default function PreviewLoader(props: {
  photoId: string; localPrice: LocalPrice; expertPrice: LocalPrice;
  from?: string; downloadToken: string;
  currencyOverride?: "USD";
}) {
  const [photo, setPhoto] = useState<any>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setPhoto(null);
    setError("");
    const timeout = setTimeout(() => controller.abort(), 20000);
    fetch(`/api/photo/${encodeURIComponent(props.photoId)}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(response.status === 404
          ? "This preview is no longer available. Please create a new photo."
          : "We couldn’t load your saved preview. Please try again.");
        if (!result.data?.previewUrl || typeof result.data.documentType !== "string")
          throw new Error("Your preview image is unavailable. Please try again or contact support.");
        if (active) setPhoto(result.data);
      })
      .catch(cause => { if (active) setError(cause.name === "AbortError"
        ? "Loading took longer than expected. Please try again." : cause.message); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [props.photoId, attempt]);

  if (photo) return <PreviewClient {...props} previewUrl={photo.previewUrl}
    documentType={photo.documentType} metrics={photo.metrics || {}}
    initialIsPaid={photo.isPaid === true} />;

  return <main className="min-h-[65vh] bg-slate-50 px-5 py-16 flex items-center justify-center">
    <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center" role="status" aria-live="polite">
      <h1 className="text-2xl font-bold text-slate-900">{error ? "Let’s recover your preview" : "Opening your saved photo"}</h1>
      <p className="mt-3 text-slate-600">{error || "Loading your photo and download options…"}</p>
      {error && <><button onClick={() => setAttempt(a => a + 1)} className="mt-6 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white">Retry preview</button>
        <div className="mt-5 flex justify-center gap-5 text-sm underline"><a href="/passport-photo-online">Create a new photo</a><a href="/support">Contact support</a></div></>}
    </div>
  </main>;
}
