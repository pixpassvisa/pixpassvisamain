import { test } from 'node:test';
import assert from 'node:assert/strict';
import loadTs from './load-ts.mjs';
const { trackAcquisitionEvent } = loadTs('lib/acquisition-events.ts');

test('funnel analytics emits only coarse document country, never arbitrary identifiers', () => {
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  try {
    trackAcquisitionEvent('photo_selected', 'uk-passport');
    trackAcquisitionEvent('photo_processing_failed', 'private-photo-id@example.com');
    trackAcquisitionEvent('begin_checkout');
    assert.equal(calls[0][2].document_country, 'GB');
    assert.equal(calls[1][2].document_country, 'other');
    assert.equal('document_country' in calls[2][2], false);
    assert.equal(JSON.stringify(calls).includes('private-photo-id'), false);
  } finally { delete globalThis.window; }
});

test('missing or failing analytics does not interrupt the workflow', () => {
  assert.doesNotThrow(() => trackAcquisitionEvent('photo_preview_ready', 'us-passport'));
  globalThis.window = { gtag: () => { throw new Error('blocked'); } };
  try { assert.doesNotThrow(() => trackAcquisitionEvent('begin_checkout')); }
  finally { delete globalThis.window; }
});
