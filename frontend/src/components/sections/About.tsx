"use client";

import { FadeIn } from "@/components/MotionWrappers";
import { profileData, statsData } from "@/lib/data";
import { MapPin, Briefcase, GraduationCap, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SkillEcosystemBg, FloatingParticles } from "@/components/SectionVisualizations";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <SkillEcosystemBg />
      <FloatingParticles count={12} />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">Get to Know Me</p>
          <h2 className="section-heading">About Me</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 mt-14">
          {/* Profile Image & Quick Info */}
          <FadeIn delay={0.1}>
            <div className="space-y-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden">
                  <Image
                    src="/images/profile.png"
                    alt={profileData.name}
                    width={280}
                    height={280}
                    className="w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 border-2 border-accent/20 rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 -z-10" />
                </div>
              </div>

              {/* Quick info */}
              <div className="space-y-3.5">
                {[
                  { icon: MapPin, text: profileData.location },
                  { icon: Briefcase, text: "CareCloud MTBC" },
                  { icon: GraduationCap, text: "BS Software Engineering, COMSATS" },
                  { icon: Cpu, text: "AI Automation & Healthcare" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-slate group/item hover:text-slate-lighter transition-colors duration-300">
                    <Icon size={15} className="text-accent/60 group-hover/item:text-accent transition-colors duration-300" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Bio */}
          <FadeIn delay={0.2} className="md:col-span-2">
            <div className="space-y-5 text-slate leading-relaxed text-[15px]">
              <p>
                I&apos;m a <span className="text-slate-lightest font-medium">Product Manager</span> and{" "}
                <span className="text-slate-lightest font-medium">AI Team Lead</span> with a{" "}
                <span className="text-accent">solution-architecture mindset</span>, specializing in AI-driven
                automation solutions for healthcare. I combine hands-on software engineering expertise with
                strategic project leadership to translate complex business requirements into scalable technical
                architectures and measurable outcomes.
              </p>

              <p>
                At <span className="text-slate-lightest font-medium">CareCloud MTBC</span>, I lead cross-functional
                teams of AI engineers and operations specialists to design, build, and deploy autonomous AI agents
                that handle <span className="text-accent">10,000+ calls monthly</span>. From architecting the{" "}
                <span className="text-slate-lightest font-medium">Front Desk AI Agent</span> to driving{" "}
                <span className="text-slate-lightest font-medium">Revenue Cycle Management automation</span>, I
                focus on creating systems that reduce manual effort, improve accuracy, and scale with confidence.
              </p>

              <p>
                My approach blends agile delivery discipline with technical depth — I think in systems, lead with
                clarity, and deliver with precision. Whether it&apos;s defining AI agent call flows, designing
                RCM automation workflows, or coordinating sprint execution across teams, I bring structure to
                complexity and drive outcomes that matter.
              </p>

              <p className="text-xs text-slate/50 font-mono uppercase tracking-wider mt-6">
                Technologies I work with
              </p>

              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-mono text-slate-light">
                {["LiveKit", "n8n", "ElevenLabs", "React.js", "Node.js", "REST APIs", "RAG/LLMs", "PostgreSQL"].map(
                  (tech) => (
                    <li key={tech} className="flex items-center gap-2.5 group/tech hover:text-accent transition-colors duration-300">
                      <span className="text-accent/50 text-xs group-hover/tech:text-accent transition-colors duration-300">▹</span>
                      {tech}
                    </li>
                  )
                )}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Stats Strip */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-20">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="glass-card p-6 text-center group hover:border-accent/15 transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate/60 font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
