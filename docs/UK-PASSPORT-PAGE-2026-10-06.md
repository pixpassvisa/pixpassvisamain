# UK passport page audit and correction — 6 October 2026

The supplied Search Console comparison shows 67 to 11 impressions (about -84%), clicks 0 to 1 and average position 79.1 to 76.2. UK impressions fell from 58 to 9. The broad query "passport photo" lost 36 impressions while narrower measurement queries appeared. This small one-week comparison does not prove a penalty, a previous top ranking or the cause of the decline.

Live technical baseline: HTTP 200, index/follow and self-canonical https://www.pixpassvisa.com/uk-passport-size-photo-maker. The visible mismatched brand is baked into three external Cloudinary graphics, rather than a canonical-domain error. Existing content and FAQ schema also conflate printed and digital requirements and contain unsupported acceptance, turnaround and document-reuse promises.

Changes: replace the external graphics with an original code-created PixPassVisa measurement graphic (SVG with PNG social derivative); focus server-rendered content on UK passport size in mm/cm, printed versus digital instructions, a comparison table, sources and seven shared FAQs; retain the established URL and internal links; remove unsupported compliance promises and broad document equivalence. Preserve the other processing presets, but stop the online-passport preset before compression or processing because GOV.UK requires unaltered originals and says not to crop own-device photos. This tool does not supply an HMPO photo code. The rendering graphic is a reference diagram, not a measured acceptance result.

Official sources checked:
https://www.gov.uk/photos-for-passports
https://www.gov.uk/photos-for-passports/photo-requirements

The change can address concrete quality and branding problems but does not guarantee a position or traffic recovery. After deployment, inspect the URL in Search Console, verify Google's selected canonical, request indexing and compare at least 28 days of page/query/country/device data. Also review manual actions, indexing and Core Web Vitals; no account-level evidence was supplied for those reports.

Verification passed: seven existing SEO tests, focused ESLint, TypeScript and the production build (258 pages). Browser checks confirm one H1, matching visible/schema FAQs, self-canonical URL, no PixPassport text or Cloudinary images on the page, a loaded local graphic and no desktop/mobile horizontal overflow. The online-passport safeguard was exercised with a non-personal diagram image; it returns the original-photo guidance before processing. Live robots, sitemap and non-www redirection checks also passed.
