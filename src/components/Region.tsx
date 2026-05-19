import Image from 'next/image'
import { region } from '@/lib/content'

export function Region() {
  return (
    <section id="region" className="bg-linen py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{region.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            {region.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {region.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-16 md:mb-24">
          {region.mosaic.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 50vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-6">
              <Image
                src={region.winter.image}
                alt={region.winter.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="eyebrow mb-4">{region.winter.label}</p>
            <ul className="space-y-2 text-ink/85 text-base leading-relaxed">
              {region.winter.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brass mt-2 flex-shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-6">
              <Image
                src="/images/region-wandern.jpeg"
                alt="Sommerwanderung im Val Surses"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="eyebrow mb-4">{region.summer.label}</p>
            <ul className="space-y-2 text-ink/85 text-base leading-relaxed">
              {region.summer.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brass mt-2 flex-shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
