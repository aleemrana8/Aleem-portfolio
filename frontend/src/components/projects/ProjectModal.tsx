"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { ProjectDetail } from "./ProjectDetail";
import type { ProjectData } from "./ProjectCard";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [project]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset scroll position when project changes
  useEffect(() => {
    if (project && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0a0e17]/90 backdrop-blur-2xl"
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl border border-white/[0.06] bg-[#0d1526]/95 backdrop-blur-xl overflow-hidden z-10"
            style={{
              boxShadow:
                "0 0 0 1px rgba(56, 189, 248,0.03) inset, 0 25px 80px -12px rgba(0,0,0,0.6), 0 0 60px -20px rgba(56, 189, 248,0.08)",
            }}
          >
            {/* Top accent gradient line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent origin-center z-20"
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-30 w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate/60 hover:text-accent hover:border-accent/20 hover:bg-accent/[0.06] transition-all duration-300 backdrop-blur-sm"
              aria-label="Close case study"
            >
              <X size={16} />
            </button>

            {/* Scrollable content */}
            <div ref={contentRef} className="overflow-y-auto flex-1 overscroll-contain">
              <div className="px-8 pt-10 pb-10 md:px-12 md:pt-12 md:pb-12">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center">
                      <Sparkles size={12} className="text-accent" />
                    </div>
                    <span className="text-accent/60 font-mono text-[11px] tracking-[0.2em] uppercase">
                      Featured Project
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-[2.5rem] font-bold text-white leading-[1.1] mb-2.5">
                    {project.title}
                  </h2>
                  <p className="text-accent/60 font-mono text-sm leading-relaxed mb-10">
                    {project.tagline}
                  </p>
                </motion.div>

                {/* Case study content */}
                <ProjectDetail project={project} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
