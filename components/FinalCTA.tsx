import { WaitlistForm } from "./WaitlistForm";

type Props = { source: string };

export function FinalCTA({ source }: Props) {
  return (
    <section className="border-t border-line px-7 pb-30 pt-25 md:pb-32 md:pt-28 text-center">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="mx-auto mb-5 max-w-[16ch] font-serif text-[clamp(36px,5.5vw,64px)] font-normal leading-[1.05] tracking-[-0.03em]">
          Be among the first <em className="italic text-accent">500</em>.
        </h2>
        <p className="mb-10 text-lg text-ink-soft">
          Lifetime free access for early supporters. Drop your email, we&rsquo;ll send the
          launch invite.
        </p>
        <div className="mx-auto inline-block text-left">
          <WaitlistForm
            source={source}
            submitLabel="Reserve my spot"
            successTitle="Spot reserved."
            successBody="Watch your inbox — we'll be in touch."
            duplicateTitle="Spot already reserved."
            duplicateBody="This email is already on the waitlist. We'll be in touch."
          />
        </div>
      </div>
    </section>
  );
}
