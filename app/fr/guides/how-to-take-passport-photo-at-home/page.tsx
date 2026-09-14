import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../../components/BreadcrumbsFr";
import FaqSectionFr from "../../components/FaqSectionFr";
import StickyCTAFr from "../../components/StickyCTAFr";
import { Lightbulb, ImageIcon, Smile, Camera, CheckCircle2, Smartphone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Comment Prendre une Photo Passeport à la Maison | PixPassVisa",
  description: "Guide étape par étape pour prendre une photo passeport professionnelle chez vous avec votre téléphone.",
  keywords: ["photo passeport maison", "prendre photo identité téléphone", "photo passeport smartphone"],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/guides/how-to-take-passport-photo-at-home",
    languages: {
      fr: "https://www.pixpassvisa.com/fr/guides/how-to-take-passport-photo-at-home",
      "x-default": "https://www.pixpassvisa.com/fr/guides/how-to-take-passport-photo-at-home",
    },
  },
  openGraph: { title: "Comment Prendre une Photo Passeport à la Maison | PixPassVisa", url: "https://www.pixpassvisa.com/fr/guides/how-to-take-passport-photo-at-home", locale: "fr_FR", type: "article" },
  twitter: {
    card: "summary_large_image",
    title: "Comment Prendre une Photo Passeport à la Maison | PixPassVisa",
    description: "Guide étape par étape pour prendre une photo passeport avec votre téléphone.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const howToFaqs = [
  { q: "Quel téléphone utiliser ?", a: "Tout smartphone récent (iPhone, Samsung, etc.) avec un appareil photo de 8MP+ suffit." },
  { q: "Faut-il un trépied ?", a: "Pas obligatoire, mais recommandé. Demandez à quelqu'un de vous photographier." },
  { q: "Quelle distance entre le sujet et l'appareil ?", a: "Entre 1 et 1,5 mètre pour un bon cadrage naturel." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "HowTo", name: "Prendre une photo passeport à la maison", inLanguage: "fr",
      step: [
        { "@type": "HowToStep", name: "Préparer l'éclairage", text: "Placez-vous face à une fenêtre pour un éclairage naturel." },
        { "@type": "HowToStep", name: "Choisir le fond", text: "Utilisez un mur blanc uni." },
        { "@type": "HowToStep", name: "Positionnement", text: "Regardez directement l'objectif, expression neutre." },
        { "@type": "HowToStep", name: "Prendre la photo", text: "Photographiez à 1-1,5m de distance." },
        { "@type": "HowToStep", name: "Traiter avec PixPassVisa", text: "Uploadez sur PixPassVisa pour le traitement." },
      ],
    },
  ],
};

const steps = [
  { num: "01", title: "Préparez l'éclairage", desc: "Placez-vous face à une fenêtre pour un éclairage naturel et uniforme. Évitez le soleil direct et les néons.", icon: Lightbulb },
  { num: "02", title: "Choisissez un fond blanc", desc: "Utilisez un mur blanc ou accrochez un drap blanc. Éloignez-vous d'au moins 1m pour éviter les ombres.", icon: ImageIcon },
  { num: "03", title: "Positionnez-vous", desc: "Regardez directement l'objectif. Expression neutre, bouche fermée, yeux ouverts. Pas de lunettes ni couvre-chef.", icon: Smile },
  { num: "04", title: "Prenez la photo", desc: "Demandez à quelqu'un de vous photographier à 1-1,5m. Utilisez le mode photo standard (pas portrait). Cadrez des épaules au-dessus de la tête.", icon: Camera },
  { num: "05", title: "Traitez avec PixPassVisa", desc: "Téléchargez votre photo sur PixPassVisa. L'outil corrige automatiquement le fond, calibre les dimensions et vérifie la conformité.", icon: CheckCircle2 },
];

export default function HowToTakePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }, { label: "Photo à la maison", href: "/fr/guides/how-to-take-passport-photo-at-home" }]} />
      <article className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">Comment Prendre une Photo Passeport à la Maison</h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">Suivez ces 5 étapes simples pour obtenir une photo passeport professionnelle depuis votre domicile.</p>

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-5 items-start bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-blue-600">ÉTAPE {step.num}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4 flex items-center gap-2.5">
            <Smartphone className="w-6 h-6 text-blue-600 shrink-0" />
            <span>Réglages recommandés</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { label: "Mode", value: "Photo standard" },
              { label: "Flash", value: "Désactivé" },
              { label: "Résolution", value: "Maximum" },
              { label: "HDR", value: "Désactivé" },
              { label: "Filtre", value: "Aucun" },
              { label: "Ratio", value: "4:3 ou 1:1" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{s.label}</p>
                <p className="text-sm font-bold text-slate-900">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 text-center mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Prêt à créer votre photo ?</h3>
            <p className="text-sm text-slate-600 mb-4">Téléchargez votre photo et obtenez un résultat conforme en 30 secondes.</p>
            <Link href="/fr/passport-photo-online" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg">
              <span>Commencer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
      <FaqSectionFr faqs={howToFaqs} title="Questions fréquentes" />
      <StickyCTAFr />
    </>
  );
}

