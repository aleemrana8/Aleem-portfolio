"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail, ChevronRight, Instagram, Bot } from "lucide-react";
import dynamic from "next/dynamic";
import { profileData } from "@/lib/data";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

function TypingText({ texts, className }: { texts: string[]; className?: string }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className={className}>
      {texts[textIndex].substring(0, charIndex)}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
}

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/30 via-transparent to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-900 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Name - Editorial style */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-lightest leading-[0.95] tracking-tight"
          >
            Rana Muhammad
            <br />
            <span className="gradient-text">Aleem Akhtar</span>
          </motion.h1>

          {/* Static title */}
          <motion.p
            variants={item}
            className="text-accent font-mono text-sm sm:text-base mt-4 tracking-wider"
          >
            AI Team Lead &nbsp;/&nbsp; Product Manager
          </motion.p>

          {/* Headline with typing effect */}
          <motion.h2
            variants={item}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate mt-4 leading-snug"
          >
            <TypingText
              texts={[
                "Deploying Autonomous AI Agents at Scale",
                "Leading Healthcare Automation at CareCloud",
                "Architecting Voice AI & RAG Pipelines",
                "Shipping AI Products from 0 → Production",
              ]}
            />
          </motion.h2>

          {/* Summary */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-slate max-w-2xl mt-6 leading-relaxed"
          >
            {profileData.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-3 mt-10"
          >
            <a href="#projects" className="btn-filled group">
              <span className="relative z-10 flex items-center gap-2">
                Explore Projects
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
            </a>
            <a href="#experience" className="btn-primary">
              <span className="relative z-10 flex items-center gap-2">
                View Experience
              </span>
            </a>
            <button
              onClick={() => {
                const event = new CustomEvent('open-ai-chat');
                window.dispatchEvent(event);
              }}
              className="btn-primary group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Bot size={16} className="text-accent" />
                Ask Aleem AI
              </span>
            </button>
            <a href="#contact" className="btn-primary">
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
              </span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={item}
            className="flex items-center gap-6 mt-12"
          >
            {[
              { href: profileData.githubUrl, icon: Github, label: "GitHub" },
              { href: profileData.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
              { href: profileData.instagramUrl, icon: Instagram, label: "Instagram" },
              { href: `mailto:${profileData.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-slate hover:text-accent hover:-translate-y-1.5 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
            <div className="w-20 h-[1px] bg-gradient-to-r from-slate/30 to-transparent ml-1" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-slate/30 text-[10px] font-mono uppercase tracking-[0.3em]">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-accent/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
