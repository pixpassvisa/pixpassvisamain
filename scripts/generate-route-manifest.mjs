import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
const routes = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === 'page.tsx') {
      const route = '/' + path.relative('app', dir).split(path.sep).filter(p => !p.startsWith('(')).join('/');
      if (!route.includes('[') && !/^\/(api|admin|dashboard|login|signup|cloudinary-gallery|expert-edit)(\/|$)/.test(route) && !route.startsWith('/de/ratgeber')) routes.push(route);
    }
  }
}
walk('app');
fs.writeFileSync('data/route-manifest.json', JSON.stringify([...new Set(routes)].sort(), null, 2) + '\n');
console.log(`Prepared ${routes.length} public static routes for the sitemap.`);
// Bundle navigation metadata as JSON. Dynamic routes must not read or create
// source-content directories in Vercel's read-only function filesystem.
const guideIndex = [];
for (const [prefix, directory] of [['uk','content/uk'],['ca','content/ca'],['de/guides','content/de/guides']]) {
  for (const file of fs.readdirSync(directory).filter(name => /\.mdx?$/.test(name)).sort()) {
    const { data } = matter(fs.readFileSync(path.join(directory,file),'utf8'));
    guideIndex.push({ prefix, slug: data.slug || file.replace(/\.mdx?$/,''), title: data.title || 'Passport photo guide',
      date: data.date instanceof Date ? data.date.toISOString() : data.date,
      ...(data.updatedAt ? { updatedAt: data.updatedAt instanceof Date ? data.updatedAt.toISOString() : data.updatedAt } : {}) });
  }
}
fs.writeFileSync('data/local-guide-index.json', JSON.stringify(guideIndex,null,2)+'\n');
