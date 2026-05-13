"use client";

import { motion } from "framer-motion";
import { Phone, AudioLines, FileText, Brain, CalendarCheck, XCircle, RefreshCw, Server, MessageSquare, Volume2 } from "lucide-react";

const nodes = [
  { id: "call", label: "Incoming Call", icon: Phone, x: 50, y: 50 },
  { id: "voice", label: "Voice Pipeline", icon: AudioLines, x: 220, y: 50 },
  { id: "stt", label: "Speech-to-Text", icon: FileText, x: 390, y: 50 },
  { id: "intent", label: "AI Intent", icon: Brain, x: 560, y: 50 },
  { id: "schedule", label: "Scheduler", icon: CalendarCheck, x: 470, y: 180 },
  { id: "cancel", label: "Cancel", icon: XCircle, x: 560, y: 270 },
  { id: "reschedule", label: "Reschedule", icon: RefreshCw, x: 650, y: 180 },
  { id: "api", label: "Healthcare API", icon: Server, x: 560, y: 370 },
  { id: "response", label: "Response Gen", icon: MessageSquare, x: 390, y: 370 },
  { id: "voiceOut", label: "Voice Response", icon: Volume2, x: 220, y: 370 },
];

const connections = [
  { from: "call", to: "voice" },
  { from: "voice", to: "stt" },
  { from: "stt", to: "intent" },
  { from: "intent", to: "schedule" },
  { from: "intent", to: "cancel" },
  { from: "intent", to: "reschedule" },
  { from: "schedule", to: "api" },
  { from: "cancel", to: "api" },
  { from: "reschedule", to: "api" },
  { from: "api", to: "response" },
  { from: "response", to: "voiceOut" },
];

function getNodeCenter(nodeId: string) {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return { x: 0, y: 0 };
  return { x: node.x + 60, y: node.y + 30 };
}

export function ArchitectureDiagram() {
  return (
    <section className="py-24 px-6" id="architecture">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[#64ffda] font-mono text-sm mb-2 tracking-wider">System Design</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#ccd6f6]">
            Front Desk Agent Architecture
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 rounded-2xl border border-[#1d3a5c] bg-[#112240]/60 backdrop-blur-sm overflow-x-auto"
        >
          <svg
            viewBox="0 0 780 440"
            className="w-full h-auto min-w-[700px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connection lines */}
            {connections.map((conn, i) => {
              const from = getNodeCenter(conn.from);
              const to = getNodeCenter(conn.to);
              return (
                <motion.line
                  key={`${conn.from}-${conn.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#1d3a5c"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              );
            })}

            {/* Animated flowing dots on connections */}
            {connections.map((conn, i) => {
              const from = getNodeCenter(conn.from);
              const to = getNodeCenter(conn.to);
              return (
                <motion.circle
                  key={`dot-${conn.from}-${conn.to}`}
                  r="3"
                  fill="#64ffda"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2 + 1,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <animateMotion
                    dur="2s"
                    begin={`${i * 0.2 + 1}s`}
                    repeatCount="indefinite"
                    path={`M${from.x},${from.y} L${to.x},${to.y}`}
                  />
                </motion.circle>
              );
            })}
          </svg>

          {/* Node overlays (positioned absolutely over the SVG) */}
          <div className="absolute inset-0 p-8 pointer-events-none">
            <div className="relative w-full h-0" style={{ paddingBottom: "56.4%" }}>
              {nodes.map((node, i) => {
                const Icon = node.icon;
                const leftPercent = (node.x / 780) * 100;
                const topPercent = (node.y / 440) * 100;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      width: "120px",
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[#0a192f]/90 border border-[#1d3a5c] hover:border-[#64ffda]/50 transition-colors">
                      <Icon className="w-5 h-5 text-[#64ffda]" />
                      <span className="text-[10px] text-[#ccd6f6] text-center font-medium leading-tight">
                        {node.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
