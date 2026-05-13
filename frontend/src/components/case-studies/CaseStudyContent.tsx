"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft,
  Target,
  Lightbulb,
  Code2,
  Cpu,
  Calendar,
  BookOpen,
  Rocket,
  BarChart3,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface Metric {
  label: string;
  value: string;
  numericValue?: number;
}

interface Challenge {
  title: string;
  description: string;
}

interface TimelineItem {
  phase: string;
  title: string;
  description: string;
}

interface CaseStudy {
  title: string;
  subtitle?: string;
  stack?: string[];
  metrics?: Metric[];
  problem?: string;
  solution?: string;
  architecture?: string;
  challenges?: Challenge[];
  aiIntegrations?: string[];
  timeline?: TimelineItem[];
  lessonsLearned?: string[];
  futureWork?: string[];
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = metric.numericValue || parseInt(metric.value.replace(/[^0-9]/g, "")) || 0;
  const count = useAnimatedCounter(numericValue, isInView);
  const suffix = metric.value.replace(/[0-9,]/g, "");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-5 rounded-xl border border-[#1d3a5c] bg-[#112240]/60 backdrop-blur-sm text-center"
    >
      <p className="text-3xl font-bold text-[#64ffda]">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-[#8892b0] mt-1">{metric.label}</p>
    </motion.div>
  );
}

export function CaseStudyContent({ study }: { study: CaseStudy }) {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12">
      {/* Back Button */}
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 text-[#64ffda] font-mono text-sm mb-10 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Case Studies
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#ccd6f6] mb-4">{study.title}</h1>
        {study.subtitle && (
          <p className="text-xl text-[#8892b0] max-w-3xl">{study.subtitle}</p>
        )}
      </motion.div>

      {/* Metrics Row */}
      {study.metrics && study.metrics.length > 0 && (
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {study.metrics.map((metric, i) => (
              <MetricCard key={i} metric={metric} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Problem / Business Context */}
      {study.problem && (
        <Section icon={<Target className="w-5 h-5" />} title="Problem & Business Context">
          <p className="text-[#8892b0] leading-relaxed whitespace-pre-line">{study.problem}</p>
        </Section>
      )}

      {/* Solution */}
      {study.solution && (
        <Section icon={<Lightbulb className="w-5 h-5" />} title="Solution">
          <p className="text-[#8892b0] leading-relaxed whitespace-pre-line">{study.solution}</p>
        </Section>
      )}

      {/* Architecture */}
      {study.architecture && (
        <Section icon={<Code2 className="w-5 h-5" />} title="Architecture">
          <div className="bg-[#0a192f] border border-[#1d3a5c] rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-[#8892b0] font-mono whitespace-pre">
              {study.architecture}
            </pre>
          </div>
        </Section>
      )}

      {/* Technical Challenges */}
      {study.challenges && study.challenges.length > 0 && (
        <Section icon={<Zap className="w-5 h-5" />} title="Technical Challenges">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {study.challenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl border border-[#1d3a5c] bg-[#112240]/40"
              >
                <h4 className="text-[#ccd6f6] font-semibold mb-2">{challenge.title}</h4>
                <p className="text-sm text-[#8892b0]">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* AI Integrations */}
      {study.aiIntegrations && study.aiIntegrations.length > 0 && (
        <Section icon={<Cpu className="w-5 h-5" />} title="AI Integrations">
          <div className="flex flex-wrap gap-3">
            {study.aiIntegrations.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm font-mono text-[#64ffda] bg-[#64ffda]/10 border border-[#64ffda]/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Stack */}
      {study.stack && study.stack.length > 0 && (
        <Section icon={<BarChart3 className="w-5 h-5" />} title="Tech Stack">
          <div className="flex flex-wrap gap-3">
            {study.stack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm font-mono text-[#ccd6f6] bg-[#1d3a5c]/50 border border-[#1d3a5c] rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Timeline */}
      {study.timeline && study.timeline.length > 0 && (
        <Section icon={<Calendar className="w-5 h-5" />} title="Project Timeline">
          <div ref={timelineRef} className="relative pl-8 border-l-2 border-[#1d3a5c]">
            {study.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative mb-10 last:mb-0"
              >
                <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-[#64ffda] border-4 border-[#0a192f]" />
                <span className="text-xs font-mono text-[#64ffda] uppercase tracking-wider">
                  {item.phase}
                </span>
                <h4 className="text-[#ccd6f6] font-semibold mt-1">{item.title}</h4>
                <p className="text-sm text-[#8892b0] mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Lessons Learned */}
      {study.lessonsLearned && study.lessonsLearned.length > 0 && (
        <Section icon={<BookOpen className="w-5 h-5" />} title="Lessons Learned">
          <ul className="space-y-3">
            {study.lessonsLearned.map((lesson, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-[#8892b0]"
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#64ffda] flex-shrink-0" />
                {lesson}
              </motion.li>
            ))}
          </ul>
        </Section>
      )}

      {/* Future Work */}
      {study.futureWork && study.futureWork.length > 0 && (
        <Section icon={<Rocket className="w-5 h-5" />} title="Future Work">
          <ul className="space-y-3">
            {study.futureWork.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-[#8892b0]"
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#64ffda] flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[#64ffda]">{icon}</span>
        <h2 className="text-2xl font-bold text-[#ccd6f6]">{title}</h2>
        <div className="flex-1 h-px bg-[#1d3a5c] ml-4" />
      </div>
      {children}
    </motion.section>
  );
}
