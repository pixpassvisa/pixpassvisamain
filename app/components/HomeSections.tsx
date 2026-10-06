import Link from "next/link";
import { ArrowUpRight, Upload, ScanFace, Download, Globe2, Check, FileImage, Printer } from "lucide-react";
import PriceDisplay from "./PriceDisplay";
import HomeProofSections from "./HomeProofSections";
import { HomePhotoServices, HomePhotoRequirements, HomeCaptureGuide, HomeOutputGuide } from "./HomePhotoGuide";
import "../home.css";
const destinations = [
  { code: "US", country: "United States", detail: "Passport & visa photo guides", href: "/us-passport-photo-editor" },
  { code: "UK", country: "United Kingdom", detail: "Digital & printed photo guidance", href: "/uk-passport-size-photo-maker" },
  { code: "AU", country: "Australia", detail: "Check your passport photo", href: "/australian-passport-photo-checker" },
  { code: "EU", country: "Schengen area", detail: "Visa photo preparation", href: "/visa-photo" },
];
export default function HomeSections({ basePrice = 7.99 }: { basePrice?: number; [key: string]: unknown }) {
  return <div className="studio-sections">
    <div className="studio-format-strip"><div className="studio-wrap"><span>ONE PHOTO. MANY POSSIBILITIES.</span><span><FileImage size={19} /> Digital photo</span><span><Printer size={19} /> Printable sheet</span><span><Globe2 size={19} /> Country-specific formats</span></div></div>
    <HomePhotoServices />
    <HomeProofSections />
    <section className="studio-wrap studio-section" id="how-it-works"><div className="studio-section-heading"><div><p className="studio-eyebrow">FROM YOUR CAMERA TO YOUR APPLICATION</p><h2>Three steps.<br />One less to-do.</h2></div><p>Keep the original. Review the details.<br />Download when you’re happy.</p></div>
    <div className="studio-steps">{[
      { icon: Upload, title: "Start with a good photo", body: "Choose your country and document. Upload a recent photo taken in even light, against a plain background." },
      { icon: ScanFace, title: "Get a clearer picture", body: "Review the size, crop, and automated checks. Retake your photo if lighting or facial details need work." },
      { icon: Download, title: "Take the next step", body: "Preview the output and price. Pay once for your download, then check your authority’s rules before submitting." },
    ].map(({ icon: Icon, title, body }, i) => <article key={title} className="studio-step"><div className="studio-step-top"><Icon size={28} strokeWidth={1.4} /><span>0{i + 1}</span></div><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <HomePhotoRequirements />
    <section className="studio-destinations"><div className="studio-wrap studio-section"><div className="studio-section-heading"><div><p className="studio-eyebrow">WHERE ARE YOU HEADING?</p><h2>A photo for your destination.</h2></div><Link href="/passport-photo-sizes" className="studio-text-link">Explore photo sizes <ArrowUpRight size={18} /></Link></div><div className="studio-country-grid">{destinations.map(d => <Link key={d.code} href={d.href} className="studio-country"><div><span className="studio-country-code">{d.code}</span><ArrowUpRight size={20} /></div><h3>{d.country}</h3><p>{d.detail}</p></Link>)}</div><div className="studio-more-links"><Link href="/passport-photos">All passport photo guides →</Link><Link href="/visa-photo">All visa photo guides →</Link></div></div></section>
    <HomeCaptureGuide />
    <section className="studio-wrap studio-section studio-tools"><div><p className="studio-eyebrow">A LITTLE HELP GOES A LONG WAY</p><h2>Start with the<br />right tool.</h2><p className="studio-muted">Check an existing photo, compare formats, or prepare a print sheet. Pick the task you need today.</p></div><div className="studio-tool-list">{[
      ["01", "Passport photo checker", "Review common photo issues before you submit.", "/passport-photo-checker"],
      ["02", "DV lottery photo checker", "Check the photo for your diversity visa entry.", "/diversity-visa-lottery-photo-checker"],
      ["03", "Passport photo print template", "Arrange photo copies on a printable sheet.", "/passport-photo-print-template-generator"],
      ["04", "Watch the photo preparation video", "See how to preview and purchase your photo package.", "/passport-photo-video"],
      ["05", "Passport & visa photo guides", "Understand the requirements for your application.", "/blog"],
    ].map(([n, title, desc, href]) => <Link href={href} key={href}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={22} /></Link>)}</div></section>
    <HomeOutputGuide />
    <section className="studio-wrap studio-price-section" id="pricing"><div className="studio-price-card"><div><p className="studio-eyebrow">FIXED ONE-TIME PRICING. NO SUBSCRIPTION.</p><h2>Your photo.<br />Your next adventure.</h2><p>Preview and automated checks are free. A one-time purchase unlocks the processed, high-resolution download and print sheet after you review the result.</p><Link href="/passport-photo-online" className="studio-button studio-button-lime">Create and purchase <ArrowUpRight size={20} /></Link></div><div className="studio-price-detail"><span>STANDARD PHOTO DOWNLOAD PACKAGE</span><strong><PriceDisplay basePrice={basePrice} /></strong><p>Fixed local price · One-time payment · No recurring charge</p><p>Optional expert manual edit: <strong><PriceDisplay basePrice={13.99} isExpert /></strong></p><ul><li><Check size={18} /> Processed digital photo</li><li><Check size={18} /> Printable photo sheet</li><li><Check size={18} /> Preview before payment</li></ul><Link href="/refund-policy">Read the refund policy ↗</Link></div></div></section>
    <aside className="studio-wrap studio-authority-note"><Globe2 size={22} /><p><strong>Your application, the authority’s decision.</strong> pixpassvisa.com is an independent photo preparation service. Automated checks do not guarantee acceptance. Use a genuine photograph, and follow your authority’s rules on editing and photo capture. <a href="https://www.gov.uk/photos-for-passports">UK guidance ↗</a> · <a href="https://travel.state.gov/content/travel/en/passports/how-apply/photos.html">US guidance ↗</a></p></aside>
  </div>;
}
