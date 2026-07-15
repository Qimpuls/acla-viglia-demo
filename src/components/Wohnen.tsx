import Image from 'next/image'
import { wohnen } from '@/lib/content'

// Verkauft das Buchungsmotiv "gemeinsame Zeit": grosses Raclette-Leitbild (Abend,
// Freunde am langen Tisch) als dominantes Bild, darunter 4 kleinere Raumkarten und
// ein dezentes Bad-Detail. Sitzt zwischen Haus und Familienleben.
export function Wohnen() {
  // Folge-Sektion im Kapitel "Das Haus": kein pt.
  return (
    <section id="wohnen" className="bg-parchment pb-14 md:pb-20 lg:pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="eyebrow mb-5">{wohnen.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            {wohnen.headline}
          </h2>
          <p className="text-ink/85 text-base md:text-lg leading-relaxed">
            {wohnen.intro}
          </p>
        </div>

        {/* Leitbild: bewusst gross, deutlich dominanter als die Raumkarten */}
        <figure className="mb-10 md:mb-14">
          <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={wohnen.hero.src}
              alt={wohnen.hero.alt}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-larch italic leading-relaxed">
            {wohnen.hero.caption}
          </figcaption>
        </figure>

        {/* 4 kleinere Raumkarten: mobil 2x2, Desktop 4 Spalten */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {wohnen.rooms.map((room) => (
            <figure key={room.src} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={room.src}
                  alt={room.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-sm text-larch italic leading-snug">
                {room.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bad: dezentes Detail, kleiner als die Raumkarten */}
        <figure className="mt-8 md:mt-10 flex items-center gap-4">
          <div className="relative w-28 h-20 md:w-36 md:h-24 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={wohnen.detail.src}
              alt={wohnen.detail.alt}
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
          <figcaption className="text-sm text-larch italic leading-relaxed">
            {wohnen.detail.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
