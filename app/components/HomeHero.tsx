import Link from "next/link";
import { ArrowUpRight, Check, ScanFace, Globe2 } from "lucide-react";
import BeforeAfter from "./BeforeAfter";

export default function HomeHero() {
  return <section className="studio-hero studio-wrap studio-hero-with-comparison" aria-labelledby="hero-title">
    <div className="studio-hero-copy">
      <p className="studio-eyebrow"><span /> YOUR ONLINE PHOTO STUDIO</p>
      <h1 id="hero-title">Passport &amp; visa photos.<br /><span>The right frame.</span><br /><em>Your next move.</em></h1>
      <p className="studio-lead">Upload a photo, choose your document, and see the difference. Review the crop, dimensions, and photo checks before buying your download.</p>
      <div className="studio-actions">
        <Link prefetch={false} href="/passport-photo-online" className="studio-button">Upload your photo <ArrowUpRight size={20} /></Link>
        <Link prefetch={false} href="/passport-photo-checker" className="studio-text-link">Try the free checker <ScanFace size={18} /></Link>
      </div>
      <div className="studio-perks"><span><Check size={15} /> Free preview &amp; checks</span><span><Check size={15} /> Pay once for downloads</span><span><Check size={15} /> No app needed</span></div>
      <div className="hero-document-note"><Globe2 size={18} /><p><strong>Made for your document.</strong> Choose from country-specific formats. The example shows US visa and UK printed-passport framing; requirements vary by application.</p></div>
    </div>
    <div className="hero-comparison-scene"><BeforeAfter /></div>
  </section>;
}
