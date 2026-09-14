const EXTERNAL_API_BASE_URL = process.env.PASSPORT_API_URL;
const EXTERNAL_API_KEY = process.env.PASSPORT_API_KEY;

export interface ExternalCountry {
  country_code: string;
  country_name: string;
  document_type: string;
  dimensions: string;
}

export interface ExternalProcessResponse {
  status: string;
  result_id: string;
  image_url: string;
  print_sheet_url: string;
  preview_url: string;
  dimensions: string;
  format: string;
  size_kb: number;
  metrics: {
    head_height_pct: number;
    eye_position_pct: number;
    top_margin_pct: number;
    background_valid: boolean;
    background_corrected: boolean;
  };
}

export async function fetchExternalCountries(): Promise<ExternalCountry[]> {
  if (!EXTERNAL_API_BASE_URL) {
    console.error("fetchExternalCountries: PASSPORT_API_URL is not configured");
    return [];
  }

  try {
    const response = await fetch(`${EXTERNAL_API_BASE_URL}/countries`, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch countries: ${response.status} ${response.statusText}`
      );
    }

    const data: unknown = await response.json();

    // Guard: the API must return an array
    if (!Array.isArray(data)) {
      console.error(
        "fetchExternalCountries: unexpected response shape (expected array)",
        data
      );
      return [];
    }

    return data as ExternalCountry[];
  } catch (error) {
    console.error("Error fetching external countries:", error);
    return [];
  }
}

export const countryMapping: Record<string, string> = {
  algeria: "DZ",
  argentina: "AR",
  australia: "AU",
  austria: "AT",
  belgium: "BE",
  bhutan: "BT",
  bulgaria: "BG",
  canada: "CA",
  china: "CN",
  croatia: "HR",
  czechia: "CZ",
  denmark: "DK",
  estonia: "EE",
  finland: "FI",
  france: "FR",
  germany: "DE",
  greece: "GR",
  hungary: "HU",
  iceland: "IS",
  india: "IN",
  indonesia: "ID",
  iran: "IR",
  ireland: "IE",
  iraq: "IQ",
  italy: "IT",
  japan: "JP",
  kazakhstan: "KZ",
  latvia: "LV",
  lithuania: "LT",
  luxembourg: "LU",
  malawi: "MW",
  malta: "MT",
  mexico: "MX",
  nepal: "NP",
  netherlands: "NL",
  "new-zealand": "NZ",
  nigeria: "NI",
  nigerian: "NI",
  ni: "NI",
  ng: "NI",
  nga: "NI",
  norway: "NO",
  poland: "PL",
  portugal: "PT",
  romania: "RO",
  russia: "RU",
  "saudi-arabia": "SA",
  saudi: "SA",
  "schengen-area": "EU",
  "schengen-visa": "EU",
  schengen: "EU",
  icao: "EU",
  "icao-passport": "EU",
  "icao-standard": "EU",
  eu: "EU",
  uae: "AE",
  singapore: "SG",
  slovakia: "SK",
  slovenia: "SI",
  "south-korea": "KR",
  spain: "ES",
  "sri-lanka": "LK",
  srilanka: "LK",
  sweden: "SE",
  switzerland: "CHE",
  swiss: "CHE",
  ch: "CHE",
  che: "CHE",
  tajikistan: "TJ",
  thailand: "TH",
  turkey: "TR",
  "united-arab-emirates": "AE",
  uk: "GB",
  "united-kingdom": "GB",
  us: "US",
  usa: "US",
  general: "US",
};

export async function processExternalPhoto(
  imageFile: Blob | File,
  countryCode: string,
  documentType: string = "passport",
  extraFields: Record<string, string> = {}
): Promise<ExternalProcessResponse> {
  if (!EXTERNAL_API_BASE_URL) {
    throw new Error(
      "External API URL is not configured. Set the PASSPORT_API_URL environment variable. "
    );
  }

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("country_code", countryCode);
  // NOTE: documentType param is accepted but the API always uses "passport".
  // Kept for forward-compatibility; change the hardcoded value if the API
  // starts honouring the document_type field.
  formData.append("document_type", "passport");

  for (const [key, value] of Object.entries(extraFields)) {
    formData.append(key, value);
  }

  const headers: Record<string, string> = {
    accept: "application/json",
  };
  if (EXTERNAL_API_KEY) {
    headers["X-API-Key"] = EXTERNAL_API_KEY;
  }

  const response = await fetch(`${EXTERNAL_API_BASE_URL}/process`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    // Try to surface a structured error from the response body.
    const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
    const message =
      (typeof errorData.detail === "string" && errorData.detail) ||
      (typeof errorData.error === "string" && errorData.error) ||
      `Processing failed: ${response.status} ${response.statusText}`;

    // Fallback to "US" standard config if external API lacks config for the requested country
    if (countryCode !== "US" && message.includes("No config found for country")) {
      console.warn(`[external-api] ${message} — falling back to country_code "EU"`);
      formData.set("country_code", "EU");
      const fallbackRes = await fetch(`${EXTERNAL_API_BASE_URL}/process`, {
        method: "POST",
        headers,
        body: formData,
      });
      if (fallbackRes.ok) {
        const fallbackData = (await fallbackRes.json()) as unknown;
        if (fallbackData && typeof fallbackData === "object" && !Array.isArray(fallbackData)) {
          return fallbackData as ExternalProcessResponse;
        }
      }
    }

    throw new Error(message);
  }

  const data: unknown = await response.json();

  // Basic shape guard to catch silent API contract breaks early.
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(
      "Unexpected response from the photo-processing API — expected a JSON object"
    );
  }

  return data as ExternalProcessResponse;
}