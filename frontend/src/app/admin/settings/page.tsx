'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({ queryKey: ['admin-settings'], queryFn: adminApi.getSettings });
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings && typeof settings === 'object') {
      const flat: Record<string, string> = {};
      Object.entries(settings).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          flat[key] = typeof value === 'string' ? value : JSON.stringify(value ?? '');
        }
      });
      setForm(flat);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => adminApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateMutation.mutate(form);
  }

  if (isLoading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-lightest mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block text-slate text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            {value.length > 100 ? (
              <textarea
                value={value}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent h-24"
              />
            ) : (
              <input
                value={value}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent"
              />
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">
            Save Settings
          </button>
          {saved && <span className="text-green-400 text-sm">Saved!</span>}
        </div>
      </form>
    </div>
  );
}
