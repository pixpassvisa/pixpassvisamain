import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, CreditCard, Building, Lock, Mail, MapPin } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact PixPassVisa support team.",
  alternates: {
    canonical: "https://www.pixpassvisa.com/contact",
    languages: {
      en: "https://www.pixpassvisa.com/contact",
      "x-default": "https://www.pixpassvisa.com/contact",
    },
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs />
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="mt-3 text-slate-500">We are here to help with your photo validation queries.</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Business Information
                  </h3>
                  <div className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900 text-lg mb-1">PixPassVisa</p>
                    <p>khadda kushinagar,</p>
                    <p>Uttar Pradesh, India 274802</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Support
                  </h3>
                  <div className="space-y-4">
                    <div className="text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900">General Support & Inquiries</p>
                        <p className="text-sm text-slate-500">For general questions and assistance</p>
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:support@pixpassvisa.com" rel="nofollow" class="font-bold text-blue-600 hover:text-blue-700 text-base transition-colors shrink-0">support@pixpassvisa.com</a><!--/email_off-->' }} />
                    </div>

                    <div className="text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900">Refunds & Guarantee Requests</p>
                        <p className="text-sm text-slate-500">For 100% money-back guarantee claims</p>
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:refund@pixpassvisa.com" rel="nofollow" class="font-bold text-blue-600 hover:text-blue-700 text-base transition-colors shrink-0">refund@pixpassvisa.com</a><!--/email_off-->' }} />
                    </div>

                    <div className="text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-slate-900">Photo & Technical Support</p>
                        <p className="text-sm text-slate-500">For photo compliance and technical queries</p>
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:photo@pixpassvisa.com" rel="nofollow" class="font-bold text-blue-600 hover:text-blue-700 text-base transition-colors shrink-0">photo@pixpassvisa.com</a><!--/email_off-->' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">You might also find these helpful</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/faq" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">FAQ</span>
                <p className="text-xs text-slate-500 mt-0.5">Answers to common questions about our service</p>
              </div>
            </Link>
            <Link href="/refund-policy" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Refund Policy</span>
                <p className="text-xs text-slate-500 mt-0.5">Our photo rejection guarantee details</p>
              </div>
            </Link>
            <Link href="/about" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">About Us</span>
                <p className="text-xs text-slate-500 mt-0.5">Learn more about PixPassVisa and our mission</p>
              </div>
            </Link>
            <Link href="/privacy-policy" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/70 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Privacy Policy</span>
                <p className="text-xs text-slate-500 mt-0.5">How we handle your photos and data</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            ← Back to Home
          </Link>
          <Link href="/passport-photo-online" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Create Photo →
          </Link>
        </div>
      </section>
    </div>
  );
}
