import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface UKFaqItem {
  question: string;
  answer: string;
}

export interface UKTocItem {
  id: string;
  text: string;
  level: number;
}

export interface UKPageMeta {
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
  faq?: UKFaqItem[];
}

export interface UKPageDetail extends UKPageMeta {
  contentHtml: string;
  toc: UKTocItem[];
}

const UK_CONTENT_DIR = path.join(process.cwd(), "content/uk");

/**
 * Ensures the content/uk directory exists
 */
function ensureUKContentDir() {
  if (!fs.existsSync(UK_CONTENT_DIR)) {
    fs.mkdirSync(UK_CONTENT_DIR, { recursive: true });
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
function extractToc(markdownContent: string): UKTocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: UKTocItem[] = [];
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
 * Get all UK Markdown pages metadata (sorted by date descending)
 */
export function getAllUKPages(): UKPageMeta[] {
  ensureUKContentDir();
  const fileNames = fs.readdirSync(UK_CONTENT_DIR);

  const pages = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(UK_CONTENT_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const defaultSlug = fileName.replace(/\.md$/, "");

      return {
        title: data.title || "UK Passport & Document Photo Guide",
        description: data.description || "Create compliant UK passport and visa photos online.",
        slug: data.slug || defaultSlug,
        date: data.date || new Date().toISOString().split("T")[0],
        updatedAt: data.updatedAt,
        author: data.author || "PixPassVisa UK Team",
        category: data.category || "UK Passport & Visa",
        readingTime: data.readingTime || "3 Min.",
        image: data.image || "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp",
        keywords: data.keywords || "uk passport photo, uk visa photo, uk document maker",
        h1: data.h1,
        defaultDoc: data.defaultDoc || "uk-passport-online",
        toolTitle: data.toolTitle,
        toolSubtitle: data.toolSubtitle,
        faq: data.faq || [],
      } as UKPageMeta;
    });

  return pages.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

/**
 * Get full UK page detail by slug
 */
export function getUKPageBySlug(slug: string): UKPageDetail | null {
  ensureUKContentDir();
  const fileNames = fs.readdirSync(UK_CONTENT_DIR);
  const targetFile = fileNames.find((file) => {
    if (!file.endsWith(".md")) return false;
    const fullPath = path.join(UK_CONTENT_DIR, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    const fileSlug = data.slug || file.replace(/\.md$/, "");
    return fileSlug === slug;
  });

  if (!targetFile) return null;

  const fullPath = path.join(UK_CONTENT_DIR, targetFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const contentHtml = compileMarkdownToHtml(content);
  const toc = extractToc(content);

  const defaultSlug = targetFile.replace(/\.md$/, "");

  return {
    title: data.title || "UK Passport & Document Photo Guide",
    description: data.description || "Create compliant UK passport and visa photos online.",
    slug: data.slug || defaultSlug,
    date: data.date || new Date().toISOString().split("T")[0],
    updatedAt: data.updatedAt,
    author: data.author || "PixPassVisa UK Team",
    category: data.category || "UK Passport & Visa",
    readingTime: data.readingTime || "3 Min.",
    image: data.image || "https://res.cloudinary.com/dipzpwbbk/image/upload/v1784690540/uk-hero_m4cc8l.webp",
    keywords: data.keywords || "",
    h1: data.h1,
    defaultDoc: data.defaultDoc || "uk-passport-online",
    toolTitle: data.toolTitle,
    toolSubtitle: data.toolSubtitle,
    faq: data.faq || [],
    contentHtml,
    toc,
  };
}

/**
 * Get all UK page slugs for static route generation
 */
export function getAllUKPageSlugs(): string[] {
  const pages = getAllUKPages();
  return pages.map((p) => p.slug);
}
