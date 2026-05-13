"use client";

import { useState, useEffect } from "react";
import { Briefcase, Plus, Trash2, Save, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  bullets: string[];
  tags: string[];
  order: number;
  featured: boolean;
  published: boolean;
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    fetch(`${API}/experience`).then((r) => r.json()).then(setExperiences);
  }, []);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const handleAdd = async () => {
    const res = await fetch(`${API}/experience`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: "New Role",
        company: "Company",
        description: "Description",
        startDate: "Jan 2025",
        bullets: [],
        tags: [],
        order: experiences.length,
      }),
    });
    if (res.ok) {
      const exp = await res.json();
      setExperiences([...experiences, exp]);
      setExpanded(exp.id);
    }
  };

  const handleSave = async (exp: Experience) => {
    setSaving(exp.id);
    await fetch(`${API}/experience/${exp.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(exp),
    });
    setSaving(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`${API}/experience/${id}`, { method: "DELETE", headers });
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const update = (id: string, field: keyof Experience, value: unknown) => {
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-slate-lightest focus:outline-none focus:border-accent/50 transition-all";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Briefcase size={20} className="text-accent" />
          <h1 className="text-2xl font-bold text-slate-lightest">Experience</h1>
        </div>
        <button onClick={handleAdd} className="btn-filled text-sm">
          <span className="relative z-10 flex items-center gap-2"><Plus size={14} /> Add Experience</span>
        </button>
      </div>

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="glass-card overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.01] transition-colors"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-lightest">{exp.title}</h3>
                <p className="text-xs text-slate mt-0.5">{exp.company} · {exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
              </div>
              <div className="flex items-center gap-3">
                {exp.featured && <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full">Featured</span>}
                {expanded === exp.id ? <ChevronUp size={16} className="text-slate" /> : <ChevronDown size={16} className="text-slate" />}
              </div>
            </button>

            {expanded === exp.id && (
              <div className="p-5 pt-0 space-y-4 border-t border-white/[0.04]">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Title</label>
                    <input className={inputClass} value={exp.title} onChange={(e) => update(exp.id, "title", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Company</label>
                    <input className={inputClass} value={exp.company} onChange={(e) => update(exp.id, "company", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Location</label>
                    <input className={inputClass} value={exp.location || ""} onChange={(e) => update(exp.id, "location", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">Start Date</label>
                    <input className={inputClass} value={exp.startDate} onChange={(e) => update(exp.id, "startDate", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate/60 mb-1.5">End Date</label>
                    <input className={inputClass} value={exp.endDate || ""} disabled={exp.current} onChange={(e) => update(exp.id, "endDate", e.target.value)} />
                  </div>
                  <div className="flex items-center gap-4 pt-5">
                    <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                      <input type="checkbox" checked={exp.current} onChange={(e) => update(exp.id, "current", e.target.checked)} className="accent-accent" />
                      Current
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate cursor-pointer">
                      <input type="checkbox" checked={exp.featured} onChange={(e) => update(exp.id, "featured", e.target.checked)} className="accent-accent" />
                      Featured
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Description</label>
                  <textarea rows={3} className={`${inputClass} resize-none`} value={exp.description} onChange={(e) => update(exp.id, "description", e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Bullets (one per line)</label>
                  <textarea rows={5} className={`${inputClass} resize-none font-mono text-xs`} value={exp.bullets.join("\n")} onChange={(e) => update(exp.id, "bullets", e.target.value.split("\n"))} />
                </div>

                <div>
                  <label className="block text-xs text-slate/60 mb-1.5">Tags (comma separated)</label>
                  <input className={inputClass} value={exp.tags.join(", ")} onChange={(e) => update(exp.id, "tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => handleDelete(exp.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1.5 transition-colors">
                    <Trash2 size={14} /> Delete
                  </button>
                  <button onClick={() => handleSave(exp)} className="btn-filled text-sm">
                    <span className="relative z-10 flex items-center gap-2">
                      {saving === exp.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
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
