import { NextRequest } from "next/server";
import {
  getClientIp,
  isDuelChoice,
  recordDuelVote,
} from "@/lib/voting";

export const runtime = "nodejs";

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }
  const body = payload as { choice?: unknown };
  if (!isDuelChoice(body.choice)) {
    return jsonError("choice must be 'a' or 'b'.", 400);
  }

  const ip = getClientIp(
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
  );

  try {
    const state = await recordDuelVote(ip, body.choice);
    return Response.json({ ok: true, ...state });
  } catch (err) {
    console.error("duel vote insert failed", err);
    return jsonError("Couldn't record your vote. Try again in a moment.", 500);
  }
}
