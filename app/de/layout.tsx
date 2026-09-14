import type { Metadata } from "next";
import "../globals.css";
import NavbarDe from "./components/NavbarDe";
import FooterDe from "./components/FooterDe";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixpassvisa.com/"),
  title: {
    default: "PixPassVisa | Biometrische Passbilder & Visumfotos Online",
    template: "%s",
  },
  description:
    "Erstellen Sie biometrische Passbilder, Visumfotos oder Bewerbungsfotos online. KI-gestützte biometrische Prüfung für Deutschland, Österreich, Schweiz und über 50 weitere Länder.",
  authors: [{ name: "PixPassVisa Team" }],
  creator: "PixPassVisa",
  applicationName: "PixPassVisa",
  publisher: "PixPassVisa",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: "PixPassVisa | Biometrische Passbilder & Visumfotos Online",
    description: "Erstellen Sie konforme biometrische Fotos für über 50 Länder. Offizielle Standards für Deutschland (Personalausweis, Führerschein) und mehr.",
    url: "https://www.pixpassvisa.com/de",
    siteName: "PixPassVisa",
    images: [{ url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg", width: 1200, height: 630, alt: "PixPassVisa - Passfoto Online" }],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassVisa | Biometrische Passbilder & Visumfotos Online",
    description: "Professionelle Pass- und Visumfotos für über 50 Länder. Biometrische Konformität garantiert.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg"],
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    
      <NavbarDe />
      <main id="main-content" className="grow">
        {children}
      </main>
      <FooterDe />
    </>
  );
}
