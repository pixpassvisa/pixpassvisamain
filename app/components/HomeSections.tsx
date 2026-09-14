import Image from "next/image";
import Link from "next/link";
import PriceDisplay from "./PriceDisplay";
import { 
  Upload, 
  Zap, 
  ClipboardCheck, 
  CreditCard, 
  Download, 
  Clock, 
  Link2, 
  ShieldCheck, 
  Trash2, 
  Lightbulb, 
  Smartphone, 
  Ruler, 
  Image as ImageIcon, 
  Eye, 
  UserCheck, 
  Info, 
  Check,
  FileCheck,
  Globe
} from "lucide-react";

/* ─── Data ─── */
const steps = [
  {
    num: "01",
    title: "Upload Photo",
    desc: "Upload your photo. We accept JPEG, PNG, and HEIC formats from any device.",
    icon: Upload,
  },
  {
    num: "02",
    title: "Instant Validation",
    desc: "Your photo is automatically checked against specific country rules in seconds.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Compliance Report",
    desc: "See exactly which points PASS or FAIL with clear reasons and fix suggestions.",
    icon: ClipboardCheck,
  },
  {
    num: "04",
    title: "Small Fee",
    desc: "Local pricing based on your country. One-time payment for pro results.",
    icon: CreditCard,
  },
  {
    num: "05",
    title: "Download",
    desc: "Get your compliant, processed photo and print sheet instantly.",
    icon: Download,
  },
];

const specs = [
  {
    label: "Dimensions",
    value: "35x45mm / 2x2in",
    detail: "Supports all global sizes",
  },
  { label: "Format", value: "JPEG / PNG", detail: "Optimized for quality" },
  { label: "Background", value: "Dynamic", detail: "White, Off-white, Gray" },
  {
    label: "Eye Position",
    value: "Biometric",
    detail: "Centered per local rules",
  },
  { label: "Head Size", value: "Scaled", detail: "Automatic crown-to-chin" },
  {
    label: "Expression",
    value: "Neutral",
    detail: "Mouth closed, eyes open",
  },
];

const toolPages = [
  {
    href: "/india-passport-photo-editor",
    title: "India Passport",
    target: "Passport Applicants",
    desc: "45x35mm (630x810px), white background. Fully compliant with Indian passport standards.",
  },
  {
    href: "/uk-passport-photo-editor",
    title: "UK Passport",
    target: "HMPO Applicants",
    desc: "35x45mm, light gray background. HMPO and Digital Code compliant.",
  },
  {
    href: "/us-visa-photo-editor",
    title: "US Visa Photo",
    target: "DS-160 Applicants",
    desc: "600x600px, white background. Perfect for DS-160 and Green Card.",
  },
  {
    href: "/visa-photo-validator",
    title: "Free Validator",
    target: "Compliance Check",
    desc: "Validate any official document photo for free. Instant PASS/FAIL report.",
  },
];

const privacyItems = [
  {
    icon: Clock,
    title: "24-Hour Auto-Delete",
    desc: "All original photos are automatically and permanently deleted after 24 hours.",
  },
  {
    icon: Link2,
    title: "Expiring Links",
    desc: "Download URLs are signed and expire after 1 hour. No permanent access.",
  },
  {
    icon: ShieldCheck,
    title: "GDPR & CCPA",
    desc: "Full data deletion options. We comply with global privacy regulations.",
  },
  {
    icon: Trash2,
    title: "No Permanent Storage",
    desc: "Processed images are never stored after download. Your data is yours.",
  },
];

const docPills = [
  "India Passport",
  "UK Passport",
  "US Visa",
  "Schengen Visa",
  "Australia Passport",
  "UAE Visa",
  "China Visa",
  "France Passport",
];

const officialSources = [
  {
    agency: "International Civil Aviation Org",
    doc: "Doc 9303 Machine Readable Travel Documents",
    url: "https://www.icao.int/publications/doc-series/doc-9303",
    note: "The global standard for biometric passport photos.",
    badge: "ICAO",
  },
  {
    agency: "U.S. Department of State",
    doc: "Visa and Passport Photo Requirements",
    url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html",
    note: "Official photo specs for all visa types globally.",
    badge: "State Dept.",
  },
  {
    agency: "GOV.UK",
    doc: "UK Passport Photo Rules",
    url: "https://www.gov.uk/photos-for-passports",
    note: "Official UK government standards for passport photos.",
    badge: "UK HMPO",
  },
  {
    agency: "EU Commission",
    doc: "Schengen Visa Photo Standards",
    url: "https://home-affairs.ec.europa.eu/policies/schengen/visa-policy_en",
    note: "European standards for Schengen visa applications.",
    badge: "EU Visa",
  },
  {
    agency: "Embassy of India, Bern",
    doc: "Notice on ICAO Photo Requirements",
    url: "https://www.indembassybern.gov.in/page/notice-reg-icao-photo-requirements/",
    note: "Official Indian embassy specifications for ICAO compliant photographs.",
    badge: "India Embassy",
  },
  
];

const rejectionReasons = [
  {
    num: "01",
    title: "Incorrect Background Color",
    why: "Shadows, patterns, or the wrong shade (e.g. blue instead of white) are the top rejection reasons globally.",
    check: "Our system measures background luminance and color uniformity across 9 zones.",
  },
  {
    num: "02",
    title: "Wrong Eye Position",
    why: "Eyes must be positioned precisely for facial recognition cameras at border control.",
    check: "Facial landmark model measures exact eye-center coordinates.",
  },
  {
    num: "03",
    title: "Head Size Mismatch",
    why: "Whether it's 70% or 50%, every country has a specific head-to-image ratio requirement.",
    check: "Bounding box detection calculates crown-to-chin pixel span.",
  },
  {
    num: "04",
    title: "Shadows on Face",
    why: "Uneven lighting obscures biometric markers like the nose bridge or lip line.",
    check: "Luminance gradient analysis across facial regions.",
  },
];

const documentTypes = [
  {
    doc: "Passport Photos",
    icon: FileCheck,
    href: "/passport-photo-online",
    toolHref: "/passport-photo-online",
    specs: [
      "Custom sizes (35x45mm, 40x60mm, etc.)",
      "Dynamic background removal",
      "Head size scaling per country",
      "Print-ready sheets (A4/Letter)",
    ],
    note: "We support over 50 countries. Our system automatically adapts to the specific sizing and biometric rules of the country you select.",
  },
  {
    doc: "Visa Photos",
    icon: Globe,
    href: "/passport-photo-online",
    toolHref: "/passport-photo-online",
    specs: [
      "Square or Rectangular formats",
      "Digital upload optimization",
      "Color-space (sRGB) validation",
      "JPEG compression under local limits",
    ],
    note: "Visa requirements are often stricter than passports. We ensure your digital file is ready for any online submission portal.",
  },
];

const expertTips = [
  {
    icon: Lightbulb,
    title: "Use Natural Light — Facing a Window",
    body: "Position yourself facing a window with natural daylight. This creates even, shadow-free illumination. Avoid overhead lights, which cast downward shadows on the nose and chin. Avoid lamps behind you, which create dark backgrounds.",
  },
  {
    icon: Smartphone,
    title: "Disable Portrait Mode on Your Phone",
    body: "iPhone and Android portrait modes add artificial bokeh blur to the background. This can corrupt the pure-white RGB requirement. Use standard photo mode and stand against a white wall or door instead.",
  },
  {
    icon: Ruler,
    title: "Distance Matters More Than You Think",
    body: "Stand approximately 3–5 feet from your camera or phone. Too close and your head fills the entire frame (head size > 69%). Too far and your head is too small (< 50%). Have someone else take the photo rather than a selfie.",
  },
  {
    icon: ImageIcon,
    title: "The Best DIY White Background",
    body: "Tape a large white poster board or sheet to a wall. Stand at least 3 feet in front of it to prevent your shadow from falling onto it. A white door works well too. Avoid paper with any texture, watermarks, or slight cream tones.",
  },
  {
    icon: Eye,
    title: "Look Directly at the Camera Lens",
    body: "Look at the camera lens — not the screen. On phones, the lens is above the screen. Looking at the screen preview causes a subtle downward gaze that fails the eye direction check. Have someone count down before they take the shot.",
  },
  {
    icon: UserCheck,
    title: "Remove Everything from Your Face",
    body: "Remove glasses, earrings, face jewelry, headphones, and AirPods. Tie back hair so ears are fully visible. Remove hats and caps. Religious head coverings are permitted but must not shade the face or obscure the hairline.",
  },
];



export default function HomeSections({
  basePrice = 6.99,
  seoContent,
}: {
  basePrice?: number;
  seoContent?: React.ReactNode;
}) {
  const defaultSeoContent = (
    <div className="hc-seo-grid">
      <div className="hc-seo-visual">
        <div
          style={{
            padding: "40px",
            background: "#f8faf9",
            borderRadius: "32px",
            border: "1px solid #eef2f1",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#2563eb",
              marginBottom: 16,
            }}
          >
            Quality Matters Most
          </h3>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: 0,
            }}
          >
            {[
              "Pixel-Level Integrity (No artifacts)",
              "Pure RGB 255 White Background",
              "Standardized Eye Level (56-69%)",
              "Head Height Alignment (50-69%)",
              "Luminance Balance Analysis",
              "Strict 64-Point Biometric Scan",
            ].map((li, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "14px",
                  color: "#4a5568",
                  listStyle: "none",
                }}
              >
                <span style={{ color: "#2563eb" }}>✓</span> {li}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hc-seo-text">
        <h2 className="hc-seo-h2">
          Passport &amp; Visa Photo Size Guide: ICAO Standards for 50+ Countries
        </h2>
        <p className="hc-seo-p">
          Every year, thousands of passport and visa applications are delayed
          because of a photo that doesn't meet size or background rules.
          <strong> PixPassVisa</strong> is a free{" "}
          <a href="/online-passport-photo-checker" style={{ color: "#2563eb", fontWeight: 600 }}>
            online passport photo checker
          </a>{" "}
          that crops, resizes, and validates your photo against official{" "}
          <a href="/icao-compliant-photo" style={{ color: "#2563eb", fontWeight: 600 }}>
            ICAO standard photo
          </a>{" "}
          requirements in seconds — no photo studio needed. Not sure if your
          photo will pass? Run it through our universal{" "}
          <a href="/passport-photo-checker" style={{ color: "#2563eb", fontWeight: 600 }}>
            passport photo checker
          </a>{" "}
          or our{" "}
          <a href="/visa-photo-validator" style={{ color: "#2563eb", fontWeight: 600 }}>
            free ICAO photo validator
          </a>{" "}
          before you submit anything.
        </p>
        <p className="hc-seo-p">
          <strong>Passport photo size by country:</strong> requirements vary
          more than most applicants expect. A UK passport photo must be
          35x45mm (test it with our{" "}
          <a href="/uk-passport-photo-checker-online-free" style={{ color: "#2563eb", fontWeight: 600 }}>
            UK passport photo checker
          </a>
          ), Australian applications require 35x45mm with strict 32–36mm face height (verify with our{" "}
          <a href="/australian-passport-photo-checker" style={{ color: "#2563eb", fontWeight: 600 }}>
            Australian passport photo checker
          </a>
          ), US Green Card applicants need exact 600x600 px digital squares (use our{" "}
          <a href="/diversity-visa-lottery-photo-checker" style={{ color: "#2563eb", fontWeight: 600 }}>
            DV lottery photo checker
          </a>
          ), and the <strong>Sri Lanka passport photo size</strong> follows the standard
          45x35mm ICAO format. We also support exact specs for{" "}
          <strong>New Zealand visa photos</strong>,{" "}
          <strong>France visa photos (updated for 2026)</strong>, China visa
          photo crops, and Schengen visa applications — so you don't have to
          dig through embassy PDFs to find the right dimensions.
        </p>
        <p className="hc-seo-p">
          <strong>UK applicants:</strong> use our{" "}
          <a href="/uk-passport-photo-requirements-tool" style={{ color: "#2563eb", fontWeight: 600 }}>
            UK passport photo checker
          </a>{" "}
          to confirm your photo meets HMPO rules before you upload it to the
          gov.uk service — see our{" "}
          <a href="/blog/uk-visa-photo-requirements" style={{ color: "#2563eb", fontWeight: 600 }}>
            UK visa photo requirements guide
          </a>{" "}
          for a full breakdown. Applying from China? Our{" "}
          <a href="/china-visa-photo-editor" style={{ color: "#2563eb", fontWeight: 600 }}>
            China visa photo editor
          </a>{" "}
          crops your image to the exact required ratio automatically.
        </p>
        <p className="hc-seo-p">
          Once your photo passes, you can download a print-ready file or use
          our{" "}
          <a href="/passport-photo-print-template-generator" style={{ color: "#2563eb", fontWeight: 600 }}>
            passport photo print template
          </a>{" "}
          to print multiple copies of your passport photo on a single A4
          sheet at any pharmacy or print shop. Explore country-specific tools
          in our{" "}
          <a href="/india-passport-photo-editor" style={{ color: "#2563eb", fontWeight: 600 }}>
            India
          </a>{" "}
          and{" "}
          <a href="/uk-passport-photo-editor" style={{ color: "#2563eb", fontWeight: 600 }}>
            UK
          </a>{" "}
          passport photo editors, or read more in our{" "}
          <a href="/blog" style={{ color: "#2563eb", fontWeight: 600 }}>
            guides
          </a>{" "}
          and{" "}
          <a href="/faq" style={{ color: "#2563eb", fontWeight: 600 }}>
            FAQ
          </a>
          .
        </p>
      </div>
    </div>
  );

  return (
    <>


      {/* ────────── PILLS ────────── */}
      <section className="hc-pills">
        <div className="hc-pills-in">
          <span className="hc-pills-lbl">Available for:</span>
          {docPills.map((t, i) => (
            <a
              key={i}
              href={`/passport-photo-online?type=${t.toLowerCase().replace(/[\s/]/g, "-")}`}
              className="hc-pill"
            >
              {t}
            </a>
          ))}
        </div>
      </section>

      {/* ────────── STRIP ────────── */}
      <section className="hc-strip">
        <div className="hc-strip-in">
          {[
            { stat: "12,000+", label: "Photos Processed" },
            { stat: "99.8%", label: "Acceptance Rate" },
            { stat: "50+", label: "Countries Supported" },
            { stat: "30s", label: "Ready in Seconds" },
            { stat: "Official", label: "ICAO Compliant" },
          ].map((s, i) => (
            <div key={i} className="hc-strip-item">
              <div className="hc-strip-stat">{s.stat}</div>
              <div className="hc-strip-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>



      {/* ────────── HOW IT WORKS ────────── */}
      <section id="how-it-works" className="hc-sec hc-sec-alt">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Simple Process</span>
            <h2 className="hc-h2">How to Create a Compliant Biometric Photo Online</h2>
            <p className="hc-sub">
              From upload to compliant photo in under a minute.
            </p>
          </div>
          <div className="hc-steps">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="hc-step">
                  <div className="hc-step-bg">{step.num}</div>
                  <div
                    className={`hc-step-icon${i >= 2 ? " hc-step-icon-b" : ""}`}
                  >
                    <StepIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="hc-step-t">{step.title}</div>
                  <div className="hc-step-d">{step.desc}</div>
                </div>
              );
            })}
          </div>
          <div className="hc-sec-cta">
            <a
              href="/passport-photo-online"
              className="hc-btn-p"
              style={{ display: "inline-flex" }}
            >
              Start Now — Upload Your Photo →
            </a>
          </div>
        </div>
      </section>

      {/* ────────── SPECS ────────── */}
      <section className="hc-sec" style={{ padding: "32px 20px" }}>
        <div className="hc-sec-in">
          <div className="hc-head" style={{ marginBottom: "16px" }}>
            <span className="hc-label">Official Requirements</span>
            <h2 className="hc-h2" style={{ fontSize: "clamp(20px, 3.5vw, 26px)", marginBottom: "6px" }}>
              Official 2026 Global Document Photo Specifications
            </h2>
            <p className="hc-sub" style={{ fontSize: "13px", marginBottom: "0" }}>
              Every photo is validated against official ICAO and government-specific
              biometric requirements.
            </p>
          </div>
          <div className="hc-specs">
            {specs.map((spec, i) => (
              <div key={i} className="hc-spec">
                <div className="hc-spec-l">{spec.label}</div>
                <div className="hc-spec-v">{spec.value}</div>
                <div className="hc-spec-d">{spec.detail}</div>
              </div>
            ))}
          </div>
          <div className="hc-spec-note">
            <div className="hc-spec-note-icon">
              <Info className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="hc-spec-note-p">
                <strong style={{ color: "#0f1e2d", fontWeight: 700 }}>Biometric Requirements:</strong> Face centered, looking directly at camera with neutral expression. No glasses, head coverings (except religious/medical), or face shadows.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── OFFICIAL SOURCES ────────── */}
      <section className="hc-sec hc-sec-alt" style={{ padding: "32px 20px" }}>
        <div className="hc-sec-in">
          <div className="hc-head" style={{ marginBottom: "16px" }}>
            <span className="hc-label">Verified by Official Sources</span>
            <h2 className="hc-h2" style={{ fontSize: "clamp(20px, 3.5vw, 26px)", marginBottom: "6px" }}>
              Straight from Official Government Sources
            </h2>
            <p className="hc-sub" style={{ fontSize: "13px", marginBottom: "0" }}>
              Every requirement we enforce comes directly from official global publications,
              including the European Commission, HMPO, and the Department of State.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            {officialSources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#1d4ed8",
                        background: "#dbeafe",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {src.badge}
                    </span>
                    <span style={{ fontSize: "12px", color: "#2563eb", fontWeight: 700 }}>↗</span>
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#0f172a",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                      marginBottom: "2px",
                    }}
                  >
                    {src.agency}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1d4ed8",
                      lineHeight: "1.25",
                      marginBottom: "4px",
                    }}
                  >
                    {src.doc}
                  </div>
                </div>
                <div
                  style={{ fontSize: "11.5px", color: "#4a5568", lineHeight: "1.35", marginTop: "2px" }}
                >
                  {src.note}
                </div>
              </a>
            ))}
          </div>
          <p
            style={{
              marginTop: "14px",
              textAlign: "center",
              fontSize: "12px",
              color: "#718096",
            }}
          >
            PixPassVisa automatically adjusts your images to comply with the global specifications above.
          </p>
        </div>
      </section>


      {/* ────────── REJECTION REASONS ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Why Photos Get Rejected</span>
            <h2 className="hc-h2">Common Biometric Photo Mistakes</h2>
            <p className="hc-sub">
              Consulates and embassies reject thousands of applications annually due to non-compliant photos.
              Here are the most frequent failures — and what our system checks for each one.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            {rejectionReasons.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "16px",
                    fontSize: "36px",
                    fontWeight: 900,
                    color: "#eff6ff",
                    lineHeight: 1,
                  }}
                >
                  {r.num}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1a202c",
                    marginBottom: "8px",
                  }}
                >
                  {r.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#4a5568",
                    lineHeight: "1.6",
                    marginBottom: "12px",
                  }}
                >
                  {r.why}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#2563eb",
                    background: "#eff6ff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  ✓ Our check: {r.check}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ────────── EXPERT TIPS ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Expert Guidance</span>
            <h2 className="hc-h2">How to Take a Perfect Photo at Home</h2>
            <p className="hc-sub">
              You don't need a professional photographer. Follow these
              evidence-based tips and your smartphone photo will pass every
              official biometric check.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "32px",
            }}
          >
            {expertTips.map((tip, i) => {
              const TipIcon = tip.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "24px",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3.5">
                    <TipIcon className="w-5 h-5" />
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1a202c",
                      marginBottom: "8px",
                    }}
                  >
                    {tip.title}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#4a5568",
                      lineHeight: "1.7",
                    }}
                  >
                    {tip.body}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: "32px",
              padding: "20px 28px",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "16px",
              fontSize: "14px",
              color: "#1e40af",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Pro Tip:</strong> After taking your photo, upload it to
              our free validator before paying anything. You'll see an instant
              PASS/FAIL report with the exact reason for any failure — so you can
              retake and re-upload until it's perfect, completely free.
            </div>
          </div>
        </div>
      </section>

     

     

      {/* ────────── PRIVACY ────────── */}
      <section className="hc-sec">
        <div className="hc-sec-in">
          <div className="hc-head">
            <span className="hc-label">Your Privacy Matters</span>
            <h2 className="hc-h2">Built With Trust &amp; Security</h2>
          </div>
          <div className="hc-priv">
            {privacyItems.map((item, i) => {
              const PrivIcon = item.icon;
              return (
                <div key={i} className="hc-priv-item">
                  <div className="hc-priv-icon">
                    <PrivIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="hc-priv-t">{item.title}</div>
                  <div className="hc-priv-d">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────── SEO CONTENT GUIDE ────────── */}
      <section className="hc-seo-sec">
        {seoContent || defaultSeoContent}
      </section>

     
    </>
  );
}