import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import ts from 'typescript';

function load(file, mocks, globals = {}) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
  const exports = {};
  vm.runInNewContext(outputText, { exports, require: (id) => {
    if (!(id in mocks)) throw new Error(`Unexpected dependency ${id}`);
    return mocks[id];
  }, console: { log() {}, error() {}, warn() {} }, Buffer, AbortSignal, setTimeout, clearTimeout, ...globals });
  return exports;
}

const jsonResponse = { json: (body, options) => ({ status: options?.status || 200, body }) };
function paymentRoute({ paid = false, linked = true, emailSuccess = true } = {}) {
  const photo = { _id: 'photo-current', status: paid ? 'paid' : 'ready', razorpayOrderId: linked ? 'order-current' : 'order-other', orderId: 'permanent', guestEmail: 'customer@example.com', documentType: 'us-passport', downloadToken: 'secure-token', save: async () => {} };
  const order = { _id: 'permanent', save: async () => {} };
  const payment = { save: async () => {} };
  const after = [], audits = [], emails = [];
  const route = load('app/api/payment/verify/route.ts', {
    'next/server': { NextResponse: jsonResponse, after: (fn) => after.push(fn) },
    'next-auth/next': { getServerSession: async () => null }, '@/lib/auth': {}, '@/lib/mongodb': async () => {},
    '@/models/Photo': { findById: async () => photo, findOne: async () => null },
    '@/models/Order': { findById: async () => order },
    '@/models/Payment': { findOne: async (query) => query.gatewayPaymentId ? null : payment },
    crypto,
    "@/lib/payment-download": { ensureDownloadToken: async () => "secure-token" },
    '@/lib/mail': { sendEmail: async (mail) => { emails.push(mail); return { success: emailSuccess }; } },
    '@/lib/specs': { getSafeSpec: () => ({ name: 'Passport', country: 'US', bg_color: 'white' }) },
    '@/lib/audit': { logAuditEvent: async (event) => audits.push(event) },
  }, { process: { env: { RAZORPAY_KEY_SECRET: 'test-secret' } } });
  const payload = { photoId: photo._id, razorpay_order_id: 'order-current', razorpay_payment_id: 'payment-current', razorpay_signature: crypto.createHmac('sha256', 'test-secret').update('order-current|payment-current').digest('hex') };
  return { route, payload, after, audits, emails, photo };
}

test('payment success returns downloads before email delivery runs', async () => {
  const h = paymentRoute();
  const result = await h.route.POST({ json: async () => h.payload });
  assert.equal(result.status, 200);
  assert.equal(result.body.downloadToken, 'secure-token');
  assert.equal(h.photo.status, 'paid');
  assert.equal(h.emails.length, 0);
  assert.equal(h.after.length, 1);
  await h.after[0]();
  assert.equal(h.emails.length, 1);
  assert.match(h.emails[0].html, /token=secure-token/);
});

test('webhook-first and repeat verification still return the download token', async () => {
  const h = paymentRoute({ paid: true });
  const result = await h.route.POST({ json: async () => h.payload });
  assert.equal(result.body.downloadToken, 'secure-token');
  assert.equal(h.after.length, 0);
});

test('wrong photo order and forged signature cannot unlock downloads', async () => {
  const h = paymentRoute({ linked: false });
  assert.equal((await h.route.POST({ json: async () => h.payload })).status, 400);
  const second = paymentRoute();
  assert.equal((await second.route.POST({ json: async () => ({ ...second.payload, razorpay_signature: '00' }) })).status, 400);
  assert.equal(second.photo.status, 'ready');
});

test('email provider rejection is recorded as failed without losing payment success', async () => {
  const h = paymentRoute({ emailSuccess: false });
  assert.equal((await h.route.POST({ json: async () => h.payload })).status, 200);
  await h.after[0]();
  assert.equal(h.audits.at(-1).metadata.status, 'failed');
});

test('reply-to is optional and missing required mail configuration returns a failure', async () => {
  const payloads = [];
  const mocks = { resend: { Resend: class { emails = { send: async (payload) => { payloads.push(payload); return { data: { id: 'mail' } }; } }; } } };
  const mail = load('lib/mail.ts', mocks, { process: { env: { RESEND_API_KEY: 'test', RESEND_FROM_EMAIL: 'PixPassVisa <hello@example.com>' } } });
  assert.equal((await mail.sendEmail({ to: 'user@example.com', subject: 'Photo', text: 'Ready' })).success, true);
  assert.equal('replyTo' in payloads[0], false);
  const missing = load('lib/mail.ts', mocks, { process: { env: {} } });
  assert.equal((await missing.sendEmail({ to: 'user@example.com', subject: 'Photo' })).success, false);
});

function checkout({ failVerification = false, saved = null } = {}) {
  const effects = [], calls = [], storage = new Map(saved ? [['pixpassvisa:payment:current', JSON.stringify(saved)]] : []);
  let options, paid = false, success;
  const states = [];
  const hook = load('app/preview/[id]/hooks/usePayment.ts', { react: {
    useState: (initial) => { const slot = states.length; states.push(initial); return [initial, (v) => states[slot] = v]; },
    useRef: (value) => ({ current: value }), useEffect: (fn) => effects.push(fn),
  } }, {
    window: { Razorpay: class { constructor(o) { options = o; } on() {} open() {} } },
    sessionStorage: { getItem: (k) => storage.get(k), setItem: (k, v) => storage.set(k, v), removeItem: (k) => storage.delete(k) },
    fetch: async (url, init) => {
      calls.push({ url, body: JSON.parse(init.body) });
      if (url.endsWith('verify') && failVerification) throw new Error('Network unavailable');
      return { ok: true, json: async () => url.endsWith('create-order') ? { keyId: 'server-key', orderId: 'order-current', amount: 59900, currency: 'INR' } : { success: true, downloadToken: 'token' } };
    },
  });
  const result = hook.usePayment({ photoId: 'current', localPrice: { currency: 'INR' }, guestEmail: 'user@example.com', status: 'authenticated', session: { user: { email: 'user@example.com' } }, setHasPaid: (v) => paid = v, onSuccess: (v) => success = v });
  return { result, effects, calls, storage, states, get options() { return options; }, get paid() { return paid; }, get success() { return success; } };
}
const receipt = { razorpay_order_id: 'order-current', razorpay_payment_id: 'payment-current', razorpay_signature: 'signed' };
const settle = () => new Promise((resolve) => setImmediate(resolve));

test('double click opens one order, uses server key, and signed-in success stays on current photo', async () => {
  const h = checkout();
  await Promise.all([h.result.handlePayment(), h.result.handlePayment()]);
  assert.equal(h.calls.length, 1);
  assert.equal(h.options.key, 'server-key');
  assert.equal(h.options.name, 'PixPassVisa');
  h.options.handler(receipt);
  h.options.modal.ondismiss();
  await settle();
  assert.equal(h.paid, true);
  assert.equal(h.success.downloadToken, 'token');
  assert.equal(h.storage.size, 0);
});

test('verification outage retains receipt and retry never creates another charge', async () => {
  const h = checkout({ failVerification: true });
  await h.result.handlePayment();
  h.options.handler(receipt);
  await settle();
  assert.equal(h.paid, false);
  assert.equal(h.storage.size, 1);
  assert.equal(h.states[1], 'pending');
  await h.result.handlePayment();
  assert.equal(h.calls.filter((c) => c.url.endsWith('create-order')).length, 1);
  assert.equal(h.calls.filter((c) => c.url.endsWith('verify')).length, 2);
});

test('refresh restores pending verification for this photo only', async () => {
  const h = checkout({ saved: receipt });
  h.effects.forEach((fn) => fn());
  await settle();
  assert.equal(h.paid, true);
  assert.equal(h.calls[0].body.photoId, 'current');
  assert.equal(h.calls.some((c) => c.url.endsWith('create-order')), false);
});

test('expert selection is passed explicitly without waiting for a React render', async () => {
  const h = checkout();
  await h.result.handlePayment('user@example.com', true);
  assert.equal(h.calls[0].body.isExpert, true);
  h.options.modal.ondismiss();
  assert.equal(h.states[0], false);
});

function deliveryRoute({ userId, session = null, success = true } = {}) {
  const sent = [];
  const route = load('app/api/send-photo/route.ts', {
    'next/server': { NextResponse: jsonResponse },
    'next-auth/next': { getServerSession: async () => session }, '@/lib/auth': {}, '@/lib/mongodb': async () => {},
    '@/models/Photo': { findById: async () => ({ _id: 'current', userId, status: 'paid', guestEmail: 'buyer@example.com', downloadToken: 'private-token', createdAt: new Date(), secureUrl: 'https://example.com/photo.jpg', documentType: 'us-passport' }) },
    '@/lib/mail': { sendEmail: async (payload) => { sent.push(payload); return { success }; } },
    '@/lib/specs': { getSafeSpec: () => ({ name: 'Passport' }) },
    '@/lib/audit': { logAuditEvent: async () => {} },
  }, { process: { env: {} } });
  return { sent, post: (payload) => route.POST({ json: async () => ({ photoId: 'current', ...payload }) }) };
}

test('secure order token permits delivery to a corrected email address', async () => {
  const h = deliveryRoute();
  assert.equal((await h.post({ email: ' corrected@example.com ', downloadToken: 'private-token' })).status, 200);
  assert.equal(h.sent[0].to, 'corrected@example.com');
});

test('unrelated signed-in customer cannot email another customer photo to themselves', async () => {
  const h = deliveryRoute({ userId: 'owner', session: { user: { id: 'stranger', email: 'stranger@example.com' } } });
  assert.equal((await h.post({ email: 'stranger@example.com' })).status, 403);
  assert.equal(h.sent.length, 0);
});

test('delivery rejects malformed addresses and reports provider failure without claiming success', async () => {
  const h = deliveryRoute({ success: false });
  assert.equal((await h.post({ email: 'invalid' })).status, 400);
  const response = await h.post({ email: 'buyer@example.com' });
  assert.equal(response.status, 503);
  assert.match(response.body.error, /payment is complete/);
});

test('simultaneous webhook and browser confirmation receive the same download token', async () => {
  let stored;
  const { ensureDownloadToken } = load('lib/payment-download.ts', {
    crypto,
    '@/models/Photo': {
      findOneAndUpdate: async (_query, update) => {
        if (stored) return null;
        stored = update.$set.downloadToken;
        return { downloadToken: stored };
      },
      findById: async () => ({ downloadToken: stored }),
    },
  });
  const [browser, webhook] = await Promise.all([ensureDownloadToken('current'), ensureDownloadToken('current')]);
  assert.equal(browser, webhook);
  assert.equal(browser.length, 48);
  assert.equal(await ensureDownloadToken('current'), browser);
});

test('standard and premium prices match approved USD and INR amounts', async () => {
  const { getLocalPrice } = load('lib/currency.ts', {});
  for (const [currency, expert, expected] of [['USD', false, 4.99], ['INR', false, 499], ['USD', true, 6.99], ['INR', true, 599]]) {
    const price = await getLocalPrice(0, currency, expert);
    assert.equal(price.amount, expected);
    assert.equal(price.currency, currency);
  }
  const fallback = await getLocalPrice(0, 'CZK', true);
  assert.equal(fallback.currency, 'USD');
  assert.equal(fallback.amount, 6.99);
  assert.equal((await getLocalPrice(0, 'EUR')).amount, 6.99);
});

test('server creates Razorpay orders with approved amounts in minor units', async () => {
  const currency = load('lib/currency.ts', {});
  for (const [code, expert, expected] of [['USD', false, 499], ['INR', false, 49900], ['USD', true, 699], ['INR', true, 59900]]) {
    let gatewayOrder;
    const photo = { _id: 'photo', status: 'ready', documentType: 'us-passport', save: async () => {} };
    const route = load('app/api/payment/create-order/route.ts', {
      'next/server': { NextResponse: jsonResponse },
      'next-auth/next': { getServerSession: async () => null }, '@/lib/auth': {}, '@/lib/mongodb': async () => {},
      razorpay: class { orders = { create: async (options) => { gatewayOrder = options; return { id: 'order', ...options }; } }; },
      '@/models/Photo': { findById: async () => photo },
      '@/models/Order': { create: async () => ({ _id: 'permanent' }) },
      '@/models/Payment': { create: async () => ({}) },
      '@/lib/specs': { getSpecById: () => ({ price: 4.99 }) },
      '@/lib/currency': currency,
    }, { process: { env: { RAZORPAY_KEY_ID: 'paired-key', RAZORPAY_KEY_SECRET: 'test' } } });
    const response = await route.POST({ json: async () => ({ photoId: 'photo', currencyOverride: code, isExpert: expert, guestEmail: 'buyer@example.com' }) });
    assert.equal(response.status, 200);
    assert.equal(response.body.keyId, 'paired-key');
    assert.equal(gatewayOrder.amount, expected);
    assert.equal(gatewayOrder.currency, code);
  }
});
