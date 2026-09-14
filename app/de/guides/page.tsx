import type { Metadata } from "next";
import Link from "next/link";
import { getAllGermanGuides } from "@/lib/de-guides";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ratgeber & Anleitungen für Passbilder, Visumfotos & Bewerbungsfotos",
  description:
    "Ausführliche deutsche Anleitungen, Bestimmungen & Tipps für biometrische Passbilder, US Visumfotos, Bewerbungsfotos & Dokumente in Deutschland, Österreich & Schweiz.",
  keywords: [
    "Passbild Ratgeber",
    "Biometrisches Passbild Anleitung",
    "Visum Foto Vorgaben",
    "Bewerbungsfoto Tipps",
    "Passfoto Schablone Deutschland",
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/guides",
    languages: {
      en: "https://www.pixpassvisa.com/blog",
      fr: "https://www.pixpassvisa.com/fr/guides",
      de: "https://www.pixpassvisa.com/de/guides",
      "x-default": "https://www.pixpassvisa.com/blog",
    },
  },
  openGraph: {
    title: "PixPassVisa Ratgeber | Biometrische Passbilder & Visumfotos",
    description: "Schritt-für-Schritt Anleitungen und behördliche Vorgaben für Pass- und Visumfotos.",
    url: "https://www.pixpassvisa.com/de/guides",
    siteName: "PixPassVisa",
    locale: "de_DE",
    type: "website",
  },
};

export default function GermanGuidesHubPage() {
  const guides = getAllGermanGuides();
  const featuredGuide = guides[0];
  const remainingGuides = guides.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PixPassVisa Passbild & Visum Ratgeber",
    description: "Informationen und Anleitungen zu biometrischen Passbildern und Visumfotos.",
    url: "https://www.pixpassvisa.com/de/guides",
    isPartOf: {
      "@type": "WebSite",
      name: "PixPassVisa",
      url: "https://www.pixpassvisa.com/de",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Startseite",
          item: "https://www.pixpassvisa.com/de",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ratgeber",
          item: "https://www.pixpassvisa.com/de/guides",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white text-slate-900 min-h-screen pt-8 pb-24 relative">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-100/40 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/de" className="hover:text-blue-700 transition-colors">
              Startseite
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">Ratgeber & Guides</span>
          </nav>

          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/70 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-6 ">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Offizielle Vorgaben & Praxis-Tipps 2026
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              Ihr Experten-Ratgeber für <br />
              <span className="text-blue-600">
                Passbilder & Visumfotos
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Erfahren Sie alles über Fotomuster-Schablonen, Maße, behördliche Vorschriften für Deutschland, die USA und weltweit sowie wertvolle Tipps für Ihr Bewerbungsfoto.
            </p>
          </div>

          {/* Featured Guide (Hero Card) */}
          {featuredGuide && (
            <div className="mb-16">
              <div className="group relative bg-white border border-slate-200 hover:border-blue-500 rounded-3xl overflow-hidden  hover: transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-600 text-white px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ">
                        {featuredGuide.category}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{featuredGuide.readingTime}</span>
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-4">
                      <Link href={`/de/guides/${featuredGuide.slug}`}>
                        {featuredGuide.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                      {featuredGuide.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-black flex items-center justify-center text-sm border border-blue-200">
                        PX
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{featuredGuide.author}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{featuredGuide.date}</p>
                      </div>
                    </div>
                    <Link
                      href={`/de/guides/${featuredGuide.slug}`}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                    >
                      <span>Jetzt lesen</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5 bg-slate-100 min-h-[280px] lg:min-h-full relative overflow-hidden flex items-center justify-center">
                  <img
                    src={featuredGuide.image}
                    alt={featuredGuide.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Grid of Remaining Guides */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              Weitere Ratgeber & Anleitungen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingGuides.map((guide) => (
                <article
                  key={guide.slug}
                  className="group bg-white border border-slate-200/90 hover:border-blue-500 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative bg-slate-100">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-full ">
                        {guide.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{guide.readingTime}</span>
                        </span>
                        <span>•</span>
                        <span>{guide.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2">
                        <Link href={`/de/guides/${guide.slug}`}>{guide.title}</Link>
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={`/de/guides/${guide.slug}`}
                      className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors gap-1.5 group-hover:translate-x-1 duration-200"
                    >
                      <span>Artikel lesen</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Conversion CTA Box */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black mb-3">
                Bereit für Ihr konformes Passfoto?
              </h3>
              <p className="text-slate-300 font-medium text-base sm:text-lg">
                Erstellen Sie Ihr biometrisches Passbild oder Visumfoto direkt online. Mit Smartphone-Foto, KI-Prüfung & Konformitäts-Garantie.
              </p>
            </div>
            <Link
              href="/de/passbild-online"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-2xl text-base transition-all whitespace-nowrap shrink-0"
            >
              Jetzt Foto erstellen →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

