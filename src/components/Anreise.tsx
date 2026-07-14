import { anreise } from '@/lib/content'
import { getSeason } from '@/lib/season'

export function Anreise() {
  const a = anreise[getSeason()]
  return (
    <section id="anreise" className="bg-linen py-16 md:py-28">
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
