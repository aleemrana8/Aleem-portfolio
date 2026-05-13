"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/MotionWrappers";
import { skillGroupsData } from "@/lib/data";
import { Crown, Brain, Code, BarChart3, Settings } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  crown: <Crown size={20} strokeWidth={1.5} />,
  brain: <Brain size={20} strokeWidth={1.5} />,
  code: <Code size={20} strokeWidth={1.5} />,
  chart: <BarChart3 size={20} strokeWidth={1.5} />,
  settings: <Settings size={20} strokeWidth={1.5} />,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">Capabilities</p>
          <h2 className="section-heading">Skills & Expertise</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            A blend of technical depth, leadership acumen, and AI automation
            expertise — organized by the domains where I create the most impact.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {skillGroupsData.map((group, groupIdx) => (
            <FadeIn key={group.name} delay={groupIdx * 0.1}>
              <div className="glass-card-hover p-7 h-full relative overflow-hidden group">
                {/* Subtle gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Group header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-accent/[0.06] border border-accent/10 flex items-center justify-center text-accent/70 group-hover:text-accent group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500">
                    {iconMap[group.icon] || <Code size={20} strokeWidth={1.5} />}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-lightest">
                    {group.name}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: groupIdx * 0.04 + i * 0.025,
                        duration: 0.4,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                      className="tag-pill cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
