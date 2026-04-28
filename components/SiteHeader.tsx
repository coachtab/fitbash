import Link from "next/link";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/config";

export function SiteHeader() {
  return (
    <div className="mx-auto max-w-[1180px] px-7 md:px-7">
      <nav className="relative z-10 flex items-center justify-between py-7">
        <Link
          href="/"
          aria-label="FitBash, back to home"
          className="text-[22px] font-semibold tracking-[-0.025em]"
        >
          fitbash<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#how"
            className="hidden md:inline text-sm font-medium text-ink-soft hover:text-ink transition-colors"
          >
            How it works
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-2 text-[13px] font-medium text-ink hover:bg-ink hover:text-bg hover:border-ink transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @{INSTAGRAM_HANDLE}
          </a>
        </div>
      </nav>
    </div>
  );
}
