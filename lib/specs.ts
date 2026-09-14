import specsData from "@/data/countries-specs.json";
import { DocumentType } from "@/app/passport-photo-online/types";
import { countryMapping } from "./external-api";

export const SUPPORTED_COUNTRIES = [
  "DZ", "AU", "AT", "BE", "BG", "BT", "CA", "CN", "HR", "CZ", "DK", "EE",
  "FI", "FR", "DE", "GR", "HU", "IN", "ID", "IR", "IQ", "IT",
  "JP", "KZ", "LV", "LT", "LU", "MW", "MT", "MX", "NP", "NL", "NZ", "NO", "PL",
  "PT", "RO", "RU", "SA", "EU", "SG", "SK", "SI", "KR", "ES", "LK", "SE", "CHE", "CH",
  "TJ", "TH", "TR", "AE", "GB", "US", "NI", "NG"
];

export interface CountrySpec {
  id: string;
  name: string;
  country: string;
  flag: string;
  width_mm: number | string;
  height_mm: number | string;
  width_px: number | string;
  height_px: number | string;
  head_min_pct: number | string;
  head_max_pct: number | string;
  eye_min_pct: number | string;
  eye_max_pct: number | string;
  bg_color: string;
  price: number;
  print_size: "A4" | "Letter";
  head_top_multiplier?: number;
  dpi?: number;
}

export const allSpecs = specsData as CountrySpec[];

// ---------------------------------------------------------------
// getSpecById — resolves a document-type slug to a CountrySpec.
//
// BUG FIX: The old function returned `undefined` for any slug that
// collapsed to just the country name (e.g. "nigeria" from
// "nigeria-photo"), causing route.ts to silently fall back to
// US passport defaults (50–69% head range) for country specs that
// require 70–80%. This caused hair to be cropped on those photos.
//
// Fix strategy:
//  1. Direct match (unchanged)
//  2. Strip known suffixes, then try -passport, -visa, exact (unchanged)
//  3. NEW: Try treating the base as a country name fragment and
//     searching for any spec whose id starts with that base.
//     Prefers -passport over -visa over anything else.
//  4. Special hardcoded overrides (unchanged + extended)
// ---------------------------------------------------------------
export const UK_DOC_NAMES: Record<string, string> = {
  "uk-passport": "United Kingdom Passport",
  "uk-passport-online": "UK Passport (Digital Upload)",
  "uk-passport-offline": "UK Passport (Paper / Printed)",
  "uk-driving": "UK Driving Licence (DVLA)",
  "uk-driving-licence": "UK Driving Licence (DVLA)",
  "uk-visa": "UK Visa / Residence Permit (BRP)",
  "uk-oyster": "Oyster Photocard",
  "uk-railcard": "UK Railcard",
  "uk-bus": "UK Bus Pass",
  "uk-bno": "UK BNO Passport",
  "uk-seamans-card": "British Seaman's Card",
  "uk-seamans-discharge": "British Seaman's Discharge Book",
  "uk-london-freedom": "London Freedom Pass",
  "uk-firearms": "UK BASC Firearms Licence",
  "uk-basc": "UK BASC Firearms Licence",
  "uk-arc": "UK Application Registration Card (ARC)",
  "uk-boat": "UK Boat Licence",
  "uk-id": "UK ID / Residence Card",
  "uk-leisure": "UK Leisure Pass",
  "uk-school": "UK School Card",
};

export const CA_DOC_NAMES: Record<string, string> = {
  "canada-passport": "Canada Passport (50x70 mm)",
  "canada-passport-online": "Canada Passport (Digital Upload)",
  "canada-passport-offline": "Canada Passport (Paper / Printed 50x70 mm)",
  "canada-visa": "Canada Visa (35x45 mm)",
  "canada-visa-online": "Canada Visa / Study / Work Permit (IRCC 35x45 mm)",
  "canada-pr-card": "Canada Permanent Resident (PR) Card (50x70 mm)",
  "canada-citizenship": "Canada Citizenship (50x70 mm)",
  "canada-firearms": "Canada PAL Firearms Licence (RCMP)",
  "canada-super-visa": "Canada Super Visa (35x45 mm)",
  "canada-express-entry": "Canada Express Entry Digital Photo",
  "canada-driving": "Canada Driving Licence / Provincial ID",
  "canada-security": "Canada Security Guard Licence",
};

export function getSpecById(id: string): CountrySpec | undefined {
  if (!id) return undefined;
  const cleanId = id.toLowerCase().trim();

  // 0. France custom options override
  if (cleanId.startsWith("france-")) {
    const franceSpec = allSpecs.find((s) => s.id === "france-passport");
    if (franceSpec) return franceSpec;
  }

  // 0.1 UK custom options override
  if (cleanId.startsWith("uk-") || cleanId.startsWith("gb-") || cleanId === "uk" || cleanId === "gb") {
    const ukSpec = allSpecs.find((s) => s.id === "uk-passport");
    if (ukSpec) {
      const customName = UK_DOC_NAMES[cleanId];
      return {
        ...ukSpec,
        id: cleanId,
        name: customName || ukSpec.name,
      };
    }
  }

  // 0.2 Canada custom options override
  if (cleanId.startsWith("canada-") || cleanId.startsWith("ca-") || cleanId === "canada" || cleanId === "ca") {
    const isVisaDoc = cleanId.includes("visa") || cleanId.includes("study") || cleanId.includes("work") || cleanId.includes("super-visa") || cleanId.includes("express-entry");
    const targetSpecId = isVisaDoc ? "canada-visa" : "canada-passport";
    const caSpec = allSpecs.find((s) => s.id === targetSpecId) || allSpecs.find((s) => s.id === "canada-passport");
    if (caSpec) {
      const customName = CA_DOC_NAMES[cleanId];
      return {
        ...caSpec,
        id: cleanId,
        name: customName || caSpec.name,
      };
    }
  }

  // 1. Direct match (case-insensitive)
  const direct = allSpecs.find((s) => s.id.toLowerCase() === cleanId);
  if (direct) return direct;

  // 2. Strip known URL suffixes to get the base slug
  const base = cleanId
    .replace(/-photo-editor-tool$/, "")
    .replace(/-editor-tool$/, "")
    .replace(/-photo-editor$/, "")
    .replace(/-photo$/, "")
    .replace(/-editor$/, "")
    .trim();

  // 3. Try exact base, then base-passport, then base-visa
  const byBase =
    allSpecs.find((s) => s.id === base) ||
    allSpecs.find((s) => s.id === `${base}-passport`) ||
    allSpecs.find((s) => s.id === `${base}-visa`);
  if (byBase) return byBase;

  // 4. Special hardcoded overrides
  if (base.includes("icao") || base === "eu" || base === "eu-passport" || base === "eu-visa" || base === "european-union") {
    return allSpecs.find((s) => s.id === "icao-passport") || allSpecs.find((s) => s.id === "schengen-visa");
  }
  if (base === "us-visa" || base === "ds-160") return allSpecs.find((s) => s.id === "ds-160-visa");
  if (base === "general" || base === "u-s-a" || base === "usa" || base === "us") return allSpecs.find((s) => s.id === "us-passport");
  if (base === "belguim" || base === "belgium") return allSpecs.find((s) => s.id === "belgium-passport");
  if (base === "uk" || base === "united-kingdom" || base === "gb") return allSpecs.find((s) => s.id === "uk-passport");
  if (base === "in" || base === "india") return allSpecs.find((s) => s.id === "india-passport");
  if (base === "switzerland" || base === "che" || base === "ch" || base === "swiss") return allSpecs.find((s) => s.id === "switzerland-passport");
  if (base === "nigeria" || base === "ni" || base === "ng" || base === "nigerian") return allSpecs.find((s) => s.id === "nigeria-passport");

  // Country code mappings fallback (e.g., if id is "EU-passport", "IN-passport", "GB-passport", etc.)
  const codeToSpec: Record<string, string> = {
    EU: "icao-passport",
    GB: "uk-passport",
    UK: "uk-passport",
    US: "us-passport",
    IN: "india-passport",
    FR: "france-passport",
    DE: "germany-passport",
    AU: "australia-passport",
    CA: "canada-passport",
    CHE: "switzerland-passport",
    CH: "switzerland-passport",
    NI: "nigeria-passport",

  };
  const parts = cleanId.split("-");
  const countryCodeUpper = parts[0].toUpperCase();
  if (codeToSpec[countryCodeUpper]) {
    const foundByCode = allSpecs.find((s) => s.id === codeToSpec[countryCodeUpper]);
    if (foundByCode) return foundByCode;
  }

  // ---------------------------------------------------------------
  // BUG FIX — Country-name fragment fallback.
  // Search for any spec whose id STARTS WITH the base fragment.
  // ---------------------------------------------------------------
  const passportFallback = allSpecs.find((s) => s.id.startsWith(`${base}-`) && s.id.endsWith("-passport"));
  if (passportFallback) return passportFallback;

  const visaFallback = allSpecs.find((s) => s.id.startsWith(`${base}-`) && s.id.endsWith("-visa"));
  if (visaFallback) return visaFallback;

  const anyFallback = allSpecs.find((s) => s.id.startsWith(`${base}-`));
  if (anyFallback) return anyFallback;

  return undefined;
}

// ---------------------------------------------------------------
// getSafeSpec — always returns a spec, never undefined.
// Use this in route.ts instead of getSpecById() to make the
// fallback to US passport explicit and logged, not silent.
// ---------------------------------------------------------------
export function getSafeSpec(id: string): CountrySpec {
  const spec = getSpecById(id);
  if (!spec) {
    console.warn(`[specs] No spec found for id="${id}", falling back to us-passport`);
    return allSpecs.find((s) => s.id === "us-passport")!;
  }
  return spec;
}

export function getDocumentTypes(): DocumentType[] {
  return allSpecs.map((s) => ({
    id: s.id,
    label: s.name,
    size:
      s.width_mm !== "unspecified" && s.height_mm !== "unspecified"
        ? `${s.width_mm}×${s.height_mm} mm (${s.width_px}×${s.height_px} px)`
        : `${s.width_px}×${s.height_px} px`,
    bg_color: s.bg_color,
    country: s.country,
    flag: s.flag,
    price: s.price,
    printSize: s.print_size,
  }));
}

export function getFilteredDocumentTypes(): DocumentType[] {
  const all = getDocumentTypes();
  return all.filter((d) => {
    const slug = d.id.replace(/-passport$/, "").replace(/-visa$/, "");
    const code = countryMapping[slug] || slug.toUpperCase();
    return SUPPORTED_COUNTRIES.includes(code);
  });
}

export function getFilteredSpecs(): CountrySpec[] {
  return allSpecs.filter((s) => {
    const slug = s.id.replace(/-passport$/, "").replace(/-visa$/, "");
    const code = countryMapping[slug] || slug.toUpperCase();
    return SUPPORTED_COUNTRIES.includes(code);
  });
}