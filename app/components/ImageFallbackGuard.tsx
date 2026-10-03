"use client";

import { useEffect } from "react";

/** Prevent a stale third-party illustration URL from leaving an empty card. */
export default function ImageFallbackGuard() {
  useEffect(() => {
    const handleImageError = (event: Event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied === "true") return;
      const source = image.currentSrc || image.src;
      if (!/^https?:\/\//i.test(source)) return;
      image.dataset.fallbackApplied = "true";
      image.removeAttribute("srcset");
      image.src = "/images/example-portrait.webp";
    };

    window.addEventListener("error", handleImageError, true);
    return () => window.removeEventListener("error", handleImageError, true);
  }, []);

  return null;
}
