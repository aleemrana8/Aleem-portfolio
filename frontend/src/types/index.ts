/** Shared TypeScript types for the portfolio frontend */

export interface NavLink {
  label: string;
  href: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subheadline: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  location: string;
  summary: string;
  avatarUrl: string;
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
  logo?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  role: string;
  stack: string[];
  highlights: string[];
  featured: boolean;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudySlug?: string;
  architectureFlow?: ArchitectureNode[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type?: string;
  position: { x: number; y: number };
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface StatData {
  label: string;
  value: number;
  suffix?: string;
}

export interface ServiceData {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime?: string;
  tags?: string[];
  coverImage?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
}
