'use client'

import { useEffect, useMemo, useState } from 'react'
import { type Booking } from '@/lib/bookings'

interface FormState {
  anreise: string
  abreise: string
  personen: string
  name: string
  email: string
  telefon: string
  bemerkungen: string
}

const INITIAL: FormState = {
  anreise: '',
  abreise: '',
  personen: '2',
  name: '',
  email: '',
  telefon: '',
  bemerkungen: '',
}

// Schalter für die Online-Anfrage. Auf false leitet das Formular auf Telefon um
// (z. B. bei gestörtem Mailempfang), auf true ist das Mail-Formular aktiv.
const MAIL_AKTIV = true

function parseHash(): { from?: string; to?: string } {
  if (typeof window === 'undefined') return {}
  const hash = window.location.hash.replace(/^#/, '')
  const qIndex = hash.indexOf('?')
  if (qIndex < 0) return {}
  const params = new URLSearchParams(hash.slice(qIndex + 1))
  return {
    from: params.get('from') || undefined,
    to: params.get('to') || undefined,
  }
}

function formatGerman(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

function isRangeFree(from: string, to: string, list: Booking[]) {
  if (!from || !to) return true
  for (const b of list) {
    // Overlap, wenn from < b.end && to > b.start
    if (from < b.end && to > b.start) return false
  }
  return true
}

const todayIso = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function ContactForm({ bookings }: { bookings: Booking[] }) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const apply = () => {
      const { from, to } = parseHash()
      if (from || to) {
        setForm((prev) => ({
          ...prev,
          anreise: from || prev.anreise,
          abreise: to || prev.abreise,
        }))
      }
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  const rangeFree = useMemo(
    () => isRangeFree(form.anreise, form.abreise, bookings),
    [form.anreise, form.abreise, bookings],
  )

  const dateOrderValid =
    !form.anreise || !form.abreise || form.abreise > form.anreise

  const errors = {
    anreise: touched.anreise && !form.anreise ? 'Bitte Anreisedatum wählen.' : '',
    abreise:
      touched.abreise && !form.abreise
        ? 'Bitte Abreisedatum wählen.'
        : touched.abreise && !dateOrderValid
          ? 'Abreise muss nach Anreise liegen.'
          : '',
    range:
      form.anreise && form.abreise && dateOrderValid && !rangeFree
        ? 'Diese Woche ist bereits belegt. Schreiben Sie uns trotzdem, wir suchen Alternativen.'
        : '',
    name: touched.name && !form.name.trim() ? 'Bitte Ihren Namen.' : '',
    email:
      touched.email &&
      (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        ? 'Gültige E-Mail-Adresse erforderlich.'
        : '',
  }

  const formValid =
    !!form.anreise &&
    !!form.abreise &&
    dateOrderValid &&
    !!form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function buildMailto() {
    const subject = `Anfrage ACLA VIGLIA RADONS · ${formatGerman(form.anreise)} bis ${formatGerman(form.abreise)}`
    const lines = [
      'Allegra Angela und Gallus',
      '',
      'Ich möchte das Maiensäss ACLA VIGLIA RADONS anfragen:',
      '',
      `Anreise: ${formatGerman(form.anreise)}`,
      `Abreise: ${formatGerman(form.abreise)}`,
      `Anzahl Personen: ${form.personen}`,
      '',
      `Name: ${form.name}`,
      `E-Mail: ${form.email}`,
      form.telefon ? `Telefon: ${form.telefon}` : '',
      '',
      form.bemerkungen ? `Bemerkungen:\n${form.bemerkungen}` : '',
      '',
      'Beste Grüsse',
      form.name,
    ].filter(Boolean)
    const body = lines.join('\n')
    return `mailto:ferien@aclavigliaradons.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!MAIL_AKTIV) return
    setTouched({
      anreise: true,
      abreise: true,
      name: true,
      email: true,
    })
    if (!formValid) return
    setSubmitting(true)
    window.location.href = buildMailto()
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
    }, 400)
  }

  if (submitted) {
    return (
      <div className="bg-cream rounded-2xl p-10 md:p-14 text-center border border-brass/30">
        <p className="font-serif text-3xl md:text-4xl text-soapstone mb-4">
          Danke für Ihre Anfrage.
        </p>
        <p className="text-ink/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Wir haben gerade Ihr Mail-Programm geöffnet. Sobald die Nachricht
          versendet ist, melden wir uns persönlich.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(INITIAL)
            setTouched({})
            setSubmitted(false)
          }}
          className="mt-8 inline-flex items-center justify-center text-larch hover:text-soapstone text-sm font-medium underline underline-offset-4 transition-colors"
        >
          Neue Anfrage stellen
        </button>
      </div>
    )
  }

  const inputBase =
    'w-full min-w-0 bg-cream border border-brass/40 rounded-xl px-4 py-3 text-soapstone placeholder:text-larch/60 focus:outline-none focus:border-soapstone focus:ring-2 focus:ring-soapstone/15 transition-colors'
  const labelBase = 'block text-xs font-semibold uppercase tracking-widest text-larch mb-2'
  const errorBase = 'text-xs text-[#B1564A] mt-1.5'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-cream rounded-2xl p-6 md:p-10 border border-brass/30"
    >
      {/* 1 + 2: Anreise / Abreise */}
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        <div>
          <label htmlFor="anfrage-anreise" className={labelBase}>
            Anreise <span className="text-[#B1564A]">*</span>
          </label>
          <input
            id="anfrage-anreise"
            type="date"
            required
            min={todayIso()}
            value={form.anreise}
            onChange={(e) => update('anreise', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, anreise: true }))}
            className={inputBase}
          />
          {errors.anreise && <p className={errorBase}>{errors.anreise}</p>}
        </div>
        <div>
          <label htmlFor="anfrage-abreise" className={labelBase}>
            Abreise <span className="text-[#B1564A]">*</span>
          </label>
          <input
            id="anfrage-abreise"
            type="date"
            required
            min={form.anreise || todayIso()}
            value={form.abreise}
            onChange={(e) => update('abreise', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, abreise: true }))}
            className={inputBase}
          />
          {errors.abreise && <p className={errorBase}>{errors.abreise}</p>}
        </div>
      </div>

      {errors.range && (
        <p className="mt-4 px-4 py-3 rounded-lg bg-[#B1564A]/10 border border-[#B1564A]/30 text-sm text-soapstone">
          {errors.range}
        </p>
      )}

      {/* 3: Anzahl Personen */}
      <div className="mt-5">
        <label htmlFor="anfrage-personen" className={labelBase}>
          Anzahl Personen <span className="text-[#B1564A]">*</span>
        </label>
        <select
          id="anfrage-personen"
          required
          value={form.personen}
          onChange={(e) => update('personen', e.target.value)}
          className={`${inputBase} appearance-none bg-size-[1rem] bg-position-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A6039' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          }}
        >
          {[2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={String(n)}>
              {n}
            </option>
          ))}
        </select>
        <p className="text-xs text-larch mt-2">2 bis 8 Personen</p>
      </div>

      {/* 4: Name */}
      <div className="mt-5">
        <label htmlFor="anfrage-name" className={labelBase}>
          Name <span className="text-[#B1564A]">*</span>
        </label>
        <input
          id="anfrage-name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          placeholder="Vor- und Nachname"
          className={inputBase}
        />
        {errors.name && <p className={errorBase}>{errors.name}</p>}
      </div>

      {/* 5 + 6: E-Mail / Telefon */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="anfrage-email" className={labelBase}>
            E-Mail <span className="text-[#B1564A]">*</span>
          </label>
          <input
            id="anfrage-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="name@example.ch"
            className={inputBase}
          />
          {errors.email && <p className={errorBase}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="anfrage-telefon" className={labelBase}>
            Telefon
          </label>
          <input
            id="anfrage-telefon"
            type="tel"
            autoComplete="tel"
            value={form.telefon}
            onChange={(e) => update('telefon', e.target.value)}
            placeholder="+41 ..."
            className={inputBase}
          />
        </div>
      </div>

      {/* 7: Bemerkungen */}
      <div className="mt-5">
        <label htmlFor="anfrage-bemerkungen" className={labelBase}>
          Bemerkungen
        </label>
        <textarea
          id="anfrage-bemerkungen"
          rows={5}
          value={form.bemerkungen}
          onChange={(e) => update('bemerkungen', e.target.value)}
          placeholder="Hund dabei, Fragen zur Anreise, Kinderbett gewünscht oder weitere Hinweise ..."
          className={`${inputBase} resize-y`}
        />
      </div>

      {/* 8: CTA */}
      <div className="mt-8 pt-6 border-t border-brass/25">
        {MAIL_AKTIV ? (
          <>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch disabled:opacity-60 disabled:cursor-not-allowed px-8 py-4 rounded-full font-medium transition-colors w-full"
            >
              {submitting ? 'Wird gesendet…' : 'Unverbindlich anfragen'}
            </button>
            <p className="mt-4 text-sm text-ink/75 text-center leading-relaxed max-w-md mx-auto">
              Sie erhalten eine persönliche Rückmeldung von Angela oder Gallus.
            </p>
            <p className="mt-2 text-xs text-larch text-center max-w-md mx-auto">
              Ihre Daten werden ausschliesslich für die Bearbeitung der Anfrage
              verwendet.
            </p>
          </>
        ) : (
          <div className="text-center">
            <p className="text-sm font-medium text-soapstone mb-2">
              Bitte rufen Sie uns an
            </p>
            <a
              href="tel:+41793495889"
              className="inline-flex items-center justify-center bg-soapstone text-parchment hover:bg-larch px-8 py-4 rounded-full font-medium transition-colors w-full"
            >
              +41 79 349 58 89
            </a>
          </div>
        )}
      </div>
    </form>
  )
}
