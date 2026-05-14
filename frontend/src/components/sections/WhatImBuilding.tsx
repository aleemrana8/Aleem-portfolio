"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Brain,
  Mic,
  Workflow,
  Search,
  HeartPulse,
} from "lucide-react";
import { FadeIn } from "@/components/MotionWrappers";
import { InnovationLabBg, FloatingParticles } from "@/components/SectionVisualizations";

const buildingItems = [
  {
    icon: HeartPulse,
    title: "AI Healthcare Agents",
    description:
      "Scaling autonomous voice agents for appointment scheduling, refill requests, lab reports, and callback management across healthcare systems.",
    status: "Active",
  },
  {
    icon: Workflow,
    title: "Autonomous Workflows",
    description:
      "Building self-healing n8n automation pipelines that orchestrate AI models, APIs, and human-in-the-loop checkpoints for enterprise operations.",
    status: "Active",
  },
  {
    icon: Search,
    title: "Recruiter AI Systems",
    description:
      "Developing intelligent job matching engines that score opportunities, generate tailored applications, and automate the entire job search lifecycle.",
    status: "Shipped",
  },
  {
    icon: Mic,
    title: "Voice Automation Infrastructure",
    description:
      "Engineering production-grade voice pipelines with LiveKit, Deepgram, and Cartesia — featuring FSM conversation engines and real-time WebRTC streaming.",
    status: "Active",
  },
  {
    icon: Brain,
    title: "RAG Portfolio Intelligence",
    description:
      "Building vector-search-powered AI assistants that answer questions about my work using embeddings over my entire portfolio knowledge base.",
    status: "Live",
  },
  {
    icon: Rocket,
    title: "AI Product Platforms",
    description:
      "Architecting full-stack SaaS platforms with AI-powered hiring pipelines, multi-provider communication, and real-time admin dashboards.",
    status: "Shipped",
  },
];

const statusColors: Record<string, string> = {
  Active: "text-yellow-400/80 bg-yellow-400/[0.08] border-yellow-400/[0.15]",
  Live: "text-green-400/80 bg-green-400/[0.08] border-green-400/[0.15]",
  Shipped: "text-accent/80 bg-accent/[0.08] border-accent/[0.15]",
};

export function WhatImBuilding() {
  return (
    <section id="building" className="py-24 md:py-32 relative">
      <InnovationLabBg />
      <FloatingParticles count={10} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">
            Currently Shipping
          </p>
          <h2 className="section-heading">What I&apos;m Building Now</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            I don&apos;t just manage — I build. Here&apos;s what I&apos;m actively
            shipping, scaling, and iterating on right now.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {buildingItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="glass-card p-7 relative overflow-hidden group hover:border-accent/15 transition-all duration-700 h-full flex flex-col"
                >
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/30 via-accent/50 to-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/[0.07] border border-accent/[0.08] flex items-center justify-center group-hover:bg-accent/[0.12] group-hover:border-accent/20 transition-all duration-500">
                      <Icon
                        size={20}
                        className="text-accent/60 group-hover:text-accent transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${statusColors[item.status] || statusColors.Active}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-semibold text-slate-lightest mb-2 group-hover:text-white transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-slate/70 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
