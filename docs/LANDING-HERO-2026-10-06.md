# Landing hero update — 2026-10-06

The homepage now puts a draggable before/after illustration in the first hero, alongside the upload and free-checker actions. It replaces the decorative portrait and removes the duplicate comparison below the hero.

## Framing references

- US visa: square 1:1 frame, 2 × 2 inches, illustrative 600 × 600 pixel output; head height 50–69% of image height and eye height 56–69% measured from the bottom. The displayed 600-pixel preset is an example within the official digital size range, not a claim that other allowed sizes are invalid.
- UK printed passport: 7:9 frame, 35 × 45 mm, head height 29–34 mm crown to chin. Printed and digital requirements are distinguished.
- These are published reference ranges over an illustrative existing sample, not detected facial landmarks or a live acceptance result. Guide visibility can be toggled.

Official references:
https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/photo-composition-template.html
https://www.gov.uk/photos-for-passports/photo-requirements

## Scope and verification

Changed HomeHero.tsx, BeforeAfter.tsx, HomeSections.tsx and home.css only. Prior landing source is preserved in review/landing-hero-2026-10-06. Existing upload, payment, pricing and processing implementation is unchanged.

Seven SEO tests and focused component ESLint passed. The production build passed, including TypeScript and 258 generated pages. Browser verification covers desktop and mobile overflow, square and portrait aspect ratios, slider keyboard endpoints, and guide toggling. Local preview uses port 3001; no deployment performed.
