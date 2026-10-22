# Payment visibility and support — local review

Release approved on 22 October 2026. Branch: `codex/payment-visibility-support`.

## Review screens

- `/preview/checkout-review`: development-only interactive review with fictional records, customer guidance and a simulated contact submission. Requires `CHECKOUT_REVIEW_DEMO=1`; returns 404 in production and on Vercel. Excluded from sitemap generation.
- `/admin/payment-attempts`: admin-only, paginated attempt history; exact email/reference/gateway ID search and outcome filter. Counts cover the last seven days. Refresh to update.
- `/admin/support`: admin-only requests, notification delivery status, checkout lookup and reply action.
- `/contact`: live-form implementation, disabled safely until Turnstile is configured.

## What is captured

The browser first requests a durable checkout reference, before loading the SDK. Standard photo checkout, premium upgrades and standalone expert edits use this flow. The application records the email and photo/document association, pay click, SDK load failure, gateway-order creation, checkout open/close, browser-reported error codes, and verification delays. Order creation is claimed once per checkout reference to avoid duplicate gateway orders from a replay of the same attempt.

The gateway order contains `checkoutReference` in its notes. Successful API responses record the actual gateway order ID, amount, currency and live/test mode. Signed webhooks record gateway-confirmed results and code/source/step/reason. Signed browser verification records its result separately. Raw card details, gateway payloads, signatures and raw IPs are not added to diagnostics. Attempt tokens are random, stored as hashes, expire for writes after 24 hours, and are excluded from admin queries.

Browser reports cannot confirm payment or overwrite gateway-confirmed outcomes. Delayed failure events cannot downgrade captured diagnostics. Failures before the gateway accepts an order cannot appear in its dashboard. A disconnected browser may deliver no final event: these remain explicitly unconfirmed, not inferred failed or abandoned. Existing historical visits cannot be reconstructed. Preflight failures caused by database/network loss cannot be persisted; the customer receives support guidance.

## Contact protection and delivery

Required: email, issue category and a 10–1,500 character message. Reference is optional. No attachments or customer auto-response email. Notifications go only to `support@pixpassvisa.com`; validated customer email is Reply-To. Message content is plain text. Requests are saved before notification, including provider failures, and visible to authenticated administrators.

Server-side Turnstile verification validates success, hostname and `contact` action. Missing configuration, verification outages and database failures fail closed. Origin validation, bounded JSON parsing and a honeypot provide additional checks. MongoDB `_id` uniqueness makes cooldown reservations atomic across instances. Separate HMAC keys limit both IP and normalized email to one submission per rolling five-minute window; failures also consume the window. A three-second pre-verification throttle limits rapid challenge requests. TTL removes expired keys but does not determine cooldown correctness.

IP headers are trusted only on Vercel, which sanitizes `x-forwarded-for`; other public hosting fails closed until adapted to a trusted proxy. People sharing a public IP share a cooldown. This does not prevent all abuse from distributed networks or humans solving challenges. SMTP mail sent directly to the visible support address is outside the application's rate limiter.

Diagnostic/support collections have 90-day TTL indexes. Deletion is asynchronous. Permanent Order/Payment records remain separate. Privacy text describes these additions.

## Configuration before any approved release

1. Create a Cloudflare Turnstile widget restricted to the production hostname. Configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and server-only `TURNSTILE_SECRET_KEY`; rebuild for the public key. Do not use test keys in production.
2. Keep `NEXT_PUBLIC_APP_URL=https://www.pixpassvisa.com`. Configure a random `CONTACT_RATE_LIMIT_SECRET` (or the existing NEXTAUTH_SECRET fallback). Confirm Vercel supplies `VERCEL=1` and its sanitized forwarded IP.
3. Confirm MongoDB connection and create/verify the CheckoutAttempt, SupportRequest and RequestLimit indexes. Do not disable unique/TTL index provisioning without creating these indexes separately.
4. Confirm Resend sender configuration and that `support@pixpassvisa.com` is monitored. Contact requests use this fixed recipient. No real email was sent during local verification.
5. In the matching Razorpay live/test dashboard, verify webhook URL `/api/webhooks/razorpay`, signing secret, and subscriptions for `payment.failed`, `payment.captured`, and `order.paid`. No live merchant configuration was changed or inspected.
6. Run test-mode payments and Turnstile/Resend staging checks before enabling for customers. This local review uses isolated mocks, not real payments or customer records.

## References

- [Razorpay payment webhook payloads](https://github.com/razorpay/markdown-docs/blob/master/webhooks/payments.md)
- [Razorpay error fields](https://github.com/razorpay/markdown-docs/blob/master/errors.md)
- [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Vercel trusted request headers](https://vercel.com/docs/headers/request-headers)

## Validation completed

- Production build passed, including TypeScript and 263 generated pages.
- 31 targeted tests passed: existing checkout/footer coverage plus 14 payment/support security and failure-path tests. Test doubles isolate database, gateway and email calls; no live MongoDB concurrency or external-provider test is claimed.
- Browser review at a narrow viewport: expanded gateway diagnostic card and simulated contact submission successfully rendered; confirmation clearly states that no email was sent.
- Final diff whitespace check passed. Changed source files are mirrored into the active `frontend/` copy.
- Local review: `http://127.0.0.1:3100/preview/checkout-review`. No Git push, real email, real payment or hosting configuration change.

Release check: corrected the Mongoose event subdocument schema and added validation against the real model. Production build and 31 tests pass. Live verification is recorded separately after deployment.
