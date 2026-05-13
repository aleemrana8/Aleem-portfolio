"use client";

import { Github, Linkedin, Mail, Heart, Instagram } from "lucide-react";
import { profileData } from "@/lib/data";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative py-14 border-t border-white/[0.04]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Aleem Portfolio"
                width={100}
                height={28}
                className="h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-xs font-semibold text-slate-lightest/60 hover:text-accent/80 transition-colors duration-300">
                Aleem <span className="text-accent/60">Portfolio</span>
              </span>
            </div>
            <p className="text-[11px] text-slate/30 font-mono">
              Designed & Built by{" "}
              <span className="text-accent/60">{profileData.name}</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
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
                className="text-slate/40 hover:text-accent hover:-translate-y-1 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-slate/25 flex items-center gap-1.5 font-mono">
            © {new Date().getFullYear()} — Made with
            <Heart size={10} className="text-accent/50 fill-accent/50" />
          </p>
        </div>
      </div>
    </footer>
  );
}
