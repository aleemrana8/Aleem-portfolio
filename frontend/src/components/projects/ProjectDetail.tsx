"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, AudioLines, FileText, Brain, CalendarCheck, XCircle, RefreshCw, Server, MessageSquare, Volume2 } from "lucide-react";
import { SectionLabel, TechStackPills } from "./ProjectParts";
import type { ProjectData } from "./ProjectCard";

const flowIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  audio: AudioLines,
  filetext: FileText,
  brain: Brain,
  calendar: CalendarCheck,
  xcircle: XCircle,
  refresh: RefreshCw,
  server: Server,
  message: MessageSquare,
  volume: Volume2,
};

function ArchitectureFlowDiagram({ flow }: { flow: NonNullable<ProjectData["architectureFlow"]> }) {
  function getNodeCenter(nodeId: string) {
    const node = flow.nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return { x: node.x + 60, y: node.y + 30 };
  }

  return (
    <div className="relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm overflow-x-auto">
      <svg viewBox="0 0 780 440" className="w-full h-auto min-w-[600px]" xmlns="http://www.w3.org/2000/svg">
        {flow.connections.map((conn, i) => {
          const from = getNodeCenter(conn.from);
          const to = getNodeCenter(conn.to);
          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke="rgba(100,255,218,0.15)"
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
          );
        })}
        {flow.connections.map((conn, i) => {
          const from = getNodeCenter(conn.from);
          const to = getNodeCenter(conn.to);
          return (
            <motion.circle
              key={`dot-${conn.from}-${conn.to}`}
              r="3" fill="#64ffda"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.2 + 1, repeat: Infinity, repeatDelay: 3 }}
            >
              <animateMotion dur="2s" begin={`${i * 0.2 + 1}s`} repeatCount="indefinite" path={`M${from.x},${from.y} L${to.x},${to.y}`} />
            </motion.circle>
          );
        })}
      </svg>
      <div className="absolute inset-0 p-6 pointer-events-none">
        <div className="relative w-full h-0" style={{ paddingBottom: "56.4%" }}>
          {flow.nodes.map((node, i) => {
            const Icon = flowIconMap[node.icon] || Brain;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="absolute"
                style={{ left: `${(node.x / 780) * 100}%`, top: `${(node.y / 440) * 100}%`, width: "120px" }}
              >
                <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[#0a192f]/90 border border-white/[0.08] hover:border-accent/40 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="text-[10px] text-slate-lightest text-center font-medium leading-tight">{node.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ProjectDetailProps {
  project: ProjectData;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const sections = [
    { label: "The Challenge", content: project.problem },
    { label: "The Solution", content: project.solution },
    { label: "My Role", content: project.role },
    { label: "Impact & Outcomes", content: project.outcome },
  ].filter((s) => s.content);

  return (
    <div className="space-y-10">
      {/* Project showcase image */}
      {project.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.06]"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            priority
          />
        </motion.div>
      )}

      {sections.map((section, i) => (
        <motion.div
          key={section.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.15 + i * 0.08,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <SectionLabel>{section.label}</SectionLabel>
          <p className="text-[15px] text-slate/85 leading-[1.8]">
            {section.content}
          </p>
        </motion.div>
      ))}

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent origin-left"
      />

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <SectionLabel>Tech Stack</SectionLabel>
        <TechStackPills technologies={project.stack} variant="full" />
      </motion.div>

      {/* Architecture Flow Diagram */}
      {project.architectureFlow && (
        <>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent origin-left"
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <SectionLabel>System Architecture</SectionLabel>
            <ArchitectureFlowDiagram flow={project.architectureFlow} />
          </motion.div>
        </>
      )}

      {/* Links */}
      {(project.githubUrl || project.liveUrl) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex gap-4 pt-2"
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono text-accent/80 bg-accent/[0.06] border border-accent/[0.12] rounded-lg hover:bg-accent/[0.12] hover:border-accent/25 transition-all duration-300"
            >
              Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono text-accent/80 bg-accent/[0.06] border border-accent/[0.12] rounded-lg hover:bg-accent/[0.12] hover:border-accent/25 transition-all duration-300"
            >
              Live Demo
            </a>
          )}
        </motion.div>
      )}
    </div>
  );
}
