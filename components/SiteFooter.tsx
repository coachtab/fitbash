import Link from "next/link";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PUBLIC_CONTACT_EMAIL } from "@/lib/config";

export function SiteFooter() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="border-t border-line py-9">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:flex-wrap">
          <div className="flex items-center gap-4.5 text-sm text-ink-mute">
            <span className="text-base font-semibold tracking-[-0.025em]">
              fitbash<span className="text-accent">.</span>
            </span>
            <span>© {year} · Berlin</span>
          </div>
          <div className="flex flex-wrap gap-x-5.5 gap-y-2 text-sm">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-accent transition-colors"
            >
              @{INSTAGRAM_HANDLE}
            </a>
            <a
              href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
              className="text-ink-soft hover:text-accent transition-colors"
            >
              {PUBLIC_CONTACT_EMAIL}
            </a>
            <Link
              href="/datenschutz"
              className="text-ink-soft hover:text-accent transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/impressum"
              className="text-ink-soft hover:text-accent transition-colors"
            >
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
