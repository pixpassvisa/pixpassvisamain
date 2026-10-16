# Application SEO and performance review — 16 October 2026

Implemented crawlable tool headings, normalized article heading levels, removed nested main landmarks, corrected nine social canonical URLs and four French language-alternate groups. Existing intentional redirects and alternate query canonicals are preserved.

Country presets now exclude editorial HTML from client imports while preserving every processing field. Size filters match both dimensions; unsupported tool presets link to their guide. Removed unsupported processing-time, acceptance and universal verification claims. Blog reads are deduplicated within a render; image sizing better matches its display size.

## Measurements
Production output comparison (HTML rounded to KiB; JavaScript bytes):

| Resource | Before | After |
| --- | ---: | ---: |
| Passport directory HTML | 724 KiB | 174 KiB |
| Visa directory HTML | 726 KiB | 174 KiB |
| Photo size chart HTML | 986 KiB | 264 KiB |
| Checker initial JavaScript | 1,421,594 | 814,838 |
| Checker initial JavaScript, gzip | 398,091 | 253,527 |

These are asset-size measurements, not load-time or Core Web Vitals scores.

## Verification
- Production build: 259 pages generated.
- SEO regression tests: 20 passed; checkout unit tests: 15 passed.
- Local production crawl: 154 public URLs, zero audit failures; one H1 and main landmark per page.
- Public discovery: all 154 URLs reachable, maximum depth one from home.
- Structured-data parsing, local image references and reciprocal hreflang checks: zero errors.
- In-app browser: directory search, exact size filtering, Algeria preset navigation and mobile menu checked. Seven key English/French/German pages checked at mobile width with no horizontal overflow.

## Limits
Chrome, Edge, Firefox and Safari were not independently connected; this is not a cross-engine certification. Lighthouse and field Core Web Vitals were not measured. No real payment or personal-photo upload was made. Local builds omit database-only content; the initial live SEO crawl included 155 URLs. Country requirement data still needs ongoing editorial verification against issuing authorities. Indexing remains Google's decision.
