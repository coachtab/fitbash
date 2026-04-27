import { Resend } from "resend";
import { FOUNDER_FROM_EMAIL, FOUNDER_NAME, INSTAGRAM_HANDLE, SITE_NAME } from "./config";

let resendClient: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

export async function sendWaitlistConfirmation(to: string): Promise<void> {
  const resend = getResend();
  if (!resend) {
    // Local dev / staging without a Resend key — confirmation email is skipped silently.
    return;
  }

  const subject = `You're on the ${SITE_NAME} list.`;
  const text = [
    `Thanks for signing up.`,
    ``,
    `One email from me when ${SITE_NAME} is ready — that's the deal.`,
    `Until then, the duels keep going daily on Instagram: @${INSTAGRAM_HANDLE}`,
    ``,
    `— ${FOUNDER_NAME}`,
  ].join("\n");

  await resend.emails.send({
    from: `${FOUNDER_NAME} <${FOUNDER_FROM_EMAIL}>`,
    to,
    subject,
    text,
  });
}
