import type { MetadataRoute } from "next";
import { getPublicPages } from "@/lib/public-pages";
import { SITE_URL } from "@/lib/seo";
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await getPublicPages()).map(page => ({
    url: SITE_URL + page.path,
    ...(page.lastModified ? { lastModified: page.lastModified } : {}),
    ...(["/", "/fr", "/de"].includes(page.path) ? { alternates: { languages: { en: SITE_URL + "/", fr: SITE_URL + "/fr", de: SITE_URL + "/de", "x-default": SITE_URL + "/" } } } : {}),
  }));
}
