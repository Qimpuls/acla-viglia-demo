'use client'

import { useEffect, useRef, useState } from 'react'

// Dezenter mobiler Sticky-CTA. Erscheint nur beim Scrollen nach OBEN und erst
// unterhalb des Heros. Beim Scrollen nach unten und im Kontaktbereich blendet er
// sich aus, damit er keine Inhalte dauerhaft überdeckt. Desktop: ausgeblendet.
export function StickyCta() {
  const [visible, setVisible] = useState(false)
  const lastY = useRef(0)
  const atKontakt = useRef(false)

  useEffect(() => {
    lastY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      // kleine Bewegungen ignorieren (kein Flackern)
      if (Math.abs(delta) < 6) return
      const pastHero = y > window.innerHeight * 0.7
      const scrollingUp = delta < 0
      setVisible(scrollingUp && pastHero && !atKontakt.current)
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const target = document.getElementById('kontakt')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        atKontakt.current = entry.isIntersecting
        if (entry.isIntersecting) setVisible(false)
      },
      { rootMargin: '0px 0px -40% 0px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <a
        href="#verfuegbarkeit"
        className="flex items-center justify-center h-14 bg-soapstone/95 backdrop-blur-sm text-parchment text-sm font-medium rounded-full shadow-md shadow-soapstone/15 transition-colors hover:bg-soapstone"
      >
        Verfügbarkeit prüfen
      </a>
    </div>
  )
}
