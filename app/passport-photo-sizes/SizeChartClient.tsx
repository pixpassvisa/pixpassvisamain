"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Globe, ArrowRight, ShieldCheck, Download, Filter } from "lucide-react";
import { CountrySpec } from "@/lib/specs";

interface SizeChartClientProps {
  specs: CountrySpec[];
}

export default function SizeChartClient({ specs }: SizeChartClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");

  const filteredSpecs = useMemo(() => {
    return specs.filter((spec) => {
      const matchSearch =
        spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        spec.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${spec.width_mm}x${spec.height_mm}`.includes(searchTerm.toLowerCase()) ||
        `${spec.width_px}x${spec.height_px}`.includes(searchTerm.toLowerCase());

      if (filterRegion === "all") return matchSearch;
      if (filterRegion === "2x2") {
        return matchSearch && (spec.width_mm === 51 || spec.width_mm === "51" || spec.id.includes("us-") || spec.id.includes("in-oci"));
      }
      if (filterRegion === "35x45") {
        return matchSearch && (spec.width_mm === 35 || spec.width_mm === "35");
      }
      if (filterRegion === "50x70") {
        return matchSearch && (spec.width_mm === 50 || spec.width_mm === "50");
      }
      return matchSearch;
    });
  }, [specs, searchTerm, filterRegion]);

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search country, mm or px size..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800"
          />
        </div>

        {/* Quick Size Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Quick Filter:
          </span>
          {[
            { id: "all", label: "All (50+)" },
            { id: "35x45", label: "35×45 mm (UK/EU/AU)" },
            { id: "2x2", label: "2×2 in (51×51 mm US/OCI)" },
            { id: "50x70", label: "50×70 mm (Canada)" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterRegion(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterRegion === pill.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredSpecs.length}</strong> official country specifications
        </span>
        <span>Requirements updated for 2026/2027</span>
      </div>

      {/* Interactive Specs Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">Country &amp; Document</th>
                <th className="py-3.5 px-4">Print Size (mm / in)</th>
                <th className="py-3.5 px-4">Digital Size (px @ 300 DPI)</th>
                <th className="py-3.5 px-4">Head Height</th>
                <th className="py-3.5 px-4">Background</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSpecs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    No specifications match your search query "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filteredSpecs.map((spec) => {
                  const isInch = spec.width_mm === 51 || spec.width_mm === "51";
                  return (
                    <tr
                      key={spec.id}
                      className="hover:bg-blue-50/40 transition-colors group"
                    >
                      {/* Country & Flag */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl" role="img" aria-label={spec.country}>
                            {spec.flag || "🌐"}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors block">
                              {spec.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              ID: {spec.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Physical Dimensions */}
                      <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs">
                          {spec.width_mm} × {spec.height_mm} mm
                        </span>
                        {isInch && (
                          <span className="text-[11px] text-slate-500 block mt-0.5 font-sans">
                            (2 × 2 inches)
                          </span>
                        )}
                      </td>

                      {/* Digital Dimensions */}
                      <td className="py-3.5 px-4 text-slate-700 font-mono text-xs whitespace-nowrap">
                        {spec.width_px} × {spec.height_px} px
                      </td>

                      {/* Head Percentage */}
                      <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">
                          {spec.head_min_pct}% – {spec.head_max_pct}%
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          of total height
                        </span>
                      </td>

                      {/* Background Color */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 capitalize">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-slate-300"
                            style={{
                              backgroundColor:
                                spec.bg_color === "white"
                                  ? "#ffffff"
                                  : spec.bg_color === "light-gray"
                                  ? "#e2e8f0"
                                  : spec.bg_color === "light-blue"
                                  ? "#bae6fd"
                                  : "#ffffff",
                            }}
                          />
                          {spec.bg_color.replace("-", " ")}
                        </span>
                      </td>

                      {/* Action CTA */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/passport-photo-online?type=${spec.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-all shadow-2xs"
                        >
                          <span>Make Photo</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
