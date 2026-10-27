import Link from "next/link";

export default function HomeNextSteps() {
  return <><nav className="studio-wrap home-guide-nav" aria-label="On this page"><span>EXPLORE THE GUIDE</span><a href="#photo-services">Photo tools</a><a href="#photo-requirements">Sizes &amp; requirements</a><a href="#photo-at-home">Take a photo</a><a href="#digital-or-print">Digital or print</a><a href="#home-faq">FAQs</a><a href="#all-photo-guides">All pages</a></nav><section id="photo-services" className="studio-wrap studio-section" aria-labelledby="home-next-steps">
    <div className="studio-section-heading"><div><p className="studio-eyebrow">PASSPORT & VISA PHOTO HELP</p><h2 id="home-next-steps">What does your application need?</h2></div><p>Choose your document first. Photo dimensions, upload limits, and capture rules depend on the application you are completing.</p></div>
    <div className="home-service-grid">
      <article className="home-service-card"><h3>I need a passport photo</h3><p>Find your country’s guidance before taking a photo. A printed passport photo and a digital renewal upload may need different dimensions. Check whether your application requires professional capture or permits a photo taken at home.</p><Link prefetch={false} href="/passport-photos">Browse passport requirements →</Link></article>
      <article className="home-service-card"><h3>I’m applying for a visa</h3><p>Use the rules for the destination country and visa application. Confirm whether you need a digital upload, a physical print, or a photo taken at the application centre before preparing a file.</p><Link prefetch={false} href="/visa-photo">Find visa photo guidance →</Link><Link prefetch={false} href="/us-visa-photo-editor#file-check">Check a DS-160 photo file for free →</Link></article>
      <article className="home-service-card"><h3>I already have a photo</h3><p>Start with the free checker to review common framing and image issues. If you need a prepared download, select the matching document in the photo maker and review the preview and one-time price.</p><Link prefetch={false} href="/passport-photo-checker">Check an existing photo →</Link></article>
    </div>
    <div className="studio-more-links"><Link prefetch={false} href="/passport-photo-checklist">Before you upload: photo checklist →</Link><Link prefetch={false} href="/site-map">Browse all tools and guides →</Link></div>
  </section></>;
}
