import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface DirectAnswerBoxProps {
  question: string;
  answer: string;
  keyPoints?: string[];
  lastReviewed?: string;
  sourceAuthority?: string;
}

export default function DirectAnswerBox({
  question,
  answer,
  keyPoints = [],
  lastReviewed = "September 2026",
  sourceAuthority = "Official Government Specifications",
}: DirectAnswerBoxProps) {
  return (
    <aside aria-label="Quick Answer Summary" className="my-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/40 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="inline-flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900">
            Quick Answer &amp; Requirements Summary
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          Verified: <strong className="text-slate-700">{lastReviewed}</strong>
        </span>
      </div>

      <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
        {question}
      </h2>

      <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3">
        {answer}
      </p>

      {keyPoints.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-2 pt-2 border-t border-blue-100/80">
          {keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3.5 pt-2.5 border-t border-blue-100/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
        <span>
          Source standard: <strong className="text-slate-700">{sourceAuthority}</strong>
        </span>
        <span className="text-slate-400">Independent verification tool</span>
      </div>
    </aside>
  );
}
