import { MockupDuel, MockupReveal, MockupCollection } from "./illustrations/PhoneMockups";

const screens: Array<{
  Mockup: (props: { className?: string }) => React.JSX.Element;
  label: string;
  caption: string;
}> = [
  { Mockup: MockupDuel, label: "01 The duel", caption: "Two cards. One question." },
  { Mockup: MockupReveal, label: "02 The reveal", caption: "How the crowd voted." },
  { Mockup: MockupCollection, label: "03 Your collection", caption: "Movements you said yes to." },
];

export function SneakPeek() {
  return (
    <section className="py-32 md:py-40" aria-labelledby="peek-heading">
      <div className="px-6 mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">A peek inside</p>
        <h2
          id="peek-heading"
          className="mt-6 max-w-2xl text-[30px] md:text-[44px] lg:text-[52px] font-medium tracking-[-0.025em] leading-[1.05] text-balance"
        >
          Three screens.
          <br />
          That&rsquo;s the whole app.
        </h2>
      </div>

      <div className="mt-20 overflow-x-auto md:overflow-visible">
        <div className="mx-auto flex w-max md:w-auto md:max-w-6xl items-end gap-10 md:gap-16 px-6 md:grid md:grid-cols-3 md:place-items-center">
          {screens.map(({ Mockup, label, caption }) => (
            <figure key={label} className="w-[280px] md:w-[300px] shrink-0">
              <Mockup className="w-full h-auto drop-shadow-[0_30px_50px_rgba(15,15,14,0.08)]" />
              <figcaption className="mt-8 space-y-1">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
                <p className="text-base text-ink">{caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
