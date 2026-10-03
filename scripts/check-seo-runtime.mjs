import assert from 'node:assert/strict';
import fs from 'node:fs';
const origin = process.env.SEO_TEST_ORIGIN || 'http://127.0.0.1:3001';
const request = (path, options = {}) => fetch(origin + path, {redirect:'manual', signal:AbortSignal.timeout(30000), ...options});
const failures = [], results = [];
const sitemap = await request('/sitemap.xml');
assert.equal(sitemap.status,200,'sitemap status');
assert.match(sitemap.headers.get('content-type'), /xml/);
const xml=await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.ok(urls.length>50, 'sitemap should cover public content');
assert.equal(new Set(urls).size,urls.length,'unique sitemap URLs');
for(const url of urls) assert.match(url,/^https:\/\/www\.pixpassvisa\.com\//);
let cursor=0;
async function worker() {
  while(cursor<urls.length) {
    const url=urls[cursor++], path=new URL(url).pathname;
    try {
      const res=await request(path), html=await res.text();
      const canonicals=[...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)].map(m=>m[1]);
      const title=html.match(/<title>([^<]+)<\/title>/)?.[1];
      const issue=[];
      if(res.status!==200) issue.push(`HTTP ${res.status}`);
      if(canonicals.length!==1 || canonicals[0]!==url) issue.push(`canonical: ${canonicals.join(', ')||'missing'}`);
      if(!title) issue.push('missing title');
      if(/pixpassport\.com/i.test(html)) issue.push('retired brand reference');
      if(/noindex/i.test(res.headers.get('x-robots-tag')||'')) issue.push('noindex on sitemap URL');
      if(issue.length) failures.push({path,issue});
      results.push({path,status:res.status,title,canonical:canonicals[0]});
    } catch(e) { failures.push({path,issue:[e.message]}); }
  }
}
await Promise.all([worker(),worker(),worker(),worker()]);
for(const [path,target] of [['/photo-for-american-visa','/us-visa-photo-editor'],['/de/ratgeber','/de/guides'],['/de/ratgeber/biometrisches-passbild-alle-anforderungen','/de/guides/biometrisches-passbild-alle-anforderungen']]) {
  const r=await request(path); assert.equal(r.status,308,path); assert.ok(r.headers.get('location').endsWith(target),path);
}
for(const path of ['/login','/signup','/api/auth/session','/preview/invalid','/de/preview/invalid']) {
  const r=await request(path);assert.match(r.headers.get('x-robots-tag')||'',/noindex/,path);
}
const missing=await request('/a-deliberately-missing-page-for-seo-test');assert.equal(missing.status,404);
const robots=await (await request('/robots.txt')).text();assert.match(robots,/Sitemap: https:\/\/www\.pixpassvisa\.com\/sitemap.xml/);
const og=await request('/opengraph-image');assert.equal(og.status,200);assert.match(og.headers.get('content-type'),/image\/png/);
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/seo-runtime-results.json',JSON.stringify({origin,checked:results.length,failures,results},null,2));
console.log(JSON.stringify({checked:results.length,failures},null,2));
if(failures.length) process.exitCode=1;
