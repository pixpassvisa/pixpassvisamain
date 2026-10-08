import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/slug-utils";
import { getRouteBySlug } from "@/lib/slug-router";
import { getAllUKPages } from "@/lib/uk-content";
import { getAllCAPages } from "@/lib/ca-content";
import { getAllGermanGuides } from "@/lib/de-guides";
import { getBlogPosts } from "@/lib/blog-posts";
import routes from "@/data/route-manifest.json";
import seoRedirects from "@/data/seo-redirects.json";
import { SITE_URL, isPrivatePath } from "@/lib/seo";
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>(routes);
  for (const slug of getAllSlugs()) {
    const route = getRouteBySlug(slug);
    if (route && (route.type !== "spec" || route.canonicalSlug === slug)) paths.add(`/${slug}`);
  }
  // Actual editorial/link changes, not a date regenerated on each request.
  const dated = new Map<string, string>([
    ["/", "2026-10-07"],
    ["/passport-photos", "2026-10-08"],
    ["/visa-photo", "2026-10-08"],
    ["/passport-photo-checklist", "2026-10-08"],
  ]);
  for (const [prefix, posts] of [["uk", getAllUKPages()], ["ca", getAllCAPages()], ["de/guides", getAllGermanGuides()], ["blog", await getBlogPosts()]] as const) {
    for (const post of posts) {
      const pathname = `/${prefix}/${post.slug}`;
      paths.add(pathname);
      const updated = "updatedAt" in post && post.updatedAt ? String(post.updatedAt) : post.date;
      if (updated && Number.isFinite(Date.parse(updated))) dated.set(pathname, new Date(updated).toISOString());
    }
  }
  const retired = new Set(seoRedirects.map(route => route.source));
  return [...paths].filter(p => !isPrivatePath(p) && !retired.has(p)).sort().map(p => ({
    url: `${SITE_URL}${p}`,
    ...(dated.has(p) ? { lastModified: dated.get(p) } : {}),
    ...(p === "/" || p === "/fr" || p === "/de" ? { alternates: { languages: { en: `${SITE_URL}/`, fr: `${SITE_URL}/fr`, de: `${SITE_URL}/de`, "x-default": `${SITE_URL}/` } } } : {}),
  }));
}
