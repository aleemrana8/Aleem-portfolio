import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

export const skillRouter = Router();

// Public
skillRouter.get("/", async (_req, res) => {
  try {
    const groups = await prisma.skillGroup.findMany({
      include: { skills: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    res.json(groups);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Admin: Create group
const groupSchema = z.object({ name: z.string().min(1), icon: z.string().optional(), order: z.number().optional() });

skillRouter.post("/groups", authMiddleware, async (req, res) => {
  try {
    const data = groupSchema.parse(req.body);
    const group = await prisma.skillGroup.create({ data: data as any });
    res.status(201).json(group);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: Create skill
const skillSchema = z.object({ name: z.string().min(1), level: z.number().optional(), groupId: z.string(), order: z.number().optional() });

skillRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const data = skillSchema.parse(req.body);
    const skill = await prisma.skill.create({ data: data as any });
    res.status(201).json(skill);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

skillRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

skillRouter.delete("/groups/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.skillGroup.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});
