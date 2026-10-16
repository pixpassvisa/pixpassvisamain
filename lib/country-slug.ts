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
