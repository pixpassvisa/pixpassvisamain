"use client";

import { useState } from "react";
import { fr } from "../translations";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-amber-400 text-sm">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-300 fill-current"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsFr() {
  const [visibleCount, setVisibleCount] = useState(4);
  const testimonials = fr.testimonials;
  const displayed = testimonials.slice(0, visibleCount);

  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Témoignages</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Utilisé par des milliers de personnes dans le monde</h2>
          <p className="mt-3 text-slate-500">Découvrez ce que nos utilisateurs disent de leur expérience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayed.map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <div>
                <StarRating rating={5} />
                <p className="mt-4 text-gray-600 line-clamp-4 italic text-sm">&quot;{review.text}&quot;</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{review.country} • {review.date}</div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs uppercase">
                  {review.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleCount < testimonials.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleCount((p) => Math.min(p + 4, testimonials.length))}
              className="px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              {fr.buttons.loadMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
