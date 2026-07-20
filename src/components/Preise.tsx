import { preise } from '@/lib/content'

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="text-larch shrink-0 mt-0.5"
    >
      <path
        d="M3 8.5l3.2 3.2L13 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Preise() {
  return (
    <section
      id="preise"
      className="bg-linen pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="eyebrow mb-5">{preise.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-5">
            {preise.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {preise.intro}
          </p>
        </div>

        <div className="bg-cream rounded-2xl border border-brass/30 p-8 md:p-12 mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="eyebrow mb-3">{preise.priceBox.label}</p>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-larch text-2xl md:text-3xl">
                {preise.priceBox.prefix}
              </span>
              <span className="font-serif text-soapstone text-5xl md:text-7xl tracking-tight">
                {preise.priceBox.amount}
              </span>
              <span className="font-serif text-soapstone text-2xl md:text-3xl">
                {preise.priceBox.unit}
              </span>
            </p>
            <p className="mt-3 text-base text-ink/80">{preise.priceBox.subline}</p>
            <p className="mt-1 text-sm text-larch">{preise.priceBox.hint}</p>
          </div>
          <a
            href={preise.cta.href}
            className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors whitespace-nowrap w-full md:w-auto"
          >
            {preise.cta.label}
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Saisonübersicht</p>
            <div className="bg-cream rounded-2xl border border-brass/30 overflow-hidden">
              <ul className="divide-y divide-brass/25">
                {preise.seasons.map((season) => (
                  <li
                    key={season.label}
                    className="grid grid-cols-12 gap-3 items-center px-6 py-4"
                  >
                    <div className="col-span-7 md:col-span-8">
                      <p className="text-soapstone font-medium">
                        {season.label}
                      </p>
                      <p className="text-xs text-larch mt-0.5">
                        {season.zeitraum}
                      </p>
                    </div>
                    {/* Nachtpreis bleibt der Anker, Wochenpreis ergaenzt ihn ruhig. */}
                    <div className="col-span-5 md:col-span-4 text-right">
                      <p className="font-serif text-xl md:text-2xl text-soapstone leading-tight">
                        {season.price}
                      </p>
                      <p className="text-xs text-larch mt-1">
                        {season.week} pro Woche
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-xs text-larch">{preise.perDayNote}</p>
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">{preise.inklusive.label}</p>
            <div className="bg-cream rounded-2xl border border-brass/30 p-6 md:p-8">
              <ul className="space-y-3">
                {preise.inklusive.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm md:text-base text-ink/85">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="eyebrow mt-8 mb-4">{preise.zusatzkosten.label}</p>
            <ul className="divide-y divide-brass/25 border-t border-brass/30">
              {preise.zusatzkosten.items.map((item) => (
                <li
                  key={item.label}
                  className="grid grid-cols-12 gap-2 py-3 text-sm"
                >
                  <span className="col-span-7 text-ink/85">{item.label}</span>
                  <span className="col-span-5 text-right text-soapstone font-medium">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            {/* Die Kurtaxe ist keine reine Zusatzkost: sie bringt die Gaestekarte.
                Betriebszeiten bewusst nicht hier, sondern verlinkt: sie aendern
                jaehrlich und wuerden auf der Seite still veralten. */}
            <p className="mt-4 text-sm text-ink/75 leading-relaxed">
              {preise.zusatzkosten.note}{' '}
              <a
                href={preise.zusatzkosten.noteLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-larch underline underline-offset-2 hover:text-soapstone transition-colors"
              >
                {preise.zusatzkosten.noteLink.label}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
