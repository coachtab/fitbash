import { CURRENT_WEEK, type WeekDuel } from "@/lib/week";

function ExerciseLine({
  name,
  isChampion,
  isWinner,
  isLoser,
}: {
  name: string;
  isChampion: boolean;
  isWinner: boolean;
  isLoser: boolean;
}) {
  return (
    <div className="flex items-baseline gap-1.5">
      {isChampion ? (
        <span
          aria-hidden
          className="text-[10px] font-semibold text-accent leading-none translate-y-[-1px]"
          title="Yesterday's winner, carried over"
        >
          ↗
        </span>
      ) : null}
      <span
        className={`text-[14px] font-semibold leading-tight tracking-[-0.005em] ${
          isWinner
            ? "text-ink"
            : isLoser
              ? "text-ink-mute line-through"
              : "text-ink"
        }`}
      >
        {name}
      </span>
      {isWinner ? (
        <span aria-hidden className="text-[11px] font-semibold text-accent leading-none">
          ✓
        </span>
      ) : null}
    </div>
  );
}

function ScheduleCard({ duel, isFinal }: { duel: WeekDuel; isFinal: boolean }) {
  const isToday = duel.status === "today";
  const isPast = duel.status === "past";

  const leftIsWinner = isPast && duel.winner === "left";
  const rightIsWinner = isPast && duel.winner === "right";
  const leftIsLoser = isPast && duel.winner === "right";
  const rightIsLoser = isPast && duel.winner === "left";

  return (
    <li
      aria-current={isToday ? "true" : undefined}
      className={`relative flex flex-col rounded-2xl border p-5 transition-colors ${
        isToday
          ? "border-accent bg-white shadow-[0_8px_24px_-12px_rgba(15,26,36,0.18)]"
          : isPast
            ? "border-line bg-bg-elevated opacity-60"
            : "border-line bg-bg-elevated"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span
          className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
            isToday ? "text-accent" : "text-ink-mute"
          }`}
        >
          {duel.day}
        </span>
        <span className="text-[11px] tabular-nums text-ink-mute">{duel.date}</span>
      </div>

      <div className="mt-4 space-y-1.5">
        <ExerciseLine
          name={duel.left}
          isChampion={duel.leftIsChampion && !isPast}
          isWinner={leftIsWinner}
          isLoser={leftIsLoser}
        />
        <div className="text-[10px] uppercase tracking-[0.2em] italic text-ink-mute">vs</div>
        <ExerciseLine
          name={duel.right}
          isChampion={false}
          isWinner={rightIsWinner}
          isLoser={rightIsLoser}
        />
      </div>

      <div className="mt-4 text-[10px] uppercase tracking-[0.2em] font-semibold">
        {isFinal && !isPast ? (
          <span className="text-accent">Final · Champion crowned</span>
        ) : isToday ? (
          <span className="text-accent">Today ↑ vote above</span>
        ) : isPast ? (
          <span className="text-ink-mute">Closed</span>
        ) : (
          <span className="text-ink-mute">Coming up</span>
        )}
      </div>
    </li>
  );
}

export function WeekSchedule() {
  return (
    <section className="px-7 pb-24 pt-8 md:pb-32 md:pt-12" aria-labelledby="week-schedule-heading">
      <div className="mx-auto max-w-[1180px]">
        <p className="mb-3 text-[12px] uppercase tracking-[0.18em] font-medium text-accent">
          The gauntlet
        </p>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2
            id="week-schedule-heading"
            className="max-w-[22ch] text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]"
          >
            {CURRENT_WEEK.themeName}. Five battles. One Champion.
          </h2>
          <span className="text-[14px] tabular-nums text-ink-mute">{CURRENT_WEEK.dateRange}</span>
        </div>
        <p className="mb-10 max-w-[60ch] text-[15px] leading-[1.55] text-ink-soft">
          Each day&rsquo;s winner stays for tomorrow&rsquo;s vote and faces a fresh challenger.
          Survive five days and you&rsquo;re Champion of the week.
          <span className="text-accent"> ↗</span> means the exercise is yesterday&rsquo;s
          carry-over.
        </p>

        <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CURRENT_WEEK.duels.map((d, i) => (
            <ScheduleCard key={d.day} duel={d} isFinal={i === CURRENT_WEEK.duels.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
