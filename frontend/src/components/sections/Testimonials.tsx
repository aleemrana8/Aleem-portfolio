"use client";

import { FadeIn } from "@/components/MotionWrappers";
import { testimonialsData } from "@/lib/data";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">
            What People Say
          </p>
          <h2 className="section-heading">Testimonials</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            Feedback from colleagues, clients, and collaborators I&apos;ve had
            the privilege of working with.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {testimonialsData.map((testimonial, i) => (
            <FadeIn key={testimonial.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="glass-card p-7 md:p-8 relative overflow-hidden group hover:border-accent/15 transition-all duration-700"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/40 via-accent/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                <Quote
                  size={28}
                  className="text-accent/20 mb-4"
                  strokeWidth={1.5}
                />

                <p className="text-slate-light text-[15px] leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-lightest">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate/60 font-mono">
                      {testimonial.role} — {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
