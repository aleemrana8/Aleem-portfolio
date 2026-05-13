"use client";

import { FadeIn } from "@/components/MotionWrappers";
import { servicesData } from "@/lib/data";
import { motion } from "framer-motion";
import { Brain, Target, Layers, Zap, Heart, Users } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  target: Target,
  layers: Layers,
  zap: Zap,
  heart: Heart,
  users: Users,
};

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">
            How I Can Help
          </p>
          <h2 className="section-heading">Services</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            Specialized in AI automation, technical leadership, and building
            systems that scale — here&apos;s what I bring to the table.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <FadeIn key={service.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="glass-card p-7 relative overflow-hidden group hover:border-accent/15 transition-all duration-700 h-full"
                >
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/40 via-accent/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                  <div className="w-12 h-12 rounded-xl bg-accent/[0.08] flex items-center justify-center mb-5 group-hover:bg-accent/[0.12] transition-colors duration-500">
                    <Icon
                      size={22}
                      className="text-accent/70 group-hover:text-accent transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-lightest mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {service.description}
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
