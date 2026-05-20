'use client'

import { useEffect, useState } from 'react'

/**
 * TODO: Sobald Angela das Tally-Formular eingerichtet hat, die ID hier eintragen.
 * Tally-Embed-URL: https://tally.so/embed/<TALLY_ID>?from=<ISO>&to=<ISO>
 * Felder im Tally-Formular siehe README (Anreise, Abreise, Personen, Name, Mail).
 */
const TALLY_FORM_ID: string | null = null

interface PreselectedWeek {
  from: string
  to: string
}

function parseHash(): PreselectedWeek | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.replace(/^#/, '')
  const qIndex = hash.indexOf('?')
  if (qIndex < 0) return null
  const params = new URLSearchParams(hash.slice(qIndex + 1))
  const from = params.get('from')
  const to = params.get('to')
  if (!from || !to) return null
  return { from, to }
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function ContactForm() {
  const [week, setWeek] = useState<PreselectedWeek | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setWeek(parseHash())
    const onHashChange = () => setWeek(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const mailtoBody = week
    ? `Wunschwoche%20${encodeURIComponent(formatDate(week.from))}%20bis%20${encodeURIComponent(formatDate(week.to))}%0A%0A`
    : ''
  const mailtoHref = `mailto:info@aclavigliaradons.ch?subject=Anfrage%20ACLA%20VIGLIA%20RADONS&body=${mailtoBody}`

  if (TALLY_FORM_ID && mounted) {
    const params = new URLSearchParams()
    if (week) {
      params.set('from', week.from)
      params.set('to', week.to)
    }
    const tallyUrl = `https://tally.so/embed/${TALLY_FORM_ID}?${params.toString()}&alignLeft=1&hideTitle=1&transparentBackground=1`
    return (
      <div className="bg-cream rounded-2xl overflow-hidden">
        <iframe
          src={tallyUrl}
          title="Anfrageformular ACLA VIGLIA RADONS"
          loading="lazy"
          className="w-full min-h-[640px] border-0"
        />
      </div>
    )
  }

  return (
    <div className="bg-cream p-8 md:p-10 rounded-2xl text-center border border-brass/30">
      <p className="font-serif text-2xl text-soapstone mb-4">
        Anfrage senden
      </p>
      <p className="text-larch italic max-w-xl mx-auto leading-relaxed">
        Anfrageformular wird in Kürze hier eingebettet. Bis dahin gerne per
        E-Mail an{' '}
        <a
          href={mailtoHref}
          className="text-soapstone underline underline-offset-4 hover:text-larch transition-colors"
        >
          info@aclavigliaradons.ch
        </a>
      </p>
      {week && mounted && (
        <div className="mt-6 inline-flex flex-col items-center px-6 py-4 bg-linen rounded-xl border border-brass/40">
          <p className="text-xs uppercase tracking-widest text-larch font-semibold mb-1">
            Ausgewählte Woche
          </p>
          <p className="font-serif text-soapstone text-lg">
            {formatDate(week.from)} bis {formatDate(week.to)}
          </p>
          <p className="mt-2 text-xs text-ink/70">
            Diese Daten werden im Formular vorausgefüllt, sobald es eingebettet
            ist.
          </p>
        </div>
      )}
    </div>
  )
}
