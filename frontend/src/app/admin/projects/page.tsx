"use client";

import { useState, useEffect } from "react";
import { FolderKanban, Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  outcome: string;
  stack: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  published: boolean;
  archived: boolean;
  order: number;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${API}/projects`).then((r) => r.json()).then(setProjects);
  }, []);

  const handleAdd = async () => {
    const slug = `project-${Date.now()}`;
    const res = await fetch(`${API}/projects`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title: "New Project", slug, order: projects.length }),
    });
    if (res.ok) {
      const proj = await res.json();
      setProjects([...projects, proj]);
      setExpanded(proj.id);
    }
  };

  const handleSave = async (proj: Project) => {
    setSaving(proj.id);
    await fetch(`${API}/projects/${proj.id}`, { method: "PUT", headers, body: JSON.stringify(proj) });
    setSaving(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`${API}/projects/${id}`, { method: "DELETE", headers });
    setProjects(projects.filter((p) => p.id !== id));
  };

  const update = (id: string, field: keyof Project, value: unknown) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-slate-lightest focus:outline-none focus:border-accent/50 transition-all";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FolderKanban size={20} className="text-accent" />
          <h1 className="text-2xl font-bold text-slate-lightest">Projects</h1>
        </div>
        <button onClick={handleAdd} className="btn-filled text-sm">
          <span className="relative z-10 flex items-center gap-2"><Plus size={14} /> Add Project</span>
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((proj) => (
          <div key={proj.id} className="glass-card overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.01] transition-colors"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-lightest">{proj.title}</h3>
                <p className="text-xs text-slate mt-0.5">{proj.tagline || proj.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                {proj.featured && <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full">Featured</span>}
                {expanded === proj.id ? <ChevronUp size={16} className="text-slate" /> : <ChevronDown size={16} className="text-slate" />}
              </div>
            </button>

            {expanded === proj.id && (
              <div className="p-5 pt-0 space-y-4 border-t border-white/[0.04]">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Title</label>
                    <input className={inputClass} value={proj.title} onChange={(e) => update(proj.id, "title", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Slug</label>
                    <input className={inputClass} value={proj.slug} onChange={(e) => update(proj.id, "slug", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Tagline</label>
                  <input className={inputClass} value={proj.tagline || ""} onChange={(e) => update(proj.id, "tagline", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Problem / Challenge</label>
                  <textarea rows={3} className={`${inputClass} resize-none`} value={proj.problem || ""} onChange={(e) => update(proj.id, "problem", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Solution</label>
                  <textarea rows={3} className={`${inputClass} resize-none`} value={proj.solution || ""} onChange={(e) => update(proj.id, "solution", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">My Role</label>
                  <textarea rows={2} className={`${inputClass} resize-none`} value={proj.role || ""} onChange={(e) => update(proj.id, "role", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Outcome</label>
                  <textarea rows={2} className={`${inputClass} resize-none`} value={proj.outcome || ""} onChange={(e) => update(proj.id, "outcome", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Stack (comma separated)</label>
                  <input className={inputClass} value={proj.stack.join(", ")} onChange={(e) => update(proj.id, "stack", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                    <input type="checkbox" checked={proj.featured} onChange={(e) => update(proj.id, "featured", e.target.checked)} className="accent-accent" />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                    <input type="checkbox" checked={proj.published} onChange={(e) => update(proj.id, "published", e.target.checked)} className="accent-accent" />
                    Published
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                    <input type="checkbox" checked={proj.archived} onChange={(e) => update(proj.id, "archived", e.target.checked)} className="accent-accent" />
                    Archived
                  </label>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => handleDelete(proj.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1.5 transition-colors">
                    <Trash2 size={14} /> Delete
                  </button>
                  <button onClick={() => handleSave(proj)} className="btn-filled text-sm">
                    <span className="relative z-10 flex items-center gap-2">
                      {saving === proj.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
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
