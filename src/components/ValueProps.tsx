import Image from 'next/image'
import { valueProps } from '@/lib/content'

export function ValueProps() {
  return (
    <section id="warum" className="bg-parchment py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="eyebrow mb-5">{valueProps.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">
            {valueProps.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {valueProps.cards.map((card) => (
            <article
              key={card.number}
              className="bg-cream rounded-2xl shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col gap-4 flex-1">
                <span className="font-serif text-larch text-xl">
                  {card.number}
                </span>
                <h3 className="font-serif text-xl md:text-2xl leading-snug">
                  {card.title}
                </h3>
                <p className="text-ink/80 text-base leading-relaxed">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
