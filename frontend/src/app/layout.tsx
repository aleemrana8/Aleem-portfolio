import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aleem Akhtar â€” AI Team Lead & Product Manager",
  description:
    "Portfolio of Rana Muhammad Aleem Akhtar. AI Team Lead and Product Manager specializing in healthcare automation, scalable AI agents, and technical delivery leadership.",
  keywords: [
    "AI Team Lead",
    "Product Manager",
    "Healthcare Automation",
    "AI Agents",
    "Solution Architecture",
    "CareCloud MTBC",
    "Rana Muhammad Aleem Akhtar",
  ],
  authors: [{ name: "Rana Muhammad Aleem Akhtar" }],
  openGraph: {
    title: "Aleem Akhtar â€” AI Team Lead & Product Manager",
    description:
      "Building AI-driven automation, scalable systems, and product experiences that convert complexity into outcomes.",
    type: "website",
    locale: "en_US",
    siteName: "Aleem Akhtar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleem Akhtar â€” AI Team Lead & Product Manager",
    description:
      "Building AI-driven automation, scalable systems, and product experiences that convert complexity into outcomes.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

import { Providers } from "@/providers/query-provider";
import { LoadingScreen } from "@/components/LoadingScreen";
import dynamic from "next/dynamic";

const FloatingTechIcons = dynamic(
  () => import("@/components/animations/FloatingTechIcons"),
  { ssr: false }
);
const AmbientParticleCanvas = dynamic(
  () => import("@/components/animations/AmbientParticles"),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative">
        <Providers>
        <LoadingScreen />
        <div className="noise-overlay" />
        <div className="grid-bg" />
        <MouseSpotlight />
        <AmbientParticleCanvas particleCount={60} connectionDistance={130} />
        <FloatingTechIcons count={25} />

        {/* Ambient gradient blobs */}
        <div
          className="gradient-blob"
          style={{
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, #38bdf8, transparent)",
            top: "0%",
            right: "-20%",
          }}
        />
        <div
          className="gradient-blob"
          style={{
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, #0ea5e9, transparent)",
            top: "35%",
            left: "-15%",
            animationDelay: "-7s",
          }}
        />
        <div
          className="gradient-blob"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #22d3ee, transparent)",
            bottom: "5%",
            left: "25%",
            animationDelay: "-14s",
          }}
        />
        <div
          className="gradient-blob"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, #0284c7, transparent)",
            top: "60%",
            right: "10%",
            animationDelay: "-20s",
            opacity: 0.02,
          }}
        />

        <main className="relative z-10">{children}</main>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function MouseSpotlight() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('mousemove', (e) => {
              document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
              document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
            });
          `,
        }}
      />
      <div className="spotlight" />
      <div className="cursor-glow" />
    </>
  );
}
