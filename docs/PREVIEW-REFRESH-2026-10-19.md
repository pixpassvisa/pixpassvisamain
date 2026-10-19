# Preview refresh reliability

Live hard requests to `/preview/000000000000000000000000` reproduced HTTP 500 and support reference `58708827`. The streamed response identified the failing component as the shared footer page directory. Local content directory readers could create missing directories at runtime; the preview deployment trace did not include those source directories. Underlying hosting logs were unavailable.

Guide navigation metadata is now generated and bundled at build time. The footer also catches directory data failures and renders basic navigation, preventing optional navigation from aborting a customer preview or checkout.

Validation: production build succeeded; 44 tests passed, including a simulated read-only filesystem failure; three consecutive local preview requests returned HTTP 200 with the preview loader; the sitemap audit checked 155 pages with no issues. Synthetic IDs were used; no customer photos or payments were accessed.
