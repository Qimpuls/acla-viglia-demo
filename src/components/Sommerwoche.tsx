import Image from 'next/image'
import { sommerwoche } from '@/lib/content'
import { getSeason } from '@/lib/season'

export function Sommerwoche() {
  const sw = sommerwoche[getSeason()]
  // Kapitel "Die Woche" (Sommerwoche + Sommerumgebung), Grund linen, Anfang.
  return (
    <section
      id="sommerwoche"
      className="bg-linen pt-14 md:pt-20 lg:pt-28 pb-14 md:pb-20 lg:pb-28"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="eyebrow mb-5">{sw.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">{sw.headline}</h2>
        </div>

        <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full overflow-hidden rounded-2xl mb-12 md:mb-16">
          <Image
            src={sw.banner.src}
            alt={sw.banner.alt}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {sw.timeline.map((item) => (
            <div
              key={item.time}
              className="bg-cream rounded-2xl border border-brass/30 p-6"
            >
              <p className="eyebrow mb-2">{item.time}</p>
              <p className="text-ink/85 text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-14">
          <a
            href={sommerwoche.cta.href}
            className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto"
          >
            {sommerwoche.cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}
