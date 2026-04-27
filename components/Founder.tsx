import { INSTAGRAM_HANDLE, INSTAGRAM_URL, FOUNDER_NAME } from "@/lib/config";

export function Founder() {
  return (
    <section className="px-6 py-32 md:py-40" aria-labelledby="founder-heading">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Big initial as a graphic anchor — replaces the placeholder photo circle */}
        <div className="md:col-span-4">
          <div
            aria-hidden
            className="text-[140px] md:text-[200px] leading-[0.85] font-medium tracking-[-0.04em] text-coral select-none"
          >
            {FOUNDER_NAME.charAt(0)}.
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">The story so far</p>
        </div>

        <div className="md:col-span-8">
          <h2
            id="founder-heading"
            className="text-[28px] md:text-[44px] font-medium tracking-[-0.025em] leading-[1.1] text-balance"
          >
            Built in Berlin.
            <br />
            Tested daily on Instagram.
          </h2>
          {/* TODO: replace this placeholder bio with the founder's real first-person note */}
          <p className="mt-8 text-lg text-muted leading-relaxed">
            I&rsquo;m {FOUNDER_NAME}. Every day I post a duel between two exercises on Instagram
            and watch what people actually pick. The patterns surprised me enough to start
            building the app you see above. It&rsquo;s in early development, made by one person,
            in public.
          </p>
          <p className="mt-6 text-muted">
            Follow along at{" "}
            <a
              href={INSTAGRAM_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="text-ink underline decoration-coral decoration-2 underline-offset-4 hover:text-coral transition-colors"
            >
              @{INSTAGRAM_HANDLE}
            </a>
            .
          </p>
          <p className="mt-12 text-sm text-muted">— {FOUNDER_NAME}</p>
        </div>
      </div>
    </section>
  );
}
