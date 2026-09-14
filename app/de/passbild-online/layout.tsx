import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passbild Online Erstellen 2026 | Biometrisches Passfoto 35x45 mm",
  description: "Biometrisches Passbild online erstellen: KI-Prüfung, Hintergrund entfernen, ICAO-konform in 30 Sekunden.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/de/passbild-online",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photo-online",
      fr: "https://www.pixpassvisa.com/fr/photo-identite-en-ligne",
      de: "https://www.pixpassvisa.com/de/passbild-online",
      "x-default": "https://www.pixpassvisa.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Passbild Online Erstellen — PixPassVisa",
    description: "Biometrisches Passbild online erstellen: KI-Prüfung, Hintergrund entfernen, ICAO-konform in 30 Sekunden.",
    url: "https://www.pixpassvisa.com/de/passbild-online",
    siteName: "PixPassVisa",
    locale: "de_DE",
    type: "website",
    images: [{ url: "https://www.pixpassvisa.com/og-image.jpg", width: 1200, height: 630, alt: "Passbild Online Erstellen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passbild Online Erstellen | PixPassVisa",
    description: "Biometrisches Passbild online erstellen in 30 Sekunden.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

export default function DeToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
