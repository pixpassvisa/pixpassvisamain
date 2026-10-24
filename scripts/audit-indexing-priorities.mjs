import fs from 'node:fs';
const origin = process.env.SEO_TEST_ORIGIN || 'https://www.pixpassvisa.com';
const paths = ['/robots.txt', '/sitemap.xml', '/passport-photo-country-guide', '/us-passport-photo-editor', '/us-visa-photo-editor', '/uk-passport-photo-editor', '/uk-passport-size-photo-maker', '/australia-passport-photo-editor', '/australian-passport-photo-checker', '/germany-passport-photo-editor', '/france-passport-photo-editor', '/schengen-visa-photo-editor', '/passport-photo-online', '/passport-photos', '/visa-photo', '/america-visa-size-photo'];
const results = [];
for (let i = 0; i < paths.length; i += 4) {
  await Promise.all(paths.slice(i, i + 4).map(async path => {
    const start = Date.now();
    try {
      const r = await fetch(new URL(path, origin), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
      const html = await r.text();
      results.push({ path, status: r.status, elapsedMs: Date.now() - start,
        type: r.headers.get('content-type'), robotsHeader: r.headers.get('x-robots-tag'),
        canonical: html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1],
        robots: html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/)?.[1],
        title: html.match(/<title>([^<]+)<\/title>/)?.[1],
        ds160Guide: path === '/us-visa-photo-editor' ? html.includes('Check three separate problems before uploading') : undefined,
        body: path === '/robots.txt' ? html : undefined,
        sitemapDates: path === '/sitemap.xml' ? [...html.matchAll(/<url>([\s\S]*?)<\/url>/g)].filter(m => /passport-photo-country-guide|us-visa-photo-editor/.test(m[1])).map(m => m[1]) : undefined,
      });
    } catch (e) { results.push({ path, error: e.message }); }
  }));
}
results.sort((a,b) => a.path.localeCompare(b.path));
const report = { origin, checkedAt: new Date().toISOString(), results };
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync(`docs/indexing-priorities-${origin.includes('localhost') || origin.includes('127.0.0.1') ? 'local' : 'live'}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (results.some(r => r.error || r.status !== 200)) process.exitCode = 1;
