"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Generate a simple unique ID
function generateSessionId() {
  return "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startTime = useRef(Date.now());
  const sessionId = useRef<string>("");

  useEffect(() => {
    // Generate or retrieve session ID for this browser tab/session
    let storedSession = sessionStorage.getItem("usvisa_analytics_session");
    if (!storedSession) {
      storedSession = generateSessionId();
      sessionStorage.setItem("usvisa_analytics_session", storedSession);
    }
    sessionId.current = storedSession;
    startTime.current = Date.now();
  }, []);

  // Track page views when pathname changes
  useEffect(() => {
    if (!sessionId.current) return;
    
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId.current,
        type: "page_view",
        url: pathname,
      }),
    }).catch(console.error);

  }, [pathname, searchParams]);

  // Track time spent when user leaves or closes tab
  useEffect(() => {
    const sendBeacon = () => {
      if (!sessionId.current) return;
      const durationInSeconds = Math.floor((Date.now() - startTime.current) / 1000);
      
      const payload = JSON.stringify({
        sessionId: sessionId.current,
        duration: durationInSeconds,
      });

      // Prefer sendBeacon for unloads to ensure delivery
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: payload,
        }).catch(console.error);
      }
    };

    window.addEventListener("beforeunload", sendBeacon);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        sendBeacon();
      }
    });

    return () => {
      window.removeEventListener("beforeunload", sendBeacon);
      document.removeEventListener("visibilitychange", sendBeacon); // Cleanup
    };
  }, []);

  return null; // Silent component
}
