import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { notFound } from "next/navigation";

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/blog/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  return { title: post ? `${post.title} — Aleem Akhtar` : "Blog Post" };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
