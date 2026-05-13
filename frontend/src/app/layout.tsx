import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aleem Akhtar — AI Team Lead & Product Manager",
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
    title: "Aleem Akhtar — AI Team Lead & Product Manager",
    description:
      "Building AI-driven automation, scalable systems, and product experiences that convert complexity into outcomes.",
    type: "website",
    locale: "en_US",
    siteName: "Aleem Akhtar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleem Akhtar — AI Team Lead & Product Manager",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative">
        <Providers>
        <div className="noise-overlay" />
        <MouseSpotlight />

        {/* Ambient gradient blobs for depth */}
        <div
          className="gradient-blob"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #64ffda, transparent)",
            top: "10%",
            right: "-10%",
          }}
        />
        <div
          className="gradient-blob"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, #112240, transparent)",
            top: "40%",
            left: "-10%",
            animationDelay: "-7s",
          }}
        />
        <div
          className="gradient-blob"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, #64ffda, transparent)",
            bottom: "10%",
            left: "30%",
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
            document.addEventListener('mousemove', (e) => {
              document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
              document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
            });
          `,
        }}
      />
      <div className="spotlight" />
    </>
  );
}
