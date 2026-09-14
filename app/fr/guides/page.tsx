import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";
import { Ruler, ImageIcon, Home, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides Photo d'Identité — Conseils et Tutoriels | PixPassVisa",
  description: "Guides complets pour des photos d'identité conformes : tailles, arrière-plans, astuces pour photos maison. Tout savoir pour réussir vos photos passeport et visa.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/guides",
    languages: {
      en: "https://www.pixpassvisa.com/blog",
      fr: "https://www.pixpassvisa.com/fr/guides",
      de: "https://www.pixpassvisa.com/de/guides",
      "x-default": "https://www.pixpassvisa.com/blog",
    },
  },
  openGraph: { title: "Guides Photo d'Identité | PixPassVisa", description: "Guides complets photo passeport et visa.", url: "https://www.pixpassvisa.com/fr/guides", siteName: "PixPassVisa", locale: "fr_FR", type: "website" },
  twitter: {
    card: "summary_large_image",
    title: "Guides Photo d'Identité | PixPassVisa",
    description: "Guides complets photo passeport et visa.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guides Photo d'Identité",
  description: "Collection de guides pour des photos d'identité conformes.",
  url: "https://www.pixpassvisa.com/fr/guides",
  inLanguage: "fr",
};

const guides = [
  { href: "/fr/guides/passport-photo-size", icon: Ruler, title: fr.guides.size.title, desc: fr.guides.size.description },
  { href: "/fr/guides/passport-photo-background", icon: ImageIcon, title: fr.guides.background.title, desc: fr.guides.background.description },
  { href: "/fr/guides/how-to-take-passport-photo-at-home", icon: Home, title: fr.guides.howTo.title, desc: fr.guides.howTo.description },
  { href: "/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa", icon: FileText, title: fr.guides.franceGuide.title, desc: fr.guides.franceGuide.description },
];

export default function GuidesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Guides", href: "/fr/guides" }]} />
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#f8faf9] to-white">
        <div className="max-w-3xl mx-auto px-4 text-center mb-12">
          <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Ressources</span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">{fr.guides.index.title}</h1>
          <p className="text-slate-500 mt-3 text-lg">{fr.guides.index.subtitle}</p>
        </div>
        <div className="max-w-4xl mx-auto px-4 grid gap-6">
          {guides.map((g, i) => {
            const Icon = g.icon;
            return (
              <Link key={i} href={g.href} className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{g.title}</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{g.desc}</p>
                  <span className="inline-flex items-center text-sm font-bold text-blue-600 mt-3 group-hover:gap-2 transition-all">
                    <span>Lire le guide</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

