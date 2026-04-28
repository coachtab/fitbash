import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyItWorks } from "@/components/WhyItWorks";
import { FinalCTA } from "@/components/FinalCTA";
import { SiteFooter } from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const refRaw = params.ref;
  const source =
    typeof refRaw === "string" && refRaw.length > 0 && refRaw.length <= 64
      ? refRaw
      : "direct";

  return (
    <>
      <SiteHeader />
      <main>
        <Hero source={source} />
        <HowItWorks />
        <WhyItWorks />
        <FinalCTA source={source} />
      </main>
      <SiteFooter />
    </>
  );
}
