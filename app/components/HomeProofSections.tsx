import Link from "next/link";
import { Check, CircleAlert, FileCheck2, Ruler, ShieldCheck } from "lucide-react";

const rejectionReasons = [
  {
    icon: CircleAlert,
    label: "BACKGROUND",
    title: "Busy or uneven background",
    body: "Plain white or approved light backgrounds make the face easier for an authority to identify. PixPassVisa checks background uniformity before you buy.",
  },
  {
    icon: Ruler,
    label: "BIOMETRIC FRAMING",
    title: "Face too large or too small",
    body: "Every destination uses its own head-height and eye-position range. Choose the exact country and document instead of relying on a generic crop.",
  },
  {
    icon: FileCheck2,
    label: "FILE RULES",
    title: "Wrong size, format, or file weight",
    body: "A correct-looking portrait can still fail an upload because the pixels, aspect ratio, JPEG format, DPI, or file size are wrong.",
  },
  {
    icon: ShieldCheck,
    label: "PHOTO QUALITY",
    title: "Shadows, glare, or a turned head",
    body: "Even lighting, open eyes, a neutral expression, and a straight-on pose help your photo match the published biometric guidance.",
  },
];

export default function HomeProofSections() {
  return (
    <>
      <section className="studio-wrap studio-proof-strip" aria-label="PixPassVisa service facts">
        <div><strong>50+</strong><span>country-specific formats</span></div>
        <div><strong>Photo checks</strong><span>framing, background &amp; lighting</span></div>
        <div><strong>Preview first</strong><span>purchase your photo package</span></div>
        <div><strong>One-time</strong><span>payment for downloads</span></div>
      </section>

      <section className="studio-wrap studio-section studio-rejection-section" aria-labelledby="rejection-title">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">PHOTO REJECTION CHECKLIST</p>
            <h2 id="rejection-title">Catch the details<br />that cause delays.</h2>
          </div>
          <p>Review the common passport and visa photo problems before you submit an application or pay for a download.</p>
        </div>
        <div className="studio-rejection-grid">
          {rejectionReasons.map(({ icon: Icon, label, title, body }) => (
            <article key={title} className="studio-rejection-card">
              <div className="studio-rejection-icon"><Icon size={20} strokeWidth={1.7} /></div>
              <p className="studio-rejection-label">{label}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="studio-proof-cta">
          <p><Check size={17} /> Review your photo, then purchase your digital download and print sheet.</p>
          <Link href="/passport-photo-online" className="studio-text-link">Create my photo →</Link>
        </div>
      </section>

      <section className="studio-wrap studio-source-section" aria-labelledby="source-title">
        <div>
          <p className="studio-eyebrow">PUBLISHED REQUIREMENTS</p>
          <h2 id="source-title">Rules you can trace.</h2>
          <p>PixPassVisa is an independent photo preparation service. Our country pages point to official authorities so you can confirm the final submission rules for your application.</p>
          <Link href="/editorial-methodology" className="studio-text-link">Read our verification methodology <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="studio-source-links">
          <a href="https://travel.state.gov/content/travel/en/passports/how-apply/photos.html" target="_blank" rel="noopener noreferrer"><span>U.S. Department of State</span><strong>Passport photo requirements ↗</strong></a>
          <a href="https://www.gov.uk/photos-for-passports" target="_blank" rel="noopener noreferrer"><span>GOV.UK / HM Passport Office</span><strong>Digital passport photo rules ↗</strong></a>
          <a href="https://www.icao.int/publications/doc-series/doc-9303" target="_blank" rel="noopener noreferrer"><span>ICAO Doc 9303</span><strong>Machine-readable travel documents ↗</strong></a>
        </div>
      </section>
    </>
  );
}
