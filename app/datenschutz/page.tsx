import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung für ${SITE_NAME}.`,
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <main>
      <article className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-[28px] md:text-[40px] font-medium tracking-tight">
            Datenschutz
          </h1>
          <p className="mt-6 text-muted">
            Wir nehmen den Schutz Ihrer Daten ernst und halten uns an die DSGVO.
          </p>

          {/* TODO: replace placeholders with full DSGVO-conformant policy reviewed by legal */}
          <section className="mt-10 space-y-3">
            <h2 className="text-lg font-medium">Welche Daten wir speichern</h2>
            <p className="text-muted">
              Wenn Sie sich auf die Warteliste eintragen, speichern wir Ihre E-Mail-Adresse,
              den Zeitpunkt Ihrer Einwilligung, die Sprache Ihres Browsers (Accept-Language)
              sowie eine optionale Quellenangabe (z.&nbsp;B. <code>?ref=instagram</code>). Mehr
              nicht.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-lg font-medium">Warum wir das speichern</h2>
            <p className="text-muted">
              Ausschließlich, um Sie genau einmal zu informieren, sobald die App startet.
              Keine Newsletter, keine weiteren Mailings, keine Weitergabe an Dritte.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-lg font-medium">Analyse</h2>
            <p className="text-muted">
              Wir verwenden Plausible Analytics — datenschutzfreundlich, ohne Cookies, ohne
              persönliche Daten. Ein Cookie-Banner ist deshalb nicht erforderlich.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-lg font-medium">Ihre Rechte</h2>
            <p className="text-muted">
              Sie können jederzeit Ihre Daten löschen lassen. Schreiben Sie uns dazu an die im
              Impressum genannte E-Mail-Adresse. TODO — formelle Auflistung gemäß Art. 15–22
              DSGVO.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-lg font-medium">Verantwortlicher</h2>
            <p className="text-muted">TODO — Name und Anschrift, siehe Impressum.</p>
          </section>

          <p className="mt-12 text-sm text-muted">
            Diese Seite ist ein Platzhalter — finale Inhalte folgen vor dem Launch.
          </p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
