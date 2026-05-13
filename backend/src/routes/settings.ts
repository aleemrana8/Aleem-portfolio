import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

export const settingsRouter = Router();

// Public: Get settings
settingsRouter.get("/", async (_req, res) => {
  try {
    const settings = await prisma.siteSettings.findFirst();
    res.json(settings);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Admin: Update settings
const settingsSchema = z.object({
  siteName: z.string().optional(),
  themeMode: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontFamily: z.string().optional(),
  enableBlog: z.boolean().optional(),
  enableContact: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
});

settingsRouter.put("/", authMiddleware, async (req, res) => {
  try {
    const data = settingsSchema.parse(req.body);
    const existing = await prisma.siteSettings.findFirst();
    let settings;
    if (existing) {
      settings = await prisma.siteSettings.update({ where: { id: existing.id }, data });
    } else {
      settings = await prisma.siteSettings.create({ data: { ...data } });
    }
    res.json(settings);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});
