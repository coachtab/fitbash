const points = [
  {
    title: "No prescriptions, no guilt",
    body: "You're the expert on what you'll keep doing. We're just here to surface options you didn't know existed.",
  },
  {
    title: "Physio-reviewed library",
    body: "Every exercise is checked by qualified trainers. Crowd votes are honest signal, not a popularity contest.",
  },
  {
    title: "Built in Berlin",
    body: "German-first, English available. Made for home and dumbbell workouts at launch — gym and HYROX coming next.",
  },
];

export function WhyItWorks() {
  return (
    <section className="px-7 pb-25 pt-20 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <p className="mb-4 text-[12px] uppercase tracking-[0.18em] font-medium text-accent">
              Why it&rsquo;s different
            </p>
            <p className="text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.2] tracking-[-0.025em]">
              Most fitness apps tell you what&rsquo;s optimal.
              <br />
              FitBash helps you find what&rsquo;s{" "}
              <em className="italic font-medium text-accent">repeatable</em>.
            </p>
          </div>
          <div className="flex flex-col gap-7 pt-3">
            {points.map(({ title, body }) => (
              <div key={title} className="flex gap-4.5">
                <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-semibold text-accent-deep">
                  →
                </div>
                <div>
                  <h4 className="mb-1.5 text-base font-semibold tracking-[-0.005em]">
                    {title}
                  </h4>
                  <p className="text-[15px] leading-[1.55] text-ink-soft">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
