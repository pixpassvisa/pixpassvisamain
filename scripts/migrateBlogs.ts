import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Blog from "../models/Blog";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

async function migrate() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB.");

  const dataPath = path.join(process.cwd(), "data", "blog-posts.json");
  const rawData = fs.readFileSync(dataPath, "utf8");
  const posts = JSON.parse(rawData);

  console.log(`Found ${posts.length} posts in JSON.`);

  for (const post of posts) {
    const existing = await Blog.findOne({ slug: post.slug });
    if (!existing) {
      await Blog.create({
        ...post,
        isPublished: true,
      });
      console.log(`Migrated: ${post.slug}`);
    } else {
      console.log(`Skipped (already exists): ${post.slug}`);
    }
  }

  console.log("Migration complete.");
  process.exit(0);
}

migrate().catch(console.error);
