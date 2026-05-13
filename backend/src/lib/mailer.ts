import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER || "raleem811811@gmail.com",
    pass: process.env.SMTP_PASS, // Gmail App Password
  },
});

const ACCENT = "#64ffda";
const BG_DARK = "#0a192f";
const BG_CARD = "#112240";
const TEXT_LIGHT = "#ccd6f6";
const TEXT_DIM = "#8892b0";

function baseLayout(content: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:${BG_DARK};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_DARK};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border-radius:16px;border:1px solid rgba(100,255,218,0.1);overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,${BG_DARK},${BG_CARD});padding:32px 40px;border-bottom:2px solid ${ACCENT};">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:24px;font-weight:700;color:${ACCENT};letter-spacing:1px;">RA</span>
                  <span style="font-size:14px;color:${TEXT_DIM};margin-left:12px;">Rana Muhammad Aleem Akhtar</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid rgba(100,255,218,0.08);text-align:center;">
            <p style="margin:0;font-size:12px;color:${TEXT_DIM};">
              AI Team Lead &bull; Product Manager &bull; Healthcare AI Specialist
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:${TEXT_DIM};">
              <a href="mailto:raleem811811@gmail.com" style="color:${ACCENT};text-decoration:none;">raleem811811@gmail.com</a>
              &nbsp;&bull;&nbsp;
              <a href="https://linkedin.com/in/aleem-akhtar" style="color:${ACCENT};text-decoration:none;">LinkedIn</a>
              &nbsp;&bull;&nbsp;
              <a href="https://github.com/aleemrana8" style="color:${ACCENT};text-decoration:none;">GitHub</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Email sent TO Aleem when someone submits the contact form */
export function buildOwnerEmail(data: { name: string; email: string; subject?: string; message: string }) {
  const html = baseLayout(`
    <h1 style="margin:0 0 8px;font-size:22px;color:${TEXT_LIGHT};">New Portfolio Message</h1>
    <p style="margin:0 0 24px;font-size:13px;color:${TEXT_DIM};font-family:monospace;">via aleemakhtar.dev contact form</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:12px 16px;background:${BG_DARK};border-radius:8px 8px 0 0;border-bottom:1px solid rgba(100,255,218,0.06);">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">From</span>
          <p style="margin:4px 0 0;font-size:15px;color:${TEXT_LIGHT};font-weight:600;">${escapeHtml(data.name)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;background:${BG_DARK};border-bottom:1px solid rgba(100,255,218,0.06);">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Email</span>
          <p style="margin:4px 0 0;font-size:14px;"><a href="mailto:${escapeHtml(data.email)}" style="color:${ACCENT};text-decoration:none;">${escapeHtml(data.email)}</a></p>
        </td>
      </tr>
      ${data.subject ? `
      <tr>
        <td style="padding:12px 16px;background:${BG_DARK};border-bottom:1px solid rgba(100,255,218,0.06);">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Subject</span>
          <p style="margin:4px 0 0;font-size:14px;color:${TEXT_LIGHT};">${escapeHtml(data.subject)}</p>
        </td>
      </tr>` : ""}
      <tr>
        <td style="padding:12px 16px;background:${BG_DARK};border-radius:0 0 8px 8px;">
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Message</span>
          <p style="margin:8px 0 0;font-size:14px;color:${TEXT_LIGHT};line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>

    <a href="mailto:${escapeHtml(data.email)}?subject=Re: ${escapeHtml(data.subject || "Your message")}" style="display:inline-block;padding:12px 28px;background:${ACCENT};color:${BG_DARK};font-weight:700;font-size:14px;border-radius:8px;text-decoration:none;">
      Reply to ${escapeHtml(data.name)}
    </a>
  `);

  return {
    to: process.env.SMTP_USER || "raleem811811@gmail.com",
    subject: `📬 Portfolio Contact: ${data.subject || data.name}`,
    html,
  };
}

/** Thank-you email sent TO the sender */
export function buildSenderEmail(data: { name: string; email: string; subject?: string; message: string }) {
  const firstName = data.name.split(" ")[0];

  const html = baseLayout(`
    <h1 style="margin:0 0 8px;font-size:22px;color:${TEXT_LIGHT};">Thanks for reaching out, ${escapeHtml(firstName)}!</h1>
    <p style="margin:0 0 28px;font-size:14px;color:${TEXT_DIM};line-height:1.6;">
      I've received your message and appreciate you taking the time to connect.
      I'll review it and get back to you as soon as possible — typically within 24-48 hours.
    </p>

    <!-- Message recap -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding:16px 20px;background:${BG_DARK};border-radius:8px;border-left:3px solid ${ACCENT};">
          <p style="margin:0 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${ACCENT};font-family:monospace;">Your Message</p>
          ${data.subject ? `<p style="margin:4px 0 8px;font-size:13px;color:${TEXT_LIGHT};font-weight:600;">${escapeHtml(data.subject)}</p>` : ""}
          <p style="margin:0;font-size:13px;color:${TEXT_DIM};line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        </td>
      </tr>
    </table>

    <p style="font-size:14px;color:${TEXT_DIM};line-height:1.6;margin:0 0 24px;">
      In the meantime, feel free to explore my work:
    </p>

    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:12px;">
          <a href="https://github.com/aleemrana8" style="display:inline-block;padding:10px 20px;background:${BG_DARK};color:${ACCENT};font-size:13px;font-weight:600;border-radius:8px;text-decoration:none;border:1px solid rgba(100,255,218,0.2);">
            GitHub →
          </a>
        </td>
        <td>
          <a href="https://linkedin.com/in/aleem-akhtar" style="display:inline-block;padding:10px 20px;background:${BG_DARK};color:${ACCENT};font-size:13px;font-weight:600;border-radius:8px;text-decoration:none;border:1px solid rgba(100,255,218,0.2);">
            LinkedIn →
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:28px 0 0;font-size:14px;color:${TEXT_LIGHT};">
      Best regards,<br/>
      <strong style="color:${ACCENT};">Rana Muhammad Aleem Akhtar</strong><br/>
      <span style="font-size:12px;color:${TEXT_DIM};">AI Team Lead &amp; Product Manager</span>
    </p>
  `);

  return {
    to: data.email,
    subject: `Thanks for your message, ${firstName}! — Aleem Akhtar`,
    html,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendMail(options: { to: string; subject: string; html: string }) {
  return transporter.sendMail({
    from: `"Aleem Akhtar Portfolio" <${process.env.SMTP_USER || "raleem811811@gmail.com"}>`,
    ...options,
  });
}
