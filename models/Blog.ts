import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD format
      required: true,
    },
    author: {
      type: String,
      default: "PixPassVisa Team",
    },
    content: {
      type: String, // HTML Content
      required: true,
    },
    featuredImage: {
      type: String, // Cloudinary URL for the blog header/OG image
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
