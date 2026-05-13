"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  ChevronRight,
  Brain,
  Briefcase,
  Code2,
  Sparkles,
  Zap,
  Layers,
  Target,
  Lightbulb,
  User,
  RotateCcw,
} from "lucide-react";

// ════════════════════════════════════════════════════════════
// ALEEM AI LOGO — Stylized "A" with accent glow
// ════════════════════════════════════════════════════════════

function AleemAILogo({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 4L26 28H21L19 22.5H13L11 28H6L16 4Z"
        fill="#64ffda"
        fillOpacity="0.9"
      />
      <path d="M13.8 19.5H18.2L16 13L13.8 19.5Z" fill="#0a192f" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════
// LIGHTWEIGHT MARKDOWN RENDERER
// ════════════════════════════════════════════════════════════

function parseInline(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const regex = /(\*\*(.*?)\*\*|`(.*?)`|\[(.*?)\]\((.*?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    if (match[2] !== undefined) {
      result.push(
        <strong key={`b${key++}`} className="text-slate-lightest font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[3] !== undefined) {
      result.push(
        <code
          key={`c${key++}`}
          className="px-1.5 py-0.5 rounded bg-accent/[0.08] text-accent text-[11px] font-mono"
        >
          {match[3]}
        </code>
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      result.push(
        <a
          key={`a${key++}`}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          {match[4]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result.length > 0 ? result : [text];
}

const MarkdownContent = memo(function MarkdownContent({
  content,
}: {
  content: string;
}) {
  if (!content) return null;

  const elements: React.ReactNode[] = [];
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let blockKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`pre-${blockKey++}`}
            className="bg-black/30 rounded-lg p-3 my-2 overflow-x-auto border border-white/[0.04]"
          >
            <code className="text-[11px] text-accent/80 font-mono whitespace-pre">
              {codeLines.join("\n")}
            </code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={i} className="text-[13px] font-bold text-accent mt-3 mb-1">
          {line.slice(4)}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h3 key={i} className="text-sm font-bold text-slate-lightest mt-3 mb-1">
          {line.slice(3)}
        </h3>
      );
    } else if (/^[-•]\s/.test(line)) {
      elements.push(
        <div key={i} className="flex gap-2 ml-1 my-0.5">
          <span className="text-accent/50 mt-[7px] text-[6px]">●</span>
          <span className="flex-1">{parseInline(line.slice(2))}</span>
        </div>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const numMatch = line.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        elements.push(
          <div key={i} className="flex gap-2 ml-1 my-0.5">
            <span className="text-accent/50 text-[11px] font-mono min-w-[1.4em] mt-[1px]">
              {numMatch[1]}.
            </span>
            <span className="flex-1">{parseInline(numMatch[2])}</span>
          </div>
        );
      }
    } else if (!line.trim()) {
      elements.push(<div key={i} className="h-1.5" />);
    } else {
      elements.push(
        <p key={i} className="my-0.5">
          {parseInline(line)}
        </p>
      );
    }
  }

  // Handle unclosed code block
  if (inCodeBlock && codeLines.length > 0) {
    elements.push(
      <pre
        key={`pre-${blockKey++}`}
        className="bg-black/30 rounded-lg p-3 my-2 overflow-x-auto border border-white/[0.04]"
      >
        <code className="text-[11px] text-accent/80 font-mono whitespace-pre">
          {codeLines.join("\n")}
        </code>
      </pre>
    );
  }

  return <>{elements}</>;
});

// ════════════════════════════════════════════════════════════
// SMART SUGGESTIONS
// ════════════════════════════════════════════════════════════

const suggestions = [
  { icon: Brain, text: "Tell me about Aleem's AI projects" },
  { icon: Briefcase, text: "What leadership experience does he have?" },
  { icon: Code2, text: "Explain the Front Desk AI Agent architecture" },
  { icon: Sparkles, text: "What technologies does he specialize in?" },
  { icon: Target, text: "Is Aleem available for opportunities?" },
  { icon: Lightbulb, text: "What healthcare AI systems has he built?" },
  { icon: Layers, text: "Tell me about the Voice Agent project" },
  { icon: Zap, text: "How does he approach project management?" },
];

// ════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

// ════════════════════════════════════════════════════════════
// ASK ALEEM AI — Premium Chat Widget
// ════════════════════════════════════════════════════════════

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Auto-scroll on new content ──
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ── Focus input when chat opens ──
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // ── Escape key closes chat ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  // ── Send Message with Streaming ──
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsStreaming(true);

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", isStreaming: true },
      ]);

      try {
        // Build conversation history for API (last 12 messages)
        const history = [...messages, userMsg].slice(-12).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || "Failed to get response"
          );
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });
          const snapshot = accumulated;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: snapshot } : m
            )
          );
        }

        // Mark streaming complete
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, isStreaming: false } : m
          )
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "I'm currently unavailable. You can reach Aleem directly at **raleem811811@gmail.com** or connect on **LinkedIn**.";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: errorMessage, isStreaming: false }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    setMessages([]);
    setIsStreaming(false);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          FLOATING AI ORB BUTTON
          ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Open Ask Aleem AI"
          >
            {/* Ping glow */}
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-20" />

            {/* Hover outer glow */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-accent/30 via-cyan-400/20 to-accent/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700" />

            {/* Main orb */}
            <div className="relative w-14 h-14 rounded-full bg-[#0a192f]/90 border border-accent/30 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-accent/10 group-hover:shadow-accent/25 group-hover:border-accent/50 transition-all duration-500">
              <AleemAILogo size={26} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
          CHAT PANEL
          ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[640px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl border border-white/[0.06] bg-[#0a192f]/[0.97] backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Top gradient glow */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/[0.04] to-transparent pointer-events-none" />

            {/* ── Header ── */}
            <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-accent/[0.08] border border-accent/20 flex items-center justify-center">
                    <AleemAILogo size={22} />
                  </div>
                  {/* Online status */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0a192f]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-lightest tracking-tight">
                    Ask Aleem AI
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    <p className="text-[10px] text-slate/40 font-mono">
                      RAG-Powered • GPT-4o
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={resetChat}
                    className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                    title="New conversation"
                  >
                    <RotateCcw size={13} className="text-slate/40" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                >
                  <X size={15} className="text-slate/50" />
                </button>
              </div>
            </div>

            {/* ── Messages Area ── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
            >
              {/* Welcome Screen */}
              {messages.length === 0 && (
                <div className="py-4">
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-16 h-16 rounded-2xl bg-accent/[0.06] border border-accent/10 flex items-center justify-center mx-auto mb-4"
                    >
                      <AleemAILogo size={36} />
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-base font-bold text-slate-lightest mb-1"
                    >
                      Hi! I&apos;m Aleem&apos;s AI
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[12px] text-slate/40 max-w-[280px] mx-auto leading-relaxed"
                    >
                      Ask me about his AI projects, technical leadership, skills,
                      or availability for roles.
                    </motion.p>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="space-y-1.5">
                    {suggestions.map((s, idx) => (
                      <motion.button
                        key={s.text}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + idx * 0.04 }}
                        onClick={() => sendMessage(s.text)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-accent/10 transition-all duration-300 group text-left"
                      >
                        <s.icon
                          size={14}
                          className="text-accent/30 group-hover:text-accent/70 transition-colors shrink-0"
                        />
                        <span className="text-[12px] text-slate/60 group-hover:text-slate-light transition-colors">
                          {s.text}
                        </span>
                        <ChevronRight
                          size={12}
                          className="ml-auto text-slate/15 group-hover:text-accent/30 transition-colors"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-accent/[0.08] border border-accent/15"
                        : "bg-white/[0.03] border border-white/[0.06]"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={13} className="text-accent/70" />
                    ) : (
                      <AleemAILogo size={15} />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[82%] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent/[0.06] text-slate-lightest border border-accent/[0.1] rounded-2xl rounded-tr-md"
                        : "bg-white/[0.02] text-slate-light/85 border border-white/[0.04] rounded-2xl rounded-tl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <>
                        <MarkdownContent content={msg.content} />
                        {msg.isStreaming && (
                          <span className="inline-block w-[3px] h-4 bg-accent/60 ml-0.5 -mb-[3px] animate-pulse rounded-full" />
                        )}
                      </>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Input Area ── */}
            <div className="relative px-4 py-3 border-t border-white/[0.06]">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, projects, skills..."
                  className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[13px] text-slate-lightest placeholder:text-slate/20 focus:outline-none focus:border-accent/20 focus:bg-white/[0.04] transition-all duration-300"
                  disabled={isStreaming}
                  maxLength={500}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="w-10 h-10 rounded-xl bg-accent/[0.06] border border-accent/[0.1] flex items-center justify-center hover:bg-accent/[0.12] hover:border-accent/20 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send size={15} className="text-accent" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
