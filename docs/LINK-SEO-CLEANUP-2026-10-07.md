# Link and SEO cleanup — 7 October 2026

Active source: `frontend/`. No production deployment was performed.

## Verified findings

A read-only crawl of all 217 URLs in the live sitemap found zero HTML anchor links to pixpassport.com or its subdomains. All 217 returned HTTP 200, a matching canonical, a title and description, and no detected robots noindex. The application/content source scan also found no pixpassport.com references. This does not audit incoming links on other websites, authenticated screens, or pages missing from the sitemap. No links were removed because none were found in that scope.

The live audit found 20 titles repeating the PixPassVisa brand. The root metadata template now leaves each page's complete title intact instead of adding another brand suffix. Pages with unbranded titles keep their descriptive titles.

Blog FAQ parsing previously removed an entire FAQ section even when none of its markup could be extracted. Unrecognized FAQ sections now remain visible. Existing recognized FAQ extraction is unchanged. Two regression cases cover content preservation and successful extraction with subsequent sections retained.

## Repeatable checks

- `npm run test:seo`: route, privacy, structured-data, editorial, analytics and FAQ tests.
- `npm run audit:seo`: read-only public sitemap crawl. Defaults to the production origin. Set `SEO_TEST_ORIGIN` to a local server to verify a build. Writes `docs/link-seo-audit.json`.
- `docs/link-seo-audit-live-2026-10-07.json`: preserved pre-change production audit.

## Remaining action

Deploy the active frontend source through the existing deployment workflow, then repeat the public audit. Earlier delivery/publish folders and ZIP archives do not include these changes. An example URL or backlink report is needed to identify the links the user reported. Links from another website cannot be removed by modifying this application's source.

These repairs do not guarantee ranking gains. Google recommends useful crawlable links, descriptive content and consistent canonicals: https://developers.google.com/search/docs/essentials . No mass redirect, disavow, fabricated reviews, or keyword stuffing was added.

## Final verification

All nine regression tests passed. Focused ESLint and TypeScript checks passed. The production build completed with 258 generated pages using a temporary process-scoped authentication secret; no production credentials were changed. All 20 affected titles were checked in generated HTML and contain the brand once (`title-verification-2026-10-07.json`). Next.js reports an existing middleware convention deprecation. Payment and photo-processing integrations were not exercised.
