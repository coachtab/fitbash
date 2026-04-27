import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum for ${SITE_NAME}.`,
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <main>
      <article className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-[28px] md:text-[40px] font-medium tracking-tight">Impressum</h1>
          <p className="mt-6 text-muted">
            Angaben gemäß § 5 TMG.
          </p>

          {/* TODO: replace placeholders with the real legal entity, address, and contact */}
          <section className="mt-10 space-y-2">
            <h2 className="text-lg font-medium">Anbieter</h2>
            <p className="text-muted">TODO — vollständiger Name / Firmenname</p>
            <p className="text-muted">TODO — Straße und Hausnummer</p>
            <p className="text-muted">TODO — PLZ und Ort, Deutschland</p>
          </section>

          <section className="mt-8 space-y-2">
            <h2 className="text-lg font-medium">Kontakt</h2>
            <p className="text-muted">E-Mail: TODO</p>
          </section>

          <section className="mt-8 space-y-2">
            <h2 className="text-lg font-medium">Verantwortlich für den Inhalt</h2>
            <p className="text-muted">TODO — Name und Anschrift gemäß § 18 Abs. 2 MStV</p>
          </section>

          <section className="mt-8 space-y-2">
            <h2 className="text-lg font-medium">Umsatzsteuer-ID</h2>
            <p className="text-muted">TODO — falls vorhanden, gemäß § 27 a UStG</p>
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
