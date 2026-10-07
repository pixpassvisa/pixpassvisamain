import fs from 'node:fs';
const origin = process.env.SEO_TEST_ORIGIN || 'https://www.pixpassvisa.com';
const get = p => fetch(new URL(p, origin), {redirect:'manual',signal:AbortSignal.timeout(20000)});
const response = await get('/sitemap.xml');
if (!response.ok) throw new Error(`Sitemap HTTP ${response.status}`);
const urls = [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const results=[]; let cursor=0;
async function worker(){while(cursor<urls.length){const url=urls[cursor++]; const path=new URL(url).pathname; try{
const r=await get(path), html=await r.text();
const title=html.match(/<title>([^<]*)<\/title>/i)?.[1];
const canonical=html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
const links=[...html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]);
const unwanted=links.filter(h=>{try{return /(^|\.)(?:pixpassport|pispassport)\.com$/i.test(new URL(h,origin).hostname);}catch{return false;}});
const issues=[];
if(r.status!==200)issues.push(`HTTP ${r.status}`);
if(!canonical || new URL(canonical,origin).href!==new URL(url).href)issues.push('canonical mismatch');
if(!title)issues.push('missing title');
if((title?.match(/pixpassvisa/gi)||[]).length>1)issues.push('repeated brand in title');
if(!/<meta\b[^>]*name="description"[^>]*content="[^"]+/i.test(html))issues.push('missing description');
if(/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)||/noindex/i.test(r.headers.get('x-robots-tag')||''))issues.push('noindex');
if(unwanted.length)issues.push('unwanted outbound links');
results.push({path,status:r.status,title,canonical,unwanted,issues});
}catch(e){results.push({path,issues:[e.message]});}}}
await Promise.all([worker(),worker(),worker(),worker()]);
results.sort((a,b)=>a.path.localeCompare(b.path));
fs.mkdirSync('docs',{recursive:true});
fs.writeFileSync('docs/link-seo-audit.json',JSON.stringify({origin,checkedAt:new Date().toISOString(),checked:results.length,results},null,2));
console.log(JSON.stringify({checked:results.length,issues:results.filter(r=>r.issues.length)},null,2));
if (!results.length || results.some(result => result.issues.length)) process.exitCode = 1;
