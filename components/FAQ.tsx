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
        <h2
          id="faq-heading"
          className="text-[24px] md:text-[32px] font-medium tracking-tight mb-10"
        >
          Questions
        </h2>
        <div className="divide-y divide-hairline border-y border-hairline">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                <span>{q}</span>
                <span
                  aria-hidden
                  className="text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
