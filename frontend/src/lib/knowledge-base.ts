/**
 * Knowledge Base Builder for Ask Aleem AI
 * Transforms all portfolio data into a comprehensive text knowledge base
 * used as context for GPT-4o RAG responses.
 */

import {
  profileData,
  experienceData,
  projectsData,
  skillGroupsData,
  blogPostsData,
  testimonialsData,
  servicesData,
  statsData,
} from "./data";

export function buildKnowledgeBase(): string {
  const sections: string[] = [];

  // ─── Profile ───
  sections.push(`=== ABOUT ALEEM ===
Name: ${profileData.name}
Title: ${profileData.headline}
Subheadline: ${profileData.subheadline}
Location: ${profileData.location}
Email: ${profileData.email}
Phone: ${profileData.phone}
GitHub: ${profileData.githubUrl}
LinkedIn: ${profileData.linkedinUrl}
Instagram: ${profileData.instagramUrl}

Summary:
${profileData.summary}

Aleem is currently open to AI leadership roles, technical project management positions, and consulting engagements in AI/ML, healthcare technology, and SaaS product development.`);

  // ─── Experience ───
  sections.push(`=== PROFESSIONAL EXPERIENCE ===
${experienceData
  .map(
    (exp) => `--- ${exp.title} ---
Company: ${exp.company}
Period: ${exp.startDate} – ${exp.current ? "Present" : exp.endDate}
Location: ${exp.location}
Overview: ${exp.description}
Key Achievements:
${exp.bullets.map((b) => `• ${b}`).join("\n")}
Technologies: ${exp.tags.join(", ")}`
  )
  .join("\n\n")}`);

  // ─── Projects ───
  sections.push(`=== FEATURED PROJECTS (${projectsData.length} total) ===
${projectsData
  .map(
    (p) => `--- ${p.title} ---
Tagline: ${p.tagline}
The Challenge: ${p.problem}
The Solution: ${p.solution}
My Role: ${p.role}
Impact & Outcomes: ${p.outcome}
Tech Stack: ${p.stack.join(", ")}${p.githubUrl ? `\nGitHub: ${p.githubUrl}` : ""}${p.liveUrl ? `\nLive Demo: ${p.liveUrl}` : ""}`
  )
  .join("\n\n")}`);

  // ─── Skills ───
  sections.push(`=== SKILLS & EXPERTISE ===
${skillGroupsData.map((g) => `${g.name}: ${g.skills.join(", ")}`).join("\n")}`);

  // ─── Key Metrics ───
  sections.push(`=== KEY METRICS ===
${statsData.map((s) => `${s.label}: ${s.value}`).join("\n")}`);

  // ─── Services ───
  sections.push(`=== SERVICES OFFERED ===
${servicesData.map((s) => `• ${s.title}: ${s.description}`).join("\n")}`);

  // ─── Testimonials ───
  sections.push(`=== TESTIMONIALS ===
${testimonialsData
  .map((t) => `"${t.content}" — ${t.name}, ${t.role} at ${t.company}`)
  .join("\n\n")}`);

  // ─── Blog Topics ───
  sections.push(`=== PUBLISHED ARTICLES ===
${blogPostsData.map((b) => `• ${b.title}: ${b.excerpt}`).join("\n")}`);

  return sections.join("\n\n");
}
