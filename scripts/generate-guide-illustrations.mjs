import fs from 'node:fs';
import sharp from 'sharp';
const entries = [
 ['australia-passport','AUSTRALIA','Passport photo guide',['Take your photo','Check dimensions','Obtain prints'],'35–40 mm wide · 45–50 mm high'],
 ['uk-passport','UNITED KINGDOM','Before you edit',['Keep the original','Choose your route','Review the rules'],'Photo settings are not HMPO approval'],
 ['romania-passport','ROMANIA','Your consular appointment',['Choose the service','Attend in person','Facial capture'],'Electronic passport · Adult consular route'],
 ['south-africa-visa','SOUTH AFRICA','Visa photo checklist',['Handling mission','Photo instructions','Check the output'],'A print format is not an upload specification'],
 ['chile-visa','CHILE','Find your photo workflow',['Application route','Photo request','Upload check'],'Temporary stay ≠ temporary residence'],
 ['uk-photo-routes','UNITED KINGDOM','Digital or printed?',['Online application','Original digital file','HMPO review'],'Paper form? Check the separate print rules'],
 ['de-guides','DEUTSCHLAND','Passbild: Bild und Verfahren',['Dokument wählen','Aufnahme klären','Abgabe prüfen'],'pixpassvisa.com · Ratgeber und Orientierung'],
];
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
fs.mkdirSync('public/images/guides',{recursive:true});
for(const [id,country,title,steps,note] of entries){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" rx="26" fill="#163e33"/><circle cx="1100" cy="40" r="340" fill="#285944"/><circle cx="1110" cy="30" r="250" fill="none" stroke="#55795a" stroke-width="1"/><text x="65" y="73" fill="#d9edb5" font-family="Arial,sans-serif" font-size="24" font-weight="700">pixpassvisa.com</text><text x="65" y="145" fill="#bcd2ba" font-family="Arial,sans-serif" font-size="18" letter-spacing="4">${country}</text><text x="65" y="228" fill="#ffffff" font-family="Arial,sans-serif" font-size="49" font-weight="700">${esc(title)}</text>${steps.map((s,i)=>`<rect x="${65+i*365}" y="296" width="340" height="190" rx="18" fill="${i===1?'#dbeeb8':'#f3f6ec'}"/><circle cx="${105+i*365}" cy="340" r="18" fill="#285642"/><text x="${100+i*365}" y="346" fill="#fff" font-family="Arial,sans-serif" font-size="16">${i+1}</text><text x="${87+i*365}" y="423" fill="#244736" font-family="Arial,sans-serif" font-size="25" font-weight="700">${esc(s)}</text>`).join('')}<text x="65" y="556" fill="#cbdcc3" font-family="Arial,sans-serif" font-size="23">${esc(note)}</text><text x="65" y="594" fill="#92b29b" font-family="Arial,sans-serif" font-size="15">Independent guidance · Check the issuing authority’s instructions</text></svg>`;
 await sharp(Buffer.from(svg)).png().toFile(`public/images/guides/${id}.png`);
}
console.log(`Created ${entries.length} original PixPassVisa guide illustrations.`);
