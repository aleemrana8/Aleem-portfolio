import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aleemai.dev";

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aleem Akhtar — AI Team Lead & Product Manager",
    template: "%s | Aleem Akhtar",
  },
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
  alternates: { canonical: siteUrl },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rana Muhammad Aleem Akhtar",
  jobTitle: "AI Team Lead & Product Manager",
  url: siteUrl,
  sameAs: [
    "https://github.com/aleemrana8",
    "https://linkedin.com/in/aleem-akhtar",
  ],
};

import { Providers } from "@/providers/query-provider";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent focus:text-navy-950 focus:rounded-lg focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        <Providers>
        <div className="noise-overlay" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <MouseSpotlight />
        <AmbientParticleCanvas particleCount={30} connectionDistance={100} />
        <FloatingTechIcons count={12} />

        {/* Ambient gradient blobs */}
        <div
          aria-hidden="true"
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
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #22d3ee, transparent)",
            bottom: "5%",
            left: "25%",
            animationDelay: "-14s",
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
            let ticking = false;
            document.addEventListener('mousemove', (e) => {
              if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                  document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
                  document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
                  ticking = false;
                });
              }
            });
          `,
        }}
      />
      <div className="spotlight" />
      <div className="cursor-glow" />
    </>
  );
}
