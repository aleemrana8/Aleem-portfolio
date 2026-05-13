'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  featured: boolean;
}

const emptyForm = { name: '', role: '', company: '', content: '', featured: false };

export default function TestimonialsPage() {
  const queryClient = useQueryClient();
  const { data: testimonials = [], isLoading } = useQuery({ queryKey: ['admin-testimonials'], queryFn: adminApi.getTestimonials });
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => adminApi.createTestimonial(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] }); resetForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => adminApi.updateTestimonial(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] }); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteTestimonial(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] }),
  });

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  }

  function startEdit(t: Testimonial) {
    setForm({
      name: t.name,
      role: t.role || '',
      company: t.company || '',
      content: t.content || '',
      featured: t.featured || false,
    });
    setEditing(t.id);
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
        <h1 className="text-2xl font-bold text-slate-lightest">Testimonials</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-navy-light rounded-lg border border-navy-light space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
            <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
            <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" />
          </div>
          <textarea placeholder="Testimonial content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent h-24" required />
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
              <th className="py-3 px-4 text-slate">Name</th>
              <th className="py-3 px-4 text-slate">Role</th>
              <th className="py-3 px-4 text-slate">Company</th>
              <th className="py-3 px-4 text-slate">Featured</th>
              <th className="py-3 px-4 text-slate">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t: Testimonial) => (
              <tr key={t.id} className="border-b border-navy-light hover:bg-navy-light/50">
                <td className="py-3 px-4 text-slate-lightest">{t.name}</td>
                <td className="py-3 px-4 text-slate-light">{t.role}</td>
                <td className="py-3 px-4 text-slate-light">{t.company}</td>
                <td className="py-3 px-4 text-slate-light">{t.featured ? '⭐' : '—'}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => startEdit(t)} className="text-accent hover:text-accent/80 text-sm">Edit</button>
                  <button onClick={() => deleteMutation.mutate(t.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
