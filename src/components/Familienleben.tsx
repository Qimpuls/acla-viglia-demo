import Image from 'next/image'
import { familienleben } from '@/lib/content'
import { getSeason } from '@/lib/season'

// Regentage/graue Tage: ein grosses Leitbild (Rückzug am Fenster) dominiert, daneben
// zwei kleinere Familienbilder. Verkauft Ruhe und Rückzug, nicht eine Galerie.
export function Familienleben() {
  const fl = familienleben[getSeason()]
  const [lead, ...rest] = fl.images
  return (
    <section id="familienleben" className="bg-linen py-16 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{familienleben.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">{fl.headline}</h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {fl.text}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5 md:gap-6 md:items-stretch">
          {/* Grosses Leitbild: bewusst dominant (~65% Breite auf Desktop) */}
          <figure className="md:w-[65%] flex flex-col">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-larch italic leading-relaxed">
              {lead.caption}
            </figcaption>
          </figure>

          {/* Zwei kleinere Bilder: Desktop rechts gestapelt, Mobile darunter */}
          <div className="md:w-[35%] flex flex-col gap-5 md:gap-6">
            {rest.slice(0, 2).map((img) => (
              <figure key={img.src} className="flex flex-col">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 32vw, 100vw"
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
      </div>
    </section>
  )
}
