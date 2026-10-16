# Homepage and navigation improvements — 16 October 2026

Release prepared for the existing GitHub main branch. Deployment must be verified separately after the push.

- All 154 public sitemap URLs are linked directly from the homepage footer in native expandable groups. Links are present in server-rendered HTML and do not need JavaScript to be discovered.
- The shared English footer exposes the same directory across existing English pages. Existing localized footers are preserved; French and German pages are linked from the homepage.
- Added /site-map with expanded groups, descriptive metadata and a self-referencing canonical.
- Footer, HTML directory and XML sitemap share lib/public-pages.ts. Existing privacy, redirect and incomplete-content exclusions are preserved. Published CMS posts use the same source as the sitemap; count may differ when production CMS content is available.
- Homepage task guidance now distinguishes passport, visa and existing-photo needs, links to the appropriate hubs, includes an all-pages jump link, and explains the preview/purchase workflow.
- Improved homepage heading/description and tool description. Removed unsupported generic compression/signature keywords from shared metadata and corrected the social description.
- Disabled directory link prefetching to avoid loading every destination.

Validation: 17 SEO tests passed; production build and TypeScript passed. Build used a temporary local-only NEXTAUTH_SECRET because production credentials are not present; no environment files changed. Local HTTP audit of all 154 sitemap URLs passed: HTTP 200, canonical matches, titles and descriptions present, no noindex. Generated HTML coverage confirms 154/154 footer links and maximum discovery depth 1. Private routes and query URLs are excluded from the footer. Browser confirmed disclosure expansion and mobile homepage/directory at 390px viewport with no horizontal overflow.

Evidence: review/navigation-2026-10-16 contains original file backups, verification script/results, local SEO audit and mobile screenshot. Publish through the existing frontend deployment workflow; this is not a Sites-hosted project. After deployment verify the public sitemap and homepage, then request recrawling of the homepage and /site-map in Search Console. Link discovery improvements do not guarantee Google indexing.
