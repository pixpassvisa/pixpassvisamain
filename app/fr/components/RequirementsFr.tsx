import { Info } from "lucide-react";
import { fr } from "../translations";

export default function RequirementsFr({ countryName, specs }: { countryName?: string; specs?: { label: string; value: string; detail: string }[] }) {
  const t = fr.requirements;
  const displaySpecs = specs || t.specs;

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{t.sectionLabel}</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3">
            {countryName ? `Exigences techniques officielles — ${countryName}` : t.title}
          </h2>
          <p className="text-sm lg:text-base text-slate-500 max-w-lg mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {displaySpecs.map((spec, i) => (
            <div key={i} className="border-2 border-slate-100 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
              <p className="text-lg font-extrabold text-blue-600 mb-1">{spec.value}</p>
              <p className="text-xs text-slate-500">{spec.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-blue-50/70 border border-blue-200 rounded-2xl p-5 flex gap-3 items-start">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shrink-0 text-white">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm mb-1">{t.note.title}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{t.note.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

