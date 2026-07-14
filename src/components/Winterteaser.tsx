import { winterteaser } from '@/lib/content'
import { getSeason } from '@/lib/season'

// Gegen-Teaser: im Sommer teasert er den Winter, im Winter den Sommer.
// Bewusst kompakt gehalten: die Nebensaison darf den Hauptflow nicht dominieren.
export function Winterteaser() {
  const t = winterteaser[getSeason()]
  return (
    <section id="winter" className="bg-parchment pb-16 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="bg-linen rounded-2xl border border-brass/30 p-8 md:p-12">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 className="font-serif text-2xl md:text-4xl mb-4">{t.headline}</h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed max-w-3xl">
            {t.text}
          </p>
        </div>
      </div>
    </section>
  )
}
