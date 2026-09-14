import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import { fr } from "../translations";
import { Target, Zap, ShieldCheck, Lock, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Photo Passeport en Ligne 2026 — Conforme ANTS en 30s",
  description: "Créez votre photo passeport aux normes ANTS 2026 : 35×45mm, fond gris clair, cadrage automatique par IA. Résultat conforme en 30 secondes, garanti ou remboursé.",
  keywords: ["photo passeport", "photo passeport en ligne", "photo passeport conforme ANTS", "photo passeport france", "35x45mm", "fond gris photo passeport"],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/photo-passeport",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photos",
      fr: "https://www.pixpassvisa.com/fr/photo-passeport",
      de: "https://www.pixpassvisa.com/de/biometrisches-passbild",
      "x-default": "https://www.pixpassvisa.com/passport-photos",
    },
  },
  openGraph: {
    title: "Photo Passeport en Ligne | PixPassVisa",
    description: "Photo passeport conforme aux normes ANTS 2026 avec vérification biométrique IA. Fond gris clair, 35×45mm.",
    url: "https://www.pixpassvisa.com/fr/photo-passeport",
    siteName: "PixPassVisa", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassvisa.com/og-image.jpg", width: 1200, height: 630, alt: "Photo Passeport en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Passeport en Ligne | PixPassVisa",
    description: "Photo passeport conforme aux normes ANTS 2026 avec vérification biométrique IA. Fond gris clair, 35×45mm.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const passportFaqs = [
  {
    q: "Le fond de ma photo passeport doit-il être blanc ?",
    a: "Non. Depuis la mise à jour des normes ANTS, le blanc pur est déconseillé car il réduit le contraste avec la peau et perturbe la détection automatique du visage. Utilisez un gris clair ou un bleu-gris neutre, sans ombre portée. PixPassVisa applique ce fond automatiquement.",
  },
  {
    q: "Puis-je porter des lunettes sur ma photo passeport ?",
    a: "Les lunettes ne sont plus recommandées, sauf prescription médicale justifiée par un certificat d'ophtalmologiste à joindre au dossier. Sans certificat, retirez vos lunettes avant la prise de vue pour éviter tout rejet.",
  },
  {
    q: "Qu'est-ce que l'e-photo et en ai-je besoin ?",
    a: "L'e-photo est un code numérique associé à votre photo, exigé pour certaines démarches en ligne sur ants.gouv.fr. Il est généralement délivré par un photographe agréé ou une cabine partenaire. Vérifiez sur votre espace ANTS si votre démarche l'exige avant de déposer un dossier en mairie.",
  },
  {
    q: "Ma photo passeport a-t-elle une durée de validité ?",
    a: "Oui, une photo passeport doit dater de moins de six mois au moment du dépôt de votre dossier. Les agents de mairie vérifient systématiquement cette condition et rejettent toute photo plus ancienne.",
  },
  {
    q: "Le sourire est-il toléré sur une photo passeport ?",
    a: "Non, même un léger sourire entraîne un rejet. Gardez la bouche fermée, les sourcils détendus et le regard neutre face à l'objectif.",
  },
];

const trustPoints = [
  { icon: Target, label: "Précision biométrique" },
  { icon: Zap, label: "Résultat instantané" },
  { icon: ShieldCheck, label: "Conforme ANTS 2026" },
  { icon: Lock, label: "Données protégées" },
];

const steps = [
  {
    step: "1",
    title: "Prenez une photo avec votre smartphone",
    content: "Placez-vous face à une source de lumière naturelle et diffuse, en évitant les ombres directes sur le visage. Regardez l'objectif, gardez les yeux ouverts et la tête droite. Un smartphone récent suffit : notre outil se charge ensuite de remplacer l'arrière-plan et de corriger le cadrage.",
  },
  {
    step: "2",
    title: "Téléversez votre photo sur PixPassVisa",
    content: "Importez le cliché depuis votre galerie ou capturez-le directement dans notre interface. Le système analyse aussitôt plus de 50 critères biométriques : hauteur du visage (32-36 mm), position des yeux, expression, présence de lunettes ou d'un couvre-chef, netteté et niveau d'éclairage.",
  },
  {
    step: "3",
    title: "Laissez l'IA corriger votre photo",
    content: "L'algorithme retire l'arrière-plan d'origine et le remplace par le fond gris clair désormais recommandé par l'ANTS. Il recadre votre visage aux dimensions exactes de 35×45 mm (413×531 pixels), ajuste la luminosité et vérifie l'alignement horizontal des yeux.",
  },
  {
    step: "4",
    title: "Téléchargez votre photo conforme",
    content: "Récupérez en moins de 30 secondes un fichier numérique haute résolution, prêt à être déposé en mairie ou utilisé pour une e-photo si votre démarche l'exige. Une planche d'impression 4×6 est incluse, acceptée en pharmacie, en mairie et en bureau de poste.",
  },
];

const rejectionReasons = [
  { title: "Fond blanc pur ou non uniforme", detail: "Le blanc écrase le contraste et gêne la lecture automatique. Une ombre derrière la tête suffit à faire rejeter le dossier." },
  { title: "Visage trop petit ou trop grand", detail: "Hors de la fourchette 32-36 mm de hauteur, la photo est refusée même si le format global est correct." },
  { title: "Expression non neutre", detail: "Sourire, bouche entrouverte ou sourcils froncés comptent parmi les motifs de refus les plus fréquents." },
  { title: "Reflet ou ombre sur le visage", detail: "Un éclairage direct mal réparti crée des zones d'ombre derrière les oreilles ou sous le menton." },
  { title: "Lunettes ou couvre-chef non justifiés", detail: "Sans certificat médical ou motif religieux documenté, tout accessoire couvrant le visage entraîne un rejet." },
  { title: "Photo de plus de six mois", detail: "Même parfaitement conforme sur le plan technique, une photo trop ancienne est automatiquement refusée." },
];

const passportSpecs = [
  { label: "Dimensions", value: "35 × 45 mm", detail: "Norme ANTS, conforme ISO/IEC 19794-5" },
  { label: "Résolution", value: "413 × 531 px", detail: "300 DPI minimum pour l'impression" },
  { label: "Arrière-plan", value: "Gris clair ou bleu-gris", detail: "Uni, sans ombre ni motif — le blanc pur est déconseillé" },
  { label: "Taille du visage", value: "32-36 mm", detail: "Du menton au sommet du crâne (70-80% du cadre)" },
  { label: "Position des yeux", value: "Centrés, ouverts", detail: "Regard direct vers l'objectif, sans mèche devant les yeux" },
  { label: "Expression", value: "Neutre", detail: "Bouche fermée, sourcils détendus, pas de sourire" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassVisa — Photo Passeport", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
    {
      "@type": "FAQPage",
      mainEntity: passportFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function PhotoPasseportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo Passeport", href: "/fr/photo-passeport" }]} />
      <HeroSectionFr
        title={fr.hero.passport.title}
        subtitle={fr.hero.passport.subtitle}
        description={fr.hero.passport.description}
        ctaHref="/fr/passport-photo-online?type=france-passport"
        showImage={true}
      />

      {/* Intro + trust strip — no cards, single inline row */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Pourquoi passer par PixPassVisa pour votre photo passeport ?</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Un logiciel de vérification biométrique contrôle chaque photo passeport que vous téléversez sur PixPassVisa, selon les mêmes critères que ceux appliqués par l&apos;ANTS en 2026. Notre outil supprime l&apos;arrière-plan de votre photo, applique le fond gris clair désormais requis, recentre votre visage et vérifie l&apos;alignement des yeux, le tout en moins de 30 secondes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-slate-100 py-5">
            {trustPoints.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use — connected timeline instead of 4 boxed cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">Guide pratique</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Comment obtenir votre photo passeport en ligne ?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Suivez ces quatre étapes pour obtenir une photo passeport conforme aux normes ANTS 2026, sans déplacement en photomaton.
            </p>
          </div>

          <ol className="relative">
            {steps.map((item, i) => (
              <li key={item.step} className="relative pl-16 pb-10 last:pb-0">
                {i !== steps.length - 1 && (
                  <span className="absolute left-[23px] top-12 bottom-0 w-px bg-blue-200" aria-hidden="true" />
                )}
                <span className="absolute left-0 top-0 flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md shadow-blue-500/20">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2 pt-1">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.content}</p>
              </li>
            ))}
          </ol>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-blue-900 font-medium text-left">
              <strong>Point de vigilance :</strong> votre photo passeport doit dater de moins de six mois.
              Les agents de mairie vérifient cette condition à chaque dépôt. PixPassVisa horodate automatiquement
              chaque photo générée pour que vous puissiez le justifier facilement.
            </p>
          </div>
        </div>
      </section>

      {/* Specs + rejection reasons — plain lists, no card wrappers */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Normes ANTS 2026 pour la photo passeport française
          </h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-center max-w-2xl mx-auto">
            Ces critères suivent les exigences de l&apos;<Link href="/fr/ephoto-ants" className="text-blue-600 hover:underline">ANTS</Link> (Agence Nationale des Titres Sécurisés) et les standards <Link href="/fr/photo-passeport-biometrique" className="text-blue-600 hover:underline">ICAO internationaux</Link>.
          </p>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 mb-14">
            {passportSpecs.map((spec) => (
              <div key={spec.label} className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-800">{spec.label}</span>
                  <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-sm font-semibold">{spec.value}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{spec.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-5 text-center">
            Six raisons fréquentes de rejet, et comment les éviter
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
            {rejectionReasons.map((reason) => (
              <li key={reason.title} className="border-l-2 border-blue-500 pl-4">
                <p className="font-bold text-slate-800 text-sm">{reason.title}</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{reason.detail}</p>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <a href="/fr/passport-photo-online?type=france-passport" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25">
              Créer ma photo passeport conforme
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Comparison table — data belongs in a table, not cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            PixPassVisa, photomaton ou photographe : que choisir ?
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
            Chaque option a son coût et son délai. Voici comment ils se comparent pour une photo passeport conforme.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pl-4 pr-4 text-slate-500 font-semibold text-sm uppercase">Critère</th>
                  <th className="py-3 pr-4 text-blue-700 font-bold bg-blue-50">PixPassVisa</th>
                  <th className="py-3 pr-4 text-slate-700 font-semibold">Photomaton</th>
                  <th className="py-3 pr-4 text-slate-700 font-semibold">Photographe</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Délai</td>
                  <td className="py-3 pr-4 bg-blue-50/50 font-bold text-blue-700">30 secondes</td>
                  <td className="py-3 pr-4">5 à 15 minutes</td>
                  <td className="py-3 pr-4">Rendez-vous requis</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Prix moyen</td>
                  <td className="py-3 pr-4 bg-blue-50/50 font-bold text-blue-700">6,99 €</td>
                  <td className="py-3 pr-4">5 à 8 €</td>
                  <td className="py-3 pr-4">15 à 25 €</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 pl-4 pr-4 font-medium">Contrôle qualité avant impression</td>
                  <td className="py-3 pr-4 bg-blue-50/50 font-semibold text-blue-700">Automatique, biométrique</td>
                  <td className="py-3 pr-4">Aucun</td>
                  <td className="py-3 pr-4">Visuel, humain</td>
                </tr>
                <tr>
                  <td className="py-3 pl-4 pr-4 font-medium">Disponibilité</td>
                  <td className="py-3 pr-4 bg-blue-50/50 font-semibold text-blue-700">24h/24, depuis chez vous</td>
                  <td className="py-3 pr-4">Selon localisation</td>
                  <td className="py-3 pr-4">Horaires d&apos;ouverture</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqSectionFr faqs={passportFaqs} title="Questions fréquentes — Photo passeport" />
      <StickyCTAFr ctaHref="/fr/passport-photo-online?type=france-passport" countryName="France" />
    </>
  );
}