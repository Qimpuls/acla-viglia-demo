import Image from 'next/image'
import { sommerumgebung } from '@/lib/content'

// Sommerumgebung: emotionale Bildsektion zwischen Sommerwoche und Haus.
// Beantwortet "Warum lohnt sich eine ganze Sommerwoche hier oben?".
// Bewusst nur die zwei stärksten Bilder (Familie am Wasser + Bergbach) statt einer
// Tourismusgalerie. Mobil gestapelt, Desktop 2er-Grid.
export function Sommerumgebung() {
  return (
    <section id="sommerumgebung" className="bg-parchment py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{sommerumgebung.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            {sommerumgebung.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {sommerumgebung.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sommerumgebung.images.map((img) => (
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
