const allowedEvents = new Set(['page_view', 'razorpay_open']);
/** Keep image IDs, personal details, query parameters and arbitrary metadata out of usage events. */
export function sanitizeAnalyticsPayload(body: Record<string, unknown>) {
  if (typeof body.sessionId !== 'string' || !/^sess_[a-zA-Z0-9_-]{1,100}$/.test(body.sessionId)) return null;
  if (body.type !== undefined && (typeof body.type !== 'string' || !allowedEvents.has(body.type))) return null;
  let url = '';
  if (typeof body.url === 'string' && body.url.startsWith('/') && !body.url.startsWith('//')) {
    const pathname = body.url.split(/[?#]/)[0];
    url = pathname.replace(/^\/(?:fr\/|de\/)?preview\/[^/]+.*$/, '/preview').slice(0,200);
  }
  const duration = typeof body.duration === 'number' && Number.isFinite(body.duration)
    ? Math.max(0, Math.min(Math.floor(body.duration),86400)) : undefined;
  return { sessionId: body.sessionId, type: body.type as string | undefined, url, duration };
}
