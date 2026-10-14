# Search Console duplicate-canonical review — 14 October 2026

## Scope and diagnosis
The supplied screenshot lists eight URLs under “Duplicate, Google chose different canonical than user”. It does not identify Google's selected canonical. Public HTML cannot supply that private URL Inspection result. No cross-domain canonical or pixpassport.com reference was found in the eight responses. Crawl dates in the screenshot predate some existing fixes. Changing an image alone does not determine canonical selection or rankings.

## URL decisions
- /australia-passport-photo-editor: preserve URL and self-canonical; replace generic editor text with sourced Australian print, capture and editing guidance.
- /uk-passport-photo-editor: preserve URL and self-canonical; explain PixPassVisa preset limits and link to the separate route-selection guide.
- /uk-passport-photo-requirements-tool: preserve the digital-versus-print guide; add its own branded graphic and page-specific social metadata.
- /passport-photo-maker: preserve the existing permanent 308 to /passport-size-photo-maker. Keep the alias out of the sitemap.
- /romania-passport-photo-editor: preserve URL and self-canonical; explain the specific adult consular electronic-passport capture route. Do not sell a crop as a substitute for capture.
- /south-africa-visa-photo-editor: replace placeholder with a scoped mission checklist and cited Cotonou visitor-visa example; disclose unavailable visa preset.
- /chile-visa-photo-editor: replace placeholder with distinct temporary-stay versus temporary-residence upload guidance; disclose unavailable visa preset.
- /de/guides: rewrite the hub around image quality versus digital submission. Remove unsupported guarantee and use original PixPassVisa imagery and metadata.

## Technical changes
Five reviewed country guides are server-rendered with Article and BreadcrumbList data, official citations, unique titles/descriptions and distinct local 1200×630 PNG illustrations. The German hub uses CollectionPage/ItemList data. Canonicals and social URLs remain on https://www.pixpassvisa.com. Seven original guide illustrations are locally hosted; no external app assets were copied. The review date and sitemap lastmod reflect actual edits. The two completed visa guides join the sitemap as guidance, not unsupported paid tools. Passport and visa directories link directly to reviewed pages. Remaining incomplete country placeholders stay outside the sitemap.

## Sources reviewed
- https://www.passports.gov.au/PhotoGuidelines
- https://www.gov.uk/photos-for-passports
- https://www.gov.uk/photos-for-passports/photo-requirements
- https://econsulat.ro/PasaportSimpluElectronicRomaniMajoriRO/Conditii/203000001
- https://dirco.gov.za/benin/wp-content/uploads/sites/13/2025/05/20190506-Requirements-for-Visitors-visa-Holiday-purposes-to-print.pdf
- https://serviciomigraciones.cl/residencia-temporal/
- https://serviciomigraciones.cl/permanencia-transitoria/
- https://www.bundesregierung.de/breg-de/aktuelles/neuregelungen-mai-2025-2344002

## Google follow-up
After deployment, use URL Inspection for a retained URL and compare “User-declared canonical” with “Google-selected canonical”. Test the live URL, then request indexing if the live result is correct. The redirected maker alias should remain a redirect, not become a separately indexed page. Revalidation and recrawling can take time; no ranking, indexing or canonical-selection guarantee is made. Search Console submission is not claimed by this code release.

## Pre-deployment verification
Production build and all 17 tests passed. The local production sitemap audit checked 153 URLs with no reported errors. All eight target routes match the decisions above. Desktop and 390px mobile guide layouts were inspected; no horizontal overflow was found. A regression test caught and corrected the UK checker link before deployment.
