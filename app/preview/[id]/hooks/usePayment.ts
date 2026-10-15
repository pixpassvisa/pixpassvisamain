import { useState, useRef, useEffect } from "react";

export interface LocalPrice {
  currency: string;
  amount: number;
  formatted: string;
  symbol: string;
}

interface PaymentOptions {
  photoId: string;
  localPrice: LocalPrice;
  isExpert?: boolean;
  guestEmail: string;
  status: "authenticated" | "loading" | "unauthenticated";
  session: any;
  setHasPaid: (paid: boolean) => void;
  onSuccess?: (data: any) => void;
}

export function usePayment({
  photoId,
  localPrice,
  isExpert,
  guestEmail,
  status,
  session,
  setHasPaid,
  onSuccess,
}: PaymentOptions) {
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [error, setError] = useState("");
  const busy = useRef(false);
  const receipt = useRef<any>(null);
  const storageKey = `pixpassvisa:payment:${photoId}`;

  const verifyPayment = async (response: any) => {
    busy.current = true;
    setLoading(true);
    setPhase("verifying");
    setError("");
    receipt.current = response;
    try { sessionStorage.setItem(storageKey, JSON.stringify(response)); } catch {}
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...response, photoId }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Verification unavailable");
      onSuccess?.(data);
      setHasPaid(true);
      receipt.current = null;
      try { sessionStorage.removeItem(storageKey); } catch {}
      setPhase("success");
    } catch {
      setPhase("pending");
      setError("Your payment confirmation needs another check. Please do not pay again. Retry verification below, or contact support with your payment ID: " + response.razorpay_payment_id);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved && !busy.current) void verifyPayment(JSON.parse(saved));
    } catch {}
    // Restore only the receipt belonging to this photo, including after a refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const initializeRazorpay = () =>
    new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      const timeout = setTimeout(() => { script.remove(); resolve(false); }, 15000);
      script.onload = () => { clearTimeout(timeout); resolve(true); };
      script.onerror = () => { clearTimeout(timeout); script.remove(); resolve(false); };
      document.body.appendChild(script);
    });

  const handlePayment = async (overrideEmail?: string, expertOverride?: boolean) => {
    if (busy.current) return;
    if (receipt.current) return verifyPayment(receipt.current);
    busy.current = true;
    setLoading(true);
    setPhase("opening");
    setError("");
    const emailToUse = (overrideEmail !== undefined ? overrideEmail : guestEmail) || "";
    try {
      if (!(await initializeRazorpay())) {
        throw new Error("Checkout could not load. Check your connection and try again.");
      }
      // Capture GA4 Client ID
      let gaClientId = "";
      try {
        // @ts-ignore
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          await new Promise((resolve) => {
            try {
              // @ts-ignore
              window.gtag("get", "G-RJFKP2ZXNX", "client_id", (id: string) => {
                gaClientId = id || "";
                resolve(true);
              });
            } catch {
              resolve(false);
            }
            // Timeout after 500ms to avoid blocking payment
            setTimeout(resolve, 500);
          });
        }
      } catch (e) {
        console.error("Failed to get GA Client ID", e);
      }

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoId,
          currencyOverride: localPrice?.currency || "USD",
          isExpert: expertOverride ?? isExpert,
          guestEmail: status === "authenticated" ? undefined : emailToUse,
          gaClientId, // Pass it here
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");
      if (!orderData.keyId) throw new Error("Checkout configuration is unavailable. Please refresh and try again.");

      // Log Razorpay open event
      const sid = typeof window !== "undefined" ? sessionStorage.getItem("usvisa_analytics_session") : null;
      if (sid) {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sid, type: "razorpay_open" }),
        }).catch(() => {});
      }

      // @ts-ignore
      if (typeof window === "undefined" || !window.Razorpay) {
        throw new Error("Razorpay SDK is not available.");
      }

      // @ts-ignore
      const razorpayInstance = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PixPassVisa",
        description: "Get your passport or visa photo verified & corrected instantly.",
        image: "https://res.cloudinary.com/ddxu2wqfm/image/upload/v1774782293/logo_evktxq.jpg",
        order_id: orderData.orderId,
        handler: (response: any) => { void verifyPayment(response); },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            if (receipt.current) return;
            busy.current = false;
            setLoading(false);
            setPhase("idle");
          },
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || emailToUse,
        },
        theme: { color: "#2563eb" },
      });

      razorpayInstance.on("payment.failed", () => {
        setError("Payment was not completed. You can retry in the secure checkout or close it to return here.");
      });
      setPhase("checkout");
      razorpayInstance.open();
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      setError(err?.message || "Failed to initiate payment");
      setPhase("idle");
      busy.current = false;
      setLoading(false);
    }
  };

  return { loading, phase, error, handlePayment };
}
