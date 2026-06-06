'use client'

import { useEffect, useState } from 'react'

// Dezenter mobiler Sticky-CTA. Erscheint erst nach dem Hero und blendet sich
// im Kontaktbereich aus, damit er den Absende-Button nicht überdeckt.
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false)
  const [atKontakt, setAtKontakt] = useState(false)

  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const target = document.getElementById('kontakt')
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setAtKontakt(entry.isIntersecting),
      { rootMargin: '0px 0px -40% 0px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const visible = pastHero && !atKontakt

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <a
        href="#kontakt"
        className="flex items-center justify-center bg-soapstone/95 backdrop-blur-sm text-parchment hover:bg-soapstone px-6 py-3.5 rounded-full font-medium shadow-lg shadow-soapstone/20 transition-colors"
      >
        Sommerwoche anfragen
      </a>
    </div>
  )
}
