import Link from "next/link";
import React from "react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      title: "Popular Photo Resizers",
      items: [
        { label: "Passport Photo Resizer", href: "/passport-photo-online" },
        { label: "US Visa Photo (2x2 / 600x600)", href: "/us-visa-photo-editor" },
        { label: "Schengen Visa (35x45 mm)", href: "/schengen-visa-photo-editor" },
        { label: "India Passport Photo Resizer", href: "/india-passport-photo-editor" },
        { label: "UK Passport Photo (35x45 mm)", href: "/uk" },
        { label: "Canada Passport & Visa Photo", href: "/ca" },
        { label: "Australia Passport Photo", href: "/australia-passport-photo-editor" },
        { label: "Germany Visa Photo", href: "/germany-visa-photo-editor" },
      ],
    },
    {
      title: "Biometric & KB Resizers",
      items: [
        { label: "Free Photo Validator", href: "/visa-photo-validator" },
        { label: "Passport Photo Checker", href: "/passport-photo-checker" },
        { label: "Resize Image to 20KB / 50KB", href: "/passport-photo-online" },
        { label: "Resize Photo to 100KB / 200KB", href: "/passport-photo-online" },
        { label: "DV Lottery Photo Checker", href: "/diversity-visa-lottery-photo-checker" },
        { label: "Australian Photo Checker", href: "/australian-passport-photo-checker" },
        { label: "UK HMPO Photo Checker", href: "/uk-passport-photo-checker-online-free" },
        { label: "Print Sheet Template Generator", href: "/passport-photo-print-template-generator" },
      ],
    },
    {
      title: "Exam & Form Tools",
      items: [
        { label: "Government Form Photo Resizer", href: "/passport-size-photo-maker" },
        { label: "Signature Resizer Online", href: "/passport-photo-online" },
        { label: "All Countries Photo Directory", href: "/passport-photos" },
        { label: "Visa Requirement Directory", href: "/visa-photo" },
        { label: "Photo Requirements Guide", href: "/blog" },
        { label: "Support & Help Center", href: "/support" },
      ],
    },
    {
      title: "Company & Legal",
      items: [
        { label: "About PixPassVisa", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Data Security & GDPR", href: "/data-security" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-300 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand & Concept */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <Logo size="md" variant="light" />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Global AI biometric photo maker & resizer. 100% compliant passport, visa, and ID photos for 50+ countries with automated background correction, 300 DPI sizing, and file size optimization.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                100% Biometric Compliant
              </span>
              <span className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Privacy Protected
              </span>
            </div>
          </div>

          {/* Mapping Service Links */}
          {links.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-slate-200">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs text-slate-400 hover:text-blue-400 transition-colors duration-150 inline-block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} PixPassVisa (pixpassvisa.com). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-slate-400 transition-colors">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
