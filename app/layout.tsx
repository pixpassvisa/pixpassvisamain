import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import ConditionalNavFooter from "./components/ConditionalNavFooter";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixpassvisa.com/"),
  title: {
    default: "PixPassVisa | AI Passport & Visa Photo Maker & Resizer Online",
    template: "%s | PixPassVisa",
  },
  description:
    "AI-powered passport and visa photo maker & resizer for 50+ countries. Resize to 2x2 in, 35x45 mm, 600x600 px, or compress to 20KB, 50KB, 100KB, 200KB. 100% government biometric compliance guaranteed.",
  keywords: [
    "image resizer",
    "photo resizer",
    "resize image online",
    "passport photo resizer",
    "visa photo resizer",
    "passport photo maker",
    "resize photo to 2x2",
    "resize photo to 35x45 mm",
    "600x600 photo resizer",
    "resize image to 20KB",
    "resize image to 50KB",
    "resize image to 100KB",
    "resize image to 200KB",
    "US visa photo size",
    "Schengen visa photo resizer",
    "Indian passport photo resizer",
    "UK passport photo resizer",
    "Canada visa photo size",
    "Australia passport photo",
    "signature resize online",
    "government form photo resizer",
  ],
  authors: [{ name: "PixPassVisa Team" }],
  creator: "PixPassVisa",
  applicationName: "PixPassVisa",
  publisher: "PixPassVisa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "PixPassVisa | Global AI Passport & Visa Photo Maker",
    description:
      "Create 100% compliant biometric passport, visa, and ID photos for 50+ countries. Instant AI background removal, smart cropping, and DPI compression.",
    url: "https://www.pixpassvisa.com/",
    siteName: "PixPassVisa",
    images: [
      {
        url: "https://www.pixpassvisa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PixPassVisa - AI Biometric Photo Maker & Resizer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixPassVisa | Global AI Passport & Visa Photo Maker",
    description:
      "Professional biometric passport & visa photos for 50+ countries. 100% government compliance guaranteed.",
    images: ["https://www.pixpassvisa.com/og-image.jpg"],
  },
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.pixpassvisa.com/#organization",
      name: "PixPassVisa",
      url: "https://www.pixpassvisa.com/",
      logo: "https://www.pixpassvisa.com/logo.svg",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "support@pixpassvisa.com",
      },
      description:
        "AI-powered biometric passport and visa photo maker, resizer, and compliance checker for 50+ countries.",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.pixpassvisa.com/#website",
      url: "https://www.pixpassvisa.com/",
      name: "PixPassVisa",
      publisher: {
        "@id": "https://www.pixpassvisa.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.pixpassvisa.com/passport-photo-sizes?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${dmSans.variable} antialiased bg-white text-slate-900`}
      >
        <AuthProvider>
          <ConditionalNavFooter
            navbar={<Navbar />}
            footer={<Footer />}
          >
            {children}
          </ConditionalNavFooter>
        </AuthProvider>

        {/* Optional Google Analytics (loaded only when NEXT_PUBLIC_GA_ID is set) */}
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}