'use client'

import { useState } from 'react'
import { type Booking, type BookingStatus } from '@/lib/bookings'
import {
  MONTH_NAMES,
  WEEKDAYS,
  type MonthRef,
  cellBackground,
  buildMonthWeeks,
  dayShape,
  isPastWeek,
  isWeekFree,
  shiftMonths,
  weekRange,
  ymdOf,
} from '@/lib/calendar'

const STATUS_COLOR: Record<BookingStatus, string> = {
  booked: 'var(--color-larch)',
  reserved: '#C9B66A',
  closed: '#B1564A',
}

const colorOf = (b?: Booking) =>
  STATUS_COLOR[(b?.status ?? 'booked') as BookingStatus]

// Heller Halo um die dunkle Tageszahl auf halb gefärbten (diagonalen) Zellen,
// damit sie auf der Cream-Hälfte wie auf der farbigen Hälfte lesbar bleibt.
const NUMBER_HALO =
  '0 0 2px var(--color-parchment), 0.5px 0.5px 0 var(--color-parchment), -0.5px -0.5px 0 var(--color-parchment), 0.5px -0.5px 0 var(--color-parchment), -0.5px 0.5px 0 var(--color-parchment)'

function handleWeekClick(from: string, to: string) {
  const target = document.getElementById('kontakt')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const newHash = `#kontakt?from=${from}&to=${to}`
  window.history.replaceState(null, '', newHash)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

function MonthGrid({
  year,
  month,
  bookings,
}: {
  year: number
  month: number
  bookings: Booking[]
}) {
  const weeks = buildMonthWeeks(year, month)
  // Für die Dämpfung vergangener Tage (der Kalender startet beim aktuellen
  // Monat, dessen erste Tage können bereits verstrichen sein).
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

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
        const saturdayInMonth = saturday.getMonth() === month
        // Vergangene Wochen sind nie anfragbar, auch wenn sie unbelegt sind.
        const clickable =
          saturdayInMonth &&
          !isPastWeek(saturday) &&
          isWeekFree(saturday, bookings)
        const { from, to } = weekRange(saturday)

        // outline-none entfernt: der Hintergrundwechsel allein war als
        // Fokus-Anzeige fuer eine 7-Zellen-Reihe zu schwach. Jetzt greift
        // zusaetzlich die globale :focus-visible-Regel aus globals.css.
        const rowClass = clickable
          ? 'grid grid-cols-7 cursor-pointer hover:bg-brass-light/30 focus-visible:bg-brass-light/40 transition-colors'
          : 'grid grid-cols-7'

        const rowProps = clickable
          ? {
              role: 'button' as const,
              tabIndex: 0,
              onClick: () => handleWeekClick(from, to),
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleWeekClick(from, to)
                }
              },
            }
          : {}

        return (
          <div key={rowIdx} className={rowClass} {...rowProps}>
            {clickable && (
              <span className="sr-only">
                Freie Woche vom {from} bis {to} anfragen
              </span>
            )}
            {row.map((day, colIdx) => {
              if (day.getMonth() !== month) {
                return <div key={colIdx} className="aspect-square bg-cream/60" />
              }
              const info = dayShape(ymdOf(day), bookings)
              const bg = cellBackground(info, colorOf)
              // Zweifarbiger Wechseltag (unterschiedliche Statusfarben) zählt
              // wie eine halbe Zelle für die Textbehandlung.
              const twoTone =
                info.shape === 'changeover' &&
                colorOf(info.departing) !== colorOf(info.arriving)
              // Voll gefärbt (voller Tag oder gleich-farbiger Wechseltag) → helle
              // Zahl wie bisher. Halb gefärbt → dunkle Zahl mit hellem Halo.
              const solidColored =
                info.shape === 'full' ||
                (info.shape === 'changeover' && !twoTone)
              const halfCell =
                info.shape === 'arrival' ||
                info.shape === 'departure' ||
                twoTone
              const isPast = day < startOfToday
              return (
                <div
                  key={colIdx}
                  className={`relative aspect-square flex items-center justify-center bg-cream text-[0.7rem] md:text-xs ${
                    isPast ? 'opacity-40' : ''
                  }`}
                >
                  {bg && (
                    <span className="absolute inset-0" style={{ background: bg }} />
                  )}
                  <span
                    className={`relative z-10 font-medium ${
                      solidColored ? 'text-parchment' : 'text-soapstone'
                    }`}
                    style={halfCell ? { textShadow: NUMBER_HALO } : undefined}
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

export function BookingCalendar({ bookings }: { bookings: Booking[] }) {
  const [page, setPage] = useState(0)
  // Mobile-Akkordeon: 0 = nur erste 2 Monate, 1 = +2, 2 = alle 6. Desktop zeigt
  // immer alle 6 (via md:block), die Stufen wirken nur auf Mobile.
  const [expand, setExpand] = useState(0)
  const PAGE_SIZE = 6

  // Startansicht beginnt automatisch beim aktuellen Monat, damit der
  // Kalender ohne manuelle Pflege immer aktuell bleibt.
  const now = new Date()
  const anchor: MonthRef = { year: now.getFullYear(), month: now.getMonth() }

  const months: MonthRef[] = []
  for (let i = 0; i < PAGE_SIZE; i++) {
    months.push(shiftMonths(anchor, page * PAGE_SIZE + i))
  }

  const firstLabel = `${MONTH_NAMES[months[0].month]} ${months[0].year}`
  const lastLabel = `${MONTH_NAMES[months[PAGE_SIZE - 1].month]} ${months[PAGE_SIZE - 1].year}`

  return (
    <div className="bg-linen/60 rounded-2xl p-6 md:p-10 border border-brass/30">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <p className="eyebrow mb-2">Belegungskalender</p>
          <p className="font-serif text-soapstone text-2xl md:text-3xl">
            {firstLabel} bis {lastLabel}
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm font-medium border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment hover:border-soapstone transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-soapstone disabled:hover:border-brass/50"
            aria-label="Vorherige Monate"
          >
            « zurück
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm font-medium border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment hover:border-soapstone transition-colors"
            aria-label="Nächste Monate"
          >
            weiter »
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {months.map((m, i) => {
          const mobileVis =
            i < 2
              ? 'block'
              : i < 4
                ? expand >= 1
                  ? 'block'
                  : 'hidden'
                : expand >= 2
                  ? 'block'
                  : 'hidden'
          return (
            <div key={`${m.year}-${m.month}`} className={`${mobileVis} md:block`}>
              <MonthGrid year={m.year} month={m.month} bookings={bookings} />
            </div>
          )
        })}
      </div>

      {expand < 2 && (
        <button
          type="button"
          onClick={() => setExpand((e) => e + 1)}
          className="md:hidden w-full mt-4 px-5 py-3 text-sm font-medium border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment hover:border-soapstone transition-colors"
        >
          {expand === 0
            ? 'Weitere Monate anzeigen'
            : `${MONTH_NAMES[months[4].month]} und ${MONTH_NAMES[months[5].month]} anzeigen`}
        </button>
      )}

      {/* Nach vollem Aufklappen: Vor/Zurück auch auf Mobile, damit jeder Monat
          (z. B. März 2027) erreichbar ist. Desktop nutzt die Navigation oben. */}
      {expand >= 2 && (
        <div className="md:hidden mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex-1 px-4 py-3 text-sm font-medium border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment hover:border-soapstone transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-soapstone disabled:hover:border-brass/50"
            aria-label="Vorherige Monate"
          >
            « zurück
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="flex-1 px-4 py-3 text-sm font-medium border border-brass/50 rounded-full text-soapstone hover:bg-soapstone hover:text-parchment hover:border-soapstone transition-colors"
            aria-label="Nächste Monate"
          >
            weiter »
          </button>
        </div>
      )}

      <p className="mt-6 text-sm text-larch italic">
        Klicken Sie auf eine freie Woche, um direkt anzufragen.
      </p>

      <div className="mt-6 pt-5 border-t border-brass/30">
        <div className="flex flex-wrap gap-x-6 gap-y-2 items-center text-xs text-ink/85">
          <span className="font-semibold uppercase tracking-wider text-larch text-[0.7rem]">
            Legende
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-cream border border-brass/40" />
            frei
          </span>
          <span className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5"
              style={{ backgroundColor: STATUS_COLOR.booked }}
            />
            belegt
          </span>
          <span className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 border border-brass/40"
              style={{
                background:
                  'linear-gradient(to bottom right, var(--color-larch) 50%, var(--color-cream) 50%)',
              }}
            />
            Wechseltag (Samstag)
          </span>
        </div>
        <p className="mt-3 text-xs text-larch italic">
          Wochenmiete jeweils Samstag bis Samstag. Eine farbige Woche steht
          für eine Buchung. Der Samstag ist Wechseltag: vormittags reist der
          Vorgast ab, nachmittags reist der neue Gast an.
        </p>
      </div>
    </div>
  )
}
