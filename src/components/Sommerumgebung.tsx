import Image from 'next/image'
import { sommerumgebung } from '@/lib/content'
import { getSeason } from '@/lib/season'

// Saisonale Bildsektion zwischen Saisonwoche und Haus. Beantwortet "Warum lohnt
// sich eine ganze Woche hier oben?". Bewusst wenige, starke Bilder statt einer
// Tourismusgalerie. Im Winter zusätzlich ein breites Leitbild über dem 2er-Grid.
export function Sommerumgebung() {
  const su = sommerumgebung[getSeason()]
  // Folge-Sektion im Kapitel "Die Woche": linen statt parchment (schliesst das
  // Kapitel mit Sommerwoche zusammen), kein pt. Enthaelt keine Karten, deshalb
  // ist der Farbwechsel gefahrlos.
  return (
    <section
      id="sommerumgebung"
      className="bg-linen pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{su.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">{su.headline}</h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {su.intro}
          </p>
        </div>

        {su.leitbild && (
          <figure className="mb-6 flex flex-col">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
              <Image
                src={su.leitbild.src}
                alt={su.leitbild.alt}
                fill
                sizes="(min-width: 768px) 72rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-larch italic leading-relaxed">
              {su.leitbild.caption}
            </figcaption>
          </figure>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {su.images.map((img) => (
            <figure key={img.src} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-larch italic leading-relaxed">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
