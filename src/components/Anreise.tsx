import { anreise } from '@/lib/content'

export function Anreise() {
  return (
    <section id="anreise" className="bg-linen py-16 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <p className="eyebrow mb-5">{anreise.eyebrow}</p>
        <h2 className="font-serif text-3xl md:text-5xl mb-6">
          {anreise.headline}
        </h2>
        <p className="text-ink/85 text-base md:text-lg leading-relaxed">
          {anreise.text}
        </p>
      </div>
    </section>
  )
}
