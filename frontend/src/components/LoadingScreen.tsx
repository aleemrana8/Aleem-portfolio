"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const BOOT_LINES = [
  "Initializing AI systems...",
  "Loading portfolio data...",
  "Establishing neural links...",
  "Systems online.",
];

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 40);
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black, transparent)",
            }}
          />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-glow/[0.03] blur-[80px]" />
          </div>

          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: "blur(12px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            {/* Outer orbital ring */}
            <motion.div
              className="absolute -inset-10 rounded-full border border-accent/[0.06]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner glow ring */}
            <motion.div
              className="absolute -inset-6 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12), transparent 70%)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Second ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-accent/[0.1]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/images/logo.png"
              alt="Loading"
              width={100}
              height={100}
              className="relative z-10 rounded-2xl brightness-110 drop-shadow-[0_0_40px_rgba(56,189,248,0.45)]"
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 w-48 h-[2px] bg-white/[0.04] rounded-full overflow-hidden relative"
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #38bdf8, #22d3ee, #38bdf8)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Glow at progress tip */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-accent/30 blur-md rounded-full"
              style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
            />
          </motion.div>

          {/* Boot sequence text */}
          <div className="mt-6 h-6 flex items-center">
            {BOOT_LINES.map((line, i) => {
              const showAt = (i / BOOT_LINES.length) * 100;
              return progress >= showAt ? (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0.5 }}
                  className="text-[10px] font-mono text-accent/50 tracking-[0.2em] uppercase absolute"
                >
                  {line}
                </motion.p>
              ) : null;
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
