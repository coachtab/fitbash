import { StepVote, StepReveal, StepBuild } from "./illustrations/StepIcons";

const steps = [
  { Icon: StepVote, title: "Vote", body: "Pick the exercise you’d actually do." },
  { Icon: StepReveal, title: "Reveal", body: "See what everyone else picked, plus a coach’s note." },
  { Icon: StepBuild, title: "Build", body: "Your favorites become a routine you’ll actually keep." },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24 md:py-32" aria-labelledby="how-heading">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">How it works</p>
        <h2
          id="how-heading"
          className="mt-3 max-w-xl text-[26px] md:text-[34px] font-medium tracking-tight"
        >
          Three small choices a day. That&rsquo;s the whole loop.
        </h2>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {steps.map(({ Icon, title, body }, i) => (
            <li key={title} className="flex flex-col">
              <span className="text-sm tabular-nums text-coral">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-4 h-px w-10 bg-hairline" />
              <Icon className="mt-8 h-12 w-12" />
              <h3 className="mt-6 text-xl font-medium">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
