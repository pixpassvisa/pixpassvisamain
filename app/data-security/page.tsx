import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Security & Privacy Protection | PixPassVisa",
  description:
    "Learn how PixPassVisa protects your passport and ID photos with 256-bit SSL encryption, 24-hour auto-deletion, PCI-DSS payment security, and a 100% zero data selling guarantee.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/data-security",
    languages: {
      en: "https://www.pixpassvisa.com/data-security",
      "x-default": "https://www.pixpassvisa.com/data-security",
    },
  },
};

export default function DataSecurityPage() {
  const securityPillars = [
    {
      id: "encryption",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      badge: "256-Bit SSL / TLS 1.3",
      title: "Bank-Grade Encryption",
      description:
        "Every byte of data transferred between your device and our processing servers is secured with industry-standard TLS 1.3 and 256-bit SSL encryption. During transient processing, files are protected using AES-256 encryption at rest in isolated, firewalled server environments.",
      highlights: [
        "TLS 1.3 transport security for all uploads & downloads",
        "AES-256 encryption for data at rest during processing",
        "HTTPS-only strict transport security (HSTS) enforced",
        "Isolated processing containers with zero public exposure",
      ],
    },
    {
      id: "payment-security",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      badge: "PCI-DSS Level 1 Compliant",
      title: "Payment Security & Financial Protection",
      description:
        "Your financial transactions are handled exclusively through world-class, PCI-DSS Level 1 certified payment gateways (Stripe & trusted partners). PixPassVisa never receives, stores, or processes your credit card numbers, CVVs, or bank credentials.",
      highlights: [
        "Zero payment card data stored on PixPassVisa servers",
        "Tokenized end-to-end checkout flow via Stripe",
        "Encrypted credit card & digital wallet processing",
        "Instant digital receipt & fraud prevention protection",
      ],
    },
    {
      id: "image-retention",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      badge: "Strict Ephemeral Storage",
      title: "Temporary Image Retention",
      description:
        "We understand that passport and ID photos contain sensitive biometric information. Images are retained strictly for the time required to perform AI compliance checks, background removal, and sizing. Download links are cryptographically signed and automatically expire after 1 hour.",
      highlights: [
        "Images stored only long enough to complete processing & download",
        "Signed, temporary download URLs expiring after 60 minutes",
        "Zero permanent cloud storage or permanent archive databases",
        "Strict employee access restriction — zero manual viewing without consent",
      ],
    },
    {
      id: "automatic-deletion",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      badge: "Automated 24-Hour Purge",
      title: "Automatic Permanent Deletion",
      description:
        "Our system features an automated background purge engine that permanently deletes uploaded photos, processed templates, and cached files from our storage disks within 24 hours. Deleted files cannot be recovered by anyone—including our engineers.",
      highlights: [
        "Automated continuous deletion scripts running 24/7",
        "Complete disk overwrite & cache purge within 24 hours",
        "Manual instant delete button available directly on your preview screen",
        "No residual backup snapshots kept of user biometric photos",
      ],
    },
    {
      id: "no-selling",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      badge: "100% Privacy Guarantee",
      title: "No Selling User Data & No AI Model Training",
      description:
        "Your privacy is not for sale. We pledge that your photos, facial data, email addresses, and personal information are NEVER sold, rented, leased, or shared with third-party advertisers, data brokers, or marketing firms. Furthermore, your photos are NEVER used to train public AI models.",
      highlights: [
        "Zero data monetization — we sell photo processing, not your data",
        "Zero sharing with ad networks, data brokers, or marketing partners",
        "Prohibited use of photos for public AI or facial recognition model training",
        "Full compliance with GDPR (EU), CCPA/CPRA (California), & global privacy laws",
      ],
    },
  ];

  const faqs = [
    {
      q: "Is it safe to upload my passport or ID photo to PixPassVisa?",
      a: "Yes, absolutely. PixPassVisa utilizes bank-level 256-bit SSL encryption to transfer your photos securely. Your images are held in temporary memory solely to perform automated sizing and compliance checks, and are permanently wiped within 24 hours.",
    },
    {
      q: "Does PixPassVisa store my credit card details?",
      a: "No. All payment processing is conducted through Stripe, a PCI-DSS Level 1 certified payment platform. Your payment details are encrypted directly by Stripe—PixPassVisa servers never touch or store card numbers or banking secrets.",
    },
    {
      q: "How fast are my uploaded images deleted?",
      a: "Original uploads and processed photo sheets are automatically purged from our servers within 24 hours. You can also trigger immediate instant deletion right from your order preview screen as soon as you download your file.",
    },
    {
      q: "Can PixPassVisa employees view my uploaded passport photo?",
      a: "No. Photo processing is completely automated by our AI validation engines. Our staff cannot access or view your uploaded images unless you explicitly open a support request asking our team to inspect a processing issue.",
    },
    {
      q: "Will my photo be used to train facial recognition software or AI models?",
      a: "No, never. We maintain a strict policy against using customer photos for AI training, public dataset creation, or facial recognition model development.",
    },
  ];

  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Maximum Identity & Data Protection
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Data Security &amp; Privacy Safeguards
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Uploading passport and official ID photos requires total confidence. We protect your photos and personal details with bank-level encryption, ephemeral processing, 24-hour auto-deletion, and an absolute zero data-selling policy.
            </p>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-cyan-400">256-Bit</p>
                <p className="text-xs text-slate-400 font-medium">SSL / TLS Encryption</p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-cyan-400">PCI-DSS</p>
                <p className="text-xs text-slate-400 font-medium">Level 1 Payment Gateway</p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-cyan-400">24 Hours</p>
                <p className="text-xs text-slate-400 font-medium">Auto Image Purge</p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-cyan-400">0%</p>
                <p className="text-xs text-slate-400 font-medium">Data Selling &amp; Ads</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Reassurance Callout for Passport & ID Uploaders */}
      <section className="py-8 bg-blue-50/70/70 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-blue-200  flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-slate-900 flex items-center justify-center shrink-0 font-black  shadow-blue-500/20/20">
              <svg className="w-7 h-7 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Why We Place Passport &amp; ID Security First
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Many users upload passport, visa, and national identity photos containing sensitive facial biometric features. We handle your files with the same privacy protocols expected by official government authorities. Your image is never stored longer than necessary, never indexed, and never linked to external advertising profiles.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-blue-800">
                <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-600" /> No biometric indexing</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-600" /> No public web access</span>
                <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-600" /> Instant file wipe on demand</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 5 Security Pillars */}
      <section className="py-16 lg:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 5 Data Security Guarantees
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Clear, transparent explanations of how your data, payment, and photos are protected at every stage of the process.
            </p>
          </div>

          <div className="space-y-10 max-w-5xl mx-auto">
            {securityPillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                id={pillar.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200  hover: transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100/80 border border-blue-200 flex items-center justify-center shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">0{idx + 1}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Key Technical Safeguards:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                        {pillar.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-white border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Security Standard Comparison
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              How PixPassVisa compares to standard unverified online photo generators.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 ">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white uppercase text-xs">
                <tr>
                  <th className="py-4 px-6 font-bold">Security &amp; Privacy Feature</th>
                  <th className="py-4 px-6 font-bold text-cyan-400">PixPassVisa Standard</th>
                  <th className="py-4 px-6 font-bold text-slate-400">Unsecure Alternatives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="py-4 px-6 font-semibold text-slate-900">Encryption in Transit &amp; Rest</td>
                  <td className="py-4 px-6 text-blue-700 font-bold bg-blue-50/70/50">TLS 1.3 + 256-Bit SSL / AES-256</td>
                  <td className="py-4 px-6 text-slate-500">HTTP / Basic SSL</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-4 px-6 font-semibold text-slate-900">Photo Auto-Deletion Window</td>
                  <td className="py-4 px-6 text-blue-700 font-bold bg-blue-50/70/50">Permanent Purge within 24h (or Instant)</td>
                  <td className="py-4 px-6 text-slate-500">Stored indefinitely</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-4 px-6 font-semibold text-slate-900">Payment Card Handling</td>
                  <td className="py-4 px-6 text-blue-700 font-bold bg-blue-50/70/50">Zero Stored Cards (100% Stripe Tokenized)</td>
                  <td className="py-4 px-6 text-slate-500">Vulnerable on-server storage</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-4 px-6 font-semibold text-slate-900">Selling / Sharing User Data</td>
                  <td className="py-4 px-6 text-blue-700 font-bold bg-blue-50/70/50">Strictly Prohibited &amp; Guaranteed Never</td>
                  <td className="py-4 px-6 text-slate-500">Mined for advertising &amp; third parties</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-4 px-6 font-semibold text-slate-900">AI Model Training Policy</td>
                  <td className="py-4 px-6 text-blue-700 font-bold bg-blue-50/70/50">Zero Photos Used for AI Training</td>
                  <td className="py-4 px-6 text-slate-500">Unclear or permissive terms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Security Questions
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Have questions about your passport photo privacy? Here are quick answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 ">
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-600 font-extrabold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">Need Immediate Data Assistance?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            If you have specific security questions, require urgent data deletion, or need assistance under GDPR / CCPA, reach out to our privacy response team directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="mailto:support@pixpassvisa.com"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors  shadow-blue-500/20/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Privacy Team
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold text-sm border border-slate-700 transition-colors"
            >
              View Full Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* Related Legal Policies */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-base font-bold text-slate-900 mb-4">Related Legal &amp; Security Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Link href="/privacy-policy" className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/70/50 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Privacy Policy</span>
              <p className="text-xs text-slate-500 mt-1">Full data practices</p>
            </Link>
            <Link href="/terms" className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/70/50 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Terms of Service</span>
              <p className="text-xs text-slate-500 mt-1">Service agreement</p>
            </Link>
            <Link href="/refund-policy" className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/70/50 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Refund Policy</span>
              <p className="text-xs text-slate-500 mt-1">100% guarantee</p>
            </Link>
            <Link href="/contact" className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/70/50 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Contact Us</span>
              <p className="text-xs text-slate-500 mt-1">24/7 Support</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Breadcrumb Footer */}
      <section className="py-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-wrap gap-4 justify-center text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">← Back to Home</Link>
          <span>•</span>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
          <span>•</span>
          <Link href="/visa-photo-validator" className="hover:text-blue-600 transition-colors">Free Photo Validator</Link>
        </div>
      </section>
    </div>
  );
}
