import { valueProps } from '@/lib/content'

export function ValueProps() {
  return (
    <section id="sommer" className="bg-parchment py-16 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-20">
          <p className="eyebrow mb-5">{valueProps.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">
            {valueProps.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {valueProps.cards.map((card) => (
            <article
              key={card.number}
              className="bg-cream rounded-2xl border border-brass/30 p-8 md:p-9 flex flex-col gap-4"
            >
              <span className="font-serif text-larch text-2xl">
                {card.number}
              </span>
              <h3 className="font-serif text-xl md:text-2xl leading-snug">
                {card.title}
              </h3>
              <p className="text-ink/80 text-base leading-relaxed">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
