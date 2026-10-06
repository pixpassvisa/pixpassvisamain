import reviewedContent from '../data/reviewed-blog-content.json';
const reviewed = reviewedContent as Record<string, { updatedAt: string; [key: string]: unknown }>;
export function applyReviewedBlogContent<T extends { slug: string; updatedAt?: string }>(posts: T[]): T[] {
  return posts.map(post => {
    const correction = reviewed[post.slug];
    if (!correction || (post.updatedAt && Date.parse(post.updatedAt) > Date.parse(correction.updatedAt))) return post;
    return { ...post, ...correction };
  });
}
