import { applyReviewedBlogContent } from "./reviewed-blog-content";
import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import fs from "node:fs";
import path from "node:path";
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

// Helper function to read the blog posts directly from DB with fallback to JSON
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!process.env.MONGODB_URI) throw new Error("Local content fallback");
    await connectToDatabase();
    const posts = await BlogModel.find({ isPublished: true }).sort({ date: -1 }).lean() as BlogPost[];
    if (posts && posts.length > 0) return applyReviewedBlogContent(JSON.parse(JSON.stringify(posts)) as BlogPost[]);
  } catch (error) {
    if (process.env.MONGODB_URI) console.error("Blog database unavailable; using local content.");
  }

  const filePath = path.join(process.cwd(), 'data', 'blog-posts.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(fileContents) as BlogPost[];
    return applyReviewedBlogContent(posts).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}
