"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/MotionWrappers";

const technologies = [
  // AI & Automation
  { name: "GPT-4o", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "OpenAI", category: "ai" },
  { name: "Google Gemini", category: "ai" },
  { name: "LiveKit", category: "ai" },
  { name: "Deepgram", category: "ai" },
  { name: "ElevenLabs", category: "ai" },
  { name: "Cartesia", category: "ai" },
  { name: "n8n", category: "ai" },
  { name: "RAG Pipelines", category: "ai" },
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Vite", category: "frontend" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Prisma", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Socket.io", category: "backend" },
  { name: "WebRTC", category: "backend" },
  // Data
  { name: "PostgreSQL", category: "data" },
  { name: "MongoDB", category: "data" },
  { name: "Redis", category: "data" },
  { name: "pgvector", category: "data" },
  { name: "SQLite", category: "data" },
  // DevOps
  { name: "Docker", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Render", category: "devops" },
  { name: "Nginx", category: "devops" },
];

const categoryColors: Record<string, string> = {
  ai: "hover:border-purple-400/30 hover:text-purple-300 hover:bg-purple-400/[0.06]",
  frontend: "hover:border-cyan-400/30 hover:text-cyan-300 hover:bg-cyan-400/[0.06]",
  backend: "hover:border-green-400/30 hover:text-green-300 hover:bg-green-400/[0.06]",
  data: "hover:border-amber-400/30 hover:text-amber-300 hover:bg-amber-400/[0.06]",
  devops: "hover:border-rose-400/30 hover:text-rose-300 hover:bg-rose-400/[0.06]",
};

export function TechWall() {
  return (
    <section id="technologies" className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-accent/[0.015] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-accent font-mono text-sm mb-2 tracking-wider">
              Trusted Stack
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-lightest">
              Technologies I Work With
            </h2>
            <p className="text-slate max-w-xl mx-auto mt-4 leading-relaxed text-sm">
              Production-tested tools and frameworks I use to build scalable AI
              systems, full-stack platforms, and automation workflows.
            </p>
          </div>
        </FadeIn>

        {/* Technology grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {technologies.map((tech, i) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.025,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className={`inline-flex items-center px-4 py-2 text-[13px] font-mono rounded-full border border-white/[0.06] bg-white/[0.02] text-slate/80 cursor-default transition-all duration-300 ${categoryColors[tech.category] || ""}`}
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {[
            { label: "AI & Automation", color: "bg-purple-400" },
            { label: "Frontend", color: "bg-cyan-400" },
            { label: "Backend", color: "bg-green-400" },
            { label: "Data", color: "bg-amber-400" },
            { label: "DevOps", color: "bg-rose-400" },
          ].map((cat) => (
            <div
              key={cat.label}
              className="flex items-center gap-2 text-[11px] font-mono text-slate/50"
            >
              <span className={`w-2 h-2 rounded-full ${cat.color} opacity-60`} />
              {cat.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
