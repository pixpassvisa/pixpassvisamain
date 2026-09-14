"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CountrySpec } from "@/lib/specs";
import { getCanonicalSlug, getShortId } from "@/lib/slug-utils";

interface MasterDirectoryProps {
  title: string;
  subtitle: string;
  specs: CountrySpec[];
  type: "passport" | "visa";
}

export default function MasterDirectory({ title, subtitle, specs, type }: MasterDirectoryProps) {
  const [search, setSearch] = useState("");

  const filteredSpecs = useMemo(() => {
    return specs.filter(s => 
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [specs, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          {title}
        </h1>
        <h2 className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          {subtitle}
        </h2>
        
        <div className="mt-10 max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search country (e.g. India, UK, USA)..."
            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all pr-12 text-slate-900 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSpecs.map((spec) => {
          // Dual-Coverage: Generate the slug based on the directory type (passport or visa)
          const countryBase = spec.country.toLowerCase().replace(/\s+/g, "-");
          const normalizedBase = getShortId(countryBase);
          
          const href = `/${normalizedBase}-${type}-photo-editor`;

          return (
            <Link 
              key={`${spec.id}-${type}`}
              href={href}
              className="group bg-white rounded-3xl border border-slate-100 p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl leading-none">{spec.flag}</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {spec.country}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-4">
                {spec.name.replace(spec.country, "").trim()}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-500">{spec.width_mm}x{spec.height_mm}mm</span>
                <span className="text-xs font-bold text-emerald-600">Free Check →</span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredSpecs.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
           <p className="text-slate-500 font-medium">No countries found matching "{search}"</p>
           <button onClick={() => setSearch("")} className="mt-4 text-blue-600 font-bold hover:underline">Clear search</button>
        </div>
      )}
    </div>
  );
}
