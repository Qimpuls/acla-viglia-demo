import Image from 'next/image'
import { anreise } from '@/lib/content'

export function Anreise() {
  return (
    <section id="anreise" className="bg-linen py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{anreise.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">
            {anreise.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {anreise.cards.map((card) => (
            <article
              key={card.season}
              className="bg-cream rounded-2xl overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col gap-4 flex-1">
                <p className="eyebrow">{card.season}</p>
                <p className="text-ink/85 text-base leading-relaxed">
                  {card.body}
                </p>
                {card.bullets && (
                  <ul className="space-y-3 text-ink/85 text-base leading-relaxed mt-2">
                    {card.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-brass mt-2 flex-shrink-0">·</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-larch italic max-w-3xl">
          {anreise.note}
        </p>
      </div>
    </section>
  )
}
