import specs from "../data/countries-specs.json";
import moneyPages from "../data/money-pages.json";
import toolPages from "../data/tool-seo-pages.json";
import specialPages from "../data/special-photo-pages.json";

export interface SpecEntry {
  id: string;
  country: string;
  name: string;
  flag?: string;
  width_mm: number;
  height_mm: number;
  width_px?: number;
  height_px?: number;
  head_min_pct?: number;
  head_max_pct?: number;
  eye_min_pct?: number;
  eye_max_pct?: number;
  bg_color?: string;
  print_size?: string;
  price: number;
  passportcontent?: string;
  visacontent?: string;
  local_price?: {
    currency: string;
    symbol: string;
    amount: number;
  };
  hero_photo?: string;
}

/**
 * Normalizes a country ID or name to its SEO-preferred short version.
 */
export function getShortId(id: string): string {
  return id
    .replace("-passport", "")
    .replace("-visa", "")
    .replace("ds-160", "us")
    .replace("united-states", "us")
    .replace("united-kingdom", "uk")
    .replace("united-arab-emirates", "uae")
    .replace("icao-/-eu", "icao")
    .replace("icao-eu", "icao");
}

/**
 * Generates the single canonical slug for a given spec ID.
 */
export function getCanonicalSlug(id: string): string {
  const base = getShortId(id);
  if (id.includes("visa")) {
    return `${base}-visa-photo-editor`;
  }
  return `${base}-passport-photo-editor`;
}

const specIdCache = new Map<string, string | null>();

/**
 * Maps a URL slug to a specification ID.
 * Uses a prebuilt cache for O(1) lookup speed after first resolution.
 */
export function getSpecIdFromSlug(slug?: string): string | null {
  if (!slug) return null;
  if (specIdCache.has(slug)) return specIdCache.get(slug)!;
  
  // Normalize by removing common suffixes
  const base = slug.replace(/-photo-editor$/, "").replace(/-photo$/, "");
  const isVisaIntent = base.includes("visa");
  const isPassportIntent = base.includes("passport");
  
  let result: string | null = null;

  // 1. Direct match with current IDs
  const directMatch = specs.find(s => s.id === base);
  if (directMatch) {
    result = directMatch.id;
  } else if (base === "us-visa" || base === "united-states-visa" || base === "ds-160-visa") {
    result = "us-visa";
  } else if (base === "us-passport" || base === "united-states-passport") {
    result = "us-passport";
  } else if (base === "uk-passport" || base === "united-kingdom-passport") {
    result = "uk-passport";
  } else {
    // 3. Match by normalized country name and intent
    const shortBase = getShortId(base);
    
    // Priority 1: Match with specific intent (e.g. searching for a visa spec)
    const exactIntentMatch = specs.find(s => {
      const sShortId = getShortId(s.id);
      if (sShortId !== shortBase) return false;
      if (isVisaIntent && s.id.includes("visa")) return true;
      if (isPassportIntent && (s.id.includes("passport") || !s.id.includes("visa"))) return true;
      return false;
    });

    if (exactIntentMatch) {
      result = exactIntentMatch.id;
    } else {
      // Priority 2: Fallback to any spec for that country (Passport usually)
      const countryMatch = specs.find(s => {
        const sShortId = getShortId(s.id);
        return sShortId === shortBase;
      });
      result = countryMatch?.id || null;
    }
  }

  specIdCache.set(slug, result);
  return result;
}

/**
 * Returns ONLY the canonical slug for a specification.
 */
export function getSlugsForSpec(spec: SpecEntry): string[] {
  return [getCanonicalSlug(spec.id)];
}

/**
 * Returns all canonical slugs for root-level pages (Passport, Visa, & Money Pages).
 * Ensures every country gets BOTH a passport and visa slug for maximum SEO coverage.
 */
export function getAllSlugs(): string[] {
  const slugs = new Set<string>();
  
  // 1. Process Country Specs
  const uniqueCountries = Array.from(new Set(specs.map(s => s.country)));
  
  uniqueCountries.forEach(country => {
    const base = country.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    // Normalize certain country bases to match SEO preferences (e.g. United States -> us)
    const normalizedBase = getShortId(base);
    
    slugs.add(`${normalizedBase}-passport-photo-editor`);
    slugs.add(`${normalizedBase}-visa-photo-editor`);
  });

  // 2. Also ensure existing specific IDs are covered (e.g. us-visa)
  (specs as SpecEntry[]).forEach(spec => {
    slugs.add(getCanonicalSlug(spec.id));
  });

  // 3. Money Pages
  moneyPages.forEach(page => {
    slugs.add(page.slug);
  });

  // 4. Tool SEO Pages
  toolPages.forEach(page => {
    slugs.add(page.slug);
  });

  // 5. Special Photo Pages
  specialPages.forEach(page => {
    slugs.add(page.slug);
  });

  return Array.from(slugs);
}

