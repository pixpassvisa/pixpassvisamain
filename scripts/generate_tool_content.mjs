import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('./data/tool-seo-pages.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const pages = JSON.parse(rawData);

function generateContent(keyword, title) {
  return `
    <h2>The Ultimate <strong>${keyword}</strong> Guide</h2>
    <p>
      Creating biometric photos for official documents can be a stressful, confusing, and expensive process. 
      Whether you are applying for a visa, renewing your passport, or creating a new identity card, getting the photo specifications right is critical. 
      That is exactly why we built the ultimate <strong>${title}</strong>. 
      With strict government requirements regulating head size, background color, and image resolution, a single mistake can result in your application being rejected.
      Our advanced, AI-powered <strong>${keyword.toLowerCase()}</strong> eliminates the guesswork, providing you with a guaranteed compliant photo in under two minutes from the comfort of your own home.
    </p>

    <div class="my-8 p-8 bg-blue-50 text-blue-900 rounded-3xl border border-blue-100 shadow-sm">
      <h3 class="text-2xl font-bold mb-4">How to Use the ${keyword}</h3>
      <p class="mb-4 text-blue-800">
        We have streamlined the entire process so that you don't need any technical skills or photography experience. 
        Follow these three simple steps to use our <strong>${keyword.toLowerCase()}</strong>:
      </p>
      <ol class="list-decimal pl-5 space-y-3 font-medium">
        <li><strong>Select Your Document:</strong> Start by choosing your target country and document type from the dropdown menu above. Our system is pre-loaded with exact, up-to-date biometric specifications for over 100 countries.</li>
        <li><strong>Upload Your Photo:</strong> Take a photo with your smartphone or digital camera against any background. Look straight at the camera with a neutral expression. Drag and drop the file into our upload zone.</li>
        <li><strong>Let AI Do The Work:</strong> Our intelligent <strong>${keyword.toLowerCase()}</strong> instantly detects your face, completely removes the original background, sets the correct background color, and precisely crops the image according to strict government guidelines.</li>
      </ol>
    </div>

    <h2>Why Choose Our AI-Powered <strong>${keyword}</strong>?</h2>
    <p>
      Traditional photo studios and pharmacies charge premium prices for a service that takes them minutes. 
      Furthermore, their software is often outdated, and human error frequently leads to photo rejections. 
      By choosing an automated online solution, you are leveraging state-of-the-art computer vision technology.
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4 mb-8">
      <li><strong>Automatic Background Removal:</strong> You no longer need to find a perfectly white or light blue wall. Our AI instantly isolates your face and replaces the background seamlessly.</li>
      <li><strong>Precision Cropping:</strong> Every country has strict rules regarding the percentage of the image your head must occupy. Our tool uses facial landmarks to ensure your eyes, chin, and crown are positioned perfectly within the frame.</li>
      <li><strong>Instant Verification:</strong> We perform over 30 distinct compliance checks on your final photo, validating lighting, contrast, resolution, and biometric markers before you even download it.</li>
      <li><strong>Print & Digital Ready:</strong> Whether you need a digital file for online DS-160 forms or a 4x6 print template for physical applications, we generate all the formats you require instantly.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <div class="space-y-6 mt-6">
      <div>
        <h4 class="text-lg font-bold text-slate-900">Is the ${keyword.toLowerCase()} really free to try?</h4>
        <p class="text-slate-600 mt-1">
          Yes! You can use our <strong>${keyword}</strong> to upload, process, and preview your photo completely free of charge. You only pay if you are 100% satisfied with the result and wish to download the high-resolution, watermark-free biometric photos and print templates.
        </p>
      </div>
      <div>
        <h4 class="text-lg font-bold text-slate-900">Will my photo be accepted by the government?</h4>
        <p class="text-slate-600 mt-1">
          Our system is built specifically around the official biometric guidelines published by government embassies and immigration departments worldwide. If you follow our simple photo-taking guidelines, your photo is guaranteed to be accepted.
        </p>
      </div>
      <div>
        <h4 class="text-lg font-bold text-slate-900">Can I take the photo with my smartphone?</h4>
        <p class="text-slate-600 mt-1">
          Absolutely. Modern smartphone cameras are more than capable of taking high-quality biometric photos. For the best results, stand facing a window for even, natural lighting, and have someone else take the photo from about 1.5 meters (5 feet) away.
        </p>
      </div>
      <div>
        <h4 class="text-lg font-bold text-slate-900">What happens if the background is complicated?</h4>
        <p class="text-slate-600 mt-1">
          Our advanced machine learning models are designed to handle complex backgrounds. However, for the absolute cleanest cut, we recommend standing against a relatively plain wall. The <strong>${keyword.toLowerCase()}</strong> will handle the rest, ensuring a flawless white, grey, or blue background as required by your selected country.
        </p>
      </div>
    </div>
  `;
}

// Generate and assign content for each page
const updatedPages = pages.map(page => {
  const keyword = page.h1;
  const title = page.title;
  page.content = generateContent(keyword, title);
  return page;
});

// Write the updated data back to the file
fs.writeFileSync(dataPath, JSON.stringify(updatedPages, null, 2), 'utf8');

console.log('Successfully generated content for ' + updatedPages.length + ' pages.');
