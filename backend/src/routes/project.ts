import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

export const projectRouter = Router();

// Public: Get all published projects
projectRouter.get("/", async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true, archived: false },
      orderBy: { order: "asc" },
    });
    res.json(projects);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Public: Get featured projects
projectRouter.get("/featured", async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true, featured: true, archived: false },
      orderBy: { order: "asc" },
    });
    res.json(projects);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Public: Get project by slug
projectRouter.get("/:slug", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
    if (!project) { res.status(404).json({ error: "Not found" }); return; }
    res.json(project);
  } catch { res.status(500).json({ error: "Server error" }); }
});

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  role: z.string().optional(),
  outcome: z.string().optional(),
  stack: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  archived: z.boolean().optional(),
  order: z.number().optional(),
});

projectRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const data = projectSchema.parse(req.body);
    const project = await prisma.project.create({ data: data as any });
    res.status(201).json(project);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

projectRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const data = projectSchema.partial().parse(req.body);
    const project = await prisma.project.update({ where: { id: req.params.id }, data: data as any });
    res.json(project);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

projectRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});
