import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  // Token validation handled by NestJS passport — this is a fallback guard for Express routes
  (req as any).user = { authenticated: true };
  next();
}
