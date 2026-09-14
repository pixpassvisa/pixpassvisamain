import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PixPassVisa privacy policy. Learn how we handle your photos, data, and personal information. GDPR and CCPA compliant.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/privacy-policy",
    languages: {
      en: "https://www.pixpassvisa.com/privacy-policy",
      "x-default": "https://www.pixpassvisa.com/privacy-policy",
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: February 21, 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-sm max-w-none">
          <div className="space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Overview</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                PixPassVisa (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our photo validation and processing service at pixpassvisa.com.
              </p>
            </div>

            {/* Data Collection */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Photos You Upload</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Photos are uploaded solely for validation and processing purposes</li>
                <li>We analyze photos for compliance with official government specifications for over 50 countries (including US, UK, India, and Schengen)</li>
                <li>Photos are never used for AI training, marketing, or any other purpose</li>
              </ul>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Payment Information</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Payment processing is handled by our third-party payment processor</li>
                <li>We never store credit card numbers or full payment details on our servers</li>
                <li>We receive only a transaction confirmation and payment status</li>
              </ul>
              <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">Usage Data</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Browser type, device type, and operating system</li>
                <li>Pages visited and features used (anonymized)</li>
                <li>IP address (for security and fraud prevention only)</li>
              </ul>
            </div>

            {/* Photo Handling */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Photo Handling &amp; Retention</h2>
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-semibold text-blue-800 mb-2">Our Photo Privacy Guarantees:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                  <li><strong>Auto-deletion:</strong> All original uploaded photos are automatically and permanently deleted after 24 hours</li>
                  <li><strong>Expiring links:</strong> Download URLs are signed and expire after 1 hour</li>
                  <li><strong>No permanent storage:</strong> Processed images are not stored after download</li>
                  <li><strong>No sharing:</strong> Photos are never shared with third parties</li>
                  <li><strong>No AI training:</strong> Photos are never used for machine learning or AI training</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use essential cookies to maintain session state and process your photos. We may also use analytics cookies (such as Google Analytics) to understand how our service is used. You can disable non-essential cookies in your browser settings.
              </p>
            </div>

            {/* GDPR / CCPA */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. GDPR &amp; CCPA Compliance</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We comply with the General Data Protection Regulation (GDPR) for EU residents and the California Consumer Privacy Act (CCPA) for California residents. You have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong>Access:</strong> Request a copy of any personal data we hold about you</li>
                <li><strong>Deletion:</strong> Request immediate and complete deletion of all your data</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to any processing of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
              </ul>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Security</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use industry-standard security measures including encrypted connections (TLS/SSL), secure cloud infrastructure, and access controls. All photo transfers are encrypted in transit and at rest.
              </p>
            </div>

            {/* Third-party */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Third-Party Services</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use the following third-party services that may process limited data on our behalf: payment processors (for transaction processing), cloud hosting providers (for photo processing), and analytics services (for anonymous usage statistics). All third-party providers are GDPR-compliant.
              </p>
            </div>

            {/* Children */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Children&apos;s Privacy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our service is not directed to children under 13. Minors applying for visas or passports should have a parent or guardian use the service on their behalf.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to This Policy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We may update this policy from time to time. Significant changes will be communicated through a notice on our website. Continued use of the service after changes constitutes acceptance.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact Us</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                For privacy-related questions, data deletion requests, or GDPR/CCPA inquiries, contact us at <a href="mailto:support@pixpassvisa.com" className="font-semibold text-slate-900 underline">support@pixpassvisa.com</a>.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
                Business Address: Varanasi, Uttar Pradesh, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Policies & Links */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Related Policies & Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/terms" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Terms of Service</span>
              <p className="text-xs text-slate-500 mt-1">Our usage terms and conditions</p>
            </Link>
            <Link href="/refund-policy" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Refund Policy</span>
              <p className="text-xs text-slate-500 mt-1">Photo rejection guarantee</p>
            </Link>
            <Link href="/contact" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Contact Us</span>
              <p className="text-xs text-slate-500 mt-1">Get in touch with our team</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            ← Back to Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            About Us
          </Link>
          <Link href="/faq" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
