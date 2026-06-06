import Image from 'next/image'
import { sommerwoche } from '@/lib/content'

export function Sommerwoche() {
  return (
    <section id="sommerwoche" className="bg-linen py-16 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="eyebrow mb-5">{sommerwoche.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl">
            {sommerwoche.headline}
          </h2>
        </div>

        <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full overflow-hidden rounded-2xl mb-12 md:mb-16">
          <Image
            src={sommerwoche.banner.src}
            alt={sommerwoche.banner.alt}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
          />
        </div>

        <ol className="relative border-l border-brass/40 ml-1.5 max-w-2xl">
          {sommerwoche.timeline.map((item) => (
            <li key={item.time} className="relative pl-7 md:pl-8 pb-9 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-larch"
              />
              <p className="eyebrow mb-1.5">{item.time}</p>
              <p className="text-ink/85 text-base md:text-lg leading-relaxed">
                {item.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 md:mt-16">
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
