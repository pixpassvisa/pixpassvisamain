import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import FaqSectionFr from "../components/FaqSectionFr";
import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import { fr } from "../translations";
import { X } from "lucide-react";

export const metadata: Metadata = {
  title: "Photo d'Identité Conforme — CNI, Permis & Carte Vitale | PixPassVisa",
  description: "Obtenez une photo d'identité aux normes françaises 2026 en 30s : fond gris clair, cadrage IA. Valide pour CNI, permis et carte Vitale. Garanti ou remboursé.",
  keywords: ["photo identité", "photo identité france", "photo CNI", "photo permis de conduire", "erreurs photo identité"],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/photo-identite",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photos",
      fr: "https://www.pixpassvisa.com/fr/photo-identite",
      de: "https://www.pixpassvisa.com/de/biometrisches-passbild",
      "x-default": "https://www.pixpassvisa.com/passport-photos",
    },
  },
  openGraph: {
    title: "Photo d'Identité Conforme | PixPassVisa",
    description: "Photo d'identité conforme pour CNI, permis et carte Vitale. Fond gris clair, vérification biométrique IA.",
    url: "https://www.pixpassvisa.com/fr/photo-identite", siteName: "PixPassVisa", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassvisa.com/og-image.jpg", width: 1200, height: 630, alt: "Photo d'Identité Officielle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo d'Identité Conforme | PixPassVisa",
    description: "Photo d'identité conforme pour CNI, permis et carte Vitale. Fond gris clair, vérification biométrique IA.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const idFaqs = [
  { q: "Quelle taille pour une photo d'identité française ?", a: "La photo d'identité française mesure 35 × 45 mm avec un visage de 32 à 36 mm de hauteur, du menton au sommet du crâne. Notre outil calibre automatiquement ces dimensions." },
  { q: "Le fond doit-il être blanc ou gris ?", a: "Utilisez un gris clair ou un bleu-gris neutre. Le blanc pur est déconseillé car il réduit le contraste et gêne la détection automatique du visage par les agents et les logiciels préfectoraux." },
  { q: "Une seule photo suffit-elle pour la CNI et le passeport ?", a: "Oui. Depuis l'unification de la norme ANTS, une seule photo conforme sert à la fois pour la carte nationale d'identité, le passeport et le permis de conduire, s'ils sont demandés dans le même délai." },
  { q: "Comment faire une photo d'identité pour un enfant ?", a: "Les mêmes règles s'appliquent : fond uni, expression neutre, yeux ouverts. Évitez de tenir l'enfant visible dans le cadre et utilisez une lumière douce pour limiter les mouvements flous." },
  { q: "La photo sera-t-elle acceptée en préfecture ?", a: "Notre outil applique les critères ANTS en vigueur : dimensions, fond gris clair, position du visage et expression neutre. Une garantie satisfait ou remboursé couvre tout rejet lié à la photo." },
];

const idSpecs = [
  { label: "Dimensions", value: "35 × 45 mm", detail: "Norme française commune à la CNI, au passeport et au permis" },
  { label: "Taille du visage", value: "32-36 mm", detail: "Du menton au sommet du crâne" },
  { label: "Arrière-plan", value: "Gris clair ou bleu-gris", detail: "Uni, sans motif ni ombre — le blanc pur est déconseillé" },
  { label: "Expression", value: "Neutre", detail: "Bouche fermée, sourcils détendus" },
  { label: "Regard", value: "Face à l'objectif", detail: "Yeux ouverts et entièrement visibles" },
  { label: "Accessoires", value: "Déconseillés", detail: "Lunettes et couvre-chef sauf justification médicale ou religieuse" },
];

const commonMistakes = [
  { title: "Éclairage direct au-dessus du visage", detail: "Il crée des ombres sous le nez et le menton. Préférez une lumière naturelle diffuse, face à vous." },
  { title: "Fond blanc pur", detail: "Il réduit le contraste avec la peau claire et complique la détection automatique. Un gris clair est désormais préférable." },
  { title: "Tête légèrement inclinée", detail: "Même un angle discret fausse la mesure de la hauteur du visage et peut entraîner un rejet." },
  { title: "Photo recadrée à la main", detail: "Un recadrage approximatif décale le visage du centre et modifie les proportions exigées (35 × 45 mm)." },
  { title: "Reflets sur les verres de lunettes", detail: "Ils masquent une partie des yeux. Retirez vos lunettes si aucune prescription médicale ne les justifie." },
  { title: "Cheveux devant le front ou les yeux", detail: "Le visage doit rester entièrement dégagé, du sommet du crâne au menton." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassVisa — Photo d'Identité", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
    {
      "@type": "FAQPage",
      mainEntity: idFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function PhotoIdentitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo d'identité", href: "/fr/photo-identite" }]} />
      <HeroSectionFr
        title="Photo d'identité conforme pour CNI, permis et carte Vitale"
        subtitle="Le bon format, le bon fond, du premier coup"
        description="Générez une photo d'identité aux normes françaises 2026 depuis votre smartphone, sans passer par un photomaton."
        ctaHref="/fr/passport-photo-online"
        showImage={true}
      />
      <section className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Photo d&apos;identité en ligne : rapide, conforme et acceptée en France
        </h2>

        <p className="mb-4">
          Une photo d&apos;identité conforme conditionne l&apos;acceptation de vos démarches administratives en
          France. Que vous prépariez une carte nationale d&apos;identité (CNI), un permis de conduire ou une carte
          Vitale, les exigences restent strictes. PixPassVisa génère votre photo d&apos;identité en quelques
          secondes, directement depuis votre smartphone, sans déplacement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Pourquoi choisir une photo d&apos;identité numérique plutôt qu&apos;un photomaton
        </h2>

        <p className="mb-4">
          Les cabines photo et les studios professionnels coûtent souvent plus cher qu&apos;un service en ligne et
          imposent un déplacement. Une solution numérique reste accessible 24 heures sur 24, depuis n&apos;importe
          quel appareil. Notre intelligence artificielle détecte automatiquement votre visage, ajuste les
          dimensions et applique le fond conforme aux normes ANTS en vigueur.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Normes 2026 pour une photo d&apos;identité française
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-4">
          {idSpecs.map((spec) => (
            <div key={spec.label} className="border-b border-slate-100 pb-4">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-800">{spec.label}</span>
                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-sm font-semibold">{spec.value}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{spec.detail}</p>
            </div>
          ))}
        </div>

        <p className="mb-4">
          Le point le plus souvent négligé concerne la couleur de fond : le blanc pur, longtemps considéré comme la
          référence, réduit aujourd&apos;hui le contraste avec la peau et complique la détection automatique du
          visage. Utilisez un gris clair ou un bleu-gris neutre. PixPassVisa applique désormais ce fond par défaut
          sur chaque photo générée.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Six erreurs fréquentes qui font rejeter une photo d&apos;identité
        </h2>

        <p className="mb-4">
          La plupart des rejets viennent de détails invisibles à l&apos;œil nu sur un petit écran de smartphone.
          Voici les erreurs les plus courantes et comment les éviter :
        </p>

        <ul className="space-y-3 mb-4">
          {commonMistakes.map((mistake) => (
            <li key={mistake.title} className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-500 mt-1 shrink-0" />
              <span><strong className="text-slate-800">{mistake.title}.</strong> {mistake.detail}</span>
            </li>
          ))}
        </ul>

        <p className="mb-4">
          Notre outil détecte automatiquement la plupart de ces problèmes avant que vous ne téléchargiez le fichier
          final, ce qui évite un rejet en mairie et un nouveau rendez-vous.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Comment créer votre photo d&apos;identité en ligne
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">1. Prenez une photo avec votre téléphone</h3>
        <p className="mb-3">
          Placez-vous face à une source de lumière naturelle et diffuse, sur un fond simple. Gardez le visage
          droit, entièrement visible et centré dans le cadre.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">2. Importez votre image</h3>
        <p className="mb-3">
          Téléversez votre photo sur PixPassVisa. L&apos;outil l&apos;analyse instantanément et signale tout point
          de non-conformité.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">3. Téléchargez votre photo conforme</h3>
        <p className="mb-4">
          Récupérez votre photo d&apos;identité prête à être imprimée ou utilisée en ligne pour vos démarches
          administratives.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Quels documents exigent une photo d&apos;identité
        </h2>

        <p className="mb-4">
          Une photo d&apos;identité conforme reste nécessaire pour de nombreux documents officiels en France :
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li><Link href="/fr/photo-carte-identite" className="text-blue-600 hover:underline">Carte nationale d&apos;identité (CNI)</Link></li>
          <li><Link href="/fr/ephoto-ants" className="text-blue-600 hover:underline">Permis de conduire</Link></li>
          <li><Link href="/fr/photo-passeport" className="text-blue-600 hover:underline">Passeport</Link></li>
          <li>Carte Vitale</li>
          <li>Carte étudiante</li>
          <li>Abonnement de transport</li>
        </ul>

        <p className="mb-4">
          Une seule photo conforme, respectant le format 35 × 45 mm et le fond gris clair, sert généralement pour
          plusieurs de ces démarches lorsqu&apos;elles sont effectuées dans le même délai de six mois.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Ce que PixPassVisa vous garantit
        </h2>

        <ul className="list-disc pl-6 mb-4">
          <li>Vérification biométrique automatique avant téléchargement</li>
          <li>Fond et cadrage conformes aux normes françaises en vigueur</li>
          <li>Traitement en moins de 30 secondes</li>
          <li>Compatibilité mobile et ordinateur</li>
          <li>Garantie satisfait ou remboursé en cas de refus</li>
        </ul>

        <p>
          Avec PixPassVisa, vous simplifiez vos démarches administratives tout en réduisant le risque de rejet.
          Essayez dès maintenant et obtenez votre photo d&apos;identité conforme en quelques clics.
        </p>
      </section>
      <FaqSectionFr faqs={idFaqs} title="Questions fréquentes — Photo d'identité" />
      <StickyCTAFr ctaText="Créer votre photo d'identité" />
    </>
  );
}