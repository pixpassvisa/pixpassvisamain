import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { isPrivatePath } from '../lib/seo.ts';
import loadTs from './load-ts.mjs';
const { getRouteBySlug } = loadTs('lib/slug-router.ts');
const { getAllSlugs } = loadTs('lib/slug-utils.ts');
const { hasDocumentPreset } = loadTs('lib/document-intent.ts');
const { applyReviewedBlogContent } = loadTs('lib/reviewed-blog-content.ts');
const { sanitizeAnalyticsPayload } = loadTs('lib/analytics-payload.ts');
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
  const sharedChecker = fs.readFileSync('app/components/PhotoCheckerTool.tsx','utf8');
  assert.ok(!sharedChecker.includes('17,000') && !sharedChecker.includes('4.9'));
});
test('representative editor routes resolve their intended presets or disclose missing intent', () => {
  for (const [slug,id,matched] of [
    ['us-passport-photo-editor','us-passport',true],
    ['us-visa-photo-editor','us-visa',true],
    ['schengen-visa-photo-editor','schengen-visa',true],
    ['india-passport-photo-editor','india-passport',true],
    ['algeria-passport-photo-editor','algeria-passport',true],
    ['australia-visa-photo-editor','australia-passport',false],
  ]) {
    const route = getRouteBySlug(slug);
    assert.equal(route?.type,'spec',slug);
    assert.equal(route.data.id,id,slug);
    assert.equal(route.canonicalSlug,slug,slug);
    assert.equal(hasDocumentPreset(route.data,route.isVisaUrl),matched,slug);
  }
  for(const slug of ['algeria','algeria-passport','australia-photo','made-up-visa-photo-editor','us-visa-photo-editor-extra']) assert.equal(getRouteBySlug(slug),null,slug);
});
test('exact ICAO redirects are unique, terminate at a live route and leave the sitemap inventory', () => {
  const redirects = JSON.parse(fs.readFileSync('data/seo-redirects.json','utf8'));
  const sources = new Set(redirects.map(r=>r.source));
  assert.equal(sources.size,redirects.length);
  for(const r of redirects) {
    assert.equal(r.permanent,true);
    assert.ok(!r.source.includes(':') && !r.source.includes('*'));
    assert.ok(!sources.has(r.destination),'no chain');
    assert.ok(getRouteBySlug(r.destination.slice(1)),'valid destination');
    assert.ok(!getAllSlugs().includes(r.source.slice(1)),'retired slug not generated');
  }
});
test('dated editorial corrections apply to DB-like and local records without replacing future CMS edits', () => {
  const slug = 'uk-visa-photo-requirements';
  const [fixed] = applyReviewedBlogContent([{slug,content:'old universal passport rules',date:'2026-08-12'}]);
  assert.equal(fixed.date,'2026-08-12');
  assert.equal(fixed.updatedAt,'2026-10-06');
  assert.match(fixed.content,/visa application centre/);
  const future = {slug,updatedAt:'2026-10-07',content:'future reviewed edit'};
  assert.equal(applyReviewedBlogContent([future])[0],future);
  const unrelated = {slug:'another-post',content:'keep me'};
  assert.equal(applyReviewedBlogContent([unrelated])[0],unrelated);
});
test('analytics discards image IDs, query parameters and arbitrary metadata', () => {
  const payload = sanitizeAnalyticsPayload({sessionId:'sess_test123',type:'page_view',url:'/de/preview/private-photo-id?token=secret',metadata:{photo:'raw facial data',email:'private@example.invalid'},duration:Infinity});
  assert.equal(payload.url,'/preview');
  assert.equal(payload.duration,undefined);
  assert.equal('metadata' in payload,false);
  assert.equal(sanitizeAnalyticsPayload({sessionId:'bad',type:'page_view'}),null);
  assert.equal(sanitizeAnalyticsPayload({sessionId:'sess_test',type:'photo_secret'}),null);
});
