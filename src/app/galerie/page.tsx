import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { galerie } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Bildergalerie',
  description:
    'Bildergalerie des Maiensäss Acla Viglia in Radons über Savognin: Haus, Innenräume, Sommer und Winter im Parc Ela.',
  alternates: { canonical: '/galerie' },
}

export default function GaleriePage() {
  return (
    <>
      <header className="sticky top-0 z-20 bg-parchment/90 backdrop-blur border-b border-brass/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-soapstone text-base md:text-lg tracking-[0.18em]"
          >
            ACLA VIGLIA RADONS
          </Link>
          <Link
            href="/"
            className="text-sm text-larch hover:text-soapstone transition-colors"
          >
            ← Zur Startseite
          </Link>
        </div>
      </header>

      <main className="bg-parchment">
        <section className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-4 md:pb-8">
          <p className="eyebrow mb-4">{galerie.eyebrow}</p>
          <h1 className="font-serif text-3xl md:text-5xl text-soapstone mb-5">
            {galerie.headline}
          </h1>
          <p className="max-w-2xl text-ink/85 text-base md:text-lg leading-relaxed">
            {galerie.intro}
          </p>
        </section>

        {galerie.groups.map((group) => (
          <section
            key={group.title}
            className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl text-soapstone mb-6 md:mb-8">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {group.images.map((img) => (
                <figure key={img.src} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brass/30 bg-cream">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-2.5 text-sm text-larch">
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}

        <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 text-center">
          <a
            href="/#verfuegbarkeit"
            className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors"
          >
            Verfügbarkeit prüfen
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}
