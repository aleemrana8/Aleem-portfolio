"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  HeartPulse,
  Wrench,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { FadeIn } from "@/components/MotionWrappers";
import { ConstellationBg } from "@/components/SectionVisualizations";

const reasons = [
  {
    icon: Zap,
    title: "Bridge Between Business & Engineering",
    description:
      "I translate complex business requirements into scalable technical architectures — no lost-in-translation gaps between stakeholders and engineers.",
  },
  {
    icon: Brain,
    title: "AI Automation Expertise",
    description:
      "Proven track record deploying autonomous AI agents, RAG pipelines, and voice systems that handle 10K+ interactions monthly in production.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Workflow Experience",
    description:
      "Deep domain knowledge in RCM automation, appointment scheduling, medical coding, and clinical operations — a rare combination in tech.",
  },
  {
    icon: Wrench,
    title: "Leadership + Hands-on Engineering",
    description:
      "I don't just manage teams — I architect systems, write code, and ship features alongside my engineers when the situation demands it.",
  },
  {
    icon: LayoutDashboard,
    title: "Scalable Architecture Mindset",
    description:
      "Every system I design is built for scale — distributed architectures, event-driven patterns, vector databases, and CI/CD from day one.",
  },
  {
    icon: TrendingUp,
    title: "Product Delivery Discipline",
    description:
      "Consistent on-time delivery using Agile/Scrum, risk management frameworks, and KPI-driven execution across multiple concurrent projects.",
  },
];

export function WhyHireMe() {
  return (
    <section id="why-hire" className="py-24 md:py-32 relative">
      {/* Subtle gradient background */}
      <ConstellationBg density={25} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-accent/[0.015] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-purple-500/[0.01] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">
            The Value I Bring
          </p>
          <h2 className="section-heading">Why Hire Me</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            I combine technical depth with product thinking and delivery
            discipline — the rare intersection that turns complex AI ideas into
            production systems that generate real business value.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <FadeIn key={reason.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="glass-card relative overflow-hidden group hover:border-accent/15 transition-all duration-700 h-full"
                >
                  {/* Left accent bar */}
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-accent/40 via-accent/20 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

                  <div className="p-7 pl-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/[0.07] border border-accent/[0.08] flex items-center justify-center group-hover:bg-accent/[0.12] group-hover:border-accent/20 transition-all duration-500">
                        <Icon
                          size={18}
                          className="text-accent/60 group-hover:text-accent transition-colors duration-500"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-[15px] font-semibold text-slate-lightest group-hover:text-white transition-colors duration-500">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-slate/70 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
