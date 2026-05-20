import { BookingCalendar } from '@/components/BookingCalendar'
import { preise } from '@/lib/content'

export function Preise() {
  return (
    <section id="preise" className="bg-parchment py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{preise.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">{preise.headline}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <div className="bg-cream rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-brass/40 text-larch text-xs uppercase tracking-widest font-semibold">
                <span className="col-span-8">Saison</span>
                <span className="col-span-4 text-right">
                  Pro Tag, bis 5 Personen
                </span>
              </div>
              <ul className="divide-y divide-brass/30">
                {preise.rows.map((row) => (
                  <li
                    key={row.season}
                    className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 py-4"
                  >
                    <span className="md:col-span-8 text-soapstone font-medium">
                      {row.season}
                    </span>
                    <span className="md:col-span-4 md:text-right font-serif text-xl text-soapstone">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-brass/40 space-y-2 text-sm text-ink/85">
                {preise.notes.map((note, i) => (
                  <p key={i}>{note}</p>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-linen rounded-2xl p-6 md:p-8">
              <p className="eyebrow mb-2">{preise.perPerson.label}</p>
              <p className="font-serif text-soapstone text-lg md:text-xl leading-snug">
                {preise.perPerson.range}
              </p>
              <p className="mt-3 text-sm text-ink/75">
                {preise.perPerson.inclusion}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-serif text-xl mb-4 text-soapstone">
              Nebenkosten
            </h3>
            <ul className="divide-y divide-brass/30 border-t border-brass/40">
              {preise.costs.map((cost) => (
                <li
                  key={cost.label}
                  className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 py-3 text-sm"
                >
                  <span className="md:col-span-8 text-ink/85">
                    {cost.label}
                  </span>
                  <span className="md:col-span-4 md:text-right text-soapstone font-medium">
                    {cost.value}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink/80 leading-relaxed">
              {preise.availabilityNote}
            </p>

            <div className="mt-6">
              <a
                href={preise.cta.href}
                className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors"
              >
                {preise.cta.label}
              </a>
            </div>
          </div>
        </div>

        <BookingCalendar />
      </div>
    </section>
  )
}
