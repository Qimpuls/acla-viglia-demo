import Image from 'next/image'
import { claim, gastgeber } from '@/lib/content'

export function Gastgeber() {
  // Folge-Sektion im Kapitel "Warum und Wer": kein pt, die Trennung leistet das
  // pb von ValueProps. scroll-mt erhoeht, weil die Claim-Zeile ohne pt beim
  // Ankersprung (#gastgeber steht im Menue) sonst an der Header-Kante klebt.
  return (
    <section
      id="gastgeber"
      className="bg-parchment pb-14 md:pb-20 lg:pb-28 scroll-mt-28 md:scroll-mt-36 lg:scroll-mt-44"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Schmale, elegante Claim-Zeile statt grossem dunklem Block */}
        <div className="text-center mb-14 md:mb-20">
          <span
            aria-hidden="true"
            className="block w-10 h-px bg-brass mx-auto mb-5"
          />
          <p className="font-serif text-soapstone text-xl md:text-2xl">
            {claim.text}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-linen">
              {/* TODO: durch echtes Foto von Angela und Gallus ersetzen, sobald vorhanden.
                  Aktuell temporärer KI-Platzhalter (gastgeber-foto.png). */}
              <Image
                src={gastgeber.image}
                alt="Angela und Gallus Liesch-Lombris vor dem Maiensäss"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="eyebrow mb-5">{gastgeber.eyebrow}</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8">
              {gastgeber.headline}
            </h2>
            <div className="space-y-5 text-ink/85 text-base md:text-lg leading-relaxed">
              {gastgeber.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-8 font-serif text-larch text-xl">
              {gastgeber.signature}
            </p>
            <p className="mt-2 text-sm text-larch">{gastgeber.meta}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
