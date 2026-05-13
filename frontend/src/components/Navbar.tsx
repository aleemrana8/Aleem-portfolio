"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
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
            ? "bg-navy-900/70 backdrop-blur-2xl border-b border-white/[0.04] shadow-xl shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-[4.5rem] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative group" aria-label="Home">
            <Image
              src="/images/logo.png"
              alt="Aleem Portfolio"
              width={140}
              height={40}
              className="h-10 w-auto object-contain group-hover:brightness-125 transition-all duration-500"
              priority
            />
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
                className={`px-4 py-2 text-[13px] font-mono transition-all duration-500 rounded-lg ${
                  activeSection === link.href.replace("#", "")
                    ? "text-accent bg-accent/[0.06]"
                    : "text-slate/80 hover:text-accent hover:bg-white/[0.02]"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="btn-primary ml-5 text-xs py-2 px-4"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Download size={13} />
                Resume
              </span>
            </motion.a>
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
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={16} />
                  Resume
                </span>
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
