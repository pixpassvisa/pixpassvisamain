# Indexing and checker conversion — 12 October 2026

## Evidence and diagnosis

Search Console screenshots show 37 clicks, 1.62K impressions, 2.3% CTR and average position 40 over 28 days. India accounts for 30 clicks. This is a small organic sample, not proof of a particular purchase conversion rate. Search Console does not report checkout abandonment. The two supplied query pastes contain the same 459 rows, totaling 28 clicks and 869 impressions each; they must not be added together or substituted for the chart totals.

The coverage export contains 144 discovered-but-not-indexed URLs. Its January 1970 crawl dates are missing-date placeholders, not evidence of actual crawls then. A fresh public HTTP audit of all 144 found successful responses, matching declared canonicals and no meta noindex. Of these, 59 serve incomplete guidance explicitly stating that a matching document preset is unavailable. This makes template overlap and limited standalone value plausible concerns; it does not establish Google's exact reason for each exclusion.

All eight canonical-conflict examples also return 200 with self-canonicals. The Google-selected destinations are not present in the supplied screenshots and require authenticated URL Inspection. Current HTTP results do not prove that Google has recrawled, accepted a canonical, or indexed a URL. Redirect and proper-alternate exclusions are often intentional.

The live site already includes several earlier improvements, despite stale local delivery notes. The verified frontend repository is `pixpassvisa/pixpassvisamain`, branch `main`. Its legacy GitHub workflow targets a VPS with PM2, but public response headers confirm that the domain is hosted on Vercel. The user confirms that Vercel automatically pulls main. The release was prepared from `7dab7dd0b8c49b15b457fcfa8d4cb1200adbc3fa`; modified files matched the local pre-edit baseline.

## Implemented changes

- The shared checker now offers the editor after both passing and failing reports. Previously only failures had an editor CTA; passing users could only validate another photo.
- Show the existing one-time download price before checking and beside the result. Separate free checks/previews from paid digital photo and print-sheet downloads. No price or payment rule changed.
- Carry the original file and exact document into the editor through temporary tab memory. No photo is stored in a URL or browser storage. Handoffs expire after five minutes, are consumed once and are rejected for another document. Reload falls back to upload. Users explicitly request processing after reviewing the selected preset and policy.
- Remove the fallback that could turn an unavailable visa selection into a passport or US preset. Hide reports when their file or selection changes.
- Replace the divergent validator implementation with the maintained shared checker, removing its unsubstantiated accuracy, immediate-processing and browser-only storage claims. Existing server validation still uses passport configurations; the visa limitation remains clearly visible.
- Add `checker_started`, `checker_completed`, `checker_failed`, `checker_editor_click`, `checker_preview_started`, `checker_preview_ready` and `checker_preview_failed` to the existing optional GA integration. No new tracker is loaded and no photo, biometric score, filename, photo ID or error text is sent. Events respect the existing integration's availability/consent behavior; analytics delivery still needs live verification.
- Permanently redirect `/passport-photo-maker` to `/passport-size-photo-maker`, which serves the same maker task. Update the directory link and remove the alias from the sitemap. Correct the destination's free-download, privacy and acceptance claims; structured pricing now describes the paid download rather than a free finished product.
- Give `/uk-passport-photo-requirements-tool` a distinct, source-linked digital-versus-printed comparison. It no longer repeats the editor or claims that automatic edits satisfy UK requirements. The existing URL and self-canonical are preserved.
- Remove translation annotations between the English blog and the different German/French guide collections. Each keeps its own canonical and remains accessible.
- Submit 151 complete pages in the sitemap. Compared with the prior 218-page inventory, omit 66 country/document pages lacking a matching preset and the consolidated maker alias. The 66 guidance pages remain accessible and indexable; no mass noindex, deletion or homepage canonical was introduced. Restore sitemap inclusion when substantive document-specific guidance and a verified preset are available. The 59 incomplete URLs in the user's export are part of this larger group.

## Verification

- 16 automated tests passed, including one-time file transfer, expiry, wrong-document rejection, redirects, routing and existing SEO regressions.
- Production build and TypeScript passed on the isolated release using a temporary local authentication secret. No production secrets were copied or changed.
- All 151 sitemap URLs returned 200, their expected canonical and a title, with no meta noindex. The maker alias returned a single 308 to its destination. All sitemap pages are reachable from the homepage within three links.
- Headless Chrome at 390 × 844 verified passing/failing CTAs, INR pricing, file/document preservation, explicit processing, processing-error recovery, reload fallback, stale-report hiding and funnel event calls. No page JavaScript errors or horizontal overflow were observed. A synthetic image and mocked processing/validation responses were used; this does not establish backend accuracy or a successful paid purchase.
- Existing uncommitted working copies were preserved. The release uses an isolated checkout of current main. Payment, webhook and download authorization code were not changed.

## After deployment

1. Verify the public alias redirect, new UK guide, validator copy and 151-URL sitemap. Submit the canonical sitemap in Search Console once. Inspect and request recrawling of the maker destination, UK guide and a few important country pages.
2. For the remaining canonical conflicts, record the Google-selected canonical and last crawl in URL Inspection. Compare the actual paired pages before merging more country pages. Do not request indexing of the retired maker alias.
3. Use GA DebugView to confirm the checker events. Compare completed checks → editor clicks → preview starts → preview readiness → the existing checkout/purchase events. A checker completion is not a sale. Preserve purchase events as the revenue measure.
4. Investigate checkout only after enough qualified users reach it. The present search traffic is too small to promise sales growth. Focus country-specific content on real supported documents and customer tasks, rather than generating more near-identical pages.
5. The current backend's passport-only validation configurations need separate document-specific work. A paid result must not be marketed as government approval. For UK own-device digital applications, official guidance requires an unaltered photo and says to leave cropping to the application service.

## Sources

- User screenshots, coverage workbook and duplicate query pastes supplied on 12 October 2026.
- [Google: canonical troubleshooting](https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting)
- [Google: sitemaps and their limits](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [GOV.UK: digital passport photos](https://www.gov.uk/photos-for-passports)
- [GOV.UK: printed passport photos](https://www.gov.uk/photos-for-passports/photo-requirements)

Indexing and ranking remain Google's decisions. Technical checks, sitemap submission and a successful deployment do not confirm indexing or future revenue.

