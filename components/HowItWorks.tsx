const steps = [
  {
    num: "01",
    title: "Theme drops Monday",
    body: "Each week orbits one focus — Leg Week, Push Week, Pull Week, Core Week, Conditioning. You know what you're working on before you've made a single choice.",
  },
  {
    num: "02",
    title: "One duel a day, Mon–Fri",
    body: "Two short clips, side by side. You pick the one you'd actually do. Five duels, three minutes each — that's the whole week.",
  },
  {
    num: "03",
    title: "Friday: routine + nutrition",
    body: "Your wins from the week become a personal collection. Plus a nutrition motto for the theme. Open it at the gym, eat it during the week.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-7 pb-20 pt-30 md:pb-30 md:pt-40">
      <div className="mx-auto max-w-[1180px]">
        <p className="mb-4 text-[12px] uppercase tracking-[0.18em] font-medium text-accent">
          How it works
        </p>
        <h2 className="mb-16 max-w-[18ch] text-[clamp(34px,5vw,56px)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Five duels. One theme. The routine writes itself.
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
