"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Briefcase,
  Brain,
  Network,
  PackageOpen,
  Download,
  Loader2,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const roles = [
  {
    id: "technical-pm",
    title: "Technical PM",
    description: "Project management with deep technical understanding",
    icon: Briefcase,
    color: "#64ffda",
  },
  {
    id: "ai-lead",
    title: "AI Lead",
    description: "Leading AI/ML initiatives and team coordination",
    icon: Brain,
    color: "#7c3aed",
  },
  {
    id: "solution-architect",
    title: "Solution Architect",
    description: "System design, cloud architecture, and scalability",
    icon: Network,
    color: "#f59e0b",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Product strategy, roadmaps, and stakeholder alignment",
    icon: PackageOpen,
    color: "#ec4899",
  },
];

export default function ResumePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRole = async (roleId: string) => {
    setSelectedRole(roleId);
    setLoading(true);
    setError(null);
    setResumeContent(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/resume/generate?role=${roleId}`
      );
      if (!res.ok) throw new Error("Failed to generate resume");
      const data = await res.json();
      setResumeContent(data.content || data.markdown || JSON.stringify(data, null, 2));
    } catch {
      setError("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resumeContent) return;
    const blob = new Blob([resumeContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Aleem_Akhtar_Resume_${selectedRole}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setResumeContent(null);
    setError(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#64ffda] font-mono text-sm mb-2 tracking-wider">
              AI-Powered
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#ccd6f6] mb-4">
              Resume Generator
            </h1>
            <p className="text-[#8892b0] max-w-2xl mb-14">
              Select a target role to generate a tailored resume highlighting relevant experience and skills.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="roles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {roles.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectRole(role.id)}
                      className="p-6 rounded-xl border border-[#1d3a5c] bg-[#112240]/60 backdrop-blur-sm text-left group hover:border-[#64ffda]/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="p-3 rounded-lg"
                          style={{ backgroundColor: `${role.color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: role.color }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                            {role.title}
                          </h3>
                          <p className="text-sm text-[#8892b0] mt-1">{role.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-[#64ffda] font-mono text-sm mb-8 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" /> Select Different Role
                </button>

                {loading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-10 h-10 text-[#64ffda]" />
                    </motion.div>
                    <p className="text-[#8892b0] mt-4">Generating your tailored resume...</p>
                    <div className="mt-6 flex gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#64ffda]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5 text-center">
                    <p className="text-red-400">{error}</p>
                    <button
                      onClick={() => handleSelectRole(selectedRole)}
                      className="mt-4 px-4 py-2 text-sm font-mono text-[#64ffda] border border-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {resumeContent && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-[#64ffda]">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-mono text-sm">Resume Generated</span>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] font-semibold rounded-lg hover:bg-[#64ffda]/90 transition-colors"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                    <div className="p-8 rounded-xl border border-[#1d3a5c] bg-[#112240]/60 backdrop-blur-sm overflow-auto max-h-[70vh]">
                      <pre className="text-sm text-[#ccd6f6] whitespace-pre-wrap font-mono leading-relaxed">
                        {resumeContent}
                      </pre>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
