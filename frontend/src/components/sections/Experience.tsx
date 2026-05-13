"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/MotionWrappers";
import { experienceData } from "@/lib/data";
import {
  Calendar,
  MapPin,
  Briefcase,
  X,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

function ExperienceCard({
  exp,
  index,
  onSelect,
}: {
  exp: (typeof experienceData)[0];
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
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-accent/[0.06] border border-accent/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
            <Briefcase
              size={22}
              className="text-accent/60 group-hover:text-accent transition-colors duration-500"
            />
          </div>
          {exp.current && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs font-mono rounded-full border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Current
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-lightest group-hover:text-accent transition-colors duration-500 mb-1 leading-snug">
          {exp.title}
        </h3>

        {/* Company */}
        <p className="text-accent/70 font-mono text-sm mb-3">@ {exp.company}</p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-slate/60 font-mono">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-accent/40" />
            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
          </span>
          {exp.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-accent/40" />
              {exp.location}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate leading-relaxed mb-6 flex-grow">
          {exp.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-auto">
          {exp.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs font-mono text-accent/60">
              {tag}
            </span>
          ))}
          {exp.tags.length > 4 && (
            <span className="text-xs font-mono text-slate/40">
              +{exp.tags.length - 4}
            </span>
          )}
        </div>

        {/* View details indicator */}
        <div className="flex items-center gap-1.5 mt-5 text-xs text-accent/40 group-hover:text-accent font-mono transition-all duration-500">
          View Details
          <ArrowUpRight
            size={12}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </div>
      </motion.div>
    </FadeIn>
  );
}

function ExperienceModal({
  exp,
  onClose,
}: {
  exp: (typeof experienceData)[0];
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

        {/* Header badge */}
        <div className="flex items-center gap-2 mb-3">
          {exp.current ? (
            <>
              <Sparkles size={16} className="text-accent" />
              <span className="text-accent font-mono text-xs tracking-wider uppercase">
                Current Role
              </span>
            </>
          ) : (
            <>
              <Briefcase size={16} className="text-accent" />
              <span className="text-accent font-mono text-xs tracking-wider uppercase">
                Past Role
              </span>
            </>
          )}
        </div>

        {/* Title & company */}
        <h3 className="text-3xl md:text-4xl font-bold text-slate-lightest mb-2 leading-tight">
          {exp.title}
        </h3>
        <p className="text-accent/70 font-mono text-sm mb-2">
          @ {exp.company}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-accent/50" />
            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
          </span>
          {exp.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-accent/50" />
              {exp.location}
            </span>
          )}
          {exp.current && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Current
            </span>
          )}
        </div>

        {/* Overview */}
        <div className="mb-8">
          <h4 className="text-xs font-mono text-accent mb-3 uppercase tracking-[0.2em]">
            Overview
          </h4>
          <p className="text-slate leading-relaxed text-[15px]">
            {exp.description}
          </p>
        </div>

        {/* Key Contributions */}
        <div className="mb-8">
          <h4 className="text-xs font-mono text-accent mb-4 uppercase tracking-[0.2em]">
            Key Contributions
          </h4>
          <ul className="space-y-4">
            {exp.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-3 text-[15px] text-slate leading-relaxed group"
              >
                <ArrowRight
                  size={14}
                  className="text-accent/60 mt-1.5 flex-shrink-0 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300"
                />
                <span className="group-hover:text-slate-lighter transition-colors duration-300">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills & Technologies */}
        <div className="pt-8 border-t border-white/[0.04]">
          <h4 className="text-xs font-mono text-accent mb-4 uppercase tracking-[0.2em]">
            Skills &amp; Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const [selected, setSelected] = useState<(typeof experienceData)[0] | null>(
    null
  );

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">
            Career Journey
          </p>
          <h2 className="section-heading">Where I&apos;ve Worked</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            From AI team leadership at CareCloud MTBC to freelance project
            delivery — a progressive career building scalable healthcare
            automation and AI-powered solutions.
          </p>
        </FadeIn>

        {/* Experience Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {experienceData.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              onSelect={() => setSelected(exp)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ExperienceModal
            exp={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
