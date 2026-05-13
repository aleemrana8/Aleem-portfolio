import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

export const experienceRouter = Router();

// Public: Get all experiences
experienceRouter.get("/", async (_req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    res.json(experiences);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Admin: Create
const expSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string(),
  bullets: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

experienceRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const data = expSchema.parse(req.body);
    const experience = await prisma.experience.create({ data });
    res.status(201).json(experience);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

experienceRouter.put("/:id", authMiddleware, async (req, res) => {
  try {
    const data = expSchema.partial().parse(req.body);
    const experience = await prisma.experience.update({ where: { id: req.params.id }, data: data as any });
    res.json(experience);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

experienceRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.experience.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});
