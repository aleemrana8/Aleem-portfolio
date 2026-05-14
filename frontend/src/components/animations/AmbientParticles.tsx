"use client";

import { memo, useMemo, useRef, useEffect, useCallback, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   AMBIENT PARTICLE CANVAS
   High-performance canvas-based particle system with
   neural connections, mouse reactivity, and depth layers.
   ═══════════════════════════════════════════════════════════ */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: number; // 0 = far, 1 = mid, 2 = near
  pulseOffset: number;
}

export const AmbientParticleCanvas = memo(function AmbientParticleCanvas({
  particleCount = 80,
  connectionDistance = 120,
  mouseInfluence = 0.02,
}: {
  particleCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  // Initialize particles
  const initParticles = useCallback(
    (w: number, h: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const layer = Math.floor(Math.random() * 3);
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (0.15 + layer * 0.1),
          vy: (Math.random() - 0.5) * (0.15 + layer * 0.1),
          size: 0.5 + layer * 0.5 + Math.random() * 0.5,
          opacity: 0.1 + layer * 0.15 + Math.random() * 0.1,
          layer,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    },
    [particleCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion preference
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    if (mql.matches) return;

    // Use fewer particles on mobile
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.floor(particleCount * 0.4) : particleCount;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      setDimensions({ w, h });
      initParticles(w, h);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.w === 0 || reducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = dimensions.w;
    const h = dimensions.h;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w * dpr, h * dpr);
      ctx.save();
      ctx.scale(dpr, dpr);
      time += 0.01;

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse influence
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = ((200 - dist) / 200) * mouseInfluence;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pulsing opacity
        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.fill();

        // Glow halo for larger particles
        if (p.layer >= 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          // Only connect same or adjacent layers
          if (Math.abs(a.layer - b.layer) > 1) continue;

          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < connectionDistance) {
            const lineAlpha = (1 - d / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [dimensions, connectionDistance, mouseInfluence, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[0] pointer-events-none"
      aria-hidden="true"
    />
  );
});

/* ═══════════════════════════════════════════════════════════
   SECTION GLOW SEPARATOR
   Cinematic glowing line between sections
   ═══════════════════════════════════════════════════════════ */

export function SectionGlowSeparator({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full py-6 ${className}`} aria-hidden="true">
      {/* Center line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[600px] h-[1px]">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent/40" />
      {/* Center glow bloom */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-6 bg-accent/[0.04] blur-2xl rounded-full" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL WRAPPER
   Cinematic reveal animation as sections enter viewport
   ═══════════════════════════════════════════════════════════ */

export { AmbientParticleCanvas as default };
