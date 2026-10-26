# Search quality and acquisition release — 24 October 2026

## Objective and evidence

Attract qualified visitors who need supported photo preparation, then measure successful purchases. Do not promise first-place rankings, official approval or free processed downloads. Before this release, the live site passed technical checks on 156 sitemap URLs. The user's Google live inspection also confirmed successful fetching and indexing permission for the US visa page. Those results establish technical eligibility, not selection, rankings or sales.

The content audit found outdated claims on older landing pages: free finished photos, universal passport/visa equivalence, guaranteed compliance and unsupported speed/check counts. The upload-specification page also presented the service as an official guide and promised flawless uploads. These are confirmed content problems; they are not proven explanations of Google's indexing exclusions.

## Changes

- Added a free DS-160 file-property check to the existing US visa guide. It reads a selected file locally, checks the JPEG signature, square 600–1200-pixel dimensions and a conservative 240,000-byte limit. It does not upload the image or change it. It explicitly excludes facial suitability, colour profile/depth, compression ratio and official acceptance.
- Gave the homepage and primary maker distinct search snippets: overview/free preview versus starting the preparation workflow.
- Rewrote the 2×2 editor, browser-app and general-editor copy around their specific tasks, realistic deliverables and accurate pricing boundaries. Existing URLs and tool presets are preserved.
- Reworked the existing digital-specs URL into an upload-troubleshooting checklist, linked to the actual checker and preparation flow. Kept the legacy year-bearing URL to avoid an unnecessary migration; removed the year from its title.
- Linked the homepage's US visa size card and visa service card directly to the new guide/checker. Added relevant guide, privacy, refund and tool links within the revised content.
- Removed unsupported universal check-count, processing-speed and compliance claims from shared landing-page UI.
- Updated sitemap dates for materially revised pages. No mass redirects, keyword-variant pages, purchased links or blanket noindex changes.

## Search intent map

These are proposed query themes, not verified search volume or ranking forecasts. Use real Search Console data to refine them.

| Existing page | Primary visitor task / query theme | Next step |
|---|---|---|
| / | passport and visa photo maker online | Choose document or guide |
| /passport-photo-online | make a passport/visa photo online | Upload → preview → purchase |
| /us-visa-photo-editor | US visa photo editor; DS-160 photo file check | Local file check or US visa preparation |
| /digital-visa-photo-specs-2026 | DS-160 photo upload error; JPEG too large | Diagnose file issue, then guide/tool |
| /2x2-picture-editor | 2×2 photo editor; 2×2 photo print size | Correct document preset or free print layout |
| /passport-photo-app | passport photo app without installation | Browser maker |
| /passport-photo-editor | passport photo crop and editing options | Compare permitted workflow, then maker |
| /uk-passport-photo-editor | UK digital versus printed passport photo | Original-photo checks and suitable output |
| /australian-passport-photo-checker | Australian passport photo checker | Supplementary checking and capture guidance |
| /germany-passport-photo-editor | German digital passport photo process | Correct capture provider / document workflow |
| /france-passport-photo-editor | French passport photo size and approved capture | Correct provider / document workflow |

Retain US, UK, Australia, Germany and France as visitor-market priorities. A visitor's country is different from the document destination. German/French domestic capture restrictions make ordinary downloadable passport files an unsuitable universal paid offer. Residents applying for foreign visas may have a more relevant preparation need. Merchant eligibility and bank authorisation must be confirmed with captured payment data, not inferred from country wealth or a currency selector.

## Measurement and next decisions

No authenticated Search Console/GA4 connection or fresh query/country exports were available in this session. No numeric traffic or revenue forecast is justified. Existing preparation and checkout analytics are left intact; delivery to the real analytics account remains unverified.

1. Record the deployment date and request indexing once for materially revised priority URLs. Submit/check sitemap.xml under Sitemaps.
2. Use Search Console's indexed report to monitor the selected canonical and last crawl. The live test alone does not show the stored indexing decision.
3. After Google recrawls, compare the next 28 days with the prior 28, split by page, query, country and device. Keep brand and non-brand queries separate. Do not interpret a tiny sample as a reliable CTR change.
4. Prioritize relevant pages with actual impressions. Low CTR at comparable query/position is a title/snippet opportunity; low impressions can reflect indexing, rank or demand and is not fixed by a title alone.
5. Join aggregate landing-page/country trends with photo selection, preview, checkout and captured purchase events. Check gateway totals before relying on analytics revenue. A click or checkout event is not a paid order.
6. Consolidate competing pages only after query overlap and canonical evidence establish duplication. Keep distinct tools and guides when they solve different tasks.
7. Seek editorial references from relevant travel/application resources through useful original tools and guidance. No outreach messages or link purchases are authorised or performed by this release.

## Sources

- https://developers.google.com/search/docs/essentials
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/title-link
- https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html
- https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html

Publication and verification results are recorded below after the release checks.

## Completion verification — 26 October 2026

Resumed the unfinished release. The previously successful production build was reused without source changes. All 22 regression tests pass. The local production HTTP audit and discovery audit pass on 155 URLs with no errors or unreachable pages. Browser tests confirm a 600×600 JPEG passes the three file checks and a 600×750 PNG correctly fails format and dimensions. No personal photo or payment was used. Production publication follows this verification.
