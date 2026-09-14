import type { Metadata } from "next";
import Link from "next/link";
import { getLocalPrice } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "PixPassVisa terms of service. Terms, conditions, and usage policies for our US visa and passport photo validation service.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/terms",
    languages: {
      en: "https://www.pixpassvisa.com/terms",
      "x-default": "https://www.pixpassvisa.com/terms",
    },
  },
};

export default async function TermsPage() {
  // Use skipHeaders: true to keep the page static
  const localPrice = await getLocalPrice(6.99, undefined, false, true);

  return (
    <div className="bg-white">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms of Service</h1>
          <p className="mt-3 text-gray-500">Last updated: February 22, 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                By accessing or using PixPassVisa (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service. The Service is available at pixpassvisa.com and includes all photo validation, processing, and download features.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                PixPassVisa provides an automated photo validation and processing service for global passport, visa, and ID photos. The Service checks photos against official government specifications for 50+ countries including the US, UK, India, and Schengen.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mt-3">
                <li><strong>Free tier:</strong> Photo validation and compliance reports at no cost</li>
                <li><strong>Paid tier:</strong> 1 processed, compliant photo download for {localPrice.formatted} per purchase. <strong>Processed digital photos are delivered instantly via download after successful payment.</strong></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>You must only upload photos of yourself or photos you have legal permission to process</li>
                <li>You are responsible for the accuracy and authenticity of uploaded photos</li>
                <li>You must not use the Service for fraudulent purposes or identity theft</li>
                <li>You must not upload inappropriate, offensive, or illegal content</li>
                <li>You must not attempt to reverse-engineer, hack, or disrupt the Service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Payment Terms</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>The photo processing and download fee is <strong>{localPrice.formatted} ({localPrice.currency})</strong> per photo</li>
                <li>Each purchase includes <strong>1 processed digital photo + A4 print sheet (20 photos)</strong> — compliant, cropped, and ready for submission</li>
                <li>Payment is a one-time charge — there are no subscriptions or recurring fees</li>
                <li>Payment is processed securely via our third-party payment provider</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Refund Policy</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Photo Rejection Guarantee:</strong> If your processed photo is rejected by any government agency (e.g., during passport application, visa submission, or national ID registration), you are eligible for a <strong>50% refund</strong> of your purchase price.
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>To request a refund, contact us at <a href="mailto:refund@pixpassvisa.com" className="font-semibold text-slate-900 underline">refund@pixpassvisa.com</a> within <strong>30 days</strong> of purchase</li>
                <li>You must provide your transaction ID and evidence of photo rejection (screenshot of rejection notice)</li>
                <li>Refunds are issued to the original payment method within 5–10 business days</li>
                <li>For more details, please see our <Link href="/refund-policy" className="text-blue-600 underline">Refund Policy</Link> page.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Independence and Affiliation Disclaimer</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Important:</strong> PixPassVisa is an independent, private service and is <strong>not affiliated with, endorsed by, or connected to the U.S. government, the Department of State, USCIS, or any other government agency.</strong> Final acceptance of your photo is entirely at the discretion of the reviewing government agency. We are not responsible for photo rejections by government agencies.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Data Retention & Privacy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                You retain full ownership of all photos you upload. By uploading photos, you grant us a temporary, limited license to process them solely for the purpose of providing the Service.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 mt-3">
                <li><strong>Automatic deletion:</strong> All uploaded and processed images are <strong>automatically deleted from our servers within 24 hours</strong> of creation via an automated cleanup process</li>
                <li>After deletion, photos cannot be recovered — please download your processed photo promptly after purchase</li>
                <li>We do not sell, share, or use your photos for any purpose other than providing the Service</li>
                <li>We do not retain any facial biometric data beyond the processing session</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Limitation of Liability</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, PixPassVisa shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to visa application rejections, delayed applications, or any other immigration-related consequences.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Service Availability</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We reserve the right to modify, suspend, or discontinue the Service at any time with reasonable notice. Scheduled maintenance will be communicated in advance when possible.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">10. Termination</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We reserve the right to terminate or suspend your access to the Service at any time for violation of these Terms, abusive behavior, or suspected fraudulent activity. Upon termination, all data associated with your session will be permanently deleted.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">11. Governing Law</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong> (specifically the jurisdiction of Varanasi, Uttar Pradesh). Any disputes arising from these Terms or the Service shall be resolved in the courts of India.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">12. Changes to Terms</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We may update these Terms from time to time. Significant changes will be communicated via a notice on our website. Your continued use of the Service after changes constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">13. Contact</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                For questions about these Terms, contact us at <a href="mailto:support@pixpassvisa.com" className="font-semibold text-slate-900 underline">support@pixpassvisa.com</a>.
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
            <Link href="/privacy-policy" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Privacy Policy</span>
              <p className="text-xs text-slate-500 mt-1">How we protect your data</p>
            </Link>
            <Link href="/refund-policy" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Refund Policy</span>
              <p className="text-xs text-slate-500 mt-1">Photo rejection guarantee</p>
            </Link>
            <Link href="/contact" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Contact Us</span>
              <p className="text-xs text-slate-500 mt-1">Get in touch for questions</p>
            </Link>
          </div>
        </div>
      </section>

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
