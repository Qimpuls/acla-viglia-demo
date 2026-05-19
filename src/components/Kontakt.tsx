import { kontakt } from '@/lib/content'

export function Kontakt() {
  return (
    <section id="kontakt" className="bg-charcoal py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <p className="eyebrow !text-brass-light mb-5">{kontakt.eyebrow}</p>
        <h2 className="font-serif text-3xl md:text-5xl !text-parchment mb-12">
          {kontakt.headline}
        </h2>

        <div className="text-parchment/90 text-base md:text-lg leading-relaxed space-y-1">
          <p>{kontakt.hosts}</p>
          <p>{kontakt.brand}</p>
          <p>{kontakt.postal}</p>
          <p>{kontakt.region}</p>
          <p className="pt-4">
            <a
              href={`mailto:${kontakt.email}`}
              className="text-brass-light hover:text-parchment underline underline-offset-4 transition-colors"
            >
              {kontakt.email}
            </a>
          </p>
        </div>

        <div className="mt-12">
          <a
            href={kontakt.mailto}
            className="inline-flex items-center justify-center bg-parchment text-soapstone hover:bg-brass-light px-8 py-4 rounded-full font-medium transition-colors"
          >
            {kontakt.cta}
          </a>
        </div>

        <p className="mt-8 text-sm text-brass-light/80 max-w-xl mx-auto leading-relaxed">
          {kontakt.note}
        </p>
      </div>
    </section>
  )
}
