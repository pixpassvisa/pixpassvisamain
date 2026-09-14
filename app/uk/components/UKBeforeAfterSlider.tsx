"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, Check } from "lucide-react";

export default function UKBeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const calcPos = useCallback((clientX: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.min(97, Math.max(3, pct)));
      setHasInteracted(true);
    });
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      calcPos(e.clientX);
    },
    [calcPos],
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => calcPos(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [isDragging, calcPos]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      calcPos(e.touches[0].clientX);
    },
    [calcPos],
  );

  useEffect(() => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const move = (e: TouchEvent) => {
      e.preventDefault();
      calcPos(e.touches[0].clientX);
    };
    const end = () => setIsDragging(false);
    el.addEventListener("touchmove", move, { passive: false });
    el.addEventListener("touchend", end);
    return () => {
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", end);
    };
  }, [isDragging, calcPos]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> UK Photo 35 × 45 mm Before &amp; After
      </div>

      {/* 35mm x 45mm Aspect Ratio Slider Container */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="relative  overflow-hidden  rounded-sm bg-slate-100"
        style={{
          aspectRatio: "35 / 45",
          width: "100%",
          maxWidth: "330px",
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          cursor: isDragging ? "ew-resize" : "col-resize",
        }}
      >
        {/* BEFORE — base layer (35x45mm) */}
        <Image
          src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116464/passport_photo_a27wdx.jpg"
          alt="Before – original photo"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
            zIndex: 0,
          }}
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 350px"
        />

        {/* AFTER — clipped right (35x45mm UK Compliant Photo) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            clipPath: `inset(0 0 0 ${sliderPos}%)`,
            willChange: "clip-path",
            pointerEvents: "none",
          }}
        >
          <Image
            src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp"
            alt="After – HMPO compliant UK 35x45mm photo"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
              pointerEvents: "none",
            }}
            sizes="(max-width: 1024px) 100vw, 350px"
            unoptimized
          />
        </div>

        {/* Divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            width: "2px",
            background: "white",
            transform: "translateX(-50%)",
            zIndex: 2,
            pointerEvents: "none",
            boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            willChange: "left",
          }}
        />

        {/* Handle circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${sliderPos}%`,
            transform: `translate(-50%, -50%) scale(${isDragging ? 1.1 : 1})`,
            width: "44px",
            height: "44px",
            background: "white",
            border: "2px solid #e2e8f0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            zIndex: 3,
            pointerEvents: "none",
            willChange: "left, transform",
            transition: "transform 0.1s",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#15803d"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#15803d"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        {/* BEFORE badge */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            background: "rgba(0,0,0,0.65)",
            color: "white",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: 700,
            pointerEvents: "none",
            zIndex: 4,
            opacity: sliderPos > 12 ? 1 : 0,
            transition: "opacity 0.2s",
            letterSpacing: "0.05em",
          }}
        >
          BEFORE (35x45mm)
        </div>

        {/* AFTER badge */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: "#15803d",
            color: "white",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: 700,
            pointerEvents: "none",
            zIndex: 4,
            opacity: sliderPos < 88 ? 1 : 0,
            transition: "opacity 0.2s",
            letterSpacing: "0.05em",
          }}
        >
          <span className="inline-flex items-center gap-1">
            HMPO COMPLIANT <Check className="w-3 h-3" />
          </span>
        </div>

        {!hasInteracted && (
          <div
            style={{
              position: "absolute",
              bottom: "48px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15,23,42,0.8)",
              color: "white",
              padding: "5px 14px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 600,
              pointerEvents: "none",
              zIndex: 5,
              whiteSpace: "nowrap",
            }}
          >
            ← drag to compare →
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 text-center max-w-xs font-medium">
        HMPO Compliant · 35 × 45 mm · Light Grey/White BG · Print-ready
      </p>
    </div>
  );
}
