import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { profileRouter } from "./routes/profile";
import { experienceRouter } from "./routes/experience";
import { projectRouter } from "./routes/project";
import { skillRouter } from "./routes/skill";
import { blogRouter } from "./routes/blog";
import { contactRouter } from "./routes/contact";
import { authRouter } from "./routes/auth";
import { adminRouter } from "./routes/admin";
import { settingsRouter } from "./routes/settings";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

// Contact form has stricter rate limiting
const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5 });
app.use("/api/contact", contactLimiter);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/projects", projectRouter);
app.use("/api/skills", skillRouter);
app.use("/api/blog", blogRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/settings", settingsRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running on port ${PORT}`);
});

export default app;
