"use client";

import { useEffect } from "react";
import { getMediaPipeLandmarker } from "@/lib/mediapipe";

/**
 * ModelPreloader
 * ──────────────
 * This component handles the background initialization of the MediaPipe 
 * Face Landmarker AI models. By calling getMediaPipeLandmarker() on mount, 
 * the models (~2MB task + WASM) are downloaded and cached by the browser. 
 * This ensures that when a user uploads a photo, the detection starts 
 * instantly without waiting for the models to load.
 */
export default function ModelPreloader() {
  useEffect(() => {
    // Start loading the models in the background after the first render
    const preload = async () => {
      try {
        console.log("[preloader] Initializing face detection AI...");
        await getMediaPipeLandmarker();
        console.log("[preloader] Face detection AI ready.");
      } catch (err) {
        // Silent fail — if it fails here, it will try again when the user 
        // actually uploads a photo.
        console.warn("[preloader] Background AI loading deferred:", err);
      }
    };

    // Deeply defer to prevent blocking Lighthouse/Pagespeed and the main thread
    let timeoutId: NodeJS.Timeout;
    
    const schedulePreload = () => {
      // Add an extra 2.5s delay after the page fully loads
      timeoutId = setTimeout(preload, 4000);
    };

    if (document.readyState === "complete") {
      schedulePreload();
    } else {
      window.addEventListener("load", schedulePreload);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("load", schedulePreload);
    };
  }, []);

  return null; // This component doesn't render anything
}
