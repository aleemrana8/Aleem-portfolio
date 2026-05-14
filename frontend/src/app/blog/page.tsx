import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { blogPostsData } from "@/lib/data";

async function getBlogPosts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || apiUrl.includes("localhost")) {
      return blogPostsData.map((p) => ({ ...p, published: true, createdAt: p.publishedAt }));
    }
    const res = await fetch(`${apiUrl}/blog`, { next: { revalidate: 60 } });
    if (!res.ok) return blogPostsData.map((p) => ({ ...p, published: true, createdAt: p.publishedAt }));
    const data = await res.json();
    return Array.isArray(data) && data.length > 0
      ? data
      : blogPostsData.map((p) => ({ ...p, published: true, createdAt: p.publishedAt }));
  } catch {
    return blogPostsData.map((p) => ({ ...p, published: true, createdAt: p.publishedAt }));
  }
}

export const metadata = { title: "Blog â€” Aleem Akhtar" };

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[#38bdf8] font-mono text-sm mb-2 tracking-wider">Insights & Articles</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#ccd6f6] mb-4">Blog</h1>
          <p className="text-[#8892b0] max-w-2xl mb-14">
            Thoughts on AI, product management, software architecture, and building at scale.
          </p>
          <BlogGrid posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
