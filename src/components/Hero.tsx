import Image from 'next/image'
import { hero } from '@/lib/content'
import { getSeason } from '@/lib/season'

export function Hero() {
  const season = getSeason()
  const h = hero[season]
  const heroImage = h.image
  const heroAlt = h.alt
  const heroPositionClass = h.positionClass

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
          Holzfassade und Berge sichtbar bleiben (keine flächige Verdunkelung).
          Auf /95 via /60 angehoben, nachdem das wärmere, hellere Hero-Bild
          (hero-sommer-golden) den Textkontrast gesenkt hatte: H1 war von 4.73
          auf 3.63 gefallen. Mit /60 steht die H1 wieder bei ~4.1, das Bild
          bleibt rechts hell. Der Abfall nach rechts bleibt. */}
      <div className="absolute inset-0 bg-linear-to-r from-soapstone/95 via-soapstone/60 to-transparent" />
      <div className="absolute inset-0 md:hidden bg-linear-to-t from-soapstone/80 via-soapstone/20 to-transparent" />

      <div className="relative z-10 flex flex-col justify-end min-h-[70vh] md:min-h-[85vh] max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-14 md:pb-40">
        {/* text-shadow auf den zwei kleinen Goldzeilen: hebt die reale Lesbarkeit
            über dem hellen Bild, ohne das Bild weiter zu verdunkeln. Gold-Kleintext
            erreicht die WCAG-4.5-Zahl über einem Foto nie, der Schatten löst aber
            das menschliche Lesbarkeitsproblem (Sonne, schwache Augen). */}
        <p className="eyebrow text-brass-light! mb-5 [text-shadow:0_1px_4px_rgba(31,27,23,0.7)]">
          {hero.eyebrow}
        </p>
        <h1 className="font-serif text-4xl md:text-7xl text-parchment! max-w-4xl leading-[1.05] text-balance">
          {h.headline}
        </h1>
        <p className="mt-4 md:mt-5 max-w-2xl text-base md:text-xl text-parchment/95 leading-relaxed">
          {h.subline}
        </p>

        <div className="mt-5 md:mt-6">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center bg-parchment text-soapstone hover:bg-brass-light px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto"
          >
            {hero.primaryCta.label}
          </a>
        </div>

        <p className="mt-7 md:mt-9 text-xs md:text-sm text-brass-light tracking-wide leading-relaxed max-w-2xl [text-shadow:0_1px_4px_rgba(31,27,23,0.7)]">
          {hero.trust}
        </p>
      </div>
    </section>
  )
}
