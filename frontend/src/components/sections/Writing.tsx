"use client";

import { FadeIn } from "@/components/MotionWrappers";
import { blogPostsData } from "@/lib/data";
import { ArrowUpRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function Writing() {
  return (
    <section id="writing" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-accent font-mono text-sm mb-2 tracking-wider">Thinking Out Loud</p>
          <h2 className="section-heading">Writing & Insights</h2>
          <p className="text-slate max-w-2xl mt-4 leading-relaxed">
            Thoughts on AI automation, technical leadership, healthcare workflows,
            and the evolving landscape of intelligent systems.
          </p>
        </FadeIn>

        <div className="mt-14 space-y-3">
          {blogPostsData.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <motion.article
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                className="glass-card-hover p-6 md:p-8 group cursor-pointer relative overflow-hidden"
              >
                {/* Left accent line on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-accent/40 mb-2.5 uppercase tracking-wider">
                      <Calendar size={11} />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-lightest group-hover:text-accent transition-colors duration-500 leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-slate mt-2.5 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-accent/35 group-hover:text-accent/60 transition-colors duration-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate/20 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
                  />
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
