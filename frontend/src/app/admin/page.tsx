"use client";

import { useState, useEffect } from "react";
import { Briefcase, FolderKanban, MessageSquare, FileText, AlertCircle } from "lucide-react";

interface Stats {
  experiences: number;
  projects: number;
  messages: number;
  posts: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  const cards = stats
    ? [
        { label: "Experience Items", value: stats.experiences, icon: Briefcase, color: "text-blue-400" },
        { label: "Projects", value: stats.projects, icon: FolderKanban, color: "text-accent" },
        { label: "Blog Posts", value: stats.posts, icon: FileText, color: "text-purple-400" },
        { label: "Messages", value: stats.messages, icon: MessageSquare, color: "text-yellow-400" },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-lightest mb-8">Dashboard</h1>

      {stats ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon size={24} className={card.color} />
                    <span className="text-3xl font-bold text-slate-lightest">{card.value}</span>
                  </div>
                  <p className="text-sm text-slate">{card.label}</p>
                </div>
              );
            })}
          </div>

          {stats.unreadMessages > 0 && (
            <div className="glass-card p-6 border-l-4 border-accent flex items-center gap-4">
              <AlertCircle size={20} className="text-accent" />
              <p className="text-sm text-slate-lightest">
                You have <span className="text-accent font-bold">{stats.unreadMessages}</span> unread
                contact message{stats.unreadMessages > 1 ? "s" : ""}.
              </p>
              <a href="/admin/messages" className="btn-primary text-xs ml-auto py-1.5 px-3">
                View Messages
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="glass-card p-12 text-center">
          <p className="text-slate">Loading dashboard data...</p>
          <p className="text-xs text-slate/50 mt-2">
            Make sure the backend API is running and the database is seeded.
          </p>
        </div>
      )}
    </div>
  );
}
