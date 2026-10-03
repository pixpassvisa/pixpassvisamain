import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Passport & Visa Photos Online – 50+ Countries",
  description:
    "Create passport and visa photos online for 50+ countries. Automatic cropping, background removal and biometric photo checks.",
  
  alternates: {
    canonical: "https://www.pixpassvisa.com/passport-photo-online",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photo-online",
      fr: "https://www.pixpassvisa.com/fr/photo-identite-en-ligne",
      de: "https://www.pixpassvisa.com/de/passbild-online",
      "x-default": "https://www.pixpassvisa.com/passport-photo-online",
    },
  },
  openGraph: {
    title: "Passport & Visa Photo Maker — Preview Before Purchase",
    description:
      "Prepare passport and visa photos for 50+ countries. Preview your photo, then purchase your digital download and print sheet at a fixed one-time price.",
    url: "https://www.pixpassvisa.com/passport-photo-online",
    siteName: "PixPassVisa",
    type: "website",
    images: [
      {
        url: "https://www.pixpassvisa.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PixPassVisa - Passport & Visa Photo Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport & Visa Photo Maker — Preview Before Purchase",
    description:
      "Prepare passport and visa photos online. Preview before purchasing your digital photo and print sheet with a one-time payment.",
    images: ["https://www.pixpassvisa.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
