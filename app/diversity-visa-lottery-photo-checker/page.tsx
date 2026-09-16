import type { Metadata, Viewport } from "next";
import PhotoCheckerTool from "@/app/components/PhotoCheckerTool";
import {
  Ruler,
  Sparkles,
  Eye,
  Glasses,
  Image as ImageIcon,
  HardDrive,
  User,
  Calendar,
  Globe,
  Zap,
  FileCheck,
  Crop,
  CheckCircle2,
} from "lucide-react";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "DV Lottery Photo Checker – Free Green Card Photo Validator 2026/2027",
  description:
    "Free DV Lottery photo checker for the 2026/2027 Diversity Visa program. Instantly verify the 600×600px square size, 50–69% head height, 240KB file limit, and every US Department of State requirement before you submit.",
  keywords: [
  
  ],
  alternates: {
    canonical: "https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker",
    languages: {
      en: "https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker",
      "x-default": "https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker",
    },
  },
  openGraph: {
    title: "DV Lottery Photo Checker – Free Green Card Photo Validator",
    description:
      "Don't get disqualified over a photo. Check your DV Lottery entry photo against every official rule: 600×600px, 50–69% head height, 240KB, no glasses, plain white background.",
    url: "https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker",
    siteName: "PixPassVisa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg",
        width: 1200,
        height: 630,
        alt: "Diversity Visa Lottery Photo Checker Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DV Lottery Photo Checker – Free Green Card Photo Validator",
    description:
      "Check your DV Lottery photo before you submit it. Free test against every US State Department rule: size, head height, file size, and background.",
    images: ["https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg"],
  },
};

export default function DVLotteryPhotoCheckerPage() {
  const faqs = [
    {
      question: "Can a bad photo really disqualify my DV Lottery entry?",
      answer:
        "Yes, and it happens to a large number of entrants every cycle. The Kentucky Consular Center runs every uploaded photo through an automated check before your entry is even accepted, and entries that fail are thrown out with no warning. You typically won't find out until you check your entry status months later and see a disqualification notice, by which point the entry window has already closed. Running your photo through a checker before you submit removes almost all of that risk.",
    },
    {
      question: "What exact pixel dimensions does a DV Lottery photo need?",
      answer:
        "The photo must be a perfectly square digital image, 600 pixels wide by 600 pixels tall, saved as a JPEG. If you're scanning a printed photo instead of using a digital file, it should measure 2×2 inches (51×51mm) at 300 DPI. Rectangular crops, even ones that are only a pixel or two off from square, are rejected by the upload portal automatically.",
    },
    {
      question: "How is the head height requirement measured?",
      answer:
        "Head height is measured from the bottom of the chin straight up to the top of the head, including hair, and it needs to fill between 50% and 69% of the photo's total height — roughly 300 to 414 pixels out of the 600-pixel frame. On top of that, your eyes need to sit between 56% and 69% of the way up from the bottom edge. Photos taken too far back leave the head too small; photos cropped too tight push it over the maximum.",
    },
    {
      question: "Am I allowed to wear glasses in my DV Lottery photo?",
      answer:
        "No. Eyeglasses have been completely banned in US visa and passport photography since November 2016, and the Diversity Visa program follows that same rule with no exceptions. This includes prescription glasses, reading glasses, and tinted or photochromic lenses. If your eyes aren't fully visible without any lens between them and the camera, the photo will be flagged.",
    },
    {
      question: "What's the maximum file size for the DV Lottery upload portal?",
      answer:
        "dvprogram.state.gov caps uploads at 240 KB, and the file has to be a JPEG using 24-bit sRGB color. If your phone or camera saves images much larger than that, you'll need to compress the file without dropping the resolution below 600×600px, since aggressive compression that blurs facial detail can also cause a manual review to reject it.",
    },
    {
      question: "Can I reuse the photo I used for a previous year's entry?",
      answer:
        "No. The State Department requires that your photo be taken within the last six months, and reusing an older image — even one that was accepted in a prior DV cycle — goes against that rule. Your appearance can change enough in a year that an outdated photo also risks failing an identity check later in the immigrant visa process, so it's worth taking a fresh one each time you enter.",
    },
    {
      question: "Does the background have to be pure white?",
      answer:
        "It needs to be plain white or an off-white so light it reads as white, with even lighting and no visible shadow, texture, pattern, or other people or objects behind you. Colored walls, patterned curtains, and busy indoor backgrounds are common reasons entries fail the automated check, since the software specifically measures the uniformity of the tone behind your head and shoulders.",
    },
    {
      question: "Can I submit a photo of myself wearing a hat or head covering?",
      answer:
        "Only if it's worn daily for religious reasons, and even then your full face from the bottom of the chin to the top of the forehead needs to remain visible, with no shadow falling across your features from the covering itself. Hats, sunglasses, or headphones worn for any other reason are not permitted and will cause the photo to be rejected.",
    },
    {
      question: "Do I need a neutral expression, or can I smile?",
      answer:
        "A neutral expression with your mouth closed is what the program expects, and both eyes should be open and looking directly at the camera. A natural smile without teeth showing is tolerated by some reviewers, but a wide grin, raised eyebrows, or a tilted head can all be read as non-compliant, so the safest choice is a relaxed, straight-on expression.",
    },
    {
      question: "Can I use a selfie for my DV Lottery photo?",
      answer:
        "It's possible, but it's the riskiest option. Front-camera lenses on phones are wide-angle, which distorts the proportions of your nose and face at close range and can throw off the head-height measurement. If you do use a phone, have someone else hold it at eye level a few feet away instead of shooting an arm's-length selfie, then check the result before you upload it.",
    },
    {
      question: "Will color casts or filters get my photo rejected?",
      answer:
        "Yes. Instagram-style filters, warm or cool color grading, heavy skin-smoothing, and auto-enhance features on some phone cameras can all shift the color balance enough to fail the sRGB and lighting checks. Submit the photo as close to the unedited original as possible, taken in natural daylight rather than under colored indoor lighting.",
    },
    {
      question: "Is this DV Lottery photo checker actually free?",
      answer:
        "Yes, completely. You can upload and re-check your photo as many times as you need at no cost, with no account required and no watermark placed on your image, right up until you're confident it will pass on the official portal.",
    },
    {
      question: "What are the exact photo requirements for the DV Lottery?",
      answer:
        "Your photo must be an exact 600×600 pixel square in JPEG format, 24-bit sRGB color, and under 240 KB. Your head (chin to top of head) must take up 50% to 69% of the total height (300 to 414 pixels), and your eye height must sit between 56% and 69% (336 to 414 pixels) from the bottom of the image. The background must be plain white or off-white, and glasses of any kind are strictly forbidden.",
    },
    {
      question: "Can I wear eyeglasses in my DV Lottery photo?",
      answer:
        "No. Eyeglasses have been completely banned in U.S. visa and passport photos since November 2016. Submitting an entry with glasses on will result in automatic disqualification by the State Department's intake system with no opportunity to reapply during that year's window.",
    },
    {
      question: "Can I reuse the photo from my last year's DV entry?",
      answer:
        "No. The State Department rules state that the photo must have been taken within the last six months to reflect your current appearance. The DV portal runs facial recognition comparisons against previous entries and automatically disqualifies applicants who submit the same photo across consecutive years.",
    },
    {
      question: "How do I take a compliant DV lottery photo with my phone?",
      answer:
        "Stand 1.5 to 2 metres from a plain white or off-white wall in a well-lit room facing a window for even, shadow-free natural lighting. Hold your phone at eye level, look straight into the camera with a neutral expression and both eyes open, and ensure nothing covers your face or casts shadows behind you.",
    },
    {
      question: "Is this DV Lottery photo checker free to use?",
      answer:
        "Yes, 100% free with unlimited checks. There is no sign-up, email requirement, or download required. Your photo is analyzed in real time in your browser and is never stored permanently or shared with anyone.",
    },
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "DV Lottery Photo Checker",
      url: "https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker",
      description:
        "Free online Diversity Visa lottery photo checker verifying 600x600px square dimensions, 50-69% head height, 240KB file cap, and no-glasses rules against official US State Department DV-2027 specifications.",
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
      name: "DV Lottery Photo Checker",
      url: "https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker",
      citation: [
        "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-instructions.html",
        "https://dvprogram.state.gov/",
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
          name: "Diversity Visa Lottery Photo Checker",
          item: "https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker",
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
        countryName="United States (DV / Green Card)"
        initialDocType="passport"
        badgeText="Built on the Official DV-2027 State Dept Spec · Free & Instant"
        title="DV Lottery Photo Checker"
        highlightTitle="Free Green Card Photo Validator"
        subtitle="One bad photo is enough to get a Diversity Visa entry thrown out with no warning. Upload yours here first and see exactly whether it meets the 600×600px square size, 50–69% head height, 240KB file cap, and every other rule the dvprogram.state.gov portal checks for."
        directAnswer={{
          question: "What are the exact photo requirements for the DV Lottery 2026/2027?",
          answer: "The US Department of State requires an exact 600×600 pixel square image in JPEG format (maximum 240 KB, 24-bit color). Your head height (from the bottom of the chin to the top of the hair) must occupy between 50% and 69% (300 to 414 pixels) of the image height, and eye level must sit between 56% and 69% from the bottom edge. Eyeglasses are strictly forbidden, and the background must be plain white or off-white with no shadows.",
          keyPoints: [
            "Exact 600 × 600 pixels (1:1 square aspect ratio)",
            "Head height: 50% to 69% (300 to 414 px)",
            "File size: 240 KB maximum (JPEG format only)",
            "Zero eyewear tolerance: Eyeglasses strictly forbidden since 2016",
            "Plain white/off-white background with neutral facial expression",
            "Photo must be taken within the last 6 months",
          ],
          lastReviewed: "September 2026",
          sourceAuthority: "U.S. Department of State — DV Program Instructions",
        }}
        officialSources={[
          {
            name: "Official Diversity Visa Program Instructions (DV-2027)",
            url: "https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-instructions.html",
            authority: "U.S. Department of State",
          },
          {
            name: "Department of State Electronic Diversity Visa Entry Portal",
            url: "https://dvprogram.state.gov/",
            authority: "Consular Electronic Application Center",
          },
          {
            name: "U.S. Visa & Passport Photograph Composition Guidelines",
            url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
            authority: "Bureau of Consular Affairs",
          },
        ]}
        specs={[
          { label: "Dimensions", value: "600 × 600 px (2×2 in / 51×51 mm)" },
          { label: "Aspect Ratio", value: "Square (1:1 Ratio)" },
          { label: "Head Height", value: "50% – 69% (300 – 414 px)" },
          { label: "Eye Height", value: "56% – 69% from bottom" },
          { label: "Max File Size", value: "240 KB (JPEG format)" },
          { label: "Eyewear", value: "Strictly Prohibited (No Glasses)" },
        ]}
        requirements={[
          {
            icon: <Ruler className="w-5 h-5 text-blue-600" />,
            title: "Perfect 600×600px Square",
            desc: "Confirms your file is an exact 1:1 square at 600×600 pixels — the precise canvas the dvprogram.state.gov upload form expects, with no cropping tolerance.",
          },
          {
            icon: <Sparkles className="w-5 h-5 text-blue-600" />,
            title: "Head Height Between 50–69%",
            desc: "Measures chin-to-crown height in pixels and flags photos where the head is cropped too tight or the subject was photographed too far from the camera.",
          },
          {
            icon: <Eye className="w-5 h-5 text-blue-600" />,
            title: "Eye Line at 56–69%",
            desc: "Locates your eyes and checks their vertical position falls inside the exact biometric band the State Department's automated review looks for.",
          },
          {
            icon: <Glasses className="w-5 h-5 text-blue-600" />,
            title: "Zero Tolerance for Eyewear",
            desc: "Scans for glasses, sunglasses, and tinted lenses of any kind — one of the single most common reasons DV entries get disqualified.",
          },
          {
            icon: <ImageIcon className="w-5 h-5 text-blue-600" />,
            title: "Plain, Evenly Lit Background",
            desc: "Checks for a solid white or off-white backdrop with no shadows, patterns, textures, or other people or objects visible behind you.",
          },
          {
            icon: <HardDrive className="w-5 h-5 text-blue-600" />,
            title: "File Size Under 240 KB",
            desc: "Verifies your JPEG sits under the strict 240 KB ceiling in 24-bit sRGB color without compression artifacts that would blur facial detail.",
          },
          {
            icon: <User className="w-5 h-5 text-blue-600" />,
            title: "Neutral, Forward-Facing Pose",
            desc: "Confirms a straight-on head position, both eyes open, and a relaxed expression free of exaggerated smiling or head tilt.",
          },
          {
            icon: <Calendar className="w-5 h-5 text-blue-600" />,
            title: "Recent, Unedited Capture",
            desc: "Reminds you the photo needs to be less than six months old and free of filters, color grading, or heavy retouching that can distort skin tone.",
          },
        ]}
        faqs={faqs}
        relatedTools={[
          {
            title: "Passport Photo Checker",
            desc: "Universal biometric passport photo compliance validator for 50+ countries.",
            href: "/passport-photo-checker",
            icon: <Globe className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Online Photo Checker",
            desc: "Instant in-browser passport and visa photo test with no download needed.",
            href: "/online-passport-photo-checker",
            icon: <Zap className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Australian Photo Checker",
            desc: "Test your image against the official DFAT and Australian Passport Office standards.",
            href: "/australian-passport-photo-checker",
            icon: <FileCheck className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "2x2 Picture Editor",
            desc: "Crop and resize photos to the exact 2×2 inch standard used for US visas and green cards.",
            href: "/2x2-picture-editor",
            icon: <Crop className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "US Visa Photo Editor",
            desc: "Format 600×600 px digital photos with pure white background for DS-160.",
            href: "/us-visa-photo-editor",
            icon: <FileCheck className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Global Photo Size Guide",
            desc: "Compare exact millimeter and pixel dimensions across 50+ countries.",
            href: "/passport-photo-sizes",
            icon: <Globe className="w-4 h-4 text-blue-600" />,
          },
          {
            title: "Visa Photo Validator",
            desc: "Run biometric checks against official ICAO-based requirements for 50+ countries.",
            href: "/visa-photo-validator",
            icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />,
          },
        ]}
      />
    </>
  );
}