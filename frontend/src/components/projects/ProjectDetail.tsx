"use client";

import { motion } from "framer-motion";
import { SectionLabel, TechStackPills } from "./ProjectParts";
import type { ProjectData } from "./ProjectCard";

interface ProjectDetailProps {
  project: ProjectData;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const sections = [
    { label: "The Challenge", content: project.problem },
    { label: "The Solution", content: project.solution },
    { label: "My Role", content: project.role },
    { label: "Impact & Outcomes", content: project.outcome },
  ].filter((s) => s.content);

  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <motion.div
          key={section.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15 + i * 0.08,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <SectionLabel>{section.label}</SectionLabel>
          <p className="text-[15px] text-slate/85 leading-[1.8]">
            {section.content}
          </p>
        </motion.div>
      ))}

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent origin-left"
      />

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <SectionLabel>Tech Stack</SectionLabel>
        <TechStackPills technologies={project.stack} variant="full" />
      </motion.div>

      {/* Links */}
      {(project.githubUrl || project.liveUrl) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex gap-4 pt-2"
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono text-accent/80 bg-accent/[0.06] border border-accent/[0.12] rounded-lg hover:bg-accent/[0.12] hover:border-accent/25 transition-all duration-300"
            >
              Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono text-accent/80 bg-accent/[0.06] border border-accent/[0.12] rounded-lg hover:bg-accent/[0.12] hover:border-accent/25 transition-all duration-300"
            >
              Live Demo
            </a>
          )}
        </motion.div>
      )}
    </div>
  );
}
