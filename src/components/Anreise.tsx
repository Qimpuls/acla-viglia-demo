import { anreise } from '@/lib/content'
import { getSeason } from '@/lib/season'

export function Anreise() {
  const a = anreise[getSeason()]
  // Eigenes Kapitel. Winterteaser darunter bleibt parchment (seine Karte ist
  // bg-linen und wuerde auf linen verschwinden), der Farbwechsel traegt also
  // die Trennung und der Teaser braucht kein eigenes pt.
  return (
    <section
      id="anreise"
      className="bg-linen pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <p className="eyebrow mb-5">{a.eyebrow}</p>
        <h2 className="font-serif text-3xl md:text-5xl mb-6">{a.headline}</h2>
        <p className="text-ink/85 text-base md:text-lg leading-relaxed">
          {a.text}
        </p>
      </div>
    </section>
  )
}
