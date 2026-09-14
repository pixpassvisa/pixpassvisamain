import type { Metadata } from "next";
import Link from "next/link";
import HeroSectionFr from "../components/HeroSectionFr";

import StickyCTAFr from "../components/StickyCTAFr";
import BreadcrumbsFr from "../components/BreadcrumbsFr";
import FaqSectionFr from "../components/FaqSectionFr";
import { Eye, Ruler, ImageIcon, Smile, Sun, Search, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Photo Passeport Biométrique — Normes OACI 2026 | PixPassVisa",
  description: "Photo passeport biométrique conforme aux normes OACI internationales. Vérification automatique de la position des yeux, taille de la tête et arrière-plan.",
  keywords: ["photo biométrique", "photo passeport biométrique", "normes OACI", "ICAO photo", "photo biométrique en ligne"],
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/photo-passeport-biometrique",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photos",
      fr: "https://www.pixpassvisa.com/fr/photo-passeport-biometrique",
      de: "https://www.pixpassvisa.com/de/biometrisches-passbild",
      "x-default": "https://www.pixpassvisa.com/passport-photos",
    },
  },
  openGraph: {
    title: "Photo Passeport Biométrique | PixPassVisa", description: "Photo biométrique conforme aux normes OACI internationales.",
    url: "https://www.pixpassvisa.com/fr/photo-passeport-biometrique", siteName: "PixPassVisa", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassvisa.com/og-image.jpg", width: 1200, height: 630, alt: "Photo Passeport Biométrique" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Passeport Biométrique | PixPassVisa",
    description: "Photo biométrique conforme aux normes OACI internationales. Vérification biométrique IA.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const bioFaqs = [
  { q: "Qu'est-ce qu'une photo biométrique ?", a: "Une photo biométrique est une photo d'identité conforme aux normes OACI (Organisation de l'Aviation Civile Internationale). Elle respecte des critères stricts de dimension, de position du visage, d'éclairage et d'arrière-plan pour permettre la reconnaissance faciale automatisée." },
  { q: "Quelles sont les normes OACI pour les photos ?", a: "Les normes OACI (Doc 9303) exigent : un visage centré occupant 70-80% de la hauteur, des yeux entre 56% et 69% de la hauteur, un fond blanc uni, une expression neutre, et une résolution minimale de 300 DPI." },
  { q: "Tous les pays utilisent-ils les normes OACI ?", a: "Oui, presque tous les pays membres de l'ONU suivent les normes OACI pour les passeports biométriques. Certains pays ajoutent des exigences supplémentaires (couleur de fond, dimensions spécifiques)." },
  { q: "Comment PixPassVisa vérifie-t-il la conformité biométrique ?", a: "Notre système analyse 64 points faciaux pour vérifier la position des yeux, la taille de la tête, la symétrie du visage, la qualité de l'éclairage et l'uniformité de l'arrière-plan." },
  { q: "La photo biométrique est-elle acceptée dans tous les pays ?", a: "Oui, une photo conforme aux normes OACI est acceptée dans la majorité des pays pour les passeports et visas. Notre outil adapte automatiquement les dimensions spécifiques de chaque pays." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", name: "PixPassVisa — Photo Biométrique", applicationCategory: "PhotographyApplication", operatingSystem: "All", inLanguage: "fr", offers: { "@type": "Offer", price: "6.99", priceCurrency: "EUR" } },
  ],
};

export default function PhotoBiometriquePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbsFr items={[{ label: "Photo Biométrique", href: "/fr/photo-passeport-biometrique" }]} />
      <HeroSectionFr
        title="Photo Passeport Biométrique "
        subtitle="Conforme aux normes OACI internationales"
        description="Photo biométrique conforme aux standards OACI pour passeports et visas. Vérification automatique de la position des yeux, taille de la tête et arrière-plan."
        ctaHref="/fr/passport-photo-online"
        showImage={true}
      />
    

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Comprendre les normes biométriques OACI</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            L&apos;OACI (Organisation de l&apos;Aviation Civile Internationale) définit les standards mondiaux pour les photos de documents de voyage. 
            Ces normes garantissent que votre photo peut être lue par les systèmes de reconnaissance faciale aux frontières internationales.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Eye, label: "Position des yeux", desc: "56-69% de la hauteur" },
              { icon: Ruler, label: "Taille de la tête", desc: "70-80% du cadre" },
              { icon: ImageIcon, label: "Arrière-plan", desc: "Blanc uni uniforme" },
              { icon: Smile, label: "Expression", desc: "Neutre, bouche fermée" },
              { icon: Sun, label: "Éclairage", desc: "Uniforme, sans ombre" },
              { icon: Search, label: "Résolution", desc: "300 DPI minimum" },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-white p-5 rounded-2xl border border-slate-100 text-left">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{item.label}</h3>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
  <h2 className="text-3xl font-bold mb-6">
    Photo passeport biométrique conforme aux normes OACI (2026)
  </h2>

  <p className="mb-4">
    La photo passeport biométrique est aujourd’hui un élément essentiel pour les documents de voyage modernes. 
    Tous les passeports récents intègrent des données biométriques permettant une identification rapide et sécurisée 
    aux frontières. Pour être acceptée, votre photo doit respecter les normes strictes définies par l’OACI 
    (Organisation de l’Aviation Civile Internationale). Avec PixPassVisa, vous pouvez créer une photo biométrique 
    conforme en ligne, en quelques secondes, sans risque de rejet.
  </p>

  <p className="mb-4">
    Contrairement à une simple photo d’identité, une photo biométrique doit répondre à des critères précis concernant 
    la position du visage, la symétrie, l’éclairage et la qualité globale de l’image. Notre outil basé sur l’intelligence 
    artificielle analyse automatiquement ces paramètres pour garantir une conformité totale aux standards internationaux.
  </p>

  <h2 className="text-2xl font-semibold mt-8 mb-4">
    Qu’est-ce qu’une photo biométrique ?
  </h2>

  <p className="mb-4">
    Une photo biométrique est une image spécialement conçue pour être utilisée dans les systèmes de reconnaissance faciale. 
    Elle est utilisée dans les passeports électroniques, <Link href="/fr/photo-visa" className="text-blue-600 hover:underline">visas</Link>, <Link href="/fr/photo-carte-identite" className="text-blue-600 hover:underline">cartes d’identité</Link> et autres documents officiels. 
    L’objectif est de permettre une identification automatique fiable grâce à des points de repère précis sur le visage.
  </p>

  <p className="mb-4">
    Ces photos sont standardisées à l’échelle mondiale selon les recommandations de l’OACI (Doc 9303). 
    Cela signifie qu’une photo biométrique conforme peut être utilisée dans la majorité des pays, avec seulement 
    quelques ajustements spécifiques selon la destination.
  </p>

  <h2 className="text-2xl font-semibold mt-8 mb-4">
    Les normes OACI pour les photos biométriques
  </h2>

  <p className="mb-4">
    Les normes OACI définissent des règles précises pour garantir que les systèmes automatisés puissent lire et analyser 
    correctement votre photo. Voici les principales exigences :
  </p>

  <ul className="list-disc pl-6 mb-4">
    <li>Visage centré occupant 70 à 80 % de la hauteur de l’image</li>
    <li>Position des yeux entre 56 % et 69 % de la hauteur</li>
    <li>Fond blanc ou clair, uniforme et sans texture</li>
    <li>Expression neutre, bouche fermée</li>
    <li>Yeux ouverts et clairement visibles</li>
    <li>Absence d’ombres ou de reflets</li>
    <li>Résolution minimale de 300 DPI</li>
  </ul>

  <p className="mb-4">
    Le non-respect de ces critères peut entraîner un rejet de votre demande de passeport ou de visa. 
    C’est pourquoi il est crucial d’utiliser un outil fiable pour générer votre photo biométrique.
  </p>

  <h2 className="text-2xl font-semibold mt-8 mb-4">
    Pourquoi choisir une photo biométrique en ligne ?
  </h2>

  <p className="mb-4">
    Les méthodes traditionnelles, comme les cabines photo ou les studios, ne garantissent pas toujours une conformité parfaite. 
    De plus, elles peuvent être coûteuses et peu pratiques. Une solution en ligne vous permet de créer votre photo biométrique 
    rapidement, à tout moment, et avec une précision optimale.
  </p>

  <ul className="space-y-2 mb-4">
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Disponible 24h/24 depuis n’importe quel appareil</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Analyse biométrique automatique</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Résultat en moins de 30 secondes</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Conforme aux normes internationales OACI</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Téléchargement instantané</li>
  </ul>

  <h2 className="text-2xl font-semibold mt-8 mb-4">
    Comment créer une photo passeport biométrique en ligne ?
  </h2>

  <h3 className="text-xl font-semibold mt-4 mb-2">
    1. Prenez une photo adaptée
  </h3>
  <p className="mb-3">
    Utilisez votre smartphone ou appareil photo dans un environnement bien éclairé. Placez-vous face à une source 
    de lumière naturelle avec un fond clair. Assurez-vous que votre visage est bien visible et centré.
  </p>

  <h3 className="text-xl font-semibold mt-4 mb-2">
    2. Importez votre image
  </h3>
  <p className="mb-3">
    Téléchargez votre photo sur PixPassVisa. L’outil analyse automatiquement les points faciaux, ajuste le cadrage 
    et corrige l’arrière-plan pour répondre aux normes OACI.
  </p>

  <h3 className="text-xl font-semibold mt-4 mb-2">
    3. Téléchargez votre photo conforme
  </h3>
  <p className="mb-4">
    Recevez instantanément votre photo biométrique prête à être utilisée pour vos démarches administratives ou imprimée.
  </p>

  <h2 className="text-2xl font-semibold mt-8 mb-4">
    Compatibilité internationale des photos biométriques
  </h2>

  <p className="mb-4">
    La majorité des pays suivent les normes OACI pour leurs documents de voyage. Cela inclut l’Union européenne, 
    les États-Unis, le Canada, le Royaume-Uni, l’Australie et de nombreux autres pays. Une photo biométrique conforme 
    peut donc être utilisée dans différents contextes avec un minimum d’ajustements.
  </p>

  <p className="mb-4">
    Toutefois, certains pays peuvent exiger des dimensions spécifiques ou des variations mineures. PixPassVisa adapte 
    automatiquement votre photo selon le pays sélectionné pour garantir une conformité totale.
  </p>

  <h2 className="text-2xl font-semibold mt-8 mb-4">
    Avantages de PixPassVisa pour vos photos biométriques
  </h2>

  <ul className="space-y-2 mb-4">
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Détection avancée de plus de 60 points faciaux</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Ajustement automatique du cadrage et de la symétrie</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Correction intelligente de l’arrière-plan</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Conforme aux normes OACI (Doc 9303)</li>
    <li className="flex items-center gap-2 text-slate-700"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Utilisable pour passeports, visas et cartes d’identité</li>
  </ul>

  <p>
    Ne prenez aucun risque avec vos documents officiels. Créez dès maintenant votre photo passeport biométrique 
    conforme en ligne avec PixPassVisa et assurez-vous une acceptation rapide lors de vos démarches administratives.
  </p>
</section>
      <FaqSectionFr faqs={bioFaqs} title="Questions fréquentes — Photo biométrique" />
      <StickyCTAFr ctaText="Créer votre photo biométrique" />
    </>
  );
}
