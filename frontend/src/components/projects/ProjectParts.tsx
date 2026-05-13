"use client";

import { Sparkles, ArrowUpRight } from "lucide-react";

interface TechStackPillsProps {
  technologies: string[];
  maxVisible?: number;
  variant?: "compact" | "full";
}

export function TechStackPills({
  technologies,
  maxVisible = 5,
  variant = "compact",
}: TechStackPillsProps) {
  const visible = variant === "full" ? technologies : technologies.slice(0, maxVisible);
  const remaining = technologies.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((tech) => (
        <span
          key={tech}
          className={
            variant === "full"
              ? "inline-flex items-center px-3.5 py-1.5 text-xs font-mono rounded-full text-accent/85 bg-accent/[0.07] border border-accent/[0.12] hover:bg-accent/[0.12] hover:border-accent/25 transition-all duration-300"
              : "text-xs font-mono text-accent/60 hover:text-accent transition-colors duration-300"
          }
        >
          {tech}
        </span>
      ))}
      {variant === "compact" && remaining > 0 && (
        <span className="text-xs font-mono text-slate/40">+{remaining}</span>
      )}
    </div>
  );
}

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <h4
      className={`text-[11px] font-mono text-accent uppercase tracking-[0.2em] mb-3 ${className}`}
    >
      {children}
    </h4>
  );
}

interface FeaturedBadgeProps {
  className?: string;
}

export function FeaturedBadge({ className = "" }: FeaturedBadgeProps) {
  return (
    <div
      className={`flex items-center gap-1.5 text-accent/50 text-xs font-mono ${className}`}
    >
      <Sparkles size={12} className="animate-pulse" />
      Featured
    </div>
  );
}

interface ViewCaseStudyLinkProps {
  className?: string;
}

export function ViewCaseStudyLink({ className = "" }: ViewCaseStudyLinkProps) {
  return (
    <div
      className={`flex items-center gap-1.5 text-[13px] text-accent/40 group-hover:text-accent font-mono transition-all duration-500 ${className}`}
    >
      View Case Study
      <ArrowUpRight
        size={14}
        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
      />
    </div>
  );
}
