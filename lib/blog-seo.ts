import type { BlogPost } from "@/lib/blog-posts";

const APP_URL = "https://www.pixpassvisa.com";

const imageBySlug: Record<string, string> = {
  "us-visa-photo-size-background-rules-guide-uk-europe": "/blog/us-visa-photo-guide.webp",
  "schengen-visa-photo-requirements-size-maker-tool-2026": "/blog/schengen-photo-guide.webp",
  "uk-digital-passport-photo": "/blog/passport-photo-crop-guide.webp",
  "uk-visa-photo-requirements": "/blog/passport-photo-crop-guide.webp",
};

const fallbackImages: Array<{ terms: string[]; image: string }> = [
  { terms: ["india"], image: "/blog/fix-visa-photo.png" },
  { terms: ["us-visa", "ds-160", "dv-lottery", "green-card", "h1b"], image: "/blog/ds-160-requirements.png" },
  { terms: ["schengen", "france", "germany", "europe"], image: "/blog/schengen-photo-guide.webp" },
  { terms: ["australia", "new-zealand"], image: "/images/example-dimensions.jpg" },
  { terms: ["uk-", "uk-visa", "uk-digital"], image: "/blog/passport-photo-crop-guide.webp" },
];

const keywordGroups: Array<{ match: string[]; keywords: string[] }> = [
  {
    match: ["us-visa", "ds-160", "dv-lottery", "green-card", "h1b"],
    keywords: ["US visa photo size", "DS-160 photo requirements", "US visa photo background", "digital visa photo checker", "600x600 visa photo"],
  },
  {
    match: ["schengen", "france", "germany", "europe"],
    keywords: ["Schengen visa photo size", "35x45 visa photo", "European visa photo requirements", "Schengen photo background", "biometric visa photo"],
  },
  {
    match: ["uk-", "uk-visa", "uk-digital"],
    keywords: ["UK digital passport photo", "UK visa photo requirements", "UK passport photo size", "HMPO photo background", "UK online passport photo"],
  },
  {
    match: ["australia"],
    keywords: ["Australia visa photo size", "Australian passport photo", "Australia visa photo background", "Australian digital photo requirements"],
  },
  {
    match: ["new-zealand"],
    keywords: ["New Zealand visa photo size", "New Zealand passport photo", "NZ digital visa photo", "New Zealand photo background"],
  },
  {
    match: ["india"],
    keywords: ["India e-Visa photo requirements", "Indian visa photo size", "India visa photo background", "Indian digital passport photo"],
  },
];

export function getBlogImage(post: Pick<BlogPost, "slug" | "featuredImage">): string | undefined {
  if (imageBySlug[post.slug]) return imageBySlug[post.slug];
  const slug = post.slug.toLowerCase();
  const fallback = fallbackImages.find(({ terms }) => terms.some((term) => slug.includes(term)));
  return fallback?.image || "/images/example-dimensions.jpg";
}

export function getBlogKeywords(post: Pick<BlogPost, "slug" | "title">): string[] {
  const text = `${post.slug} ${post.title}`.toLowerCase();
  const group = keywordGroups.find(({ match }) => match.some((term) => text.includes(term)));
  const base = ["passport photo requirements", "visa photo guide", "passport photo checker", "PixPassVisa"];
  return Array.from(new Set([...(group?.keywords || []), ...base])).slice(0, 12);
}

export function getBlogImageUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${APP_URL}${pathOrUrl}`;
}
