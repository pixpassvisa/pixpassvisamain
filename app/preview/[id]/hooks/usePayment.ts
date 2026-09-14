import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const initializeRazorpay = () =>
    new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async (overrideEmail?: string) => {
    setLoading(true);
    const emailToUse = (overrideEmail !== undefined ? overrideEmail : guestEmail) || "";
    try {
      if (!(await initializeRazorpay())) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
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
          isExpert,
          guestEmail: status === "authenticated" ? undefined : emailToUse,
          gaClientId, // Pass it here
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PixPassVisa",
        description: "Get your passport or visa photo verified & corrected instantly.",
        image: "https://res.cloudinary.com/ddxu2wqfm/image/upload/v1774782293/logo_evktxq.jpg",
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, photoId }),
            });
            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyRes.ok) {
              onSuccess?.(verifyData);
              status === "authenticated"
                ? router.push("/dashboard")
                : setHasPaid(true);
            } else {
              alert(verifyData?.error || "Payment verification failed");
            }
          } catch (e) {
            console.error("Verification error:", e);
            alert("Error verifying payment");
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || emailToUse,
        },
        theme: { color: "#2563eb" },
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      alert(err?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePayment };
}
