import { ContactForm } from '@/components/ContactForm'
import { kontakt } from '@/lib/content'
import { getPublicBookings } from '@/lib/store'

export async function Kontakt() {
  const bookings = await getPublicBookings()
  return (
    <section id="kontakt" className="bg-charcoal py-16 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="eyebrow !text-brass-light mb-5">{kontakt.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl !text-parchment">
            {kontakt.headline}
          </h2>
          <ul className="mt-6 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-x-7 gap-y-2.5 text-parchment/85 text-sm md:text-base">
            {kontakt.trust.map((t) => (
              <li key={t} className="flex items-center justify-center gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="text-brass-light shrink-0"
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
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm bookings={bookings} />

        <div className="mt-12 pt-10 border-t border-charcoal-soft/60 text-center">
          <p className="eyebrow !text-brass-light/80 mb-4">
            Oder direkt per E-Mail
          </p>
          <div className="text-parchment/90 text-base leading-relaxed space-y-1">
            <p>{kontakt.hosts}</p>
            <p>{kontakt.brand}</p>
            <p>{kontakt.postal}</p>
            <p>{kontakt.region}</p>
            <p className="pt-3">
              <a
                href={kontakt.mailto}
                className="text-brass-light hover:text-parchment underline underline-offset-4 transition-colors"
              >
                {kontakt.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${kontakt.tel}`}
                className="text-brass-light hover:text-parchment underline underline-offset-4 transition-colors"
              >
                {kontakt.phone}
              </a>
            </p>
          </div>
          <p className="mt-6 text-sm text-brass-light/70 max-w-xl mx-auto leading-relaxed">
            {kontakt.note}
          </p>
        </div>
      </div>
    </section>
  )
}
