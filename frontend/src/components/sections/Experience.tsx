"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/MotionWrappers";
import { experienceData } from "@/lib/data";
import { Calendar, MapPin, ChevronRight, ArrowRight } from "lucide-react";

export function Experience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = experienceData[activeIdx];

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">Career Journey</p>
          <h2 className="section-heading">Where I&apos;ve Worked</h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 flex flex-col md:flex-row gap-0">
            {/* Tab list */}
            <div className="relative flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l-2 border-white/[0.04] min-w-fit scrollbar-none">
              {experienceData.map((exp, i) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveIdx(i)}
                  className={`relative px-5 py-3.5 text-left text-sm font-mono whitespace-nowrap transition-all duration-500 ${
                    activeIdx === i
                      ? "text-accent bg-accent/[0.04]"
                      : "text-slate hover:text-accent/80 hover:bg-white/[0.01]"
                  }`}
                >
                  {exp.company}
                  {activeIdx === i && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 md:bottom-auto left-0 md:left-[-2px] right-0 md:right-auto h-[2px] md:h-full md:w-[2px] bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className="flex-1 min-h-[420px] px-0 md:px-10 pt-6 md:pt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-lightest leading-tight">
                    {active.title}{" "}
                    <span className="text-accent">@ {active.company}</span>
                  </h3>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-accent/50" />
                      {active.startDate} — {active.current ? "Present" : active.endDate}
                    </span>
                    {active.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-accent/50" />
                        {active.location}
                      </span>
                    )}
                    {active.current && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate mt-5 leading-relaxed text-[15px]">
                    {active.description}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-6 space-y-3.5">
                    {active.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate leading-relaxed group">
                        <ArrowRight
                          size={14}
                          className="text-accent/60 mt-1 flex-shrink-0 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300"
                        />
                        <span className="group-hover:text-slate-lighter transition-colors duration-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {active.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
