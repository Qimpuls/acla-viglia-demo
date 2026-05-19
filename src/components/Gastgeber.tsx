import Image from 'next/image'
import { gastgeber } from '@/lib/content'

export function Gastgeber() {
  return (
    <section id="gastgeber" className="bg-parchment py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl bg-linen">
              <Image
                src={gastgeber.image}
                alt="Aquarell-Illustration von Angela und Gallus Liesch-Lombris vor dem Maiensäss"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs italic text-larch">
              {gastgeber.imageCaption}
            </p>
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
