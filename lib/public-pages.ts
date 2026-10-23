import { cache } from "react";
import { pageLabel, pageGroup } from "./page-directory";
import { getAllSlugs } from "@/lib/slug-utils";
import { getRouteBySlug } from "@/lib/slug-router";
import localGuides from "@/data/local-guide-index.json";
import { getBlogPosts } from "@/lib/blog-posts";
import routes from "@/data/route-manifest.json";
import seoRedirects from "@/data/seo-redirects.json";
import { isPrivatePath } from "@/lib/seo";
import { hasDocumentPreset } from "@/lib/document-intent";
import { reviewedPhotoGuides, PHOTO_GUIDE_REVIEW_DATE } from "@/lib/reviewed-photo-guides";
import { priorityCountryGuides, COUNTRY_GUIDE_DATE } from "@/lib/priority-country-guides";
export const getPublicPages = cache(async () => {
  const paths = new Set<string>([...routes, "/site-map"]);
  const titles = new Map<string, string>();
  // Reviewed country guidance has its own substantive application workflow,
  // even when there is no corresponding paid preparation preset.
  for (const slug of Object.keys(reviewedPhotoGuides)) paths.add(`/${slug}`);
  for (const slug of getAllSlugs()) {
    const route = getRouteBySlug(slug);
    // Keep incomplete document guidance accessible through the directories, but
    // do not submit country-name-only placeholders as finished search pages.
    if (route && (route.type !== "spec" || (route.canonicalSlug === slug &&
      (hasDocumentPreset(route.data, route.isVisaUrl) || route.data.id === "icao-passport")))) paths.add(`/${slug}`);
  }
  // Actual editorial/link changes, not a date regenerated on each request.
  const dated = new Map<string, string>([
    ["/passport-size-photo-maker", "2026-10-12"],
    ["/uk-passport-photo-requirements-tool", "2026-10-12"],
    ["/visa-photo-validator", "2026-10-12"],
    ["/de/guides", "2026-10-12"],
    ["/fr/guides", "2026-10-12"],
    ["/blog", "2026-10-12"],
    ["/", "2026-10-16"],
    ["/site-map", "2026-10-16"],
    ["/passport-photos", "2026-10-08"],
    ["/visa-photo", "2026-10-08"],
    ["/passport-photo-checklist", "2026-10-08"],
  ]);
  for (const slug of Object.keys(reviewedPhotoGuides)) dated.set(`/${slug}`, PHOTO_GUIDE_REVIEW_DATE);
  for (const [slug, guide] of Object.entries(priorityCountryGuides)) {
    paths.add(`/${slug}`);
    dated.set(`/${slug}`, COUNTRY_GUIDE_DATE);
    titles.set(`/${slug}`, guide.title);
  }
  for (const pathname of ['/de/guides', '/uk-passport-photo-requirements-tool', '/passport-photo-online', '/passport-photos', '/visa-photo']) dated.set(pathname, PHOTO_GUIDE_REVIEW_DATE);
  for (const [prefix, posts] of [["uk", localGuides.filter(g=>g.prefix==='uk')], ["ca", localGuides.filter(g=>g.prefix==='ca')], ["de/guides", localGuides.filter(g=>g.prefix==='de/guides')], ["blog", await getBlogPosts()]] as const) {
    for (const post of posts) {
      const pathname = `/${prefix}/${post.slug}`;
      paths.add(pathname);
      titles.set(pathname, post.title);
      const updated = "updatedAt" in post && post.updatedAt ? String(post.updatedAt) : post.date;
      if (updated && Number.isFinite(Date.parse(updated))) dated.set(pathname, new Date(updated).toISOString());
    }
  }
  for (const pathname of ["/passport-photo-sizes", "/passport-photo-online", "/faq", "/fr/passport-photo-online", "/de/passbild-online"]) dated.set(pathname, "2026-10-16");
  const retired = new Set(seoRedirects.map(route => route.source));
  for (const pathname of ['/', '/us-passport-photo-editor', '/uk-passport-photo-editor', '/uk-passport-size-photo-maker', '/australian-passport-photo-checker']) dated.set(pathname, '2026-10-23');
  return [...paths].filter(p => !isPrivatePath(p) && !retired.has(p)).sort().map(path => ({
    path,
    title: pageLabel(path, titles.get(path)),
    group: pageGroup(path),
    lastModified: dated.get(path),
  }));
});
