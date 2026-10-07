"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ScanFace, ArrowUpRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
const links = [["/passport-photo-online", "Photo maker"], ["/passport-photo-sizes", "Photo sizes"], ["/passport-photos", "Passport guides"], ["/visa-photo", "Visa guides"], ["/blog", "Blog"], ["/#how-it-works", "How it works"], ["/#pricing", "Pricing"], ["/faq", "FAQ"], ["/support", "Help"]];
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  return <header className="site-header"><a href="#main-content" className="skip-link">Skip to content</a><nav aria-label="Main navigation" className="site-nav">
    <Link prefetch={false} href="/" className="site-wordmark" onClick={() => setOpen(false)}><ScanFace size={29} strokeWidth={1.6} /><span>pixpassvisa<span className="site-dotcom">.com</span></span></Link>
    <div className="site-desktop-links">{links.map(([href, label]) => <Link prefetch={false} href={href} key={href}>{label}</Link>)}</div>
    <div className="site-desktop-actions"><LanguageSwitcher />{session && <Link prefetch={false} href="/dashboard">My photos</Link>}<Link prefetch={false} className="site-start" href="/passport-photo-online">Create a photo <ArrowUpRight size={16} /></Link></div>
    <button className="site-menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <div className="site-mobile-menu" id="mobile-navigation" onKeyDown={e => { if (e.key === "Escape") setOpen(false); }}>{links.map(([href, label]) => <Link prefetch={false} href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}<LanguageSwitcher />{session && <><Link prefetch={false} href="/dashboard" onClick={() => setOpen(false)}>My photos</Link><button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button></>}<Link prefetch={false} className="site-start" href="/passport-photo-online" onClick={() => setOpen(false)}>Create a photo <ArrowUpRight size={16} /></Link></div>}
  </nav></header>;
}
