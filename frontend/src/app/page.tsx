import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { MetricsDashboard } from "@/components/sections/MetricsDashboard";
import { Testimonials } from "@/components/sections/Testimonials";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/ai/AIChatWidget";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <FeaturedProjects />
      <Skills />
      <Services />
      <ArchitectureDiagram />
      <MetricsDashboard />
      <Testimonials />
      <Writing />
      <Contact />
      <Footer />
      <AIChatWidget />
    </>
  );
}
