"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useMemo } from "react";

// â”€â”€â”€ Floating particles shared across sections â”€â”€â”€
export function FloatingParticles({ count = 20, color = "accent" }: { count?: number; color?: string }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: ((i * 2741 + 17) % 100),
      y: ((i * 7919 + 104729) % 100),
      size: 1 + (i % 3),
      duration: 3 + (i % 4),
      delay: (i % 6) * 0.5,
    })), [count]);

  const fill = color === "purple" ? "rgba(168,85,247,0.2)" : "rgba(56, 189, 248,0.2)";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size * 2,
            height: p.size * 2,
            background: fill,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// â”€â”€â”€ Constellation / Network lines background â”€â”€â”€
export function ConstellationBg({ density = 30 }: { density?: number }) {
  const nodes = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < density; i++) {
      pts.push({
        x: ((i * 2741 + 17) % 100),
        y: (((i * 7919 + 104729) % 100)),
      });
    }
    return pts;
  }, [density]);

  const connections = useMemo(() => {
    const conns: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 22) {
          conns.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y });
        }
      }
    }
    return conns;
  }, [nodes]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg className="w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map((c, i) => (
          <motion.line
            key={i}
            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke="rgba(56, 189, 248,0.08)"
            strokeWidth={0.12}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 5, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={0.25}
            fill="rgba(56, 189, 248,0.35)"
            animate={{ r: [0.15, 0.35, 0.15], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3 + (i % 3), delay: (i % 5) * 0.4, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
}

// â”€â”€â”€ Animated counter for metrics â”€â”€â”€
export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

// â”€â”€â”€ Hexagon grid background â”€â”€â”€
export function HexGridBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-50">
      <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => {
            const x = col * 28 + (row % 2) * 14;
            const y = row * 24;
            return (
              <motion.polygon
                key={`${row}-${col}`}
                points={hexPoints(x, y, 12)}
                fill="none"
                stroke="rgba(56, 189, 248,0.06)"
                strokeWidth={0.3}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, delay: (row + col) * 0.3, repeat: Infinity }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

// â”€â”€â”€ Circuit board trace pattern â”€â”€â”€
export function CircuitBg() {
  const paths = useMemo(() => [
    "M 10,20 L 30,20 L 30,50 L 60,50",
    "M 80,10 L 80,40 L 50,40 L 50,70 L 90,70",
    "M 20,80 L 40,80 L 40,60 L 70,60 L 70,90",
    "M 5,50 L 25,50 L 25,30 L 55,30",
    "M 60,85 L 85,85 L 85,55 L 95,55",
    "M 15,95 L 15,70 L 45,70 L 45,45",
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(56, 189, 248,0.1)"
            strokeWidth={0.2}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: i * 0.3 }}
          />
        ))}
        {/* Junction dots */}
        {[
          [30, 20], [30, 50], [60, 50], [80, 40], [50, 40], [50, 70], [90, 70],
          [40, 80], [40, 60], [70, 60], [70, 90], [25, 50], [25, 30], [55, 30],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r={0.6}
            fill="rgba(56, 189, 248,0.3)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
}

// â”€â”€â”€ Orbital rings background (for leadership) â”€â”€â”€
export function OrbitalBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-45">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        {[35, 25, 15].map((r, i) => (
          <motion.ellipse
            key={i}
            cx={50} cy={50} rx={r} ry={r * 0.4}
            fill="none"
            stroke="rgba(56, 189, 248,0.1)"
            strokeWidth={0.2}
            strokeDasharray="2 3"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        ))}
        {/* Orbiting dots */}
        {[35, 25].map((r, i) => (
          <motion.circle
            key={`dot-${i}`}
            r={0.8}
            fill="rgba(56, 189, 248,0.5)"
            animate={{
              cx: [50 + r, 50, 50 - r, 50, 50 + r],
              cy: [50, 50 - r * 0.4, 50, 50 + r * 0.4, 50],
            }}
            transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

// â”€â”€â”€ Flowing data streams (for skills section) â”€â”€â”€
export function DataStreamBg() {
  const streams = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      x: 10 + i * 12,
      delay: i * 0.6,
      speed: 3 + (i % 3),
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-35">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {streams.map((s, i) => (
          <g key={i}>
            <line x1={s.x} y1={0} x2={s.x} y2={100} stroke="rgba(56, 189, 248,0.05)" strokeWidth={0.15} />
            <motion.circle
              cx={s.x} r={0.5}
              fill="rgba(56, 189, 248,0.4)"
              animate={{ cy: [-5, 105] }}
              transition={{ duration: s.speed, delay: s.delay, repeat: Infinity, ease: "linear" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// â”€â”€â”€ DNA / double helix (for healthcare experience) â”€â”€â”€
export function HelixBg() {
  const points = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => {
      const t = i / 19;
      const y = t * 100;
      const x1 = 50 + Math.sin(t * Math.PI * 4) * 20;
      const x2 = 50 - Math.sin(t * Math.PI * 4) * 20;
      return { y, x1, x2, i };
    }), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {points.map((p, idx) => (
          <g key={idx}>
            {idx > 0 && (
              <>
                <line
                  x1={points[idx - 1].x1} y1={points[idx - 1].y}
                  x2={p.x1} y2={p.y}
                  stroke="rgba(56, 189, 248,0.1)" strokeWidth={0.2}
                />
                <line
                  x1={points[idx - 1].x2} y1={points[idx - 1].y}
                  x2={p.x2} y2={p.y}
                  stroke="rgba(56, 189, 248,0.08)" strokeWidth={0.2}
                />
              </>
            )}
            {idx % 3 === 0 && (
              <line x1={p.x1} y1={p.y} x2={p.x2} y2={p.y}
                stroke="rgba(56, 189, 248,0.06)" strokeWidth={0.15}
              />
            )}
            <motion.circle
              cx={p.x1} cy={p.y} r={0.4}
              fill="rgba(56, 189, 248,0.4)"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, delay: idx * 0.15, repeat: Infinity }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// â”€â”€â”€ Skill icon mapping for individual skills â”€â”€â”€
import {
  Brain, Code, Server, Cloud, Settings, Crown, Cpu, Database, Globe, Workflow,
  Boxes, Terminal, GitBranch, Palette, Smartphone, Lock, BarChart3, MessageSquare,
  Headphones, Mic, Bot, Sparkles, Wand2, FileCode, Layers, Monitor, Rocket,
  Shield, Wrench, Zap, Target, Users, Briefcase, PenTool, BookOpen,
} from "lucide-react";

const SKILL_ICONS: Record<string, React.ElementType> = {
  // Leadership
  "Solution Architecture": Layers,
  "Agile / Scrum": Target,
  "Sprint Planning": Rocket,
  "Risk Management": Shield,
  "Jira & Trello": Boxes,
  "Stakeholder Management": Users,
  "OKRs & KPIs": BarChart3,
  // AI
  "n8n Workflows": Workflow,
  "LiveKit": Headphones,
  "ElevenLabs": Mic,
  "RAG Pipelines": Database,
  "LLM Integration": Brain,
  "AI Agents": Bot,
  "OpenAI GPT-4o": Sparkles,
  "Prompt Engineering": Wand2,
  // Frontend
  "React.js": Code,
  "Next.js": Globe,
  "TypeScript": FileCode,
  "JavaScript": FileCode,
  "HTML/CSS": Code,
  "Tailwind CSS": Palette,
  "Three.js": Boxes,
  "Framer Motion": Zap,
  "Vite": Rocket,
  "Ant Design": Palette,
  // Backend
  "Node.js": Server,
  "Express.js": Server,
  "FastAPI": Zap,
  "Python": Terminal,
  "PostgreSQL": Database,
  "MongoDB": Database,
  "Redis": Database,
  "Prisma": Layers,
  "REST APIs": Globe,
  // DevOps
  "Docker": Boxes,
  "GitHub Actions": GitBranch,
  "CI/CD Pipelines": Rocket,
  "Vercel": Cloud,
  "Render": Cloud,
  "Railway": Cloud,
  "Nginx": Server,
  "Linux": Terminal,
  "WebRTC": Headphones,
  "Socket.io": MessageSquare,
  // Tools
  "VS Code": Monitor,
  "Visual Studio": Monitor,
  "PyCharm": Monitor,
  "Git & GitHub": GitBranch,
  "Postman": Globe,
  "Figma": PenTool,
  "MySQL": Database,
  "MongoDB Atlas": Database,
  "pgAdmin": Database,
  "Slack": MessageSquare,
  "Notion": BookOpen,
  "Digital Marketing": BarChart3,
  "Technical Documentation": BookOpen,
  "CRM Systems": Briefcase,
};

export function getSkillIcon(skill: string): React.ElementType {
  return SKILL_ICONS[skill] || Cpu;
}
