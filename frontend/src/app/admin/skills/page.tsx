'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface SkillGroup {
  id: string;
  name: string;
  skills: Skill[];
}

export default function SkillsPage() {
  const queryClient = useQueryClient();
  const { data: groups = [], isLoading } = useQuery({ queryKey: ['admin-skills'], queryFn: adminApi.getSkills });
  const [groupForm, setGroupForm] = useState({ name: '' });
  const [skillForm, setSkillForm] = useState({ groupId: '', name: '', level: 80 });
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const createGroupMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => adminApi.createSkillGroup(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skills'] }); setGroupForm({ name: '' }); setShowGroupForm(false); },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteSkillGroup(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-skills'] }),
  });

  const createSkillMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => adminApi.createSkill(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-skills'] }); setSkillForm({ groupId: '', name: '', level: 80 }); setShowSkillForm(false); },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteSkill(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-skills'] }),
  });

  if (isLoading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-lightest">Skills</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowGroupForm(true)} className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">
            Add Group
          </button>
          <button onClick={() => setShowSkillForm(true)} className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">
            Add Skill
          </button>
        </div>
      </div>

      {showGroupForm && (
        <form onSubmit={(e) => { e.preventDefault(); createGroupMutation.mutate({ name: groupForm.name }); }} className="mb-4 p-4 bg-navy-light rounded-lg border border-navy-light flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-slate text-sm mb-1">Group Name</label>
            <input value={groupForm.name} onChange={(e) => setGroupForm({ name: e.target.value })} className="w-full px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">Create</button>
          <button type="button" onClick={() => setShowGroupForm(false)} className="px-4 py-2 text-slate border border-navy-light rounded text-sm hover:text-slate-lightest transition-colors">Cancel</button>
        </form>
      )}

      {showSkillForm && (
        <form onSubmit={(e) => { e.preventDefault(); createSkillMutation.mutate({ groupId: skillForm.groupId, name: skillForm.name, level: skillForm.level }); }} className="mb-4 p-4 bg-navy-light rounded-lg border border-navy-light flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-slate text-sm mb-1">Group</label>
            <select value={skillForm.groupId} onChange={(e) => setSkillForm({ ...skillForm, groupId: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required>
              <option value="">Select group</option>
              {groups.map((g: SkillGroup) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-slate text-sm mb-1">Skill Name</label>
            <input value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent" required />
          </div>
          <div>
            <label className="block text-slate text-sm mb-1">Level (0-100)</label>
            <input type="number" min={0} max={100} value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })} className="px-3 py-2 bg-navy border border-navy-light rounded text-slate-lightest text-sm focus:outline-none focus:border-accent w-24" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-accent/10 text-accent border border-accent rounded text-sm hover:bg-accent/20 transition-colors">Create</button>
          <button type="button" onClick={() => setShowSkillForm(false)} className="px-4 py-2 text-slate border border-navy-light rounded text-sm hover:text-slate-lightest transition-colors">Cancel</button>
        </form>
      )}

      <div className="space-y-6">
        {groups.map((group: SkillGroup) => (
          <div key={group.id} className="p-4 bg-navy-light rounded-lg border border-navy-light">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-slate-lightest">{group.name}</h3>
              <button onClick={() => deleteGroupMutation.mutate(group.id)} className="text-red-400 hover:text-red-300 text-sm">Delete Group</button>
            </div>
            {group.skills?.length > 0 ? (
              <div className="space-y-2">
                {group.skills.map((skill: Skill) => (
                  <div key={skill.id} className="flex items-center gap-3">
                    <span className="text-slate-light text-sm w-32">{skill.name}</span>
                    <div className="flex-1 h-2 bg-navy rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                    <span className="text-slate text-xs w-8">{skill.level}%</span>
                    <button onClick={() => deleteSkillMutation.mutate(skill.id)} className="text-red-400 hover:text-red-300 text-xs">✕</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate text-sm">No skills in this group.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
