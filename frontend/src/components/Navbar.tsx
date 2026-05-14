"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-navy-950/70 backdrop-blur-3xl border-b border-accent/[0.04] shadow-[0_4px_40px_-5px_rgba(0,0,0,0.6),0_0_80px_-20px_rgba(56,189,248,0.03)]"
            : "bg-transparent"
        }`}
      >
        {/* Navbar top glow line when scrolled */}
        {scrolled && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        )}
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-[4.5rem] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative group flex items-center" aria-label="Home">
            <div className="relative">
              {/* Logo glow effect */}
              <div className="absolute -inset-2 rounded-xl bg-accent/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
              <Image
                src="/images/logo-v2.png"
                alt="Aleem Portfolio"
                width={180}
                height={50}
                className="h-12 w-auto object-contain relative z-10 brightness-110 group-hover:brightness-125 group-hover:drop-shadow-[0_0_16px_rgba(56,189,248,0.5)] transition-all duration-500"
                priority
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className={`relative px-4 py-2 text-[13px] font-mono transition-all duration-500 rounded-lg ${
                  activeSection === link.href.replace("#", "")
                    ? "text-accent"
                    : "text-slate/70 hover:text-accent hover:bg-white/[0.02]"
                }`}
              >
                {link.label}
                {/* Active indicator glow */}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-accent/[0.06] border border-accent/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-lightest hover:text-accent transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col items-center justify-center h-full gap-7"
            >
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-mono text-slate-lightest hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
