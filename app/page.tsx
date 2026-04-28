import { headers } from "next/headers";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { WeekSchedule } from "@/components/WeekSchedule";
import { Nutrition } from "@/components/Nutrition";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyItWorks } from "@/components/WhyItWorks";
import { FinalCTA } from "@/components/FinalCTA";
import { SiteFooter } from "@/components/SiteFooter";
import { getClientIp, getDuelState } from "@/lib/voting";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [params, h] = await Promise.all([searchParams, headers()]);
  const refRaw = params.ref;
  const source =
    typeof refRaw === "string" && refRaw.length > 0 && refRaw.length <= 64
      ? refRaw
      : "direct";

  const ip = getClientIp(h.get("x-forwarded-for"), h.get("x-real-ip"));
  const duelState = await getDuelState(ip);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero source={source} duelState={duelState} />
        <WeekSchedule />
        <Nutrition />
        <HowItWorks />
        <WhyItWorks />
        <FinalCTA source={source} />
      </main>
      <SiteFooter />
    </>
  );
}
