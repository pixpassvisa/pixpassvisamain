/** The page template already owns H1; keep article text as subordinate headings. */
export function normalizeArticleHeadings(html: string): string {
  return html.replace(/<(\/?)(h1)(?=[\s>])/gi, '<$1h2');
}
