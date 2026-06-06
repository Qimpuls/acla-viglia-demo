import Image from 'next/image'
import { hero } from '@/lib/content'

function isWinterSeason(date = new Date()) {
  const month = date.getMonth() + 1
  return month >= 11 || month <= 4
}

export function Hero() {
  const winter = isWinterSeason()
  const heroImage = winter ? hero.imageWinter : hero.imageSummer
  const heroAlt = winter
    ? 'Verschneites Maiensäss ACLA VIGLIA RADONS im Tiefwinter mit Bergkette in Radons'
    : 'Maiensäss ACLA VIGLIA RADONS im Sommer mit Steinbock-Skulpturen und Bergpanorama in Radons'
  const heroPositionClass = winter ? 'hero-winter-pos' : 'hero-sommer-pos'

  return (
    <section
      id="top"
      className="relative min-h-[70vh] md:min-h-[85vh] w-full overflow-hidden bg-charcoal"
    >
      <Image
        src={heroImage}
        alt={heroAlt}
        fill
        sizes="100vw"
        priority
        className={`object-cover ${heroPositionClass}`}
      />
      <div className="absolute inset-0 bg-linear-to-tr from-soapstone/80 via-soapstone/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 md:right-1/3 h-2/3 bg-linear-to-t from-soapstone/85 via-soapstone/40 to-transparent" />

      <div className="relative z-10 flex flex-col justify-end min-h-[70vh] md:min-h-[85vh] max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-12 md:pb-20">
        <p className="eyebrow text-brass-light! mb-5">{hero.eyebrow}</p>
        <h1 className="font-serif text-5xl md:text-7xl text-parchment! max-w-4xl">
          <span className="block">{hero.headlineTop}</span>
          <span className="block">{hero.headlineBottom}</span>
        </h1>
        <p className="mt-5 md:mt-6 max-w-2xl text-base md:text-lg text-parchment/95 leading-relaxed">
          {hero.subline}
        </p>

        <div className="mt-7 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center bg-parchment text-soapstone hover:bg-brass-light px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-2 text-parchment/85 hover:text-parchment text-sm md:text-base font-medium underline underline-offset-[6px] decoration-parchment/40 hover:decoration-parchment self-start sm:self-auto transition-colors"
          >
            {hero.secondaryCta.label}
            <span aria-hidden="true" className="text-base">↓</span>
          </a>
        </div>

        <p className="mt-7 md:mt-10 text-[0.7rem] md:text-xs text-brass-light/95 tracking-wide leading-relaxed max-w-2xl">
          {hero.trust}
        </p>
      </div>

      <a
        href="#sommer"
        aria-label="Nach unten scrollen"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 items-center justify-center w-10 h-10 rounded-full border border-parchment/40 text-parchment/70 hover:text-parchment hover:border-parchment/70 transition-colors animate-bounce"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M4 7l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}
