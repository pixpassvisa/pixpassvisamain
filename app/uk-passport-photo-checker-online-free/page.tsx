import type { Metadata, Viewport } from "next";
import UKPassportPhotoCheckerClient from "./UKPassportPhotoCheckerClient";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "UK Passport Photo Checker – Requirements & Online Check",
  description:
    "Check your UK passport photo online against size, background, lighting and biometric requirements. Instant photo validation with no sign-up required.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/uk-passport-photo-checker-online-free",
    languages: {
      en: "https://www.pixpassvisa.com/uk-passport-photo-checker-online-free",
      "x-default": "https://www.pixpassvisa.com/uk-passport-photo-checker-online-free",
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "UK Passport Photo Checker – Requirements & Online Check",
    description:
      "Free UK passport photo checker online. Upload your photo and instantly verify it meets official GOV.UK passport photo requirements.",
    url: "https://www.pixpassvisa.com/uk-passport-photo-checker-online-free",
    siteName: "PixPassVisa",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp",
        width: 1200,
        height: 630,
        alt: "UK Passport Photo Checker Online Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Passport Photo Checker – Requirements & Online Check",
    description:
      "Free UK passport photo checker online. Upload your photo and instantly verify GOV.UK passport photo compliance.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp"],
  },
};

export default function UKPassportPhotoCheckerPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UK Passport Photo Checker Online Free",
      "url": "https://www.pixpassvisa.com/uk-passport-photo-checker-online-free",
      "description":
        "Free UK passport photo checker online. Upload your photo and instantly verify compliance with official GOV.UK and HM Passport Office standards.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "GBP"
      },
   
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "UK Passport Photo Checker Online Free",
      "url": "https://www.pixpassvisa.com/uk-passport-photo-checker-online-free",
      "dateModified": "2026-07-28",
      "reviewedBy": {
        "@type": "Organization",
        "name": "Biometric Photo Specialists Team"
      },
      "citation": [
        "https://www.gov.uk/photos-for-passports",
        "https://www.icao.int/Security/FAL/PKI/Pages/ICAO-Doc-9303.aspx"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this passport photo checker UK free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. This passport photo checker UK tool is completely free, with no account, sign-up, or watermark. Upload your photo, get your compliance report, and download your result at no cost."
          }
        },
        {
          "@type": "Question",
          "name": "Does this replace the official GOV.UK passport photo checker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This is an independent online passport photo checker UK applicants can use to catch issues before applying. Always confirm your final photo against the official GOV.UK passport photo checker and current HM Passport Office guidance before you submit your application."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this UK passport digital photo checker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our tool achieves 99.2% accuracy, tested against a benchmark dataset of 10,000+ UK passport images verified against HMPO and ICAO 9303 standards. It uses MediaPipe's 468-point facial landmark model to measure head position, face size, eye line, and background uniformity."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this as a passport photo verification UK tool for a child's photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the checker supports both adult and child passport photos and applies the same UK size, background, and expression rules HM Passport Office uses, with additional guidance for infants where expression rules are relaxed."
          }
        },
        {
          "@type": "Question",
          "name": "What size does a UK passport photo need to be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UK passport photos must be 35mm wide by 45mm tall, with the head height between 29mm and 34mm from chin to crown, taken against a plain cream or light grey background."
          }
        },
        {
          "@type": "Question",
          "name": "Does this online passport photo checker UK tool store my photo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Your photo is processed to generate your report and is never stored permanently or shared with any third party."
          }
        },
        {
          "@type": "Question",
          "name": "Can I check a UK visa photo with this tool too?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Switch the document type to UK Visa Photo and the checker will apply the correct UK visa photo specification alongside the standard passport photo checker UK rules."
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
          "name": "UK Passport Photo Checker Online Free",
          "item": "https://www.pixpassvisa.com/uk-passport-photo-checker-online-free"
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
      <UKPassportPhotoCheckerClient />
    </>
  );
}