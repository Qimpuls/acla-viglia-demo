'use client'

import { useState, useTransition } from 'react'
import { type Booking, type BookingStatus } from '@/lib/bookings'
import {
  MONTH_NAMES,
  WEEKDAYS,
  type MonthRef,
  bookingForDay,
  buildMonthWeeks,
  shiftMonths,
  weekRange,
  ymdOf,
} from '@/lib/calendar'
import { logout, setWeek } from '@/app/verwaltung/actions'

type EditStatus = BookingStatus | 'frei'

const STATUS_META: Record<BookingStatus, { label: string; color: string }> = {
  booked: { label: 'Belegt', color: 'var(--color-larch)' },
  reserved: { label: 'Reserviert', color: '#C9B66A' },
  closed: { label: 'Geschlossen', color: '#B1564A' },
}

const EDIT_OPTIONS: { value: EditStatus; label: string; color: string }[] = [
  { value: 'frei', label: 'Frei', color: 'var(--color-cream)' },
  { value: 'booked', label: 'Belegt', color: 'var(--color-larch)' },
]

const PAGE_SIZE = 6

function fmt(ymd: string) {
  const [y, m, d] = ymd.split('-')
  return `${d}.${m}.${y}`
}

export function BookingAdmin({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<{ from: string; to: string } | null>(
    null,
  )
  const [status, setStatus] = useState<EditStatus>('booked')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const now = new Date()
  const anchor: MonthRef = { year: now.getFullYear(), month: now.getMonth() }
  const months: MonthRef[] = []
  for (let i = 0; i < PAGE_SIZE; i++) {
    months.push(shiftMonths(anchor, page * PAGE_SIZE + i))
  }

  const byStart = (from: string) => bookings.find((b) => b.start === from) ?? null

  function selectWeek(from: string, to: string) {
    const existing = byStart(from)
    setSelected({ from, to })
    setStatus(existing ? existing.status ?? 'booked' : 'booked')
    setNote(existing?.note ?? '')
    setMessage('')
  }

  function save() {
    if (!selected) return
    setMessage('')
    startTransition(async () => {
      const res = await setWeek({
        from: selected.from,
        to: selected.to,
        status,
        note,
      })
      if (res.ok && res.bookings) {
        setBookings(res.bookings)
        setMessage('Gespeichert.')
      } else {
        setMessage(res.error || 'Fehler beim Speichern.')
      }
    })
  }

  const sorted = [...bookings].sort((a, b) => a.start.localeCompare(b.start))

  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-brass/30 bg-cream">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="eyebrow">Acla Viglia Radons</p>
            <h1 className="font-serif text-soapstone text-xl">
              Belegung verwalten
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="px-4 py-2 text-sm border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment transition-colors"
            >
              Abmelden
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-sm text-larch mb-6">
          Klicken Sie eine Woche im Kalender an, wählen Sie den Status und
          hinterlegen Sie bei Bedarf den Kundennamen. Der Name erscheint nur
          hier im Admin, nie auf der öffentlichen Seite.
        </p>

        {/* Editor */}
        {selected && (
          <div className="mb-8 bg-cream border border-brass/40 rounded-xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="font-serif text-soapstone text-lg">
                Woche {fmt(selected.from)} – {fmt(selected.to)}
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-sm text-larch hover:text-soapstone"
              >
                Schliessen
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {EDIT_OPTIONS.map((opt) => {
                const active = status === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${
                      active
                        ? 'border-soapstone bg-soapstone text-parchment'
                        : 'border-brass/50 text-soapstone hover:border-soapstone'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-sm border border-brass/40"
                      style={{ backgroundColor: opt.color }}
                    />
                    {opt.label}
                  </button>
                )
              })}
            </div>

            <label
              htmlFor="note"
              className="block text-sm font-medium text-soapstone mb-1.5"
            >
              Kundenname / Notiz (nur intern)
            </label>
            <input
              id="note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="z.B. Familie Müller"
              disabled={status === 'frei'}
              className="w-full max-w-md px-4 py-2.5 rounded-lg border border-brass/50 bg-parchment text-ink focus:outline-none focus:ring-2 focus:ring-brass disabled:opacity-50"
            />

            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                onClick={save}
                disabled={isPending}
                className="px-6 py-2.5 rounded-full bg-soapstone text-parchment font-medium hover:bg-larch transition-colors disabled:opacity-50"
              >
                {isPending ? 'Speichern …' : 'Speichern'}
              </button>
              {message && (
                <span className="text-sm text-larch">{message}</span>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment transition-colors disabled:opacity-30"
          >
            « zurück
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment transition-colors"
          >
            weiter »
          </button>
        </div>

        {/* Kalender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {months.map((m) => (
            <MonthEditor
              key={`${m.year}-${m.month}`}
              year={m.year}
              month={m.month}
              bookings={bookings}
              selectedFrom={selected?.from ?? null}
              onSelect={selectWeek}
            />
          ))}
        </div>

        {/* Übersicht */}
        <section className="mt-10">
          <h2 className="font-serif text-soapstone text-lg mb-4">
            Alle Buchungen ({sorted.length})
          </h2>
          {sorted.length === 0 ? (
            <p className="text-sm text-larch">Noch keine Einträge.</p>
          ) : (
            <ul className="divide-y divide-brass/20 border border-brass/30 rounded-xl overflow-hidden bg-cream">
              {sorted.map((b) => {
                const meta = STATUS_META[b.status ?? 'booked']
                return (
                  <li
                    key={b.start}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-3.5 h-3.5 rounded-sm border border-brass/40 shrink-0"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span className="text-sm text-ink whitespace-nowrap">
                        {fmt(b.start)} – {fmt(b.end)}
                      </span>
                      <span className="text-sm text-larch">{meta.label}</span>
                      {b.note && (
                        <span className="text-sm text-soapstone truncate">
                          · {b.note}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => selectWeek(b.start, b.end)}
                      className="text-sm text-larch hover:text-soapstone shrink-0"
                    >
                      Bearbeiten
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

function MonthEditor({
  year,
  month,
  bookings,
  selectedFrom,
  onSelect,
}: {
  year: number
  month: number
  bookings: Booking[]
  selectedFrom: string | null
  onSelect: (from: string, to: string) => void
}) {
  const weeks = buildMonthWeeks(year, month)

  return (
    <div className="bg-cream rounded-lg overflow-hidden border border-brass/40 shadow-sm">
      <div className="bg-brass/15 text-center py-2.5 font-serif text-soapstone text-base border-b border-brass/30">
        {MONTH_NAMES[month]} {year}
      </div>
      <div className="grid grid-cols-7 text-[0.7rem] md:text-xs border-b border-brass/30">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-center py-1.5 font-semibold text-larch tracking-wider bg-cream"
          >
            {w}
          </div>
        ))}
      </div>

      {weeks.map((row, rowIdx) => {
        const saturday = row[0]
        const inMonth = saturday.getMonth() === month
        const { from, to } = weekRange(saturday)
        const isSelected = selectedFrom === from

        const rowClass = inMonth
          ? `grid grid-cols-7 cursor-pointer transition-colors ${
              isSelected
                ? 'ring-2 ring-soapstone ring-inset'
                : 'hover:bg-brass-light/30'
            }`
          : 'grid grid-cols-7'

        const rowProps = inMonth
          ? {
              role: 'button' as const,
              tabIndex: 0,
              'aria-label': `Woche vom ${from} bis ${to} bearbeiten`,
              onClick: () => onSelect(from, to),
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(from, to)
                }
              },
            }
          : {}

        return (
          <div key={rowIdx} className={rowClass} {...rowProps}>
            {row.map((day, colIdx) => {
              if (day.getMonth() !== month) {
                return <div key={colIdx} className="aspect-square bg-cream/60" />
              }
              const booking = bookingForDay(ymdOf(day), bookings)
              const color = booking
                ? STATUS_META[booking.status ?? 'booked'].color
                : null
              return (
                <div
                  key={colIdx}
                  className="relative aspect-square flex items-center justify-center bg-cream text-[0.7rem] md:text-xs"
                >
                  {color && (
                    <span
                      className="absolute inset-0"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <span
                    className={`relative z-10 font-medium ${
                      booking ? 'text-parchment' : 'text-soapstone'
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
