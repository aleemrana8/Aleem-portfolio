"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, CheckCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface SiteSettings {
  id: string;
  siteName: string;
  themeMode: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  enableBlog: boolean;
  enableContact: boolean;
  maintenanceMode: boolean;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    fetch(`${API}/settings`).then((r) => r.json()).then(setSettings);
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setStatus("saving");
    try {
      const res = await fetch(`${API}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2000);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (!settings) return <div className="text-slate">Loading...</div>;

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-slate-lightest focus:outline-none focus:border-accent/50 transition-all";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Settings size={20} className="text-accent" />
          <h1 className="text-2xl font-bold text-slate-lightest">Site Settings</h1>
        </div>
        <button onClick={handleSave} disabled={status === "saving"} className="btn-filled text-sm">
          <span className="relative z-10 flex items-center gap-2">
            {status === "saving" ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {status === "saved" ? "Saved!" : "Save"}
          </span>
        </button>
      </div>

      {status === "saved" && (
        <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
          <CheckCircle size={14} /> Settings saved
        </div>
      )}

      <div className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-mono text-accent/60 uppercase tracking-wider mb-4">General</h2>
          <div>
            <label className="block text-xs text-slate/60 mb-1.5">Site Name</label>
            <input className={inputClass} value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-slate/60 mb-1.5">Font Family</label>
            <input className={inputClass} value={settings.fontFamily} onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })} />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-mono text-accent/60 uppercase tracking-wider mb-4">Theme</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Mode</label>
              <select className={inputClass} value={settings.themeMode} onChange={(e) => setSettings({ ...settings, themeMode: e.target.value })}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Primary Color</label>
              <div className="flex gap-2">
                <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer" />
                <input className={inputClass} value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate/60 mb-1.5">Secondary Color</label>
              <div className="flex gap-2">
                <input type="color" value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer" />
                <input className={inputClass} value={settings.secondaryColor} onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-mono text-accent/60 uppercase tracking-wider mb-4">Features</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between text-sm text-slate cursor-pointer p-3 rounded-lg hover:bg-white/[0.01] transition-colors">
              <span>Enable Blog Section</span>
              <input type="checkbox" checked={settings.enableBlog} onChange={(e) => setSettings({ ...settings, enableBlog: e.target.checked })} className="accent-accent w-4 h-4" />
            </label>
            <label className="flex items-center justify-between text-sm text-slate cursor-pointer p-3 rounded-lg hover:bg-white/[0.01] transition-colors">
              <span>Enable Contact Form</span>
              <input type="checkbox" checked={settings.enableContact} onChange={(e) => setSettings({ ...settings, enableContact: e.target.checked })} className="accent-accent w-4 h-4" />
            </label>
            <label className="flex items-center justify-between text-sm text-red-400 cursor-pointer p-3 rounded-lg hover:bg-red-500/[0.03] transition-colors">
              <span>Maintenance Mode</span>
              <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} className="accent-red-500 w-4 h-4" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
