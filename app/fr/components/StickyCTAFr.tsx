import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StickyCTAFr({ ctaText = "Créer votre photo maintenant", ctaHref = "/fr/passport-photo-online", countryName }: { ctaText?: string; ctaHref?: string; countryName?: string }) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none">
      <Link
        href={ctaHref}
        className="pointer-events-auto flex items-center justify-between w-full bg-slate-900 text-white p-2.5 pl-6 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all border border-slate-700 hover:-translate-y-1 transform group"
      >
        <div className="flex flex-col">
          <span className="font-bold text-sm">{countryName ? `Commencer votre photo — ${countryName}` : ctaText}</span>
          <span className="text-[10px] text-slate-400 font-medium">Cliquez ici pour commencer</span>
        </div>
        <span className="relative bg-blue-600 group-hover:bg-blue-700 transition-colors px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-1.5 overflow-hidden">
          <span className="relative z-10">Gratuit</span>
          <ArrowRight className="w-4 h-4 relative z-10" />
          <span className="absolute inset-0 bg-white/10 animate-pulse" />
        </span>
      </Link>
    </div>
  );
}

