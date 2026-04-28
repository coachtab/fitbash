import { WaitlistForm } from "./WaitlistForm";
import { DuelDemo } from "./DuelDemo";
import { CURRENT_WEEK } from "@/lib/week";

type DuelState = {
  hasVoted: boolean;
  choice: "a" | "b" | null;
  totalA: number;
  totalB: number;
};

type Props = {
  source: string;
  duelState: DuelState;
};

export function Hero({ source, duelState }: Props) {
  return (
    <section id="top" className="relative pb-16 pt-12 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="fb-fade-up d1 mb-7 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-medium tracking-[0.01em] text-accent-deep">
          <span aria-hidden className="fb-pulse h-[7px] w-[7px] rounded-full bg-accent" />
          {CURRENT_WEEK.themeName} · {CURRENT_WEEK.todayLabel}
        </div>

        <h1 className="fb-fade-up d2 mb-8 max-w-[14ch] text-[clamp(44px,7vw,88px)] font-semibold leading-[0.98] tracking-[-0.04em]">
          Two exercises.
          <br />
          One duel.
          <br />
          <em className="italic font-medium text-accent">You decide.</em>
        </h1>

        <p className="fb-fade-up d3 mb-11 max-w-[58ch] text-[clamp(17px,1.6vw,20px)] leading-[1.5] text-ink-soft">
          Each week, one theme. Five duels, Monday to Friday — and yesterday&rsquo;s winner
          comes back today to face a fresh challenger. By Friday, only one exercise is still
          standing. That&rsquo;s your Champion.
        </p>

        <div className="fb-fade-up d4">
          <WaitlistForm source={source} submitLabel="Get early access" />
        </div>

        <p className="fb-fade-up d5 mt-3.5 flex items-center gap-2 text-[13px] text-ink-mute">
          <span className="font-semibold text-accent">✓</span>
          Free for the first 500. No spam, no fitness guilt-trips.
        </p>

        <div className="fb-fade-up d5">
          <DuelDemo initialState={duelState} />
        </div>
      </div>
    </section>
  );
}
