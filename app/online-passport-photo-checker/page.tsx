import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";
import { Zap, Ruler, ImageIcon, Sun, Eye, Globe, Target, RefreshCw, FileCheck, Camera, CheckCircle2 } from "lucide-react";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Online Passport Photo Checker – Free Instant Photo Test (2026)",
  description:
    "Check your passport photo online for free before you apply. Upload a photo and get an instant pass/fail on size, head position, background, and lighting for 50+ countries — no download, no sign-up.",
  keywords: [
    
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/online-passport-photo-checker",
    languages: {
      en: "https://www.pixpassvisa.com/online-passport-photo-checker",
      "x-default": "https://www.pixpassvisa.com/online-passport-photo-checker",
    },
  },
  openGraph: {
    title: "Online Passport Photo Checker – Free Instant Photo Test",
    description:
      "Upload your photo and see instantly whether it's ready to submit. Free online check for size, head position, background, and lighting across 50+ countries.",
    url: "https://www.pixpassvisa.com/online-passport-photo-checker",
    siteName: "PixPassVisa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Online Passport Photo Checker Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Passport Photo Checker – Free Instant Photo Test",
    description:
      "Free online passport photo checker. See if your size, background, and lighting pass before you submit — results in seconds.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function OnlinePassportPhotoCheckerPage() {
  const faqs = [
    {
      question: "Do I need to download an app to use this checker?",
      answer:
        "No. Everything runs directly in your browser on your phone, tablet, or computer. There's nothing to install, and nothing gets left behind on your device once you close the tab. If you find yourself on a native app store search instead, know that a browser-based check works just as well and skips the install entirely.",
    },
    {
      question: "How long does the online check actually take?",
      answer:
        "Most uploads come back with a full result in under three seconds. The tool maps out the key points on your face and frame the moment the image finishes uploading, then compares those measurements against the rules for the country you selected, so there's no waiting around for a human reviewer.",
    },
    {
      question: "Can I check a photo I already took on my phone?",
      answer:
        "Yes, and that's how most people use it. A recent smartphone photo has plenty of resolution to pass. For the best result, take it facing a window during the day with a plain wall behind you, rather than under indoor lighting or with a busy background, since those two factors cause the most avoidable fails.",
    },
    {
      question: "What image formats and file sizes are supported?",
      answer:
        "JPEG, PNG, and WebP files up to 10 MB all upload without any conversion needed. If your camera or phone saves in HEIC format, most devices will convert it to JPEG automatically when you export or share the file, so that's rarely a problem in practice.",
    },
    {
      question: "Do I have to create an account or give my email?",
      answer:
        "No sign-up, no email address, and no payment details are needed at any point. You can open the page, upload a photo, and see your result without creating a login, and you're welcome to close the tab and come back later without losing access to the tool.",
    },
    {
      question: "What happens if my photo fails part of the check?",
      answer:
        "You'll see exactly which category failed — for example, the head is sized outside the allowed range, the background isn't uniform, or there's a shadow across part of the face — along with a plain-language note on what to change. From there you can either retake the photo with that fix in mind, or run it through our cropping and background tools before checking it again.",
    },
    {
      question: "Is the checker accurate enough to trust before I submit?",
      answer:
        "It measures the same things a passport office's intake software checks: head-to-frame ratio, eye position, background tone, lighting balance, and expression. It's a strong pre-check that catches the overwhelming majority of common mistakes, though the final word always rests with the agency or embassy that processes your actual application.",
    },
    {
      question: "Can I use this to check a visa photo instead of a passport photo?",
      answer:
        "Yes. Many visa photo specifications closely mirror passport photo rules for the same country, and the tool lets you select the document type so it applies the correct template. If your destination has a separate visa photo standard, switching the document type will load those specific dimensions and requirements instead.",
    },
    {
      question: "Why does the tool ask me to pick a country first?",
      answer:
        "Photo requirements aren't universal — head height, allowed background colors, and even the exact pixel or millimeter dimensions differ from one government to the next. Selecting your destination lets the checker apply the correct rulebook automatically instead of testing your photo against a generic, one-size-fits-all standard that might not match what your application actually needs.",
    },
    {
      question: "Does the checker work equally well on desktop and mobile?",
      answer:
        "Yes, the page is built to work the same way on a phone browser as it does on a laptop or desktop computer. You can upload a photo from your camera roll on mobile just as easily as dragging a file in on desktop, and the same checks and report format apply either way.",
    },
    {
      question: "Is my photo stored or shared with anyone after I upload it?",
      answer:
        "No. Your image is processed just long enough to generate your compliance report and is not written to a permanent database, shared with any government agency, or passed on to a third party. Once you close or refresh the page, there's nothing left saved on our end.",
    },
    {
      question: "Can I check the same photo more than once?",
      answer:
        "Yes, as many times as you like. If you adjust the crop, retake the shot, or change the background after seeing your first result, you're free to upload the new version and run the check again at no cost, with no limit on how many attempts you use.",
    },
    {
      question: "Will this checker work for a photo booth or kiosk print?",
      answer:
        "Yes. Photograph the printed photo booth strip with your phone camera under good lighting, or scan it if you have access to a scanner, then upload that image the same way you would a digital photo. The checker measures proportions and tone the same way regardless of whether the original was captured digitally or printed first, so a kiosk photo can be verified just as easily.",
    },
    {
      question: "What's the difference between this and the main passport photo checker?",
      answer:
        "They share the same underlying biometric engine, but this page is built around the browser-first, no-download experience for people who just want a quick check without extra reading. If you'd rather see country comparison tables, detailed rejection guidance, and step-by-step photo-taking tips alongside the tool, the main passport photo checker page covers that in more depth.",
    },
    {
      question: "Can I trust the result if my country isn't listed by default?",
      answer:
        "The country selector covers more than fifty destinations, and new ones are added as requirements change, so most applicants will find their country ready to go. If your specific destination isn't yet in the list, the general passport photo standard the tool defaults to still checks the same core categories — framing, background, lighting, and expression — that almost every country's rulebook shares, so it's still a useful sanity check before you submit.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Online Passport Photo Checker",
      url: "https://www.pixpassvisa.com/online-passport-photo-checker",
      description:
        "Free online passport photo checker that runs in the browser with no download or sign-up, verifying size, head position, background, and lighting against official standards for 50+ countries.",
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
      name: "Online Passport Photo Checker",
      url: "https://www.pixpassvisa.com/online-passport-photo-checker",
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
          name: "Online Passport Photo Checker",
          item: "https://www.pixpassvisa.com/online-passport-photo-checker",
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
        badgeText="No Download, No Sign-Up · Runs Right in Your Browser"
        title="Online Passport Photo Checker"
        highlightTitle="Free, Instant, In-Browser Photo Test"
        subtitle="Before you print, upload, or hand a photo across the counter, run it through this checker. It's nothing more than your browser and your photo — pick your destination country, upload the image, and get a full pass/fail breakdown in a few seconds."
        directAnswer={{
          question: "How do I check my passport photo online for free?",
          answer: "You can check your passport photo online instantly using our browser-based validator. Upload your photo from your phone or computer, and our computer vision algorithm will test your image across 30+ biometric standards—including exact dimensions (2×2 in / 35×45 mm), head proportion (50–69% or 70–80%), eye line alignment, background color uniformity, lighting balance, and prohibited items (glasses, hats, smiles). No download, app install, or email sign-up required.",
          keyPoints: [
            "Instant results in under 3 seconds directly in your web browser",
            "Zero image retention: photos processed ephemerally in RAM and immediately discarded",
            "Covers official rules for 50+ countries including US, UK, Canada, Schengen, and Australia",
            "Tests background uniformity, face height, eye height, tilt, and glare",
            "Includes actionable fix instructions for any flagged parameter",
          ],
          lastReviewed: "September 2026",
          sourceAuthority: "ICAO Doc 9303, ISO/IEC 19794-5 & National Passport Issuing Authorities",
        }}
        officialSources={[
          {
            name: "ICAO Doc 9303 Machine Readable Travel Documents",
            url: "https://www.icao.int/publications/doc-series/doc-9303",
            authority: "International Civil Aviation Organization",
          },
          {
            name: "U.S. Department of State Passport Photo Requirements",
            url: "https://travel.state.gov/content/travel/en/passports/how-apply/photos.html",
            authority: "U.S. Bureau of Consular Affairs",
          },
          {
            name: "UK HMPO Passport Photo Standards",
            url: "https://www.gov.uk/photos-for-passports",
            authority: "HM Passport Office",
          },
        ]}
        specs={[
          { label: "Check Duration", value: "Under 3 Seconds" },
          { label: "Install Required", value: "None — Browser Only" },
          { label: "Privacy Protection", value: "No Images Stored" },
          { label: "Compliance Report", value: "Full Category Breakdown" },
          { label: "Country Coverage", value: "50+ Global Standards" },
          { label: "Service Cost", value: "Free, Unlimited Checks" },
        ]}
        requirements={[
          {
            icon: <Zap className="w-5 h-5 text-blue-600" />,
            title: "Instant, Real-Time Processing",
            desc: "Facial landmark analysis runs the moment your photo finishes uploading, so you're not left waiting for a report to come back by email.",
          },
          {
            icon: <Ruler className="w-5 h-5 text-blue-600" />,
            title: "Frame & Head Proportion",
            desc: "Measures head height, eye level, and chin position against the exact percentage windows your chosen country requires.",
          },
          {
            icon: <ImageIcon className="w-5 h-5 text-blue-600" />,
            title: "Background Uniformity",
            desc: "Flags shadows, patterned walls, and off-tone backdrops that don't match the plain white or grey standard set for your destination.",
          },
          {
            icon: <Sun className="w-5 h-5 text-blue-600" />,
            title: "Lighting & Glare Check",
            desc: "Picks up harsh flash glare, one-sided shadows, and uneven exposure across the face that a manual reviewer would also catch.",
          },
          {
            icon: <Eye className="w-5 h-5 text-blue-600" />,
            title: "Expression & Visibility",
            desc: "Confirms a neutral, closed-mouth expression with both eyes open and clear, and checks that hair or eyewear isn't obscuring your features.",
          },
          {
            icon: <Globe className="w-5 h-5 text-blue-600" />,
            title: "Country-Specific Rulebook",
            desc: "Applies the exact dimensions and thresholds for the country and document type you select, instead of a generic one-size-fits-all standard.",
          },
          {
            icon: <Target className="w-5 h-5 text-blue-600" />,
            title: "Plain-Language Fix Notes",
            desc: "Each flagged issue comes with a clear explanation of what caused it and what to change before your next attempt.",
          },
          {
            icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
            title: "Unlimited Free Retries",
            desc: "Upload a revised photo and re-run the check as many times as you need until every category comes back a clean pass.",
          },
        ]}
        faqs={faqs}
        relatedTools={[
          {
            title: "Global Photo Size Guide",
            desc: "Complete 50+ country size, mm, inch, and pixel reference table.",
            href: "/passport-photo-sizes",
            icon: <Ruler className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Passport Photo Checker",
            desc: "Universal compliance validator built around ICAO Doc 9303 standards.",
            href: "/passport-photo-checker",
            icon: <Globe className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Australian Photo Checker",
            desc: "DFAT and Australian Passport Office compliance checker.",
            href: "/australian-passport-photo-checker",
            icon: <FileCheck className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "DV Lottery Photo Checker",
            desc: "600×600px Diversity Visa lottery photo validation tool.",
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
            title: "Passport Size Photo Maker",
            desc: "Crop, resize, and create a print-ready passport photo online.",
            href: "/passport-size-photo-maker",
            icon: <Camera className="w-4 h-4 text-blue-600" />,
          },
        ]}
      />
    </>
  );
}