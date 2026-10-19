"use client";

import { useId, useState } from 'react';
import { COUNTRY_DEMO_IMAGE } from '@/lib/priority-country-guides';
import styles from './PriorityCountryGuide.module.css';

export default function CountryPhotoComparison() {
  const id = useId();
  const [position, setPosition] = useState(50);
  return <figure className={styles.comparison}>
    <div className={styles.compareFrame} role="img" aria-label="Fictional adult woman: unsuitable indoor portrait compared with a centred retake with more even light and a plain background">
      <div className={styles.photoHalf} style={{backgroundImage:`url(${COUNTRY_DEMO_IMAGE})`,backgroundPosition:'right center'}} />
      <div className={styles.photoHalf} style={{backgroundImage:`url(${COUNTRY_DEMO_IMAGE})`,backgroundPosition:'left center',clipPath:`inset(0 ${100-position}% 0 0)`}} />
      <div className={styles.compareLabels}><span>Before · unsuitable setup</span><span>After · retake example</span></div>
      <div className={styles.divider} style={{left:`${position}%`}} aria-hidden="true"><span>↔</span></div>
    </div>
    <div className={styles.sliderControls}>
      <label htmlFor={id}>Compare the photo setup</label>
      <input id={id} type="range" min="0" max="100" value={position} onChange={e=>setPosition(Number(e.target.value))} aria-valuetext={`${position}% before photo visible`} />
      <div><button type="button" onClick={()=>setPosition(100)}>Show before</button><button type="button" onClick={()=>setPosition(0)}>Show retake</button></div>
    </div>
    <figcaption>AI-generated fictional adult, for illustration only. This represents a new capture, not a customer transformation or an accepted passport photo. Do not submit generated images.</figcaption>
  </figure>;
}
