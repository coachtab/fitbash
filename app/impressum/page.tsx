import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum for ${SITE_NAME}.`,
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-[1180px] px-7 pb-24 pt-12 md:pb-32 md:pt-20">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-[clamp(36px,5vw,56px)] font-semibold tracking-[-0.035em]">
              Impressum
            </h1>
            <p className="mt-6 text-ink-soft">Angaben gemäß § 5 TMG.</p>

            <section className="mt-10 space-y-1.5">
              <h2 className="text-lg font-semibold">Anbieter</h2>
              <p className="text-ink-soft">Damian Kamara</p>
              {/* TODO: add postal address (Straße, PLZ, Ort) before public launch — required by § 5 TMG */}
            </section>

            <section className="mt-8 space-y-1.5">
              <h2 className="text-lg font-semibold">Kontakt</h2>
              <p className="text-ink-soft">
                E-Mail:{" "}
                <a
                  href="mailto:info@fitbash.de"
                  className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
                >
                  info@fitbash.de
                </a>
              </p>
            </section>

            <section className="mt-8 space-y-1.5">
              <h2 className="text-lg font-semibold">Verantwortlich für den Inhalt</h2>
              <p className="text-ink-soft">Damian Kamara</p>
            </section>

            <p className="mt-12 text-sm text-ink-mute">
              Diese Seite ist ein Platzhalter — finale Inhalte folgen vor dem Launch.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
