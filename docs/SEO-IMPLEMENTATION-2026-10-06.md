# PixPassVisa implementation and verification — 6 October 2026

The active source is `frontend/` and `backend/`, as confirmed by `DELIVERY.md`, the application structure, and package scripts. `delivery/`, `publish-frontend/`, `publish-backend/`, and ZIP archives are older copies and were not overwritten. No deployment, push, purchase, external-account change, or customer-photo inspection occurred.

The repository is an unborn `master` branch with all project files untracked and no commits. No applicable `AGENTS.md` was found in the project or checked ancestor paths. A worktree cannot provide meaningful isolation from an uncommitted initial tree. Existing files were preserved in `review/seo-2026-10-06/before/`, with SHA-256 hashes in `before-hashes.json`; environment files and images were excluded. The change inventory in that review directory distinguishes this task’s edits from the pre-existing work.

## Architecture and evidence

- Next.js 16.1.6 App Router / React / TypeScript frontend. Country editors use `app/[slug]/page.tsx`, `lib/slug-router.ts`, `lib/slug-utils.ts`, and `data/countries-specs.json`. Other tools use static pages or the tool/special/money JSON libraries.
- German and UK guides use Markdown frontmatter under `content/`. Blogs use published MongoDB records with a local JSON fallback. Index, article, and sitemap now use one blog loader and the same reviewed content.
- FastAPI backend; country JSON configurations are loaded by `backend/config/countries/loader.py`. The checked-in backend contains passport configurations only. Frontend validation and processing explicitly send `document_type=passport`, even when the UI presents a visa selection. This is a confirmed functionality limitation, not a claim about Google indexing.
- Vercel frontend and Render backend are documented; `vercel.json` schedules cleanup routes. Photos are sent to servers and stored with Cloudinary. Actual deployment settings, deletion execution, analytics reports, and Search Console were not accessed.
- Existing checks: `test:seo`, TypeScript, Next production build, ESLint, and the full-sitemap HTTP checker. Verification uses a local production server, no production credentials or real payment.

## Confirmed findings and implementation

| Finding | Affected source/routes | Implemented result |
|---|---|---|
| Every country generated both document intents, with fallback to the wrong preset | `lib/slug-utils.ts`, `app/[slug]/page.tsx`, country directories; Australia visa is a concrete example | Preserve established URLs. Pages without a matching document preset now disclose the limitation and omit the wrong upload CTA and product offer. Directory cards distinguish presets from guidance. Unknown route shapes resolve to genuine 404s. |
| Generated prose invented verification, security consequences, and acceptance assurances | `lib/content-weaver.ts`, `ProgrammaticLandingPage.tsx` | Describe actual preset settings and practical limitations; remove seeded keyword variants and invented government verification. Keep document-specific custom content and correct US/India problem content. |
| US visa page promised any-photo compliance and one output for every application | `data/countries-specs.json`, `/us-visa-photo-editor` | Natural application-specific guidance with official photo and digital-image sources; distinguish configured output from permitted ranges, print workflows, and DV instructions. No changes to prices or processing parameters. |
| ICAO was presented as a country/government; keyword variants used the same tool and purpose | `/icao-visa-photo-editor`, three ICAO tool aliases | Destination explains standards, generic-preset limits, and issuing-authority selection. Three exact 308 redirects; useful capture/check topics preserved in destination. Links and sitemap inventory updated. |
| Blog promotion imposed US square dimensions on UK/Australia guides | `TocSidebar.tsx`, `ToolPageRenderer.tsx`, `app/blog/[slug]/page.tsx` | Shared promotion asks users to select their document; no universal 600×600 claim or unrestricted background-editing promise. |
| UK visa article treated passport rules as universal visa rules | `data/reviewed-blog-content.json`, shared blog loader | Explain application-centre vs ID Check workflow and leave route-specific photo specifications to the application instructions. |
| Australia article promised a free finished photo and unsupported universal requirements | Same reviewed-content source | Free checks/previews vs paid downloads; no unverified all-visa dimensions, editing permission, or automatic-rejection claim. Passport and citizenship sources are explicitly scoped. |
| Local JSON changes could be hidden by MongoDB content | `lib/blog-posts.ts`, `lib/reviewed-blog-content.ts`, blog article | Dated corrections apply to existing published local/DB records; a later CMS edit supersedes them. Publication dates preserved; corrected modification dates flow to article markup and sitemap. |
| Privacy and accuracy promises contradicted actual server/storage code | About, checkers, privacy and data-security pages, shared components | Explain server processing and Cloudinary storage. Retention is a cleanup intention requiring successful operations; no immediate-deletion, browser-only, accuracy certification, or universal acceptance claim. |
| Static ratings, applicant counts and testimonials had no supporting provenance | Shared checker; UK, Canada and German pages | Remove the displayed ratings/counts, German acceptance statistic, and unverified German testimonials. No fabricated review markup added. |
| German guides overlapped and confused appearance with authorized digital submission | Two German Markdown guides | Keep URLs with distinct roles: visible photo requirements vs capture/transmission workflow. Cross-link them and use official sources. No claim of provider registration for PixPassVisa. |
| London guide made unsupported local/workflow claims | `content/uk/create-passport-photos-london.md` | Explain London submission choices without invented local businesses or prices. Preserve existing passport preset; distinguish photo-code, digital and printed submission. |
| India content made universal digital claims and contained broken citation artifacts | Country/special JSON | Explain PSK/POPSK and other collection methods; label 630×810 as the current tool setting with unverified universal applicability. Distinguish square OCI requirements; remove citation placeholders. Existing OCI selector does not establish correct output. |
| A successful sitemap URL lacked its own canonical and metadata | `/de/fuehrerschein-foto` | Add a distinct German title, description and self-canonical. Its broader legal/fee content is not certified by this metadata fix. |
| Analytics endpoint accepted arbitrary metadata and preview URLs | `lib/analytics-payload.ts`, API; tracker lifecycle | Allow only existing event types, discard arbitrary metadata, strip query strings and preview IDs, validate session IDs, and remove duplicate query-driven page views and a leaked listener. No new tracking or consent assumptions. |

The preferred host remains `https://www.pixpassvisa.com`. Existing apex redirects, private-page headers, crawlable directory links, and stable-date sitemap behavior were already present. The homepage canonical with and without a trailing slash denotes the same root URL; the test now compares normalized URLs. No new canonical-to-homepage rules, country mass deletion, or mass noindex was introduced.

## URL decisions

| URL/group | Decision | Reason |
|---|---|---|
| `/us-visa-photo-editor` | Improve | Dedicated preset and application guidance; important measured landing page. Backend validation limitations are now visible. |
| `/america-visa-size-photo` | Keep/improve | Actual selector offers multiple US document choices, unlike the dedicated visa page. Clarify its format-selector role. No backlink or query-to-page evidence justifies merging it. |
| `/passport-photo-checker`, `/online-passport-photo-checker` | Keep/improve; investigate further | Same engine but fuller guidance vs quick web check. Correct privacy/accuracy claims. Measure per-page queries and user completion before any later consolidation. |
| `/icao-standard-photo`, `/icao-standard-photograph`, `/icao-compliant-photo` | Consolidate | Same generic ICAO preset, overlapping explanatory content, same user task. Exact 308 to `/icao-visa-photo-editor`; one-hop destination, internal links and sitemap updated. |
| `/icao-visa-photo-editor` | Improve/keep | Existing performance URL retained as the consolidated standards explainer, not a fictitious government service. |
| `/india-passport-photo-editor` | Improve/keep | Dedicated passport preset. Its output settings are distinguished from application-specific requirements. |
| `/indian-passport-size-photograph` | Improve/keep; investigate OCI output | Actual broader selector/comparison role. OCI is a separate square workflow; the old rectangular selector label is not valid evidence of support. |
| Both German biometric guides | Improve/keep | Distinct final roles and cross-links; appearance checklist vs digital submission. No unsupported same-language canonical merge. |
| `/uk/passport-photos-london` | Improve/keep; investigate local demand | Keeps observed established URL; factual application-choice help. No verified local-business information or backlinks were available. |
| `/australia-visa-photo-editor` and other unmatched country/document pages | Improve; investigate configuration | Keep URLs, disclose absent preset and omit wrong document selection. These still need application-specific evidence and useful configuration work; the historical discovered status does not prove thin-content causation. |
| `/us-passport-photo-editor`, `/schengen-visa-photo-editor`, `/algeria-passport-photo-editor` | Keep; improve shared content | Matching frontend presets and self-canonicals confirmed. No issuing-authority certification implied. |
| UK/Australia visa blogs | Improve/keep | Existing URLs with performance data; application workflow and pricing corrections matter more than URL changes. |
| `/uk-passport-size-photo-maker`, DV checker, driving-licence guide, generic maker, print-template generator | Keep; investigate requirements and funnel | Distinct tasks. No changes to established payment/download operations. Broader document-specific claims still require authority and processing validation. |

No backlinks, analytics conversion reports, or query-to-page exports were available. These decisions are based on actual local content/functionality; they do not claim proven cannibalization.

## Verification and limits

Final machine-readable results are in `seo-runtime-results.json` and the review directory. Focused tests exercise routing, absent presets, exact redirect termination, editorial precedence and analytics data minimization. The production build uses only a temporary process-scoped test authentication secret. The local server has no processing backend, database, or payment secrets configured.

The full sitemap check verifies successful status, canonical consistency, title presence, and absence of header/meta noindex for every listed URL. Representative tests additionally verify rendered guidance, one primary heading, intended upload links, directory links, missing-route 404s, private-route noindex headers, and redirect termination. Synthetic upload requests check clear 503 error handling when the processing backend is absent. This does not prove successful face processing, preview generation, payment, or paid download in a configured environment.

Unchanged processing/payment/download source is compared with the initial hashes. No real purchase or customer photograph was used. A local passing build is not certification of the existing pipeline.

Production-only follow-up:

1. Configure a non-production processing backend, database, and Razorpay sandbox, then test a synthetic consented portrait through upload → report → preview → checkout → paid download. Confirm the same country/document is used throughout; the current backend has no visa configurations.
2. Audit id-based preview APIs and publicly accessible storage URLs. Paid downloads have owner/token/payment checks, but previews use different access paths. Robots/noindex is not access control. Adding consistent authorization requires coordinating guest-preview links; it was not silently changed in this SEO pass.
3. Verify cleanup execution and coverage. Validator uploads use a `validator photo` tag; the Cloudinary cleanup search uses `us-visa-photo`. Daily scheduling and batch limits do not establish that every file is removed exactly at 24 hours.
4. Verify current support/refund statements against the intended policy. A support page says full refund while terms/FAQ say 50%; no refund policy or price was invented or changed here.
5. Review remaining specialized/localized photo claims, especially German authorized capture, French ePhoto, UK digital outputs, and OCI selector behavior. Marked uncertainty is not completed requirements verification.
6. Inspect consent and live analytics configuration before adding funnel events. The root optionally loads GA; the custom tracker is defined but was not found mounted. Checkout tries to send an existing `razorpay_open` event if a session ID exists. GA purchases are sent from the webhook; delivery, deduplication, and report totals require sandbox/live evidence.

## Post-deployment Search Console checklist

1. Record the actual deployment date and deployment identifier. Check preferred HTTPS/www redirects on the public host, robots.txt, sitemap.xml, and private-route headers before requesting recrawls.
2. Inspect a small representative set: US visa, Australia visa, Schengen visa, India passport, Algeria passport, consolidated ICAO destination, UK visa blog, Australia visa blog, and one updated German guide. Compare live rendered HTML with indexed data: fetch status, crawl permission, indexing permission, user-declared canonical, Google-selected canonical, content and links. The live test cannot prove canonical selection or actual inclusion in the index.
3. Check the three retired ICAO URLs return one-hop permanent redirects and are absent from the sitemap. Request recrawl of the materially improved destination rather than requesting indexing of retired aliases.
4. Submit/read the canonical sitemap once and check its processing errors and discovered URLs. Inspect the four historical canonical conflicts individually before deciding whether those exclusions are defects. Redirect and alternate-canonical exclusions can be intentional.
5. Recheck a small sample of the historical 129 discovered URLs using current URL Inspection. “Validation started,” the September chart endpoint, and 1970 placeholders do not prove current status or a completed fix. Do not mass-submit, mass-noindex or delete the group.
6. Review Manual Actions, Security Issues and mobile Core Web Vitals. Use field data and matching query/country/device comparisons; the supplied mobile CTR difference alone does not diagnose UX.
7. Compare equal 28-day windows after sufficient recrawl time. Track page, country, device, brand/non-brand, and available queries. Preserve chart totals independently of query/page tables. With sparse impressions, avoid repeated title rewrites or claims of causal growth.

## Baseline and teaching notes

`search-baseline-2026-10-06.json` records the supplied 24 clicks / 1,092 impressions / approximately 2.20% CTR / approximately 45.2 position, observed 11 September–3 October chart range, priority pages, and historical indexing evidence. Earlier 3 October notes are retained as historical records, not silently relabelled as the latest export.

- A canonical names the preferred URL for a page. Distinct documents need their own accurate pages; a canonical does not correct an unsupported preset.
- A permanent redirect retires an equivalent page and sends both people and crawlers to one destination. Internal links and sitemaps should point directly there to avoid unnecessary hops.
- A sitemap helps discovery. It does not compel crawling, indexing, or ranking. `lastmod` should describe a real content change; undated static pages may omit it.
- A title and description describe the page’s real purpose. Search engines may rewrite them; useful specificity matters more than repeated keyword variants.
- Structured data should describe visible, truthful content. No fabricated reviews or universal certification were added. FAQ/HowTo markup does not guarantee a rich result.
- Hreflang describes genuine localized equivalents, not unrelated country/document pages. No speculative language mappings were added.
- Noindex is an indexing instruction. Private-image security needs authentication/access control, independently of robots.txt.

## Official references reviewed

- [Google canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap lastmod guidance](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)
- [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Search Console URL Inspection limitations](https://support.google.com/webmasters/answer/9012289)
- [US visa photo requirements](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html)
- [US digital image requirements](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos/digital-image-requirements.html)
- [UK visa identity workflow](https://www.gov.uk/apply-to-come-to-the-uk/paying-fees-and-proving-your-identity)
- [UK ID Check app](https://www.gov.uk/guidance/using-the-uk-immigration-id-check-app)
- [UK digital passport photos](https://www.gov.uk/photos-for-passports), [printed photos](https://www.gov.uk/photos-for-passports/photo-requirements)
- [Australia ImmiAccount](https://immi.homeaffairs.gov.au/help-support/applying-online-or-on-paper/online), [passport photos](https://www.passports.gov.au/help/passport-photos), [citizenship photos](https://immi.homeaffairs.gov.au/citizenship/photo-requirements-for-citizenship-applications)
- [German federal digital-photo change](https://www.bundesregierung.de/breg-de/aktuelles/neuregelungen-mai-2025-2344002), [official photo template](https://tuerkei.diplo.de/resource/blob/2306910/2198ba562da42ec69f29352054951703/bundesdruckerei---fotomustertafel-data.pdf)
- [ICAO publications](https://www.icao.int/icao-trip/publications)
- [Passport Seva booklet](https://passportindia.gov.in/pdf/ApplicationformInstructionBooklet-V3.0.pdf), [re-issue instructions](https://www.passportindia.gov.in/psp/ApplyReissue), [OCI FAQ](https://ociservices.gov.in/onlineOCI/onlineOCI/faq)

The Bern mission page could not be retrieved, and the Wellington page did not establish the universal digital claims in the old copy. Those claims were replaced with explicit uncertainty. Failure by a research fetch tool is not evidence that Googlebot cannot access PixPassVisa.
