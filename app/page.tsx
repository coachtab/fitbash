import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyItWorks } from "@/components/WhyItWorks";
import { SneakPeek } from "@/components/SneakPeek";
import { Founder } from "@/components/Founder";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { SiteFooter } from "@/components/SiteFooter";
import { prisma } from "@/lib/db";
import { SIGNUP_COUNT_FALLBACK } from "@/lib/config";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function getSignupCount(): Promise<number> {
  try {
    return await prisma.waitlistSignup.count();
  } catch {
    return SIGNUP_COUNT_FALLBACK;
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [params, signupCount] = await Promise.all([searchParams, getSignupCount()]);
  const refRaw = params.ref;
  const source =
    typeof refRaw === "string" && refRaw.length > 0 && refRaw.length <= 64
      ? refRaw
      : "direct";

  return (
    <>
      <Hero signupCount={signupCount} source={source} />
      <HowItWorks />
      <WhyItWorks />
      <SneakPeek />
      <Founder />
      <FAQ />
      <FinalCTA source={source} />
      <SiteFooter />
    </>
  );
}
