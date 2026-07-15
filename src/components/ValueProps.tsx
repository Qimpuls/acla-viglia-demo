import { valueProps } from '@/lib/content'
import { getSeason } from '@/lib/season'

export function ValueProps() {
  const vp = valueProps[getSeason()]
  // Kapitel "Warum und Wer" (ValueProps + Gastgeber), Grund parchment.
  // Kapitel-Anfang, deshalb mit pt. Die Folge-Sektion Gastgeber hat keins.
  //
  // pt/pb bewusst getrennt statt py-*: ein py-* mit md:-Variante wuerde ein
  // spaeteres pt-0 still ueberschreiben, weil Varianten im Stylesheet nach den
  // unvarianten Utilities stehen und bei gleicher Spezifitaet gewinnen.
  return (
    <section
      id="sommer"
      className="bg-parchment pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-20">
          <p className="eyebrow mb-5">{vp.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">
            {vp.headline}
          </h2>
        </div>

        {/* Drei Spalten erst ab lg. Auf dem iPad hoch (820/834) ergaben md:grid-cols-3
            Karten von 209px, davon 72px Polster: 137px Textspalte, achtzeilige Umbrueche
            und ~150px Totraum in den kuerzeren Karten. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {vp.cards.map((card) => (
            <article
              key={card.number}
              className="bg-cream rounded-2xl border border-brass/30 p-8 lg:p-9 flex flex-col gap-4"
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
