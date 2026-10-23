import type { Metadata } from 'next';
import PhotoCheckerTool from '@/app/components/PhotoCheckerTool';

const url = 'https://www.pixpassvisa.com/australian-passport-photo-checker';
const title = 'Australian Passport Photo Checker & Print Requirements | PixPassVisa';
const description = 'Free supplementary Australian passport photo checks. Review framing, lighting and print requirements before visiting a photo provider. No acceptance guarantee.';
const official = 'https://www.passports.gov.au/help/passport-photos';
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: 'PixPassVisa', locale: 'en_AU', type: 'website' },
  twitter: { card: 'summary', title, description },
};
const faqs = [
  { question: 'What size is an Australian passport photo?', answer: 'The Australian Passport Office specifies 35–40 mm wide and 45–50 mm high, with a chin-to-crown height of 32–36 mm. Our 35 × 45 mm preset is one size within that range; it is not the only permitted size. Check the actual finished print.' },
  { question: 'Does a passing check guarantee acceptance?', answer: 'No. Automated feedback is supplementary and cannot verify every requirement, the age of the original, or the quality of a physical print. The Australian Passport Office decides acceptance.' },
  { question: 'Can I use this result for an Australian visa?', answer: 'Passport and visa applications are different workflows. Follow the instructions for your exact visa and application portal; a passport check does not establish visa compliance.' },
  { question: 'Should I edit a shadow or background?', answer: 'Retake the original with better lighting instead. Australian passport photos must be unedited. The Australian Passport Office recommends professional photo providers and advises against online passport photo services and mobile apps.' },
  { question: 'What is free and what is paid?', answer: 'The check is free. Prepared digital downloads and printable sheets are separate paid products with a preview and price before checkout. They do not include physical prints or official certification. Do not buy an altered download as a substitute for the original required for your passport.' },
  { question: 'How is my photo handled?', answer: 'Read our privacy policy before uploading. The checker and optional preparation service have different processing steps; do not assume every step runs only on your device. No automated check constitutes government approval.' },
];
export default function AustralianPassportPhotoCheckerPage() {
  const schema = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: title, url, description, citation: official },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <PhotoCheckerTool initialCountry="AU" countryName="Australia" initialDocType="passport"
      badgeText="Independent photo guidance · Free supplementary check"
      title="Australian Passport Photo Checker" highlightTitle="Check your original before printing"
      subtitle="Review common framing and lighting issues, then arrange suitable photo capture and printing. This independent checker cannot approve your passport photo or replace the Australian Passport Office assessment."
      directAnswer={{ question: 'What should I prepare for an Australian passport application?', answer: 'Supply two recent, unedited photos. The official size range is 35–40 mm wide by 45–50 mm high. Use a professional photo provider for capture and suitable printing; a digital checker cannot inspect your paper or print quality.', keyPoints: ['Chin-to-crown height: 32–36 mm', 'Use the original; retake poor lighting or background', 'Passport checks do not establish visa eligibility'], lastReviewed: '23 October 2026', sourceAuthority: 'Australian Passport Office' }}
      officialSources={[{ name: 'Australian Passport Office photo guidelines', url: official, authority: 'Australian Passport Office' }]}
      specs={[{ label: 'Official print width', value: '35–40 mm' }, { label: 'Official print height', value: '45–50 mm' }, { label: 'Face height', value: '32–36 mm' }, { label: 'Photo age', value: 'Less than 6 months' }]}
      requirements={[{ title: 'Check the final print', desc: 'Use the paper and printing process specified by the Australian Passport Office. A pixel dimension alone cannot establish physical print quality.' }, { title: 'Retake instead of retouching', desc: 'Keep a genuine original. A prepared or altered image is not a shortcut around the official capture and editing rules.' }, { title: 'Choose the correct application', desc: 'For a visa or another identity document, check that issuer’s instructions separately before preparing a file.' }]}
      faqs={faqs}
      relatedTools={[{ title: 'Photo privacy', desc: 'Understand how photos and personal information are handled.', href: '/privacy-policy' }, { title: 'Compare country requirements', desc: 'Choose the document and submission route you actually need.', href: '/passport-photo-country-guide' }, { title: 'Contact support', desc: 'Ask about a preview, payment or download before purchasing.', href: '/contact' }]}
    />
  </>;
}
