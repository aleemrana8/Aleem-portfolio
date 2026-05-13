import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

export const adminRouter = Router();

// All admin routes require auth
adminRouter.use(authMiddleware);

// Dashboard stats
adminRouter.get("/stats", async (_req, res) => {
  try {
    const [experiences, projects, messages, posts, unreadMessages] = await Promise.all([
      prisma.experience.count(),
      prisma.project.count(),
      prisma.contactMessage.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);
    res.json({ experiences, projects, messages, posts, unreadMessages });
  } catch { res.status(500).json({ error: "Server error" }); }
});
