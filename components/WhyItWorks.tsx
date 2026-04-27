export function WhyItWorks() {
  return (
    <section
      className="bg-ink text-cream px-6 py-32 md:py-40"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-on-ink">Why it works</p>
        <h2
          id="why-heading"
          className="mt-6 text-[34px] md:text-[56px] lg:text-[68px] font-medium tracking-[-0.025em] leading-[1.05] text-balance"
        >
          Most fitness apps tell you what&rsquo;s
          <span className="text-muted-on-ink"> optimal</span>.
          <br />
          We help you find what&rsquo;s
          <span className="text-coral"> enjoyable</span>.
        </h2>
        <p className="mt-12 max-w-2xl text-lg md:text-xl text-muted-on-ink leading-relaxed">
          The exercise you&rsquo;ll actually do beats the optimal one you skip. FitBash is a
          tournament of small choices — between two exercises at a time — that quietly maps
          the movements you don&rsquo;t mind, the ones you secretly like, and the ones
          you&rsquo;ll come back to without being told.
        </p>
      </div>
    </section>
  );
}
