import React from 'react';
import Image from 'next/image';

const faqs = [
  {
    q: "What happens if my passport is damaged and I need it for US immigration?",
    a: "If your passport is damaged, US Customs and Border Protection (CBP) may deny you entry, and embassies may refuse to place a visa inside it. You must replace it immediately through your home country's embassy before attempting international travel."
  },
  {
    q: "Why might a shipped passport arrive invalid after being reported lost?",
    a: "When you report a US passport lost or stolen to the State Department, it is immediately electronically invalidated to prevent identity theft. Even if you subsequently find it or if USPS delivers it delayed, it cannot be reactivated; you must apply for a new one."
  },
  {
    q: "How does name change on a passport cause issues for proving US citizenship?",
    a: "If your passport name doesn't match your birth certificate or air ticket due to marriage or court order, you must carry original, certified proof of the name change (like a marriage certificate) to link your current identity to your citizenship record."
  },
  {
    q: "What to do if my expired passport prevents me from getting a Real ID?",
    a: "An expired passport cannot prove identity for a REAL ID. You must either renew the passport first or rely on alternative acceptable documents, such as a certified birth certificate alongside a state-issued ID and proof of Social Security."
  },
  {
    q: "Why do certain passports face more scrutiny during international travel?",
    a: "Passports from countries with political instability, known terrorism links, or high rates of visa overstays trigger enhanced security screening. Immigration officers scrutinize these passports heavily to ensure the traveler's stated intent matches their actual plans."
  },
  {
    q: "How can I replace a damaged passport for US visa purposes?",
    a: "You must apply for a replacement passport through your government's consulate or passport office. Provide the damaged passport, a sworn statement explaining how it was damaged, new photos, and the required fees. Treat it similarly to an initial application."
  },
  {
    q: "What are the consequences of cutting or altering my passport?",
    a: "Intentionally altering, cutting, or mutilating a passport renders it instantly invalid for travel. It is a federal offense to alter a US passport, and doing so will result in confiscation at the border and strict questioning regarding fraudulent intent."
  },
  {
    q: "Why won't immigration accept a damaged passport?",
    a: "A damaged passport—especially one with a compromised biometric chip, torn vital data page, or extensive water damage—cannot be electronically verified by border control systems. Authorities cannot trust its authenticity, as damage is often a sign of tampering or forgery."
  },
  {
    q: "How to handle passport records checks that cause delays?",
    a: "Delays during passport record checks usually stem from identical names on watchlists or unresolved child support arrears. You cannot expedite this; you must wait for the agency to resolve the flag or clear your arrearages with your state agency."
  },
  {
    q: "What documents are needed if birth certificate isn't enough due to name mismatch?",
    a: "If your current name differs from your birth certificate, you must submit original or certified copies of the legal documents linking the names. This typically includes marriage certificates, divorce decrees, or a court-ordered name change document."
  },
  {
    q: "Why does passport nationality affect treatment at checkpoints?",
    a: "Immigration checkpoints operate under risk-based security models based on geopolitical relationships and statistical data. Citizens of Visa Waiver Program (VWP) countries generally face quicker, standard screening, while others undergo secondary inspections to verify the legitimacy of their visas."
  },
  {
    q: "How to verify if a delivered passport is valid for US entry?",
    a: "Ensure the biometric chip icon is present on the cover, the data page is fully legible without smudges, there are no rips or water damage, and it has at least six months of validity remaining beyond your intended US departure date."
  },
  {
    q: "What stamp of shame do you get for a damaged passport?",
    a: "While there is no literal \"stamp of shame,\" traveling with a damaged passport often results in being pulled into secondary inspection—a highly stressful, time-consuming process where officers thoroughly interrogate you and examine the document for fraud before deciding whether to admit you."
  },
  {
    q: "Why might a passport be soiled and cause association issues?",
    a: "A passport soiled with suspicious substances (like powder or chemical stains) or bearing stamps from heavily sanctioned countries (like Iran or North Korea) will immediately trigger suspicion, secondary inspection, and intense questioning regarding your associations and activities abroad."
  },
  {
    q: "How does an expired passport impact green card or visa applications?",
    a: "You cannot be issued a US visa in an expired passport. However, if you already have a valid US visa in an expired passport, you can travel to the US by presenting both the expired passport (containing the valid visa) and your new, valid passport."
  },
  {
    q: "What to do if USPS loses and then delivers an invalid passport?",
    a: "If you reported a lost passport that is later delivered by USPS, do not use it for international travel; it will be seized at the border. You must apply for a new passport using Form DS-11 and report the recovered invalid passport."
  },
  {
    q: "Why are some IDs not sufficient without a current passport?",
    a: "Standard driver's licenses only prove driving privileges and identity, not citizenship or immigration status. Only a passport, a certified birth certificate, or a specialized enhanced ID (in certain border states) provides the necessary proof of citizenship required for international travel."
  },
  {
    q: "How can I avoid guilt by association with a problematic passport?",
    a: "If your dual citizenship or past travel history ties you to sanctioned nations, be prepared with copious documentation explaining your brief, legitimate reasons for travel (e.g., family visits, specific business). Transparency during the visa interview is crucial."
  },
  {
    q: "What costs are involved in rushing a passport for immigration?",
    a: "Expediting a US passport via the State Department costs an additional $60 fee, plus standard application fees and optional 1-2 day delivery fees. Using private third-party expeditors for emergency travel can add hundreds of dollars on top of government fees."
  },
  {
    q: "Why do some states' enhanced IDs still require passport proof?",
    a: "Enhanced Driver's Licenses (EDLs) allow land/sea border crossings to Canada/Mexico without a passport book. However, because they denote US citizenship, states strictly require you to present your US passport or birth certificate during the EDL application process to verify that citizenship."
  },
  {
    q: "How does passport scrutiny change after getting US citizenship?",
    a: "Once you naturalize and obtain a US passport, you are guaranteed entry to the United States. You bypass the long non-citizen immigration lines, cannot be deported, and your passport faces significantly less scrutiny from US CBP compared to foreign passports."
  },
  {
    q: "What to do if marriage license is needed for passport name issues?",
    a: "If your passport application requires a name change due to marriage, submit a certified copy of your marriage certificate alongside Form DS-82 (if the passport is less than a year old) or Form DS-11. The certificate will be returned to you."
  },
  {
    q: "Why is preferential treatment given to US passports over others?",
    a: "US passports receive preferential treatment domestically because they are the ultimate proof of both identity and right of entry. Internationally, they are powerful due to the US's vast network of reciprocal visa-free travel agreements and strong global economic standing."
  },
  {
    q: "How to report passport delivery problems to avoid immigration issues?",
    a: "If your passport hasn't arrived within the expected window timeframe, contact the National Passport Information Center immediately. If marked delivered but missing, file a claim with USPS and submit Form DS-86 (Statement of Non-Receipt) within 90 days to avoid paying again."
  },
  {
    q: "What are common passport-related barriers in US visa processes?",
    a: "The most common passport barriers are having less than six months of validity remaining, lacking blank visa pages for the stamp, submitting a damaged document, or having a passport from a country facing temporary visa issuance suspensions or travel bans."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export default function PassportFAQ() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Common questions and issues people face with US Passports.</p>
        </div>

        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <Image 
            src="/us-passport-new.png" 
            alt="Close up of a new blue US Passport." 
            width={1024} 
            height={512}
            className="w-full h-auto object-cover max-h-[400px]"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl group transition-all duration-200 open:bg-white open:shadow-md">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                <span className="text-base font-semibold text-slate-900 pr-4 leading-tight">{faq.q}</span>
                <span className="shrink-0 bg-blue-100 text-blue-600 rounded-full p-1 group-open:bg-blue-600 group-open:text-white transition-colors">
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
