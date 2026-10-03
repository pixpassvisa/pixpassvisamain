import fs from 'node:fs';
import path from 'node:path';
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
