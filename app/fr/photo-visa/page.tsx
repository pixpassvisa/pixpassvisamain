import type { Metadata } from "next";
import HeroSectionFr from "../components/HeroSectionFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import Link from "next/link";
import FaqSectionFr from "../components/FaqSectionFr";
import { fr } from "../translations";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Photo Visa en Ligne — Tous Pays & Types de Visa | PixPassVisa",
  description:
    "Créez une photo visa conforme pour Schengen, États-Unis, Canada, Australie et plus de 50 pays. Vérification biométrique IA instantanée.",

  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/photo-visa",
    languages: {
      en: "https://www.pixpassvisa.com/visa-photo",
      fr: "https://www.pixpassvisa.com/fr/photo-visa",
      de: "https://www.pixpassvisa.com/de/visum-foto",
      "x-default": "https://www.pixpassvisa.com/visa-photo",
    },
  },
  openGraph: {
    title: "Photo Visa en Ligne | PixPassVisa",
    description:
      "Photo visa conforme pour tous les pays. Vérification biométrique IA.",
    url: "https://www.pixpassvisa.com/fr/photo-visa",
    siteName: "PixPassVisa",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Photo Visa en Ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Visa en Ligne | PixPassVisa",
    description:
      "Photo visa conforme pour tous les pays. Vérification biométrique IA.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PixPassVisa — Photo Visa",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "All",
      inLanguage: "fr",
      offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" },
    },
  ],
};

const countries = [
  {
    flag: "🇺🇸",
    name: "États-Unis",
    size: "51×51mm",
    type: "us-visa",
    desc: "DS-160, Green Card, B1/B2",
  },
  {
    flag: "🇪🇺",
    name: "Schengen",
    size: "35×45mm",
    type: "france-visa",
    desc: "Tourisme, affaires, études",
  },
  {
    flag: "🇨🇦",
    name: "Canada",
    size: "35×45mm",
    type: "canada-visa",
    desc: "Visa visiteur, ETA, RP",
  },
  {
    flag: "🇬🇧",
    name: "Royaume-Uni",
    size: "35×45mm",
    type: "uk-visa",
    desc: "Visa touriste, travail, études",
  },
  {
    flag: "🇦🇺",
    name: "Australie",
    size: "35×45mm",
    type: "australia-visa",
    desc: "ETA, visa travail",
  },
  {
    flag: "🇮🇳",
    name: "Inde",
    size: "51×51mm",
    type: "india-visa",
    desc: "e-Visa, visa touriste",
  },
  {
    flag: "🇯🇵",
    name: "Japon",
    size: "35×45mm",
    type: "japan-visa",
    desc: "Visa touriste, travail",
  },
  {
    flag: "🇨🇳",
    name: "Chine",
    size: "33×48mm",
    type: "china-visa",
    desc: "Visa touriste, affaires",
  },
];

export default function PhotoVisaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbsFr
        items={[{ label: "Photo Visa", href: "/fr/photo-visa" }]}
      />

      <HeroSectionFr
        title={fr.hero.visa.title}
        subtitle={fr.hero.visa.subtitle}
        description={fr.hero.visa.description}
        ctaHref="/fr/passport-photo-online"
        showImage={true}
      />

      {/* Country selector */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
              Choisir un pays
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Sélectionnez votre destination
            </h2>
            <p className="text-slate-500 mt-2">
              Cliquez sur un pays pour créer votre photo visa conforme
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map((c, i) => (
              <Link
                key={i}
                href={`/fr/passport-photo-online?type=${c.type}`}
                className="group bg-white p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-400 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-center"
              >
                <span className="text-3xl block mb-2">{c.flag}</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                  {c.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">{c.size}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT BLOCK */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Photo visa en ligne conforme pour tous les pays
        </h2>

        <p className="mb-4">
          Obtenir une photo visa conforme est une étape essentielle pour toute
          demande de visa international. Chaque pays impose des règles strictes
          concernant les dimensions, le fond, l'expression du visage et la
          qualité de l'image. Avec PixPassVisa, vous pouvez créer une photo visa
          en ligne conforme aux exigences officielles en quelques secondes
          seulement, sans vous déplacer chez un photographe.
        </p>

        <p className="mb-4">
          Notre outil intelligent utilise une technologie avancée de détection
          faciale pour ajuster automatiquement votre photo selon les normes du
          pays sélectionné. Que vous demandiez un visa Schengen, américain,
          canadien ou australien, vous obtenez un résultat précis et prêt à être
          soumis.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Pourquoi créer votre photo visa en ligne ?
        </h2>

        <p className="mb-4">
          Les méthodes traditionnelles peuvent être coûteuses et chronophages.
          Les cabines photo ne garantissent pas toujours la conformité, ce qui
          peut entraîner un refus de votre dossier. En utilisant un outil en
          ligne, vous gagnez du temps et évitez les erreurs grâce à une
          validation automatique.
        </p>

        <ul className="space-y-2 mb-4">
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Disponible 24h/24 depuis votre téléphone ou ordinateur</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Ajustement automatique aux normes officielles</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Économie de temps et d'argent</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Téléchargement instantané</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Exigences des photos visa selon les pays
        </h2>

        <p className="mb-4">
          Les exigences varient selon la destination. Par exemple, une photo
          visa pour les États-Unis doit être au format 51×51 mm, tandis que la
          plupart des pays européens exigent un format 35×45 mm. Certains pays
          comme la Chine ont des dimensions spécifiques comme 33×48 mm.
        </p>

        <p className="mb-4">En plus des dimensions, les règles incluent :</p>

        <ul className="list-disc pl-6 mb-4">
          <li>Fond clair et uniforme (blanc ou gris)</li>
          <li>Visage centré et clairement visible</li>
          <li>Expression neutre sans sourire</li>
          <li>Pas d'accessoires comme lunettes ou chapeaux</li>
          <li>Bonne luminosité sans ombres</li>
        </ul>

        <p className="mb-4">
          PixPassVisa applique automatiquement toutes ces règles pour garantir
          une conformité maximale.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Comment créer une photo visa en ligne ?
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">1. Prenez une photo</h3>
        <p className="mb-3">
          Utilisez votre smartphone avec un bon éclairage naturel et un fond
          simple. Évitez les ombres et assurez-vous que votre visage est bien
          visible.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          2. Importez votre image
        </h3>
        <p className="mb-3">
          Téléchargez votre photo sur PixPassVisa. L'outil détecte
          automatiquement votre visage et applique les ajustements nécessaires.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          3. Téléchargez votre photo conforme
        </h3>
        <p className="mb-4">
          Obtenez votre photo prête à être utilisée pour votre demande de visa
          ou pour impression.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Quels types de visas nécessitent une photo ?
        </h2>

        <p className="mb-4">
          Une photo visa est requise pour la majorité des demandes
          internationales, notamment :
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Visa touristique</li>
          <li>Visa étudiant</li>
          <li>Visa de travail</li>
          <li>Visa affaires</li>
          <li>Résidence permanente</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Avantages de PixPassVisa pour vos photos visa
        </h2>

        <ul className="space-y-2 mb-4">
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Compatible avec plus de 50 pays</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Vérification biométrique IA avancée</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Résultat en moins de 30 secondes</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Conforme aux exigences officielles</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Garantie d'acceptation</li>
        </ul>

        <p>
          Simplifiez vos démarches administratives grâce à PixPassVisa. Créez
          dès maintenant votre photo visa en ligne conforme et évitez tout
          risque de rejet de votre dossier.
        </p>
      </section>
      <FaqSectionFr faqs={fr.faq.visa} title="Questions fréquentes — Photo visa" />
      <StickyCTAFr ctaText="Créer votre photo visa" />
    </>
  );
}
