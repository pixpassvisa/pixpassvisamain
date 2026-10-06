import Link from 'next/link';
import type { SpecEntry } from '@/lib/slug-utils';

export default function DocumentGuidancePage({ spec, isVisa }: { spec: SpecEntry; isVisa: boolean }) {
  const document = isVisa ? 'visa' : 'passport';
  const icao = spec.id === 'icao-passport';
  return <main className="max-w-3xl mx-auto px-6 py-16 space-y-6">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href={isVisa ? '/visa-photo' : '/passport-photos'}>{isVisa ? 'Visa' : 'Passport'} photo directory</Link></nav>
    <h1 className="text-3xl font-bold">{icao ? 'ICAO photo standards and document requirements' : `${spec.country} ${document} photo guidance`}</h1>
    {icao ? <>
      <p>ICAO develops international standards for travel documents. It is not an issuing government, embassy, or application portal. An ICAO label alone does not establish the photo size or submission method for your application.</p>
      <h2 className="text-xl font-semibold">Choose the issuing authority and document</h2>
      <p>PixPassVisa has a generic 35 × 45 mm preset labelled ICAO. That is a tool setting, not a universal passport or visa specification. Choose a country and document and check the authority’s instructions before preparing or purchasing a photo.</p>
      <p><a href="https://www.icao.int/icao-trip/publications">ICAO publications: Machine Readable Travel Documents</a></p>
      <h2 className="text-xl font-semibold">What to review in your photograph</h2>
      <ul className="list-disc pl-6"><li>A clear frontal view and unobstructed facial features.</li><li>Even lighting and a background permitted by the issuing authority.</li><li>The document’s head position, image dimensions, and submission method.</li><li>Restrictions on cropping, background replacement, and digital changes.</li></ul>
      <p>Use a recent original photo and retake it when needed. An automated check cannot establish universal ICAO compliance. <Link href="/passport-photo-checker">Check common passport photo issues</Link> or <Link href="/us-visa-photo-editor">review the US visa preset and application guidance</Link>.</p>
    </> : <>
      <p>This page does not currently have a separate {spec.country} {document} preset. The available country preset is labelled {spec.name}; its dimensions must not be treated as requirements for this application.</p>
      <h2 className="text-xl font-semibold">Confirm the submission method first</h2>
      <p>Read the instructions for your exact application and the office handling it. Confirm whether a photo is captured at an appointment, uploaded digitally, or submitted as a print. Do not substitute another document’s preset just because it belongs to the same country.</p>
      {spec.country === 'Australia' && <p>For Australian visas, follow the document requests in <a href="https://immi.homeaffairs.gov.au/help-support/applying-online-or-on-paper/online">Home Affairs’ ImmiAccount guidance</a>. Our Australian passport preset is not a verified visa preset. <Link href="/blog/australia-visa-photo-requirements-size-specifications">Read the Australia visa photo guide</Link>.</p>}
      {spec.country === 'United Kingdom' && <p>UK visa applicants are told whether to attend a visa application centre or use the ID Check app. <a href="https://www.gov.uk/apply-to-come-to-the-uk/paying-fees-and-proving-your-identity">Check the GOV.UK identity workflow</a>.</p>}
      <h2 className="text-xl font-semibold">Details to check before taking the photo</h2>
      <ul className="list-disc pl-6"><li>The application category and whether a new photograph is requested.</li><li>Digital dimensions and file limits, or the physical print size.</li><li>Capture, background, editing, and photographer requirements.</li></ul>
      <p>These requirements remain unverified here. No acceptance claim is made, and this page does not select a different document on your behalf.</p>
    </>}
    <p><Link href="/passport-photos">Browse passport presets</Link> · <Link href="/visa-photo">Browse visa guidance</Link> · <Link href="/editorial-methodology">How to evaluate the guidance</Link></p>
    <p>PixPassVisa is independent of issuing authorities. Automated checks and purchased downloads do not guarantee acceptance.</p>
  </main>;
}
