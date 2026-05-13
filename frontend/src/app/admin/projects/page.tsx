'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const emptyForm = { title: '', description: '', longDescription: '', technologies: '', githubUrl: '', liveUrl: '', featured: false };

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading } = useQuery({ queryKey: ['admin-projects'], queryFn: adminApi.getProjects });
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => adminApi.createProject(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-projects'] }); resetForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => adminApi.updateProject(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-projects'] }); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteProject(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  }

  function startEdit(proj: Project) {
    setForm({
      title: proj.title,
      description: proj.description || '',
      longDescription: proj.longDescription || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featured: proj.featured || false,
    });
    setEditing(proj.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };
    if (editing) {
      updateMutation.mutate({ id: editing, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  if (isLoading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-lightest">Projects</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">
          Add Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-navy-light rounded-lg border border-navy-light space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
            <input placeholder="Technologies (comma-separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
            <input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
            <input placeholder="Live URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
          </div>
          <input placeholder="Short Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
          <textarea placeholder="Long Description" value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent h-24" />
          <label className="flex items-center gap-2 text-slate-light text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-accent" />
            Featured
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
              <th className="py-3 px-4 text-slate">Technologies</th>
              <th className="py-3 px-4 text-slate">Featured</th>
              <th className="py-3 px-4 text-slate">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj: Project) => (
              <tr key={proj.id} className="border-b border-navy-light hover:bg-navy-light/50">
                <td className="py-3 px-4 text-slate-lightest">{proj.title}</td>
                <td className="py-3 px-4 text-slate-light">{Array.isArray(proj.technologies) ? proj.technologies.join(', ') : ''}</td>
                <td className="py-3 px-4 text-slate-light">{proj.featured ? '⭐' : '—'}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => startEdit(proj)} className="text-accent hover:text-accent/80 text-sm">Edit</button>
                  <button onClick={() => deleteMutation.mutate(proj.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
