import { applyReviewedBlogContent } from "./reviewed-blog-content";
import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import fs from "node:fs";
import path from "node:path";
import { mergeBlogPosts } from "./merge-blog-posts";
// Define the Blog Post type
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  content: string;
  featuredImage?: string;
  keywords?: string[];
}

// Read both sources independently: publishing a CMS post must not hide built-in guides.
export async function getBlogPosts(): Promise<BlogPost[]> {
  let localPosts: BlogPost[] = [];
  let databasePosts: (BlogPost & { isPublished?: boolean })[] = [];
  try {
    localPosts = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'blog-posts.json'), 'utf8'));
  } catch (error) {
    console.error("Error reading built-in blog posts:", error);
  }
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      // Include publication state so a draft override cannot expose its built-in version.
      const posts = await BlogModel.find().lean();
      databasePosts = JSON.parse(JSON.stringify(posts));
    }
  } catch (error) {
    if (process.env.MONGODB_URI) console.error("Blog database unavailable; using local content.");
  }

  return applyReviewedBlogContent(mergeBlogPosts(localPosts, databasePosts));
}
