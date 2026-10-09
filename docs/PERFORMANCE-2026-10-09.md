# Performance and search audit — 9 October 2026

Performance fixes prepared on the current GitHub main branch. Deployment status must be checked separately.

## Improvements

- Replaced the shared 404 page's full photo-editor import with a small server-rendered recovery page. This removes editor dependencies from ordinary page loads and provides an accurate missing-page message.
- Homepage initial script references fell from 1,262,995 to 594,996 uncompressed bytes (52.9%). These measurements compare production builds immediately before and after the 404 change. They include the HTML's script references, including fallback scripts; they are not measured browser transfer or Core Web Vitals results.
- Final print-generator initial scripts total 579,812 bytes; PDF generation now imports jsPDF only when requested. JPG users do not need that library.
- MediaPipe runtime imports now occur inside model initialization; helper constants and geometry functions no longer eagerly import the runtime. Face-mesh rendering imports its runtime constant when needed.
- Removed the checker's artificial eight-second minimum and the print generator's six-second countdown. Results appear when the API returns, and downloads begin when file generation finishes. Download failures show a retry message; overlapping download requests are guarded. Cloud backup runs after download generation without being awaited.

## Verification

- Production build passed: 259 generated pages. Used a random temporary process-only NEXTAUTH_SECRET; no production credentials changed.
- TypeScript passed; all 13 existing SEO tests passed.
- Live public SEO crawl: 219 sitemap pages, zero reported issues for status, canonical, title, description, noindex, repeated title branding, or retired-brand outbound links.
- Local discovery audit: 218 sitemap pages, zero failures or unreachable pages, maximum three links from home.
- Local production runtime SEO audit passed for 218 pages.
- Missing URL returns HTTP 404, contains the recovery page and a noindex meta tag.
- Targeted lint reports four existing type-related errors and unused-variable warnings in the touched legacy files. No claim of a clean lint baseline.
- No browser interaction test of photo processing/PDF export, Lighthouse run, or real-user Core Web Vitals measurement was performed. Payment and backend integrations were not exercised.

Reproduce bundle accounting with `node scripts/audit-page-js.mjs` after building. The script writes docs/performance-page-js.json. Baseline measurements were captured in the development workspace.

## Release and ranking follow-up

Only the performance changes were applied to current GitHub main; unrelated homepage and privacy-policy changes were preserved. Production contains /blog/passport-photo-upload-rejected, absent from the local build's CMS-free inventory; live CMS content is unchanged.

After deployment, repeat the public SEO audit and measure mobile Core Web Vitals. Use Search Console query/page data to prioritize useful country-specific content and monitor indexing and organic traffic. Rankings cannot be guaranteed by speed or technical SEO fixes.

References: https://developers.google.com/search/docs/appearance/page-experience and https://nextjs.org/docs/app/guides/lazy-loading.
