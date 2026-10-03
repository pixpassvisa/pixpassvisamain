import Link from "next/link";
import { ScanFace, ArrowUpRight } from "lucide-react";
const groups = [
  { label: "MAKE YOUR NEXT MOVE", links: [["Create a photo", "/passport-photo-online"], ["Photo checker", "/visa-photo-validator"], ["Passport photo sizes", "/passport-photo-sizes"], ["Print templates", "/passport-photo-print-template-generator"]] },
  { label: "A LITTLE GUIDANCE", links: [["Passport guides", "/passport-photos"], ["Visa guides", "/visa-photo"], ["Photo advice", "/blog"], ["Our editorial process", "/editorial-methodology"]] },
  { label: "WE’RE HERE TO HELP", links: [["About us", "/about"], ["Support", "/support"], ["Contact", "/contact"], ["Data security", "/data-security"]] },
];
export default function SiteFooter() { return <footer className="site-footer"><div className="site-footer-inner"><div className="site-footer-brand"><Link href="/" className="site-wordmark"><ScanFace size={29} strokeWidth={1.6} /><span>pixpassvisa.com</span></Link><p>A small photo.<br />A world of possibilities.</p><a href="mailto:support@pixpassvisa.com">support@pixpassvisa.com <ArrowUpRight size={14} /></a></div>{groups.map(g => <div key={g.label}><h2>{g.label}</h2>{g.links.map(([text, href]) => <Link href={href} key={href}>{text}</Link>)}</div>)}</div><div className="site-footer-bottom"><span>© {new Date().getFullYear()} pixpassvisa.com · Independent photo preparation service.</span><div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refunds</Link></div></div></footer>; }
