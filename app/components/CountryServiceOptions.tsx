import Link from 'next/link';
import PriceDisplay from './PriceDisplay';

export default function CountryServiceOptions({ country }: { country: 'US' | 'UK' }) {
  const us = country === 'US';
  return <section aria-label="Choose your photo service" className="my-8 rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 sm:p-8">
    <h2 className="text-2xl font-semibold">Choose the help you need</h2>
    <div className="mt-5 grid gap-6 sm:grid-cols-2">
      <div><h3 className="text-lg font-semibold">Check your original photo</h3>
        <p className="mt-2 text-sm leading-7">Free supplementary checks for common photo issues. Keep the original for {us ? 'online passport renewal' : 'your online passport application'} and follow the official upload instructions. A check does not certify acceptance.</p>
        <Link className="mt-3 inline-block font-semibold underline underline-offset-4" href={us ? '/passport-photo-checker' : '/uk-passport-photo-checker-online-free'}>Check a photo for free →</Link></div>
      <div><h3 className="text-lg font-semibold">Need a prepared file or print sheet?</h3>
        <p className="mt-2 text-sm leading-7">Preview at no charge. A standard digital download and printable sheet cost <strong><PriceDisplay basePrice={4.99} /></strong>, paid once. Physical printing and delivery are not included.</p>
        <p className="mt-2 text-sm leading-7">Use preparation only when your application permits it. {us ? 'A 2 × 2 inch print layout is different from an online renewal upload.' : 'UK passport photos must be unaltered; an own-device online photo should not be cropped. We do not issue HMPO photo codes.'}</p>
        <Link className="mt-3 inline-block font-semibold underline underline-offset-4" href={`/passport-photo-online?type=${us ? 'us' : 'uk'}-passport`}>Preview preparation options →</Link>
        <p className="mt-2 text-sm">Already have a suitable finished photo? <Link className="underline" href="/passport-photo-print-template-generator">Use the free sheet-layout tool</Link>.</p></div>
    </div>
    <p className="mt-5 text-sm leading-7"><Link className="underline" href="/refund-policy">Refund terms</Link> · <Link className="underline" href="/privacy-policy">Photo privacy</Link> · <Link className="underline" href="/contact">Contact support</Link></p>
  </section>;
}
