import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Rate Limiting (simple in-memory) ───
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max 5 emails per IP per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// ─── Input Validation ───
function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Email Templates ───
const ACCENT = "#64ffda";
const BG_DARK = "#0a192f";
const BG_CARD = "#112240";
const TEXT_LIGHT = "#ccd6f6";
const TEXT_DIM = "#8892b0";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function baseLayout(content: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${BG_DARK};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_DARK};padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border-radius:16px;border:1px solid rgba(100,255,218,0.1);overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,${BG_DARK},${BG_CARD});padding:32px 40px;border-bottom:2px solid ${ACCENT};">
<span style="font-size:24px;font-weight:700;color:${ACCENT};letter-spacing:1px;">RA</span>
<span style="font-size:14px;color:${TEXT_DIM};margin-left:12px;">Rana Muhammad Aleem Akhtar</span>
</td></tr>
<tr><td style="padding:40px;">${content}</td></tr>
<tr><td style="padding:24px 40px;border-top:1px solid rgba(100,255,218,0.08);text-align:center;">
<p style="margin:0;font-size:12px;color:${TEXT_DIM};">AI Team Lead &bull; Product Manager &bull; Healthcare AI Specialist</p>
<p style="margin:8px 0 0;font-size:11px;color:${TEXT_DIM};">
<a href="mailto:raleem811811@gmail.com" style="color:${ACCENT};text-decoration:none;">raleem811811@gmail.com</a>
&nbsp;&bull;&nbsp;<a href="https://linkedin.com/in/aleem-akhtar" style="color:${ACCENT};text-decoration:none;">LinkedIn</a>
&nbsp;&bull;&nbsp;<a href="https://github.com/aleemrana8" style="color:${ACCENT};text-decoration:none;">GitHub</a>
</p></td></tr></table></td></tr></table></body></html>`;
}

function ownerEmail(data: { name: string; email: string; subject: string; message: string }) {
  return {
    to: "raleem811811@gmail.com",
    subject: `Portfolio Contact: ${data.subject || "New Message"} — from ${data.name}`,
    html: baseLayout(`
      <h1 style="margin:0 0 8px;font-size:22px;color:${TEXT_LIGHT};">New Portfolio Message</h1>
      <p style="margin:0 0 24px;font-size:13px;color:${TEXT_DIM};font-family:monospace;">via portfolio contact form</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr><td style="padding:12px 16px;background:${BG_DARK};border-radius:8px 8px 0 0;border-bottom:1px solid rgba(100,255,218,0.06);">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">From</span>
          <p style="margin:4px 0 0;font-size:15px;color:${TEXT_LIGHT};font-weight:600;">${escapeHtml(data.name)}</p>
        </td></tr>
        <tr><td style="padding:12px 16px;background:${BG_DARK};border-bottom:1px solid rgba(100,255,218,0.06);">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Email</span>
          <p style="margin:4px 0 0;font-size:14px;color:${TEXT_LIGHT};">${escapeHtml(data.email)}</p>
        </td></tr>
        <tr><td style="padding:12px 16px;background:${BG_DARK};border-radius:0 0 8px 8px;">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Subject</span>
          <p style="margin:4px 0 0;font-size:14px;color:${TEXT_LIGHT};">${escapeHtml(data.subject || "No subject")}</p>
        </td></tr>
      </table>
      <div style="padding:20px;background:${BG_DARK};border-radius:8px;border-left:3px solid ${ACCENT};">
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Message</span>
        <p style="margin:8px 0 0;font-size:14px;color:${TEXT_LIGHT};line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
      <p style="margin:24px 0 0;font-size:12px;color:${TEXT_DIM};">Reply directly to this email to respond to ${escapeHtml(data.name)}.</p>
    `),
  };
}

function senderEmail(data: { name: string; email: string; message: string }) {
  return {
    to: data.email,
    subject: "Thanks for reaching out — Aleem Akhtar",
    html: baseLayout(`
      <h1 style="margin:0 0 8px;font-size:22px;color:${TEXT_LIGHT};">Thanks for reaching out!</h1>
      <p style="margin:0 0 24px;font-size:14px;color:${TEXT_DIM};">Hi ${escapeHtml(data.name)},</p>
      <p style="margin:0 0 16px;font-size:14px;color:${TEXT_LIGHT};line-height:1.7;">
        I've received your message and will get back to you as soon as possible — usually within 24 hours.
      </p>
      <div style="padding:16px;background:${BG_DARK};border-radius:8px;border-left:3px solid ${ACCENT};margin-bottom:24px;">
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Your Message</span>
        <p style="margin:8px 0 0;font-size:13px;color:${TEXT_DIM};line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
      <p style="margin:0;font-size:14px;color:${TEXT_LIGHT};">Best regards,<br/><strong style="color:${ACCENT};">Rana Muhammad Aleem Akhtar</strong></p>
    `),
  };
}

// ─── POST Handler ───
export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    // Parse & validate
    const body = await req.json();
    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "");
    const subject = sanitize(body.subject || "");
    const message = sanitize(body.message || "");

    if (!name || name.length > 100) {
      return NextResponse.json({ error: "Name is required (max 100 chars)" }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (subject.length > 200) {
      return NextResponse.json({ error: "Subject too long (max 200 chars)" }, { status: 400 });
    }
    if (!message || message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Message is required (10–5000 chars)" }, { status: 400 });
    }

    // SMTP config check
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      console.error("SMTP_USER or SMTP_PASS not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: smtpUser, pass: smtpPass },
    });

    const data = { name, email, subject, message };

    // Send both emails
    await Promise.all([
      transporter.sendMail({ from: `"Aleem Portfolio" <${smtpUser}>`, replyTo: email, ...ownerEmail(data) }),
      transporter.sendMail({ from: `"Aleem Akhtar" <${smtpUser}>`, ...senderEmail(data) }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
