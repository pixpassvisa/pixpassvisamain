const specs = require('../data/countries-specs.json');

function getShortId(id) {
  return id
    .replace("-passport", "")
    .replace("-visa", "")
    .replace("ds-160", "us")
    .replace("united-states", "us")
    .replace("united-kingdom", "uk")
    .replace("united-arab-emirates", "uae");
}

function getCanonicalSlug(id) {
  const base = getShortId(id);
  if (id.includes("visa")) {
    return `${base}-visa-photo-editor`;
  }
  return `${base}-passport-photo-editor`;
}

function buildCanonicalSlug(country, isVisa) {
  const base = country.toLowerCase().replace(/\s+/g, "-");
  const normalizedBase = getShortId(base);
  return isVisa ? `${normalizedBase}-visa-photo-editor` : `${normalizedBase}-passport-photo-editor`;
}

let mismatches = 0;
specs.forEach(spec => {
  const idCanonical = getCanonicalSlug(spec.id);
  const isVisa = spec.id.includes("visa");
  const countryCanonical = buildCanonicalSlug(spec.country, isVisa);
  if (idCanonical !== countryCanonical) {
    console.log(`Mismatch for ${spec.id}: ${idCanonical} vs ${countryCanonical}`);
    mismatches++;
  }
});
console.log(`Done. ${mismatches} mismatches.`);
