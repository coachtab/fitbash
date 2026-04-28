import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung für ${SITE_NAME}.`,
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-[1180px] px-7 pb-24 pt-12 md:pb-32 md:pt-20">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-[clamp(36px,5vw,56px)] font-semibold tracking-[-0.035em]">
              Datenschutz
            </h1>
            <p className="mt-6 text-ink-soft">
              Wir nehmen den Schutz Ihrer Daten ernst und halten uns an die DSGVO.
            </p>

            <section className="mt-10 space-y-3">
              <h2 className="text-lg font-semibold">Welche Daten wir speichern</h2>
              <p className="text-ink-soft">
                Wenn Sie sich auf die Warteliste eintragen, speichern wir Ihre E-Mail-Adresse,
                den Zeitpunkt Ihrer Einwilligung, die Sprache Ihres Browsers (Accept-Language)
                sowie eine optionale Quellenangabe (z.&nbsp;B. <code>?ref=instagram</code>).
                Mehr nicht.
              </p>
            </section>

            <section className="mt-8 space-y-3">
              <h2 className="text-lg font-semibold">Warum wir das speichern</h2>
              <p className="text-ink-soft">
                Ausschließlich, um Sie genau einmal zu informieren, sobald die App startet.
                Keine Newsletter, keine weiteren Mailings, keine Weitergabe an Dritte.
              </p>
            </section>

            <section className="mt-8 space-y-3">
              <h2 className="text-lg font-semibold">Analyse</h2>
              <p className="text-ink-soft">
                Wir verwenden Plausible Analytics — datenschutzfreundlich, ohne Cookies, ohne
                persönliche Daten. Ein Cookie-Banner ist deshalb nicht erforderlich.
              </p>
            </section>

            <section className="mt-8 space-y-3">
              <h2 className="text-lg font-semibold">Ihre Rechte</h2>
              <p className="text-ink-soft">
                Sie haben uns gegenüber folgende Rechte hinsichtlich der Sie betreffenden
                personenbezogenen Daten:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-ink-soft marker:text-accent">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht, der Verarbeitung jederzeit zu widersprechen (Art. 21 DSGVO)</li>
                <li>
                  Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung
                  beruhenden Entscheidung unterworfen zu werden (Art. 22 DSGVO)
                </li>
              </ul>
              <p className="text-ink-soft">
                Sie können jederzeit Ihre Daten löschen lassen. Schreiben Sie uns dazu an{" "}
                <a
                  href="mailto:info@fitbash.de"
                  className="text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
                >
                  info@fitbash.de
                </a>
                {" "}— wir bestätigen die Löschung unverzüglich.
              </p>
              <p className="text-ink-soft">
                Darüber hinaus steht Ihnen das Recht zu, sich bei der zuständigen
                Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
              </p>
            </section>

            <section className="mt-8 space-y-3">
              <h2 className="text-lg font-semibold">Verantwortlicher</h2>
              <p className="text-ink-soft">Damian Kamara, siehe Impressum.</p>
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
