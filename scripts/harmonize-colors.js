const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../app');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getAllFiles(rootDir);
console.log(`Harmonizing colors across ${files.length} files...`);

let count = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content
    .replace(/bg-lime-700/g, 'bg-blue-700')
    .replace(/bg-lime-800/g, 'bg-blue-800')
    .replace(/bg-lime-600/g, 'bg-blue-600')
    .replace(/bg-lime-500/g, 'bg-blue-600')
    .replace(/bg-lime-100/g, 'bg-blue-100')
    .replace(/bg-lime-50/g, 'bg-blue-50/70')
    .replace(/hover:bg-lime-800/g, 'hover:bg-blue-800')
    .replace(/hover:bg-lime-700/g, 'hover:bg-blue-700')
    .replace(/hover:bg-lime-600/g, 'hover:bg-blue-600')
    .replace(/hover:bg-lime-100/g, 'hover:bg-blue-100')
    .replace(/hover:bg-lime-50/g, 'hover:bg-blue-50')
    .replace(/text-lime-800/g, 'text-blue-800')
    .replace(/text-lime-700/g, 'text-blue-700')
    .replace(/text-lime-600/g, 'text-blue-600')
    .replace(/text-lime-500/g, 'text-blue-600')
    .replace(/text-lime-900/g, 'text-blue-900')
    .replace(/hover:text-lime-700/g, 'hover:text-blue-700')
    .replace(/hover:text-lime-600/g, 'hover:text-blue-600')
    .replace(/border-lime-500/g, 'border-blue-500')
    .replace(/border-lime-600/g, 'border-blue-600')
    .replace(/border-lime-400/g, 'border-blue-400')
    .replace(/border-lime-300/g, 'border-blue-300')
    .replace(/border-lime-200/g, 'border-blue-200')
    .replace(/border-lime-100/g, 'border-blue-100')
    .replace(/hover:border-lime-500/g, 'hover:border-blue-500')
    .replace(/hover:border-lime-400/g, 'hover:border-blue-400')
    .replace(/hover:border-lime-300/g, 'hover:border-blue-300')
    .replace(/hover:border-lime-200/g, 'hover:border-blue-200')
    .replace(/shadow-lime-[0-9]+/g, 'shadow-blue-500/20')
    .replace(/ring-lime-[0-9]+/g, 'ring-blue-500')
    .replace(/focus:ring-lime-[0-9]+/g, 'focus:ring-blue-500')
    .replace(/focus:border-lime-[0-9]+/g, 'focus:border-blue-500')
    .replace(/#3d8c6e/g, '#2563eb')
    .replace(/#f0faf6/g, '#eff6ff')
    .replace(/#b2dfdb/g, '#bfdbfe')
    .replace(/#d8f3dc/g, '#dbeafe')
    .replace(/#2d6a4f/g, '#1d4ed8')
    .replace(/#1b4332/g, '#0f172a');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    count++;
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
  }
}

console.log(`\nColor harmonization complete! ${count} files updated.`);
