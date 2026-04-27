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
        <h2 id="how-heading" className="sr-only">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-12">
          {steps.map(({ Icon, title, body }) => (
            <div key={title} className="text-center md:text-left">
              <Icon className="h-16 w-16 mx-auto md:mx-0" />
              <h3 className="mt-6 text-xl font-medium">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
