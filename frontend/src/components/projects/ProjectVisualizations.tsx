"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   1  FRONT DESK AI AGENT â€” Audio waveform (voice calls)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function FrontDeskViz() {
  const bars = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => {
        const center = 16;
        const dist = Math.abs(i - center) / center;
        return { maxH: 36 * (1 - dist * 0.55), delay: i * 0.05 };
      }),
    [],
  );

  return (
    <div className="flex items-end justify-center gap-[2px] h-10">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[2.5px] rounded-full bg-gradient-to-t from-accent/40 to-accent/80"
          animate={{ height: [3, bar.maxH, 3] }}
          transition={{
            duration: 1.6,
            delay: bar.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   2  ALEEM VOICE AGENT â€” Voice wave pattern (24-state FSM)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function VoiceAgentViz() {
  return (
    <svg viewBox="0 0 160 44" className="w-full h-10" fill="none">
      {/* Sine wave */}
      <motion.path
        d="M 0 22 Q 20 2, 40 22 T 80 22 T 120 22 T 160 22"
        stroke="rgba(56, 189, 248,0.6)"
        strokeWidth={1.5}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      />
      <motion.path
        d="M 0 22 Q 20 38, 40 22 T 80 22 T 120 22 T 160 22"
        stroke="rgba(56, 189, 248,0.3)"
        strokeWidth={1}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 2.5, delay: 0.3, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      />
      {/* Pulsing center dot = microphone */}
      <motion.circle
        cx={80} cy={22} r={3}
        fill="rgba(56, 189, 248,0.8)"
        animate={{ r: [2.5, 4, 2.5], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* State indicator dots */}
      {[20, 50, 110, 140].map((x, i) => (
        <motion.circle
          key={i}
          cx={x} cy={22} r={1.5}
          fill="rgba(56, 189, 248,0.5)"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   3  RCM AUTOMATION â€” Pipeline flow (data processing)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function RCMViz() {
  const steps = ["Claim", "Code", "Verify", "Bill", "Pay"];
  return (
    <div className="flex items-center justify-center gap-0.5 h-10">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-0.5">
          <motion.div
            className="px-2 py-1 rounded-md border border-accent/20 bg-accent/[0.06] text-[8px] font-mono text-accent/70 whitespace-nowrap"
            animate={{
              borderColor: ["rgba(56, 189, 248,0.15)", "rgba(56, 189, 248,0.5)", "rgba(56, 189, 248,0.15)"],
              backgroundColor: ["rgba(56, 189, 248,0.03)", "rgba(56, 189, 248,0.1)", "rgba(56, 189, 248,0.03)"],
            }}
            transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
          >
            {label}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div className="flex items-center gap-[1px]">
              {[0, 1, 2].map((d) => (
                <motion.div
                  key={d}
                  className="w-1 h-1 rounded-full bg-accent/50"
                  animate={{ opacity: [0.1, 0.9, 0.1] }}
                  transition={{ duration: 1, delay: i * 0.4 + d * 0.15, repeat: Infinity }}
                />
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   4  TECHLUTION AI â€” Neural network (AI SaaS platform)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function TechlutionViz() {
  // 3 layer neural net
  const layers = [
    [{ x: 10, y: 8 }, { x: 10, y: 22 }, { x: 10, y: 36 }],
    [{ x: 40, y: 5 }, { x: 40, y: 15 }, { x: 40, y: 25 }, { x: 40, y: 35 }],
    [{ x: 70, y: 10 }, { x: 70, y: 22 }, { x: 70, y: 34 }],
    [{ x: 100, y: 15 }, { x: 100, y: 28 }],
  ];
  const conns: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const a of layers[l]) {
      for (const b of layers[l + 1]) {
        conns.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
      }
    }
  }

  return (
    <svg viewBox="0 0 110 44" className="w-full h-10" fill="none">
      {conns.map((c, i) => (
        <motion.line
          key={i}
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="rgba(56, 189, 248,0.12)"
          strokeWidth={0.5}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 2, delay: (i % 6) * 0.2, repeat: Infinity }}
        />
      ))}
      {layers.flat().map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={2.2}
          fill="rgba(56, 189, 248,0.6)"
          animate={{ r: [1.8, 2.8, 1.8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
      {/* Pulse traveling through the net */}
      <motion.circle
        r={1.5}
        fill="rgba(56, 189, 248,0.9)"
        animate={{ cx: [10, 40, 70, 100], cy: [22, 15, 22, 15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   5  AI JOB ASSISTANT â€” Radar/scanner (job searching)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function JobAssistantViz() {
  return (
    <svg viewBox="0 0 80 44" className="w-full h-10" fill="none">
      {/* Radar rings */}
      {[16, 11, 6].map((r, i) => (
        <circle
          key={i} cx={40} cy={22} r={r}
          stroke="rgba(56, 189, 248,0.08)" strokeWidth={0.5} fill="none"
        />
      ))}
      {/* Sweeping radar line */}
      <motion.line
        x1={40} y1={22} x2={56} y2={22}
        stroke="rgba(56, 189, 248,0.6)"
        strokeWidth={1}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "40px 22px" }}
      />
      {/* Radar sweep trail */}
      <motion.path
        d="M 40 22 L 56 22 A 16 16 0 0 0 52 10 Z"
        fill="rgba(56, 189, 248,0.06)"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "40px 22px" }}
      />
      {/* Detected job dots */}
      {[
        { x: 48, y: 16, d: 0.5 },
        { x: 33, y: 28, d: 1.2 },
        { x: 50, y: 26, d: 2.0 },
        { x: 35, y: 14, d: 0.8 },
        { x: 44, y: 30, d: 1.6 },
      ].map((dot, i) => (
        <motion.circle
          key={i} cx={dot.x} cy={dot.y} r={1.5}
          fill="rgba(56, 189, 248,0.7)"
          animate={{ opacity: [0, 1, 0.8, 0], scale: [0, 1.2, 1, 0] }}
          transition={{ duration: 3, delay: dot.d, repeat: Infinity }}
        />
      ))}
      {/* Center dot */}
      <circle cx={40} cy={22} r={2} fill="rgba(56, 189, 248,0.8)" />
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   6  TECHSPACE â€” Social network graph (community)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function TechSpaceViz() {
  const people = [
    { x: 55, y: 22, r: 3.5 }, // center
    { x: 25, y: 12, r: 2.5 }, { x: 85, y: 12, r: 2.5 },
    { x: 20, y: 32, r: 2.5 }, { x: 90, y: 32, r: 2.5 },
    { x: 40, y: 6, r: 2 }, { x: 70, y: 6, r: 2 },
    { x: 40, y: 38, r: 2 }, { x: 70, y: 38, r: 2 },
  ];
  const links = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
    [1, 5], [2, 6], [3, 7], [4, 8], [1, 3], [2, 4],
  ];

  return (
    <svg viewBox="0 0 110 44" className="w-full h-10" fill="none">
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={people[a].x} y1={people[a].y}
          x2={people[b].x} y2={people[b].y}
          stroke="rgba(56, 189, 248,0.15)"
          strokeWidth={0.5}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
      {people.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r={p.r}
          fill={i === 0 ? "rgba(56, 189, 248,0.7)" : "rgba(56, 189, 248,0.4)"}
          stroke="rgba(56, 189, 248,0.2)"
          strokeWidth={0.5}
          animate={{ r: [p.r * 0.85, p.r * 1.15, p.r * 0.85] }}
          transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
      {/* Pulse ring from center */}
      <motion.circle
        cx={55} cy={22} r={3}
        fill="none"
        stroke="rgba(56, 189, 248,0.3)"
        strokeWidth={0.5}
        animate={{ r: [4, 20], opacity: [0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   7  FAMILY GOLF â€” Booking calendar grid
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function FamilyGolfViz() {
  const slots = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => ({
        col: i % 7,
        row: Math.floor(i / 7),
        booked: [2, 5, 8, 10, 13, 17, 19].includes(i),
        delay: i * 0.06,
      })),
    [],
  );

  return (
    <div className="flex flex-col items-center gap-[3px] h-10 justify-center">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex gap-[3px]">
          {slots
            .filter((s) => s.row === row)
            .map((s, i) => (
              <motion.div
                key={i}
                className={`w-3.5 h-2.5 rounded-[2px] ${
                  s.booked
                    ? "bg-accent/50 border border-accent/30"
                    : "bg-white/[0.04] border border-white/[0.06]"
                }`}
                animate={
                  s.booked
                    ? { backgroundColor: ["rgba(56, 189, 248,0.3)", "rgba(56, 189, 248,0.6)", "rgba(56, 189, 248,0.3)"] }
                    : {}
                }
                transition={{ duration: 2, delay: s.delay, repeat: Infinity }}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DEFAULT â€” Tree search visualization (RAG / code / other)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function TreeSearchViz() {
  return (
    <svg viewBox="0 0 120 44" className="w-full h-10" fill="none">
      {/* Tree branches */}
      <line x1={60} y1={6} x2={30} y2={20} stroke="rgba(56, 189, 248,0.15)" strokeWidth={0.6} />
      <line x1={60} y1={6} x2={90} y2={20} stroke="rgba(56, 189, 248,0.15)" strokeWidth={0.6} />
      <line x1={30} y1={20} x2={15} y2={34} stroke="rgba(56, 189, 248,0.12)" strokeWidth={0.5} />
      <line x1={30} y1={20} x2={45} y2={34} stroke="rgba(56, 189, 248,0.12)" strokeWidth={0.5} />
      <line x1={90} y1={20} x2={75} y2={34} stroke="rgba(56, 189, 248,0.12)" strokeWidth={0.5} />
      <line x1={90} y1={20} x2={105} y2={34} stroke="rgba(56, 189, 248,0.12)" strokeWidth={0.5} />
      {/* Nodes */}
      {[
        { x: 60, y: 6, r: 3 },
        { x: 30, y: 20, r: 2.5 }, { x: 90, y: 20, r: 2.5 },
        { x: 15, y: 34, r: 2 }, { x: 45, y: 34, r: 2 }, { x: 75, y: 34, r: 2 }, { x: 105, y: 34, r: 2 },
      ].map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={n.r}
          fill="rgba(56, 189, 248,0.5)"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
        />
      ))}
      {/* Traveling search pulse */}
      <motion.circle
        r={2}
        fill="rgba(56, 189, 248,0.9)"
        animate={{
          cx: [60, 30, 45, 30, 60, 90, 75],
          cy: [6, 20, 34, 20, 6, 20, 34],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SLUG â†’ VISUALIZATION MAP
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const VIZ_MAP: Record<string, () => JSX.Element> = {
  "front-desk-agent": FrontDeskViz,
  "aleem-voice-agent": VoiceAgentViz,
  "rcm-automation": RCMViz,
  "techlution-ai": TechlutionViz,
  "ai-job-assistant": JobAssistantViz,
  "techspace": TechSpaceViz,
  "family-golf": FamilyGolfViz,
};

/* Smart fallback: pick viz by keywords in slug */
function pickVizBySlug(slug: string): () => JSX.Element {
  const s = slug.toLowerCase();
  if (s.includes("voice") || s.includes("agent") || s.includes("desk")) return FrontDeskViz;
  if (s.includes("rag") || s.includes("search") || s.includes("vector")) return TreeSearchViz;
  if (s.includes("automat") || s.includes("rcm") || s.includes("pipeline")) return RCMViz;
  if (s.includes("ai") || s.includes("neural") || s.includes("llm") || s.includes("gpt")) return TechlutionViz;
  if (s.includes("job") || s.includes("recruit") || s.includes("hire")) return JobAssistantViz;
  if (s.includes("community") || s.includes("social") || s.includes("platform")) return TechSpaceViz;
  if (s.includes("golf") || s.includes("book") || s.includes("schedule")) return FamilyGolfViz;
  return TreeSearchViz;
}

export function ProjectMiniViz({ slug }: { slug: string }) {
  const Viz = VIZ_MAP[slug] || pickVizBySlug(slug);
  return (
    <div className="w-full py-3 px-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
      <Viz />
    </div>
  );
}

// â”€â”€â”€ Network constellation background for Projects section â”€â”€â”€
export function ProjectsNetworkBg() {
  const nodes = useMemo(() => {
    const pts: { x: number; y: number; size: number; delay: number }[] = [];
    // Deterministic pseudo-random using simple hash
    for (let i = 0; i < 40; i++) {
      const seed = (i * 7919 + 104729) % 100;
      pts.push({
        x: ((i * 2741 + 17) % 100),
        y: ((seed * 31 + i * 13) % 100),
        size: 1 + (seed % 3),
        delay: (i % 8) * 0.5,
      });
    }
    return pts;
  }, []);

  const connections = useMemo(() => {
    const conns: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 20) {
          conns.push({
            x1: nodes[i].x, y1: nodes[i].y,
            x2: nodes[j].x, y2: nodes[j].y,
            delay: (i + j) % 5 * 0.4,
          });
        }
      }
    }
    return conns;
  }, [nodes]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map((c, i) => (
          <motion.line
            key={i}
            x1={`${c.x1}%`} y1={`${c.y1}%`}
            x2={`${c.x2}%`} y2={`${c.y2}%`}
            stroke="rgba(56, 189, 248,0.06)"
            strokeWidth={0.15}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={`${n.x}%`} cy={`${n.y}%`}
            r={n.size * 0.15}
            fill="rgba(56, 189, 248,0.25)"
            animate={{ opacity: [0.15, 0.6, 0.15], r: [n.size * 0.1, n.size * 0.2, n.size * 0.1] }}
            transition={{ duration: 3 + (i % 3), delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
