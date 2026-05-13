import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";

export const profileRouter = Router();

// Public: Get profile
profileRouter.get("/", async (_req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.json(profile);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Admin: Update profile
const profileSchema = z.object({
  name: z.string().min(1).optional(),
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  summary: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatarUrl: z.string().optional(),
  resumeUrl: z.string().optional(),
  githubUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  twitterUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  ogImage: z.string().optional(),
  heroCtaLabel1: z.string().optional(),
  heroCtaLabel2: z.string().optional(),
  heroCtaLabel3: z.string().optional(),
  heroCtaLabel4: z.string().optional(),
});

profileRouter.put("/", authMiddleware, async (req, res) => {
  try {
    const data = profileSchema.parse(req.body);
    const existing = await prisma.profile.findFirst();
    let profile;
    if (existing) {
      profile = await prisma.profile.update({ where: { id: existing.id }, data });
    } else {
      profile = await prisma.profile.create({
        data: { name: data.name || "", headline: data.headline || "", subheadline: data.subheadline || "", summary: data.summary || "", email: data.email || "", ...data },
      });
    }
    res.json(profile);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.errors }); return; }
    res.status(500).json({ error: "Server error" });
  }
});
