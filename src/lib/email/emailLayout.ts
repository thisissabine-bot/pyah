// Herbruikbaar HTML e-maillayout met vaste handtekening/logo (CC-opdracht: HTML e-mailsjabloon met handtekening).
// Table-based layout met inline styles — geen externe CSS/classes, die worden door veel e-mailclients genegeerd of verwijderd.

const LOGO_URL = "https://privateyogaathome.nl/email/logo-pyah-email.png";

const STANDAARD_HANDTEKENING = `Hartelijke groet,<br />
                      Team Private Yoga at Home`;

export function wrapEmailHtml({
  bodyHtml,
  handtekeningHtml = STANDAARD_HANDTEKENING,
}: {
  bodyHtml: string;
  handtekeningHtml?: string;
}): string {
  return `<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Private Yoga at Home</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #ebe3e0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ebe3e0;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 32px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #484f47;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding: 0 32px 40px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="border-top: 1px solid #d4baad; padding-top: 24px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #484f47;">
                      ${handtekeningHtml}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 16px;">
                      <img
                        src="${LOGO_URL}"
                        alt="Private Yoga at Home"
                        width="180"
                        style="max-width: 180px; width: 100%; height: auto; display: block;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
