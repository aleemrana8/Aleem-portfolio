"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, FolderKanban, Workflow, HeartPulse, Brain, Shield } from "lucide-react";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const metrics = [
  { label: "Monthly AI Calls", target: 10000, suffix: "+", icon: Bot },
  { label: "Backend Services", target: 44, suffix: "+", icon: FolderKanban },
  { label: "API Endpoints", target: 72, suffix: "+", icon: Workflow },
  { label: "FSM Engine States", target: 24, suffix: "", icon: Brain },
  { label: "RBAC Tiers", target: 6, suffix: "", icon: Shield },
  { label: "AI Assistants Built", target: 8, suffix: "+", icon: HeartPulse },
];

function MetricCard({
  label,
  target,
  suffix,
  icon: Icon,
  index,
  isInView,
}: {
  label: string;
  target: number;
  suffix: string;
  icon: React.ElementType;
  index: number;
  isInView: boolean;
}) {
  const count = useAnimatedCounter(target, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-xl border border-[#1d3a5c] bg-[#112240]/60 backdrop-blur-sm hover:border-[#38bdf8]/40 transition-all duration-300"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl bg-[#38bdf8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-3 rounded-lg bg-[#38bdf8]/10 mb-4 group-hover:bg-[#38bdf8]/20 transition-colors">
          <Icon className="w-6 h-6 text-[#38bdf8]" />
        </div>
        <p className="text-3xl md:text-4xl font-bold text-[#ccd6f6]">
          {count.toLocaleString()}
          <span className="text-[#38bdf8]">{suffix}</span>
        </p>
        <p className="text-sm text-[#8892b0] mt-2">{label}</p>
      </div>
    </motion.div>
  );
}

export function MetricsDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" id="metrics">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[#38bdf8] font-mono text-sm mb-2 tracking-wider">By The Numbers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#ccd6f6]">Impact & Scale</h2>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} {...metric} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
