"use client";
import PaymentHelp from "@/app/components/PaymentHelp";
import { startCheckoutAttempt, reportCheckout, paymentGuidance, type AttemptReceipt } from "@/lib/checkout-client";

import { useState, useEffect, useRef } from "react";
import PriceDisplay from "@/app/components/PriceDisplay";
import { getClientTimezoneCurrency } from "@/lib/currency";
import { useRouter } from "next/navigation";
import { Lock, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ExpertEditPage() {
  const attempt = useRef<AttemptReceipt | null>(null);
  const busy = useRef(false);
  const paymentReceived = useRef(false);
  const [reference, setReference] = useState("");
  const [pendingReceipt, setPendingReceipt] = useState<any>(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Manage object URLs safely to avoid browser memory leaks
  useEffect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (photos.length + selectedFiles.length > 3) {
        alert("You can only upload up to 3 photos.");
        return;
      }
      setPhotos((prev) => [...prev, ...selectedFiles].slice(0, 3));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      const timer = setTimeout(() => { script.remove(); resolve(false); }, 15000);
      script.onload = () => { clearTimeout(timer); resolve(true); };
      script.onerror = () => { clearTimeout(timer); script.remove(); resolve(false); };
      document.body.appendChild(script);
    });
  };

  const verifyExpert = async (receipt: any) => {
    paymentReceived.current = true;
    busy.current = true; setLoading(true); setPendingReceipt(receipt);
    try { sessionStorage.setItem("pixpassvisa:expert:pending", JSON.stringify(receipt)); } catch {}
    try {
      const res = await fetch("/api/expert-edit/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(receipt), signal: AbortSignal.timeout(30000) });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error("Confirmation unavailable");
      setIsSuccess(true); setPendingReceipt(null);
      try { sessionStorage.removeItem("pixpassvisa:expert:pending"); } catch {}
    } catch {
      void reportCheckout(attempt.current, "verification_pending");
      setMessage("Payment confirmation is pending. Do not pay again. Check its status below or contact support with payment ID " + receipt.razorpay_payment_id);
    } finally { busy.current = false; setLoading(false); }
  };
  useEffect(() => {
    try { const saved = sessionStorage.getItem("pixpassvisa:expert:pending"); if (saved) { setPendingReceipt(JSON.parse(saved)); setMessage("A previous payment needs confirmation. Check payment status before trying again."); } } catch {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return;
    if (pendingReceipt) { await verifyExpert(pendingReceipt); return; }
    if (!email) return alert("Please enter your email");
    if (photos.length === 0) return alert("Please upload at least 1 photo");

    busy.current = true;
    setLoading(true);
    setMessage("Uploading photos and preparing order...");

    try {
      paymentReceived.current = false;
      attempt.current = await startCheckoutAttempt({ kind: "expert", email });
      setReference(attempt.current.reference);
      const isRazorpayLoaded = await initializeRazorpay();
      if (!isRazorpayLoaded) {
        void reportCheckout(attempt.current, "sdk_failed");
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      // Capture GA4 Client ID
      let gaClientId = "";
      try {
        // @ts-ignore
        if (typeof window !== "undefined" && window.gtag) {
          await new Promise((resolve) => {
            // @ts-ignore
            window.gtag("get", "G-RJFKP2ZXNX", "client_id", (id: string) => {
              gaClientId = id;
              resolve(true);
            });
            setTimeout(resolve, 500);
          });
        }
      } catch (e) {
        console.error("Failed to get GA Client ID", e);
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("reference", attempt.current.reference);
      formData.append("token", attempt.current.token);
      formData.append("email", email);
      formData.append("currencyOverride", getClientTimezoneCurrency());
      formData.append("gaClientId", gaClientId); // Pass it here
      photos.forEach((photo) => formData.append("image", photo));

      // Create Order
      const res = await fetch("/api/expert-edit/create-order", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create order");

      setMessage("Opening payment gateway...");

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "PixPassVisa",
        description: "Expert manual editing for guaranteed compliance. 100% Guaranteed Approval.",
        // Use the logo and styling saved in the merchant's Razorpay dashboard.
        order_id: data.orderId,
        handler: (response: any) => { void verifyExpert({ ...response, expertOrderId: data.expertOrderId }); },
        modal: { confirm_close: true, ondismiss: () => {
          if (paymentReceived.current) return;
          busy.current = false; setLoading(false);
          void reportCheckout(attempt.current, "checkout_closed");
          setMessage("Checkout closed. If you were charged, contact support before paying again.");
        } },
        prefill: {
          email: email,
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        void reportCheckout(attempt.current, "client_payment_failed", response.error);
        setMessage(paymentGuidance(response.error?.reason));
      });
      rzp.open();
      void reportCheckout(attempt.current, "checkout_opened");
    } catch (err: any) {
      busy.current = false; setLoading(false);
      setMessage(err.message || "Checkout could not start. Please contact support.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Order Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            Thank you! Your photos have been successfully submitted for manual editing by our experts. 
            We will email the final edited photos to <strong>{email}</strong> soon.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl px-4 pt-6">
        {message && <p role="status" className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">{message}</p>}
        {pendingReceipt && <button type="button" disabled={loading} onClick={() => verifyExpert(pendingReceipt)} className="mt-3 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white">Check payment status</button>}
        <PaymentHelp reference={reference} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Expert Manual Edit</h1>
          <p className="mt-4 text-lg text-slate-600">
            Let our company experts manually edit and perfect your photo for <PriceDisplay basePrice={6.99} isExpert />.<br/>
            Submit up to 3 photos (any background color) and we'll do the rest!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Email Section */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                  Where should we send the edited photo?
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Photos Section */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Upload Photos (Up to 3)
                </label>
                <p className="text-xs text-slate-500 mb-4">White, green, or any background is fine. We will securely process them.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  
                  {photos.length < 3 && (
                    <label className="border-2 border-dashed border-slate-300 rounded-xl aspect-square flex flex-col items-center justify-center text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/70 transition-colors cursor-pointer">
                      <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="text-xs font-semibold">Add Photo</span>
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/heic"
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-6 border-t border-slate-100">
                <div className="mb-6 space-y-4">
                  {/* Pricing Transparency */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                     <div>
                       <p className="text-sm font-bold text-slate-800">
                         One-time payment: <PriceDisplay basePrice={6.99} isExpert />
                       </p>
                       <p className="text-xs text-slate-500 mt-0.5">No subscription &bull; No hidden charges</p>
                     </div>
                     <span className="text-2xl font-black text-slate-900"><PriceDisplay basePrice={6.99} isExpert /></span>
                  </div>

                  {/* Outcome Clarity */}
                  <div>
                     <p className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">After payment, you will:</p>
                     <div className="space-y-1.5">
                       <div className="flex items-start gap-2 text-sm">
                          <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          <span className="text-slate-700 font-medium leading-tight">Have our experts manually edit your photo</span>
                       </div>
                       <div className="flex items-start gap-2 text-sm">
                          <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          <span className="text-slate-700 font-medium leading-tight">Receive guaranteed compliant photos via email</span>
                       </div>
                     </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="bg-blue-50/70/50 rounded-xl p-3 border border-blue-100/50">
                     <div className="space-y-2">
                       <div className="flex items-center gap-2 text-xs">
                         <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                         <span className="text-slate-700 font-medium">Secure payment via Razorpay</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs">
                         <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                         <span className="text-slate-700 font-medium">Supports UPI, Cards, Wallets</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs">
                         <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                         <span className="text-slate-700 font-medium">100% safe & encrypted</span>
                       </div>
                     </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || photos.length === 0 || !email}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex flex-col items-center justify-center gap-1"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      {message || "Processing..."}
                    </div>
                  ) : (
                    <>
                      <span className="flex items-center gap-2">
                        Submit Photos for Expert Edit &ndash; <PriceDisplay basePrice={6.99} isExpert />
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </>
                  )}
                </button>
                
                {/* Reduce Anxiety */}
                {!loading && (
                  <p className="text-center text-xs font-medium text-slate-500 mt-4 flex items-center justify-center gap-1.5 border border-slate-200 bg-slate-50 py-1.5 px-3 rounded-full w-max mx-auto">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Money back guarantee if photo is rejected
                  </p>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
