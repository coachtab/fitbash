import { CURRENT_WEEK } from "@/lib/week";

export function Nutrition() {
  return (
    <section className="px-7 pb-24 pt-4 md:pb-32 md:pt-6" aria-labelledby="nutrition-heading">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-8 rounded-[28px] border border-line bg-bg-elevated p-8 md:grid-cols-12 md:items-center md:gap-12 md:p-12 lg:p-16">
          <div className="md:col-span-5">
            <p className="text-[12px] uppercase tracking-[0.18em] font-medium text-accent">
              This week&rsquo;s nutrition motto
            </p>
            <h2
              id="nutrition-heading"
              className="mt-3 text-[clamp(28px,3.6vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em]"
            >
              {CURRENT_WEEK.nutrition.headline}
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-[16px] md:text-[18px] leading-[1.55] text-ink-soft">
              {CURRENT_WEEK.nutrition.body}
            </p>
            <p className="mt-5 text-[12px] uppercase tracking-[0.2em] font-medium text-ink-mute">
              One motto per theme · resets Monday
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
