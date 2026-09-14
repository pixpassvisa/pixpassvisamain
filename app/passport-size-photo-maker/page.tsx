import { Metadata } from "next";
import PassportMakerApp from "./PassportMakerApp";
import toolPages from "../../data/tool-seo-pages.json";
import ToolPageRenderer from "../components/ToolPageRenderer";

export const metadata: Metadata = {
  title: "Free Passport Photo Maker Online | Official Passport Standards",
  description:
    "Create passport size photos online for free. Select your country, upload a photo, remove the background automatically, and download a print-ready photo.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/passport-size-photo-maker",
    languages: {
      en: "https://www.pixpassvisa.com/passport-size-photo-maker",
      "x-default": "https://www.pixpassvisa.com/passport-size-photo-maker",
    },
  },
  openGraph: {
    title: "Free Passport Photo Maker Online",
    description:
      "Create passport and visa photos online. Select your country, upload a photo, and download a print-ready photo instantly.",
    type: "website",
  },
};

import { ShieldCheck, FileCheck, Zap, Sparkles } from "lucide-react";

// ─── Trust badges ────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
    title: "Privacy first",
    desc: "Photos never stored on our servers",
  },
  {
    icon: <FileCheck className="w-5 h-5 text-blue-600" />,
    title: "ISO compliant",
    desc: "Meets ICAO 9303 biometric standards",
  },
  {
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    title: "Instant result",
    desc: "AI processing in under 10 seconds",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-blue-600" />,
    title: "Free preview",
    desc: "Check before you pay anything",
  },
];

export default function PassportSizePhotoMakerPage() {
  const toolPage = toolPages.find(
    (p) => p.slug === "passport-size-photo-maker"
  );

  return (
    <>
      {/* ── Global rich-content styles ── */}
      <style>{`
        /* ─── Rich content typography ──────────────────────────── */
        .rich-content {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 1.0625rem;
          line-height: 1.85;
          color: #374151;
        }

        /* Headings */
        .rich-content h2 {
          font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
          font-size: clamp(1.25rem, 3vw, 1.6rem);
          font-weight: 800;
          color: #0f172a;
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .rich-content h2:first-child { margin-top: 0; }

        .rich-content h3 {
          font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
          font-size: clamp(1.05rem, 2.5vw, 1.2rem);
          font-weight: 700;
          color: #1e293b;
          margin: 2rem 0 0.65rem;
          letter-spacing: -0.015em;
          line-height: 1.4;
        }

        .rich-content h4 {
          font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #334155;
          margin: 1.5rem 0 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-size: 0.8125rem;
        }

        /* Paragraphs */
        .rich-content p {
          margin: 0 0 1.2rem;
          color: #475569;
        }
        .rich-content p:last-child { margin-bottom: 0; }

        /* Bold / strong */
        .rich-content strong, .rich-content b {
          font-weight: 700;
          color: #1e293b;
        }

        /* Links */
        .rich-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          transition: color 0.15s;
        }
        .rich-content a:hover { color: #1d4ed8; }

        /* Lists */
        .rich-content ul,
        .rich-content ol {
          margin: 0 0 1.2rem 0;
          padding-left: 1.5rem;
        }
        .rich-content ul { list-style: none; padding-left: 0; }
        .rich-content ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: #475569;
        }
        .rich-content ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
        }
        .rich-content ol { list-style: decimal; }
        .rich-content ol li {
          padding-left: 0.25rem;
          margin-bottom: 0.5rem;
          color: #475569;
        }
        .rich-content ol li::marker {
          color: #3b82f6;
          font-weight: 700;
          font-family: system-ui, sans-serif;
        }

        /* Nested lists */
        .rich-content li ul,
        .rich-content li ol { margin: 0.4rem 0 0.4rem 0; }

        /* Blockquote */
        .rich-content blockquote {
          margin: 1.5rem 0;
          padding: 1rem 1.25rem;
          border-left: 4px solid #3b82f6;
          background: #eff6ff;
          border-radius: 0 8px 8px 0;
          color: #1e40af;
          font-style: italic;
        }
        .rich-content blockquote p { color: inherit; margin: 0; }

        /* Horizontal rule */
        .rich-content hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 2rem 0;
        }

        /* Code */
        .rich-content code {
          background: #f1f5f9;
          padding: 0.15em 0.4em;
          border-radius: 4px;
          font-size: 0.875em;
          color: #dc2626;
          font-family: 'Fira Code', 'Courier New', monospace;
        }
        .rich-content pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        .rich-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }

        /* Tables */
        .rich-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.9375rem;
          font-family: system-ui, sans-serif;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .rich-content th {
          background: #f8fafc;
          font-weight: 600;
          text-align: left;
          padding: 0.75rem 1rem;
          color: #0f172a;
          border-bottom: 1px solid #e2e8f0;
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .rich-content td {
          padding: 0.7rem 1rem;
          color: #475569;
          border-bottom: 1px solid #f1f5f9;
        }
        .rich-content tr:last-child td { border-bottom: none; }
        .rich-content tr:hover td { background: #f8fafc; }

        /* Images */
        .rich-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1rem 0;
        }

        /* FAQ accordion pattern — if content uses <details><summary> */
        .rich-content details {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0;
          margin: 0.75rem 0;
          overflow: hidden;
        }
        .rich-content summary {
          padding: 0.875rem 1rem;
          cursor: pointer;
          font-weight: 600;
          font-family: system-ui, sans-serif;
          color: #1e293b;
          background: #f8fafc;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .rich-content summary::after {
          content: '+';
          font-size: 1.25rem;
          color: #3b82f6;
          line-height: 1;
        }
        .rich-content details[open] summary::after { content: '−'; }
        .rich-content details > *:not(summary) {
          padding: 0.875rem 1rem;
          color: #475569;
        }

        /* Mobile tweaks */
        @media (max-width: 640px) {
          .rich-content { font-size: 1rem; line-height: 1.75; }
          .rich-content h2 { font-size: 1.2rem; margin: 2rem 0 0.75rem; }
          .rich-content h3 { font-size: 1.05rem; }
          .rich-content table { font-size: 0.8125rem; }
          .rich-content th,
          .rich-content td { padding: 0.55rem 0.75rem; }
        }

        /* ─── Stat card pulse animation ─────────────────────────── */
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

        /* ─── Trust badge hover ─────────────────────────────────── */
        .trust-badge {
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .trust-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.12);
        }
      `}</style>

      <div className="bg-slate-50 min-h-screen">

        {/* ── Tool ── */}
        <PassportMakerApp title={toolPage?.h1} subtitle={toolPage?.metaDescription} img={(toolPage as any)?.img} />

      

       

        {/* ── SEO rich content ── */}
        <div className="bg-white border-t border-slate-200/80 py-12 sm:py-16 mt-6 sm:mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50/70 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-3">
                Complete Biometric Guide
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Detailed Guide &amp; Frequently Asked Questions
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-md mx-auto font-medium">
                Everything you need to know about creating a compliant passport photo.
              </p>
            </div>

            {/* Rich HTML content */}
            <ToolPageRenderer html={toolPage?.content || ""} />
          </div>
        </div>

      

      </div>
    </>
  );
}