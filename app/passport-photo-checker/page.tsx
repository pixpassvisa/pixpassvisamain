import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";
import { Globe, Ruler, ImageIcon, Sun, Eye, BarChart3, Zap, FileCheck, CheckCircle2, Camera } from "lucide-react";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Passport Photo Checker – Free Biometric Compliance Validator (2026)",
  description:
    "Free online passport photo checker. Upload your photo to verify official sizing, head height, background color, and lighting against ICAO standards for 50+ countries.",
  keywords: [
    
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/passport-photo-checker",
    languages: {
      en: "https://www.pixpassvisa.com/passport-photo-checker",
      "x-default": "https://www.pixpassvisa.com/passport-photo-checker",
    },
  },
  openGraph: {
    title: "Passport Photo Checker – Free Biometric Compliance Validator",
    description:
      "Verify passport and visa photos online. Check 30+ biometric parameters against official embassy and ICAO 9303 standards instantly.",
    url: "https://www.pixpassvisa.com/passport-photo-checker",
    siteName: "PixPassVisa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Passport Photo Checker Free Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passport Photo Checker – Free Biometric Compliance Validator",
    description:
      "Free passport photo compliance checker. Instant feedback on sizing, background, lighting, and facial positioning.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function PassportPhotoCheckerPage() {
  const faqs = [
    {
      question: "Is this passport photo checker completely free to use?",
      answer:
        "Yes, 100% free with unlimited checks. You receive an instant diagnostic report covering dimensions, head positioning, background uniformity, and lighting without any payment or account registration required.",
    },
    {
      question: "Which country standards does the checker support?",
      answer:
        "The selector contains country presets. Confirm the requirements for your exact document; a country preset does not cover every visa, OCI, digital submission, or capture workflow. Server validation currently uses passport configurations.",
    },
    {
      question: "How accurate is the automated biometric check?",
      answer:
        "Computer vision provides measurements and feedback, but no measured accuracy rate or government certification is established here. Checks can miss issues and cannot guarantee acceptance.",
    },
    {
      question: "Will my uploaded photo be stored or shared?",
      answer:
        "Photos are uploaded for server processing and may be stored with Cloudinary. Closing the page does not delete stored copies. Read our privacy policy before uploading.",
    },
    {
      question: "What should I do if my photo fails a check?",
      answer:
        "Each flagged requirement includes a direct explanation and adjustment advice. You can use our integrated background removal and cropping tools or retake the photo following the on-screen tips before re-checking.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Passport Photo Checker",
      url: "https://www.pixpassvisa.com/passport-photo-checker",
      description:
        "Free online biometric passport photo checker verifying official dimensions, facial proportions, background color, and lighting for 50+ countries.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Passport Photo Checker",
      url: "https://www.pixpassvisa.com/passport-photo-checker",
      citation: [
        "https://www.icao.int/Security/FAL/PKI/Pages/ICAO-Doc-9303.aspx",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
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
          name: "Passport Photo Checker",
          item: "https://www.pixpassvisa.com/passport-photo-checker",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <PhotoCheckerTool
        initialCountry="US"
        lockCountry={false}
        initialDocType="passport"
        badgeText="Country Presets · Free Automated Checks"
        title="Passport Photo Checker"
        highlightTitle="Automated Photo Feedback"
        subtitle="Select a country preset to review common photo issues. Automated checks can miss problems and do not guarantee passport or visa acceptance."
        directAnswer={{
          question: "How does an online passport photo checker work?",
          answer: "Upload a photograph, choose a country preset, and review automated feedback on framing, background, lighting and facial position. These checks can miss issues. Server validation currently uses passport configurations, so a visa selection does not establish compliance with that visa application’s rules.",
          keyPoints: [
            "Analyzes 30+ biometric parameters including head proportion & eye level",
            "Automatic checks for plain white or light grey background uniformity",
            "Scans for prohibited items: eyeglasses, hats, shadows, open mouth",
            "Country presets must be checked against the requirements for your application",
            "Instant pass/fail compliance scoring before submitting to official authorities",
          ],
          lastReviewed: "September 2026",
          sourceAuthority: "ICAO Doc 9303 Biometric Specifications & National Consular Gazettes",
        }}
        officialSources={[
          {
            name: "ICAO Doc 9303 (Machine Readable Travel Documents Part 3)",
            url: "https://www.icao.int/publications/doc-series/doc-9303",
            authority: "International Civil Aviation Organization",
          },
          {
            name: "ISO/IEC 19794-5 Biometric Data Interchange Standard",
            url: "https://www.iso.org/standard/50864.html",
            authority: "International Organization for Standardization",
          },
          {
            name: "U.S. Department of State Passport Photograph Requirements",
            url: "https://travel.state.gov/content/travel/en/passports/how-apply/photos.html",
            authority: "Bureau of Consular Affairs",
          },
        ]}
        specs={[
          { label: "Reference Rules", value: "Check issuing-authority instructions" },
          { label: "Country Coverage", value: "50+ Supported Countries" },
          { label: "Biometric Checks", value: "30+ Automated Parameters" },
          { label: "Landmark Precision", value: "468-Point MediaPipe Grid" },
          { label: "Processing Time", value: "Varies by image, network and server" },
          { label: "Processing", value: "Server processing and storage" },
        ]}
        requirements={[
          {
            icon: <Globe className="w-5 h-5 text-blue-600" />,
            title: "50+ Country Specifications",
            desc: "Uses configured country presets. Confirm that the preset matches your document and submission method.",
          },
          {
            icon: <Ruler className="w-5 h-5 text-blue-600" />,
            title: "Biometric Head Proportion",
            desc: "Measures head position and proportions. Review the result and the authority’s requirements separately.",
          },
          {
            icon: <ImageIcon className="w-5 h-5 text-blue-600" />,
            title: "Background Uniformity",
            desc: "Scans background pixels for shadows, textures, patterns, or incorrect colors required by your destination authority.",
          },
          {
            icon: <Sun className="w-5 h-5 text-blue-600" />,
            title: "Balanced Illumination Check",
            desc: "Identifies harsh side shadows, flash hotspots, overexposure, and uneven lighting across the face.",
          },
          {
            icon: <Eye className="w-5 h-5 text-blue-600" />,
            title: "Eye Visibility & Expression",
            desc: "Verifies horizontal eye line, open eyes, closed mouth, and absence of prohibited eyewear or hair obstruction.",
          },
          {
            icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
            title: "Scored Diagnostic Report",
            desc: "Provides clear pass/fail status for every metric alongside actionable guidance to fix any identified issue.",
          },
        ]}
        faqs={faqs}
        relatedTools={[
          {
            title: "Online Photo Checker",
            desc: "Instant web-based biometric checker for all documents.",
            href: "/online-passport-photo-checker",
            icon: <Zap className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Australian Photo Checker",
            desc: "DFAT and APO official passport compliance checker.",
            href: "/australian-passport-photo-checker",
            icon: <FileCheck className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "DV Lottery Photo Checker",
            desc: "Diversity Visa 600x600 px photo validation tool.",
            href: "/diversity-visa-lottery-photo-checker",
            icon: <FileCheck className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "UK Passport Photo Checker",
            desc: "Official GOV.UK 35×45mm passport photo compliance checker.",
            href: "/uk-passport-photo-checker-online-free",
            icon: <FileCheck className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Free Photo Validator",
            desc: "Validate any passport or visa photo across 50+ countries.",
            href: "/visa-photo-validator",
            icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Global Photo Size Guide",
            desc: "Compare official passport and visa photo sizes across 50+ countries.",
            href: "/passport-photo-sizes",
            icon: <Globe className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Passport Size Photo Maker",
            desc: "Create and crop compliant passport photos online.",
            href: "/passport-size-photo-maker",
            icon: <Camera className="w-4 h-4 text-blue-600" />,
          },
        ]}
      />
    </>
  );
}
