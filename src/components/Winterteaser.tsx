import { winterteaser } from '@/lib/content'

// Bewusst kompakt gehalten: Winter darf im Sommerflow nicht dominieren.
export function Winterteaser() {
  return (
    <section id="winter" className="bg-parchment pb-16 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="bg-linen rounded-2xl border border-brass/30 p-8 md:p-12">
          <p className="eyebrow mb-4">{winterteaser.eyebrow}</p>
          <h2 className="font-serif text-2xl md:text-4xl mb-4">
            {winterteaser.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed max-w-3xl">
            {winterteaser.text}
          </p>
        </div>
      </div>
    </section>
  )
}
