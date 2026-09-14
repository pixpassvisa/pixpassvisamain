import { SpecEntry } from "@/lib/slug-utils";

interface ContentBlock {
  type: "h2" | "h3" | "h4" | "p" | "ul";
  text?: string;
  items?: string[];
}

interface AgencyData {
  name: string;
  portal_type: string;
}

const AGENCIES: Record<string, AgencyData> = {
  "United States": { name: "U.S. Department of State", portal_type: "State.gov portal" },
  "United Kingdom": { name: "HM Passport Office (HMPO)", portal_type: "Gov.uk digital service" },
  "India": { name: "Ministry of External Affairs", portal_type: "Passport Seva Online" },
  "Australia": { name: "Australian Passport Office (DFAT)", portal_type: "APO Online" },
  "China": { name: "National Immigration Administration", portal_type: "NIA Service Platform" },
  "Germany": { name: "Bürgeramt", portal_type: "Municipal authorities" },
  "France": { name: "ANTS (Agence Nationale des Titres Sécurisés)", portal_type: "ANTS Digital Service" },
  "Canada": { name: "Immigration, Refugees and Citizenship Canada (IRCC)", portal_type: "IRCC Portal" },
  "Japan": { name: "Ministry of Foreign Affairs", portal_type: "MOFA Online Services" },
  "Schengen": { name: "Schengen Area Member States", portal_type: "Schengen Consulate" },
};

// Extremely simple deterministic hash to pick an array index consistently
function getSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

function pickVariant<T>(variants: T[], seed: number, offset: number = 0): T {
  return variants[(seed + offset) % variants.length];
}

export function generateLongformContent(spec: SpecEntry, isVisa: boolean): ContentBlock[] {
  const country = spec.country;
  const docType = isVisa ? "Visa" : "Passport";
  const agency = AGENCIES[country] || { name: `${country} Immigration Authorities`, portal_type: "official government portal" };
  const sizeText = `${spec.width_mm}x${spec.height_mm}mm`;
  
  const seed = getSeed(spec.id);
  
  if (isVisa) {
    return generateVisaContent(spec, country, docType, agency, sizeText, seed);
  } else {
    return generatePassportContent(spec, country, docType, agency, sizeText, seed);
  }
}

function generatePassportContent(spec: SpecEntry, country: string, docType: string, agency: AgencyData, sizeText: string, seed: number): ContentBlock[] {
  const content: ContentBlock[] = [];

  // --- H2: Official Standards ---
  const headers = [
    `Official ${country} Passport Photo Standards & Biometric Rules`,
    `Mandatory Requirements for ${country} Passport Identification`,
    `Government-Verified ${docType} Photo Guidelines for ${country}`,
    `Everything You Need to Know About ${country} Passport Biometrics`
  ];
  content.push({ type: "h2", text: pickVariant(headers, seed, 0) });

  const p1 = [
    `Renewing or applying for a ${country} passport is a significant step in establishing your international identity. The ${agency.name} maintains extremely rigid standards for these photos, as they are printed onto security-enhanced ID documents that must last for up to a decade. Unlike temporary travel documents, a passport photo is a permanent biometric anchor. Any deviation in the mandated ${sizeText} frame or background uniformity can lead to an immediate rejection of your citizenship paperwork.`,
    `Your ${country} passport is your most valuable travel asset, and its validity hinges on a compliant photograph. The biometric algorithms used by the ${agency.name} require a clinical level of precision. From horizontal head alignment to the exact ${spec.bg_color} background hue, every pixel is scrutinized to ensure it integrates with the national global security database. A failed photo isn't just a delay; it's a security flag that can complicate your renewal for years.`
  ];
  content.push({ type: "p", text: pickVariant(p1, seed, 1) });

  // --- H3: Physical Print Specs ---
  content.push({ type: "h3", text: `Physical Size & Print-Ready Specifications` });
  const p2 = [
    `For ${country}, the official dimension is strictly ${spec.width_mm}mm by ${spec.height_mm}mm. Our AI ensures that when you download your results, you receive a high-resolution 4x6 inch sheet that is ready for instant printing at any local store. This guarantees that the physical print you submit to the embassy or ${agency.portal_type} is cut to the exact millimeter defined by the latest ICAO 9303 standards.`,
    `The ${agency.name} requires a precise physical output of ${spec.width_mm}x${spec.height_mm}mm. Amateur cropping often leads to "jagged edges" or pixelation during the printing process. Our platform optimizes the DPI (dots per inch) specifically for official passport printers, ensuring your hard-copy submission is as crisp and professional as if it were taken in a high-end government studio.`
  ];
  content.push({ type: "p", text: pickVariant(p2, seed, 2) });

  // --- H3: Biometrics ---
  content.push({ type: "h3", text: `Biometric Head Positioning & Facial Alignment` });
  const p3 = [
    `Biometric validation is the core of modern passport security. In ${country}, your head must occupy between ${spec.head_min_pct}% and ${spec.head_max_pct}% of the total vertical height. Our computer vision model maps over 50 facial landmarks to ensure your eyes sit perfectly at the ${spec.eye_min_pct}% line from the bottom edge. This alignment is critical for the recognition software used at ${country} border crossings.`,
    `To pass the automated gates in ${country}, your facial geometry must be perfectly centered. We calibrate your portrait so that the distance from the top of your hair to your chin satisfies the strict ${spec.head_min_pct}%-${spec.head_max_pct}% ratio. This meticulous attention to biometric constants is what separates an accepted passport photo from one that causes an application denial.`
  ];
  content.push({ type: "p", text: pickVariant(p3, seed, 3) });

  return content;
}

function generateVisaContent(spec: SpecEntry, country: string, docType: string, agency: AgencyData, sizeText: string, seed: number): ContentBlock[] {
  const content: ContentBlock[] = [];

  // --- H2: Digital Portal Compliance ---
  const headers = [
    `Passing the ${country} Visa Digital Submission & DS-160 Checks`,
    `EMBASSY COMPLIANCE: Digital Photo Specs for ${country} Visas`,
    `Ensuring Your ${country} Visa Approval: Photo Guidelines`,
    `Digital Upload Requirements for ${country} e-Visa & Consular Forms`
  ];
  content.push({ type: "h2", text: pickVariant(headers, seed, 0) });

  const p1 = [
    `Applying for a ${country} visa is often a high-stakes process where a single technical error can result in a denial. Consular portals, such as the ${agency.portal_type}, utilize automated "Quality Alerts" to pre-screen digital uploads. These systems are notoriously sensitive to file size (KB), resolution, and JPEG compression. If your ${docType} photo isn't mathematically perfect, you won't even be able to submit your form, potentially jeopardizing your travel timeline.`,
    `The ${agency.name} enforces a different set of rules for visas than they do for internal passports. When you upload your image to their consular portal, it must meet strict digital criteria: typically a minimum of ${spec.width_px}x${spec.height_px} pixels and a file size under a specific KB limit. Our tool is designed to bypass "Administrative Processing" delays by delivering a pre-validated digital file that passes the ${country} embassy's automated gates on the very first try.`
  ];
  content.push({ type: "p", text: pickVariant(p1, seed, 1) });

  // --- H3: Digital Specs ---
  content.push({ type: "h3", text: `Digital Sizing: KB Limits, Resolution, and Pixel Density` });
  const p2 = [
    `Unlike physical prints, a ${country} visa photo for portals like the ${agency.portal_type} must be optimized for the web. We use intelligent compression algorithms that keep your file size low enough to bypass upload caps while maintaining the sub-millimeter sharpness required for biometric face-matching. Our AI transforms your smartphone photo into a perfectly rendered ${spec.width_px}x${spec.height_px} pixel file, formatted in the mandatory 24-bit sRGB color space.`,
    `For ${country} visa applicants, the "Digital Upload" is the primary hurdle. Consulates often reject photos that are too large in file size or too blurry. We utilize proprietary sharpening filters that stabilize the eye-height at precisely ${spec.eye_min_pct}% while maintaining a high-fidelity resolution that satisfies the official requirements. This balance of file weight and clarity is essential for passing the ${country} government's digital screening.`
  ];
  content.push({ type: "p", text: pickVariant(p2, seed, 2) });

  // --- H3: Rejection Risk ---
  content.push({ type: "h3", text: `Why Visa Photos Cause Application Refusals` });
  const p3 = [
    `Incorrect background shades or subtle facial shadows are leading causes of visa interview delays. Embassies for ${country} require a pristine, shadow-free ${spec.bg_color} background to ensure their facial recognition software can isolate your features accurately. Our neural-network based removal tool extrudes your silhouette with 100% accuracy, injecting the verified ${spec.bg_color} backdrop needed to prevent a "Quality Alert" during your digital application.`,
    `Avoid the frustration of being turned away at the ${country} consulate. Most visa rejections are preventative—based on "unstable biometrics" caused by poor lighting or non-neutral expressions. We run a 50-point compliance sweep on every ${docType} photo, checking for tilted eye-lines, open mouths, and glasses glare, ensuring your documentation remains above suspicion during the review process.`
  ];
  content.push({ type: "p", text: pickVariant(p3, seed, 3) });

  return content;
}
