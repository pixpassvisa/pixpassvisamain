"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const move = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setSliderPos(pct);
    setHasInteracted(true);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    move(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    move(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const x =
        "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      move(x);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, move]);

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        aspectRatio: "1 / 1",
        width: "100%",
        maxWidth: "400px",
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        cursor: isDragging ? "ew-resize" : "col-resize",
        boxShadow: isDragging
          ? "0 0 0 3px rgba(37,99,235,0.35), 0 8px 40px rgba(0,0,0,0.18)"
          : "0 4px 32px rgba(0,0,0,0.13)",
        transition: "box-shadow 0.2s",
      }}
    >
      <Image
        src="/us_non_imigrant_before.webp"
        alt="Avant — photo originale non conforme"
        fill
        style={{ objectFit: "cover", objectPosition: "center top", pointerEvents: "none", zIndex: 0 }}
        priority
        sizes="(max-width: 1024px) 100vw, 500px"
      />
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
          src="https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"
          alt="Après — photo biométrique conforme avec fond blanc"
          fill
          style={{ objectFit: "cover", objectPosition: "center 8%", pointerEvents: "none" }}
          priority
          sizes="(max-width: 1024px) 100vw, 500px"
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
        }}
      />
      {/* Handle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${sliderPos}%`,
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.12 : 1})`,
          width: "48px",
          height: "48px",
          background: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3px",
          zIndex: 3,
          pointerEvents: "none",
          boxShadow: isDragging
            ? "0 0 0 4px rgba(37,99,235,0.3), 0 4px 16px rgba(0,0,0,0.3)"
            : "0 2px 14px rgba(0,0,0,0.35)",
          transition: "box-shadow 0.15s, transform 0.1s",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </div>
      {/* Labels */}
      <div style={{ position: "absolute", bottom: "14px", left: "14px", background: "rgba(0,0,0,0.62)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, pointerEvents: "none", zIndex: 4, opacity: sliderPos > 12 ? 1 : 0, transition: "opacity 0.2s" }}>Avant</div>
      <div style={{ position: "absolute", bottom: "14px", right: "14px", background: "rgba(16,185,129,0.92)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, pointerEvents: "none", zIndex: 4, opacity: sliderPos < 88 ? 1 : 0, transition: "opacity 0.2s" }}>Après</div>
      <div style={{ position: "absolute", bottom: "50px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.58)", color: "white", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: 500, pointerEvents: "none", zIndex: 5, whiteSpace: "nowrap", opacity: hasInteracted ? 0 : 1, transition: "opacity 0.5s" }}>Glisser pour comparer</div>
    </div>
  );
}

