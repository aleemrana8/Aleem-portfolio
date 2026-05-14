/** Shared constants — design tokens, tech icon maps, navigation */

/** Category colors used for tech badges across multiple sections */
export const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  ai: { bg: "bg-purple-500/8", border: "border-purple-500/15", text: "text-purple-400", glow: "group-hover:shadow-purple-500/10" },
  frontend: { bg: "bg-sky-500/8", border: "border-sky-500/15", text: "text-sky-400", glow: "group-hover:shadow-sky-500/10" },
  backend: { bg: "bg-emerald-500/8", border: "border-emerald-500/15", text: "text-emerald-400", glow: "group-hover:shadow-emerald-500/10" },
  database: { bg: "bg-amber-500/8", border: "border-amber-500/15", text: "text-amber-400", glow: "group-hover:shadow-amber-500/10" },
  devops: { bg: "bg-rose-500/8", border: "border-rose-500/15", text: "text-rose-400", glow: "group-hover:shadow-rose-500/10" },
} as const;

/** Status badge colors for project/feature cards */
export const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  shipped: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  live: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  beta: "bg-amber-500/10 text-amber-400 border-amber-500/20",
} as const;

/** Rate limit config for client-side features */
export const RATE_LIMITS = {
  chat: { maxRequests: 25, windowMs: 60_000 },
  contact: { maxRequests: 5, windowMs: 3_600_000 },
} as const;

/** Animation presets for consistent motion across components */
export const MOTION_PRESETS = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
  },
} as const;

/** Knowledge base cache TTL in milliseconds (5 minutes) */
export const KNOWLEDGE_CACHE_TTL = 5 * 60 * 1000;
