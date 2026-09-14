import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Common FAQs to inject into posts that don't have them
const commonFaqs = [
  {
    q: "How strict are the US visa photo requirements?",
    a: "Extremely strict. A single shadow, slight tilt of the head, or incorrect background color can result in immediate rejection by the facial recognition software."
  },
  {
    q: "Can I take my own passport photo at home?",
    a: "Yes! Using a smartphone and a tool like USVisaPhotoAI, you can take a photo against any background and the AI will format it to U.S. State Department biometric standards."
  },
  {
    q: "What is the fastest way to check if my photo goes through?",
    a: "You can use our free Photo Validator tool to get an instant PASS/FAIL compliance report on your image before you submit it."
  }
];

function generateFaqHTML(faqs) {
  let html = `<h2>Frequently Asked Questions</h2><div itemscope itemtype="https://schema.org/FAQPage">`;
  for (const faq of faqs) {
    html += `
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h3 itemprop="name">${faq.q}</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text">${faq.a}</p>
        </div>
      </div>
    `;
  }
  html += `</div>`;
  return html;
}

data.forEach((post, index) => {
  // Update author
  post.author = "USVisaPhotoAI Team";

  // Update date to March 2026
  post.date = `2026-03-${String(15 + (index % 10)).padStart(2, '0')}`;

  // Interlink words
  post.content = post.content.replace(/PhotoStudio/g, '<a href="/">USVisaPhotoAI</a>');
  post.content = post.content.replace(/free validator/gi, '<a href="/visa-photo-validator">free validator</a>');

  // Only inject FAQ if not already there
  if (!post.content.includes("Frequently Asked Questions")) {
    post.content += generateFaqHTML(commonFaqs);
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
console.log("Blog posts updated successfully.");
