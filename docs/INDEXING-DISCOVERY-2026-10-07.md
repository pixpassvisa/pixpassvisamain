# Indexing diagnosis and discovery fixes — 7 October 2026

## What the screenshots establish

- Whole-site overview: 70 indexed, 138 not indexed (208 total).
- Sitemap-filtered view: 66 indexed, 133 not indexed (199 total). This is a different population, not evidence of a four-page decline.
- The sitemap-filtered report explicitly says last updated 21 September 2026: 16 days before the screenshots dated 7 October. It cannot measure today's changes.
- Whole-site exclusions: 129 discovered/currently not indexed; four Google-selected canonical conflicts; one crawled/currently not indexed; three redirects; one alternate with proper canonical. The last two categories can be intentional. Exact URLs are needed before changing them.
- The recommendation reports an 82% impression decrease on /uk-passport-size-photo-maker and a 500% increase on the DV checker. This is not an 82% sitewide ranking or traffic decline. The performance overview shows only 24 total clicks, so a few clicks can visibly move the chart. Comparable page/query/date exports are needed to diagnose the UK change.

## Confirmed application problem and repair

The read-only live audit fetched all 217 current sitemap pages successfully, then followed ordinary HTML anchor links from the homepage within this public inventory. It found 48 URLs without a link path from the homepage; the maximum depth among reachable sitemap pages was four. This audit does not include navigation through non-sitemap pages or interactive controls. Sitemap inclusion still provides an independent discovery path.

The country directory uses a tool-support filter, omitting existing reference pages for several countries. Added a separate, clearly labelled reference-guide section without changing tool support or pretending unsupported presets exist. Added six relevant tool/guide links to their passport or visa directories. Added ordinary English, French and German footer links so switching languages no longer depends solely on an interactive control.

After the fix, the generated production HTML exposes all 217 sitemap URLs within three links of the homepage. There are no unreachable pages or file-read failures in this audit. Added stable 7 October lastmod dates for the homepage and two directories whose links changed. Dates are not refreshed on every build. Corrected the passport-directory metadata's universal compliance claim and grammar.

## What remains uncertain

The source has 70 country entries; 66 lack a separate visa preset. Many visa pages therefore share general application guidance. This is a potential distinctiveness/usefulness concern, not evidence that Google rejected those exact 129 URLs. Do not mass-delete or noindex pages without page-level evidence. Prioritize substantive, authority-backed application guidance and functioning presets for destinations with observed demand.

HTTP 200, crawlable links and self-canonicals do not prove Googlebot fetched a URL or selected the same canonical. Neither backlinks nor a penalty are established causes from these screenshots. No Crawl Stats host availability report, current URL Inspection output, server crawl logs, or affected-URL export was supplied.

## Verification

- Nine SEO/FAQ tests passed.
- Focused ESLint: zero errors; two existing img-element warnings on third-party footer badges.
- Production build passed with 258 generated pages and a temporary process-only auth secret.
- `npm run audit:discovery`: 217 URLs, zero failures, zero unreachable, maximum depth three.
- Live baseline: `docs/discovery-live.json`; verified build: `docs/discovery-build.json`.

## Deployment and Google follow-up

Not deployed. The workspace has no Git remote. The previously documented A:\pps\pixpassvisamain checkout points to github.com/pixpassvisa/pixpassvisamain but is at ca6a73f, lacks the current SiteFooter and app/sitemap.ts, and differs from the live application. Do not replace this checkout wholesale or deploy this old base. Confirm the repository/branch that currently deploys the live site, then apply these changes to its current source and repeat the build and live audits.

After deployment:
1. Verify /sitemap.xml and the changed directory/footer links; run the live discovery audit using SEO_TEST_ORIGIN=https://www.pixpassvisa.com.
2. Check Search Console Sitemaps for a successful fetch and its last-read date. Submit the existing sitemap URL if it is not registered or its submission has an error; do not keep resubmitting it as a speed tactic.
3. Inspect the homepage, /passport-photos, /visa-photo, /de, a formerly unreachable country guide, and /uk-passport-size-photo-maker. Check indexed inspection and live availability separately. Request indexing once for a small set of materially improved priority URLs.
4. Inspect each of the four canonical conflicts and compare Google-selected and declared canonicals before deciding on consolidation.
5. Check Settings > Crawl stats > Host status for DNS, server-connectivity, robots retrieval or availability problems, and compare crawl requests/response times. This is needed to test server-related explanations.
6. Compare equal Performance date windows for the UK page by query, country and device. Do not infer cause from the overview percentage alone.

Google says crawling can take days to weeks; repeated requests for the same URL do not make crawling faster. No indexing deadline or ranking guarantee is possible.

Sources:
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://support.google.com/webmasters/answer/7440203

## GitHub handoff — 7 October 2026

The current remote main branch was verified at 959005c and contains the current application. The older A: checkout was behind. These changes are being delivered from a fresh checkout of https://github.com/pixpassvisa/pixpassvisamain on main. Application, library, content, data, test and build-configuration files match the previously verified source after line-ending normalization. Production deployment and Google recrawling must be checked separately after the push.
