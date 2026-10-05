import Link from "next/link";
import Logo from "../../components/Logo";
import { fr } from "../translations";

export default function FooterFr() {
  const links = [
    {
      title: fr.footer.sections.popularServices,
      items: [
        { label: "Photo Passeport France", href: "/fr/photo-passeport" },
        { label: "Photo d'Identité", href: "/fr/photo-identite" },
        { label: "Photo d'Identité en ligne", href: "/fr/photo-identite-en-ligne" },
        { label: "Photo Visa", href: "/fr/photo-visa" },
        { label: "ePhoto ANTS", href: "/fr/ephoto-ants" },
        { label: "Photo Carte d'Identité", href: "/fr/photo-carte-identite" },
        { label: "Photo Biométrique", href: "/fr/photo-passeport-biometrique" },
      ],
    },
    {
      title: fr.footer.sections.tools,
      items: [
        { label: fr.nav.home, href: "/fr" },
        { label: "Créer une photo", href: "/fr/passport-photo-online" },
        { label: "Guides", href: "/fr/guides" },
        { label: "Taille photo passeport", href: "/fr/guides/passport-photo-size" },
        { label: "Fond photo passeport", href: "/fr/guides/passport-photo-background" },
        { label: "Photo maison", href: "/fr/guides/how-to-take-passport-photo-at-home" },
        { label: "Photo d'identité France", href: "/fr/guides/photo-identite-france-passeport-cni-ephoto-permis-visa" },
      ],
    },
    {
      title: fr.footer.sections.company,
      items: [
        { label: fr.footer.aboutUs, href: "/about" },
        { label: fr.footer.contactUs, href: "/contact" },
        { label: "Sécurité des données", href: "/data-security" },
        { label: fr.footer.privacyPolicy, href: "/privacy-policy" },
        { label: fr.footer.terms, href: "/terms" },
        { label: fr.footer.refundPolicy, href: "/refund-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/fr" className="inline-flex items-center mb-4 group opacity-100 hover:opacity-90">
              <Logo size="md" variant="light" />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              {fr.footer.description}
            </p>
            <div className="flex gap-4">
              {fr.footer.badges.map((badge) => (
                <span key={badge} className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">{badge}</span>
              ))}
            </div>
          </div>

          {links.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-5">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} PixPassVisa. {fr.footer.copyright}</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <p>{fr.footer.disclaimer}</p>
            <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:support@pixpassvisa.com" rel="nofollow" class="hover:text-white transition-colors">support@pixpassvisa.com</a><!--/email_off-->' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
