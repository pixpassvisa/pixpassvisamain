import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractFaqsFromContent } from '../lib/blog-faq.ts';

test('unrecognized FAQ markup remains readable and indexable', () => {
  const content = '<h2>FAQs</h2><details><summary>What size?</summary><p>Check your document.</p></details><h2>Sources</h2><p>Official guidance.</p>';
  const result = extractFaqsFromContent(content);
  assert.equal(result.cleanContent, content);
  assert.deepEqual(result.faqs, []);
});

test('recognized FAQs move to the accordion without removing later sections', () => {
  const content = '<p>Introduction.</p><h2>FAQs</h2><h3>What size?</h3><p>Check your document.</p><h2>Sources</h2><p>Official guidance.</p>';
  const result = extractFaqsFromContent(content);
  assert.deepEqual(result.faqs, [{question: 'What size?', answer: 'Check your document.'}]);
  assert.equal(result.cleanContent, '<p>Introduction.</p><h2>Sources</h2><p>Official guidance.</p>');
});
