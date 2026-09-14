"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { getSpecById } from "@/lib/specs";
import { usePayment, LocalPrice } from "@/app/preview/[id]/hooks/usePayment";
import { fr } from "../../translations";

const Icon = ({ d, size = 16, stroke = 2, className = "" }: { d: string; size?: number; stroke?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}><path d={d} /></svg>
);

const ICONS = {
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  zoom: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  close: "M18 6L6 18M6 6l12 12",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  warn: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  photo: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8",
  refresh: "M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15",
};

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(" ");

export default function PreviewClientFr({
  photoId, previewUrl, documentType, metrics, localPrice: initialLocalPrice, expertPrice: initialExpertPrice, initialIsPaid,
}: {
  photoId: string; previewUrl: string; documentType: string; metrics: Record<string, unknown>; localPrice: LocalPrice; expertPrice: LocalPrice; initialIsPaid?: boolean;
}) {
  const { data: session, status } = useSession();
  const [hasPaid, setHasPaid] = useState(initialIsPaid || false);
  const [guestEmail, setGuestEmail] = useState("");
  const [localPrice, setLocalPrice] = useState<LocalPrice>(initialLocalPrice);
  const [expertPrice, setExpertPrice] = useState<LocalPrice>(initialExpertPrice);
  const [isExpertPlan, setIsExpertPlan] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const spec = getSpecById(documentType);
  const isVisa = spec?.name?.toLowerCase().includes("visa") || documentType.toLowerCase().includes("visa");
  const docCategory = isVisa ? "Visa" : "Passeport";
  const productName = spec?.name || `Photo ${docCategory}`;

  const verifying = false;



  const { loading, handlePayment } = usePayment({
    photoId, localPrice: isExpertPlan ? expertPrice : localPrice, isExpert: isExpertPlan, guestEmail,
    status: status === "authenticated" ? "authenticated" : status === "loading" ? "loading" : "unauthenticated", session, setHasPaid,
  });

  const onPaymentClick = () => {
    const trimmed = (guestEmail || "").trim();
    const isEmailValid = !!(trimmed && trimmed.includes("@") && trimmed.includes("."));
    if (status !== "authenticated" && !isEmailValid) { setIsEmailDialogOpen(true); return; }
    handlePayment(trimmed);
  };

  const handleDialogSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = (guestEmail || "").trim();
    const isEmailValid = !!(trimmed && trimmed.includes("@") && trimmed.includes("."));
    if (isEmailValid) {
      setGuestEmail(trimmed);
      setIsEmailDialogOpen(false);
      handlePayment(trimmed);
    } else {
      alert("Veuillez entrer une adresse email valide.");
    }
  };

  useEffect(() => {
    const tzCurrency = getClientTimezoneCurrency();
    if (!initialLocalPrice || (tzCurrency !== initialLocalPrice.currency && tzCurrency !== "USD")) {
      fetch(`/api/currency?currency=${tzCurrency}`).then((r) => r.json()).then((d) => { if (d?.formatted) setLocalPrice(d); }).catch(console.error);
      fetch(`/api/currency?currency=${tzCurrency}&isExpert=true`).then((r) => r.json()).then((d) => { if (d?.formatted) setExpertPrice(d); }).catch(console.error);
    }
  }, [initialLocalPrice]);



  const handleEmailPhoto = async () => {
    const emailTo = window.prompt("Entrez votre adresse email pour recevoir la photo :");
    if (!emailTo) return;
    try {
      const res = await fetch("/api/send-photo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: emailTo, photoUrl: previewUrl, documentType, photoId }) });
      alert(res.ok ? "Photo envoyée ! Vérifiez votre boîte de réception." : "Échec de l'envoi. Veuillez réessayer.");
    } catch { alert("Erreur lors de l'envoi de l'email."); }
  };

  return (
    <div className="min-h-screen bg-slate-200/70 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-6xl">
          <div className="mb-3 text-center lg:text-left">
            <h1 className="text-2xl font-black text-slate-900">
              {fr.preview.title} <span className="text-blue-600">{spec?.flag || ""} {spec?.country || ""}</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left — Photo */}
            <div className="w-full lg:w-[62%] space-y-4">
              <div className="bg-white rounded-md border border-slate-100 overflow-hidden ">
                <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-1.5"><Icon d={ICONS.photo} size={14} className="text-blue-600" /> {spec?.country || "Photo document"}</p>
                </div>
                <div className="relative cursor-zoom-in group mx-5 mb-5 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center" onClick={() => setIsZoomOpen(true)} style={{ minHeight: 240 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Aperçu passeport" className="max-h-[420px] w-auto max-w-full object-contain select-none pointer-events-none block" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><Icon d={ICONS.zoom} size={18} className="text-slate-800" /></div>
                  </div>
                </div>
              </div>
              {/* What we fixed */}
              {metrics && !hasPaid && (
                <div className="bg-white rounded-md border border-slate-100 p-5 ">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center"><Icon d={ICONS.photo} size={14} className="text-blue-600" /></div>
                    <p className="text-sm font-bold text-slate-900">{fr.preview.whatWeFixed}</p>
                  </div>
                  <div className="space-y-0">
                    {fr.metricFixes.map((label, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2 border-b border-slate-100 last:border-0">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Icon d={ICONS.check} size={11} className="text-blue-600" stroke={2.5} /></div>
                        <span className="text-[12px] text-slate-700 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Order Panel */}
            <div className="w-full lg:w-[38%] space-y-4">
              <div className="bg-white rounded-md border border-slate-100  overflow-hidden lg:sticky lg:top-6">
                <div className="p-5 sm:p-6">
                  {!hasPaid ? (
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{fr.payment.orderSummary} — {fr.payment.acceptedFor}</p>
                      {/* Standard plan */}
                      <button onClick={() => setIsExpertPlan(false)} className={cx("w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 relative", !isExpertPlan ? "border-emerald-500 bg-emerald-50/40 shadow-[0_0_0_3px_rgba(16,185,129,0.08)]" : "border-slate-100 bg-white hover:border-slate-200")}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{fr.payment.standardPack}</h4>
                          <p className="text-xl font-black text-slate-900">{localPrice?.formatted}</p>
                        </div>
                        <ul className="space-y-1.5">
                          {fr.payment.standardFeatures.map((f) => (<li key={f} className="flex items-center gap-2 text-[13px] text-slate-600 font-medium"><Icon d={ICONS.check} size={12} className={!isExpertPlan ? "text-emerald-500" : "text-slate-300"} stroke={2.5} />{f}</li>))}
                        </ul>
                      </button>
                      {/* Expert plan */}
                      <button onClick={() => setIsExpertPlan(true)} className={cx("w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 relative", isExpertPlan ? "border-blue-500 bg-blue-50/40 shadow-[0_0_0_3px_rgba(59,91,219,0.08)]" : "border-slate-100 bg-white hover:border-slate-200")}>
                        <div className="absolute -top-2.5 right-4 bg-amber-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-md">{fr.payment.mostPopular}</div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={cx("text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest", isExpertPlan ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500")}>{fr.payment.expertReview}</span>
                            <h4 className="text-sm font-bold text-slate-900 mt-1">{fr.payment.premiumPack}</h4>
                          </div>
                          <p className="text-xl font-black text-slate-900">{expertPrice?.formatted}</p>
                        </div>
                        <ul className="space-y-1.5">
                          {fr.payment.premiumFeatures.map((f) => (<li key={f} className="flex items-center gap-2 text-[14px] text-slate-600 font-medium"><Icon d={ICONS.check} size={12} className={isExpertPlan ? "text-blue-500" : "text-slate-300"} stroke={2.5} />{f}</li>))}
                        </ul>
                        {isExpertPlan && (
                          <div className="mt-3 bg-blue-100/50 rounded-xl px-3 py-2 text-[11px] text-blue-800 font-semibold flex items-center gap-1.5">
                            <Icon d={ICONS.shield} size={12} className="text-blue-600 shrink-0" />{fr.payment.moneyBack}
                          </div>
                        )}
                      </button>

                      {status !== "authenticated" && (
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{fr.payment.emailForDelivery}</label>
                          <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder={fr.payment.enterEmail} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
                        </div>
                      )}

                      <div className="space-y-2 pt-1">
                        <button onClick={onPaymentClick} disabled={loading}
                          className={cx("w-full font-bold py-4 rounded-2xl transition-all text-sm tracking-wide flex items-center justify-center gap-2.5 disabled:opacity-50 shadow-lg", isExpertPlan ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25" : "bg-slate-900 hover:bg-black text-white shadow-slate-900/20")}>
                          {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (
                            <><Icon d={ICONS.download} size={16} className="shrink-0" />{isExpertPlan ? fr.payment.getExpertReview : fr.payment.downloadNow} — {isExpertPlan ? expertPrice?.formatted : localPrice?.formatted}</>
                          )}
                        </button>
                        <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
                          {[{ icon: ICONS.shield, text: fr.payment.secureCheckout }, { icon: ICONS.refresh, text: fr.payment.refundIfRejected }, { icon: ICONS.lock, text: fr.payment.ssl }].map((b, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-slate-500"><Icon d={b.icon} size={12} /><span className="text-[10px] font-semibold">{b.text}</span></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 rounded-2xl p-5 text-center border border-emerald-100">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><Icon d={ICONS.check} size={22} className="text-emerald-600" /></div>
                        <p className="text-emerald-700 font-bold text-lg">{fr.result.paymentSuccess}</p>
                        <p className="text-emerald-600 text-sm mt-1">{fr.result.photoReady}</p>
                      </div>
                      <a href={`/api/download/${photoId}`} download={`photo-${documentType}.jpeg`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all text-sm shadow-lg shadow-blue-500/25">
                        <Icon d={ICONS.download} size={16} />{fr.result.downloadDigital} {docCategory}
                      </a>
                      <a href={`/passport-photo-print-template-generator?imageUrl=${encodeURIComponent(`/api/download/${photoId}`)}&width=${spec?.width_mm || ""}&height=${spec?.height_mm || ""}&name=${encodeURIComponent(spec?.name || "")}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all text-sm shadow-lg shadow-blue-500/20/20">
                        <Icon d={ICONS.photo} size={16} className="shrink-0" />Personnaliser & Imprimer (A4 / 4×6 / 5×7)
                      </a>
                      <a href={`/api/download-sheet/${photoId}`} download={`planche-A4-${documentType}.jpeg`} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all text-sm">
                        <Icon d={ICONS.photo} size={16} />{fr.result.downloadPrintSheet} A4 Standard
                      </a>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={handleEmailPhoto} className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"><Icon d={ICONS.mail} size={14} />{fr.result.emailMe}</button>
                        <button className="bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5"><Icon d={ICONS.star} size={14} />{fr.result.rateUs}</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <Link href="/fr/passport-photo-online" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                  {fr.result.needAnother} <span className="underline">{fr.result.uploadAgain}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom overlay */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(4,4,10,0.96)" }} onClick={() => setIsZoomOpen(false)}>
          <button onClick={() => setIsZoomOpen(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 bg-white/8 flex items-center justify-center hover:bg-white/15 transition-all"><Icon d={ICONS.close} size={16} className="text-white/70" /></button>
          <div onClick={(e) => e.stopPropagation()} style={{ animation: "zoomIn 250ms cubic-bezier(0.22,1,0.36,1) forwards" }}>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Aperçu complet" draggable={false} onContextMenu={(e) => e.preventDefault()} className="w-full h-auto block" />
            </div>
            <p className="text-center text-white/25 text-[11px] mt-4  tracking-widest uppercase">
              {hasPaid ? fr.preview.fullResolution : fr.preview.watermarkedPreview} · {fr.preview.escToClose}
            </p>
          </div>
          <style>{`@keyframes zoomIn { from { opacity:0; transform:scale(0.93) } to { opacity:1; transform:scale(1) } }`}</style>
        </div>
      )}

      {/* Mobile CTA */}
      {!hasPaid && !verifying && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] px-4 pt-3 pb-4 lg:hidden">
            <div className="max-w-lg mx-auto">
              {status !== "authenticated" && (
                <div className="mb-2.5"><input type="email" value={guestEmail || ""} onChange={(e) => setGuestEmail(e.target.value)} placeholder={fr.payment.enterEmail} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" /></div>
              )}
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{productName}</p>
                  <p className="text-lg font-black text-slate-900 leading-tight">{(isExpertPlan ? expertPrice : localPrice)?.formatted || "..."}</p>
                </div>
                <div className="w-px h-8 bg-slate-200 shrink-0" />
                <button onClick={onPaymentClick} disabled={loading}
                  className="flex-1 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20">
                  {loading ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : (<><Icon d={ICONS.download} size={16} />{isExpertPlan ? fr.payment.expertReview : fr.payment.downloadNow}</>)}
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-2 flex items-center justify-center gap-1.5"><Icon d={ICONS.lock} size={11} className="text-slate-400 shrink-0" /> {fr.payment.secureCheckout} · {fr.payment.refundIfRejected} · {fr.payment.noSubscription}</p>
            </div>
          </div>
          <div className="h-28 lg:hidden" />
        </>
      )}

      {/* Email dialog */}
      {isEmailDialogOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-sm overflow-hidden">
            <form onSubmit={handleDialogSubmit} className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto"><Icon d={ICONS.mail} size={22} className="text-blue-600" /></div>
              <h3 className="text-xl font-black text-slate-900 mb-2 text-center">{fr.payment.whereToSend}</h3>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed text-center">{fr.payment.enterEmailForReceipt}</p>
              <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} placeholder="vous@exemple.com" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-4" autoFocus required />
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsEmailDialogOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-all">{fr.payment.cancel}</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20">{fr.buttons.continue} →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
