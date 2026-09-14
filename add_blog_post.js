const fs = require("fs");
const path = require("path");
const { pingIndexNow } = require("./scripts/indexnow");

const dataPath = path.join(__dirname, "data", "blog-posts.json");
const rawData = fs.readFileSync(dataPath, "utf8");
let posts = JSON.parse(rawData);

const newPost = {
  "slug": "uk-visa-photo-requirements-by-visa-type",
  "title": "UK Visa Photo Requirements: Every Visa Type Explained (Student, Tourist, Spouse)",
  "description": "Official 2026 breakdown of UK visa photo requirements by category — student visa, Standard Visitor (tourist) visa, spouse/family visa, and ETA. Covers the 600×750px digital standard, biometric enrolment at Visa Application Centres, the UK Immigration: ID Check app, and what applicants from India and other countries need to know. Sourced from gov.uk and UK Visas and Immigration (UKVI) policy guidance.",
  "date": "2026-06-16",
  "author": "PixPassVisa Team",
  // Replace with your own uploaded/branded image — placeholder follows your existing Cloudinary naming pattern
  "featuredImage": "https://res.cloudinary.com/dipzpwbbk/image/upload/v1781650000/uk-visa-photo-requirements-by-type_placeholder.webp",

  "content": `
    <h1>UK Visa Photo Requirements: Every Visa Type Explained (Student, Tourist, Spouse)</h1>

    <p>Whatever route you're applying under, the photo rules behind a UK visa come from the same place: UK Visas and Immigration (UKVI) biometric enrolment policy. Whether you're searching for <strong>uk student visa photo requirements</strong>, <strong>uk tourist visa photo requirements</strong>, or <strong>uk spouse visa photo requirements</strong>, the underlying photo standard is identical across categories — what changes is how and where that photo gets captured. This guide breaks it down by visa type, using official gov.uk guidance.</p>

    <h2>The Standard UK Visa Photo Specification (Applies to All Categories)</h2>
    <p>Per UKVI's biometric enrolment policy guidance, any facial image submitted digitally — for an eVisa, ETA, or via the ID Check app — must meet this technical spec:</p>
    <ul>
      <li>JPEG or JPG file format</li>
      <li>At least <strong>50KB</strong>, no more than <strong>6MB</strong></li>
      <li>At least <strong>600 × 750 pixels</strong>, in portrait orientation</li>
      <li>In colour — greyscale images aren't accepted</li>
      <li>Taken against a plain, neutral-coloured background with clear contrast</li>
      <li>Unmodified by filters or editing software, and not a photo of a photo (e.g. not a picture of your passport's bio-data page)</li>
    </ul>
    <p>On top of the file rules, the person in the photo must be facing forward with eyes open and visible, have nothing covering their face or hair across their eyes, and have no head covering unless it's worn for religious or medical reasons. Sunglasses and tinted lenses aren't allowed; regular glasses are fine as long as there's no glare or reflection over the eyes. UKVI also asks applicants to get someone else to take the photo for them rather than using a pure selfie.</p>

    <img src="https://assets.publishing.service.gov.uk/media/60a384e6d3bf7f0a00ab1b88/Adult_Photo_guidance_HMPO-v2.jpeg" alt="Official UK government example of an acceptable passport-style photo used as the UKVI biometric photo standard" style="max-width:100%;border-radius:12px;margin:24px auto;display:block;" />
    <p style="text-align:center;font-size:0.875rem;color:#6b7280;">Official passport-photo-standard example referenced by UKVI for visa facial images. Source: gov.uk</p>

    <h2>How Your Visa Photo Is Actually Captured</h2>
    <p>There are two main routes. Most overseas and many in-country applicants attend a Visa Application Centre (VAC) or UK Visa and Citizenship Application Services (UKVCAS) appointment, where staff capture fingerprints and a facial photo for you as part of biometric enrolment. The alternative is the <strong>UK Immigration: ID Check</strong> app or an online form, used for ETA applications, eVisas, and anyone eligible to reuse previously enrolled fingerprint biometrics — in that case, you submit your own live digital photo meeting the spec above.</p>

    <h3>UK Student Visa Photo Requirements</h3>
    <p>Student route applicants are, in most cases, required to enrol their biometrics — including a facial photograph — at a VAC or UKVCAS appointment as part of their application. If you're extending or switching into the Student route from inside the UK and you're eligible for biometric reuse, you may be able to skip the in-person appointment and submit a new facial image through the ID Check app instead.</p>

    <h3>UK Standard Visitor (Tourist) Visa Photo Requirements</h3>
    <p>If you need a full Standard Visitor visa, you'll typically attend a VAC appointment where your photo and fingerprints are taken on-site. If you're a non-visa national from a country covered by the Electronic Travel Authorisation (ETA) scheme, you won't need to visit a centre at all — instead, you submit a live facial image yourself through the ETA app or the GOV.UK ETA webpage, and the Home Office checks it against the photo in your passport.</p>

    <h3>UK Spouse and Family Visa Photo Requirements</h3>
    <p>Spouse, partner, and other family visa applications follow the same biometric enrolment process: a facial photograph and fingerprints captured at a VAC (if applying from overseas) or a UKVCAS appointment (if applying or extending from inside the UK). Children under 5 don't need to provide fingerprints, but a digitised image of their face is still required.</p>

    <h2>Photo Requirements for Applicants From India and Other Countries</h2>
    <p>The technical and presentation standard doesn't change based on where you apply — a <strong>photo for a UK visa from India</strong> follows exactly the same rules as one submitted in any other country. In practice, most Indian applicants attend a Visa Application Centre where the facial photo is captured as part of the appointment, so there's usually no need to source a printed photo in advance. If your route requires you to upload documents online before that appointment, the same 600×750px JPEG digital standard applies regardless of your location.</p>

    <h2>Common Mistakes That Get Visa Photos Rejected</h2>
    <ul>
      <li>Submitting a photo of your passport page or an old printed photo instead of a new, live image</li>
      <li>Background that isn't plain or neutral-coloured</li>
      <li>Glare or shadow across glasses lenses</li>
      <li>Head covering worn for non-religious, non-medical reasons</li>
      <li>File below 600×750px or larger than the 6MB limit for app/online submissions</li>
    </ul>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center my-8">
      <p class="text-lg font-semibold text-gray-800 mb-2">Check Your UK Visa Photo Before You Apply</p>
      <p class="text-gray-600 mb-4 text-sm">Verify your photo against the UKVI 2026 standard: 600×750px minimum, plain neutral background, no glare, correct framing — whether you're applying for a student, tourist, spouse, or ETA route.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://www.pixpassvisa.com/passport-photo-online?type=uk-visa" class="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition duration-200 shadow">Check My UK Visa Photo</a>
        <a href="https://www.gov.uk/government/publications/biometric-information/biometric-information-enrolment-accessible" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-lg border border-gray-800 text-gray-800 font-medium hover:bg-gray-100 transition duration-200">Read Official UKVI Guidance →</a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Powered by <a href="https://www.pixpassvisa.com" class="text-gray-700 hover:underline font-medium">PixPassVisa</a></p>
    </div>

    <!--
      Meta Title: UK Visa Photo Requirements by Type 2026 — Student, Tourist, Spouse
      Meta Description: Official 2026 UK visa photo guide by category. Student, Standard Visitor, spouse/family visa, and ETA rules — 600×750px standard, biometric enrolment, ID Check app. Sourced from gov.uk and UKVI.
      Slug: uk-visa-photo-requirements-by-visa-type
      Last Updated: June 2026
    -->
  `
};

posts.push(newPost);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 4), "utf8");
console.log("Successfully added UK visa photo requirements by visa type blog post.");

// Trigger IndexNow Ping
const siteUrl = "https://www.pixpassvisa.com";
const postUrl = `${siteUrl}/blog/${newPost.slug}`;
pingIndexNow([postUrl, siteUrl]);