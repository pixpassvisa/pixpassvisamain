import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { matchesPhotoSize } from '../lib/photo-size-filter.ts';
import { normalizeArticleHeadings } from '../lib/article-headings.ts';

test('compact presets preserve every processing field without shipping article bodies', () => {
  const source = JSON.parse(fs.readFileSync('data/countries-specs.json','utf8'));
  const compact = JSON.parse(fs.readFileSync('data/country-presets.json','utf8'));
  assert.deepEqual(compact, source.map(({passportcontent,visacontent,...preset}) => preset));
  assert.ok(JSON.stringify(compact).length < JSON.stringify(source).length / 4);
});
test('size filters match both dimensions and accept numeric strings', () => {
  assert.equal(matchesPhotoSize({width_mm:50,height_mm:60},'50x70'),false);
  assert.equal(matchesPhotoSize({width_mm:35,height_mm:40},'35x45'),false);
  assert.equal(matchesPhotoSize({width_mm:51,height_mm:70},'2x2'),false);
  assert.equal(matchesPhotoSize({width_mm:'50',height_mm:'70'},'50x70'),true);
  assert.equal(matchesPhotoSize({width_mm:51,height_mm:51},'2x2'),true);
  assert.equal(matchesPhotoSize({width_mm:35,height_mm:45},'all'),true);
});
test('article headings retain content and anchors beneath template H1', () => {
  assert.equal(normalizeArticleHeadings('<H1 id="intro"><em>Title</em></H1><h2>Next</h2><p>h1 text</p>'), '<h2 id="intro"><em>Title</em></h2><h2>Next</h2><p>h1 text</p>');
});
