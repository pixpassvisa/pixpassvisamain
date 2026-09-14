import Link from "next/link";
import { fr } from "../translations";
import { Upload, Zap, FileText, CreditCard, Download } from "lucide-react";

const stepIcons = [Upload, Zap, FileText, CreditCard, Download];

export default function HowItWorksFr() {
  const t = fr.howItWorks;
  return (
    <section className="py-16 lg:py-20 bg-[#f8faf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{t.sectionLabel}</span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3">{t.title}</h2>
          <p className="text-sm lg:text-base text-slate-500 max-w-lg mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.steps.map((step, i) => {
            const Icon = stepIcons[i] || Zap;
            return (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-2 right-3 text-4xl font-black text-slate-100 pointer-events-none">{step.num}</div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-blue-600 ${i >= 2 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/fr/passport-photo-online"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1 text-sm"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

