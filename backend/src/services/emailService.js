import nodemailer from 'nodemailer';

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    console.warn('[emailService] MAIL_USER / MAIL_PASS are not set — email sending will fail.');
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  return cachedTransporter;
}

/**
 * Renders a branded HTML password-reset email.
 * Uses table-based layout + inline styles so it renders correctly
 * in Gmail, Outlook, Apple Mail, etc.
 */
function renderResetEmail({ resetLink, displayName }) {
  const greeting = displayName ? `Hi ${displayName},` : 'Hi there,';

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reset your CoderV password</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #f1f1f3;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="display:inline-block;width:28px;height:28px;background:#18181b;border-radius:6px;text-align:center;line-height:28px;color:#ffffff;font-weight:700;font-family:'SF Mono',Menlo,Consolas,monospace;font-size:14px;">C</div>
                    </td>
                    <td style="vertical-align:middle;padding-left:10px;font-weight:600;font-size:15px;letter-spacing:-0.01em;color:#18181b;">
                      CoderV
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-family:'SF Mono',Menlo,Consolas,monospace;">
                  /reset-password
                </p>
                <h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.3;letter-spacing:-0.01em;color:#18181b;font-weight:600;">
                  Reset your password
                </h1>
                <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#3f3f46;">
                  ${greeting}
                </p>
                <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#3f3f46;">
                  We received a request to reset the password for your CoderV account.
                  Click the button below to choose a new password. This link will expire
                  in 1 hour for your security.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px 0;">
                  <tr>
                    <td style="border-radius:8px;background:#18181b;">
                      <a href="${resetLink}"
                         style="display:inline-block;padding:11px 20px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;border-radius:8px;">
                        Reset password →
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 10px 0;font-size:12.5px;line-height:1.6;color:#71717a;">
                  Or copy and paste this link into your browser:
                </p>
                <p style="margin:0 0 24px 0;font-size:12px;line-height:1.5;color:#52525b;word-break:break-all;font-family:'SF Mono',Menlo,Consolas,monospace;background:#fafafa;border:1px solid #eeeef0;border-radius:6px;padding:10px 12px;">
                  ${resetLink}
                </p>

                <div style="height:1px;background:#f1f1f3;margin:8px 0 20px 0;"></div>

                <p style="margin:0;font-size:12.5px;line-height:1.6;color:#71717a;">
                  If you didn't request a password reset, you can safely ignore this email —
                  your password will not change.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px;background:#fafafa;border-top:1px solid #f1f1f3;">
                <p style="margin:0;font-size:11.5px;line-height:1.6;color:#a1a1aa;">
                  Sent by CoderV · Learn smarter, code better.<br />
                  Please do not reply to this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `${greeting}

We received a request to reset the password for your CoderV account.

Use the link below to choose a new password. This link will expire in 1 hour.

${resetLink}

If you didn't request a password reset, you can safely ignore this email — your password will not change.

— CoderV`;

  return { html, text };
}

/**
 * Sends a branded password-reset email.
 */
export async function sendPasswordResetEmail({ to, resetLink, displayName }) {
  const transporter = getTransporter();
  if (!transporter) throw new Error('Email service is not configured.');

  const from = process.env.MAIL_FROM || `CoderV <${process.env.MAIL_USER}>`;
  const { html, text } = renderResetEmail({ resetLink, displayName });

  await transporter.sendMail({
    from,
    to,
    subject: 'Reset your CoderV password',
    text,
    html,
  });
}
