import { empfehlungen } from '@/lib/content'

export function Empfehlungen() {
  return (
    <section className="bg-parchment py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{empfehlungen.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            {empfehlungen.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {empfehlungen.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {empfehlungen.cards.map((card) => (
            <article
              key={card.title}
              className="bg-cream rounded-2xl p-8 shadow-sm flex flex-col gap-4"
            >
              <p className="eyebrow">{card.eyebrow}</p>
              <h3 className="font-serif text-xl md:text-2xl leading-snug">
                {card.title}
              </h3>
              <p className="text-ink/80 text-base leading-relaxed">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm italic text-larch text-center max-w-2xl mx-auto">
          {empfehlungen.footnote}
        </p>
      </div>
    </section>
  )
}
