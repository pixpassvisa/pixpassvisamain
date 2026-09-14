import { cache } from "react";
import { Metadata } from "next";
import specs from "../data/countries-specs.json";
import moneyPages from "../data/money-pages.json";
import toolPages from "../data/tool-seo-pages.json";
import specialPages from "../data/special-photo-pages.json";
import { getSpecIdFromSlug, SpecEntry, getShortId } from "./slug-utils";

// Pre-build O(1) Map lookups at module initialization
const toolPagesMap = new Map<string, (typeof toolPages)[number]>(
  toolPages.map((p) => [p.slug, p])
);

const moneyPagesMap = new Map<string, (typeof moneyPages)[number]>(
  moneyPages.map((p) => [p.slug, p])
);

const specialPagesMap = new Map<string, (typeof specialPages)[number]>(
  specialPages.map((p) => [p.slug, p])
);

const specsMap = new Map<string, SpecEntry>(
  (specs as SpecEntry[]).map((s) => [s.id, s])
);

export type RouteData =
  | { type: "tool"; data: (typeof toolPages)[number] }
  | { type: "money"; data: (typeof moneyPages)[number] }
  | { type: "special"; data: (typeof specialPages)[number] }
  | { type: "spec"; data: SpecEntry; canonicalSlug: string; isVisaUrl: boolean };

/**
 * Fast O(1) route lookup cached per request via React cache.
 * Eliminates redundant linear array searches across generateMetadata and Page execution.
 */
export const getRouteBySlug = cache((slug: string): RouteData | null => {
  // 1. Tool Page Lookup
  const toolPage = toolPagesMap.get(slug);
  if (toolPage) return { type: "tool", data: toolPage };

  // 2. Money Page Lookup
  const moneyPage = moneyPagesMap.get(slug);
  if (moneyPage) return { type: "money", data: moneyPage };

  // 3. Special Page Lookup
  const specialPage = specialPagesMap.get(slug);
  if (specialPage) return { type: "special", data: specialPage };

  // 4. Country Spec Lookup
  const specId = getSpecIdFromSlug(slug);
  if (specId) {
    const spec = specsMap.get(specId);
    if (spec) {
      const isVisaUrl = slug.includes("visa");
      const normalizedBase = getShortId(
        spec.country
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
      const canonicalSlug = isVisaUrl
        ? `${normalizedBase}-visa-photo-editor`
        : `${normalizedBase}-passport-photo-editor`;

      return { type: "spec", data: spec, canonicalSlug, isVisaUrl };
    }
  }

  return null;
});

interface MetadataOptions {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  openGraph?: Record<string, any>;
}

/**
 * Shared metadata factory to standardize and deduplicate SEO metadata construction.
 */
export function createMetadata({
  title,
  description,
  canonical,
  keywords,
  openGraph,
}: MetadataOptions): Metadata {
  return {
    title: { absolute: title },
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical,
      languages: {
        en: canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "PixPassVisa",
      type: "website",
      ...openGraph,
    },
  };
}
