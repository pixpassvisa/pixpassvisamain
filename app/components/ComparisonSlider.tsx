"use client";

import { useState } from "react";
import Image from "next/image";

interface ComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function ComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before editing",
  afterAlt = "After editing"
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden bg-white border border-[#2563eb]/20 group">
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div
        className="absolute inset-0 max-w-full z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Slider Handle Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white/80 backdrop-blur-sm z-20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.2)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100 transition-transform group-hover:scale-110">
          <div className="flex gap-[3px]">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
             </svg>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
             </svg>
          </div>
        </div>
      </div>

      {/* Invisible Range Input for Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
        aria-label="Compare before and after images"
      />
      
      {/* Overlay labels (optional, can be styled based on design) */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
         <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-widest uppercase">Original</span>
      </div>
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
         <span className="bg-[#2563eb]/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-widest uppercase">Compliant</span>
      </div>
    </div>
  );
}
