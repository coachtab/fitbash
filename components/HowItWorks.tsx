const steps = [
  {
    num: "01",
    title: "Theme drops Monday",
    body: "Each week orbits one focus — Leg Week, Push Week, Pull Week, Core Week, Conditioning. Six exercises enter the bracket.",
  },
  {
    num: "02",
    title: "Yesterday's winner returns",
    body: "Mon: two fresh exercises duel. Tue–Fri: yesterday's winner is back, facing a brand-new challenger. You vote on the one you'd actually do.",
  },
  {
    num: "03",
    title: "Friday: a Champion",
    body: "Five days. One exercise that survived every vote. The Champion of the week is the cornerstone of the routine you'll actually keep.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-7 pb-20 pt-30 md:pb-30 md:pt-40">
      <div className="mx-auto max-w-[1180px]">
        <p className="mb-4 text-[12px] uppercase tracking-[0.18em] font-medium text-accent">
          How it works
        </p>
        <h2 className="mb-16 max-w-[20ch] text-[clamp(34px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]">
          One theme. Five battles. A real Champion by Friday.
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map(({ num, title, body }) => (
            <div key={num} className="border-t border-line-strong pt-7">
              <div className="mb-4 text-[12px] tabular-nums font-semibold tracking-[0.08em] text-accent">
                {num}
              </div>
              <h3 className="mb-3.5 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em]">
                {title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
