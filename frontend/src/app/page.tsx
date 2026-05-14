import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const TechnicalLeadership = dynamic(() => import("@/components/sections/TechnicalLeadership").then(m => ({ default: m.TechnicalLeadership })));
const Experience = dynamic(() => import("@/components/sections/Experience").then(m => ({ default: m.Experience })));
const FeaturedProjects = dynamic(() => import("@/components/projects/FeaturedProjects").then(m => ({ default: m.FeaturedProjects })));
const TechWall = dynamic(() => import("@/components/sections/TechWall").then(m => ({ default: m.TechWall })));
const MetricsDashboard = dynamic(() => import("@/components/sections/MetricsDashboard").then(m => ({ default: m.MetricsDashboard })));
const Skills = dynamic(() => import("@/components/sections/Skills").then(m => ({ default: m.Skills })));
const WhyHireMe = dynamic(() => import("@/components/sections/WhyHireMe").then(m => ({ default: m.WhyHireMe })));
const Services = dynamic(() => import("@/components/sections/Services").then(m => ({ default: m.Services })));
const Writing = dynamic(() => import("@/components/sections/Writing").then(m => ({ default: m.Writing })));
const Contact = dynamic(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));
const AIChatWidget = dynamic(() => import("@/components/ai/AIChatWidget").then(m => ({ default: m.AIChatWidget })), { ssr: false });
const SectionGlowSeparator = dynamic(() => import("@/components/animations/AmbientParticles").then(m => ({ default: m.SectionGlowSeparator })), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionGlowSeparator />
      <About />
      <SectionGlowSeparator />
      <TechnicalLeadership />
      <SectionGlowSeparator />
      <Experience />
      <SectionGlowSeparator />
      <FeaturedProjects />
      <SectionGlowSeparator />
      <TechWall />
      <SectionGlowSeparator />
      <MetricsDashboard />
      <SectionGlowSeparator />
      <Skills />
      <SectionGlowSeparator />
      <WhyHireMe />
      <SectionGlowSeparator />
      <Services />
      <SectionGlowSeparator />
      <Writing />
      <SectionGlowSeparator />
      <Contact />
      <Footer />
      <AIChatWidget />
    </>
  );
}
