import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

export const blogRouter = Router();

// Public: Get published posts
blogRouter.get("/", async (_req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, tags: true, publishedAt: true },
    });
    res.json(posts);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Public: Get by slug
blogRouter.get("/:slug", async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
    if (!post || !post.published) { res.status(404).json({ error: "Not found" }); return; }
    res.json(post);
  } catch { res.status(500).json({ error: "Server error" }); }
});

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

// Admin: Get all (including drafts)
blogRouter.get("/admin/all", authMiddleware, async (_req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    res.json(posts);
  } catch { res.status(500).json({ error: "Server error" }); }
});

blogRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const data = postSchema.parse(req.body);
    const post = await prisma.blogPost.create({
      data: { ...data, publishedAt: data.published ? new Date() : null },
    });
    res.status(201).json(post);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

blogRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const data = postSchema.partial().parse(req.body);
    const post = await prisma.blogPost.update({ where: { id: req.params.id }, data });
    res.json(post);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

blogRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});
