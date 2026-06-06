import Image from 'next/image'
import { familienleben } from '@/lib/content'

// Bildsektion direkt nach dem Haus: drei reale Familienbilder mit Captions.
export function Familienleben() {
  return (
    <section id="familienleben" className="bg-linen py-16 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{familienleben.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            {familienleben.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {familienleben.text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {familienleben.images.map((img) => (
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
