type FunnelEvent = 'photo_selected' | 'photo_processing_started' | 'photo_preview_ready' | 'photo_processing_failed' | 'begin_checkout';

// Reuse the configured analytics integration. Never send filenames, photo IDs,
// email addresses, preview URLs, error messages or arbitrary URL parameters.
export function trackAcquisitionEvent(event: FunnelEvent, documentId?: string) {
  if (typeof window === 'undefined') return;
  const ga = (window as unknown as { gtag?: (command: string, event: string, params: Record<string, string>) => void }).gtag;
  if (typeof ga !== 'function') return;
  const country = documentId?.startsWith('us-') ? 'US'
    : documentId?.startsWith('uk-') || documentId?.startsWith('united-kingdom-') ? 'GB'
    : documentId?.startsWith('australia-') ? 'AU'
    : documentId?.startsWith('germany-') ? 'DE'
    : documentId?.startsWith('france-') ? 'FR' : 'other';
  try {
    ga('event', event, { event_category: 'photo_preparation', ...(documentId ? { document_country: country } : {}) });
  } catch { /* Analytics must never block preparation or payment. */ }
}
