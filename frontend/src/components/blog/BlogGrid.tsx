"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowUpRight, FileText } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  createdAt?: string;
  published?: boolean;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const published = posts.filter((p) => p.published !== false);

  if (!published || published.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FileText className="w-12 h-12 text-[#64ffda] mb-4" />
        <p className="text-[#8892b0] text-lg">No blog posts published yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {published.map((post, index) => (
        <motion.div
          key={post.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Link href={`/blog/${post.slug}`} className="block h-full">
            <div className="relative h-full p-6 rounded-xl border border-[#1d3a5c] bg-[#112240]/60 backdrop-blur-sm hover:border-[#64ffda]/30 transition-all duration-300 group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#64ffda]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <FileText className="w-7 h-7 text-[#64ffda]" />
                  <ArrowUpRight className="w-5 h-5 text-[#8892b0] group-hover:text-[#64ffda] transition-colors" />
                </div>

                <h3 className="text-lg font-semibold text-[#ccd6f6] mb-2 group-hover:text-[#64ffda] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-[#8892b0] mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-[#1d3a5c]/50">
                  <div className="flex items-center justify-between">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono text-[#64ffda] bg-[#64ffda]/10 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {post.createdAt && (
                      <span className="flex items-center gap-1 text-xs text-[#8892b0]">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
