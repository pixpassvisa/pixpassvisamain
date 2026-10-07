// Dynamic FAQ Extractor: Parses FAQs directly from each blog post's content
export function extractFaqsFromContent(content: string): { faqs: { question: string; answer: string }[]; cleanContent: string } {
  const faqs: { question: string; answer: string }[] = [];
  const faqMatch = content.match(/<h2[^>]*>.*?(faq|frequently asked questions).*?<\/h2>/i);
  if (!faqMatch) return { faqs, cleanContent: content };

  const faqStartIndex = content.indexOf(faqMatch[0]);
  const contentAfterFaqHeader = content.slice(faqStartIndex + faqMatch[0].length);
  const nextH2Match = contentAfterFaqHeader.match(/<h2[^>]*>/i);
  const faqEndIndex = nextH2Match
    ? (faqStartIndex + faqMatch[0].length + contentAfterFaqHeader.indexOf(nextH2Match[0]))
    : content.length;

  const faqHtml = content.slice(faqStartIndex + faqMatch[0].length, faqEndIndex);

  // Pattern 1: <h3>Question</h3> <p>Answer</p>
  const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = h3Regex.exec(faqHtml)) !== null) {
    const q = match[1].replace(/<[^>]*>/g, '').trim();
    const a = match[2].replace(/<[^>]*>/g, '').trim();
    if (q && a) faqs.push({ question: q, answer: a });
  }

  // Pattern 2: Cards with font-bold
  if (faqs.length === 0) {
    const cardRegex = /<p[^>]*class=\"[^\"]*font-bold[^\"]*\"[^>]*>(?:Q:\s*)?([\s\S]*?)<\/p>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
    while ((match = cardRegex.exec(faqHtml)) !== null) {
      const q = match[1].replace(/<[^>]*>/g, '').trim().replace(/^Q:\s*/i, '');
      const a = match[2].replace(/<[^>]*>/g, '').trim();
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // Pattern 3: <p><strong>Question</strong><br>Answer</p>
  if (faqs.length === 0) {
    const pRegex = /<p[^>]*>\s*<strong[^>]*>(?:Q:\s*)?([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*([\s\S]*?)<\/p>/g;
    while ((match = pRegex.exec(faqHtml)) !== null) {
      const q = match[1].replace(/<[^>]*>/g, '').trim().replace(/^Q:\s*/i, '');
      const a = match[2].replace(/<[^>]*>/g, '').trim();
      if (q && a) faqs.push({ question: q, answer: a });
    }
  }

  // Preserve unfamiliar FAQ markup instead of dropping its content.
  if (faqs.length === 0) return { faqs, cleanContent: content };

  // Clean raw FAQ block out of content to prevent duplicate display
  const cleanContent = content.slice(0, faqStartIndex) + content.slice(faqEndIndex);
  return { faqs, cleanContent };
}
