import Image from 'next/image'
import { hero } from '@/lib/content'

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      <Image
        src={hero.imageSummer}
        alt="ACLA VIGLIA RADONS Maiensäss im Sommer mit Bergpanorama"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/70 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-end min-h-[100svh] max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 md:pb-32">
        <p className="eyebrow !text-brass-light mb-6">{hero.eyebrow}</p>
        <h1 className="font-serif text-5xl md:text-7xl !text-parchment max-w-4xl">
          <span className="block">{hero.headlineTop}</span>
          <span className="block">{hero.headlineBottom}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-parchment/90 leading-relaxed">
          {hero.subline}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center bg-parchment text-soapstone hover:bg-brass-light px-8 py-4 rounded-full font-medium transition-colors"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center border border-parchment/70 text-parchment hover:bg-parchment hover:text-soapstone px-8 py-4 rounded-full font-medium transition-colors"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
        <p className="mt-6 text-sm text-brass-light">{hero.note}</p>
      </div>
    </section>
  )
}
