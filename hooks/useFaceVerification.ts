import { useState, useCallback } from "react";
import { ValidationReport } from "@/lib/validation-engine";

export function useFaceVerification() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing...");
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyPhoto = useCallback(
    async (file: File, countryCode: string, docType: string) => {
      setIsProcessing(true);
      setError(null);
      setReport(null);
      setLoadingMessage("started validating your photo...");

      const messages = [
        "Analyzing facial geometry...",
        "Checking background uniformity...",
        "Evaluating lighting & shadows...",
        "Verifying country specifications...",
        "Finalizing results..."
      ];
      
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (messageIndex < messages.length) {
          setLoadingMessage(messages[messageIndex]);
          messageIndex++;
        }
      }, 1400);

      const startTime = Date.now();

      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("country_code", countryCode);
        formData.append("document_type", "passport");

        const response = await fetch("/api/external-validate", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Failed to validate photo (HTTP ${response.status})`
          );
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        const elapsed = Date.now() - startTime;
        const remainingTime = 8000 - elapsed;
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        setReport(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during verification";

        console.error("Verification Error:", err);
        setError(message);
      } finally {
        clearInterval(messageInterval);
        setIsProcessing(false);
      }
    },
    []
  );

  return {
    verifyPhoto,
    isProcessing,
    loadingMessage,
    report,
    setReport,
    error,
    setError,
  };
}