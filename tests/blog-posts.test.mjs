import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mergeBlogPosts } from '../lib/merge-blog-posts.ts';

const builtIn = JSON.parse(fs.readFileSync(new URL('../data/blog-posts.json', import.meta.url), 'utf8'));
const published = { slug: 'regression-new-cms-post', title: 'New article', date: '2099-01-01', isPublished: true };

test('first CMS publication preserves every built-in guide and appears first', () => {
  const result = mergeBlogPosts(builtIn, [published]);
  assert.equal(result.length, new Set(builtIn.map(p => p.slug)).size + 1);
  assert.equal(result[0].slug, published.slug);
  for (const post of builtIn) assert.ok(result.some(p => p.slug === post.slug));
});
test('CMS edits replace matching slugs without duplicate articles or input mutation', () => {
  const original = structuredClone(builtIn);
  const edit = { ...builtIn[0], title: 'Updated in CMS', isPublished: true };
  const result = mergeBlogPosts(builtIn, [edit]);
  assert.equal(result.filter(p => p.slug === edit.slug).length, 1);
  assert.equal(result.find(p => p.slug === edit.slug).title, edit.title);
  assert.deepEqual(builtIn, original);
});
test('drafts stay private and unpublished overrides suppress their built-in version', () => {
  const result = mergeBlogPosts(builtIn, [{ ...published, isPublished: false }, { ...builtIn[0], isPublished: false }]);
  assert.ok(!result.some(p => p.slug === published.slug || p.slug === builtIn[0].slug));
});
test('either source remains usable when the other is empty', () => {
  assert.equal(mergeBlogPosts(builtIn, []).length, new Set(builtIn.map(p => p.slug)).size);
  assert.deepEqual(mergeBlogPosts([], [published]), [published]);
  assert.deepEqual(mergeBlogPosts([], []), []);
});
