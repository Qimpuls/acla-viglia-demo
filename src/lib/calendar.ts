import type { Booking } from '@/lib/bookings'

export const MONTH_NAMES = [
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
export const WEEKDAYS = ['SA', 'SO', 'MO', 'DI', 'MI', 'DO', 'FR']

export interface MonthRef {
  year: number
  month: number
}

export function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

export function ymd(year: number, month: number, day: number) {
  // Normalisiert auch Tage ausserhalb des Monats (z.B. day=32 -> nächster Monat)
  const d = new Date(year, month, day)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function ymdOf(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function bookingForDay(
  dateStr: string,
  list: Booking[],
): Booking | null {
  for (const b of list) {
    if (dateStr >= b.start && dateStr < b.end) return b
  }
  return null
}

export function shiftMonths(anchor: MonthRef, offset: number): MonthRef {
  const total = anchor.year * 12 + anchor.month + offset
  const year = Math.floor(total / 12)
  const month = ((total % 12) + 12) % 12
  return { year, month }
}

/**
 * Liefert die Wochen eines Monats als 7er-Reihen ab Samstag.
 * Jede Reihe enthält echte Date-Objekte (auch Tage aus Nachbarmonaten),
 * row[0] ist immer der Samstag der Woche. Tage ausserhalb des Monats
 * werden in der Anzeige gedämpft dargestellt.
 */
export function buildMonthWeeks(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1)
  // JS getDay: SO=0 ... SA=6. Abstand zum vorangehenden Samstag:
  const daysFromSaturday = (first.getDay() + 1) % 7
  const cursor = new Date(year, month, 1 - daysFromSaturday)
  const lastDay = new Date(year, month + 1, 0)

  const weeks: Date[][] = []
  while (cursor <= lastDay) {
    const row: Date[] = []
    for (let i = 0; i < 7; i++) {
      row.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(row)
  }
  return weeks
}

/** Anreise-Samstag (row[0]) und Abreise-Samstag (+7) einer Woche als ISO. */
export function weekRange(saturday: Date) {
  const end = new Date(saturday)
  end.setDate(end.getDate() + 7)
  return { from: ymdOf(saturday), to: ymdOf(end) }
}

export function isWeekFree(saturday: Date, list: Booking[]): boolean {
  for (let offset = 0; offset < 7; offset++) {
    const d = new Date(saturday)
    d.setDate(d.getDate() + offset)
    if (bookingForDay(ymdOf(d), list)) return false
  }
  return true
}
