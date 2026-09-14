import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import RequirementsFr from "../components/RequirementsFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Photo Carte d'Identité en Ligne — CNI Conforme | PixPassVisa",
  description: "Créez une photo carte d'identité conforme aux normes françaises. Format 35×45mm, fond blanc, cadrage biométrique automatique. Résultat instantané.",
  keywords: ["photo carte identité", "photo CNI", "photo carte nationale identité", "photo CNI en ligne"],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/photo-carte-identite",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photos",
      fr: "https://www.pixpassvisa.com/fr/photo-carte-identite",
      de: "https://www.pixpassvisa.com/de/biometrisches-passbild",
      "x-default": "https://www.pixpassvisa.com/passport-photos",
    },
  },
  openGraph: {
    title: "Photo Carte d'Identité en Ligne | PixPassVisa", description: "Photo CNI conforme aux normes françaises.",
    url: "https://www.pixpassvisa.com/fr/photo-carte-identite", siteName: "PixPassVisa", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassvisa.com/og-image.jpg", width: 1200, height: 630, alt: "Photo Carte d'Identité en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Carte d'Identité en Ligne | PixPassVisa",
    description: "Photo CNI conforme aux normes françaises. Vérification biométrique IA.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const cniFaqs = [
  { q: "Quelles sont les dimensions d'une photo pour la CNI ?", a: "La photo pour la carte nationale d'identité doit mesurer 35×45mm avec un visage de 32 à 36mm de hauteur, du menton au sommet du crâne." },
  { q: "Quelle est la différence entre photo passeport et photo CNI ?", a: "En France, les exigences sont identiques : 35×45mm, fond blanc uni, expression neutre. La même photo peut être utilisée pour les deux documents." },
  { q: "La photo est-elle compatible avec le nouveau format de CNI ?", a: "Oui, notre outil génère des photos conformes aux normes du nouveau format de carte d'identité française au format carte bancaire, en vigueur depuis 2021." },
  { q: "Combien de photos sont incluses dans la planche d'impression ?", a: "La planche d'impression A4 contient plusieurs photos au format exact 35×45mm, prêtes à être découpées pour votre demande de CNI." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassVisa — Photo Carte d'Identité", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
  ],
};

export default function PhotoCarteIdentitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo Carte d'Identité", href: "/fr/photo-carte-identite" }]} />
      <HeroSectionFr
        title="Photo Carte d'Identité en Ligne"
        subtitle="Aux normes de la carte nationale d'identité française"
        description="Photo conforme aux exigences de la CNI française. Format 35×45mm, fond blanc uni, cadrage biométrique automatique. Prête en 30 secondes."
        ctaHref="/fr/passport-photo-online?type=france-passport"
        showImage={true}
      />

      <RequirementsFr countryName="France (CNI)" specs={[
        { label: "Dimensions", value: "35 × 45 mm", detail: "Format officiel CNI" },
        { label: "Visage", value: "32-36 mm", detail: "Hauteur menton-crâne" },
        { label: "Arrière-plan", value: "Blanc uni", detail: "Sans ombre" },
        { label: "Expression", value: "Neutre", detail: "Bouche fermée" },
        { label: "Regard", value: "Face objectif", detail: "Yeux ouverts" },
        { label: "Format CNI", value: "Nouveau format", detail: "Compatible 2021+" },
      ]} />
      {/* SEO CONTENT BLOCK */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Photo carte d'identité conforme en ligne (CNI France)
        </h2>

        <p className="mb-4">
          La photo carte d'identité est un élément indispensable pour toute demande de carte nationale d'identité (CNI) en France.
          Les autorités françaises imposent des règles strictes concernant le format, le cadrage et la qualité de la photo.
          Une image non conforme peut entraîner un refus immédiat de votre dossier. Grâce à PixPassVisa, vous pouvez créer une
          photo CNI en ligne parfaitement conforme aux normes officielles, en quelques secondes seulement.
        </p>

        <p className="mb-4">
          Notre solution utilise une intelligence artificielle avancée pour analyser votre visage, ajuster automatiquement
          le cadrage biométrique et corriger l'arrière-plan. Vous obtenez ainsi une photo carte d'identité prête à être
          utilisée pour vos démarches administratives, sans avoir besoin de vous déplacer chez un photographe.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Normes officielles pour une photo CNI en France
        </h2>

        <p className="mb-4">
          Pour être acceptée, une photo carte nationale d'identité doit respecter des critères précis définis par l'administration française.
          Ces exigences garantissent une identification fiable et sécurisée.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Dimensions obligatoires : 35 × 45 mm</li>
          <li>Hauteur du visage : entre 32 et 36 mm</li>
          <li>Fond : blanc ou très clair, uniforme et sans ombre</li>
          <li>Expression : neutre, bouche fermée</li>
          <li>Regard : droit face à l'objectif</li>
          <li>Accessoires : lunettes et couvre-chefs interdits</li>
        </ul>

        <p className="mb-4">
          Avec PixPassVisa, toutes ces règles sont appliquées automatiquement. Vous évitez ainsi les erreurs fréquentes
          qui peuvent retarder votre demande de CNI.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Photo CNI en ligne : une solution rapide et économique
        </h2>

        <p className="mb-4">
          Faire une photo d'identité traditionnelle peut être contraignant : déplacement, attente, coût élevé.
          Les cabines photo ne garantissent pas toujours une conformité parfaite, ce qui peut entraîner des refus.
          En optant pour une solution en ligne, vous simplifiez votre processus et gagnez du temps.
        </p>

        <ul className="space-y-2 mb-4">
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Disponible 24h/24 depuis votre smartphone</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Résultat en moins de 30 secondes</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Conforme aux normes ANTS</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Téléchargement immédiat</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Impression facile à domicile</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Comment créer votre photo carte d'identité en ligne ?
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          1. Prenez une photo de qualité
        </h3>
        <p className="mb-3">
          Utilisez votre téléphone dans un environnement bien éclairé avec un fond simple. Assurez-vous que votre visage
          est bien visible et centré, sans ombres ni reflets.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          2. Importez votre image
        </h3>
        <p className="mb-3">
          Téléchargez votre photo sur PixPassVisa. L'outil détecte automatiquement votre visage et ajuste le cadrage
          selon les normes françaises.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">
          3. Téléchargez votre photo conforme
        </h3>
        <p className="mb-4">
          Recevez instantanément votre photo carte d'identité prête à être imprimée ou utilisée pour votre demande officielle.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Nouvelle carte d'identité française : ce qu'il faut savoir
        </h2>

        <p className="mb-4">
          Depuis 2021, la France a introduit un nouveau format de carte nationale d'identité, similaire à une carte bancaire.
          Cette nouvelle CNI intègre des éléments biométriques renforcés pour améliorer la sécurité et lutter contre la fraude.
          Les exigences pour la photo restent strictes, ce qui rend l'utilisation d'un outil conforme encore plus importante.
        </p>

        <p className="mb-4">
          PixPassVisa garantit une compatibilité totale avec ce nouveau format, vous assurant que votre photo sera acceptée
          sans problème par les administrations françaises.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Pourquoi choisir PixPassVisa pour votre photo CNI ?
        </h2>

        <ul className="space-y-2 mb-4">
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Technologie IA avancée pour un cadrage parfait</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Conforme aux normes officielles françaises</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Utilisable pour CNI et <Link href="/fr/photo-passeport" className="text-blue-600 hover:underline">passeport</Link></li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Interface simple et rapide</li>
          <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Garantie d'acceptation</li>
        </ul>

        <p>
          Ne prenez aucun risque avec votre demande de carte d'identité. Utilisez PixPassVisa pour créer une photo CNI
          conforme en ligne et simplifiez vos démarches administratives dès aujourd'hui.
        </p>
      </section>
      <FaqSectionFr faqs={cniFaqs} title="Questions fréquentes — Photo carte d'identité" />
      <StickyCTAFr ctaHref="/fr/passport-photo-online?type=france-passport" ctaText="Créer votre photo CNI" />
    </>
  );
}
