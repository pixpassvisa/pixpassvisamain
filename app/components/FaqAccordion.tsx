"use client";

import { useState } from "react";

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-100 rounded-xl sm:rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-sm transition-shadow">
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 text-left focus:outline-none group"
          >
            <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors pr-4 lg:pr-8 leading-tight">
              {faq.q}
            </span>
            <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
              openIndex === i ? "bg-blue-600 text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-blue-50/70 group-hover:text-blue-600"
            }`}>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </div>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openIndex === i ? "max-h-[500px] opacity-100 border-t border-slate-50" : "max-h-0 opacity-0"
          }`}>
            <div className="p-4 sm:p-5 lg:p-6 text-gray-500 text-xs sm:text-sm leading-relaxed bg-slate-50/30">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
