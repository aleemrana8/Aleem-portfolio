import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseStudyContent } from "@/components/case-studies/CaseStudyContent";
import { notFound } from "next/navigation";

async function getCaseStudy(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/case-studies/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const study = await getCaseStudy(params.slug);
  return { title: study ? `${study.title} — Aleem Akhtar` : "Case Study" };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = await getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <CaseStudyContent study={study} />
      </main>
      <Footer />
    </>
  );
}
