'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

const emptyForm = { title: '', company: '', location: '', startDate: '', endDate: '', description: '', technologies: '' };

export default function ExperiencePage() {
  const queryClient = useQueryClient();
  const { data: experiences = [], isLoading } = useQuery({ queryKey: ['admin-experiences'], queryFn: adminApi.getExperiences });
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => adminApi.createExperience(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-experiences'] }); resetForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => adminApi.updateExperience(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-experiences'] }); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteExperience(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-experiences'] }),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  }

  function startEdit(exp: Experience) {
    setForm({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate?.slice(0, 10) || '',
      endDate: exp.endDate?.slice(0, 10) || '',
      description: exp.description || '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : '',
    });
    setEditing(exp.id);
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
        <h1 className="text-2xl font-bold text-slate-lightest">Experience</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors"
        >
          Add Experience
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-navy-light rounded-lg border border-navy-light space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
            <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
            <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
            <input placeholder="Technologies (comma-separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
            <input type="date" placeholder="Start Date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
            <input type="date" placeholder="End Date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
          </div>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent h-24" />
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
              <th className="py-3 px-4 text-slate">Company</th>
              <th className="py-3 px-4 text-slate">Duration</th>
              <th className="py-3 px-4 text-slate">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp: Experience) => (
              <tr key={exp.id} className="border-b border-navy-light hover:bg-navy-light/50">
                <td className="py-3 px-4 text-slate-lightest">{exp.title}</td>
                <td className="py-3 px-4 text-slate-light">{exp.company}</td>
                <td className="py-3 px-4 text-slate-light">
                  {exp.startDate?.slice(0, 10)} — {exp.endDate?.slice(0, 10) || 'Present'}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => startEdit(exp)} className="text-accent hover:text-accent/80 text-sm">Edit</button>
                  <button onClick={() => deleteMutation.mutate(exp.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
