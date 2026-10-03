# Deployment and verification

## Frontend on Vercel

Keep the current GitHub repository and project domain settings. Run `npm ci`, `npm run test:seo`, and `npm run build`; `npm run build` regenerates the route manifest. The committed manifest also supports the development server. The build script is now compatible with Windows and Linux. No dependency versions changed.

Confirm existing Vercel environment values are configured: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `MONGODB_URI`, `PASSPORT_API_URL`, `PASSPORT_API_KEY`, Cloudinary and payment/email provider variables used by the application. Set `NEXT_PUBLIC_GA_ID` to the intended property if analytics is wanted. Do not put secrets in Git or browser-exposed environment variables. Keep `NEXTAUTH_URL` consistent with the canonical production host.

`PASSPORT_API_URL` must be the HTTPS base URL of the Render FastAPI service, without a trailing slash (for example, `https://your-service.onrender.com`). `PASSPORT_API_KEY` must exactly match Render's `PHOTO_API_KEY`. After saving either value in Vercel, redeploy so the server routes receive the new runtime configuration. Verify `/api/backend-health`: it returns `healthy` only when both values are set and Render's `/health` endpoint responds successfully.

Use the Vercel preview deployment to verify desktop and mobile navigation, country selection, photo upload, validation, preview, pricing, sandbox payment, and download. Use a provider's test payment mode, not a live charge. Deploy the checked change through the existing repository workflow.

## Backend on Render

Deploy the backend change separately. The noindex middleware does not alter image processing. Keep the existing model files and environment variables. Verify `/health`, country lookup, authorized validation/processing, and protected downloads. Confirm `X-Robots-Tag: noindex, nofollow, noarchive` on responses. Confirm process and download responses use `Cache-Control: private, no-store`.

## Public checks after deployment

- Apex redirects to `https://www.pixpassvisa.com` with the original path and query preserved. Check Vercel domain redirects for loops before changing them.
- Public pages return 200 and a single correct canonical. A nonsense URL returns 404.
- `/sitemap.xml` is XML containing only public canonical pages. `/robots.txt` points to it.
- `/de/ratgeber/<existing-slug>` redirects permanently to `/de/guides/<existing-slug>`.
- `/photo-for-american-visa` redirects to `/us-visa-photo-editor`.
- Account and preview routes have noindex headers. Authentication must still protect access; noindex is not security.
- Do not re-enable the old post-build HTML/sitemap rewriting script.
- Check the production database for content not present in the local JSON/Markdown fallback.

## Rollback

Revert the frontend change set and redeploy the previous Vercel deployment; revert the independent backend middleware change if needed. No database schema or payment API changes are required by this update.
