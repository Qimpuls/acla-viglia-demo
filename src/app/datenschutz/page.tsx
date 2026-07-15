import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { datenschutz } from '@/lib/content'

export const metadata: Metadata = {
  title: datenschutz.title,
  description:
    'Datenschutzerklärung für aclavigliaradons.ch: welche Daten das Anfrageformular übermittelt, was die Gästemeldung verlangt und wie wir messen.',
  alternates: { canonical: '/datenschutz' },
}

// Eigener schlanker Header wie auf /galerie, damit die Unterseite ohne die
// Anker-Navigation der Startseite auskommt.
export default function DatenschutzPage() {
  return (
    <>
      <header className="sticky top-0 z-20 bg-parchment/90 backdrop-blur border-b border-brass/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-soapstone text-base md:text-lg tracking-[0.18em] whitespace-nowrap"
          >
            ACLA VIGLIA RADONS
          </Link>
          <Link
            href="/"
            className="text-sm text-larch hover:text-soapstone transition-colors whitespace-nowrap"
          >
            ← Zur Startseite
          </Link>
        </div>
      </header>

      <main className="bg-parchment">
        <section className="max-w-3xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-14 md:pb-20 lg:pb-28">
          <p className="eyebrow mb-4">{datenschutz.title}</p>
          <h1 className="font-serif text-3xl md:text-5xl mb-6">
            {datenschutz.headline}
          </h1>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {datenschutz.intro}
          </p>

          <div className="mt-12 space-y-10">
            {datenschutz.sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-serif text-xl md:text-2xl mb-3">
                  {s.title}
                </h2>
                <div className="space-y-3">
                  {s.body.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="text-ink/80 text-base leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 pt-6 border-t border-brass/30 text-sm text-larch">
            {datenschutz.stand}
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}
