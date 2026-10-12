type CheckerEvent = 'checker_started' | 'checker_completed' | 'checker_failed' | 'checker_editor_click' | 'checker_preview_started' | 'checker_preview_ready' | 'checker_preview_failed';

// Reuse the site's configured GA integration and consent state. No new tracker,
// photo data, scores, filenames, IDs, or error details are sent.
export function trackCheckerEvent(event: CheckerEvent) {
  if (typeof window === 'undefined') return;
  const ga = (window as unknown as { gtag?: (command: string, event: string, params: Record<string, string>) => void }).gtag;
  if (typeof ga !== 'function') return;
  try { ga('event', event, { event_category: 'photo_preparation' }); } catch { /* Analytics must not interrupt the photo workflow. */ }
}
