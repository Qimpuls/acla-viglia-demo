'use client'

import { useEffect, useState } from 'react'
import { brand, kontakt, getNavigation } from '@/lib/content'
import type { Season } from '@/lib/season'

// season kommt als Prop aus page.tsx (Server), damit die Season server- und
// client-seitig identisch ist (kein Hydration-Mismatch am Umschalt-Stichtag).
export function Header({ season }: { season: Season }) {
  const navigation = getNavigation(season)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = () => setOpen(false)
  const showLight = !scrolled && !open

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? 'bg-parchment border-b border-brass/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 md:h-20 flex items-center justify-between">
          <a
            href="#top"
            className="flex flex-col leading-tight"
            aria-label={brand.name}
          >
            <span
              className={`font-serif text-base md:text-xl tracking-[0.18em] ${
                showLight ? 'text-parchment' : 'text-soapstone'
              } transition-colors`}
            >
              {brand.name}
            </span>
            <span
              className={`hidden md:block text-[0.65rem] tracking-[0.2em] uppercase mt-0.5 ${
                showLight ? 'text-brass-light' : 'text-larch'
              } transition-colors`}
            >
              {brand.location}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide ${
                  showLight ? 'text-parchment' : 'text-soapstone'
                } hover:text-larch transition-colors`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={`md:hidden flex flex-col items-end gap-1.5 w-9 h-9 justify-center ${
              showLight ? 'text-parchment' : 'text-soapstone'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          >
            <span
              className={`block h-px bg-current transition-all ${
                open ? 'w-7 translate-y-1.75 rotate-45' : 'w-7'
              }`}
            />
            <span
              className={`block h-px bg-current transition-all ${
                open ? 'opacity-0 w-7' : 'w-5'
              }`}
            />
            <span
              className={`block h-px bg-current transition-all ${
                open ? 'w-7 -translate-y-1.75 -rotate-45' : 'w-7'
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`md:hidden fixed left-0 right-0 z-40 overflow-y-auto bg-parchment ${
          open ? 'block' : 'hidden'
        }`}
        style={{ top: '3.5rem', bottom: 0 }}
      >
        <nav className="flex flex-col px-6 py-12 gap-2">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="font-serif text-3xl text-soapstone py-3 border-b border-brass/30 hover:text-larch transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`tel:${kontakt.tel}`}
            onClick={handleNavClick}
            className="mt-8 bg-soapstone text-parchment px-6 py-4 rounded-full text-center font-medium hover:bg-larch transition-colors"
          >
            Anrufen
          </a>
        </nav>
      </div>
    </>
  )
}
