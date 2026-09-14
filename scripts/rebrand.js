const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const targetExtensions = ['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.html', '.txt'];
const excludeDirs = ['.next', 'node_modules', '.git', 'venv'];

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!excludeDirs.includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      if (targetExtensions.includes(path.extname(file))) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const files = getAllFiles(rootDir);
console.log(`Scanning ${files.length} files...`);

let modifiedCount = 0;

for (const filePath of files) {
  // skip the script itself
  if (filePath === __filename) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replacements in order of specificity
  content = content
    .replace(/https:\/\/www\.pixpassport\.com/g, 'https://www.pixpassvisa.com')
    .replace(/https:\/\/pixpassport\.com/g, 'https://www.pixpassvisa.com')
    .replace(/http:\/\/www\.pixpassport\.com/g, 'https://www.pixpassvisa.com')
    .replace(/http:\/\/pixpassport\.com/g, 'https://www.pixpassvisa.com')
    .replace(/www\.pixpassport\.com/g, 'www.pixpassvisa.com')
    .replace(/support@pixpassport\.com/g, 'support@pixpassvisa.com')
    .replace(/admin@pixpassport\.com/g, 'admin@pixpassvisa.com')
    .replace(/pixpassport\.com/g, 'pixpassvisa.com')
    .replace(/PixPassport/g, 'PixPassVisa')
    .replace(/PIXPASSPORT/g, 'PIXPASSVISA')
    .replace(/pixpassport/g, 'pixpassvisa');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`Updated: ${path.relative(rootDir, filePath)}`);
  }
}

console.log(`\nRebranding complete! ${modifiedCount} files updated.`);
