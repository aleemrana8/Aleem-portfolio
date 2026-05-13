"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/MotionWrappers";
import { projectsData } from "@/lib/data";
import { ExternalLink, Github, Folder, X, ChevronRight, Sparkles, ArrowUpRight, Layers } from "lucide-react";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: (typeof projectsData)[0];
  index: number;
  onSelect: () => void;
}) {
  return (
    <FadeIn delay={index * 0.12}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        onClick={onSelect}
        className="glass-card-hover p-8 cursor-pointer group h-full flex flex-col relative overflow-hidden"
      >
        {/* Gradient accent on hover */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent/[0.06] border border-accent/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
            <Layers
              size={22}
              className="text-accent/60 group-hover:text-accent transition-colors duration-500"
            />
          </div>
          {project.featured && (
            <div className="flex items-center gap-1.5 text-accent/50 text-xs font-mono">
              <Sparkles size={12} />
              Featured
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-lightest group-hover:text-accent transition-colors duration-500 mb-3">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-slate leading-relaxed mb-6 flex-grow">
          {project.tagline}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-auto">
          {project.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="text-xs font-mono text-accent/60">
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="text-xs font-mono text-slate/40">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* View details indicator */}
        <div className="flex items-center gap-1.5 mt-5 text-xs text-accent/40 group-hover:text-accent font-mono transition-all duration-500">
          View Case Study
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </motion.div>
    </FadeIn>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projectsData)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="glass-card max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/50 via-accent to-accent/50 rounded-t-2xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate hover:text-accent hover:border-accent/20 transition-all duration-300"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-accent" />
          <span className="text-accent font-mono text-xs tracking-wider uppercase">Featured Project</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-slate-lightest mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-accent/70 font-mono text-sm mb-8">{project.tagline}</p>

        {/* Content sections */}
        <div className="space-y-8">
          {[
            { label: "The Challenge", content: project.problem },
            { label: "The Solution", content: project.solution },
            { label: "My Role", content: project.role },
            { label: "Impact & Outcomes", content: project.outcome },
          ].map(
            ({ label, content }) =>
              content && (
                <div key={label}>
                  <h4 className="text-xs font-mono text-accent mb-3 uppercase tracking-[0.2em]">
                    {label}
                  </h4>
                  <p className="text-slate leading-relaxed text-[15px]">{content}</p>
                </div>
              )
          )}
        </div>

        {/* Tech Stack */}
        <div className="mt-10 pt-8 border-t border-white/[0.04]">
          <h4 className="text-xs font-mono text-accent mb-4 uppercase tracking-[0.2em]">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="tag-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<(typeof projectsData)[0] | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">Selected Work</p>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            Flagship initiatives where I led technical strategy, team execution, and
            delivery — transforming complex healthcare challenges into scalable
            automation solutions.
          </p>
        </FadeIn>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projectsData.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              onSelect={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
