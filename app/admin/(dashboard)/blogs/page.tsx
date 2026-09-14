"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PenSquare, Plus, Search, ExternalLink, RotateCw, Trash2, Edit2 } from "lucide-react";

type Blog = {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  isPublished: boolean;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blogs");
    const data = await res.json();
    setBlogs(data || []);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentBlog._id ? "PUT" : "POST";
    const url = currentBlog._id
      ? `/api/admin/blogs/${currentBlog._id}`
      : "/api/admin/blogs";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBlog),
    });

    setIsEditing(false);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  const startNew = () => {
    setCurrentBlog({
      slug: "",
      title: "",
      description: "",
      content: "",
      author: "PixPassVisa Editorial Team",
      date: new Date().toISOString().split("T")[0],
      isPublished: true,
    });
    setIsEditing(true);
  };

  const filteredBlogs = blogs.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.slug.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (statusFilter === "published" && !b.isPublished) return false;
    if (statusFilter === "draft" && b.isPublished) return false;

    return true;
  });

  const publishedCount = blogs.filter((b) => b.isPublished).length;
  const draftCount = blogs.filter((b) => !b.isPublished).length;

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center text-slate-400 text-xs">
        <RotateCw className="w-4 h-4 animate-spin text-blue-600 mr-2" />
        <span>Loading blogs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 shadow-xs">
              <PenSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Manage Content &amp; Blogs
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Author SEO articles, country passport photo guides, and updates
              </p>
            </div>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={startNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        )}
      </div>

      {isEditing ? (
        /* Edit Form */
        <form
          onSubmit={handleSave}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/90 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">
              {currentBlog._id ? "Edit Article" : "Compose New Article"}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Slug: {currentBlog.slug ? `/blog/${currentBlog.slug}` : "Unsaved"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Title
              </label>
              <input
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={currentBlog.title || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, title: e.target.value })
                }
                placeholder="e.g. US Passport Photo Requirements Complete Guide"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug
              </label>
              <input
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={currentBlog.slug || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })
                }
                placeholder="us-passport-photo-requirements-guide"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Publish Date
              </label>
              <input
                required
                type="date"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                value={currentBlog.date || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Author
              </label>
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={currentBlog.author || ""}
                onChange={(e) =>
                  setCurrentBlog({ ...currentBlog, author: e.target.value })
                }
                placeholder="PixPassVisa Editorial Team"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description (SEO Meta Description)
            </label>
            <textarea
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium h-20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={currentBlog.description || ""}
              onChange={(e) =>
                setCurrentBlog({ ...currentBlog, description: e.target.value })
              }
              placeholder="Brief summary of the article for Google search snippets and social sharing cards..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Article Body Content (HTML / Markdown)
              </label>
              <span className="text-[11px] text-slate-400">Supports standard HTML tags</span>
            </div>
            <textarea
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-mono h-72 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed"
              value={currentBlog.content || ""}
              onChange={(e) =>
                setCurrentBlog({ ...currentBlog, content: e.target.value })
              }
              placeholder="<p>Write your article content here...</p>"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={currentBlog.isPublished ?? true}
              onChange={(e) => setCurrentBlog({ ...currentBlog, isPublished: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
            <label htmlFor="isPublished" className="text-xs font-bold text-slate-800 cursor-pointer">
              Publish publicly immediately (Visible on live site)
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Save Article
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* Blog Filter & Cards List */
        <>
          {/* Filters Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-2.5 text-slate-400">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by title, slug, or content..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "all" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({blogs.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("published")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "published" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Published ({publishedCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("draft")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === "draft" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Drafts ({draftCount})
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {blog.date}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        blog.isPublished
                          ? "bg-blue-50/70 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-slate-500 text-xs line-clamp-3 mt-2 leading-relaxed">
                    {blog.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>By {blog.author || "PixPassVisa"}</span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="text-blue-700 hover:text-blue-800 font-bold inline-flex items-center gap-1"
                    >
                      <span>Live Post</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </Link>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentBlog({ ...blog });
                      setIsEditing(true);
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id!)}
                    className="px-3.5 bg-rose-50 hover:bg-rose-100 text-rose-700 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredBlogs.length === 0 && (
              <div className="col-span-full p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-3xl">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <PenSquare className="w-6 h-6 text-slate-400" />
                </div>
                <div className="font-bold text-slate-700">No blog articles match your search</div>
                <p className="text-xs text-slate-400 mt-1">Try resetting your search query or create a new blog post.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
