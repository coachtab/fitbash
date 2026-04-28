import { NextRequest } from "next/server";
import { getClientIp, getDuelState } from "@/lib/voting";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const ip = getClientIp(
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
  );
  const state = await getDuelState(ip);
  return Response.json({ ok: true, ...state });
}
