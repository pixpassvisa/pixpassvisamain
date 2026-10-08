import type { Metadata } from "next";
import Link from "next/link";

const url = "https://www.pixpassvisa.com/passport-photo-checklist";
const title = "Passport & Visa Photo Checklist | PixPassVisa";
const description = "Use this free passport and visa photo checklist to review lighting, background, print size and digital uploads. Includes a printable worksheet and official sources.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "article", siteName: "PixPassVisa", locale: "en_US", publishedTime: "2026-10-07", modifiedTime: "2026-10-08", images: [{ url: "https://www.pixpassvisa.com/opengraph-image", width: 1200, height: 630, alt: "PixPassVisa photo preparation" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://www.pixpassvisa.com/opengraph-image"] },
};

export default function PhotoChecklist() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${url}#article`, headline: "Passport & visa photo checklist", description, mainEntityOfPage: url, datePublished: "2026-10-07", dateModified: "2026-10-08", inLanguage: "en", author: { "@type": "Organization", name: "PixPassVisa Team", url: "https://www.pixpassvisa.com/about" }, publisher: { "@id": "https://www.pixpassvisa.com/#organization" }, isAccessibleForFree: true },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pixpassvisa.com/" },
        { "@type": "ListItem", position: 2, name: "Passport photo guides", item: "https://www.pixpassvisa.com/passport-photos" },
        { "@type": "ListItem", position: 3, name: "Photo checklist", item: url },
      ] },
    ],
  };
  return (
    <article className="mx-auto max-w-4xl px-5 py-12 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600"><ol className="flex flex-wrap gap-2"><li><Link prefetch={false} href="/" className="underline">Home</Link><span aria-hidden="true"> /</span></li><li><Link prefetch={false} href="/passport-photos" className="underline">Passport photo guides</Link><span aria-hidden="true"> /</span></li><li aria-current="page">Photo checklist</li></ol></nav>
      <p className="text-sm font-semibold uppercase tracking-widest text-green-800">Before you apply</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Passport &amp; visa photo checklist</h1>
      <p className="mt-5 text-lg leading-relaxed text-slate-600">Check the requirements before you print or upload. Use this guide to identify your application route, prepare a suitable original and review the final photo.</p>
      <p className="mt-3 text-sm text-slate-500">By <Link prefetch={false} href="/about" className="underline">PixPassVisa Team</Link> · Published <time dateTime="2026-10-07">7 October 2026</time> · Updated <time dateTime="2026-10-08">8 October 2026</time>. Official references checked 7 October 2026.</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link prefetch={false} href="/visa-photo-validator" className="rounded-lg bg-green-900 px-5 py-3 font-semibold text-white">Check your photo for free</Link>
        <a href="/resources/photo-checklist.html" className="rounded-lg border border-green-900 px-5 py-3 font-semibold text-green-900">Open printable checklist</a>
      </div>
      <p className="mt-3 text-sm text-slate-600">Checks and previews are free. Final downloads are paid. Automated checks cannot guarantee acceptance.</p>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">1. Find your exact application requirements</h2>
        <p>Record the country, issuing authority, document and application route. A passport renewal, visa application and other ID may each need a different photo. Start with the authority&apos;s current instructions, not a generic size chart.</p>
        <p>Check photo age, background, pose, expression, head coverings and glasses. Read any separate instructions for children or permitted exceptions.</p>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold">2. Capture a suitable original</h2>
        <p>Keep the original file and inspect focus, lighting and shadows. Compare it with the official acceptable and unacceptable examples before spending time on an upload or print.</p>
        <aside className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-bold">Check editing restrictions first</h3>
          <p className="mt-2">UK digital passport guidance requires an unaltered photo; for photos taken on your own device, it tells you not to crop because the application handles this. US passport guidance prohibits software, filter and AI changes. Background replacement or retouching is not a universal solution: correct the setup and retake the photo where required.</p>
          <p className="mt-2">See the <a className="underline" href="https://www.gov.uk/photos-for-passports">UK digital photo rules</a> and <a className="underline" href="https://travel.state.gov/en/passports/apply/help/photos.html">US passport photo guidance</a>.</p>
        </aside>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold">3. Separate printed and digital requirements</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5"><h3 className="font-bold">Printed photos</h3><ul className="mt-3 list-disc space-y-2 pl-5"><li>Width and height in the required physical units.</li><li>Head size and position within the frame.</li><li>Paper type and number of copies.</li><li>Actual printed size after printer scaling.</li></ul></div>
          <div className="rounded-xl border border-slate-200 p-5"><h3 className="font-bold">Digital uploads</h3><ul className="mt-3 list-disc space-y-2 pl-5"><li>Required pixel dimensions.</li><li>Permitted file format and file-size limits.</li><li>Rules for cropping and alterations.</li><li>Warnings shown by the application portal.</li></ul></div>
        </div>
        <p>Physical dimensions, pixel dimensions and file size measure different things. Passing a file-size limit alone does not establish that your photo meets the application rules.</p>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold">4. Review the final file or print</h2>
        <ul className="list-disc space-y-2 pl-5"><li>Compare the actual output with the official instructions.</li><li>Check for stretching, unexpected scaling or loss of detail.</li><li>Review all warnings from the official application portal.</li><li>Retake the photo if necessary; a third-party check is not an official acceptance decision.</li></ul>
        <p className="text-sm text-slate-600">The UK and US sources are examples. They do not establish requirements for other countries or visa types.</p>
      </section>
      <section className="mt-10 space-y-4" aria-labelledby="checklist-questions">
        <h2 id="checklist-questions" className="text-2xl font-bold">Common photo checklist questions</h2>
        <h3 className="text-lg font-semibold">Is a passport photo the same as a visa photo?</h3>
        <p>Do not assume the requirements match. Check the document type and application route separately. Our <Link prefetch={false} href="/passport-photos" className="underline">passport photo guides</Link> and <Link prefetch={false} href="/visa-photo" className="underline">visa photo guides</Link> help you find the relevant starting point.</p>
        <h3 className="text-lg font-semibold">Does passing an online photo check guarantee acceptance?</h3>
        <p>No. Automated checks can flag potential issues, but the issuing authority makes the acceptance decision. Compare your original photo and final output with its current instructions.</p>
        <h3 className="text-lg font-semibold">Can I print this checklist for free?</h3>
        <p>Yes. Open the <a href="/resources/photo-checklist.html" className="underline">printable photo checklist</a> and use your browser&apos;s Print command. No purchase or account is required for the worksheet.</p>
      </section>
      <section className="mt-12 rounded-2xl bg-green-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold">Ready to review your photo?</h2>
        <p className="mt-3">Start with a free check. If your application permits the preparation you need, review the preview and displayed price before purchasing a download.</p>
        <div className="mt-5 flex flex-wrap gap-4"><Link prefetch={false} className="rounded-lg bg-green-900 px-5 py-3 font-semibold text-white" href="/visa-photo-validator">Start a free photo check</Link><Link prefetch={false} className="px-2 py-3 font-semibold text-green-900 underline" href="/passport-photo-online">Choose a document and preview</Link></div>
      </section>
      <p className="mt-8 text-sm text-slate-600">PixPassVisa is an independent commercial photo-preparation service. This checklist requires no purchase. For questions or corrections, <Link prefetch={false} href="/contact" className="underline">contact our team</Link>.</p>
    </article>
  );
}
