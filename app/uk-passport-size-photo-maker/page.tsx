import type { Metadata, Viewport } from "next";
import UKDocumentClient from "./UKDocumentClient";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "UK Passport size photo maker & uk id Photo Maker",
  description: "Create UK passport, visa, and ID photos online. 100% compliant for HMPO, Driving Licences, Railcards, and more in under a minute.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/uk-passport-size-photo-maker",
    languages: {
      en: "https://www.pixpassvisa.com/uk-passport-size-photo-maker",
      "x-default": "https://www.pixpassvisa.com/uk-passport-size-photo-maker",
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "UK Passport & Document Photo Maker | PixPassVisa",
    description: "Create UK passport, visa, and ID photos online. 100% compliant for HMPO, Driving Licences, Railcards, and more.",
    url: "/uk-passport-size-photo-maker",
    siteName: "PixPassVisa",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp",
        width: 1200,
        height: 630,
        alt: "UK Passport Size Photo Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Passport & Document Photo Maker | PixPassVisa",
    description: "Create UK passport, visa, and ID photos online. 100% compliant for HMPO, Driving Licences, Railcards, and more.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp"],
  },
};

export default function UKPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UK Passport & Document Photo Maker",
      "url": "https://www.pixpassvisa.com/uk-passport-size-photo-maker",
      "description": "Create UK passport, visa, and ID photos online. 100% compliant for HMPO, Driving Licences, Railcards, and more.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "6.99",
        "priceCurrency": "GBP"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What size does a UK passport photo need to be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A UK passport photo must be 35mm wide and 45mm tall, with your face centred and taking up 29-34mm from chin to crown. Our tool crops and sizes your upload to this exact spec automatically."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use the same photo for my driving licence and my passport?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The UK driving licence photo uses the same 35 x 45mm format as the passport, so one compliant photo works for both, as long as the background and pose meet each document's rules."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a printed photo for the Oyster card or bus pass?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Oyster photocards and most bus pass applications accept a digital photo upload through the online form, so you only need a correctly cropped image file rather than a physical print."
          }
        },
        {
          "@type": "Question",
          "name": "Will a photo taken on my phone be accepted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, provided the lighting is even, the background is plain, and your expression is neutral. Our tool checks framing and resizes the image, so a well-lit phone photo is usually enough."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to get my photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Processing takes under a minute. Upload your photo, choose your document, and download or print your compliant image straight away."
          }
        },
        {
          "@type": "Question",
          "name": "Can I apply the same photo to more than one document?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Upload one photo, then switch the document type at the top of the page to generate a new crop for each application, so you don't need to photograph yourself again for every form."
          }
        },
        {
          "@type": "Question",
          "name": "What background do UK documents require?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Almost every UK document on this list asks for a plain, light-coloured background with no patterns, shadows, or other people visible. Our tool flags backgrounds that are too busy or too dark before you download the photo."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.pixpassvisa.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "UK Passport Size Photo Maker",
          "item": "https://www.pixpassvisa.com/uk-passport-size-photo-maker"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PixPassVisa",
      "url": "https://www.pixpassvisa.com/",
      "logo": "https://www.pixpassvisa.com/logo.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PixPassVisa",
      "url": "https://www.pixpassvisa.com/"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <UKDocumentClient />
    </>
  );
}