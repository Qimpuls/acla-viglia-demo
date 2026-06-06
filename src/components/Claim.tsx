import { claim } from '@/lib/content'

// Ruhiger Zwischenclaim, bewusst kein Sommer-Hero. Sitzt zwischen Familienleben und Gastgeber.
export function Claim() {
  return (
    <section className="bg-soapstone py-16 md:py-28">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <p className="font-serif text-parchment text-2xl md:text-4xl leading-snug">
          {claim.text}
        </p>
      </div>
    </section>
  )
}
