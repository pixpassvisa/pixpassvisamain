import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

// Measures generated HTML's initial script references, not browser timings.
const pages = ['index', 'passport-photo-print-template-generator', 'passport-photo-checker'];
const report = pages.map(page => {
  const html = fs.readFileSync(path.join('.next/server/app', `${page}.html`), 'utf8');
  const urls = [...new Set([...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]))];
  const assets = urls.filter(url => url.startsWith('/_next/')).map(url => {
    const data = fs.readFileSync(path.join('.next', url.slice('/_next/'.length)));
    return { url, bytes: data.length, gzipBytes: gzipSync(data).length };
  });
  return { page, scripts: assets.length, bytes: assets.reduce((n, a) => n + a.bytes, 0),
    gzipBytes: assets.reduce((n, a) => n + a.gzipBytes, 0), assets };
});
fs.writeFileSync('docs/performance-page-js.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.map(({ assets, ...summary }) => summary), null, 2));
