import "server-only";
import crypto from "node:crypto";
import { prisma } from "./db";

export type DuelChoice = "a" | "b";

export type DuelState = {
  hasVoted: boolean;
  choice: DuelChoice | null;
  totalA: number;
  totalB: number;
};

export function isDuelChoice(x: unknown): x is DuelChoice {
  return x === "a" || x === "b";
}

/**
 * Hash an IP address with a server-side salt so we never store the raw IP.
 * Used to enforce one vote per visitor without retaining identifiable data.
 * Falls back to a stable dev salt if DUEL_VOTE_SALT isn't set — production should always set it.
 */
export function hashIp(ip: string): string {
  const salt = process.env.DUEL_VOTE_SALT ?? "fitbash-local-dev-salt";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

/**
 * Pull the original client IP from proxy headers. nginx is configured to set both
 * `X-Forwarded-For` (chain) and `X-Real-IP` (single) — prefer the first hop of XFF.
 */
export function getClientIp(
  forwardedFor: string | null,
  realIp: string | null,
): string {
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  if (realIp) {
    const trimmed = realIp.trim();
    if (trimmed) return trimmed;
  }
  return "0.0.0.0";
}

export async function getDuelState(ip: string): Promise<DuelState> {
  const ipHash = hashIp(ip);
  try {
    const [vote, totalA, totalB] = await Promise.all([
      prisma.duelVote.findUnique({ where: { ipHash } }),
      prisma.duelVote.count({ where: { choice: "a" } }),
      prisma.duelVote.count({ where: { choice: "b" } }),
    ]);
    return {
      hasVoted: vote !== null,
      choice: vote ? (vote.choice as DuelChoice) : null,
      totalA,
      totalB,
    };
  } catch {
    return { hasVoted: false, choice: null, totalA: 0, totalB: 0 };
  }
}

/** Idempotent vote — returns existing vote if the IP already voted. */
export async function recordDuelVote(
  ip: string,
  choice: DuelChoice,
): Promise<DuelState & { alreadyVoted: boolean }> {
  const ipHash = hashIp(ip);
  const existing = await prisma.duelVote.findUnique({ where: { ipHash } });
  if (!existing) {
    await prisma.duelVote.create({ data: { ipHash, choice } });
  }
  const state = await getDuelState(ip);
  return { ...state, alreadyVoted: existing !== null };
}
