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
    <section
      id="top"
      className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Soft accent shape — subtle but present, signals "designed not templated" */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-coral/15 blur-3xl md:h-[560px] md:w-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-paper-deep blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl fb-fade-in">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-coral" />
          In early development &middot; Berlin
        </p>

        <h1
          id="hero-heading"
          className="mt-8 text-[44px] sm:text-[60px] md:text-[84px] lg:text-[104px] font-medium tracking-[-0.03em] leading-[0.95] text-balance"
        >
          Two exercises.
          <br />
          One duel.
          <br />
          <span className="text-coral">You decide.</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 md:items-end gap-10 md:gap-16">
          <div className="md:col-span-6">
            <p className="text-lg md:text-xl text-muted text-balance max-w-md">
              Discover the exercises you&rsquo;ll actually keep doing.
            </p>
            <div className="mt-10 max-w-md">
              <WaitlistForm source={source} submitLabel="Get early access" />
            </div>
            <p className="mt-5 text-sm text-muted">
              {showCount
                ? `Joining ${signupCount.toLocaleString("en-US")} others on the waitlist`
                : "Be one of the first."}
            </p>
          </div>

          <div className="md:col-span-6 md:pl-6">
            <HeroDuel className="w-full max-w-md md:max-w-none mx-auto h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
