"use client";

import { useState, useEffect } from "react";
import { User, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface Profile {
  id: string;
  name: string;
  headline: string;
  subheadline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  websiteUrl: string;
  metaTitle: string;
  metaDesc: string;
  heroCtaLabel1: string;
  heroCtaLabel2: string;
  heroCtaLabel3: string;
  heroCtaLabel4: string;
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch(`${API}/profile`)
      .then((r) => r.json())
      .then(setProfile);
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setStatus("saving");
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${API}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2000);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const update = (field: keyof Profile, value: string) => {
    if (profile) setProfile({ ...profile, [field]: value });
  };

  if (!profile) return <div className="text-slate">Loading...</div>;

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-slate-lightest focus:outline-none focus:border-accent/50 transition-all";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <User size={20} className="text-accent" />
          <h1 className="text-2xl font-bold text-slate-lightest">Profile</h1>
        </div>
        <button onClick={handleSave} disabled={status === "saving"} className="btn-filled text-sm">
          <span className="relative z-10 flex items-center gap-2">
            {status === "saving" ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {status === "saved" ? "Saved!" : "Save Changes"}
          </span>
        </button>
      </div>

      {status === "saved" && (
        <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
          <CheckCircle size={14} /> Profile updated successfully
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
          <AlertCircle size={14} /> Error saving profile
        </div>
      )}

      <div className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-mono text-accent/60 uppercase tracking-wider mb-4">Personal Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Name</label>
              <input className={inputClass} value={profile.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Email</label>
              <input className={inputClass} value={profile.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Phone</label>
              <input className={inputClass} value={profile.phone || ""} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Location</label>
              <input className={inputClass} value={profile.location || ""} onChange={(e) => update("location", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-mono text-accent/60 uppercase tracking-wider mb-4">Hero Content</h2>
          <div>
            <label className="block text-xs text-slate/60 mb-1.5">Headline</label>
            <input className={inputClass} value={profile.headline} onChange={(e) => update("headline", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-slate/60 mb-1.5">Subheadline</label>
            <input className={inputClass} value={profile.subheadline} onChange={(e) => update("subheadline", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-slate/60 mb-1.5">Summary</label>
            <textarea rows={4} className={`${inputClass} resize-none`} value={profile.summary} onChange={(e) => update("summary", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">CTA 1</label>
              <input className={inputClass} value={profile.heroCtaLabel1 || ""} onChange={(e) => update("heroCtaLabel1", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">CTA 2</label>
              <input className={inputClass} value={profile.heroCtaLabel2 || ""} onChange={(e) => update("heroCtaLabel2", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">CTA 3</label>
              <input className={inputClass} value={profile.heroCtaLabel3 || ""} onChange={(e) => update("heroCtaLabel3", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">CTA 4</label>
              <input className={inputClass} value={profile.heroCtaLabel4 || ""} onChange={(e) => update("heroCtaLabel4", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-mono text-accent/60 uppercase tracking-wider mb-4">Social & Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">GitHub URL</label>
              <input className={inputClass} value={profile.githubUrl || ""} onChange={(e) => update("githubUrl", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">LinkedIn URL</label>
              <input className={inputClass} value={profile.linkedinUrl || ""} onChange={(e) => update("linkedinUrl", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Avatar URL</label>
              <input className={inputClass} value={profile.avatarUrl || ""} onChange={(e) => update("avatarUrl", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Resume URL</label>
              <input className={inputClass} value={profile.resumeUrl || ""} onChange={(e) => update("resumeUrl", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-mono text-accent/60 uppercase tracking-wider mb-4">SEO & Meta</h2>
          <div>
            <label className="block text-xs text-slate/60 mb-1.5">Meta Title</label>
            <input className={inputClass} value={profile.metaTitle || ""} onChange={(e) => update("metaTitle", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-slate/60 mb-1.5">Meta Description</label>
            <textarea rows={3} className={`${inputClass} resize-none`} value={profile.metaDesc || ""} onChange={(e) => update("metaDesc", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
