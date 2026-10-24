import Link from 'next/link';
import PriceDisplay from './PriceDisplay';
import Image from 'next/image';
import type { ReviewedPhotoGuide } from '@/lib/reviewed-photo-guides';
import { PHOTO_GUIDE_REVIEW_DATE } from '@/lib/reviewed-photo-guides';
import styles from './ReviewedPhotoGuide.module.css';

export default function ReviewedPhotoGuidePage({ guide, slug }: { guide: ReviewedPhotoGuide; slug: string }) {
  const reviewedAt = guide.reviewedAt || PHOTO_GUIDE_REVIEW_DATE;
  const reviewLabel = new Date(reviewedAt + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const url = `https://www.pixpassvisa.com/${slug}`;
  const directory = guide.document === 'visa' ? '/visa-photo' : '/passport-photos';
  const schema = { '@context':'https://schema.org', '@graph': [
    {'@type':'Article','@id':`${url}#guide`,headline:guide.heading,description:guide.description,inLanguage:'en',dateModified:reviewedAt,mainEntityOfPage:url,image:`https://www.pixpassvisa.com${guide.image}`,author:{'@type':'Organization',name:'PixPassVisa',url:'https://www.pixpassvisa.com/editorial-methodology'},publisher:{'@type':'Organization',name:'PixPassVisa',url:'https://www.pixpassvisa.com'},citation:guide.sources.map(s=>s.url)},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.pixpassvisa.com'},{'@type':'ListItem',position:2,name:guide.document==='visa'?'Visa photos':'Passport photos',item:`https://www.pixpassvisa.com${directory}`},{'@type':'ListItem',position:3,name:guide.country,item:url}]},
  ]};
  return <article className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} />
    <div className={styles.shell}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href={directory}>{guide.document === 'visa' ? 'Visa photos' : 'Passport photos'}</Link><span>/</span><span>{guide.country}</span></nav>
      <header className={styles.hero}><div><p className={styles.eyebrow}>PIXPassVisa · DOCUMENT PHOTO GUIDE</p><h1>{guide.heading}</h1><p className={styles.intro}>{guide.intro}</p>{guide.primaryAction && <div className="mt-5"><Link className="inline-flex rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white" href={guide.primaryAction.href}>{guide.primaryAction.label} →</Link><p className="mt-3 text-sm text-slate-600">Free preview · Standard download <PriceDisplay basePrice={4.99} /> · One-time payment</p></div>}<p className={styles.reviewed}>Reviewed <time dateTime={reviewedAt}>{reviewLabel}</time> · <Link href="/editorial-methodology">PixPassVisa editorial process</Link></p></div><Image src={guide.image} alt={guide.imageAlt} width={1200} height={630} priority sizes="(max-width: 800px) 92vw, 480px" /></header>
      <dl className={styles.facts}>{guide.facts.map(fact=><div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
      <div className={styles.content}><nav aria-label="On this page" className={styles.toc}><h2>In this guide</h2>{guide.sections.map((s,i)=><a key={s.heading} href={`#section-${i+1}`}>{s.heading}</a>)}<a href="#official-sources">Official sources</a></nav>
        <div>{guide.sections.map((section,i)=><section key={section.heading} id={`section-${i+1}`} className={styles.section}><h2>{section.heading}</h2>{section.paragraphs.map(text=><p key={text}>{text}</p>)}{section.source !== undefined && <p className={styles.source}>Source: <a href={guide.sources[section.source].url}>{guide.sources[section.source].label} ↗</a></p>}</section>)}
          <section id="official-sources" className={styles.sources}><h2>Official sources and scope</h2><ul>{guide.sources.map(source=><li key={source.url}><a href={source.url}>{source.label} ↗</a></li>)}</ul><p>Reviewed against these sources on {reviewLabel}. Recheck the instructions for your application before submitting. PixPassVisa is independent of the issuing authorities; a photo check or paid download does not guarantee acceptance.</p></section>
        </div>
      </div>
      <section className={styles.next}><h2>Your next step</h2><div>{guide.next.map(link=><Link key={link.href} href={link.href}><h3>{link.label} <span aria-hidden="true">↗</span></h3><p>{link.description}</p></Link>)}</div></section>
    </div>
  </article>;
}
