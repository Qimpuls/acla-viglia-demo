import Link from 'next/link'
import { brand, kontakt } from '@/lib/content'

// Ohne diese Datei zeigt Next die englische Systemseite "404 · This page could
// not be found" ohne Marke und ohne Weg zurueck. Das zaehlt hier besonders,
// weil next.config.ts Alt-Pfade des sentiero.ch-Inserats umleitet: jeder nicht
// abgedeckte Fremdlink und jeder Tippfehler landet sonst in einer Sackgasse.
export default function NotFound() {
  return (
    <main className="bg-charcoal min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-6 md:px-12 py-20 text-center">
        <p className="eyebrow text-brass-light! mb-5">Seite nicht gefunden</p>
        <h1 className="font-serif text-3xl md:text-5xl text-parchment! mb-6 text-balance">
          Diese Seite gibt es nicht mehr.
        </h1>
        <p className="text-parchment/85 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Vielleicht hat sich die Adresse geändert. Auf der Startseite finden Sie
          das Haus, die Preise und die freien Wochen.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-parchment text-soapstone hover:bg-brass-light px-8 py-4 rounded-full font-medium transition-colors"
          >
            Zur Startseite
          </Link>
          <Link
            href="/galerie"
            className="inline-flex items-center justify-center border border-brass/40 text-parchment hover:border-brass px-8 py-4 rounded-full font-medium transition-colors"
          >
            Zur Galerie
          </Link>
        </div>

        <p className="mt-10 text-sm text-brass-light leading-relaxed">
          Lieber direkt fragen? {kontakt.hosts} erreichen Sie unter{' '}
          <a
            href={`tel:${kontakt.phone.replace(/\s/g, '')}`}
            className="underline underline-offset-4 hover:text-parchment transition-colors"
          >
            {kontakt.phone}
          </a>{' '}
          oder{' '}
          <a
            href={`mailto:${brand.email}`}
            className="underline underline-offset-4 hover:text-parchment transition-colors"
          >
            {brand.email}
          </a>
          .
        </p>
      </div>
    </main>
  )
}
