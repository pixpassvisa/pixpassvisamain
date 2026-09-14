"use client";

import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

interface Category {
  name: string;
  faqs: FAQ[];
}

export default function FaqCategorySection({ categories }: { categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === i
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {categories[activeCategory].faqs.map((faq, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-xl group">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-sm font-semibold text-slate-900 pr-4">{faq.q}</span>
                <svg className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
