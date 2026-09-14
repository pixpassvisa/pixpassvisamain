const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'app');

const REPLACEMENTS = [
  // Hex colors
  [/#84cc16/g, '#2563eb'],
  [/#a3e635/g, '#60a5fa'],
  [/#ecfccb/g, '#eff6ff'],
  [/#3d8c6e/g, '#2563eb'],
  [/#63bb8c/g, '#06b6d4'],
  [/#f0faf6/g, '#eff6ff'],
  [/#22543d/g, '#1e3a8a'],
  [/#eaf4f0/g, '#eff6ff'],

  // Tailwind classes
  [/border-t-lime-600/g, 'border-t-blue-600'],
  [/border-t-lime-500/g, 'border-t-blue-600'],
  [/border-t-lime-400/g, 'border-t-cyan-400'],
  [/border-t-lime-300/g, 'border-t-blue-400'],
  [/accent-lime-600/g, 'accent-blue-600'],
  [/accent-lime-500/g, 'accent-blue-600'],

  [/hover:bg-lime-400 text-slate-900/g, 'hover:bg-blue-700 text-white'],
  [/hover:bg-lime-400 text-slate-950/g, 'hover:bg-blue-700 text-white'],
  [/hover:bg-lime-400/g, 'hover:bg-blue-700'],
  [/hover:text-lime-400/g, 'hover:text-cyan-400'],

  [/text-lime-400/g, 'text-cyan-400'],
  [/text-lime-300/g, 'text-cyan-300'],
  [/text-lime-200/g, 'text-blue-200'],
  [/text-lime-100/g, 'text-blue-100'],
  [/text-lime-950/g, 'text-slate-950'],
  [/text-lime-900/g, 'text-blue-900'],
  [/text-lime-800/g, 'text-blue-800'],
  [/text-lime-700/g, 'text-blue-700'],
  [/text-lime-600/g, 'text-blue-600'],
  [/text-lime-500/g, 'text-blue-500'],

  [/bg-lime-600\/20/g, 'bg-blue-600/20'],
  [/bg-lime-600\/10/g, 'bg-blue-600/10'],
  [/bg-lime-500\/20/g, 'bg-blue-500/20'],
  [/bg-lime-400/g, 'bg-cyan-400'],
  [/bg-lime-300/g, 'bg-cyan-300'],
  [/bg-lime-200/g, 'bg-blue-200'],
  [/bg-lime-100/g, 'bg-blue-100'],
  [/bg-lime-50\/40/g, 'bg-blue-50/40'],
  [/bg-lime-50/g, 'bg-blue-50'],
  [/bg-lime-500/g, 'bg-blue-600'],
  [/bg-lime-600/g, 'bg-blue-600'],
  [/bg-lime-700/g, 'bg-blue-700'],

  [/border-lime-500/g, 'border-blue-500'],
  [/border-lime-400/g, 'border-cyan-400'],
  [/border-lime-300/g, 'border-blue-300'],
  [/border-lime-200/g, 'border-blue-200'],
  [/border-lime-600/g, 'border-blue-600'],
  [/ring-lime-400/g, 'ring-cyan-400'],
  [/ring-lime-500/g, 'ring-blue-500'],
  [/from-lime-500/g, 'from-blue-600'],
  [/from-lime-400/g, 'from-cyan-400'],
  [/from-lime-600/g, 'from-blue-600'],
  [/to-lime-600/g, 'to-blue-600'],
  [/to-lime-500/g, 'to-blue-600'],
  [/to-lime-400/g, 'to-cyan-400'],
  [/via-lime-500/g, 'via-blue-500'],
  [/shadow-lime-500/g, 'shadow-blue-500'],
];

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = content;
      for (const [pattern, replacement] of REPLACEMENTS) {
        updated = updated.replace(pattern, replacement);
      }
      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`Updated: ${path.relative(ROOT, fullPath)}`);
      }
    }
  }
}

processDir(ROOT);
console.log('Harmonization complete!');
