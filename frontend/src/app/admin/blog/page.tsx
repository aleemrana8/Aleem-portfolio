'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
}

const emptyForm = { title: '', slug: '', excerpt: '', content: '', published: false };

export default function BlogPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-blog'], queryFn: adminApi.getBlogPosts });
  const posts: BlogPost[] = Array.isArray(data) ? data : data?.posts ?? [];
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => adminApi.createBlogPost(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-blog'] }); resetForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => adminApi.updateBlogPost(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-blog'] }); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteBlogPost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-blog'] }),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  }

  function startEdit(post: BlogPost) {
    setForm({
      title: post.title,
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      published: post.published || false,
    });
    setEditing(post.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ id: editing, data: form });
    } else {
      createMutation.mutate(form);
    }
  }

  if (isLoading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-lightest">Blog Posts</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">
          Add Post
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-navy-light rounded-lg border border-navy-light space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
            <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
          </div>
          <input placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
          <textarea placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent h-40" />
          <label className="flex items-center gap-2 text-slate-light text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-accent" />
            Published
          </label>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">
              {editing ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={resetForm} className="px-4 py-2 text-slate border border-navy-light rounded text-sm hover:text-slate-lightest transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-light text-left">
              <th className="py-3 px-4 text-slate">Title</th>
              <th className="py-3 px-4 text-slate">Slug</th>
              <th className="py-3 px-4 text-slate">Published</th>
              <th className="py-3 px-4 text-slate">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: BlogPost) => (
              <tr key={post.id} className="border-b border-navy-light hover:bg-navy-light/50">
                <td className="py-3 px-4 text-slate-lightest">{post.title}</td>
                <td className="py-3 px-4 text-slate-light">{post.slug}</td>
                <td className="py-3 px-4 text-slate-light">{post.published ? '✓' : '✗'}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => startEdit(post)} className="text-accent hover:text-accent/80 text-sm">Edit</button>
                  <button onClick={() => deleteMutation.mutate(post.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
