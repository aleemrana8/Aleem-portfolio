"use client";

import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import type { ProjectData } from "./ProjectCard";
import { projectsData } from "@/lib/data";
import { ProjectsNetworkBg } from "./ProjectVisualizations";

const MemoizedProjectCard = memo(ProjectCard);

export function FeaturedProjects() {
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSelect = useCallback((project: ProjectData) => {
    setSelected(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      {/* Network constellation background */}
      <ProjectsNetworkBg />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Animated badge */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={headerInView ? { width: 40 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="h-[2px] bg-gradient-to-r from-accent to-transparent"
              />
              <span className="text-accent font-mono text-sm tracking-wider">
                Featured Projects
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-lightest leading-tight mb-5">
              Selected Work
            </h2>
            <p className="text-slate/75 max-w-2xl leading-relaxed text-[15px]">
              Flagship AI systems, automation platforms, and scalable technical
              solutions built across healthcare, AI, and community ecosystems —
              where I led technical strategy, team execution, and delivery.
            </p>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projectsData.map((project, i) => (
            <MemoizedProjectCard
              key={project.slug}
              project={project}
              index={i}
              onSelect={() => handleSelect(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={handleClose} />
    </section>
  );
}
