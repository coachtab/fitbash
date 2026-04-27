import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { sendWaitlistConfirmation } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_SOURCE_LEN = 64;

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function parseLocale(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;
  // Take the first tag, strip quality params, trim whitespace, cap length.
  const first = acceptLanguage.split(",")[0]?.split(";")[0]?.trim();
  if (!first) return null;
  return first.slice(0, 16);
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }
  const body = payload as { email?: unknown; consent?: unknown; source?: unknown };

  const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!rawEmail || rawEmail.length > 254 || !EMAIL_RE.test(rawEmail)) {
    return jsonError("Please enter a valid email address.", 400);
  }
  if (body.consent !== true) {
    return jsonError("Please tick the box so we know it's okay to email you.", 400);
  }

  const source =
    typeof body.source === "string" && body.source.length > 0 && body.source.length <= MAX_SOURCE_LEN
      ? body.source
      : "direct";
  const locale = parseLocale(request.headers.get("accept-language"));

  try {
    const existing = await prisma.waitlistSignup.findUnique({ where: { email: rawEmail } });
    if (existing) {
      // Idempotent — don't error, don't double-send. Keep the signup feel friction-free.
      return Response.json({ ok: true, alreadySubscribed: true });
    }

    await prisma.waitlistSignup.create({
      data: {
        email: rawEmail,
        locale,
        source,
        consentAt: new Date(),
      },
    });
  } catch (err) {
    console.error("waitlist insert failed", err);
    return jsonError("Something went wrong. Try again in a moment.", 500);
  }

  // Best-effort: a Resend failure shouldn't break the user's signup. Log and move on.
  try {
    await sendWaitlistConfirmation(rawEmail);
  } catch (err) {
    console.error("confirmation email failed", err);
  }

  return Response.json({ ok: true });
}
