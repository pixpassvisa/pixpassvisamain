const labels: Record<string, string> = {
  "/": "Home", "/site-map": "All pages", "/uk": "UK passport photo guides",
  "/ca": "Canada passport and visa photo guides", "/fr": "Accueil — français",
  "/de": "Startseite — Deutsch", "/blog": "Passport and visa photo advice",
  "/passport-photos": "Passport photo guides by country", "/visa-photo": "Visa photo guides by country",
  "/passport-photo-online": "Create a passport or visa photo",
  "/visa-photo-validator": "Free visa photo validator",
  "/faq": "Frequently asked questions", "/de/guides": "Ratgeber — Deutsch",
  "/fr/guides": "Guides — français", "/fr/photo-identite-en-ligne": "Créer une photo d’identité",
  "/de/passbild-online": "Passbild online erstellen",
};
export function pageLabel(path: string, title?: string): string {
  if (title) return title.replace(/\s*[|–—]\s*(?:PixPassVisa|pixpassvisa\.com).*$/i, "");
  if (labels[path]) return labels[path];
  const words = path.split("/").pop()!.split("-").map(word =>
    /^(us|uk|uae|eu|icao|hmpo|dv|id|ants|cni)$/.test(word) ? word.toUpperCase() : word);
  const result = words.join(" ");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
export const directoryGroups = ["Tools and checkers", "Passport guides", "Visa guides", "Photo advice", "Français", "Deutsch", "Help and company"];
export function pageGroup(path: string): string {
  if (/^\/fr(?:\/|$)/.test(path)) return "Français";
  if (/^\/de(?:\/|$)/.test(path)) return "Deutsch";
  if (/^\/(blog|uk|ca)(\/|$)/.test(path)) return "Photo advice";
  if (path === "/passport-photos" || /passport-photo-editor$/.test(path)) return "Passport guides";
  if (path === "/visa-photo" || /visa-photo-editor$/.test(path)) return "Visa guides";
  if (/photo|checker|validator|resizer/.test(path)) return "Tools and checkers";
  return "Help and company";
}
