import type { Metadata, Viewport } from "next";
import AmericaVisaSizePhotoClient from "./AmericaVisaSizePhotoClient";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "US Visa Photo – 2x2 Inch Online Photo Maker",
  description:
    "Create a US visa photo online in seconds. Generate a 2x2 inch photo for US visa and passport applications with automatic cropping and background checks.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/america-visa-size-photo",
    languages: {
      en: "https://www.pixpassvisa.com/america-visa-size-photo",
      "x-default": "https://www.pixpassvisa.com/america-visa-size-photo",
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "America Visa Size Photo Maker – Free 2x2 Online Tool",
    description:
      "Create a compliant 2x2 inch America visa photo online. Perfect for DS-160, US visa, and passport applications.",
    type: "website",
    url: "https://www.pixpassvisa.com/america-visa-size-photo",
    siteName: "PixPassVisa",
    locale: "en_US",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/us-hero.webp",
        width: 1200,
        height: 630,
        alt: "America Visa Size Photo Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "America Visa Size Photo Maker – Free 2x2 Online Tool",
    description:
      "Generate a compliant 2x2 inch America visa photo online in seconds.",
    images: [
      "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/us-hero.webp",
    ],
  },
};

export default function AmericaVisaSizePhotoPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "America Visa Size Photo Maker",
      url: "https://www.pixpassvisa.com/america-visa-size-photo",
      description:
        "Create a compliant America visa size photo online for DS-160, US visa, and passport applications.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "6.99",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What size is an America visa photo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A US visa photo must measure 2 x 2 inches (51 x 51 mm) with a square aspect ratio. The digital image should be 600 x 600 to 1200 x 1200 pixels.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use my phone to take a US visa photo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A modern smartphone can capture an acceptable US visa photo if the image is sharp, well-lit, has a plain white background, and meets the official framing requirements.",
          },
        },
        {
          "@type": "Question",
          name: "Does the DS-160 require a digital photo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Most DS-160 applications require a digital photo that complies with US Department of State requirements.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use the same photo for my US passport and visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. US passport and visa applications generally use the same 2x2 inch photo specification, provided the image is recent and meets all official requirements.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to create my visa photo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most photos are processed in under a minute. Upload your selfie, let the AI crop and adjust it, then download your compliant image instantly.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.pixpassvisa.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "America Visa Size Photo",
          item: "https://www.pixpassvisa.com/america-visa-size-photo",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "PixPassVisa",
      url: "https://www.pixpassvisa.com/",
      logo: "https://www.pixpassvisa.com/logo.png",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PixPassVisa",
      url: "https://www.pixpassvisa.com/",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />
      <AmericaVisaSizePhotoClient />
    </>
  );
}