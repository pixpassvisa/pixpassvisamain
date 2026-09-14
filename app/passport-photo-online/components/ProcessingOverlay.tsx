import React from "react";
import { CrossIcon, CheckIcon } from "./Icons";
import type { DocumentType } from "../types";

interface ProcessingOverlayProps {
  isCropping: boolean;
  setIsCropping: (cropping: boolean) => void;
  cropMsg: string;
  setCropMsg: (msg: string) => void;
  selectedFile: File | null;
  previewUrl: string;
  activeDoc?: DocumentType;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  isCropping,
  setIsCropping,
  cropMsg,
  setCropMsg,
  selectedFile,
  previewUrl,
  activeDoc,
}) => {
  if (!isCropping) return null;

  const steps = [
    {
      label: "Preparing image",
      sub: "Decoding your photo and normalizing color space...",
      key: "crop",
    },
    {
      label: "Removing background",
      sub: "AI-powered background replacement",
      key: "background",
    },
    {
      label: "Biometric alignment",
      sub: "Face centering & head-height calibration",
      key: "Applying",
    },
    {
      label: "Compliance check",
      sub: "ICAO / State Dept. standards verified",
      key: "preview",
    },
  ];

  let activeIdx = 0;
  if (
    cropMsg.includes("background") ||
    cropMsg.includes("Removing") ||
    cropMsg.includes("Cloud API") ||
    cropMsg.includes("Local")
  )
    activeIdx = 1;
  else if (
    cropMsg.includes("crop") ||
    cropMsg.includes("Applying") ||
    cropMsg.includes("guidelines")
  )
    activeIdx = 2;
  else if (
    cropMsg.includes("preview") ||
    cropMsg.includes("Redirecting") ||
    cropMsg.includes("Generating")
  )
    activeIdx = 3;

  const progressPercents = [14, 38, 65, 90];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#111114" }}>

      <style>{`
        @keyframes scanPingPong {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          48% { top: 98%; opacity: 1; }
          52% { top: 98%; opacity: 1; }
          95% { top: 0%; opacity: 1; }
          100% { top: 0%; opacity: 0; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes overlayIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Close */}
      <button
        className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)",
        }}
        onClick={() => { setIsCropping(false); setCropMsg(""); }}
      >
        <CrossIcon className="w-4 h-4" />
      </button>

      <div
        className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full max-w-[420px] lg:max-w-[900px] px-6 lg:px-12"
        style={{ animation: "overlayIn 0.4s ease-out" }}
      >
        {/* ─── Photo Card ─── */}
        <div className="flex flex-col items-center gap-4 order-1 lg:order-1 flex-shrink-0">

          {/* AI badge */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.35)",
              color: "#a5b4fc",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#a5b4fc" />
            </svg>
            AI-Powered Processing
          </div>

          {/* Floating card */}
          <div className="relative" style={{ animation: "cardFloat 4s ease-in-out infinite" }}>
            {/* Corner brackets */}
            {[
              "top-[-10px] left-[-10px] border-t-[2.5px] border-l-[2.5px] rounded-tl",
              "top-[-10px] right-[-10px] border-t-[2.5px] border-r-[2.5px] rounded-tr",
              "bottom-[-10px] left-[-10px] border-b-[2.5px] border-l-[2.5px] rounded-bl",
              "bottom-[-10px] right-[-10px] border-b-[2.5px] border-r-[2.5px] rounded-br",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-5 h-5 border-indigo-500`}
                style={{ animation: `pulseRing 2s ease-in-out ${i * 0.4}s infinite` }}
              />
            ))}

            {/* Image area */}
            <div
              className="relative overflow-hidden"
              style={{
                width: 220,
                height: 280,
                borderRadius: 12,
                background: "linear-gradient(145deg, #1e1e2e, #1a1a2a)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              {selectedFile ? (
                <img
                  src={previewUrl}
                  alt="Processing"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                    <circle cx="40" cy="28" r="18" fill="#6366f1" />
                    <path d="M10 90 Q10 62 40 62 Q70 62 70 90" fill="#6366f1" />
                  </svg>
                </div>
              )}

              {/* Scan line */}
              <div
                className="absolute left-0 w-full pointer-events-none z-20"
                style={{
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent, rgba(99,102,241,0.8) 30%, rgba(255,255,255,0.9) 50%, rgba(99,102,241,0.8) 70%, transparent)",
                  boxShadow: "0 0 20px 4px rgba(99,102,241,0.3)",
                  animation: "scanPingPong 3.5s ease-in-out infinite",
                }}
              />

              {/* Grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Face detection box */}

            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              { label: activeDoc?.size || "600 × 600 px", style: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" } },
              { label: "ICAO compliant", style: { background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc" } },
              { label: activeDoc ? `${activeDoc.label} ready` : "DS-160 ready", style: { background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)", color: "#fbbf24" } },
            ].map((tag) => (
              <span key={tag.label} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={tag.style}>
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L1.5 3v4c0 2.2 1.9 4 4.5 4.8C8.6 11 10.5 9.2 10.5 7V3L6 1z" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            </svg>
            Processed securely
          </div>
        </div>

        {/* ─── Steps Panel ─── */}
        <div className="order-2 lg:order-2 flex-1 flex flex-col">

          <div className="mb-2">
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight" style={{ color: "#ffffff" }}>
              Analyzing your photo...
            </h2>
            <p className="text-sm mt-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
              Please wait while we prepare your government-ready Biomatric Id photo
            </p>
          </div>

          {/* Progress bar */}
          <div
            className="rounded-full overflow-hidden relative mt-5 mb-7"
            style={{ height: 3, background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full relative overflow-hidden transition-all duration-700"
              style={{
                width: `${progressPercents[activeIdx]}%`,
                background: "linear-gradient(90deg, #4f46e5, #818cf8)",
              }}
            >
              <div
                className="absolute top-0 h-full"
                style={{
                  width: "40%",
                  background: "rgba(255,255,255,0.4)",
                  filter: "blur(2px)",
                  animation: "shimmer 1.8s linear infinite",
                }}
              />
            </div>
          </div>

          {/* Vertical step list */}
          <div className="flex flex-col">
            {steps.map((step, i) => {
              const isDone = i < activeIdx;
              const isActive = i === activeIdx;
              const isLast = i === steps.length - 1;

              return (
                <div key={i} className="flex gap-4 items-start">
                  {/* Icon + connector */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={
                        isActive
                          ? {
                            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                            color: "white",
                            boxShadow: "0 0 0 4px rgba(99,102,241,0.15)",
                          }
                          : isDone
                            ? {
                              background: "rgba(16,185,129,0.1)",
                              border: "1.5px solid rgba(16,185,129,0.3)",
                              color: "#6ee7b7",
                            }
                            : {
                              background: "rgba(255,255,255,0.04)",
                              border: "1.5px solid rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.25)",
                            }
                      }
                    >
                      {isDone ? <CheckIcon className="w-5 h-5" /> : i + 1}
                    </div>
                    {!isLast && (
                      <div
                        className="w-px my-1"
                        style={{
                          height: 32,
                          background: isDone
                            ? "linear-gradient(to bottom, rgba(16,185,129,0.5), rgba(99,102,241,0.3))"
                            : isActive
                              ? "linear-gradient(to bottom, #4f46e5, rgba(255,255,255,0.06))"
                              : "rgba(255,255,255,0.06)",
                        }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="pt-2 pb-1">
                    <div
                      className="text-sm font-semibold mb-0.5"
                      style={{
                        color: isActive ? "#818cf8" : isDone ? "#6ee7b7" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs" style={{ color: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)" }}>
                      {step.sub}
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-1 mt-2">
                        {[0, 0.2, 0.4].map((delay, d) => (
                          <div
                            key={d}
                            className="rounded-full"
                            style={{
                              width: 5,
                              height: 5,
                              background: d === 0 ? "#6366f1" : d === 1 ? "#818cf8" : "#a5b4fc",
                              animation: `dotBounce 1.2s ease-in-out ${delay}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info callout */}

        </div>
      </div>
    </div>
  );
};

export default ProcessingOverlay;