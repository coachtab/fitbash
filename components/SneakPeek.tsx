import { MockupDuel, MockupReveal, MockupCollection } from "./illustrations/PhoneMockups";

export function SneakPeek() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="peek-heading">
      <div className="px-6 mx-auto max-w-5xl">
        <h2 id="peek-heading" className="sr-only">
          A peek inside the app
        </h2>
      </div>
      <div className="overflow-x-auto md:overflow-visible">
        <div className="mx-auto flex w-max md:w-auto md:max-w-5xl items-end gap-8 md:gap-10 px-6 md:grid md:grid-cols-3 md:place-items-center">
          <div className="w-[240px] shrink-0">
            <MockupDuel className="w-full h-auto" />
            <p className="mt-4 text-center text-sm text-muted">The duel</p>
          </div>
          <div className="w-[240px] shrink-0">
            <MockupReveal className="w-full h-auto" />
            <p className="mt-4 text-center text-sm text-muted">The reveal</p>
          </div>
          <div className="w-[240px] shrink-0">
            <MockupCollection className="w-full h-auto" />
            <p className="mt-4 text-center text-sm text-muted">Your collection</p>
          </div>
        </div>
      </div>
    </section>
  );
}
