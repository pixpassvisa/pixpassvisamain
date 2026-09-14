import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface GermanGuideFaq {
  question: string;
  answer: string;
}

export interface GermanGuideTocItem {
  id: string;
  text: string;
  level: number;
}

export interface GermanGuideMeta {
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
  faq?: GermanGuideFaq[];
}

export interface GermanGuideDetail extends GermanGuideMeta {
  contentHtml: string;
  toc: GermanGuideTocItem[];
}

const GUIDES_DIR = path.join(process.cwd(), "content/de/guides");

/**
 * Ensures the guides directory exists
 */
function ensureGuidesDir() {
  if (!fs.existsSync(GUIDES_DIR)) {
    fs.mkdirSync(GUIDES_DIR, { recursive: true });
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
function extractToc(markdownContent: string): GermanGuideTocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: GermanGuideTocItem[] = [];
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
      return `<h${depth} id="${id}" className="scroll-mt-24">${text}</h${depth}>\n`;
    }
    return `<h${depth}>${text}</h${depth}>\n`;
  };

  return marked(markdownContent, { renderer }) as string;
}

/**
 * Get all German Guides metadata (sorted by date descending)
 */
export function getAllGermanGuides(): GermanGuideMeta[] {
  ensureGuidesDir();
  const fileNames = fs.readdirSync(GUIDES_DIR);

  const guides = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(GUIDES_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const defaultSlug = fileName.replace(/\.md$/, "");

      return {
        title: data.title || "Ratgeber Artikel",
        description: data.description || "",
        slug: data.slug || defaultSlug,
        date: data.date || new Date().toISOString().split("T")[0],
        updatedAt: data.updatedAt,
        author: data.author || "PixPassVisa Team",
        category: data.category || "Ratgeber",
        readingTime: data.readingTime || "5 Min.",
        image: data.image || "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
        keywords: data.keywords || "",
        faq: data.faq || [],
      } as GermanGuideMeta;
    });

  return guides.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

/**
 * Get full German guide content by slug
 */
export function getGermanGuideBySlug(slug: string): GermanGuideDetail | null {
  ensureGuidesDir();
  const fileNames = fs.readdirSync(GUIDES_DIR);
  const targetFile = fileNames.find((file) => {
    if (!file.endsWith(".md")) return false;
    const fullPath = path.join(GUIDES_DIR, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    return (data.slug || file.replace(/\.md$/, "")) === slug;
  });

  if (!targetFile) return null;

  const fullPath = path.join(GUIDES_DIR, targetFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const contentHtml = compileMarkdownToHtml(content);
  const toc = extractToc(content);

  return {
    title: data.title || "Ratgeber Artikel",
    description: data.description || "",
    slug: data.slug || slug,
    date: data.date || new Date().toISOString().split("T")[0],
    updatedAt: data.updatedAt,
    author: data.author || "PixPassVisa Team",
    category: data.category || "Ratgeber",
    readingTime: data.readingTime || "5 Min.",
    image: data.image || "https://res.cloudinary.com/dipzpwbbk/image/upload/v1779008016/c24d89b1-ab0e-4f1d-9035-5814bc7b91ca_preview_ip9ogs.jpg",
    keywords: data.keywords || "",
    faq: data.faq || [],
    contentHtml,
    toc,
  };
}

/**
 * Get all slugs for static path generation
 */
export function getAllGermanGuideSlugs(): string[] {
  const guides = getAllGermanGuides();
  return guides.map((g) => g.slug);
}
