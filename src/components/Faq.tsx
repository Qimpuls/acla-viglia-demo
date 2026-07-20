import { faq } from '@/lib/content'

// Sichtbare FAQ-Sektion. Inhalt kommt aus content.ts (faq) und speist dort
// auch das FAQPage-JSON-LD in page.tsx: eine Quelle, kein Drift. Position im
// Farbrhythmus: zwischen Winterteaser (parchment) und Kontakt (charcoal),
// deshalb linen.
export function Faq() {
  return (
    <section
      id="faq"
      className="bg-linen pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-14">
          <p className="eyebrow mb-5">{faq.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">{faq.headline}</h2>
        </div>

        <div className="bg-cream rounded-2xl border border-brass/30 divide-y divide-brass/25">
          {faq.items.map((item) => (
            <details key={item.frage} className="group px-6 md:px-8">
              <summary className="flex items-baseline justify-between gap-4 cursor-pointer list-none py-5 text-soapstone font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.frage}</span>
                {/* Plus/Minus statt Chevron: kein Icon-Import, dreht sich per CSS. */}
                <span
                  aria-hidden="true"
                  className="text-larch text-xl leading-none shrink-0 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 text-ink/85 text-base leading-relaxed max-w-prose">
                {item.antwort}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
