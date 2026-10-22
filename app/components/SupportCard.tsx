import Link from "next/link";
import { ArrowUpRight, Headphones, Mail, Eye, CreditCard, ShieldCheck } from "lucide-react";

export default function SupportCard() {
  return <section className="support-section" aria-labelledby="support-card-title" id="contact-support">
    <div className="support-card">
      <div className="support-card-copy"><span className="support-availability"><Headphones size={16} /> 24/7 email support</span>
        <h2 id="support-card-title">A little help.<br />Whenever you need it.</h2>
        <p>Questions about your photo, checkout, or download? Contact our support team any time. Include your order or payment reference so we can help you find the next step.</p>
        <div className="support-card-actions"><Link className="support-contact-button" href="/contact#contact-form">Contact us <ArrowUpRight size={18} /></Link><a className="support-email-link" href="mailto:support@pixpassvisa.com"><Mail size={17} /><span>support@pixpassvisa.com</span></a></div>
        <p className="support-response-note">Send a message 24/7. Response times may vary.</p>
      </div>
      <div className="support-confidence"><h3>Clear steps. Support when you need it.</h3>
        <div><Eye size={21} /><p><strong>Preview before you pay</strong><span>Review your photo and the price before checkout.</span></p></div>
        <div><CreditCard size={21} /><p><strong>One-time payment</strong><span>No subscription or recurring download charge.</span></p></div>
        <div><ShieldCheck size={21} /><p><strong>Help with payment problems</strong><span>Charged without a download? Contact us before paying again.</span></p></div>
        <Link href="/refund-policy">Read our refund policy ↗</Link>
      </div>
    </div>
  </section>;
}
