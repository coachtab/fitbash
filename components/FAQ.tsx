const faqs = [
  {
    q: "When does the app launch?",
    a: "We don't have a fixed date — it ships when it's good enough that we'd use it ourselves. Leave your email and we'll write to you the moment it's ready, not a day sooner.",
  },
  {
    q: "What does it cost?",
    a: "Free at launch. A premium tier with custom routines and progress tracking comes later — the daily duel and your collection will stay free.",
  },
  {
    q: "Is it for beginners?",
    a: "Yes. Onboarding adapts to your level and the equipment you have, which can be nothing at all. The duel format works the same whether you've trained for a decade or a week.",
  },
  {
    q: "What language is it in?",
    a: "German and English from day one.",
  },
];

export function FAQ() {
  return (
    <section className="px-6 py-24 md:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">FAQ</p>
        <h2
          id="faq-heading"
          className="mt-3 text-[28px] md:text-[40px] font-medium tracking-tight"
        >
          Questions worth answering.
        </h2>
        <div className="mt-12 border-t border-hairline">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium transition-colors hover:text-coral">
                <span>{q}</span>
                <span
                  aria-hidden
                  className="grid h-6 w-6 shrink-0 place-items-center text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                    <path d="M6 1 V11 M1 6 H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
