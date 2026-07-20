import { BookingCalendarSection } from '@/components/BookingCalendarSection'
import { verfuegbarkeit } from '@/lib/content'
import { availabilityText } from '@/lib/availability'
import { getPublicBookings } from '@/lib/store'

export async function Verfuegbarkeit() {
  const bookings = await getPublicBookings()
  const text = availabilityText(bookings)
  // Eigenes Kapitel und bewusst parchment: der Kalender rahmt sich mit
  // bg-linen/60. Auf linen ergaebe Linen bei 60 Prozent exakt Linen und das
  // Panel verschwaende. Der Farbwechsel gegenueber Preise quittiert ausserdem
  // den wichtigsten CTA-Sprung der Seite.
  return (
    <section
      id="verfuegbarkeit"
      className="bg-parchment pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="eyebrow mb-5">{verfuegbarkeit.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-5">
            {verfuegbarkeit.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {text}
          </p>
          <a
            href={verfuegbarkeit.cta.href}
            className="mt-7 inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto"
          >
            {verfuegbarkeit.cta.label}
          </a>
        </div>

        <BookingCalendarSection bookings={bookings} />
      </div>
    </section>
  )
}
