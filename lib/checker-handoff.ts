// Keep the original file only in this tab's memory during client navigation.
// Never put photos in URLs, analytics, localStorage or sessionStorage.
type Handoff = { file: File; documentId: string; expiresAt: number };
let pending: Handoff | null = null;
let expiry: ReturnType<typeof setTimeout> | undefined;
const TTL = 5 * 60 * 1000;

export function clearCheckerPhoto() {
  pending = null;
  clearTimeout(expiry);
}

export function stageCheckerPhoto(file: File, documentId: string) {
  clearCheckerPhoto();
  pending = { file, documentId, expiresAt: Date.now() + TTL };
  expiry = setTimeout(clearCheckerPhoto, TTL);
}

export function takeCheckerPhoto(documentId: string, now = Date.now()): File | null {
  const photo = pending;
  clearCheckerPhoto();
  return photo && photo.documentId === documentId && photo.expiresAt > now ? photo.file : null;
}

export function findCheckerDocument<T extends { id: string }>(
  documents: T[], country: string, documentType: string, mapping: Record<string, string>,
): T | undefined {
  const normalize = (code: string) => code === 'CHE' ? 'CH' : code;
  return documents.find(({ id }) => {
    const base = id.replace(/-(passport|visa)$/, '');
    return id.endsWith(`-${documentType}`) && normalize(mapping[base] || base.toUpperCase()) === normalize(country);
  });
}
