import fs from 'node:fs';
// Keep editorial HTML on the server; browser tools need only preset data.
const source = JSON.parse(fs.readFileSync('data/countries-specs.json', 'utf8'));
const presets = source.map(({ passportcontent, visacontent, ...preset }) => preset);
fs.writeFileSync('data/country-presets.json', JSON.stringify(presets, null, 2) + '\n');
console.log(`Prepared ${presets.length} compact country presets.`);
