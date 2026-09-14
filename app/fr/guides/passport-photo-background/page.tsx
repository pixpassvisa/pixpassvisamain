import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";
import { Palette, AlertTriangle, X, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Fond Photo Passeport : Règles et Astuces 2026 | PixPassVisa",
  description: "Apprenez les règles d'arrière-plan pour les photos passeport. Couleur, éclairage, ombres — tout pour un fond conforme.",
  keywords: ["fond photo passeport", "arrière-plan photo identité", "fond blanc photo"],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/guides/passport-photo-background",
    languages: {
      fr: "https://www.pixpassvisa.com/fr/guides/passport-photo-background",
      "x-default": "https://www.pixpassvisa.com/fr/guides/passport-photo-background",
    },
  },
  openGraph: { title: "Fond Photo Passeport : Règles et Astuces | PixPassVisa", url: "https://www.pixpassvisa.com/fr/guides/passport-photo-background", locale: "fr_FR", type: "article" },
  twitter: {
    card: "summary_large_image",
    title: "Fond Photo Passeport : Règles et Astuces | PixPassVisa",
    description: "Apprenez les règles d'arrière-plan pour les photos passeport.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const bgFaqs = [
  { q: "Quelle couleur de fond pour une photo passeport ?", a: "En France et dans la plupart des pays, le fond doit être blanc uni ou gris très clair." },
  { q: "Comment obtenir un fond blanc chez soi ?", a: "Utilisez un mur blanc ou un drap blanc. Tenez-vous à 1m du fond pour éviter les ombres." },
  { q: "PixPassVisa peut-il corriger le fond automatiquement ?", a: "Oui ! Notre IA supprime l'arrière-plan et le remplace par un fond blanc conforme." },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Article", headline: "Fond Photo Passeport : Règles et Astuces", inLanguage: "fr" },
  ],
};

const bgRules = [
  { country: "France", color: "Blanc ou gris clair", detail: "Uni, sans motif" },
  { country: "États-Unis", color: "Blanc pur", detail: "Pas d'ombres" },
  { country: "Royaume-Uni", color: "Gris clair", detail: "Ton neutre, uni" },
  { country: "Allemagne", color: "Gris clair uni", detail: "Pas de blanc pur" },
  { country: "Canada", color: "Blanc uni", detail: "Aucune ombre" },
  { country: "Inde", color: "Blanc uni", detail: "Passeport et visa" },
];

export default function PassportPhotoBackgroundPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }, { label: "Fond photo", href: "/fr/guides/passport-photo-background" }]} />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Fond Photo Passeport : Règles et Astuces</h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">L&apos;arrière-plan est l&apos;une des premières raisons de rejet. Voici tout ce qu&apos;il faut savoir.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-2.5">
            <Palette className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Couleurs par pays</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Pays</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Couleur</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">Détail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bgRules.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.country}</td>
                    <td className="px-4 py-3 font-bold text-blue-600">{row.color}</td>
                    <td className="px-4 py-3 text-slate-500">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-2.5">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <span>Erreurs courantes</span>
          </h2>
          <div className="grid gap-3 mb-8">
            {[
              { err: "Ombres sur le fond", fix: "Éloignez-vous du mur (1m min.)" },
              { err: "Fond texturé ou coloré", fix: "Utilisez un mur blanc lisse" },
              { err: "Objets visibles", fix: "Fond dégagé, rien en arrière-plan" },
              { err: "Reflets ou taches", fix: "Préférez un fond mat" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-red-50/50 rounded-2xl p-4 border border-red-100/50 items-start">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.err}</h3>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item.fix}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 text-center mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Correction automatique du fond</h3>
            <p className="text-sm text-slate-600 mb-4">Notre outil supprime et remplace votre arrière-plan automatiquement.</p>
            <Link href="/fr/passport-photo-online" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg">
              <span>Corriger mon arrière-plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
      <FaqSectionFr faqs={bgFaqs} title="Questions fréquentes — Fond photo" />
      <StickyCTAFr />
    </>
  );
}

