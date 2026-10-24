import Link from 'next/link';
import type { CountryPhotoGuide } from '@/lib/priority-country-guides';
import { COUNTRY_GUIDE_DATE, COUNTRY_DEMO_IMAGE, priorityCountryGuides } from '@/lib/priority-country-guides';
import CountryPhotoComparison from './CountryPhotoComparison';
import PriceDisplay from './PriceDisplay';
import CountryServiceOptions from './CountryServiceOptions';
import styles from './PriorityCountryGuide.module.css';

export default function PriorityCountryGuide({guide,slug}:{guide:CountryPhotoGuide;slug:string}) {
  const url=`https://www.pixpassvisa.com/${slug}`;
  const headTop = guide.code === 'US' ? 75 : guide.code === 'UK' ? 65 : 60;
  const headBottom = guide.code === 'US' ? 245 : guide.code === 'UK' ? 255 : 264;
  const schema={'@context':'https://schema.org','@graph':[
    {'@type':'Article',headline:guide.heading,description:guide.description,dateModified:COUNTRY_GUIDE_DATE,inLanguage:'en',mainEntityOfPage:url,image:`https://www.pixpassvisa.com${COUNTRY_DEMO_IMAGE}`,author:{'@type':'Organization',name:'PixPassVisa editorial team',url:'https://www.pixpassvisa.com/editorial-methodology'},publisher:{'@id':'https://www.pixpassvisa.com/#organization'},citation:guide.sources.map(s=>s.url)},
    {'@type':'FAQPage',mainEntity:guide.faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.pixpassvisa.com/'},{'@type':'ListItem',position:2,name:'Passport photo guides',item:'https://www.pixpassvisa.com/passport-photos'},{'@type':'ListItem',position:3,name:guide.country,item:url}]},
  ]};
  return <article className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
    <div className={styles.shell}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/passport-photos">Passport photos</Link><span>/</span><span>{guide.country}</span></nav>
      <header className={styles.hero}>
        <div><p className={styles.eyebrow}>{guide.code} / PASSPORT PHOTO FIELD GUIDE</p><h1>{guide.heading}</h1><p className={styles.intro}>{guide.intro}</p>
          <div className={styles.actions}><Link href={guide.checker} className={styles.primary}>Check a photo for free ↗</Link><a href="#photo-size">See sizes & alignment ↓</a></div>
          <p className={styles.reviewed}>Reviewed <time dateTime={COUNTRY_GUIDE_DATE}>17 October 2026</time> · <Link href="/editorial-methodology">Editorial methodology</Link></p>
          {guide.local && <Link className={styles.local} href={guide.local.href}>{guide.local.label} ↗</Link>}
        </div>
        <CountryPhotoComparison />
      </header>
      {(guide.code === 'US' || guide.code === 'UK') && <CountryServiceOptions country={guide.code} />}
      {guide.code === 'US' && <p className="my-6 text-sm leading-7">Applying for a visa instead of a passport? <Link className="font-semibold underline" href="/us-visa-photo-editor">Read the US visa photo guide for DS-160 JPEG dimensions and file limits</Link>.</p>}
      <section className={styles.answer} aria-labelledby="quick-answer"><p className={styles.eyebrow}>THE SHORT ANSWER</p><h2 id="quick-answer">What does a {guide.country} passport photo need?</h2><p>{guide.answer}</p><a href={guide.sources[0].url}>Read the official requirements ↗</a></section>
      <dl className={styles.facts}>{guide.facts.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <section id="photo-size" className={styles.dimensions}>
        <div><p className={styles.eyebrow}>FRAME / FACE / APPLICATION</p><h2>Size and alignment, explained.</h2><p>{guide.routeNote}</p><dl className={styles.specList}><div><dt>Width</dt><dd>{guide.width}</dd></div><div><dt>Height</dt><dd>{guide.height}</dd></div><div><dt>Head / face height</dt><dd>{guide.head}</dd></div><div><dt>Background</dt><dd>{guide.background}</dd></div></dl><p className={styles.small}>The diagram shows proportions and what to measure. It does not measure the generated portrait, certify compliance or define a universal pixel size.</p></div>
        <figure className={styles.diagram}><svg viewBox="0 0 400 420" role="img" aria-label={`${guide.country} photo size schematic: ${guide.width} wide, ${guide.height} high. Head or face height ${guide.head}.`}>
          <rect x={guide.ratio===1?55:85} y="45" width={guide.ratio===1?270:210} height="270" rx="4" fill="#f4f6ef" stroke="#254b3b" strokeWidth="2" />
          <path d="M200 50V310" stroke="#7b9988" strokeDasharray="5 5" />
          <ellipse cx="200" cy={(headTop+headBottom)/2} rx="55" ry={(headBottom-headTop)/2} fill="#d2dfc8" stroke="#52765b" strokeWidth="2" />
          <path d="M130 295 Q130 255 175 250 L175 233 M270 295 Q270 255 225 250 L225 233" fill="none" stroke="#52765b" strokeWidth="2" />
          <path d={`M150 150H250 M145 ${headTop}H280 M145 ${headBottom}H280`} stroke="#52765b" strokeDasharray="4 4" />
          <path d={`M278 ${headTop}H288 M283 ${headTop}V${headBottom} M278 ${headBottom}H288`} fill="none" stroke="#52765b" strokeWidth="2" />
          <path d={`M${guide.ratio===1?55:85} 335H${guide.ratio===1?325:295}`} stroke="#254b3b" strokeWidth="2" />
          <text x="200" y="360" textAnchor="middle" fill="#254b3b" fontSize="17">{guide.width} wide</text>
          <text x="200" y="390" textAnchor="middle" fill="#52765b" fontSize="14">{guide.height} high · face centred</text>
          <text x="200" y="25" textAnchor="middle" fill="#52765b" fontSize="12">SCHEMATIC · NOT A PHOTO MEASUREMENT</text>
        </svg><figcaption>Head/face measurement: {guide.head}. Use the official template for detailed tolerances and exceptions.</figcaption></figure>
      </section>
      <div className={styles.content}><nav aria-label="On this page" className={styles.toc}><p>IN THIS GUIDE</p>{guide.sections.map((s,i)=><a key={s.title} href={`#guide-${i}`}>{s.title}</a>)}<a href="#questions">Common questions</a><a href="#sources">Official sources</a></nav>
        <div>{guide.sections.map((s,i)=><section className={styles.section} id={`guide-${i}`} key={s.title}><span className={styles.sectionNumber}>0{i+1}</span><h2>{s.title}</h2>{s.body.map(p=><p key={p}>{p}</p>)}<a className={styles.sourceLink} href={guide.sources[s.source].url}>{guide.sources[s.source].label} ↗</a></section>)}</div>
      </div>
      <section className={styles.checklist}><div><p className={styles.eyebrow}>BEFORE YOU SUBMIT</p><h2>A final check is worth a retake.</h2></div><ul><li>Confirm the exact document and submission route.</li><li>Keep a recent original with no filters or facial edits.</li><li>Check lighting, background, expression and clear eyes.</li><li>Review the actual print or the portal’s upload rules.</li><li>Use an approved capture provider when required.</li></ul></section>
      <section id="questions" className={styles.faq}><p className={styles.eyebrow}>ANSWERS FOR YOUR NEXT STEP</p><h2>{guide.country} passport photo questions</h2>{guide.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>
      <section className={styles.purchase}><div><p className={styles.eyebrow}>CHECK FIRST. CHOOSE YOUR OUTPUT.</p><h2>Preview before purchasing.</h2><p>Automated checks and previews are free. If your application permits the prepared output, standard downloads cost <PriceDisplay basePrice={4.99} /> and optional expert manual editing costs <PriceDisplay basePrice={6.99} isExpert />. One-time payment; fixed local prices apply.</p><p>We do not provide government photo codes, physical prints or acceptance certification. Keep your original and follow the capture and editing rules above.</p></div><div className={styles.actions}><Link href={guide.checker} className={styles.primary}>Try the free checker ↗</Link><Link href="/passport-photo-online">Explore preparation options</Link><Link href="/refund-policy">Read the refund policy</Link></div></section>
      <section id="sources" className={styles.sources}><h2>Official sources and review</h2><p>Reviewed on 17 October 2026. Requirements can change; follow the authority handling your application. PixPassVisa is an independent service.</p><ul>{guide.sources.map(s=><li key={s.url}><a href={s.url}>{s.label} ↗</a></li>)}</ul></section>
      <nav aria-label="More country photo guides" className={styles.related}><h2>Compare another country</h2><div>{Object.entries(priorityCountryGuides).filter(([key])=>key!==slug).map(([key,g])=><Link key={key} href={`/${key}`}><span>{g.code}</span>{g.country} photo guide ↗</Link>)}<Link href="/passport-photo-country-guide">All priority-country requirements ↗</Link></div></nav>
    </div>
  </article>;
}
