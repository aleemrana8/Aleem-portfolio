"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Layers, Github } from "lucide-react";
import {
  FeaturedBadge,
  TechStackPills,
  ViewCaseStudyLink,
} from "./ProjectParts";
import { ProjectMiniViz } from "./ProjectVisualizations";

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  outcome: string;
  stack: string[];
  featured: boolean;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  architectureFlow?: {
    nodes: { id: string; label: string; desc?: string; icon: string; x: number; y: number }[];
    connections: { from: string; to: string; label?: string }[];
  };
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onSelect: () => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className="relative cursor-pointer group h-full flex flex-col rounded-2xl overflow-hidden border border-white/[0.05] bg-white/[0.015] backdrop-blur-xl transition-all duration-700 hover:border-accent/[0.15] hover:bg-white/[0.04]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.02) inset, 0 4px 24px -2px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top animated gradient border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

        {/* Hover glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/[0.04] rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/[0.02] rounded-full blur-2xl" />
        </div>

        {/* Project image banner */}
        {project.image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent" />
          </div>
        )}

        <div className="p-7 md:p-8 flex flex-col h-full relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-7">
            <div className="w-12 h-12 rounded-xl bg-accent/[0.06] border border-accent/[0.08] flex items-center justify-center group-hover:bg-accent/[0.1] group-hover:border-accent/20 group-hover:shadow-[0_0_20px_-5px_rgba(56, 189, 248,0.15)] transition-all duration-500">
              <Layers
                size={22}
                className="text-accent/50 group-hover:text-accent transition-colors duration-500"
                strokeWidth={1.5}
              />
            </div>
            {project.featured && <FeaturedBadge />}
          </div>

          {/* Title */}
          <h3 className="text-[1.35rem] font-bold text-slate-lightest group-hover:text-white transition-colors duration-500 mb-3 leading-tight">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-slate/75 leading-relaxed mb-5 flex-grow">
            {project.tagline}
          </p>

          {/* Mini Visualization */}
          <div className="mb-5">
            <ProjectMiniViz slug={project.slug} />
          </div>

          {/* Tech Stack */}
          <TechStackPills technologies={project.stack} maxVisible={5} />

          {/* CTA */}
          <div className="mt-6 pt-5 border-t border-white/[0.03] flex items-center justify-between">
            <ViewCaseStudyLink />
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-9 h-9 rounded-lg bg-accent/[0.06] border border-accent/[0.1] flex items-center justify-center hover:bg-accent/[0.15] hover:border-accent/30 transition-all duration-300"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={16} className="text-accent/60 hover:text-accent transition-colors duration-300" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
