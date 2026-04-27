import Link from "next/link";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SITE_NAME } from "@/lib/config";

export function SiteFooter() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="px-6 py-16 border-t border-hairline">
      <div className="mx-auto max-w-5xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm text-muted">
        <p>
          © {year} {SITE_NAME}
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/impressum"
                className="hover:text-ink transition-colors"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                href="/datenschutz"
                className="hover:text-ink transition-colors"
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:text-ink transition-colors"
              >
                @{INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
