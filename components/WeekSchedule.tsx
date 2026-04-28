import { CURRENT_WEEK } from "@/lib/week";

export function WeekSchedule() {
  return (
    <section className="px-7 pb-16 pt-8 md:pb-24 md:pt-10" aria-labelledby="week-schedule-heading">
      <div className="mx-auto max-w-[1180px]">
        <p className="mb-3 text-[12px] uppercase tracking-[0.18em] font-medium text-accent">
          The week
        </p>
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2
            id="week-schedule-heading"
            className="max-w-[20ch] text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]"
          >
            {CURRENT_WEEK.themeName} — Monday to Friday.
          </h2>
          <span className="text-[14px] tabular-nums text-ink-mute">{CURRENT_WEEK.dateRange}</span>
        </div>

        <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CURRENT_WEEK.duels.map((d) => {
            const isToday = d.status === "today";
            const isPast = d.status === "past";
            return (
              <li
                key={d.day}
                aria-current={isToday ? "true" : undefined}
                className={`relative flex flex-col rounded-2xl border p-5 transition-colors ${
                  isToday
                    ? "border-accent bg-white shadow-[0_8px_24px_-12px_rgba(15,26,36,0.18)]"
                    : isPast
                      ? "border-line bg-bg-elevated opacity-55"
                      : "border-line bg-bg-elevated"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                      isToday ? "text-accent" : "text-ink-mute"
                    }`}
                  >
                    {d.day}
                  </span>
                  <span className="text-[11px] tabular-nums text-ink-mute">{d.date}</span>
                </div>

                <div className="mt-4 text-[14px] font-semibold leading-tight tracking-[-0.005em] text-ink">
                  {d.a}
                </div>
                <div className="my-1.5 text-[10px] uppercase tracking-[0.2em] italic text-ink-mute">
                  vs
                </div>
                <div className="text-[14px] font-semibold leading-tight tracking-[-0.005em] text-ink">
                  {d.b}
                </div>

                <div className="mt-4 text-[10px] uppercase tracking-[0.2em] font-semibold">
                  {isToday ? (
                    <span className="text-accent">Today ↑ vote above</span>
                  ) : isPast ? (
                    <span className="text-ink-mute">Closed</span>
                  ) : (
                    <span className="text-ink-mute">Coming up</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
