import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import net from 'node:net';
import ts from 'typescript';
import mongoose from 'mongoose';

function load(file, mocks = {}, globals = {}) {
  const source = fs.readFileSync(file, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: id => {
    if (!(id in mocks)) throw Error(`Unmocked ${id}`);
    return mocks[id];
  }, Buffer, URL, AbortSignal, setTimeout, clearTimeout, console: { error() {} }, ...globals });
  return exports;
}
const json = { json: (body, options = {}) => ({ body, status: options.status || 200, headers: options.headers || {} }) };
test('real Mongoose schema preserves structured checkout events', () => {
  const Model = load('models/CheckoutAttempt.ts', { mongoose }).default;
  const doc = new Model({ reference: 'CHK-SCHEMA', tokenHash: 'hash', kind: 'photo', events: [{ type: 'initiated', source: 'server', at: new Date() }] });
  assert.equal(doc.validateSync(), undefined);
  assert.equal(doc.events[0].type, 'initiated');
  assert.equal(doc.events[0].source, 'server');
});
function protection(env = {}, limiter = {}) {
  return load('lib/request-protection.ts', { crypto, net, '@/lib/mongodb': async () => {}, '@/models/RequestLimit': limiter }, { process: { env: { NEXTAUTH_SECRET: 'local-test-secret', ...env } } });
}
test('IP identity uses Vercel sanitized header only; arbitrary public hosts fail closed', () => {
  const p = protection({ VERCEL: '1' });
  assert.equal(p.clientAddress(new Request('https://www.pixpassvisa.com/api/contact', { headers: { 'x-forwarded-for': '203.0.113.8', 'x-real-ip': '1.2.3.4' } })), '203.0.113.8');
  assert.throws(() => p.clientAddress(new Request('https://www.pixpassvisa.com/api/contact')));
  assert.throws(() => protection().clientAddress(new Request('https://untrusted.example/api/contact', { headers: { 'x-forwarded-for': '1.2.3.4' } })));
});
test('origin and streamed body checks reject cross-site requests, arrays, and oversized messages', async () => {
  const p = protection({ NEXT_PUBLIC_APP_URL: 'https://www.pixpassvisa.com' });
  assert.equal(p.sameOrigin(new Request('https://www.pixpassvisa.com/api/contact', { headers: { origin: 'https://evil.example' } })), false);
  assert.equal(p.sameOrigin(new Request('https://www.pixpassvisa.com/api/contact', { headers: { origin: 'https://www.pixpassvisa.com' } })), true);
  for (const body of ['[]', JSON.stringify({ message: 'x'.repeat(9000) })]) await assert.rejects(() => p.smallJson(new Request('https://site.test', { method: 'POST', headers: { 'content-type': 'application/json' }, body })));
});
test('persistent limiter has one concurrent winner and does not rely on TTL deletion', async () => {
  const rows = new Map();
  const p = protection({}, { findOneAndUpdate: async (filter, update) => {
    const old = rows.get(filter._id);
    if (old && old > filter.until.$lte) throw { code: 11000 };
    rows.set(filter._id, update.$set.until);
  } });
  const results = await Promise.all(Array.from({ length: 12 }, () => p.reserveWindow('contact-ip', '203.0.113.1', 300)));
  assert.equal(results.filter(Boolean).length, 1);
  assert.equal([...rows.keys()].some(k => k.includes('203.0.113.1')), false);
  for (const key of rows.keys()) rows.set(key, new Date(0));
  assert.equal(await p.reserveWindow('contact-ip', '203.0.113.1', 300), true);
  await assert.rejects(() => protection({}, { findOneAndUpdate: async () => { throw Error('DB unavailable'); } }).reserveWindow('ip', 'test', 300));
});
test('Turnstile checks success, action, and hostname; malformed emails cannot reach email headers', async () => {
  let result = { success: true, hostname: 'www.pixpassvisa.com', action: 'contact' };
  const p = protection();
  const v = load('lib/contact-validation.ts', { '@/lib/request-protection': p }, { process: { env: { TURNSTILE_SECRET_KEY: 'test' } }, fetch: async () => ({ ok: true, json: async () => result }) });
  assert.equal(await v.verifyContactChallenge('valid', 'www.pixpassvisa.com'), true);
  result = { ...result, hostname: 'evil.example' };
  assert.equal(await v.verifyContactChallenge('valid', 'www.pixpassvisa.com'), false);
  result = { ...result, hostname: 'www.pixpassvisa.com', action: 'login' };
  assert.equal(await v.verifyContactChallenge('valid', 'www.pixpassvisa.com'), false);
  assert.equal(v.validateContact({ email: 'a@example.com\r\nBcc: victim@example.com', topic: 'Other', message: 'Need some help' }), null);
  assert.equal(v.validateContact({ email: 'a@example.com', topic: 'Other', message: 'Need some help', reference: '<script>' }), null);
});
function contact({ challenge = true, mailOK = true, allowed = true, dbFail = false } = {}) {
  const mails = [], tickets = [], windows = new Set();
  const route = load('app/api/contact/route.ts', {
    crypto, 'next/server': { NextResponse: json },
    '@/lib/request-protection': {
      sameOrigin: () => allowed, smallJson: req => req.json(), clientAddress: req => req.ip,
      reserveWindow: async (scope, value) => {
        if (dbFail) throw Error('DB down');
        if (scope === 'contact-check') return true;
        const key = `${scope}:${value}`;
        if (windows.has(key)) return false;
        windows.add(key); return true;
      },
    },
    '@/lib/contact-validation': { validateContact: body => ({ email: body.email, topic: 'Other', message: '<script>alert(1)</script>', checkoutReference: '' }), verifyContactChallenge: async () => challenge },
    '@/models/SupportRequest': { create: async input => { const t = { ...input, save: async () => {} }; tickets.push(t); return t; } },
    '@/lib/mail': { sendEmail: async mail => { mails.push(mail); return { success: mailOK }; } },
  }, { process: { env: { TURNSTILE_SECRET_KEY: 'test', NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'test' } } });
  return { mails, tickets, post: (email = 'buyer@example.com', extra = {}, ip = 'same-network') => route.POST({ ip, url: 'https://www.pixpassvisa.com/api/contact', json: async () => ({ email, challengeToken: 'token', ...extra }) }) };
}
test('contact accepts one email per IP window even with different email addresses and concurrent requests', async () => {
  const h = contact();
  const results = await Promise.all([h.post(), h.post('second@example.com'), h.post('third@example.com')]);
  assert.equal(results.filter(r => r.status === 201).length, 1);
  assert.equal(h.mails.length, 1);
  assert.equal(h.mails[0].to, 'support@pixpassvisa.com');
  assert.equal(h.mails[0].replyTo, 'buyer@example.com');
  assert.equal(h.mails[0].html, undefined);
  assert.equal(h.tickets[0].delivery, 'accepted');
});
test('bot rejection, honeypot, cross-origin, and database failures never send email', async () => {
  for (const config of [{ challenge: false }, { allowed: false }, { dbFail: true }]) {
    const h = contact(config); assert.ok((await h.post()).status >= 400); assert.equal(h.mails.length, 0);
  }
  const h = contact(); assert.equal((await h.post(undefined, { website: 'bot.example' })).status, 400); assert.equal(h.mails.length, 0);
});
test('email cooldown blocks the same address even after its network changes', async () => {
  const h = contact();
  assert.equal((await h.post()).status, 201);
  assert.equal((await h.post('buyer@example.com', {}, 'another-network')).status, 429);
  assert.equal(h.mails.length, 1);
});
test('mail provider rejection keeps support ticket and cooldown without claiming email success', async () => {
  const h = contact({ mailOK: false }); const response = await h.post();
  assert.equal(response.status, 201); assert.equal(h.tickets[0].delivery, 'failed');
  assert.match(response.body.message, /could not be sent/);
  assert.equal((await h.post()).status, 429); assert.equal(h.mails.length, 1);
});
test('diagnostics redact arbitrary payloads and late failures/browser reports cannot downgrade captured payments', async () => {
  let stored = { reference: 'CHK-TEST', outcome: 'unconfirmed' };
  const d = load('lib/checkout-diagnostics.ts', { crypto, '@/lib/mongodb': async () => {}, '@/models/CheckoutAttempt': {
    updateOne: async (filter, update) => {
      const disallowed = filter.outcome?.$nin || [filter.outcome?.$ne];
      if (!disallowed.includes(stored.outcome)) stored = { ...stored, ...update.$set };
    },
  } });
  assert.deepEqual(JSON.parse(JSON.stringify(d.safeError({ error: { code: 'BAD_REQUEST_ERROR', reason: 'insufficient_funds', card: 'secret', description: 'sensitive', metadata: { token: 'secret' } } }))), { code: 'BAD_REQUEST_ERROR', reason: 'insufficient_funds' });
  await d.recordAttempt('CHK-TEST', 'captured', 'gateway', { outcome: 'captured' });
  await d.recordAttempt('CHK-TEST', 'gateway_failed', 'gateway', { outcome: 'failed' });
  await d.recordAttempt('CHK-TEST', 'checkout_closed', 'browser');
  await d.recordAttempt('CHK-TEST', 'order_error', 'server');
  assert.equal(stored.outcome, 'captured'); assert.equal(stored.stage, 'captured');
});
test('client telemetry cannot submit paid outcomes or use another checkout token', async () => {
  const recorded = [];
  const route = load('app/api/payment/attempt/event/route.ts', {
    'next/server': { NextResponse: json }, '@/lib/request-protection': { sameOrigin: () => true, smallJson: req => req.json(), reserveWindow: async () => true },
    '@/lib/checkout-diagnostics': { clientEvents: ['checkout_closed'], authenticatedAttempt: async (_ref, token) => token === 'valid' ? { reference: 'CHK-OWN' } : null, safeError: () => ({}), recordAttempt: async (...args) => recorded.push(args) },
  });
  const post = body => route.POST({ json: async () => body });
  assert.equal((await post({ type: 'captured', token: 'valid' })).status, 400);
  assert.equal((await post({ type: 'checkout_closed', token: 'wrong' })).status, 403);
  assert.equal(recorded.length, 0);
  assert.equal((await post({ type: 'checkout_closed', token: 'valid' })).status, 200);
  assert.equal(recorded[0][2], 'browser');
});
test('checkout reference is bound to its resource and concurrent gateway requests have one winner', async () => {
  let claimed = false;
  const attempt = { _id: 'id', reference: 'CHK-' + 'A'.repeat(20), kind: 'photo', photoId: 'photo-a', email: 'a@example.com' };
  const d = load('lib/checkout-diagnostics.ts', { crypto, '@/lib/mongodb': async () => {}, '@/models/CheckoutAttempt': {
    findOne: async query => query.tokenHash === crypto.createHash('sha256').update('a'.repeat(64)).digest('hex') ? attempt : null,
    findOneAndUpdate: async () => { if (claimed) return null; claimed = true; return attempt; },
  } });
  const input = { kind: 'photo', photoId: 'photo-a', email: 'a@example.com' };
  await assert.rejects(() => d.beginGatewayOrder(attempt.reference, 'a'.repeat(64), { ...input, photoId: 'other' }));
  await assert.rejects(() => d.beginGatewayOrder(attempt.reference, 'b'.repeat(64), input));
  const results = await Promise.allSettled([d.beginGatewayOrder(attempt.reference, 'a'.repeat(64), input), d.beginGatewayOrder(attempt.reference, 'a'.repeat(64), input)]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
});
test('gateway order creation failures are saved with the checkout reference and safe error fields', async () => {
  const records = [];
  const route = load('app/api/payment/create-order/route.ts', {
    'next/server': { NextResponse: json }, 'next-auth/next': { getServerSession: async () => null }, '@/lib/auth': {},
    '@/lib/mongodb': async () => {}, '@/models/Photo': { findById: async () => ({ _id: 'photo', status: 'ready', documentType: 'us-passport' }) },
    '@/models/Order': {}, '@/models/Payment': {}, '@/lib/request-protection': { normalizedEmail: v => v },
    '@/lib/checkout-diagnostics': { beginGatewayOrder: async () => 'CHK-SAVED', recordAttempt: async (...args) => records.push(args), safeError: () => ({ code: 'BAD_REQUEST_ERROR', reason: 'currency_not_supported' }) },
    '@/lib/specs': { getSpecById: () => ({ price: 4.99 }) }, '@/lib/currency': { getLocalPrice: async () => ({ currency: 'USD', amount: 4.99 }) },
    razorpay: class { orders = { create: async () => { throw { error: { code: 'BAD_REQUEST_ERROR' } }; } }; },
  }, { process: { env: { RAZORPAY_KEY_ID: 'test', RAZORPAY_KEY_SECRET: 'test' } } });
  const result = await route.POST({ json: async () => ({ photoId: 'photo', guestEmail: 'a@example.com' }) });
  assert.equal(result.status, 500); assert.equal(result.body.reference, 'CHK-SAVED');
  assert.equal(records[0][1], 'order_error'); assert.equal(records[0][3].error.reason, 'currency_not_supported');
});
test('only signed webhooks record gateway failures, including when no customer email is supplied', async () => {
  const calls = [];
  const route = load('app/api/webhooks/razorpay/route.ts', {
    'next/server': { NextResponse: json }, crypto, '@/lib/mongodb': async () => {},
    '@/lib/checkout-diagnostics': { gatewayAttempt: async (...args) => calls.push(['attempt', ...args]), safeError: () => ({ reason: 'payment_failed' }) },
    '@/models/Photo': {}, '@/models/ExpertOrder': {}, '@/models/Dispute': {},
    '@/models/Order': { updateOne: async (...args) => calls.push(['order', ...args]) },
    '@/models/Payment': { updateOne: async (...args) => calls.push(['payment', ...args]) },
    '@/lib/mail': {}, '@/lib/payment-download': {}, '@/lib/specs': {}, '@/lib/ga4': {}, '@/lib/audit': {},
  }, { process: { env: { RAZORPAY_WEBHOOK_SECRET: 'webhook-test' } } });
  const raw = JSON.stringify({ event: 'payment.failed', payload: { payment: { entity: { id: 'pay_failed', order_id: 'order_failed', notes: {}, error_reason: 'payment_failed' } } } });
  const req = signature => ({ text: async () => raw, headers: new Headers({ 'x-razorpay-signature': signature }) });
  assert.equal((await route.POST(req('00'))).status, 400); assert.equal(calls.length, 0);
  const signature = crypto.createHmac('sha256', 'webhook-test').update(raw).digest('hex');
  assert.equal((await route.POST(req(signature))).status, 200);
  assert.equal(calls[0][1], 'order_failed'); assert.equal(calls[0][2], 'gateway_failed');
  assert.equal(calls.find(c => c[0] === 'payment')[1].gatewayOrderId, 'order_failed');
  assert.equal(calls.find(c => c[0] === 'order')[1]['metadata.razorpayOrderId'], 'order_failed');
});
