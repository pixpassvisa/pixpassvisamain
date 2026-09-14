"use client";

import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

export default function HomeFaqList({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((f, i) => (
        <div
          key={i}
          className={`hc-faq ${openFaq === i ? "hc-faq-open" : ""}`}
        >
          <button
            className="hc-faq-btn"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            aria-expanded={openFaq === i}
          >
            <span className="hc-faq-q">{f.q}</span>
            <span className={`hc-faq-icon ${openFaq === i ? "hc-faq-open" : ""}`}>
              +
            </span>
          </button>
          <div
            className="hc-faq-body"
            style={{ maxHeight: openFaq === i ? "300px" : "0px" }}
          >
            <p className="hc-faq-txt">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
