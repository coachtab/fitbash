import { WaitlistForm } from "./WaitlistForm";

type Props = { source: string };

export function FinalCTA({ source }: Props) {
  return (
    <section className="px-6 py-24 md:py-32" aria-labelledby="final-cta-heading">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="final-cta-heading"
          className="text-[28px] md:text-[40px] font-medium tracking-tight"
        >
          One email when we launch. Nothing else.
        </h2>
        <div className="mt-10 mx-auto w-full max-w-md text-left">
          <WaitlistForm variant="final" source={source} />
        </div>
        <ul className="mt-8 space-y-1 text-sm text-muted">
          <li>No spam.</li>
          <li>No newsletter.</li>
          <li>No tracking pixels in your inbox.</li>
        </ul>
      </div>
    </section>
  );
}
