import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer votre Photo Passeport & Visa — Outil en Ligne | PixPassVisa",
  description: "Préparez une photo de passeport ou de visa : choisissez votre document, téléversez votre photo et vérifiez le résultat avant de poursuivre.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/fr/passport-photo-online",
    languages: { fr: "https://www.pixpassvisa.com/fr/passport-photo-online", "x-default": "https://www.pixpassvisa.com/fr/passport-photo-online" },
  },
  openGraph: {
    title: "Créer votre Photo — PixPassVisa", description: "Outil de création de photos passeport et visa conformes.",
    url: "https://www.pixpassvisa.com/fr/passport-photo-online", siteName: "PixPassVisa", locale: "fr_FR", type: "website",
    images: [{ url: "https://www.pixpassvisa.com/opengraph-image", width: 1200, height: 630, alt: "Créer votre Photo en Ligne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Créer votre Photo Passeport & Visa | PixPassVisa",
    description: "Préparez votre photo et vérifiez les exigences de votre autorité avant de la soumettre.",
    images: ["https://www.pixpassvisa.com/opengraph-image"],
  },
};

export default function FrToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
