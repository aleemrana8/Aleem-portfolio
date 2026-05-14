import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { notFound } from "next/navigation";
import { blogPostsData } from "@/lib/data";

function getStaticPost(slug: string) {
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, published: true, createdAt: post.publishedAt };
}

async function getBlogPost(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || apiUrl.includes("localhost")) {
      return getStaticPost(slug);
    }
    const res = await fetch(`${apiUrl}/blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return getStaticPost(slug);
    const data = await res.json();
    return data || getStaticPost(slug);
  } catch {
    return getStaticPost(slug);
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
