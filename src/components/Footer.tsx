import { footer, getFooterNavigation } from '@/lib/content'
import { getSeason } from '@/lib/season'

export function Footer() {
  const nav = getFooterNavigation(getSeason())
  const year = new Date().getFullYear()
  return (
    <footer className="bg-charcoal border-t border-charcoal-soft py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div>
            <p className="font-serif text-parchment text-lg tracking-[0.18em] mb-4">
              {footer.brand.title}
            </p>
            <div className="text-charcoal-soft text-sm space-y-1">
              {footer.brand.lines.map((line) => (
                <p key={line} className="text-parchment/60">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow !text-brass-light mb-4">
              {footer.contact.title}
            </p>
            <div className="text-parchment/70 text-sm space-y-1">
              {footer.contact.lines.map((line) => (
                <p key={line}>
                  {line.includes('@') ? (
                    <a
                      href={`mailto:${line}`}
                      className="hover:text-parchment transition-colors"
                    >
                      {line}
                    </a>
                  ) : line.startsWith('+') ? (
                    <a
                      href={`tel:${line.replace(/\s/g, '')}`}
                      className="hover:text-parchment transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow !text-brass-light mb-4">Navigation</p>
            <nav className="grid grid-cols-2 gap-y-1.5 gap-x-6 text-sm text-parchment/70">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-parchment transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-charcoal-soft">
          <p className="text-xs text-parchment/60 leading-relaxed">
            © {year} {footer.legal}
          </p>
        </div>
      </div>
    </footer>
  )
}
