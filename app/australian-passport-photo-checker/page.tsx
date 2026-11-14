import type { Metadata } from 'next';
import PhotoCheckerTool from '@/app/components/PhotoCheckerTool';
import {
  Ruler,
  Sparkles,
  ImageIcon,
  Glasses,
  Eye,
  Monitor,
  Calendar,
  Target,
  Globe,
  Zap,
  Camera,
} from 'lucide-react';

const url = 'https://www.pixpassvisa.com/australian-passport-photo-checker';
const title = 'Australian Passport Photo Checker (2026) – Free DFAT & APO Biometric Test | PixPassVisa';
const description = 'Free Australian passport photo checker. Verify 35×45mm size, 32–36mm face height, plain background, and official DFAT & Australian Passport Office rules before you apply.';
const official = 'https://www.passports.gov.au/help/passport-photos';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'australian passport photo checker',
    'australia passport photo requirements',
    'apo passport photo size',
    'dfat photo checker',
    'australian passport photo online free',
    'check australian passport photo',
    'immiaccount photo requirements',
    'australian passport photo rejected',
  ],
  alternates: {
    canonical: url,
    languages: {
      en: url,
      'x-default': url,
    },
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'PixPassVisa',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg',
        width: 1200,
        height: 630,
        alt: 'Australian Passport Photo Checker Online Free',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://res.cloudinary.com/dipzpwbbk/image/upload/v1785679206/icao_visa_photo_example_whvfqt.jpg'],
  },
};

const faqs = [
  {
    question: 'What size does an Australian passport photo need to be?',
    answer:
      'Australian passport photos must measure 35mm to 40mm wide by 45mm to 50mm tall (standard size 35 × 45 mm). For digital uploads through ImmiAccount or passport renewal portals, the minimum resolution is 413 × 531 pixels at 300 DPI, saved as a JPEG.',
  },
  {
    question: 'What is the 32–36mm face height rule enforced by the APO?',
    answer:
      'The Australian Passport Office (APO) measures from the bottom of your chin to the top of your head (crown), requiring that measurement to be between 32mm and 36mm within the 45mm-tall frame. Stand too close or too far and the photo will be rejected.',
  },
  {
    question: 'Are glasses allowed in Australian passport photos?',
    answer:
      'No. The Australian Government strictly bans eyeglasses in passport photos, including reading glasses, to ensure seamless SmartGate biometric matching at border control. Documented medical exceptions require a doctor’s certificate.',
  },
  {
    question: 'What background does the Australian Passport Office require?',
    answer:
      'The background must be plain white or light grey, evenly lit with no visible shadows, textures, or patterns anywhere behind the subject.',
  },
  {
    question: 'Does this checker work for ImmiAccount Australian visa photos?',
    answer:
      'Yes. The Department of Home Affairs applies the same 35×45mm dimensions and 32–36mm chin-to-crown height rule to visa photos uploaded through ImmiAccount.',
  },
  {
    question: 'How do I take a compliant Australian passport photo on my phone?',
    answer:
      'Stand 1.5 to 2 meters away from a plain white or light wall, face natural window lighting, remove all eyewear, keep a neutral facial expression with your mouth closed, and upload your image to our checker for instant verification and cropping.',
  },
];

export default function AustralianPassportPhotoCheckerPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      url,
      description,
      citation: official,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <PhotoCheckerTool
        initialCountry="AU"
        countryName="Australia"
        initialDocType="passport"
        badgeText="Official APO & DFAT Standards · Free Instant Biometric Test"
        title="Australian Passport Photo Checker"
        highlightTitle="Biometric Compliance for APO & ImmiAccount"
        subtitle="Check your Australian passport or visa photo against official Australian Passport Office (APO) and DFAT standards. Validates 35×45mm dimensions, 32–36mm face height, lighting, and background instantly."
        directAnswer={{
          question: 'What are the official Australian passport photo specifications?',
          answer:
            'Australian passport photos require 35–40 mm width by 45–50 mm height, with a chin-to-crown height strictly between 32 mm and 36 mm. Eyeglasses are prohibited, the background must be plain white or light grey with no shadows, and photos must be taken within the last 6 months.',
          keyPoints: [
            'Size: 35×45 mm (413×531 px digital minimum at 300 DPI)',
            'Chin-to-crown face height: 32–36 mm',
            'Eyeglasses banned for SmartGate biometric compatibility',
            'Plain white or light grey background without shadows',
          ],
          lastReviewed: 'November 2026',
          sourceAuthority: 'Australian Passport Office & DFAT',
        }}
        officialSources={[
          {
            name: 'Australian Passport Office (APO) Photo Guidelines',
            url: official,
            authority: 'Australian Passport Office',
          },
          {
            name: 'Department of Home Affairs Photo Requirements (ImmiAccount)',
            url: 'https://immi.homeaffairs.gov.au/help-support/applying-online-or-on-paper/online/photo-specifications',
            authority: 'Australian Department of Home Affairs',
          },
        ]}
        specs={[
          { label: 'Dimensions', value: '35 × 45 mm' },
          { label: 'Face Height', value: '32 – 36 mm (chin to crown)' },
          { label: 'Background', value: 'Plain White or Light Grey' },
          { label: 'Eyeglasses', value: 'Strictly Prohibited' },
          { label: 'Digital Size', value: 'Min 413 × 531 px (300 DPI)' },
          { label: 'Expression', value: 'Neutral, mouth closed' },
        ]}
        requirements={[
          {
            icon: <Ruler className="w-5 h-5 text-blue-600" />,
            title: 'Exact 35×45 mm Frame',
            desc: "Confirms your printed or digital photo matches the precise APO dimensions before it's rejected for being off by even a fraction of a millimetre.",
          },
          {
            icon: <Sparkles className="w-5 h-5 text-blue-600" />,
            title: '32–36 mm Chin-to-Crown',
            desc: 'Maps facial landmarks to check your head height falls within the mandatory range, catching the too-close and too-far mistakes that account for most fails.',
          },
          {
            icon: <ImageIcon className="w-5 h-5 text-blue-600" />,
            title: 'Plain White Background',
            desc: 'Scans for even lighting and flags shadows, tinted walls, or texture behind you — the single most common reason the APO sends photos back.',
          },
          {
            icon: <Glasses className="w-5 h-5 text-blue-600" />,
            title: 'No Eyeglasses (APO Ban)',
            desc: "Detects any eyewear in the frame to enforce the Australian Government's strict no-glasses policy used for SmartGate biometric matching.",
          },
          {
            icon: <Eye className="w-5 h-5 text-blue-600" />,
            title: 'Neutral Facial Expression',
            desc: "Checks that your mouth is closed, both eyes are open and facing the camera, and your head isn't tilted or turned off-center.",
          },
          {
            icon: <Monitor className="w-5 h-5 text-blue-600" />,
            title: 'ImmiAccount & APO Ready',
            desc: 'Prepares your file format and proportions for direct upload to both the passport renewal portal and Department of Home Affairs visa applications.',
          },
          {
            icon: <Calendar className="w-5 h-5 text-blue-600" />,
            title: 'Current Likeness Reminder',
            desc: "Flags the six-month freshness expectation so you're not submitting an outdated photo that no longer matches your appearance.",
          },
          {
            icon: <Target className="w-5 h-5 text-blue-600" />,
            title: 'Clear Fix Guidance',
            desc: 'Every flagged issue comes with a plain-language explanation of the cause, so you know exactly what to adjust before your next attempt.',
          },
        ]}
        faqs={faqs}
        relatedTools={[
          {
            title: 'Australia Passport Photo Maker',
            desc: 'Crop, fix background, and generate compliant 35×45mm Australian photos.',
            href: '/australia-passport-photo-editor',
            icon: <Camera className="w-4 h-4 text-blue-600" />,
          },
          {
            title: 'Global Photo Size Guide',
            desc: 'Complete 50+ country size, mm, inch, and pixel reference table.',
            href: '/passport-photo-sizes',
            icon: <Ruler className="w-4 h-4 text-blue-600" />,
          },
          {
            title: 'Universal Passport Photo Checker',
            desc: 'Biometric passport photo compliance validator for 50+ countries.',
            href: '/passport-photo-checker',
            icon: <Globe className="w-4 h-4 text-blue-600" />,
          },
          {
            title: 'Online Photo Checker',
            desc: 'Instant in-browser passport and visa photo test with no download needed.',
            href: '/online-passport-photo-checker',
            icon: <Zap className="w-4 h-4 text-blue-600" />,
          },
          {
            title: 'UK Passport Photo Checker',
            desc: 'Official GOV.UK 35×45mm passport photo compliance checker.',
            href: '/uk-passport-photo-checker-online-free',
            icon: <Camera className="w-4 h-4 text-blue-600" />,
          },
          {
            title: 'All Country Guides',
            desc: 'Requirements for US, UK, Australia, Germany, and France.',
            href: '/passport-photo-country-guide',
            icon: <Globe className="w-4 h-4 text-blue-600" />,
          },
        ]}
      />
    </>
  );
}
