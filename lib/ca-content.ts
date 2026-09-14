import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface CAFaqItem {
  question: string;
  answer: string;
}

export interface CATocItem {
  id: string;
  text: string;
  level: number;
}

export interface CAPageMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  updatedAt?: string;
  author: string;
  category: string;
  readingTime: string;
  image: string;
  keywords?: string;
  h1?: string;
  defaultDoc?: string;
  toolTitle?: string;
  toolSubtitle?: string;
  faq?: CAFaqItem[];
}

export interface CAPageDetail extends CAPageMeta {
  contentHtml: string;
  toc: CATocItem[];
}

const CA_CONTENT_DIR = path.join(process.cwd(), "content/ca");

/**
 * Ensures the content/ca directory exists
 */
function ensureCAContentDir() {
  if (!fs.existsSync(CA_CONTENT_DIR)) {
    fs.mkdirSync(CA_CONTENT_DIR, { recursive: true });
  }
}

/**
 * Slugify heading text for anchors
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extracts h2 & h3 headings for Table of Contents
 */
function extractToc(markdownContent: string): CATocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: CATocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const rawText = match[2].replace(/[\*\_~`]/g, "").trim();
    const id = slugify(rawText);
    toc.push({ id, text: rawText, level });
  }

  return toc;
}

/**
 * Configure custom renderer to add IDs to h2 and h3 elements
 */
function compileMarkdownToHtml(markdownContent: string): string {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const rawText = text.replace(/<[^>]*>/g, "");
    const id = slugify(rawText);
    
    if (depth === 2 || depth === 3) {
      return `<h${depth} id="${id}" class="scroll-mt-24 font-bold text-slate-900 mt-8 mb-4">${text}</h${depth}>\n`;
    }
    return `<h${depth} class="font-bold text-slate-900 mt-6 mb-3">${text}</h${depth}>\n`;
  };

  return marked(markdownContent, { renderer }) as string;
}

/**
 * Get all Canada Markdown pages metadata (sorted by date descending)
 */
export function getAllCAPages(): CAPageMeta[] {
  ensureCAContentDir();
  const fileNames = fs.readdirSync(CA_CONTENT_DIR);

  const pages = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(CA_CONTENT_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const defaultSlug = fileName.replace(/\.md$/, "");

      return {
        title: data.title || "Canada Passport & Visa Photo Guide",
        description: data.description || "Create compliant Canada passport and visa photos online.",
        slug: data.slug || defaultSlug,
        date: data.date || new Date().toISOString().split("T")[0],
        updatedAt: data.updatedAt,
        author: data.author || "PixPassVisa Canada Team",
        category: data.category || "Canada Passport & Visa",
        readingTime: data.readingTime || "4 Min.",
        image: data.image || "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp",
        keywords: data.keywords || "canada passport photo, canada visa photo, ircc photo requirements",
        h1: data.h1,
        defaultDoc: data.defaultDoc || "canada-passport",
        toolTitle: data.toolTitle,
        toolSubtitle: data.toolSubtitle,
        faq: data.faq || [],
      } as CAPageMeta;
    });

  return pages.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

/**
 * Get full Canada page detail by slug
 */
export function getCAPageBySlug(slug: string): CAPageDetail | null {
  ensureCAContentDir();
  const fileNames = fs.readdirSync(CA_CONTENT_DIR);
  const targetFile = fileNames.find((file) => {
    if (!file.endsWith(".md")) return false;
    const fullPath = path.join(CA_CONTENT_DIR, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    const fileSlug = data.slug || file.replace(/\.md$/, "");
    return fileSlug === slug;
  });

  if (!targetFile) return null;

  const fullPath = path.join(CA_CONTENT_DIR, targetFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const contentHtml = compileMarkdownToHtml(content);
  const toc = extractToc(content);

  const defaultSlug = targetFile.replace(/\.md$/, "");

  return {
    title: data.title || "Canada Passport & Visa Photo Guide",
    description: data.description || "Create compliant Canada passport and visa photos online.",
    slug: data.slug || defaultSlug,
    date: data.date || new Date().toISOString().split("T")[0],
    updatedAt: data.updatedAt,
    author: data.author || "PixPassVisa Canada Team",
    category: data.category || "Canada Passport & Visa",
    readingTime: data.readingTime || "4 Min.",
    image: data.image || "https://res.cloudinary.com/dipzpwbbk/image/upload/v1786116374/uk_passport_photo_after_atvxmj.webp",
    keywords: data.keywords || "",
    h1: data.h1,
    defaultDoc: data.defaultDoc || "canada-passport",
    toolTitle: data.toolTitle,
    toolSubtitle: data.toolSubtitle,
    faq: data.faq || [],
    contentHtml,
    toc,
  };
}

/**
 * Get all Canada page slugs for static route generation
 */
export function getAllCAPageSlugs(): string[] {
  const pages = getAllCAPages();
  return pages.map((p) => p.slug);
}
