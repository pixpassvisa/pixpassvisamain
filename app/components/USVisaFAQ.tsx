import React from 'react';
import Image from 'next/image';

const faqs = [
  {
    q: "What should I do if a system outage delays my US visa application process?",
    a: "If a system outage delays your US visa application, remain patient and monitor official embassy updates. Do not submit multiple applications to avoid confusion. Contact support through available channels only when the system is confirmed to be fully restored."
  },
  {
    q: "Why do some US visa interviews get rescheduled due to technical problems?",
    a: "US embassy systems occasionally experience unexpected outages affecting their appointment processing capabilities. When this happens, interviews are automatically rescheduled to ensure all applicants receive fair review processes without risking data loss or incomplete biometric processing during the downtime."
  },
  {
    q: "How can I prepare for a US embassy interview if I'm applying from another country?",
    a: "Prepare for your US embassy interview abroad by reviewing your DS-160 application thoroughly. Gather all required documents, practice common questions about your travel intent, ensure strong demonstrable ties to your home country, and dress appropriately for a professional setting."
  },
  {
    q: "What happens if my US visa is denied without the officer checking any documents?",
    a: "Visa officers primarily base decisions on your DS-160 form and verbal responses rather than physical documents. If denied without document review, the officer likely determined you lacked sufficient ties or eligibility based on your application and interview answers alone."
  },
  {
    q: "Why are US visas often denied even with strong family ties back home?",
    a: "Even with strong family ties, US visas can be denied if officers suspect immigrant intent based on financial stability, employment history, previous travel patterns, or discrepancies during the interview. You must convincingly demonstrate compelling reasons to return home."
  },
  {
    q: "How does not having a job affect my chances during a US student visa interview?",
    a: "Lacking a job does not usually harm US student visa chances, as students aren't expected to be employed. Instead, officers focus on your academic intent, university selection, and evidence of sufficient financial sponsorship to cover tuition and living expenses."
  },
  {
    q: "What are the impacts of long wait times for US visa appointment slots?",
    a: "Long wait times for US visa appointments can force applicants to alter travel plans, miss crucial business meetings, or defer academic semesters. You should book appointments well in advance and monitor the portal for earlier slots from cancellations."
  },
  {
    q: "How can I handle technical errors when filling out the US visa application form?",
    a: "To handle technical errors on the DS-160, save your application progress frequently using your Application ID. Clear your browser cache, use a stable internet connection, and try different browsers if issues persist. Avoid submitting until all data is verified."
  },
  {
    q: "What are common ineligibilities that lead to US visa refusals, like incomplete forms?",
    a: "Common ineligibilities for US visa refusals include missing required documents, failing to prove strong ties to your home country (214b), providing false information, having prior immigration violations, or lacking sufficient funds to support your intended stay in the US."
  },
  {
    q: "Why do some people get denied US visas despite providing all required documents?",
    a: "US visa approvals rely more on the applicant's intent and overall credibility than just documentation. If an officer believes you have immigrant intent, lack sufficient home country ties, or provide suspicious interview answers, they will deny the visa regardless."
  },
  {
    q: "How does a weak passport from my country influence US visa approval rates?",
    a: "US visa applicants from countries with higher visa overstay rates face stricter scrutiny. Officers apply a presumption of immigrant intent more heavily, meaning you will need exceptionally strong proof of employment, properties, and family ties to secure an approval."
  },
  {
    q: "What steps can I take if my US visa is rejected for a family visit?",
    a: "If rejected for a family visit, do not reapply immediately unless your circumstances have changed significantly. Review your refusal notice, strengthen evidence of your home ties (like a secure job or property), and address the previous concerns in your next application."
  },
  {
    q: "Why might a US visa be denied if I'm invited by family members living there?",
    a: "Invitations from family in the US can sometimes weigh against you, as officers might believe you have stronger reasons to stay in the US than to return home. You must prove your independent ties to your home country are stronger."
  },
  {
    q: "How can I appeal a US visa denial that seems unfair?",
    a: "There is no formal appeal process for most nonimmigrant US visa denials (Section 214(b)). Your only option is to reapply, pay the fee again, and present new, compelling evidence that effectively overcomes the initial reasons for your visa refusal."
  },
  {
    q: "What financial proof is needed to avoid US visa denial for lack of funds?",
    a: "To avoid denial for lack of funds, provide original bank statements from the past three to six months, tax returns, employment letters stating your salary, or an affidavit of support (I-134) if a sponsor is covering your travel expenses."
  },
  {
    q: "Why do some couples get split decisions on US visa approvals?",
    a: "Couples may receive split decisions if one partner has stronger individual ties, different travel histories, or specific application red flags. Consular officers evaluate each applicant independently, so one spouse might qualify while the other fails to overcome immigrant intent."
  },
  {
    q: "How does previous travel history impact US visa applications?",
    a: "A strong travel history to developed countries (like the UK, Schengen area, or Canada) demonstrates compliance with immigration laws, significantly boosting your US visa chances. A blank passport or prior overstays often lead to higher scrutiny and potential denials."
  },
  {
    q: "What to do if the US embassy doesn't review my supporting papers?",
    a: "Officers are trained to evaluate the DS-160 and interview responses quickly; documents are secondary. If they don't ask for papers, do not force them. Focus on answering their questions clearly, concisely, and confidently to prove your eligibility verbally."
  },
  {
    q: "Why are US visas harder to get for certain nationalities?",
    a: "US visa difficulty varies by nationality due to statistical overstay rates, economic conditions, and bilateral relations. Countries with high rates of citizens overstaying US visas trigger stricter adjudication standards, requiring applicants to provide overwhelming proof of home country ties."
  },
  {
    q: "How can I reschedule a US visa interview affected by outages?",
    a: "If affected by an outage, wait for an official email notification from the embassy with rescheduling instructions. Log back into your applicant portal once the system is restored to select a new appointment date without paying the fee again."
  },
  {
    q: "What questions are typically asked in a US visa interview?",
    a: "Typical US visa interview questions include inquiries about your purpose of travel, duration of stay, who is funding the trip, your current employment, family members in the US, your travel history, and what strong ties will ensure your return home."
  },
  {
    q: "Why might a student visa be denied even after university acceptance?",
    a: "A student visa can be denied despite university acceptance if the officer suspects you lack the genuine intent to study, cannot prove sufficient funding for your entire program, or if they believe you plan to remain in the US permanently."
  },
  {
    q: "How does sponsorship from an organization affect US visa chances?",
    a: "Sponsorship from a reputable organization significantly improves your US visa chances by providing credible financial backing and a clear, legitimate purpose for travel. Ensure you have detailed letters from the organization explaining their support and your role in the visit."
  },
  {
    q: "What are the risks of applying for a US visa without complete eligibility?",
    a: "Applying without complete eligibility risks a permanent record of refusal, making future applications much harder. Misrepresenting facts can lead to a lifetime ban for fraud. Always wait until your circumstances clearly meet the visa requirements before applying."
  },
  {
    q: "How can I avoid common pitfalls in the US visa application process?",
    a: "Avoid common pitfalls by truthfully completing the DS-160, bringing all required documents, dressing professionally, arriving on time, and answering interview questions directly and honestly. Never provide unsolicited documents or fake information, and always demonstrate strong home country ties."
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

export default function USVisaFAQ() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Common questions and issues people face with US Visa applications.</p>
        </div>

        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <Image 
            src="/us-visa-success.png" 
            alt="Family celebrating successful US Visa application outside embassy" 
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
