"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  User,
  Bot,
  ChevronRight,
  Briefcase,
  Code2,
  Brain,
} from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { source: string; excerpt: string }[];
}

const suggestedPrompts = [
  { icon: Brain, text: "Tell me about Aleem's AI projects" },
  { icon: Briefcase, text: "What leadership experience does he have?" },
  { icon: Code2, text: "What technologies does he specialize in?" },
  { icon: Sparkles, text: "Is he available for technical leadership roles?" },
];

function generateVisitorId() {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = "v_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("visitor_id", id);
  }
  return id;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await axios.post(`${API_URL}/ai/chat`, {
          message: text.trim(),
          sessionId,
          visitorId: generateVisitorId(),
          mode: "general",
        });

        const data = res.data;
        setSessionId(data.sessionId);

        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          sources: data.sources,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I'm currently unavailable, but you can reach Aleem directly at raleem811811@gmail.com or through the contact form below.",
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, sessionId]
  );

  return (
    <>
      {/* Floating AI Orb Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-xl flex items-center justify-center group hover:bg-accent/20 transition-all duration-500 shadow-lg shadow-accent/10"
            aria-label="Open AI Assistant"
          >
            <div className="absolute inset-0 rounded-full bg-accent/5 animate-ping opacity-30" />
            <Sparkles size={22} className="text-accent group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl border border-white/[0.06] bg-[#0a192f]/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-lightest">
                    Ask Aleem AI
                  </h3>
                  <p className="text-[11px] text-slate/60 font-mono">
                    Powered by RAG Intelligence
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors"
              >
                <X size={16} className="text-slate" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Brain size={24} className="text-accent" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-lightest mb-1">
                      Hi! I&apos;m Aleem&apos;s AI Assistant
                    </h4>
                    <p className="text-xs text-slate/60 max-w-[280px] mx-auto">
                      Ask me about his experience, projects, skills, or
                      availability for roles.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt.text}
                        onClick={() => sendMessage(prompt.text)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:border-accent/10 transition-all duration-300 group text-left"
                      >
                        <prompt.icon
                          size={16}
                          className="text-accent/50 group-hover:text-accent transition-colors shrink-0"
                        />
                        <span className="text-[13px] text-slate/80 group-hover:text-slate-light transition-colors">
                          {prompt.text}
                        </span>
                        <ChevronRight
                          size={14}
                          className="ml-auto text-slate/30 group-hover:text-accent/50 transition-colors"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-accent/10"
                        : "bg-white/[0.06]"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} className="text-accent" />
                    ) : (
                      <Bot size={14} className="text-slate-light" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-xl text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent/10 text-slate-lightest border border-accent/10"
                        : "bg-white/[0.04] text-slate-light border border-white/[0.04]"
                    }`}
                  >
                    {msg.content}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/[0.06]">
                        <p className="text-[10px] text-slate/50 font-mono mb-1">
                          Sources:
                        </p>
                        {msg.sources.map((s, i) => (
                          <span
                            key={i}
                            className="inline-block text-[10px] px-2 py-0.5 mr-1 mb-1 rounded-full bg-accent/5 text-accent/60 border border-accent/10"
                          >
                            {s.source}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-slate-light" />
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.04]">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.01]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, projects, skills..."
                  className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[13px] text-slate-lightest placeholder:text-slate/30 focus:outline-none focus:border-accent/20 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent/20 disabled:opacity-30 disabled:hover:bg-accent/10 transition-all"
                >
                  <Send size={16} className="text-accent" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
