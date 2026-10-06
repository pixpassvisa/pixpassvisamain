import { homeFaqs } from "@/lib/home-content";
import "../home.css";
export default function HomeFAQ() {
  return <section className="studio-wrap studio-section studio-faq" id="home-faq" aria-labelledby="home-faq-title"><div><p className="studio-eyebrow">GOOD QUESTIONS</p><h2 id="home-faq-title">Passport photo questions,<br />answered.</h2><p className="studio-muted">A few things worth knowing<br />before you start.</p></div><div>{homeFaqs.map(({ q, a }) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>;
}
