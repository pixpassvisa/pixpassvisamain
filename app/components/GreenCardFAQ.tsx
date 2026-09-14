import React from 'react';
import Image from 'next/image';

const faqs = [
  {
    q: "Why might my green card application be blocked if an American applies for the job?",
    a: "Under the PERM labor certification process, employers must prove they cannot find a qualified, willing, and available US worker for the position. If an American citizen or permanent resident applies and meets the minimum requirements, the employer cannot proceed with sponsoring a foreign worker."
  },
  {
    q: "How does criminal history affect the approval of a green card?",
    a: "A criminal history can lead to green card denial, especially for crimes involving moral turpitude (CIMT) or aggravated felonies. Even minor offenses or dismissed charges must be disclosed and can trigger extensive scrutiny, potentially requiring specialized waivers depending on the conviction."
  },
  {
    q: "What happens if there are blanks on my medical report for the green card?",
    a: "Any blanks or incomplete sections on the Form I-693 medical report will likely cause USCIS to issue a Request for Evidence (RFE), significantly delaying your application. You must ensure the civil surgeon accurately completes, signs, and seals every section before submission."
  },
  {
    q: "Why do background checks sometimes delay green card interviews?",
    a: "USCIS conducts comprehensive background checks involving the FBI and other agencies to verify your identity, criminal record, and immigration history. Name matches, complex travel histories, or security clearances can cause these checks to pend indefinitely, delaying your interview scheduling."
  },
  {
    q: "How can unauthorized work impact my green card eligibility?",
    a: "Unauthorized employment is a serious violation that generally bars adjustment of status. However, certain exemptions exist, such as Section 245(k) for employment-based applicants (foraging less than 180 days out of status) or marriage to a US citizen, which pardons unauthorized work."
  },
  {
    q: "What to do if my green card is rescinded after time abroad?",
    a: "If your green card is challenged upon reentry due to extended absences (over a year), do not sign Form I-407 to voluntarily surrender it. Instead, request a hearing before an immigration judge where you can argue that your absence was strictly temporary."
  },
  {
    q: "Why are green card applications denied due to fraud or ineligibility?",
    a: "USCIS denies applications for fraud if they discover you lied, used fake documents, or entered a fraudulent marriage to gain immigration benefits. Material misrepresentation carries a lifetime ban from the US. Ineligibility occurs when you simply do not meet the legal criteria for the specific visa category."
  },
  {
    q: "How long can the green card process take for professionals?",
    a: "The employment-based green card process can take anywhere from 2 to over 15 years, depending heavily on your country of birth (due to per-country caps) and your preference category (EB-1, EB-2, EB-3). The prevailing wage and PERM stages alone add over a year."
  },
  {
    q: "What documents are essential for a successful green card petition?",
    a: "Essential documents include a valid passport, birth certificate, marriage certificate (if applicable), proof of lawful entry (I-94), medical exam (I-693), and category-specific evidence like an approved I-140 petion for employment, or proof of a bona fide marriage for family-based applications."
  },
  {
    q: "Why might an employer refuse to file PERM due to too many US applicants?",
    a: "Filing a PERM certification requires a good faith recruitment effort. If an employer anticipates or receives a high volume of qualified US applicants for the role, the U.S. Department of Labor will deny the certification, rendering the costly and time-consuming PERM process futile."
  },
  {
    q: "How does lying on immigration forms affect green card status?",
    a: "Lying or misrepresenting facts on immigration forms is considered fraud. If discovered, even years later, it can lead to immediate green card revocation, deportation proceedings, and a permanent bar on returning to the United States."
  },
  {
    q: "What steps are involved in applying for a green card without a lawyer?",
    a: "Applying without a lawyer involves determining your eligibility category, carefully completing the correct forms (e.g., I-485, I-130, I-140), gathering required supporting evidence, paying the exact filing fees, attending a biometrics appointment, and preparing thoroughly for the final USCIS interview."
  },
  {
    q: "Why do some green cards get denied for missing interviews?",
    a: "Missing your scheduled green card interview without prior notification or a valid emergency reason results in immediate denial for 'abandonment' of your application. Always attend; if you absolutely must reschedule, do so properly through USCIS well in advance."
  },
  {
    q: "How can insufficient financial support lead to green card denial?",
    a: "Family-sponsored applicants must have a sponsor who submits an Affidavit of Support (I-864) proving income above 125% of the poverty guidelines. If the sponsor's income is insufficient and no qualified joint sponsor is provided, the application will be denied under the public charge rule."
  },
  {
    q: "What health issues might cause problems in green card applications?",
    a: "Health issues categorized as Class A conditions can lead to denial. These include communicable diseases of public health significance (like untreated tuberculosis or syphilis), failure to provide required vaccinations, and physical or mental disorders associated with harmful behavior."
  },
  {
    q: "Why are prior immigration violations a barrier to green cards?",
    a: "Prior violations, such as overstaying a visa by more than 180 days or entering the US illegally, trigger 3-year, 10-year, or permanent reentry bars. These statutory bars prevent you from adjusting status to a green card unless you qualify for and obtain a specific waiver."
  },
  {
    q: "How to handle recruitment phases where Americans apply and block the process?",
    a: "If qualified Americans apply during the PERM recruitment phase, the employer cannot proceed with your case for that specific role. The employer must pause the process and try again later, or place you in a different role with higher, more specialized requirements."
  },
  {
    q: "What to do if my green card is dropped after the job ad phase?",
    a: "If your PERM fails during recruitment, work with your employer to evaluate the reasons. You may need to restart the process with a revised job description that accurately reflects higher necessary qualifications, or explore alternative visa pathways like an O-1 or NIW."
  },
  {
    q: "Why do mass PERM filings get paused in shifting labor markets?",
    a: "During economic downturns or mass layoffs, the Department of Labor heavily scrutinizes or halts PERM approvals for specific occupations. Employers cannot sponsor foreign workers if they have recently laid off US workers in the same or closely related occupations."
  },
  {
    q: "How can I prove strong ties for a green card application?",
    a: "Unlike nonimmigrant visas, green card applications inherently demonstrate immigrant intent, so proving 'ties' isn't required in the same way. Instead, you must prove the legitimacy of your relationship with your sponsor, whether it's a genuine marriage or a bona fide employment offer."
  },
  {
    q: "What are the risks of incomplete forms in green card submissions?",
    a: "Submitting incomplete forms, missing signatures, or failing to include mandatory initial evidence will result in immediate rejection or a Request for Evidence (RFE), causing significant delays in processing times and potentially risking your underlying legal status."
  },
  {
    q: "Why might a green card be revoked if violations are discovered later?",
    a: "Green cards can be revoked if USCIS uncovers fraud during the initial application, if you commit serious crimes making you deportable, or if you abandon your US residency by living abroad permanently. Approvals are never strictly final if obtained unlawfully."
  },
  {
    q: "How does absence from the US affect existing green card status?",
    a: "Continuous absences over 6 months raise questions about your intent to reside in the US. Absences over 1 year generally break the continuity of residence for citizenship and act as an abandonment of your green card, requiring a Re-entry Permit or SB-1 visa to return."
  },
  {
    q: "What professional routes exist for green cards besides school?",
    a: "Beyond student-to-worker paths, professional routes include employer sponsorship (PERM), National Interest Waivers (NIW) for individuals whose work benefits the US, EB-1 classifications for those with extraordinary ability or multinational managers, and the immigrant investor program (EB-5)."
  },
  {
    q: "Why is the green card journey described as not easy?",
    a: "The green card journey is complex due to convoluted immigration laws, multi-year backlogs for certain countries, strict documentary requirements, the reliance on continuous employer sponsorship through shifting economic conditions, and high filing fees, creating a stressful and uncertain experience."
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

export default function GreenCardFAQ() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Common questions and issues people face with US Green Card applications.</p>
        </div>

        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <Image 
            src="/green-card-success.png" 
            alt="Professional proudly displaying newly approved US Green Card." 
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
