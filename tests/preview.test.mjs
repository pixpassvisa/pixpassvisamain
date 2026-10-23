import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import * as jsx from 'react/jsx-runtime';
import { renderToString } from 'react-dom/server';

function load(file, mocks, globals = {}) {
  const source = fs.readFileSync(new URL(`../app/preview/[id]/${file}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
  } });
  const exports = {};
  vm.runInNewContext(outputText, { exports, require: id => {
    if (id === 'react/jsx-runtime') return jsx;
    if (id === '@/app/components/PaymentHelp') return { default: () => null };
    if (!(id in mocks)) throw new Error(`Unexpected dependency: ${id}`);
    return mocks[id];
  }, console, setTimeout, clearTimeout, AbortController, ...globals });
  return exports.default;
}

const price = { amount: 499, formatted: '₹499', currency: 'INR', symbol: '₹' };
test('refresh renders a shell without database or session dependencies', async () => {
  const Loader = () => null;
  const Page = load('page.tsx', { './PreviewLoader': { default: Loader },
    '@/lib/currency': { getLocalPrice: async () => price } });
  const result = await Page({ params: Promise.resolve({ id: 'photo-1' }), searchParams: Promise.resolve({ token: 'supplied-token', from: ['invalid-array'] }) });
  assert.equal(result.type, Loader);
  assert.equal(result.props.photoId, 'photo-1');
  assert.equal(result.props.downloadToken, 'supplied-token');
  assert.equal(result.props.from, undefined);
});

test('loading failure remains retryable and retry opens the saved paid photo', async () => {
  const states = [], effects = [];
  let cursor = 0, attempts = 0;
  const Client = () => null;
  const Loader = load('PreviewLoader.tsx', {
    react: { useState(initial) { const index = cursor++; if (!(index in states)) states[index] = initial;
      return [states[index], next => { states[index] = typeof next === 'function' ? next(states[index]) : next; }]; },
      useEffect(effect) { effects.push(effect); } },
    './PreviewClient': { default: Client },
  }, { fetch: async () => {
    attempts++;
    if (attempts === 1) throw new Error('Network unavailable');
    return { ok: true, json: async () => ({ success: true, data: { previewUrl: '/photo.jpg', documentType: 'icao-passport', isPaid: true } }) };
  } });
  const props = { photoId: 'photo-1', localPrice: price, expertPrice: price, downloadToken: 'receipt-token' };
  const render = () => { cursor = 0; return Loader(props); };
  assert.match(renderToString(render()), /Opening your saved photo/);
  let cleanup = effects.pop()();
  await new Promise(resolve => setImmediate(resolve));
  assert.match(renderToString(render()), /Retry preview/);
  cleanup();
  cleanup = effects.pop()();
  await new Promise(resolve => setImmediate(resolve));
  const ready = render();
  assert.equal(ready.type, Client);
  assert.equal(ready.props.initialIsPaid, true);
  assert.equal(ready.props.downloadToken, 'receipt-token');
  cleanup();
});

test('preview renders legacy string metrics and clear one-time checkout', () => {
  const Client = load('PreviewClient.tsx', {
    react: React, 'next-auth/react': { useSession: () => ({ data: null, status: 'unauthenticated' }) },
    '@/lib/currency': { getClientTimezoneCurrency: () => 'INR' },
    '@/lib/specs': { getSpecById: () => ({ name: 'ICAO Standard Biometric Photo', head_min_pct: 70, head_max_pct: 80 }) },
    './hooks/usePayment': { usePayment: () => ({ loading: false, phase: 'idle', error: '', handlePayment() {} }) },
  });
  const html = renderToString(React.createElement(Client, { photoId: 'photo-1', previewUrl: '/photo.jpg', documentType: 'icao-passport', localPrice: price, expertPrice: price,
    metrics: { headSizePct: '75', eyeLevelPct: '53', backgroundValid: true } }));
  assert.match(html, /75.0%/);
  assert.match(html, /Pay &amp; download/);
  assert.match(html, /One-time payment/);
  assert.doesNotMatch(html, /MOST POPULAR|\+2.7k/);
});

test('explicit USD preview keeps dollar prices despite an Indian browser timezone', async () => {
  const calls = [];
  const Page = load('page.tsx', { './PreviewLoader': { default: () => null },
    '@/lib/currency': { getLocalPrice: async (amount, currency, expert) => {
      calls.push([currency, !!expert]);
      return { amount, currency, formatted: `$${amount}`, symbol: '$' };
    } } });
  const shell = await Page({ params: Promise.resolve({id:'photo-1'}), searchParams: Promise.resolve({currency:'USD'}) });
  assert.equal(shell.props.currencyOverride, 'USD');
  assert.deepEqual(calls, [['USD', false], ['USD', true]]);
  const effects = [];
  let timezoneReads = 0;
  const Client = load('PreviewClient.tsx', {
    react: {...React, useEffect: fn => effects.push(fn)},
    'next-auth/react': {useSession: () => ({data:null,status:'unauthenticated'})},
    '@/lib/currency': {getClientTimezoneCurrency: () => {timezoneReads++; return 'INR';}},
    '@/lib/specs': {getSpecById: () => ({name:'Passport'})},
    './hooks/usePayment': {usePayment: () => ({loading:false,phase:'idle',error:'',handlePayment(){}})},
  });
  renderToString(React.createElement(Client, {...shell.props,previewUrl:'/photo.jpg',documentType:'us-passport',metrics:{}}));
  const currencyEffect = effects.find(fn => fn.toString().includes('getClientTimezoneCurrency'));
  assert.ok(currencyEffect);
  currencyEffect();
  assert.equal(timezoneReads, 0);
  const defaultShell = await Page({params:Promise.resolve({id:'photo-1'}),searchParams:Promise.resolve({currency:['USD']})});
  assert.equal(defaultShell.props.currencyOverride, undefined);
});
