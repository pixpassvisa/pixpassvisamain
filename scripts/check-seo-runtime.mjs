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
      if(canonicals.length!==1 || new URL(canonicals[0]).href!==new URL(url).href) issue.push(`canonical: ${canonicals.join(', ')||'missing'}`);
      if(!title) issue.push('missing title');
      if(/pixpassport\.com/i.test(html)) issue.push('retired brand reference');
      if(/noindex/i.test(res.headers.get('x-robots-tag')||'')) issue.push('noindex on sitemap URL');
      if(/<meta[^>]*name="(?:robots|googlebot)"[^>]*content="[^"]*noindex/i.test(html)) issue.push('meta noindex on sitemap URL');
      if(issue.length) failures.push({path,issue});
      results.push({path,status:res.status,title,canonical:canonicals[0]});
    } catch(e) { failures.push({path,issue:[e.message]}); }
  }
}
await Promise.all([worker(),worker(),worker(),worker()]);
for(const [path,target] of [['/photo-for-american-visa','/us-visa-photo-editor'],['/de/ratgeber','/de/guides'],['/de/ratgeber/biometrisches-passbild-alle-anforderungen','/de/guides/biometrisches-passbild-alle-anforderungen']]) {
  const r=await request(path); assert.equal(r.status,308,path); assert.ok(r.headers.get('location').endsWith(target),path);
}
const retired = JSON.parse(fs.readFileSync('data/seo-redirects.json','utf8'));
for(const {source,destination} of retired) {
  assert.ok(!urls.includes('https://www.pixpassvisa.com'+source),'retired URL excluded from sitemap');
  const response = await request(source);
  assert.equal(response.status,308,source);
  const location = response.headers.get('location');
  assert.equal(new URL(location,origin).pathname,destination,source);
  assert.equal((await request(destination)).status,200,'redirect terminates in one hop');
}
const representatives = [];
for(const [path,expectedText,documentId] of [
  ['/us-passport-photo-editor','United States Passport Photo','us-passport'],
  ['/us-visa-photo-editor','US visa photo preparation','us-visa'],
  ['/schengen-visa-photo-editor','Schengen Visa Photo','schengen-visa'],
  ['/india-passport-photo-editor','Indian passport photos depend','india-passport'],
  ['/algeria-passport-photo-editor','Algeria Passport Photo','algeria-passport'],
  ['/australia-visa-photo-editor','does not currently have a separate',null],
  ['/icao-visa-photo-editor','ICAO photo standards and document requirements',null],
  ['/blog/uk-visa-photo-requirements','Start with your visa application instructions',null],
  ['/blog/australia-visa-photo-requirements-size-specifications','Use the instructions for your visa application',null],
]) {
  const started=performance.now();
  const response=await request(path);
  const html=await response.text();
  assert.equal(response.status,200,path);
  assert.ok(html.includes(expectedText),path+' rendered guidance');
  const h1Count=[...html.matchAll(/<h1(?:\s|>)/g)].length;
  assert.equal(h1Count,1,path+' one primary heading');
  if(documentId) assert.ok(html.includes('/passport-photo-online?type='+documentId),path+' document link');
  if(path==='/australia-visa-photo-editor') assert.ok(!html.includes('/passport-photo-online?type=australia-passport'),'visa page must not select passport');
  representatives.push({path,status:response.status,h1Count,documentId,localFetchMs:Math.round(performance.now()-started)});
}
for(const directory of ['/passport-photos','/visa-photo']) {
  const html=await (await request(directory)).text();
  const target=directory==='/visa-photo' ? '/australia-visa-photo-editor' : '/algeria-passport-photo-editor';
  assert.ok(html.includes('href="'+target+'"'),directory+' crawlable country link');
}
for(const path of ['/login','/signup','/api/auth/session','/preview/invalid','/de/preview/invalid']) {
  const r=await request(path);assert.match(r.headers.get('x-robots-tag')||'',/noindex/,path);
}
const missing=await request('/a-deliberately-missing-page-for-seo-test');assert.equal(missing.status,404);
for(const path of ['/algeria','/algeria-passport','/made-up-visa-photo-editor']) assert.equal((await request(path)).status,404,path);
// No configured backend: an explicitly synthetic image must fail clearly without a purchase or storage.
const synthetic = new FormData();
synthetic.set('image', new Blob([Uint8Array.of(0,1,2,3)],{type:'image/png'}),'synthetic-invalid.png');
synthetic.set('country_code','US');
synthetic.set('document_type','passport');
assert.equal((await request('/api/external-validate',{method:'POST',body:synthetic})).status,503,'missing validation backend');
assert.equal((await request('/api/external-process',{method:'POST',body:synthetic})).status,503,'missing processing backend');
assert.equal((await request('/api/analytics',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({sessionId:'invalid',metadata:{photo:'synthetic'}})})).status,400,'analytics rejects unsafe payload before DB use');
const robots=await (await request('/robots.txt')).text();assert.match(robots,/Sitemap: https:\/\/www\.pixpassvisa\.com\/sitemap.xml/);
const og=await request('/opengraph-image');assert.equal(og.status,200);assert.match(og.headers.get('content-type'),/image\/png/);
fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/seo-runtime-results.json',JSON.stringify({origin,checked:results.length,failures,representatives,results},null,2));
console.log(JSON.stringify({checked:results.length,failures},null,2));
if(failures.length) process.exitCode=1;
