import { ContactForm } from '@/components/ContactForm'
import { kontakt } from '@/lib/content'
import { getPublicBookings } from '@/lib/store'

export async function Kontakt() {
  const bookings = await getPublicBookings()
  // Kapitel "Kontakt" (mit Footer), charcoal.
  return (
    <section
      id="kontakt"
      className="bg-charcoal pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="eyebrow !text-brass-light mb-5">{kontakt.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl !text-parchment">
            {kontakt.headline}
          </h2>
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
