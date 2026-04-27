import { WaitlistForm } from "./WaitlistForm";
import { HeroDuel } from "./illustrations/HeroDuel";
import { SIGNUP_COUNT_REVEAL_THRESHOLD } from "@/lib/config";

type Props = {
  signupCount: number;
  source: string;
};

export function Hero({ signupCount, source }: Props) {
  const showCount = signupCount >= SIGNUP_COUNT_REVEAL_THRESHOLD;
  return (
    <section className="px-6 pt-20 pb-24 md:pt-28 md:pb-32" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-2xl text-center fb-fade-in">
        <h1
          id="hero-heading"
          className="text-[32px] md:text-[48px] lg:text-[56px] font-medium tracking-tight"
        >
          Two exercises. One duel. You decide.
        </h1>
        <p className="mt-5 text-lg md:text-xl text-muted">
          Discover the exercises you&rsquo;ll actually keep doing.
        </p>

        <div className="mt-12 mx-auto w-full max-w-md">
          <HeroDuel className="w-full h-auto" />
        </div>

        <div className="mt-10 mx-auto w-full max-w-md text-left">
          <WaitlistForm variant="hero" source={source} />
        </div>

        <p className="mt-6 text-sm text-muted">
          {showCount
            ? `Join ${signupCount.toLocaleString("en-US")} people on the waitlist`
            : "Be one of the first."}
        </p>
      </div>
    </section>
  );
}
