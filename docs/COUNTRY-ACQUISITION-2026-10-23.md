# Country acquisition update — 23 October 2026

## Implemented
- US and UK guides now show free versus paid options near the start, local package pricing, deliverables, refund/privacy/support links, and document-specific preparation links. The existing free print-layout tool remains explicitly identified as free.
- The homepage links directly to the existing German and French passport guides. No duplicate country pages or speculative year-keyword pages were added.
- Australian checker metadata, visible guidance and FAQ schema now use the official print-size range, distinguish passport from visa workflows, and remove acceptance and browser-only processing claims. Source checked: https://www.passports.gov.au/help/passport-photos (23 October 2026).
- Added optional GA events to the main maker: photo_selected, photo_processing_started, photo_preview_ready, photo_processing_failed; added begin_checkout after the checkout opens. The coarse document_country field describes the document, not the visitor's location. No filename, photo ID, email or error message is included in these new events.
- Kept the existing server webhook purchase event; did not add a competing browser purchase event. Live GA delivery, consent configuration, GA4_API_SECRET and webhook configuration require account-side verification. A preview-ready event means the server returned a preview, not that the customer viewed or bought it.
- Updated sitemap last-modified dates only for the changed public content.

## Measurement next
Use 28-day versus prior-28-day and 90-day GSC exports, filtered separately for US, UK, Australia, Germany and France. Export queries and pages after each country filter; keep impressions, clicks, CTR and position. Join only at aggregate level; Search Console does not identify individual buyers.
In GA4, compare landing page and user country against upload, processing, checkout and purchase. Validate purchase values against captured gateway orders; do not infer revenue from clicks. Register document_country as an event-scoped custom dimension if useful. Existing purchase Measurement Protocol session attribution should be checked in the real GA property before using it to judge channels.
No authenticated Search Console or Analytics session was exposed in the browser inventory, so no reports were exported or account settings changed. No advertising spend was initiated.

## Next content decisions
Prioritize supported document/application tasks showing impressions and actual purchases. Germany and France have official capture constraints; ordinary JPEG downloads are not equivalent to their domestic official capture workflows. Validate demand before adding localized service pages. No ranking, volume or conversion forecast is claimed.

## Verification
- Exact release production build passed (263 generated routes), using a temporary local-only NEXTAUTH_SECRET and no production credentials.
- 61 regression tests passed across the suite and focused reruns. Updated an existing preview test fixture for its PaymentHelp dependency; application payment behavior was unchanged.
- Local production HTTP audit: 155 sitemap URLs, zero SEO issues.
- Browser verified US service options and preset handoff, UK service options, and Australian guidance. Screenshot: review/country-acquisition-2026-10-23.png in the parent workspace.
- No real photo upload, purchase, analytics-account setting or advertising campaign was exercised.
