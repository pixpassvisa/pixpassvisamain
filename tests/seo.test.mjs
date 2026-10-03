import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { isPrivatePath } from '../lib/seo.ts';
test('private application routes, including localized previews, are noindex candidates', () => {
  for (const p of ['/preview/abc','/fr/preview/abc','/de/preview/abc','/dashboard','/dashboard/photos','/admin','/api/photo/abc','/login','/cloudinary-gallery']) assert.equal(isPrivatePath(p), true, p);
  for (const p of ['/','/passport-photo-checker','/blog','/fr','/de/guides','/privacy-policy']) assert.equal(isPrivatePath(p), false, p);
});
test('public sitemap manifest excludes account and alias routes', () => {
  const routes = JSON.parse(fs.readFileSync('data/route-manifest.json','utf8'));
  assert.ok(routes.includes('/')); assert.ok(routes.includes('/passport-photo-online'));
  assert.equal(routes.length,new Set(routes).size);
  for(const p of routes) { assert.equal(isPrivatePath(p),false,p); assert.ok(!p.includes('[')); assert.ok(!p.startsWith('/de/ratgeber')); }
});
test('homepage structured data has no fabricated rating', () => {
  const page = fs.readFileSync('app/page.tsx','utf8');
  assert.ok(!page.includes('aggregateRating'));
  assert.ok(page.includes('homeFaqs.map'));
});
