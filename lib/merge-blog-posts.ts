/** CMS entries override matching built-in slugs, including explicit unpublishing. */
export function mergeBlogPosts<T extends { slug: string; date: string; isPublished?: boolean }>(
  builtIn: T[], database: T[],
): T[] {
  const posts = new Map(builtIn.map(post => [post.slug, post]));
  for (const post of database) {
    if (post.isPublished === false) posts.delete(post.slug);
    else posts.set(post.slug, post);
  }
  const timestamp = (date: string) => Number.isFinite(Date.parse(date)) ? Date.parse(date) : 0;
  return [...posts.values()].filter(post => post.isPublished !== false)
    .sort((a, b) => timestamp(b.date) - timestamp(a.date) || a.slug.localeCompare(b.slug));
}
