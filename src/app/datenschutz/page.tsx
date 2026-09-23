import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { SubpageHeader } from '@/components/SubpageHeader'
import { datenschutz } from '@/lib/content'
import { breadcrumbLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: datenschutz.title,
  description:
    'Datenschutzerklärung für aclavigliaradons.ch: welche Daten das Anfrageformular übermittelt, was die Gästemeldung verlangt und wie wir messen.',
  alternates: { canonical: '/datenschutz' },
}

// Schlanker Unterseiten-Header, ohne die Anker-Navigation der Startseite.
export default function DatenschutzPage() {
  return (
    <>
      <SubpageHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(datenschutz.title, '/datenschutz')),
        }}
      />

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
