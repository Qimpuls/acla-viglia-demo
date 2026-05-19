import Image from 'next/image'
import { maiensaess } from '@/lib/content'

export function Maiensaess() {
  return (
    <section id="maiensaess" className="bg-linen py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="eyebrow mb-5">{maiensaess.eyebrow}</p>
            <h2 className="font-serif text-3xl md:text-5xl mb-8">
              {maiensaess.headline}
            </h2>
            <div className="space-y-5 text-ink/85 text-base md:text-lg leading-relaxed">
              {maiensaess.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <dl className="mt-10 divide-y divide-brass/40 border-t border-brass/40">
              {maiensaess.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-3 gap-4 py-3 text-sm md:text-base"
                >
                  <dt className="text-larch font-medium uppercase tracking-wider text-xs md:text-sm">
                    {fact.label}
                  </dt>
                  <dd className="col-span-2 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 h-fit lg:sticky lg:top-28">
            {maiensaess.gallery.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/5] overflow-hidden rounded-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <p className="eyebrow mb-5">Details</p>
          <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-thin pb-3 -mx-6 px-6 md:mx-0 md:px-0">
            {maiensaess.details.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] w-72 md:w-80 flex-shrink-0 overflow-hidden rounded-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
