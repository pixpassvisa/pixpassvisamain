"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Check, X, Info } from "lucide-react";
import { photoGuidelinesData, GuidelineCategory, GuidelineExample } from "@/app/utils/guidelinesData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoGuidelinesModal({ isOpen, onClose }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(photoGuidelinesData[0].id);
  const [activeExampleId, setActiveExampleId] = useState<string>(photoGuidelinesData[0].examples[0].id);

  if (!isOpen) return null;

  const activeCategory = photoGuidelinesData.find(c => c.id === activeCategoryId)!;
  const activeExample = activeCategory.examples.find(e => e.id === activeExampleId)!;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-5xl h-[80vh] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 bg-slate-900 border border-slate-800 text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button absolute top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-slate-800/80 text-slate-300 rounded-full hover:bg-slate-700 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- Sidebar (Categories) --- */}
        <div className="w-full md:w-1/3 shrink-0 bg-slate-950 overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col border-b md:border-b-0 md:border-r border-slate-800 scrollbar-hide">
          <div className="p-4 border-b border-slate-800 hidden md:block">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Guidelines</h3>
          </div>
          {photoGuidelinesData.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                if (category.examples.length > 0) {
                  setActiveExampleId(category.examples[0].id);
                }
              }}
              className={`text-left p-3.5 md:p-4 whitespace-nowrap md:whitespace-normal border-r md:border-r-0 md:border-b border-slate-800/60 transition-colors text-sm font-semibold ${
                activeCategoryId === category.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* --- Main Content Area --- */}
        <div className="w-full md:w-2/3 flex flex-col bg-slate-900 text-white">

          {/* Top: Active Image & Details */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 overflow-y-auto">
            {/* Image Box */}
            <div className="relative shrink-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={activeExample.src}
                  alt={activeExample.description}
                  fill
                  className={`object-cover transition-all duration-300 ${activeExample.imageClassName || ""}`}
                />
              </div>
              
              {/* Overlay Check/Cross */}
              <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full p-2 translate-x-1 translate-y-1 flex items-center justify-center shadow-lg ${
                activeExample.isAcceptable ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
              }`}>
                {activeExample.isAcceptable ? <Check className="w-6 h-6 stroke-[3]" /> : <X className="w-6 h-6 stroke-[3]" />}
              </div>
            </div>

            {/* Description Text */}
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  activeExample.isAcceptable ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}>
                  {activeExample.isAcceptable ? "Acceptable Standard" : "Non-Compliant"}
                </span>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-slate-200">
                {activeExample.description}
              </p>
              {activeExample.tip && (
                <div className="mt-4 p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-sm leading-relaxed flex items-start gap-3 text-slate-300">
                  <Camera className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <p>{activeExample.tip}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom: Thumbnail Gallery */}
          <div className="h-24 sm:h-28 md:h-32 bg-slate-950 p-3 md:p-4 flex items-center justify-start gap-3 overflow-x-auto border-t border-slate-800">
            {activeCategory.examples.map(ex => (
              <button
                key={ex.id}
                onClick={() => setActiveExampleId(ex.id)}
                className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-slate-800 rounded-lg overflow-hidden transition-all ${
                  activeExampleId === ex.id
                    ? "ring-2 ring-blue-500 z-10 scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={ex.src}
                  alt="Thumbnail"
                  fill
                  sizes="80px"
                  className={`object-cover ${ex.imageClassName || ""}`}
                />

                {/* Mini overlay Check/Cross */}
                <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center shadow ${
                  ex.isAcceptable ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                }`}>
                  {ex.isAcceptable ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
