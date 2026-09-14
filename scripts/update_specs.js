const fs = require('fs');
const path = require('path');

const specsPath = path.join(__dirname, '../data/countries-specs.json');
const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'));

const pythonConfigDir = '/Users/navnitrai/Desktop/My/python/config/countries';
const missingFiles = [
  'bhutan_passport.json',
  'malawi_passport.json',
  'mexico_passport.json',
  'nepal_passport.json',
  'srilanka_passport.json',
  'tajikistan_passport.json'
];

const flags = {
  'Bhutan': '🇧🇹',
  'Malawi': '🇲🇼',
  'Mexico': '🇲🇽',
  'Nepal': '🇳🇵',
  'Sri Lanka': '🇱🇰',
  'Tajikistan': '🇹🇯'
};

for (const file of missingFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(pythonConfigDir, file), 'utf8'));
  const countryName = data.country.name;
  
  const id = `${countryName.toLowerCase().replace(/ /g, '-')}-passport`;
  
  // check if already exists
  if (specs.find(s => s.id === id)) continue;
  
  specs.push({
    id,
    name: `${countryName} Passport`,
    country: countryName,
    flag: flags[countryName] || '🏳️',
    width_mm: data.photo_spec.width_mm,
    height_mm: data.photo_spec.height_mm,
    width_px: data.digital_requirements.required_resolution_px.width,
    height_px: data.digital_requirements.required_resolution_px.height,
    head_min_pct: data.face_constraints.head_height_pct.min,
    head_max_pct: data.face_constraints.head_height_pct.max,
    eye_min_pct: data.face_constraints.eye_position.from_bottom_pct.min,
    eye_max_pct: data.face_constraints.eye_position.from_bottom_pct.max,
    bg_color: data.digital_requirements.background_color.replace('plain ', '').replace(' ', '-'),
    price: 6.99,
    print_size: data.print_layout.paper_size,
    hero_photo: "https://res.cloudinary.com/dipzpwbbk/image/upload/f_webp/45_35_passport_photo_ogdxnu.jpg",
    passportcontent: `<h2>${countryName} Passport Photo Requirements (2026)</h2><p>Official standards for ${countryName} passport photos require a ${data.photo_spec.width_mm}x${data.photo_spec.height_mm} mm photograph with a ${data.digital_requirements.background_color} background.</p>`,
    visacontent: `<h2>${countryName} Visa Photo Requirements (2026)</h2><p>Official standards for ${countryName} visa photos generally follow the passport requirements: a ${data.photo_spec.width_mm}x${data.photo_spec.height_mm} mm photograph with a ${data.digital_requirements.background_color} background.</p>`,
    dpi: data.photo_spec.print_dpi || 300
  });
}

fs.writeFileSync(specsPath, JSON.stringify(specs, null, 2), 'utf8');
console.log('Updated countries-specs.json');
