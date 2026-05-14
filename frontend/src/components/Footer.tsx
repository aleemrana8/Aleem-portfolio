"use client";

import { Github, Linkedin, Mail, Heart, Instagram } from "lucide-react";
import { profileData } from "@/lib/data";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-accent/[0.06] overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-10 bg-accent/[0.04] blur-3xl" />

      {/* Footer ambient grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute -inset-2 rounded-xl bg-accent/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                <Image
                  src="/images/logo.png"
                  alt="Aleem Portfolio"
                  width={140}
                  height={40}
                  className="h-10 w-auto object-contain relative z-10 opacity-70 group-hover:opacity-100 brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all duration-500"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate/30 font-mono">
              Designed & Built by{" "}
              <span className="text-accent/60">{profileData.name}</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { href: profileData.githubUrl, icon: Github, label: "GitHub" },
              { href: profileData.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
              { href: profileData.instagramUrl, icon: Instagram, label: "Instagram" },
              { href: `mailto:${profileData.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-slate/40 hover:text-accent hover:border-accent/20 hover:bg-accent/[0.06] hover:shadow-[0_0_15px_-5px_rgba(56,189,248,0.2)] hover:-translate-y-0.5 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-slate/25 flex items-center gap-1.5 font-mono">
            Â© {new Date().getFullYear()} â€” Made with
            <Heart size={10} className="text-accent/50 fill-accent/50" />
          </p>
        </div>
      </div>
    </footer>
  );
}
