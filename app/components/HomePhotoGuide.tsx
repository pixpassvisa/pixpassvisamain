import Link from "next/link";
import { ArrowUpRight, Camera, FileImage, Printer, ScanFace, Sun, UserRound } from "lucide-react";

export function HomePhotoServices() {
  const services = [
    { icon: ScanFace, title: "Passport photo maker online", text: "Prepare a country-specific passport photo, review the crop, and preview your digital download and print sheet.", href: "/passport-photo-online", action: "Make a passport photo" },
    { icon: FileImage, title: "Visa photo requirements", text: "Find guidance for your destination and application. Visa and passport requirements can differ even for the same country.", href: "/visa-photo", action: "Explore visa photo guides" },
    { icon: Camera, title: "Free passport photo checker", text: "Review framing, background, and lighting issues in an existing portrait before choosing a paid download.", href: "/passport-photo-checker", action: "Check your photo" },
  ];
  return <>
    <nav className="studio-wrap home-guide-nav" aria-label="On this page"><span>EXPLORE THE GUIDE</span><a href="#photo-services">Photo tools</a><a href="#photo-requirements">Sizes &amp; requirements</a><a href="#photo-at-home">Take a photo</a><a href="#digital-or-print">Digital or print</a><a href="#home-faq">FAQs</a></nav>
    <section className="studio-wrap studio-section" id="photo-services" aria-labelledby="photo-services-title">
      <div className="studio-section-heading"><div><p className="studio-eyebrow">CHOOSE YOUR STARTING POINT</p><h2 id="photo-services-title">Passport and visa photos,<br />from your browser.</h2></div><p>Make a new photo, check one you already have, or understand your application’s requirements. Start with the task you need.</p></div>
      <div className="home-service-grid">{services.map(({ icon: Icon, title, text, href, action }) => <article className="home-service-card" key={href}><span className="home-service-icon"><Icon size={24} /></span><h3>{title}</h3><p>{text}</p><Link href={href}>{action}<ArrowUpRight size={17} /></Link></article>)}</div>
    </section>
  </>;
}

export function HomePhotoRequirements() {
  return <section className="home-requirements-band" id="photo-requirements" aria-labelledby="photo-requirements-title"><div className="studio-wrap studio-section">
    <div className="studio-section-heading"><div><p className="studio-eyebrow">SIZE IS ONLY THE START</p><h2 id="photo-requirements-title">Passport photo sizes<br />and visa photo requirements.</h2></div><p>Check the frame, head size, and submission format together. A printed photo measurement is not the same as a digital upload specification.</p></div>
    <div className="home-format-grid">
      <article className="home-format-card"><div className="home-format-visual" aria-hidden="true"><div className="home-format-outline home-format-square"><UserRound size={62} strokeWidth={1} /><span>1:1</span></div></div><div><span className="home-card-kicker">US VISA PHOTO</span><h3>2 × 2 inches</h3><p>A square frame. Head height is 50–69% of image height; eye height is 56–69%, measured from the bottom.</p><Link href="/america-visa-size-photo">US visa photo guide <ArrowUpRight size={15} /></Link><a className="home-source-link" href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/photo-composition-template.html" target="_blank" rel="noopener noreferrer">Official composition rules ↗</a></div></article>
      <article className="home-format-card"><div className="home-format-visual" aria-hidden="true"><div className="home-format-outline home-format-portrait"><UserRound size={62} strokeWidth={1} /><span>7:9</span></div></div><div><span className="home-card-kicker">UK PRINTED PASSPORT PHOTO</span><h3>35 × 45 mm</h3><p>Crown-to-chin height is 29–34 mm. Online passport applications use separate digital photo rules.</p><Link href="/uk-passport-size-photo-maker">UK passport photo guide <ArrowUpRight size={15} /></Link><a className="home-source-link" href="https://www.gov.uk/photos-for-passports/photo-requirements" target="_blank" rel="noopener noreferrer">Official printed-photo rules ↗</a></div></article>
    </div>
    <div className="home-requirements-foot"><p>Other destinations and documents have their own specifications. Confirm the exact application before preparing your photo.</p><Link href="/passport-photo-sizes" className="studio-text-link">Browse passport photo sizes <ArrowUpRight size={17} /></Link></div>
  </div></section>;
}

export function HomeCaptureGuide() {
  const tips = [
    { icon: Sun, title: "Find even light", body: "Face a window or another soft light source. Avoid strong shadows, glare, and harsh overhead lighting." },
    { icon: UserRound, title: "Keep the camera level", body: "Ask someone to take the photo with the camera at eye level. Leave space around your head and shoulders for the crop." },
    { icon: Camera, title: "Keep the photo genuine", body: "Use a recent, sharp photograph. Avoid beauty filters and facial retouching, and follow your authority’s expression and background rules." },
  ];
  return <section className="studio-wrap studio-section home-capture-guide" id="photo-at-home" aria-labelledby="photo-at-home-title">
    <div className="home-capture-intro"><p className="studio-eyebrow">A BETTER PHOTO STARTS HERE</p><h2 id="photo-at-home-title">How to take a passport<br />photo at home.</h2><p>Your phone can be a useful starting point. Good lighting and a straight-on portrait give you a clearer image to review before uploading.</p><Link href="/passport-photo-video" className="studio-text-link">Watch the photo preparation guide <ArrowUpRight size={17} /></Link></div>
    <div className="home-capture-tips">{tips.map(({ icon: Icon, title, body }, i) => <article key={title}><span className="home-tip-number">0{i + 1}</span><Icon size={22} /><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
  </section>;
}

export function HomeOutputGuide() {
  return <section className="studio-wrap studio-section" id="digital-or-print" aria-labelledby="digital-or-print-title">
    <div className="studio-section-heading"><div><p className="studio-eyebrow">CHOOSE THE OUTPUT YOU NEED</p><h2 id="digital-or-print-title">Digital passport photo<br />or printable photo sheet?</h2></div><p>The right output depends on how you submit your application. Check the upload portal or paper-form instructions before buying.</p></div>
    <div className="home-output-grid"><article><FileImage size={28} /><span className="home-card-kicker">FOR ONLINE APPLICATIONS</span><h3>Digital photo download</h3><p>A photo file for an application portal. Check pixel dimensions, file format, and file-size limits; printed measurements alone do not define these.</p><ul><li>Review the selected document’s crop</li><li>Check the portal’s upload instructions</li><li>Keep the original photo for your records</li></ul><Link href="/passport-photo-online">Prepare a digital photo <ArrowUpRight size={17} /></Link></article><article><Printer size={28} /><span className="home-card-kicker">FOR PAPER APPLICATIONS</span><h3>Printable photo sheet</h3><p>A layout of photo copies to print. Preserve the intended physical dimensions and follow the authority’s paper and print-quality requirements.</p><ul><li>Use the required physical photo dimensions</li><li>Print at actual size without fit-to-page scaling</li><li>Check the finished print with a ruler</li></ul><Link href="/passport-photo-print-template-generator">Explore print templates <ArrowUpRight size={17} /></Link></article></div>
  </section>;
}
