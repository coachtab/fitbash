import { INSTAGRAM_HANDLE, INSTAGRAM_URL, FOUNDER_NAME } from "@/lib/config";

export function Founder() {
  return (
    <section className="px-6 py-24 md:py-32" aria-labelledby="founder-heading">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:gap-10">
          {/* TODO: replace placeholder circle with real founder photo (square, ≥ 240px) */}
          <div
            aria-hidden
            className="h-24 w-24 shrink-0 rounded-full border border-hairline bg-paper"
          />
          <div>
            <h2
              id="founder-heading"
              className="text-[24px] md:text-[32px] font-medium tracking-tight"
            >
              Built in Berlin, tested daily on Instagram.
            </h2>
            {/* TODO: replace this placeholder bio with the founder's real first-person note */}
            <p className="mt-5 text-muted">
              I&rsquo;m {FOUNDER_NAME}. Every day I post a duel between two exercises on
              Instagram and watch what people actually pick. The patterns surprised me enough
              to start building the app you see above. It&rsquo;s in early development, made
              by one person, in public. Follow along at{" "}
              <a
                href={INSTAGRAM_URL}
                rel="noopener noreferrer"
                target="_blank"
                className="underline underline-offset-4 decoration-ink/30 hover:decoration-coral hover:text-coral transition-colors"
              >
                @{INSTAGRAM_HANDLE}
              </a>
              .
            </p>
            <p className="mt-4 text-muted">— {FOUNDER_NAME}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
