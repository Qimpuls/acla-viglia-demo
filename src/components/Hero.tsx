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
      {/* Links abgedunkelt für die Lesbarkeit, rechts hell, damit Maiensäss,
          Holzfassade und Berge sichtbar bleiben (keine flächige Verdunkelung). */}
      <div className="absolute inset-0 bg-linear-to-r from-soapstone/85 via-soapstone/30 to-transparent" />
      <div className="absolute inset-0 md:hidden bg-linear-to-t from-soapstone/75 via-soapstone/15 to-transparent" />

      <div className="relative z-10 flex flex-col justify-end min-h-[70vh] md:min-h-[85vh] max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-14 md:pb-24">
        <p className="eyebrow text-brass-light! mb-5">{hero.eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-6xl text-parchment! max-w-2xl leading-[1.1]">
          {hero.headline}
        </h1>
        <p className="mt-2 md:mt-3 font-serif text-brass-light! text-lg md:text-2xl max-w-2xl">
          {hero.claim}
        </p>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-parchment/95 leading-relaxed">
          {hero.subline}
        </p>

        <div className="mt-6 md:mt-7">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center bg-parchment text-soapstone hover:bg-brass-light px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto"
          >
            {hero.primaryCta.label}
          </a>
        </div>

        <p className="mt-6 md:mt-8 text-[0.7rem] md:text-xs text-brass-light/95 tracking-wide leading-relaxed max-w-2xl">
          {hero.trust}
        </p>
      </div>
    </section>
  )
}
