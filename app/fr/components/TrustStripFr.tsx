import { fr } from "../translations";

export default function TrustStripFr() {
  return (
    <section className="bg-slate-900 py-5">
      <div className="max-w-5xl mx-auto px-4 flex gap-6 flex-wrap justify-center">
        {fr.stats.map((s, i) => (
          <div key={i} className="text-center min-w-[80px]">
            <div className="text-xl lg:text-2xl font-extrabold text-cyan-400 tracking-tight">{s.stat}</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-semibold uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
