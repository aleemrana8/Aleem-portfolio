import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechnicalLeadership } from "@/components/sections/TechnicalLeadership";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { TechWall } from "@/components/sections/TechWall";
import { MetricsDashboard } from "@/components/sections/MetricsDashboard";
import { Skills } from "@/components/sections/Skills";
import { WhyHireMe } from "@/components/sections/WhyHireMe";
import { Services } from "@/components/sections/Services";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/ai/AIChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <TechnicalLeadership />
      <Experience />
      <FeaturedProjects />
      <TechWall />
      <MetricsDashboard />
      <Skills />
      <WhyHireMe />
      <Services />
      <Writing />
      <Contact />
      <Footer />
      <AIChatWidget />
    </>
  );
}
