import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 px-6 pt-6 md:pt-8">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-base font-medium tracking-tight"
          aria-label="FitBash, back to top"
        >
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-coral" />
          fitbash
        </a>
        <a
          href={INSTAGRAM_URL}
          rel="noopener noreferrer"
          target="_blank"
          className="text-sm text-muted hover:text-ink transition-colors"
        >
          @{INSTAGRAM_HANDLE} <span aria-hidden>↗</span>
        </a>
      </div>
    </header>
  );
}
