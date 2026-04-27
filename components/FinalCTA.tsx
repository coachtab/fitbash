import { WaitlistForm } from "./WaitlistForm";

type Props = { source: string };

export function FinalCTA({ source }: Props) {
  return (
    <section
      className="relative px-6 py-32 md:py-44 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[420px] bg-coral/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Last thing</p>
        <h2
          id="final-cta-heading"
          className="mt-6 text-[36px] md:text-[64px] lg:text-[76px] font-medium tracking-[-0.03em] leading-[1] text-balance"
        >
          One email when we launch.
          <br />
          <span className="text-muted">Nothing else.</span>
        </h2>

        <div className="mt-14 mx-auto max-w-md text-left">
          <WaitlistForm
            variant="final"
            source={source}
            submitLabel="Notify me"
            successMessage="Got you. Talk soon."
          />
        </div>

        <ul className="mt-12 inline-flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted">
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rounded-full bg-coral" />
            No spam
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rounded-full bg-coral" />
            No newsletter
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 rounded-full bg-coral" />
            No tracking pixels
          </li>
        </ul>
      </div>
    </section>
  );
}
