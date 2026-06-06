import { BookingCalendarSection } from '@/components/BookingCalendarSection'
import { verfuegbarkeit } from '@/lib/content'

export function Verfuegbarkeit() {
  return (
    <section id="verfuegbarkeit" className="bg-parchment py-16 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="eyebrow mb-5">{verfuegbarkeit.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-5">
            {verfuegbarkeit.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {verfuegbarkeit.text}
          </p>
          <a
            href={verfuegbarkeit.cta.href}
            className="mt-7 inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto"
          >
            {verfuegbarkeit.cta.label}
          </a>
        </div>

        <BookingCalendarSection />
      </div>
    </section>
  )
}
