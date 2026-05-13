"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/MotionWrappers";
import { profileData } from "@/lib/data";
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle, Loader2, ArrowUpRight, Instagram } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3.5 text-sm text-slate-lightest placeholder-slate/25 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 focus:bg-white/[0.03] transition-all duration-500";

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-accent font-mono text-sm mb-4 tracking-wider">What&apos;s Next?</p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-lightest mb-6 leading-tight">
              Get In Touch
            </h2>
            <p className="text-slate leading-relaxed">
              I&apos;m always open to discussing AI automation, technical leadership opportunities,
              and innovative product ideas. Whether you&apos;re a recruiter, founder, or fellow
              technologist — let&apos;s connect and explore what we can build together.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-2 gap-10 mt-16 max-w-5xl mx-auto">
            {/* Contact Info Card */}
            <div className="glass-card p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              <div>
                <h3 className="text-xl font-semibold text-slate-lightest mb-4">
                  Let&apos;s Build Something Together
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  I&apos;m particularly interested in collaborations around AI automation,
                  healthcare technology, and scalable delivery leadership. Don&apos;t hesitate
                  to reach out.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { href: `mailto:${profileData.email}`, icon: Mail, label: "Email", value: profileData.email },
                  { href: profileData.linkedinUrl, icon: Linkedin, label: "LinkedIn", value: "Aleem Akhtar" },
                  { href: profileData.instagramUrl, icon: Instagram, label: "Instagram", value: "aleemakhtar811" },
                  { href: profileData.githubUrl, icon: Github, label: "GitHub", value: "aleemrana8" },
                ].map(({ href, icon: Icon, label, value }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 text-slate hover:text-accent transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/[0.04] border border-accent/10 flex items-center justify-center text-accent/60 group-hover:text-accent group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-mono text-accent/30 uppercase tracking-widest">{label}</p>
                      <p className="text-sm text-slate-lighter group-hover:text-accent transition-colors duration-300">{value}</p>
                    </div>
                    <ArrowUpRight size={14} className="text-slate/20 group-hover:text-accent/50 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono text-accent/30 mb-2 uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono text-accent/30 mb-2 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[10px] font-mono text-accent/30 mb-2 uppercase tracking-widest">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-mono text-accent/30 mb-2 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  minLength={10}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project, opportunity, or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-filled w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </span>
              </button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-green-400 font-mono"
                >
                  <CheckCircle size={16} />
                  Message sent successfully!
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400 font-mono"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Try emailing me directly.
                </motion.div>
              )}
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
