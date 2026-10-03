import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ScanFace, Check, ArrowRight } from "lucide-react";
export default function HomeHero() {
  return <section className="studio-hero studio-wrap" aria-labelledby="hero-title"><div className="studio-hero-copy">
    <p className="studio-eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</p>
    <h1 id="hero-title">Passport &amp; visa photos.<br /><span>Ready for</span><br /><em>what’s next.</em></h1>
    <p className="studio-lead">Create and resize a passport or visa photo online. Choose your country, check the framing, and prepare your download from home with guidance at every step.</p>
    <div className="studio-actions"><Link href="/passport-photo-online" className="studio-button">Create my photo <ArrowUpRight size={20} /></Link><Link href="/#pricing" className="studio-text-link">View photo packages <ArrowRight size={17} /></Link></div>
    <div className="studio-perks"><span><Check size={15} /> Preview before purchase</span><span><Check size={15} /> One-time payment</span><span><Check size={15} /> No app needed</span></div>
    </div><div className="studio-photo-scene"><div className="studio-orbit" aria-hidden="true" /><div className="studio-travel-tag"><ScanFace size={17} /> A SMALL PHOTO. A BIG JOURNEY.</div>
    <figure className="studio-photo-card"><div className="studio-card-top"><span>YOUR PHOTO STUDIO</span><span>01 / 03</span></div><div className="studio-portrait"><Image src="/images/example-portrait.webp" alt="AI-generated example portrait showing a straight-on pose and plain background" width={640} height={800} priority sizes="(max-width: 700px) 75vw, 360px" /><div className="studio-crop-guides" aria-hidden="true" /><span className="studio-photo-label">EXAMPLE PORTRAIT</span></div><figcaption><span>Made for your next move.</span><ArrowUpRight size={22} /></figcaption></figure>
    <div className="studio-floating-note"><span className="studio-note-icon"><ScanFace size={23} /></span><div><strong>Less guesswork.</strong><span>Size, crop &amp; photo checks</span></div></div><p className="studio-example-note">AI-generated illustration. Use a real photo for your application.</p></div></section>;
}
