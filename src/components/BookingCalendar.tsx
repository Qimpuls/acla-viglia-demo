'use client'

import { useState } from 'react'
import {
  bookings,
  calendarAnchor,
  type Booking,
  type BookingStatus,
} from '@/lib/bookings'

const MONTH_NAMES = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
]

// Wochenstart Samstag: SA SO MO DI MI DO FR
const WEEKDAYS = ['SA', 'SO', 'MO', 'DI', 'MI', 'DO', 'FR']

const STATUS_COLOR: Record<BookingStatus, string> = {
  booked: 'var(--color-larch)',
  reserved: '#C9B66A',
  closed: '#B1564A',
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

function ymd(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

function getBookingForDay(
  year: number,
  month: number,
  day: number,
  list: Booking[],
): Booking | null {
  const dateStr = ymd(year, month, day)
  for (const b of list) {
    // Buchung deckt die Nächte ab: start (Anreise) inkl., end (Abreise) exkl.
    if (dateStr >= b.start && dateStr < b.end) return b
  }
  return null
}

function MonthGrid({ year, month }: { year: number; month: number }) {
  const first = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0).getDate()
  // Wochenstart Samstag: SA=0, SO=1, MO=2 … FR=6
  // JS getDay(): SO=0, MO=1, DI=2, MI=3, DO=4, FR=5, SA=6
  const startWeekday = (first.getDay() + 1) % 7

  const cells: (number | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= lastDay; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="bg-cream rounded-lg overflow-hidden border border-brass/40 shadow-sm">
      <div className="bg-brass/15 text-center py-2.5 font-serif text-soapstone text-base border-b border-brass/30">
        {MONTH_NAMES[month]} {year}
      </div>
      <div className="grid grid-cols-7 text-[0.7rem] md:text-xs">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-center py-1.5 font-semibold text-larch tracking-wider border-b border-brass/30 bg-cream"
          >
            {w}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={i} className="aspect-square bg-cream/60" />
          }
          const booking = getBookingForDay(year, month, day, bookings)
          const isBooked = booking !== null

          return (
            <div
              key={i}
              className="relative aspect-square flex items-center justify-center bg-cream"
            >
              {booking && (
                <span
                  className="absolute inset-0"
                  style={{
                    backgroundColor:
                      STATUS_COLOR[(booking.status ?? 'booked') as BookingStatus],
                  }}
                />
              )}
              <span
                className={`relative z-10 text-[0.7rem] md:text-xs font-medium ${
                  isBooked ? 'text-parchment' : 'text-soapstone'
                }`}
              >
                {day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface MonthRef {
  year: number
  month: number
}

function shiftMonths(anchor: MonthRef, offset: number): MonthRef {
  const total = anchor.year * 12 + anchor.month + offset
  const year = Math.floor(total / 12)
  const month = ((total % 12) + 12) % 12
  return { year, month }
}

export function BookingCalendar() {
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 6

  const months: MonthRef[] = []
  for (let i = 0; i < PAGE_SIZE; i++) {
    months.push(shiftMonths(calendarAnchor, page * PAGE_SIZE + i))
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
        <div className="flex gap-2">
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
        {months.map((m) => (
          <MonthGrid key={`${m.year}-${m.month}`} year={m.year} month={m.month} />
        ))}
      </div>

      <div className="mt-8 pt-5 border-t border-brass/30">
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
        </div>
        <p className="mt-3 text-xs text-larch italic">
          Wochenmiete jeweils Samstag bis Samstag. Eine farbige Woche steht
          für eine Buchung.
        </p>
      </div>
    </div>
  )
}
