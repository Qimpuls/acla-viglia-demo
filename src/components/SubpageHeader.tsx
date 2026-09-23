import Link from 'next/link'

// Heller Kopf für Unterseiten ohne Vollbild-Hero (/galerie, /sommer, /winter, /datenschutz).
// Der Startseiten-Header ist transparent und braucht das dunkle Hero-Bild.
export function SubpageHeader() {
  return (
    <header className="sticky top-0 z-20 bg-parchment/90 backdrop-blur border-b border-brass/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 md:h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-soapstone text-base md:text-lg tracking-[0.14em] md:tracking-[0.18em] whitespace-nowrap"
        >
          ACLA VIGLIA RADONS
        </Link>
        <Link
          href="/"
          className="text-sm text-larch hover:text-soapstone transition-colors whitespace-nowrap"
        >
          ← Zur Startseite
        </Link>
      </div>
    </header>
  )
}
