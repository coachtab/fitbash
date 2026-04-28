import { WaitlistForm } from "./WaitlistForm";
import { DuelDemo } from "./DuelDemo";

type Props = { source: string };

export function Hero({ source }: Props) {
  return (
    <section id="top" className="relative pb-24 pt-12 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="fb-fade-up d1 mb-7 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-medium tracking-[0.01em] text-accent-deep">
          <span aria-hidden className="fb-pulse h-[7px] w-[7px] rounded-full bg-accent" />
          Early access · launching 2026
        </div>

        <h1 className="fb-fade-up d2 mb-8 max-w-[14ch] font-serif text-[clamp(44px,7vw,88px)] font-normal leading-[0.98] tracking-[-0.035em]">
          Two exercises.
          <br />
          One duel.
          <br />
          <em className="font-serif italic text-accent">You decide.</em>
        </h1>

        <p className="fb-fade-up d3 mb-11 max-w-[52ch] text-[clamp(17px,1.6vw,20px)] leading-[1.5] text-ink-soft">
          Discover the workouts you&rsquo;ll actually keep doing. Vote on daily exercise
          matchups, see what the crowd picks, and build a routine that fits how you actually
          train — not how you think you should.
        </p>

        <div className="fb-fade-up d4">
          <WaitlistForm source={source} submitLabel="Get early access" />
        </div>

        <p className="fb-fade-up d5 mt-3.5 flex items-center gap-2 text-[13px] text-ink-mute">
          <span className="font-semibold text-accent">✓</span>
          Free for the first 500. No spam, no fitness guilt-trips.
        </p>

        <div className="fb-fade-up d5">
          <DuelDemo />
        </div>
      </div>
    </section>
  );
}
