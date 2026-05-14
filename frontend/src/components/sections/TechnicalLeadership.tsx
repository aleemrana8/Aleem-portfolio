"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Target,
  Brain,
  Users,
  Handshake,
  HeartPulse,
  CalendarCheck,
  Lightbulb,
} from "lucide-react";
import { FadeIn } from "@/components/MotionWrappers";

const capabilities = [
  {
    icon: Crown,
    title: "Team Leadership",
    description:
      "Leading cross-functional AI engineering teams, setting technical direction, and fostering high-performance culture.",
  },
  {
    icon: Target,
    title: "Sprint Execution",
    description:
      "Driving agile delivery with structured sprint planning, daily standups, and velocity-driven iteration cycles.",
  },
  {
    icon: Brain,
    title: "AI Solution Architecture",
    description:
      "Designing end-to-end AI systems — from LLM pipelines and voice agents to RAG architectures and automation workflows.",
  },
  {
    icon: Users,
    title: "Cross-functional Coordination",
    description:
      "Bridging engineering, product, QA, and operations teams to deliver complex AI initiatives on schedule.",
  },
  {
    icon: Handshake,
    title: "Stakeholder Management",
    description:
      "Translating technical complexity into clear business narratives for executives, clients, and non-technical stakeholders.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Workflow Optimization",
    description:
      "Deep domain expertise in RCM automation, appointment scheduling, medical coding, and clinical workflow digitization.",
  },
  {
    icon: CalendarCheck,
    title: "Delivery Planning",
    description:
      "Building risk-managed roadmaps, tracking KPIs, and ensuring predictable on-time delivery across concurrent projects.",
  },
  {
    icon: Lightbulb,
    title: "Technical Decision Making",
    description:
      "Evaluating trade-offs, selecting architectures, and making high-stakes technology choices that scale with business growth.",
  },
];

export function TechnicalLeadership() {
  return (
    <section id="leadership" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">
            More Than a Coder
          </p>
          <h2 className="section-heading">Leadership & Product Delivery</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            I operate at the intersection of technical excellence and strategic
            delivery — architecting AI systems, leading engineering teams, and
            shipping products that create measurable business impact.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <FadeIn key={cap.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="glass-card p-6 relative overflow-hidden group hover:border-accent/15 transition-all duration-700 h-full"
                >
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

                  {/* Hover glow */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/[0.04] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-accent/[0.07] border border-accent/[0.08] flex items-center justify-center mb-4 group-hover:bg-accent/[0.12] group-hover:border-accent/20 transition-all duration-500">
                      <Icon
                        size={20}
                        className="text-accent/60 group-hover:text-accent transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="text-[15px] font-semibold text-slate-lightest mb-2 group-hover:text-white transition-colors duration-500">
                      {cap.title}
                    </h3>
                    <p className="text-[13px] text-slate/70 leading-relaxed">
                      {cap.description}
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
