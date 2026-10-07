import fs from 'node:fs';
import path from 'node:path';

// Use the generated sitemap and HTML so new routes are covered automatically.
// Set SEO_TEST_ORIGIN to audit the public deployment with read-only requests.
const origin = process.env.SEO_TEST_ORIGIN;
const site = 'https://www.pixpassvisa.com';
const read = async pathname => {
  if (origin) {
    const response = await fetch(new URL(pathname, origin), {
      redirect: 'manual', signal: AbortSignal.timeout(30000),
    });
    if (response.status !== 200) throw new Error(`${pathname}: HTTP ${response.status}`);
    return response.text();
  }
  const filename = pathname === '/sitemap.xml' ? 'sitemap.xml.body'
    : pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
  return fs.readFileSync(path.join('.next/server/app', filename), 'utf8');
};
const xml = await read('/sitemap.xml');
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
if (!paths.includes('/')) throw new Error('Sitemap must include the homepage');
const graph = new Map();
const failures = [];
let cursor = 0;
async function worker() {
  while (cursor < paths.length) {
    const pathname = paths[cursor++];
    try {
      const html = await read(pathname);
      const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].flatMap(match => {
        try {
          const target = new URL(match[1].replaceAll('&amp;', '&'), site + pathname);
          return target.origin === site ? [target.pathname] : [];
        } catch { return []; }
      });
      graph.set(pathname, [...new Set(links)]);
    } catch (error) { failures.push({ pathname, error: error.message }); }
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
const depths = new Map([['/', 0]]);
const queue = ['/'];
for (const current of queue) {
  for (const target of graph.get(current) || []) {
    if (!depths.has(target)) {
      depths.set(target, depths.get(current) + 1);
      queue.push(target);
    }
  }
}
const unreachable = paths.filter(p => !depths.has(p));
const report = {
  origin: origin || 'local production build', checkedAt: new Date().toISOString(),
  checked: paths.length, failures, unreachable,
  pages: paths.map(p => ({ path: p, depth: depths.get(p) ?? null })),
};
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync(`docs/discovery-${origin ? 'live' : 'build'}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ checked: paths.length, failures, unreachable,
  maximumDepth: Math.max(...paths.map(p => depths.get(p) ?? 0)) }, null, 2));
if (failures.length || unreachable.length) process.exitCode = 1;
