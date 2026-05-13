import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { z } from "zod";
import { sendMail, buildOwnerEmail, buildSenderEmail } from "../lib/mailer";

export const contactRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

// Public: Submit contact form
contactRouter.post("/", async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    const msg = await prisma.contactMessage.create({ data });

    // Send emails in background — don't block response
    Promise.all([
      sendMail(buildOwnerEmail(data)),
      sendMail(buildSenderEmail(data)),
    ]).catch((err) => console.error("Email send failed:", err));

    res.status(201).json({ success: true, id: msg.id });
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: err.issues }); return; }
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: Get all messages
contactRouter.get("/", authMiddleware, async (_req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    res.json(messages);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Admin: Mark as read
contactRouter.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const msg = await prisma.contactMessage.update({
      where: { id: req.params.id as string },
      data: { read: true },
    });
    res.json(msg);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// Admin: Delete
contactRouter.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.contactMessage.delete({ where: { id: req.params.id as string } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});
