const steps = [
  {
    num: "01",
    title: "One duel a day",
    body: "Two short clips, side by side. You pick the one you'd actually do. Three minutes, twenty matchups, done.",
  },
  {
    num: "02",
    title: "Crowd reveals the verdict",
    body: "See what people training like you picked. Plus a coach note explaining why both work — or don't.",
  },
  {
    num: "03",
    title: "Your routine, by you",
    body: "Your wins become a personal collection. Export it as a routine you'll actually open at the gym.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-7 pb-20 pt-30 md:pb-30 md:pt-40">
      <div className="mx-auto max-w-[1180px]">
        <p className="mb-4 font-serif text-base italic tracking-[0.02em] text-accent">
          How it works
        </p>
        <h2 className="mb-16 max-w-[18ch] font-serif text-[clamp(34px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.03em]">
          Stop scrolling routines. Start finding what fits.
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map(({ num, title, body }) => (
            <div key={num} className="border-t border-line-strong pt-7">
              <div className="mb-4 font-serif text-sm font-medium tracking-[0.05em] text-accent">
                {num}
              </div>
              <h3 className="mb-3.5 font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.015em]">
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
