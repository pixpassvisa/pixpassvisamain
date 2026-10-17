# Reliability, pricing and country acquisition review

## Findings and changes

The supplied PixPassVisa_Test_Cases.xlsx contains 108 scenarios, all Not Run. Its four issue-register entries are observations or reports, not proof that all scenarios failed.

- PPV-ISSUE-01: replaced the online checker's contradictory “No Images Stored” claim with a storage-policy reference. This is a copy correction, not verification of deletion/retention infrastructure.
- PPV-ISSUE-02: reproduced `TypeError: eyePct.toFixed is not a function` when rendering older records with string measurements. Normalize finite measurements before formatting. The existing recovery loader had been committed without the page that used it; connect it, remove the preview's server auth/database dependency, and provide application/root error recovery. The screenshot's digest 3983905594 cannot be conclusively attributed without Vercel logs from the incident.
- PPV-ISSUE-03: visa checks currently use passport configurations. Make the result badge say “VISA RULES NOT VERIFIED” instead of displaying a visa PASS. Existing limitations remain visible; this release does not add a visa-specific validation engine.
- PPV-ISSUE-04: clarify the paid download action, remove the countdown and unsupported popularity/acceptance claims from the English preview, simplify the premium choice, and reduce the USD premium total to $6.99. Standard remains $4.99. Other currencies retain their existing fixed local amounts. Checkout regression coverage checks server minor units ($6.99 = 699).

## Acquisition and search

Add `/passport-photo-country-guide` as a substantive comparison page for the US, UK, Australia, Germany and France. It distinguishes residence from document destination, links existing country guides and tools, provides visible FAQ answers with matching structured data, sets a canonical and social metadata, and is included in the generated sitemap/footer directory. Homepage destination cards now include Germany and France.

Preserve established country URLs instead of creating competing country keyword pages. The comparison page directs people to existing deeper guidance and clearly separates a free check from paid preparation. Official sources are linked beside each country. French approved capture and German domestic digital capture requirements mean a generic downloadable image must not be marketed as a replacement. Country targeting is acquisition intent, not an automatic assertion that these visitors will pay.

## Validation and remaining work

Run all Node regression tests, the production build, and a local sitemap audit. A temporary local-only NEXTAUTH_SECRET is used for the build; no production secret is changed. Record final results in the delivery message.

The 108 workbook scenarios have not all been executed. Automated coverage includes preview recovery, legacy metrics, order pricing, payment signatures, download-token behavior, checker handoff, photo-processing error handling and SEO. This is not a substitute for all manual and payment-provider tests.

Still requires operational evidence:

- Match the incident timestamp and path to Vercel logs; confirm deployment health.
- Run real iPhone Safari and cross-browser uploads with a consented portrait.
- Exercise successful, failed, cancelled and delayed payments in Razorpay test mode; confirm international merchant/payment-method enablement. No payment was made in this review.
- Verify retention, deletion, cross-account isolation and delivered physical print quality separately.
- Confirm GA configuration, existing checker events, Razorpay-open events and server purchase events in a test property. Compare country/device landing visits → checker → preview → checkout → verified purchase. No revenue dataset was provided, so conversion causes and uplift remain unproven.
- Review Search Console indexing and country query performance after deployment. Search rankings and answer-engine citations are not guaranteed by schema.

Do not mark the source workbook's manual scenarios Passed based only on unit tests.

Final validation: 42/42 Node regression tests passed; final production build passed; 155/155 sitemap URLs passed the local HTTP SEO audit; USD premium API returned 6.99. Country guide visually inspected in the in-app browser at desktop and 390px mobile width. This does not establish real iPhone Safari behavior.
