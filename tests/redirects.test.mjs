import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canonicalRedirects } from '../lib/redirect-rules.mjs';

test('aliases and legacy silos land directly on the canonical HTTPS destination', () => {
  const result = canonicalRedirects([
    { source: '/old', destination: '/intermediate', permanent: true },
    { source: '/intermediate', destination: '/final', permanent: true },
    { source: '/photo/:slug', destination: '/:slug', permanent: true },
  ]);
  for (const path of ['/old', '/intermediate', '/photo/old', '/visa-photo/old']) {
    assert.equal(result.find(r => r.source === path).destination, 'https://www.pixpassvisa.com/final');
  }
  assert.ok(result.findIndex(r => r.source === '/photo/old') < result.findIndex(r => r.source === '/photo/:slug'));
  assert.equal(result.find(r => r.source === '/photo/:slug').destination, 'https://www.pixpassvisa.com/:slug');
});

test('configuration fails instead of publishing a redirect cycle', () => {
  assert.throws(() => canonicalRedirects([
    { source: '/a', destination: '/b', permanent: true },
    { source: '/b', destination: '/a', permanent: true },
  ]), /Redirect cycle/);
});
