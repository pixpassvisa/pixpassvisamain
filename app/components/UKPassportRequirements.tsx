import Link from 'next/link';
import Image from 'next/image';

export default function UKPassportRequirements() {
  return <main className="mx-auto max-w-3xl px-5 py-12 space-y-7 text-slate-700">
    <nav aria-label="Breadcrumb" className="text-sm"><Link href="/">Home</Link> / <Link href="/passport-photos">Passport photos</Link> / UK requirements</nav>
    <h1 className="text-3xl font-bold text-slate-900">UK passport photo requirements: digital or printed?</h1>
    <p>Choose your application route before using a photo tool. This guide compares the two formats so you can decide whether you need an original digital photo or printed photographs.</p>
    <Image src="/images/guides/uk-photo-routes.png" alt="PixPassVisa UK passport photo guide: online application, original digital file and HMPO review" width={1200} height={630} priority sizes="(max-width: 800px) 95vw, 728px" className="rounded-2xl w-full h-auto" />
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <caption className="p-4 text-left font-bold">Photo format by application route</caption>
        <thead className="bg-slate-100"><tr><th scope="col" className="p-4">Application</th><th scope="col" className="p-4">Photo requirements</th></tr></thead>
        <tbody><tr className="border-t"><th scope="row" className="p-4">Online</th><td className="p-4">Digital image, at least 600 pixels wide and 750 pixels tall; 50KB to 10MB.</td></tr>
          <tr className="border-t"><th scope="row" className="p-4">Paper form</th><td className="p-4">Two matching prints, 35mm wide by 45mm high. Crown-to-chin height: 29–34mm.</td></tr></tbody>
      </table>
    </div>
    <section className="space-y-3"><h2 className="text-xl font-bold text-slate-900">Taking a digital photo yourself</h2>
      <p>GOV.UK requires an unaltered image. Have someone take it against a plain, light background. Include your head, shoulders and upper body, and leave cropping to the application service. Do not replace the background or retouch the image for this route.</p>
      <p>A shop or booth can instead supply a photo code. A downloaded image is not automatically a photo code; PixPassVisa does not issue HMPO photo codes.</p>
      <a className="text-blue-700 underline" href="https://www.gov.uk/photos-for-passports">Check GOV.UK digital photo instructions</a>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-slate-900">Preparing printed photographs</h2>
      <p>Use professionally printed colour photos on plain white photographic paper, with no border. GOV.UK also requires unaltered printed photos. A correctly sized print sheet alone does not establish that the original photograph meets the rules.</p>
      <a className="text-blue-700 underline" href="https://www.gov.uk/photos-for-passports/photo-requirements">Check GOV.UK printed photo instructions</a>
    </section>
    <section className="space-y-3 rounded-xl bg-blue-50 p-6"><h2 className="text-xl font-bold text-slate-900">Choose your next step</h2>
      <p>If your original is suitable for an online application, you may not need an editor. For feedback, use the <Link className="text-blue-700 underline" href="/passport-photo-checker">free photo checker</Link> and select United Kingdom. Its result is guidance, not HMPO approval.</p>
      <p>To understand the tool settings, read the <Link className="text-blue-700 underline" href="/uk-passport-photo-editor">UK passport preset page</Link>. Check the editing restrictions before purchasing prepared files.</p>
    </section>
    <p className="text-sm text-slate-500">Reviewed 14 October 2026 against the GOV.UK pages linked above. PixPassVisa is independent of HM Passport Office. <Link className="underline" href="/editorial-methodology">Read our editorial process</Link>.</p>
  </main>;
}
