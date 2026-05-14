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

// ═══ SKILL ECOSYSTEM NETWORK (for About section) ═══
// Connected nodes showing skill relationships
export function SkillEcosystemBg() {
  const clusters = useMemo(() => {
    const items: { x: number; y: number; r: number; label: string; delay: number }[] = [];
    const labels = ["AI", "Web", "DevOps", "Data", "Voice", "Cloud"];
    const centers = [
      { x: 25, y: 30 }, { x: 75, y: 25 }, { x: 50, y: 70 },
      { x: 20, y: 75 }, { x: 80, y: 65 }, { x: 50, y: 20 },
    ];
    centers.forEach((c, i) => {
      items.push({ ...c, r: 2.5, label: labels[i], delay: i * 0.5 });
      // Satellite nodes
      for (let j = 0; j < 3; j++) {
        const angle = (j / 3) * Math.PI * 2 + i;
        items.push({
          x: c.x + Math.cos(angle) * 10,
          y: c.y + Math.sin(angle) * 6,
          r: 0.8,
          label: "",
          delay: i * 0.5 + j * 0.2,
        });
      }
    });
    return items;
  }, []);

  const links = useMemo(() => {
    const l: { x1: number; y1: number; x2: number; y2: number }[] = [];
    // Connect hub nodes
    const hubs = clusters.filter((c) => c.r > 2);
    for (let i = 0; i < hubs.length; i++) {
      for (let j = i + 1; j < hubs.length; j++) {
        const dx = hubs[i].x - hubs[j].x;
        const dy = hubs[i].y - hubs[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 60) {
          l.push({ x1: hubs[i].x, y1: hubs[i].y, x2: hubs[j].x, y2: hubs[j].y });
        }
      }
    }
    // Connect satellites to their hub
    clusters.forEach((c, i) => {
      if (c.r <= 2) {
        const hubIdx = Math.floor(i / 4) * 4;
        if (hubIdx < clusters.length) {
          l.push({ x1: c.x, y1: c.y, x2: clusters[hubIdx].x, y2: clusters[hubIdx].y });
        }
      }
    });
    return l;
  }, [clusters]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map((l, i) => (
          <motion.line
            key={`l-${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(56, 189, 248, 0.08)"
            strokeWidth={0.15}
            strokeDasharray="1 2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
        {clusters.map((c, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={c.x} cy={c.y} r={c.r}
            fill={c.r > 2 ? "rgba(56, 189, 248, 0.12)" : "rgba(56, 189, 248, 0.2)"}
            stroke={c.r > 2 ? "rgba(56, 189, 248, 0.2)" : "none"}
            strokeWidth={c.r > 2 ? 0.3 : 0}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              r: c.r > 2 ? [c.r, c.r + 0.4, c.r] : [c.r, c.r + 0.15, c.r],
            }}
            transition={{ duration: 4, delay: c.delay, repeat: Infinity }}
          />
        ))}
        {/* Hub labels */}
        {clusters.filter(c => c.r > 2).map((c, i) => (
          <text
            key={`t-${i}`}
            x={c.x} y={c.y + 0.5}
            textAnchor="middle"
            fill="rgba(56, 189, 248, 0.3)"
            fontSize={1.8}
            fontFamily="monospace"
          >
            {c.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ═══ TECH ORBIT RINGS (for TechWall section) ═══
// Concentric rings with orbiting tech dots
export function TechOrbitBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        {/* Concentric rings */}
        {[12, 20, 28, 36].map((r, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={50} cy={50} r={r}
            fill="none"
            stroke="rgba(56, 189, 248, 0.06)"
            strokeWidth={0.15}
            strokeDasharray="1.5 3"
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        ))}
        {/* Orbiting dots on each ring */}
        {[
          { r: 12, count: 4, speed: 12 },
          { r: 20, count: 6, speed: 18 },
          { r: 28, count: 8, speed: 25 },
          { r: 36, count: 5, speed: 30 },
        ].map((ring, ri) =>
          Array.from({ length: ring.count }, (_, di) => {
            const offset = (di / ring.count) * Math.PI * 2;
            return (
              <motion.circle
                key={`dot-${ri}-${di}`}
                r={0.5 + ri * 0.1}
                fill={`rgba(56, 189, 248, ${0.3 + ri * 0.1})`}
                animate={{
                  cx: Array.from({ length: 5 }, (_, k) =>
                    50 + ring.r * Math.cos(offset + (k / 4) * Math.PI * 2)
                  ),
                  cy: Array.from({ length: 5 }, (_, k) =>
                    50 + ring.r * Math.sin(offset + (k / 4) * Math.PI * 2)
                  ),
                }}
                transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
              />
            );
          })
        )}
        {/* Center glow */}
        <circle cx={50} cy={50} r={3} fill="rgba(56, 189, 248, 0.06)" />
        <motion.circle
          cx={50} cy={50} r={2}
          fill="rgba(56, 189, 248, 0.15)"
          animate={{ r: [1.5, 2.5, 1.5], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

// ═══ PULSE GRID (for Metrics section) ═══
// Animated grid with pulsing intersection dots
export function PulseGridBg() {
  const gridSize = 8;
  const intersections = useMemo(() => {
    const pts: { x: number; y: number; delay: number }[] = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        pts.push({
          x: 8 + c * 12,
          y: 8 + r * 12,
          delay: (r + c) * 0.2,
        });
      }
    }
    return pts;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Horizontal lines */}
        {Array.from({ length: gridSize }, (_, i) => (
          <motion.line
            key={`h-${i}`}
            x1={5} y1={8 + i * 12} x2={95} y2={8 + i * 12}
            stroke="rgba(56, 189, 248, 0.06)"
            strokeWidth={0.1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: gridSize }, (_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={8 + i * 12} y1={5} x2={8 + i * 12} y2={95}
            stroke="rgba(56, 189, 248, 0.06)"
            strokeWidth={0.1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
        {/* Pulsing dots at intersections */}
        {intersections.map((p, i) => (
          <motion.circle
            key={`p-${i}`}
            cx={p.x} cy={p.y} r={0.3}
            fill="rgba(56, 189, 248, 0.4)"
            animate={{ opacity: [0.1, 0.6, 0.1], r: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, delay: p.delay, repeat: Infinity }}
          />
        ))}
        {/* Traveling pulse along a path */}
        <motion.circle
          r={0.8}
          fill="rgba(56, 189, 248, 0.5)"
          animate={{
            cx: [8, 92, 92, 8, 8],
            cy: [8, 8, 92, 92, 8],
            opacity: [0.3, 0.7, 0.3, 0.7, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

// ═══ COMMUNICATION NETWORK (for Contact section) ═══
// Nodes connected by message stream lines
export function CommNetworkBg() {
  const nodes = useMemo(() => [
    { x: 20, y: 30, main: true }, { x: 50, y: 50, main: true },
    { x: 80, y: 35, main: true }, { x: 35, y: 75, main: false },
    { x: 65, y: 70, main: false }, { x: 15, y: 55, main: false },
    { x: 85, y: 60, main: false }, { x: 50, y: 15, main: false },
    { x: 30, y: 50, main: false }, { x: 70, y: 50, main: false },
  ], []);

  const links = useMemo(() => {
    const l: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 35) {
          l.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, delay: l.length * 0.3 });
        }
      }
    }
    return l;
  }, [nodes]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map((l, i) => (
          <g key={`cl-${i}`}>
            <line
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="rgba(56, 189, 248, 0.07)"
              strokeWidth={0.15}
            />
            {/* Traveling message dot */}
            <motion.circle
              r={0.4}
              fill="rgba(56, 189, 248, 0.6)"
              animate={{
                cx: [l.x1, l.x2, l.x1],
                cy: [l.y1, l.y2, l.y1],
              }}
              transition={{ duration: 4 + i * 0.5, delay: l.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        ))}
        {nodes.map((n, i) => (
          <g key={`cn-${i}`}>
            <motion.circle
              cx={n.x} cy={n.y}
              r={n.main ? 1.8 : 0.8}
              fill={n.main ? "rgba(56, 189, 248, 0.1)" : "rgba(56, 189, 248, 0.15)"}
              stroke={n.main ? "rgba(56, 189, 248, 0.2)" : "none"}
              strokeWidth={0.2}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
            />
            {n.main && (
              <motion.circle
                cx={n.x} cy={n.y} r={3}
                fill="none"
                stroke="rgba(56, 189, 248, 0.06)"
                strokeWidth={0.1}
                animate={{ r: [2, 4, 2], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ═══ INNOVATION LAB (for WhatImBuilding section) ═══
// Scattered experiment nodes with activity pulses
export function InnovationLabBg() {
  const nodes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: 10 + ((i * 2741 + 17) % 80),
      y: 10 + ((i * 7919 + 104729) % 80),
      size: 0.5 + (i % 3) * 0.3,
      speed: 3 + (i % 4),
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Activity streams */}
        {nodes.slice(0, 6).map((n, i) => (
          <motion.line
            key={`stream-${i}`}
            x1={n.x} y1={0} x2={n.x} y2={100}
            stroke="rgba(56, 189, 248, 0.03)"
            strokeWidth={0.3}
            strokeDasharray="0.5 3"
            animate={{ strokeDashoffset: [0, -10] }}
            transition={{ duration: n.speed, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {/* Experiment nodes */}
        {nodes.map((n, i) => (
          <g key={`exp-${i}`}>
            <motion.circle
              cx={n.x} cy={n.y} r={n.size}
              fill="rgba(56, 189, 248, 0.25)"
              animate={{ opacity: [0.15, 0.6, 0.15], r: [n.size, n.size + 0.3, n.size] }}
              transition={{ duration: n.speed, delay: i * 0.3, repeat: Infinity }}
            />
            {/* Pulse ring */}
            <motion.circle
              cx={n.x} cy={n.y} r={n.size}
              fill="none"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth={0.1}
              animate={{ r: [n.size, n.size + 3, n.size + 3], opacity: [0.4, 0, 0] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            />
          </g>
        ))}
        {/* Connection web */}
        {nodes.slice(0, 8).map((n, i) => {
          const next = nodes[(i + 1) % 8];
          return (
            <motion.line
              key={`web-${i}`}
              x1={n.x} y1={n.y} x2={next.x} y2={next.y}
              stroke="rgba(56, 189, 248, 0.05)"
              strokeWidth={0.12}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 5, delay: i * 0.4, repeat: Infinity }}
            />
          );
        })}
      </svg>
    </div>
  );
}
