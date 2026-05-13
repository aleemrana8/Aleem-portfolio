"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Check, Trash2, Mail } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const getToken = () => localStorage.getItem("admin_token") || "";

  useEffect(() => {
    fetch(`${API}/contact`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then(setMessages)
      .catch(console.error);
  }, []);

  const markRead = async (id: string) => {
    await fetch(`${API}/contact/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const deleteMsg = async (id: string) => {
    await fetch(`${API}/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-lightest mb-8 flex items-center gap-3">
        <MessageSquare size={24} className="text-accent" />
        Contact Messages
      </h1>

      {messages.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Mail size={48} className="text-slate/20 mx-auto mb-4" />
          <p className="text-slate">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card p-6 ${!msg.read ? "border-l-4 border-accent" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-lightest">{msg.name}</h3>
                    <span className="text-xs text-slate">{msg.email}</span>
                    {!msg.read && (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-mono">
                        New
                      </span>
                    )}
                  </div>
                  {msg.subject && (
                    <p className="text-sm text-accent/60 font-mono mb-1">{msg.subject}</p>
                  )}
                  <p className="text-sm text-slate leading-relaxed">{msg.message}</p>
                  <p className="text-xs text-slate/40 mt-3 font-mono">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => markRead(msg.id)}
                      className="p-2 text-slate hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMsg(msg.id)}
                    className="p-2 text-slate hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
