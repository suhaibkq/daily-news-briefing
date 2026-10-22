import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'suhaibq@gmail.com';
const SENDER = 'Daily Briefing <briefing@resend.dev>';

function buildHtml(briefing) {
  const intlRows = briefing.international
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
          <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.5px;">${item.source}</span>
          <p style="margin:4px 0 2px;font-size:15px;font-weight:600;color:#1a1a1a;line-height:1.4;">${item.headline}</p>
          <p style="margin:0;font-size:13px;color:#555;line-height:1.5;">${item.summary}</p>
        </td>
      </tr>`
    )
    .join('');

  const pkRows = briefing.pakistan
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
          <span style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.5px;">${item.source}</span>
          <p style="margin:4px 0 2px;font-size:15px;font-weight:600;color:#1a1a1a;line-height:1.4;">${item.headline}</p>
          <p style="margin:0;font-size:13px;color:#555;line-height:1.5;">${item.summary}</p>
        </td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">

        <!-- Header -->
        <tr><td style="background:#1a1a1a;padding:24px 32px;">
          <p style="margin:0;font-size:11px;color:#888;letter-spacing:1px;text-transform:uppercase;">Good morning, Suhaib</p>
          <h1 style="margin:4px 0 0;font-size:22px;color:#fff;font-weight:700;">Daily News Briefing</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#aaa;">${briefing.date}</p>
        </td></tr>

        <!-- International section -->
        <tr><td style="padding:24px 32px 8px;">
          <h2 style="margin:0 0 4px;font-size:12px;font-weight:700;color:#c0392b;text-transform:uppercase;letter-spacing:1px;">🌍 International</h2>
          <table width="100%" cellpadding="0" cellspacing="0">${intlRows}</table>
        </td></tr>

        <!-- Pakistan section -->
        <tr><td style="padding:24px 32px 8px;">
          <h2 style="margin:0 0 4px;font-size:12px;font-weight:700;color:#2980b9;text-transform:uppercase;letter-spacing:1px;">🇵🇰 Pakistan</h2>
          <table width="100%" cellpadding="0" cellspacing="0">${pkRows}</table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 32px;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">Sources: Washington Post · New York Times · Wall Street Journal · The Guardian · Dawn</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendBriefingEmail(briefing) {
  const subject = `Morning Briefing — ${briefing.date}`;

  const { data, error } = await resend.emails.send({
    from: SENDER,
    to: RECIPIENT,
    subject,
    html: buildHtml(briefing),
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
  console.log(`Email sent — id: ${data.id}`);
  return data;
}
