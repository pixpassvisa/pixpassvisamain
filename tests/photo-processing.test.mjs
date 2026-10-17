import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function api(fetch) {
  const source = fs.readFileSync(new URL('../lib/external-api.ts', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const exports = {};
  vm.runInNewContext(outputText, { exports, fetch, FormData, console,
    process: { env: { PASSPORT_API_URL: 'https://processor.example', PASSPORT_API_KEY: 'test' } } });
  return exports;
}

test('unsupported document never falls back to another country ratio', async () => {
  const requests = [];
  const service = api(async (url, options) => {
    requests.push(options.body.get('country_code'));
    return { ok: false, status: 400, json: async () => ({ detail: "No config found for country 'CA' document_type 'visa'" }) };
  });
  await assert.rejects(service.processExternalPhoto(new Blob(['photo']), 'CA', 'visa'),
    error => error.status === 400 && error.message.includes('No config found'));
  assert.deepEqual(requests, ['CA']);
});

test('retake guidance and status survive the processing client', async () => {
  const service = api(async () => ({ ok: false, status: 400,
    json: async () => ({ detail: 'Retake with both shoulders visible.' }) }));
  await assert.rejects(service.processExternalPhoto(new Blob(['photo']), 'US'),
    error => error.status === 400 && error.message === 'Retake with both shoulders visible.');
});

test('successful result keeps the original dimensions and preview', async () => {
  const result = { status: 'success', dimensions: '600x600', preview_url: 'preview' };
  const service = api(async () => ({ ok: true, json: async () => result }));
  assert.deepEqual(await service.processExternalPhoto(new Blob(['photo']), 'US'), result);
});

test('route rejects a square result for a rectangular selected document before saving', async () => {
  const source = fs.readFileSync(new URL('../app/api/external-process/route.ts', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const exports = {};
  let saved = false;
  const mocks = {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/external-api': { processExternalPhoto: async () => ({ status: 'success', dimensions: '600x600' }) },
    '@/lib/mongodb': { default: async () => { saved = true; } },
    '@/models/Photo': {},
    '@/lib/specs': { getSpecById: () => ({ width_px: 630, height_px: 810 }) },
  };
  vm.runInNewContext(outputText, { exports, require: id => mocks[id], console });
  const data = new FormData();
  data.set('image', new Blob(['photo']));
  data.set('country_code', 'EU');
  data.set('full_doc_id', 'schengen-passport');
  const response = await exports.POST({ formData: async () => data });
  assert.equal(response.status, 400);
  assert.match(response.body.error, /selected document/);
  assert.equal(saved, false);
});
