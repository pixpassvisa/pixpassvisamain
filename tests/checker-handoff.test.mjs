import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stageCheckerPhoto, takeCheckerPhoto, findCheckerDocument } from '../lib/checker-handoff.ts';

test('checker transfers the original file once, only to the selected document', () => {
  const photo = new File(['synthetic'], 'test.png', { type: 'image/png' });
  stageCheckerPhoto(photo, 'uk-passport');
  assert.equal(takeCheckerPhoto('uk-passport'), photo);
  assert.equal(takeCheckerPhoto('uk-passport'), null);
  stageCheckerPhoto(photo, 'uk-passport');
  assert.equal(takeCheckerPhoto('us-passport'), null);
  assert.equal(takeCheckerPhoto('uk-passport'), null);
});

test('an expired photo cannot be reused', () => {
  stageCheckerPhoto(new File(['test'], 'test.png'), 'us-visa');
  assert.equal(takeCheckerPhoto('us-visa', Date.now() + 6 * 60 * 1000), null);
});

test('document matching never substitutes a passport for a missing visa', () => {
  const docs = [{ id: 'australia-passport' }, { id: 'us-visa' }, { id: 'switzerland-passport' }];
  const codes = { australia: 'AU', us: 'US', switzerland: 'CHE' };
  assert.equal(findCheckerDocument(docs, 'AU', 'visa', codes), undefined);
  assert.equal(findCheckerDocument(docs, 'US', 'visa', codes)?.id, 'us-visa');
  assert.equal(findCheckerDocument(docs, 'CH', 'passport', codes)?.id, 'switzerland-passport');
  assert.equal(findCheckerDocument(docs, 'GB', 'passport', codes), undefined);
});
