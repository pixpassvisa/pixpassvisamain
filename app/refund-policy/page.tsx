import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "PixPassVisa refund policy — 100% money-back guarantee on rejected photos.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/refund-policy",
    languages: {
      en: "https://www.pixpassvisa.com/refund-policy",
      "x-default": "https://www.pixpassvisa.com/refund-policy",
    },
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Refund Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: February 23, 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-sm max-w-none">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Our 100% Money-Back Guarantee</h2>
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 mb-4">
                <p className="text-sm text-blue-900 leading-relaxed">
                  We stand fully behind our photos. If your processed photo is rejected by any government agency (e.g., for passport, visa, or ID applications), you'll receive a <strong>100% refund</strong> of your original purchase price — no partial credits, no fine print.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Refund Request Requirements</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                To keep things fair and fast for everyone, we ask for a few simple things:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Request your refund within <strong>30 days</strong> of your original purchase.</li>
                <li>Share <strong>screenshot proof</strong> or an official notification showing the photo was rejected by the government agency.</li>
                <li>Include the email address used for the purchase or your transaction ID.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. No Hidden Deductions</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Unlike many services that only offer partial refunds, we refund the <strong>full amount</strong> you paid — 100%, every time your photo is rejected for official use. We absorb the processing costs ourselves because we'd rather earn your trust than nickel-and-dime you.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Processing Time and Method</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Approved refunds are processed within <strong>5 to 10 business days</strong> of approval.</li>
                <li>Your refund goes back to the <strong>original payment method</strong> used during the transaction. We're unable to issue refunds to alternate cards or accounts.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Other Refund Reasons</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Because our service delivers immediate digital downloads, refund requests for reasons other than official photo rejection (e.g., changing your mind, accidental duplicate purchases, or finding an alternative service) are reviewed on a case-by-case basis. We're happy to work with you — just reach out and explain your situation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. How to Request a Refund</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                To start a refund request, email our team at <a href="mailto:refund@pixpassvisa.com" className="font-semibold text-slate-900 underline">refund@pixpassvisa.com</a> or <a href="mailto:support@pixpassvisa.com" className="font-semibold text-slate-900 underline">support@pixpassvisa.com</a> with your transaction details and proof of photo rejection. We aim to respond quickly and make the process as painless as possible.
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
              <p className="text-xs text-slate-500 mt-1">Full usage terms and conditions</p>
            </Link>
            <Link href="/privacy-policy" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Privacy Policy</span>
              <p className="text-xs text-slate-500 mt-1">How we handle your data</p>
            </Link>
            <Link href="/faq" className="group p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">FAQ</span>
              <p className="text-xs text-slate-500 mt-1">Common questions and answers</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            ← Back to Home
          </Link>
          <Link href="/contact" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Contact Us
          </Link>
          <Link href="/passport-photo-online" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Create Photo
          </Link>
        </div>
      </section>
    </div>
  );
}