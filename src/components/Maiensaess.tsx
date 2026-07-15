import { maiensaess } from '@/lib/content'

export function Maiensaess() {
  // Kapitel "Das Haus" (Maiensaess + Wohnen + Familienleben), parchment, Anfang.
  return (
    <section
      id="haus"
      className="bg-parchment pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow mb-5">{maiensaess.eyebrow}</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8">
              {maiensaess.headline}
            </h2>
            <div className="space-y-5 text-ink/85 text-base md:text-lg leading-relaxed">
              {maiensaess.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="bg-cream rounded-2xl border border-brass/30 p-7 md:p-9">
            <p className="eyebrow mb-5">Auf einen Blick</p>
            <dl className="divide-y divide-brass/30 border-t border-brass/30">
              {maiensaess.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-3 gap-4 py-3 text-sm md:text-base"
                >
                  <dt className="text-larch font-medium uppercase tracking-wider text-xs md:text-sm">
                    {fact.label}
                  </dt>
                  <dd className="col-span-2 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
