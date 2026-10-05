import Link from "next/link";
import Logo from "../../components/Logo";
import { de } from "../translations";

export default function FooterDe() {
  const links = [
    {
      title: de.footer.sections.popularServices,
      items: [
        { label: "Biometrisches Passbild", href: "/de/biometrisches-passbild" },
        { label: "Personalausweis Foto", href: "/de/biometrisches-passbild" },
        { label: "Bewerbungsfoto", href: "/de/bewerbungsfoto" },
        { label: "Führerschein Foto", href: "/de/fuehrerschein-foto" },
        { label: "Visum Foto", href: "/de/visum-foto" },
        { label: "Gesundheitskarte", href: "/de/gesundheitskarte-foto" },
        { label: "Passfoto Schweiz", href: "/de/passfoto-schweiz-online" },
        { label: "Dokumentenfoto Schweiz", href: "/de/dokumentenfoto-schweiz" },
      ],
    },
    {
      title: de.footer.sections.tools,
      items: [
        { label: de.nav.home, href: "/de" },
        { label: "Ratgeber & Guides", href: "/de/guides" },
        { label: "Foto erstellen", href: "/de/passbild-online" },
        { label: "Drucken bei Rossmann", href: "/de/passbild-online" },
        { label: "Baby Passfotos", href: "/de/biometrisches-passbild" },
      ],
    },
    {
      title: de.footer.sections.company,
      items: [
        { label: de.footer.aboutUs, href: "/about" },
        { label: de.footer.contactUs, href: "/contact" },
        { label: "Datensicherheit", href: "/data-security" },
        { label: de.footer.privacyPolicy, href: "/privacy-policy" },
        { label: de.footer.terms, href: "/terms" },
        { label: de.footer.refundPolicy, href: "/refund-policy" },
        { label: de.footer.imprint, href: "/imprint" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/de" className="inline-flex items-center mb-4 group opacity-100 hover:opacity-90">
              <Logo size="md" variant="light" />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              {de.footer.description}
            </p>
            <div className="flex gap-4">
              {de.footer.badges.map((badge) => (
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
          <p>&copy; {new Date().getFullYear()} PixPassVisa. {de.footer.copyright}</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <p>{de.footer.disclaimer}</p>
            <span dangerouslySetInnerHTML={{ __html: '<!--email_off--><a href="mailto:support@pixpassvisa.com" rel="nofollow" class="hover:text-white transition-colors">support@pixpassvisa.com</a><!--/email_off-->' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
