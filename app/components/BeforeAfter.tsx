"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { MoveHorizontal, Ruler, ScanLine } from "lucide-react";

const formats = {
  us: {
    label: "US visa", size: "2 × 2 in", ratio: "1:1", aspect: "1 / 1",
    head: "50–69%", eyes: "56–69%", width: "600 px", height: "600 px",
    headLabel: "of image height", eyeLabel: "from the bottom",
    source: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/photo-composition-template.html",
    sourceLabel: "US visa composition rules", crown: 10, chin: 74, eye: 42, scale: .91,
  },
  uk: {
    label: "UK printed passport", size: "35 × 45 mm", ratio: "7:9", aspect: "7 / 9",
    head: "29–34 mm", eyes: "Printed photo", width: "35 mm", height: "45 mm",
    headLabel: "crown to chin", eyeLabel: "digital rules differ",
    source: "https://www.gov.uk/photos-for-passports/photo-requirements",
    sourceLabel: "UK printed-photo rules", crown: 6, chin: 76, eye: 42, scale: 1,
  },
} as const;

export default function BeforeAfter() {
  const [position, setPosition] = useState(45);
  const [selected, setSelected] = useState<keyof typeof formats>("us");
  const [showGuides, setShowGuides] = useState(true);
  const captionId = useId();
  const format = formats[selected];

  return <figure className="hero-comparison" aria-label="Before and after photo framing example">
    <div className="hero-comparison-top">
      <div><span className="hero-demo-dot" /> BEFORE &amp; AFTER</div>
      <span>YOUR PHOTO, REFRAMED</span>
    </div>
    <div className="hero-format-controls" role="group" aria-label="Example photo format">
      {(Object.keys(formats) as (keyof typeof formats)[]).map(key => <button
        type="button" key={key} aria-pressed={selected === key}
        onClick={() => setSelected(key)}
      >{formats[key].label}<span>{formats[key].size}</span></button>)}
    </div>

    <div className="hero-photo-workspace" data-format={selected}>
      <div className="hero-width-dimension" aria-hidden="true"><span /><b>{format.width}</b><span /></div>
      <div className="hero-comparison-photo" style={{ aspectRatio: format.aspect }}>
        <div className="hero-prepared-layer">
          <Image src="/images/after-edit-600.png" alt="Illustrative prepared portrait on a plain background"
            fill priority sizes="(max-width: 700px) 80vw, (max-width: 1000px) 36vw, 390px"
            style={{ objectFit: "cover", transform: `scale(${format.scale})` }} />
          {showGuides && <>
            <svg className="hero-ratio-guides" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {selected === "us" && <rect className="hero-eye-band" x="0" y="31" width="100" height="13" />}
              <path className="hero-guide-dashed" d={`M 7 ${format.crown} H 94 M 7 ${format.chin} H 94 M 50 4 V 96`} />
              <path className="hero-guide-eyes" d={`M 7 ${format.eye} H 94`} />
              <path className="hero-guide-bracket" d={`M 87 ${format.crown} H 93 M 90 ${format.crown} V ${format.chin} M 87 ${format.chin} H 93`} />
              {selected === "us" && <path className="hero-guide-bracket hero-eye-bracket" d={`M 75 ${format.eye} H 81 M 78 ${format.eye} V 98 M 75 98 H 81`} />}
            </svg>
            <span className="hero-head-callout" style={{ top: `${(format.crown + format.chin) / 2}%` }}>{format.head}<small>HEAD HEIGHT</small></span>
            {selected === "us" && <span className="hero-eye-callout">56–69%<small>EYE HEIGHT ↑</small></span>}
          </>}
        </div>
        <div className="hero-original-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src="/images/before-edit-600.png" alt="Illustrative original portrait with a busy indoor background"
            fill priority sizes="(max-width: 700px) 80vw, (max-width: 1000px) 36vw, 390px" style={{ objectFit: "cover" }} />
        </div>
        {position > 12 && <span className="hero-photo-tag hero-before-tag">BEFORE</span>}
        {position < 88 && <span className="hero-photo-tag hero-after-tag">AFTER</span>}
        <div className="hero-comparison-divider" style={{ left: `${position}%` }} aria-hidden="true">
          <span><MoveHorizontal size={19} strokeWidth={2} /></span>
        </div>
        <input className="hero-comparison-range" type="range" min="0" max="100" value={position}
          onChange={event => setPosition(Number(event.target.value))}
          aria-label="Compare original and prepared photo"
          aria-valuetext={`${position}% original photo visible`}
          aria-describedby={captionId} />
      </div>
      <span className="hero-height-dimension" aria-hidden="true">{format.height}</span>
    </div>

    <div className="hero-comparison-toolbar">
      <span><MoveHorizontal size={14} /> Drag to compare</span>
      <button type="button" aria-pressed={showGuides} onClick={() => setShowGuides(!showGuides)}><ScanLine size={14} /> {showGuides ? "Hide guides" : "Show guides"}</button>
    </div>
    <dl className="hero-ratio-facts" aria-label={`${format.label} reference requirements`}>
      <div><dt><Ruler size={12} /> FORMAT</dt><dd>{format.ratio}<small>{format.size}</small></dd></div>
      <div><dt>HEAD HEIGHT</dt><dd>{format.head}<small>{format.headLabel}</small></dd></div>
      <div><dt>{selected === "us" ? "EYE HEIGHT" : "APPLICATION"}</dt><dd>{format.eyes}<small>{format.eyeLabel}</small></dd></div>
    </dl>
    <figcaption id={captionId} className="hero-comparison-caption">
      Illustrative framing guides, not a measured acceptance result. <a href={format.source} target="_blank" rel="noopener noreferrer">{format.sourceLabel} ↗</a>
    </figcaption>
  </figure>;
}
