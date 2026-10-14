"use client";

import { useState } from "react";
import { ArrowLeftRight, Check, Sparkles } from "lucide-react";
import styles from "./comparison.module.css";

export default function StudioComparison() {
  const [position, setPosition] = useState(50);
  function move(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100))));
  }
  return <figure className={styles.card}>
    <div className={styles.heading}><span><Sparkles size={14} /> THE PHOTO TRANSFORMATION</span><span className={styles.demo}>DEMO</span></div>
    <h2>Same you.<br /><em>A fresh perspective.</em></h2>
    <p className={styles.intro}>See the difference a prepared photo can make.</p>
    <div className={styles.stage}>
      <div className={styles.photo} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); move(event); }} onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event); }} onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}>
        <img src="/images/after-edit-600.png" alt="Prepared example portrait of the same man against a plain background" draggable={false} width="640" height="640" />
        <div className={styles.original} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src="/images/before-edit-600.png" alt="Original example portrait of the same man in a room" draggable={false} width="640" height="640" /></div>
        {position > 18 && <span className={styles.before}>ORIGINAL</span>}
        {position < 82 && <span className={styles.after}><Check size={12} /> PREPARED</span>}
        <div className={styles.divider} style={{ left: `${position}%` }} aria-hidden="true"><span><ArrowLeftRight size={20} /></span></div>
        <span className={styles.corner} aria-hidden="true" />
      </div>
      <div className={styles.sliderRow}><ArrowLeftRight size={15} /><input type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label="Compare original and prepared example photo" aria-valuetext={`${position}% original photo visible`} aria-describedby="studio-comparison-caption" /><span>DRAG TO REVEAL</span></div>
    </div>
    <div className={styles.controls} aria-label="Comparison view" role="group">{[{label:"Original",value:100},{label:"Compare",value:50},{label:"Result",value:0}].map(view => <button key={view.label} type="button" aria-pressed={position === view.value} onClick={() => setPosition(view.value)}>{view.label}</button>)}</div>
    <div className={styles.features}><span><Check size={14} />Plain background</span><span><Check size={14} />Portrait framing</span></div>
    <figcaption id="studio-comparison-caption">Illustrative before & after of the same person. Results vary; follow your document’s photo and editing rules.</figcaption>
  </figure>;
}
