"use client";

import { useState, useEffect } from "react";
import { FileText, Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  publishedAt: string | null;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${API}/blog/admin/all`, { headers }).then((r) => r.json()).then(setPosts).catch(() => {
      fetch(`${API}/blog`).then((r) => r.json()).then(setPosts);
    });
  }, []);

  const handleAdd = async () => {
    const slug = `post-${Date.now()}`;
    const res = await fetch(`${API}/blog`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title: "New Post", slug, published: false }),
    });
    if (res.ok) {
      const post = await res.json();
      setPosts([post, ...posts]);
      setExpanded(post.id);
    }
  };

  const handleSave = async (post: BlogPost) => {
    setSaving(post.id);
    await fetch(`${API}/blog/${post.id}`, { method: "PUT", headers, body: JSON.stringify(post) });
    setSaving(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`${API}/blog/${id}`, { method: "DELETE", headers });
    setPosts(posts.filter((p) => p.id !== id));
  };

  const update = (id: string, field: keyof BlogPost, value: unknown) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-slate-lightest focus:outline-none focus:border-accent/50 transition-all";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-accent" />
          <h1 className="text-2xl font-bold text-slate-lightest">Blog Posts</h1>
        </div>
        <button onClick={handleAdd} className="btn-filled text-sm">
          <span className="relative z-10 flex items-center gap-2"><Plus size={14} /> New Post</span>
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="glass-card overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === post.id ? null : post.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.01] transition-colors"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-lightest">{post.title}</h3>
                <p className="text-xs text-slate mt-0.5">{post.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                {post.published ? (
                  <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1"><Eye size={10} /> Published</span>
                ) : (
                  <span className="text-[10px] font-mono text-slate/50 bg-white/[0.03] px-2 py-0.5 rounded-full flex items-center gap-1"><EyeOff size={10} /> Draft</span>
                )}
                {expanded === post.id ? <ChevronUp size={16} className="text-slate" /> : <ChevronDown size={16} className="text-slate" />}
              </div>
            </button>

            {expanded === post.id && (
              <div className="p-5 pt-0 space-y-4 border-t border-white/[0.04]">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Title</label>
                    <input className={inputClass} value={post.title} onChange={(e) => update(post.id, "title", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Slug</label>
                    <input className={inputClass} value={post.slug} onChange={(e) => update(post.id, "slug", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Excerpt</label>
                  <textarea rows={2} className={`${inputClass} resize-none`} value={post.excerpt || ""} onChange={(e) => update(post.id, "excerpt", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Content</label>
                  <textarea rows={8} className={`${inputClass} resize-none font-mono text-xs`} value={post.content || ""} onChange={(e) => update(post.id, "content", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Tags (comma separated)</label>
                  <input className={inputClass} value={post.tags.join(", ")} onChange={(e) => update(post.id, "tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                    <input type="checkbox" checked={post.published} onChange={(e) => update(post.id, "published", e.target.checked)} className="accent-accent" />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                    <input type="checkbox" checked={post.featured} onChange={(e) => update(post.id, "featured", e.target.checked)} className="accent-accent" />
                    Featured
                  </label>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1.5 transition-colors">
                    <Trash2 size={14} /> Delete
                  </button>
                  <button onClick={() => handleSave(post)} className="btn-filled text-sm">
                    <span className="relative z-10 flex items-center gap-2">
                      {saving === post.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Save
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
