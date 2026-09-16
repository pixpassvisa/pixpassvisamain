import React from "react";
import { ShieldCheck, ExternalLink } from "lucide-react";
import Link from "next/link";

interface OfficialSource {
  name: string;
  url: string;
  authority: string;
}

interface OfficialSourceBadgeProps {
  sources?: OfficialSource[];
  lastReviewedDate?: string;
  documentType?: string;
}

export default function OfficialSourceBadge({
  sources = [
    {
      name: "ICAO Doc 9303 (Machine Readable Travel Documents)",
      url: "https://www.icao.int/publications/doc-series/doc-9303",
      authority: "International Civil Aviation Organization",
    },
    {
      name: "ISO/IEC 19794-5 (Biometric Data Interchange Formats)",
      url: "https://www.iso.org/standard/50864.html",
      authority: "ISO Biometrics Standards",
    },
  ],
  lastReviewedDate = "September 2026",
  documentType = "Passport & Visa Photo Requirements",
}: OfficialSourceBadgeProps) {
  return (
    <section className="my-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              Official Compliance &amp; Verification Layer
            </h3>
            <p className="text-xs text-slate-500">
              Verified for accuracy against official standards &bull; Last reviewed:{" "}
              <span className="font-semibold text-slate-700">{lastReviewedDate}</span>
            </p>
          </div>
        </div>

        <Link
          href="/editorial-methodology"
          className="text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
        >
          Our Verification Methodology &rarr;
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
        PixPassVisa is an <strong>independent photo checking and compliance tool</strong>. We analyze head dimensions, background uniformity, eye alignment, and lighting against official regulatory specifications published by government and international authorities:
      </p>

      <div className="grid sm:grid-cols-2 gap-2.5">
        {sources.map((src, idx) => (
          <a
            key={idx}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group"
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-800 tracking-wider block">
                {src.authority}
              </span>
              <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-1">
                {src.name}
              </span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
          </a>
        ))}
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          Disclaimer: Requirements are subject to change by issuing authorities. Users should confirm final submission requirements with their respective consulate or agency.
        </span>
      </div>
    </section>
  );
}
