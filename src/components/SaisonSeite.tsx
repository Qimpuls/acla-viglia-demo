import Image from 'next/image'
import Link from 'next/link'
import { Anreise } from '@/components/Anreise'
import { Familienleben } from '@/components/Familienleben'
import { Footer } from '@/components/Footer'
import { Preise } from '@/components/Preise'
import { Sommerumgebung } from '@/components/Sommerumgebung'
import { Sommerwoche } from '@/components/Sommerwoche'
import { SubpageHeader } from '@/components/SubpageHeader'
import { ValueProps } from '@/components/ValueProps'
import { SITE_URL } from '@/app/layout'
import { saisonseiten } from '@/lib/content'
import { breadcrumbLd, lodgingLd } from '@/lib/schema'
import type { Season } from '@/lib/season'

// Ganzjährige Saisonseite. Zeigt die Edition der übergebenen Saison, unabhängig
// vom Datum, mit denselben Sektionen wie die Startseite. Die Anfrage selbst
// (Kalender, Formular) bleibt auf der Startseite, ein Weg, keine Dublette.
export function SaisonSeite({ season }: { season: Season }) {
  const s = saisonseiten[season]
  const pageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: s.headline,
    description: s.description,
    url: `${SITE_URL}${s.path}`,
    inLanguage: 'de-CH',
    about: { '@id': `${SITE_URL}/#lodging` },
    primaryImageOfPage: `${SITE_URL}${s.image}`,
  }

  return (
    <>
      <SubpageHeader />
      <main className="bg-parchment">
        <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-10 md:pb-14">
          <p className="eyebrow mb-4">{s.eyebrow}</p>
          <h1 className="font-serif text-3xl md:text-5xl text-soapstone mb-6 max-w-4xl text-balance">
            {s.headline}
          </h1>
          <p className="max-w-3xl text-ink/85 text-base md:text-lg leading-relaxed">
            {s.intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link
              href="/#verfuegbarkeit"
              className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors"
            >
              Freie Wochen prüfen
            </Link>
          </div>
          <div className="relative mt-10 md:mt-14 aspect-[16/10] sm:aspect-[2/1] w-full overflow-hidden rounded-2xl">
            <Image
              src={s.image}
              alt={s.alt}
              fill
              priority
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <ValueProps season={season} />
        <Sommerwoche season={season} ctaHref="/#verfuegbarkeit" />
        <Sommerumgebung season={season} />
        <Familienleben season={season} />
        <Preise ctaHref="/#verfuegbarkeit" />
        <Anreise season={season} />

        <section className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-20 text-center">
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors"
          >
            Unverbindlich anfragen
          </Link>
          <p className="mt-6 text-sm text-larch">
            <Link href={s.other.href} className="underline underline-offset-2 hover:text-soapstone">
              {s.other.label}
            </Link>
            {' · '}
            <Link href="/galerie" className="underline underline-offset-2 hover:text-soapstone">
              Bildergalerie
            </Link>
          </p>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(s.breadcrumb, s.path)),
        }}
      />
    </>
  )
}
