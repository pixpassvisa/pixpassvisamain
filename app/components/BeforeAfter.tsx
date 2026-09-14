"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Studio Quality Results Instantly
        </h2>
        <p className="mt-4 text-xl text-slate-500">
          Our system transforms everyday photos into perfect, compliant passport photos.
        </p>
      </div>

      <div className="relative w-full max-w-lg mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl bg-slate-100 group border border-slate-200">
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src="/images/after-edit-600.png"
            alt="Perfect passport photo with white background"
            fill
            className="object-contain bg-white"
          />
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-[0_4px_12px_rgba(37,99,235,0.3)] z-0">
            Compliant Photo Edit
          </div>
        </div>

        {/* Before Image (Foreground, clipped) */}
        <div
          className="absolute inset-0 max-w-full"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src="/images/before-edit-600.png"
            alt="Original casual photo"
            fill
            className="object-cover filter blur-[2px] opacity-90 transition-all duration-300 group-hover:blur-none group-hover:opacity-100"
          />
          <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-0">
            Original Selfie
          </div>
        </div>

        {/* Slider Handle (Visuals) */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.6)] z-10 pointer-events-none"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100 transition-transform group-hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M15 18l6-6-6-6" />
              <path d="M9 18l-6-6 6-6" />
            </svg>
          </div>
        </div>

        {/* Invisible Input for Accessibility & Touch control */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
          aria-label="Compare before and after images"
        />
      </div>
      
      <p className="mt-6 text-sm font-medium text-slate-500 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full hidden sm:inline-flex items-center gap-2">
        <MoveHorizontal className="w-4 h-4 text-blue-600" />
        <span>Drag the slider to compare before and after editing</span>
      </p>
    </div>
  );
}
