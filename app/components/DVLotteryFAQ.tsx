import React from 'react';
import Image from 'next/image';

const faqs = [
  {
    q: "What happens if my DV lottery visa expires due to processing delays?",
    a: "DV Lottery visas strictly expire on September 30th of the fiscal year. If processing delays push you past this deadline, your visa cannot be issued, and you lose your chance entirely. You must aggressively monitor your case and communicate with the embassy."
  },
  {
    q: "Why do DV lottery winners face issues traveling to the US before deadlines?",
    a: "Winners must enter the US before their immigrant visa expires (usually 6 months from the medical exam). Financial constraints, selling property, tying up loose ends in their home country, or unexpected health issues often cause stressful race-against-the-clock scenarios before the entry deadline."
  },
  {
    q: "How can technical issues with the application affect DV lottery processing?",
    a: "Technical issues like entering the wrong DS-260 confirmation number, poor photo uploads causing rejection, or missing email notifications regarding interview schedules can severely delay processing. Given the strict fiscal year deadline, any delay can cost you the visa."
  },
  {
    q: "What to do if I'm selected in the DV lottery but can't get an interview slot?",
    a: "If interview slots are unavailable at your designated embassy, immediately contact the Kentucky Consular Center (KCC) and your local embassy to request an expedited appointment. Frequently check the scheduling portal, as cancellations do occur, but recognize the process is highly competitive."
  },
  {
    q: "Why are some DV visas not issued even after winning the lottery?",
    a: "Winning only means you are eligible to apply. Visas are not issued if you fail the background check, have a disqualifying medical condition, lack necessary educational or work experience, or if the global cap of 55,000 visas is reached before your interview."
  },
  {
    q: "How does the September 30 deadline impact DV lottery winners?",
    a: "September 30 marks the absolute end of the US fiscal year. By law, no DV visas can be issued after midnight on this date, regardless of embassy delays or the applicant's fault. Any unissued visas are permanently forfeited."
  },
  {
    q: "What steps to take if VFS reports errors in DV visa applications?",
    a: "If VFS Global (or a similar contractor) reports an error in your document submission, correct the mistake immediately. Double-check all translations, ensure police certificates are valid, and re-upload precisely as instructed. Time is critical; do not delay rectifying administrative errors."
  },
  {
    q: "Why might I be forced into another lottery if my visa expires?",
    a: "Because the DV program resets annually, there is no waitlist or carryover. If your visa is not issued by September 30th due to background checks or backlog, you are legally considered to have never won and must re-enter the following year's lottery."
  },
  {
    q: "How to handle slot selling instances in DV visa centers?",
    a: "If you suspect third parties are illegally selling interview slots (which are supposed to be free), report it immediately to the local US embassy's fraud prevention unit or the State Department. Never pay a third party for an interview slot."
  },
  {
    q: "What contact details are needed to resolve DV application concerns?",
    a: "Always have your correct Case Number, principal applicant's name and date of birth, and the email address used on your DS-260. You will need these details when contacting the Kentucky Consular Center (KCC) at kccdv@state.gov or communicating with your local embassy."
  },
  {
    q: "Why do DV winners send emails to push for attention on delays?",
    a: "Winners send repeated emails because the September 30 deadline is unforgiving. If an embassy is moving slowly on background checks or scheduling, proactive and polite communication is one of the few ways applicants can try to ensure their case isn't forgotten."
  },
  {
    q: "How can I provide evidence of issues in DV visa processing?",
    a: "Keep meticulous records: takes screenshots of error messages on the CEAC portal, save all email correspondence with KCC and the embassy, and document phone calls. This paper trail is vital if you need to prove administrative errors delayed your case."
  },
  {
    q: "What are the challenges for families after winning the DV lottery?",
    a: "Families face immense logistical challenges, including raising funds for multiple visa fees, medical exams, and plane tickets. Additionally, deciding whether the principal applicant travels first to secure housing and a job while the rest follow can be emotionally taxing."
  },
  {
    q: "Why is the DV visa process described as awful for some?",
    a: "The process can be \"awful\" because winning does not guarantee a visa. The prolonged anxiety of waiting for an interview date, the heavy financial burden of medical exams and fees, and the devastating reality that you can lose everything on September 30th make it incredibly stressful."
  },
  {
    q: "How to reschedule DV interviews affected by technical problems?",
    a: "If an embassy outage cancels your interview, wait for official instructions via email. You usually need to log into your scheduling account to select a new date. Contact the embassy directly if the portal remains unresponsive as the deadline nears."
  },
  {
    q: "What screenshots are useful for reporting DV application errors?",
    a: "Take clear screenshots showing the specific URL, the exact error code or message, the date and time on your computer screen, and your case number (if visible). These help IT support and the embassy identify and resolve your specific CEAC portal issue."
  },
  {
    q: "Why do some DV winners remain in limbo near expiration dates?",
    a: "Winners often hit \"limbo\" if their case enters administrative processing (Section 221(g)) for extended background checks. The embassy cannot issue the visa until clearance is received from Washington D.C., and if clearance doesn't arrive by September 30, the visa is lost."
  },
  {
    q: "How does location affect DV visa application centers?",
    a: "Your location dictates your assigned embassy. Some embassies process cases highly efficiently, while others suffer from severe understaffing or massive backlogs. If your assigned embassy is backlogged, your chances of getting an interview before the fiscal deadline decrease significantly."
  },
  {
    q: "What to do if the DV system outage delays my case?",
    a: "Document the outage with screenshots and timestamps. Contact the KCC and your local embassy to notify them of the delay. If the outage persists near the September 30th deadline, seek legal counsel to explore emergency injunctions, though these are extremely rare."
  },
  {
    q: "Why might DV visas be hard to get after starting careers abroad?",
    a: "Starting a career abroad can complicate the process if it requires obtaining multiple police certificates from different countries. Delays in receiving these foreign background checks frequently push applicants dangerously close to the September 30th fiscal year cut-off."
  },
  {
    q: "How can I appeal DV visa delays before the deadline?",
    a: "There is no formal appeal for delays. You can only persistently follow up with the KCC and the embassy, seek assistance from a US congressional representative (if you have US ties), or, as a last resort, join ongoing class-action lawsuits forcing adjudication."
  },
  {
    q: "What are common DV lottery winner stories of frustration?",
    a: "Common frustrations include \"winning\" but having a high case number that never becomes current, failing the medical exam due to an unexpected diagnosis, or gathering all required documents only to have the embassy run out of allocated visas before their interview."
  },
  {
    q: "Why do VFS require full details for DV issue resolution?",
    a: "Contractors like VFS handle thousands of cases securely. Strict privacy laws require them to verify your identity comprehensively—usually needing your name, DoB, passport number, and case number—before they can access your file to resolve document or scheduling issues."
  },
  {
    q: "How does the lottery system work for expiring visas?",
    a: "The US government deliberately selects more winners (around 100,000) than available visas (55,000) because many won't qualify. Visas are issued strictly on a first-come, first-served basis based on case numbers. Once 55,000 are issued, or September 30 hits, the remaining \"winners\" get nothing."
  },
  {
    q: "What impacts do communities have on DV lottery experiences?",
    a: "Online forums and expat communities are crucial lifelines. They provide real-time updates on embassy processing speeds, share tips on securing medical appointments, offer emotional support during the stressful wait, and help winners identify and avoid common application scams."
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

export default function DVLotteryFAQ() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Common questions and issues people face with the DV Lottery application process.</p>
        </div>

        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <Image 
            src="/dv-lottery-success.png" 
            alt="Person ecstatic upon seeing their DV Lottery selection results." 
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
