"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

function renderMarkdown(md: string): string {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let html = escaped
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="blog-code-block"><code>$2</code></pre>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#ccd6f6]">$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="blog-inline-code">$1</code>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="blog-li">$1</li>')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p class="blog-p">')
    // Single newlines within paragraphs
    .replace(/\n/g, '<br/>');

  // Wrap list items in ul
  html = html.replace(/((?:<li class="blog-li">.*?<\/li><br\/>?)+)/g, '<ul class="blog-ul">$1</ul>');

  return `<p class="blog-p">${html}</p>`;
}

interface BlogPost {
  title: string;
  content: string;
  createdAt?: string;
  tags?: string[];
  readingTime?: number;
}

export function BlogPostContent({ post }: { post: BlogPost }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const readingTime = post.readingTime || Math.ceil((post.content?.length || 0) / 1000);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#0a192f]">
        <motion.div
          className="h-full bg-[#38bdf8]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-[#38bdf8] font-mono text-sm mb-10 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono text-[#38bdf8] bg-[#38bdf8]/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-[#ccd6f6] mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-[#8892b0] text-sm">
            {post.createdAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <div
            className="text-[#8892b0] leading-relaxed text-base blog-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || "") }}
          />
        </motion.article>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 pt-8 border-t border-[#1d3a5c]"
        >
          <Share2 className="w-4 h-4 text-[#8892b0]" />
          <span className="text-sm text-[#8892b0]">Share:</span>
          <button
            onClick={() => handleShare("twitter")}
            className="p-2 rounded-lg text-[#8892b0] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 transition-colors"
          >
            <Twitter className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="p-2 rounded-lg text-[#8892b0] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="p-2 rounded-lg text-[#8892b0] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </>
  );
}
