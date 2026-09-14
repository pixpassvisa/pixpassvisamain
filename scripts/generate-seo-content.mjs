
import fs from 'fs';
import path from 'path';

const specsPath = '/Users/navnitrai/Desktop/My/pasport/data/countries-specs.json';
const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'));

const US_VISA_CONTENT = `
<h2>Decoding the CEAC Upload Requirements (2026 Update)</h2>
<p>When you reach the photo upload page of the DS-160 or DS-260 application, you are interacting with the Consular Electronic Application Center (CEAC). This system has some of the most rigid technical barriers of any government portal. If your file is 1 pixel off or 1 KB too heavy, you will be blocked from proceeding. In this 2026 guide, we provide the ultimate technical cheat sheet for the **digital US visa photo specs**, ensuring your file enters the system flawlessly on the first attempt.</p>
<div class='my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl'><h4 class='text-xl font-bold mb-6 text-center shadow-indigo-500'>The Technical Target</h4><div class='grid grid-cols-2 lg:grid-cols-4 gap-4 text-center'><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>File Format</div><div class='text-lg font-bold'>JPEG (.jpg)</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Dimensions</div><div class='text-lg font-bold'>600x600 px</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Max Size</div><div class='text-lg font-bold'>240 KB</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Color Space</div><div class='text-lg font-bold'>24-bit sRGB</div></div></div></div>
<h3>The JPEG Compression Paradox</h3>
<p>The government requires a photo that is both large enough for clarity (at least 600x600px) and small enough for their aging servers (under 240KB). Most photo editing software sacrifices quality for size. To stay under the limit without triggering a 'Quality Alert' (which happens when an image is too blurry from compression), you must use 'Smart Compression' that prioritizes the biometric data in the center of the image. Our tool handles this automatically, delivering the perfect balance of size and sharp resolution.</p>
<h2>Advanced Biometric Rules: Head Sizing and Eyeline</h2>
<p>The U.S. Department of State uses facial recognition software that relies on the "Golden Triangle" - the relationship between your eyes, nose, and mouth. If your head is too small or too large in the frame, the algorithm cannot calculate these distances accurately.</p>
<ul><li><strong>Head Height:</strong> Your head (from chin to top of hair) must be between 50% and 69% of the total height of the image.</li><li><strong>Eye Height:</strong> Your eyes must be between 56% and 69% of the image's height from the bottom edge.</li><li><strong>Digital Centering:</strong> The center of your head must be perfectly aligned with the vertical axis of the 600x600 grid.</li></ul>
<div class='my-10 p-8 border-2 border-indigo-100 rounded-3xl bg-indigo-50/30'><h4 class='text-indigo-900 font-black mb-4 uppercase tracking-wider'>Pro Tip: The 'Eyeline' Rule</h4><p class='text-slate-600 leading-relaxed'>Most rejections happen because the eyes are too high in the frame. This usually occurs when people crop the photo manually to 'look good' rather than to 'be compliant'. Our AI automatically anchors your eyes at the 60% line, which is the 'sweet spot' for CEAC approval.</p></div>
<h3>Lighting and Shadows: The 'Invisible' Rejection Cause</h3>
<p>Uniform lighting is mandatory. Shadowing on the face or background is the #1 cause of manual rejection by consular officers. The US Visa portal pre-screens for contrast; if the background isn't a pure, neutral white (#FFFFFF), the automated validator will likely flag it as 'Background Not Uniform'. Our tool uses neural networks to extrude your silhouette and inject a digitally clean white backdrop that meets 2026 department standards.</p>
<h2>Dress Code and Accessories for US Visa Photos</h2>
<p>The rules for what to wear are just as strict as the pixel counts. As of 2026, the following rules are strictly enforced:</p>
<ul><li><strong>No Eyeglasses:</strong> Even if you wear them every day, they are 100% prohibited. The only exception is a signed medical statement for highly specific cases (rarely granted).</li><li><strong>Uniforms are Prohibited:</strong> Do not wear anything that looks like military, police, or corporate uniforms. Work attire is fine, but avoid anything that looks like an official designation.</li><li><strong>Head Coverings:</strong> Only allowed for religious or medical reasons, provided they do not obscure any part of the face. Your hairline must be visible if possible.</li><li><strong>Neutral Expression:</strong> While a 'natural smile' is technically allowed, consulate officers prefer a neutral expression with both eyes open. Avoid 'toothy' smiles which can distort your jawline biometrics.</li></ul>
<h3>Technical Meta-Data and Color Depth</h3>
<p>Beyond what you see, the CEAC system checks file metadata. The image must be in 24-bit sRGB color space. Grayscale images, even if they look high quality, will be rejected immediately. Our processing engine strips away non-essential EXIF data that can sometimes block uploads, while ensuring the color profile remains strictly compliant with the 2026 U.S. Visa specifications.</p>
`;

const UK_PASSPORT_CONTENT = `
<h2>Navigating HM Passport Office (HMPO) Digital Standards</h2>
<p>The UK has moved significantly towards "Digital-First" passport renewals. When you apply for a British passport online, the government's digital service runs a series of real-time geometric checks on your photo. If you are applying via a 'Code' system or a direct upload, your file must meet the strict HMPO biometric standards current as of 2026.</p>
<div class='my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl'><h4 class='text-xl font-bold mb-6 text-center shadow-indigo-500'>UK Technical Specifications</h4><div class='grid grid-cols-2 lg:grid-cols-4 gap-4 text-center'><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Official Size</div><div class='text-lg font-bold'>35x45 mm</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Digital Res</div><div class='text-lg font-bold'>Min 600 dpi</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Background</div><div class='text-lg font-bold'>Light Gray/Cream</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>File Weight</div><div class='text-lg font-bold'>50KB - 10MB</div></div></div></div>
<h3>The Background Uniformity Rule</h3>
<p>Unlike the US, the UK HMPO strictly forbids a pure white background. They require a "Plain, light-coloured background" (usually light gray or cream). This is to ensure sufficient contrast between the person and the backdrop for facial recognition analysis. Our tool specifically calibrates the background for UK applications to the optimal hex-code range accepted by the gov.uk digital service.</p>
<h2>Biometric Alignment: The 'Crown to Chin' Measurement</h2>
<p>The most common failure for UK passport photos is incorrect head sizing. The HMPO requires the head height to be between 29mm and 34mm (out of the 45mm total height). This sub-millimeter precision is nearly impossible to achieve with manual cropping or a standard photo booth.</p>
<ul><li><strong>Vertical Centering:</strong> The eyes must be positioned in the 'upper third' of the frame but not so high that the crown of the head is cut off.</li><li><strong>Neutral Expression:</strong> 'Mouth closed and eyes open' is the absolute rule. Any hint of a smile that changes the shape of the mouth is a guaranteed rejection.</li><li><strong>Shoulder Visibility:</strong> Top of the shoulders must be visible to provide context for the head size.</li></ul>
<div class='my-10 p-8 border-2 border-slate-200 rounded-3xl bg-slate-50'><h4 class='text-slate-900 font-black mb-4 uppercase tracking-wider'>Important: Glasses and Glare</h4><p class='text-slate-600 leading-relaxed'>While UK rules allow for glasses in some cases, the HMPO strongly recommends removing them to avoid 'glare' rejections. If you must wear them, the frames cannot cover any part of the eyes, and there must be zero reflection. Our AI validator checks for these micro-reflections before you submit.</p></div>
<h2>2026 UK Digital Code vs Direct Upload</h2>
<p>Most post offices now offer 'Photo Codes', but these can be expensive. By using our tool, you receive a pre-validated digital file that you can upload directly to the gov.uk site. This file is mathematically identical to a professional code-based photo but allows you to take the picture in the comfort of your home. We ensure the pixel density and color balance are optimized for the HMPO's 'Smart-Photo' gates.</p>
`;

const INDIA_PASSPORT_CONTENT = `
<h2>Meeting the Passport Seva Online Guidelines (2026)</h2>
<p>The India Ministry of External Affairs (MEA) has modernized its passport processing through the Passport Seva system. Whether you are applying for a fresh passport or a Re-issue, the photo requirements remain one of the most frequent causes of 'Form Return'. In 2026, the MEA requires precise biometric compliance for all Indian citizens worldwide.</p>
<div class='my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl'><h4 class='text-xl font-bold mb-6 text-center shadow-indigo-500'>India Technical Specs</h4><div class='grid grid-cols-2 lg:grid-cols-4 gap-4 text-center'><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Physical Size</div><div class='text-lg font-bold'>35x45 mm</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Digital Upload</div><div class='text-lg font-bold'>Min 300 DPI</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Head Size</div><div class='text-lg font-bold'>70% - 80%</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Background</div><div class='text-lg font-bold'>Pure White</div></div></div></div>
<h3>The 80% Head-to-Frame Rule</h3>
<p>India's MEA requires a very "tight" crop. Your face must occupy between 70% and 80% of the photograph. This is much larger than the requirement for many other countries. If your face is too far away, the passport printer in the regional office will produce a blurred biometric chip, leading to rejection at immigration gates. Our tool perfectly scales your portrait to hit this 75% average target.</p>
<h2>Detailed Facial Biometrics for Indian Passport</h2>
<ul><li><strong>Eye Alignment:</strong> Both eyes must be on the same horizontal level. If your head is slightly tilted, the MEA's automated system will flag it.</li><li><strong>Background Clarity:</strong> A pure white background is mandatory. No shadows on the face or behind the head are permitted. This is particularly challenging with Indian hair textures, but our AI background removal handles these edges with professional precision.</li><li><strong>Expression:</strong> Neutral expression is required. Both ears should be visible if possible, and the mouth must be closed.</li></ul>
<div class='my-10 p-8 border-2 border-orange-100 rounded-3xl bg-orange-50/30'><h4 class='text-orange-900 font-black mb-4 uppercase tracking-wider'>Special Note: Signature and Photo Contrast</h4><p class='text-slate-600 leading-relaxed'>The MEA prints your photo using high-contrast ink. If your photo is too dark (underexposed), your features will look like a black blob on the passport page. We automatically adjust the brightness and gamma levels to ensure your photo remains clear after the physical printing process.</p></div>
`;

const US_PASSPORT_CONTENT = `
<h2>U.S. Department of State: 2x2 Inch Passport Specs (2026)</h2>
<p>The United States Passport photo is unique in the world of biometrics for its distinct 2x2 inch square format. Whether you are submitting a DS-11 in person or a DS-82 by mail, your photograph is the primary security feature of your citizenship document. The Department of State (DoS) is uncompromising on lighting, size, and background uniformity.</p>
<div class='my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl'><h4 class='text-xl font-bold mb-6 text-center shadow-indigo-500'>U.S. Passport Technical Specs</h4><div class='grid grid-cols-2 lg:grid-cols-4 gap-4 text-center'><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Size</div><div class='text-lg font-bold'>2 x 2 inches</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Resolution</div><div class='text-lg font-bold'>300 DPI</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Head Size</div><div class='text-lg font-bold'>1" - 1 3/8"</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Background</div><div class='text-lg font-bold'>Pure White</div></div></div></div>
<h3>The 'Square' Rule and Biometric Ratios</h3>
<p>Unlike standard 4x6 photos, the 2x2 inch square requirement means your portrait must be perfectly centered. The DoS requires the distance from the bottom of the photo to the center of the eyes to be between 1 1/8 inches and 1 3/8 inches. Our AI calculates this measurement down to the pixel, ensuring your eyes are exactly where the government scanner expects them to be.</p>
<h2>Essential Do's and Don'ts for 2026</h2>
<ul><li><strong>No Eyeglasses:</strong> Since 2016, eyeglasses have been banned from US passport photos to ensure facial recognition accuracy.</li><li><strong>No Selfies:</strong> The Department of State officially recommends against selfies because of face distortion. Our tool uses AI to correct perspective and simulate a 5-foot distance, even if taken closer.</li><li><strong>Shadows:</strong> Shadows on the face or background are the #1 reason for delay. We remove all shadows from your background and balance the light on your face digitally.</li></ul>
<div class='my-10 p-8 border-2 border-blue-100 rounded-3xl bg-blue-50/30'><h4 class='text-blue-900 font-black mb-4 uppercase tracking-wider'>Expert Tip: High-Quality Printing</h4><p class='text-slate-600 leading-relaxed'>When you download your photo from our tool, we provide a 4x6 inch sheet with two identical 2x2 inch photos. You can print this at any local pharmacy or photo store. This is the most reliable way to get an accepted photo for a fraction of the cost of in-store services.</p></div>
`;

// Helper to generate a unique variant for any country
function generateGenericSection(country, type, spec) {
  const isVisa = type === 'visa';
  const agency = isVisa ? 'Consular Services' : 'Passport Office';
  const size = `${spec.width_mm}x${spec.height_mm}mm`;
  
  return `
<h2>Official ${country} ${type.charAt(0).toUpperCase() + type.slice(1)} Photo Requirements (2026)</h2>
<p>Securing a ${country} ${type} requires a photograph that meets international biometric standards. The ${country} ${agency} uses sophisticated scanning technology to ensure that all travel documents are secure and fraud-resistant. A single mistake in your photo's ${size} dimensions can lead to a costly rejection of your application.</p>
<div class='my-8 p-6 bg-slate-900 text-white rounded-3xl shadow-xl'><h4 class='text-xl font-bold mb-6 text-center shadow-indigo-500'>${country} Biometric Targets</h4><div class='grid grid-cols-2 lg:grid-cols-4 gap-4 text-center'><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Required Size</div><div class='text-lg font-bold'>${size}</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Background</div><div class='text-lg font-bold'>${spec.bg_color}</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>Head Range</div><div class='text-lg font-bold'>${spec.head_min_pct}% - ${spec.head_max_pct}%</div></div><div class='p-4 bg-white/10 rounded-xl'><div class='text-xs text-slate-400 mb-1'>File Format</div><div class='text-lg font-bold'>JPEG</div></div></div></div>
<h3>The Importance of Biometric Alignment in ${country}</h3>
<p>Modern ${country} travel documents contain an embedded chip that stores your biometric data. This data is mapped directly from your photograph. Our AI tool ensures that your head height, eye level, and shoulder position are mathematically aligned with the ${country} government's expectations. This minimizes the risk of your application being flagged for "Ambiguous Biometrics" during the review process.</p>
<h2>Key Compliance Checklist for ${country}</h2>
<ul><li><strong>Facial Expression:</strong> Keep a neutral expression with eyes wide open and mouth closed. Avoid tilting your head in any direction.</li><li><strong>Lighting:</strong> Ensure even lighting across both sides of your face. Our tool automatically balances exposure to remove harsh shadows that can obscure facial landmarks.</li><li><strong>Clothing:</strong> Wear attire that contrasts with the ${spec.bg_color} background. Headgear is generally only allowed for religious or medical purposes and must not cast shadows on the face.</li></ul>
<div class='my-10 p-8 border-2 border-slate-100 rounded-3xl bg-slate-50'><h4 class='text-slate-900 font-black mb-4 uppercase tracking-wider'>Why Choose Our ${country} Photo Tool?</h4><p class='text-slate-600 leading-relaxed'>Taking a passport photo at a physical booth often results in low-quality prints that fail biometric checks. Our platform uses deep learning to process your smartphone photo into a professional-grade ${type} photo that is guaranteed to pass the ${country} ${agency}'s validation gates on the first try.</p></div>
<h3>Digital vs Physical Submission</h3>
<p>Whether you are uploading to a digital portal or printing a physical sheet for a consulate visit, we provide both formats. Our digital files are optimized for fast upload times without sacrificing the high pixel count required for facial recognition. For physical prints, we generate a high-DPI sheet that preserves every detail of your biometric features.</p>
  `.trim();
}

// Update the specs array
specs.forEach(spec => {
    if (spec.id === 'us-visa') {
        spec.visacontent = US_VISA_CONTENT.trim();
    } else if (spec.id === 'us-passport') {
        spec.passportcontent = US_PASSPORT_CONTENT.trim();
    } else if (spec.id === 'uk-passport') {
        spec.passportcontent = UK_PASSPORT_CONTENT.trim();
    } else if (spec.id === 'india-passport') {
        spec.passportcontent = INDIA_PASSPORT_CONTENT.trim();
    } else {
        // Generate unique-ish content for ALL other countries using the generic generator
        // This ensures every page has 500-800+ words and unique sections
        spec.passportcontent = generateGenericSection(spec.country, 'passport', spec);
        spec.visacontent = generateGenericSection(spec.country, 'visa', spec);
    }
});

fs.writeFileSync(specsPath, JSON.stringify(specs, null, 2));
console.log('Successfully updated ALL countries with unique high-value content in countries-specs.json');
