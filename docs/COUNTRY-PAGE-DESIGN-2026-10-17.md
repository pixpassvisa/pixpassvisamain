# Four country-page improvements

Updated existing canonical URLs: `/us-passport-photo-editor`, `/uk-passport-photo-editor`, `/germany-passport-photo-editor`, `/france-passport-photo-editor`.

Each page has a distinct title, description, opening answer, practical sections, country-specific framing diagram, four FAQs, official citations and links to the other country guides. Article, BreadcrumbList and FAQPage JSON-LD match the visible content. Sitemap dates reflect this editorial change. Existing URLs are retained; no duplicate keyword landing pages are introduced.

The illustrated before/after comparison is keyboard-operable through a native range input, with explicit before/retake buttons. It depicts a fictional adult and a better capture setup, not an actual customer transformation. The caption identifies the AI-generated example and says not to submit it. The size diagram is separate from the portrait so no measurements are invented for the generated face. Country-specific face proportions are schematic.

The service limitations are material: original unedited photographs for US/UK, Germany's domestic digital capture workflow, and approved photographers/booths for French passport and ID photos. The general retake image illustrates lighting and framing, not country-specific background approval. The dimensions panel states the exact background rule. Paid downloads are offered only where appropriate to the application; no government photo codes or acceptance certification are promised.

## Generated asset

Built-in image generation tool used. Published asset: `public/images/country-guides/portrait-retake-demo.webp` (1564 × 1006, 109,166 bytes). Source PNG retained in the workspace review folder and original generated-images directory. WebP encoding preserves the generated composition. No third-party portrait was copied.

Final generation prompt:

> Use case: photorealistic-natural. Create a website educational passport-photo comparison asset as ONE diptych image, two equal-width portrait panels side by side, overall canvas 1400x900 or similar wide ratio. Both panels show exactly the same fictional adult woman age 26 with brown hair tucked behind ears, neutral expression, closed mouth, eyes open, facing camera straight-on, simple dark teal crew-neck top, no jewelry, glasses or beauty filters. Natural realistic skin texture. LEFT panel: an unsuitable casual photo, busy softly visible indoor room background, uneven lighting, woman slightly off-centre. RIGHT panel: a newly taken studio portrait of the same woman, even soft lighting, plain light-grey background, centred, head and shoulders with generous blank space above and sides. This represents retaking a photo correctly, not facial retouching. Each panel is edge-to-edge without borders or gutter. NO text, NO numbers, NO arrows, NO logos, NO watermarks. Clean professional editorial photography. Keep her facial identity and clothing consistent between panels. This is a clearly labelled fictional teaching illustration on a website, never an identity document.

## Review scope

Official sources were checked on 17 October 2026 and linked in each page. US print and digital renewal, UK print and digital, French Service Public and German federal/consular guidance are separated by route. FAQ markup describes the visible questions; it does not guarantee rich results, rankings or answer-engine inclusion.

Validation evidence is stored in the workspace `review/country-pages-*` logs. No real portrait was uploaded and no payment was made. Manual iPhone Safari and real payment testing are outside this content change.

Release validation completed 19 October 2026: 42 regression tests passed, production build passed, and the local public SEO crawl passed all 155 URLs. Desktop and 390px mobile comparison layouts inspected; the Show retake button was verified to set the comparison to the after view. Country page HTTP, illustration, FAQ schema and single-H1 checks passed before release.
