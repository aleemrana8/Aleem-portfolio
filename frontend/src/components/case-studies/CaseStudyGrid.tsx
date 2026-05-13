"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  stack?: string[];
  metrics?: Record<string, string>;
}

interface CaseStudyGridProps {
  studies: CaseStudy[];
}

export function CaseStudyGrid({ studies }: CaseStudyGridProps) {
  if (!studies || studies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Layers className="w-12 h-12 text-[#64ffda] mb-4" />
        <p className="text-[#8892b0] text-lg">No case studies available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {studies.map((study, index) => (
        <motion.div
          key={study.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Link href={`/case-studies/${study.slug}`} className="block h-full">
            <div className="relative h-full p-6 rounded-xl border border-[#1d3a5c] bg-[#112240]/60 backdrop-blur-sm hover:border-[#64ffda]/30 transition-all duration-300 group">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#64ffda]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <Layers className="w-8 h-8 text-[#64ffda]" />
                  <ArrowUpRight className="w-5 h-5 text-[#8892b0] group-hover:text-[#64ffda] transition-colors" />
                </div>

                <h3 className="text-xl font-semibold text-[#ccd6f6] mb-2 group-hover:text-[#64ffda] transition-colors">
                  {study.title}
                </h3>

                {study.subtitle && (
                  <p className="text-[#8892b0] text-sm mb-4 line-clamp-2">
                    {study.subtitle}
                  </p>
                )}

                {study.stack && study.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {study.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono text-[#64ffda] bg-[#64ffda]/10 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.stack.length > 4 && (
                      <span className="px-2 py-1 text-xs font-mono text-[#8892b0]">
                        +{study.stack.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
