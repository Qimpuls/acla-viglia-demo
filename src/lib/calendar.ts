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

// Form eines Tages im Kalender. Verfügbarkeit ist nach Nächten modelliert
// (halboffenes Intervall [start, end)). Der Wechseltag Samstag gehört zwei
// Parteien: vormittags reist der Vorgast ab (departing), nachmittags reist
// der neue Gast an (arriving). Deshalb werden An-/Abreise-/Wechseltage als
// halbe (diagonal geteilte) Zellen dargestellt, Innentage voll.
export type DayShape = 'free' | 'full' | 'arrival' | 'departure' | 'changeover'

export interface DayShapeInfo {
  shape: DayShape
  arriving?: Booking // b.start === dateStr (Anreise, Nachmittag belegt)
  departing?: Booking // b.end === dateStr (Abreise, Vormittag belegt)
  occupying?: Booking // b.start < dateStr < b.end (Innentag, ganz belegt)
}

export function dayShape(dateStr: string, list: Booking[]): DayShapeInfo {
  let arriving: Booking | undefined
  let departing: Booking | undefined
  let occupying: Booking | undefined
  for (const b of list) {
    if (b.start === dateStr) arriving = b
    else if (b.end === dateStr) departing = b
    else if (dateStr > b.start && dateStr < b.end) occupying = b
  }
  // Vorrang: ein echter Innentag degradiert jede Fehl-Überlappung sicher zu "voll".
  if (occupying) return { shape: 'full', occupying }
  if (arriving && departing) return { shape: 'changeover', arriving, departing }
  if (arriving) return { shape: 'arrival', arriving }
  if (departing) return { shape: 'departure', departing }
  return { shape: 'free' }
}

// Die freie Hälfte MUSS opakes Cream sein (nicht transparent): die Zelle liegt
// über einer klickbaren Zeile mit hover:bg-brass-light/30, sonst schiene der
// Hover nur durch die halbe Zelle durch. Cream = pixelgleich zu freien Nachbarn.
const FREE_FILL = 'var(--color-cream)'

/**
 * CSS-Hintergrund für eine Tageszelle je nach Form. Farb-agnostisch: die
 * konkrete Statusfarbe liefert der Aufrufer (öffentlich vs. Admin).
 * Diagonale = Antidiagonale (oben-links → unten-rechts Trennlinie):
 * oberes-linkes Dreieck = Vormittag (Abreise), unteres-rechtes = Nachmittag (Anreise).
 */
export function cellBackground(
  info: DayShapeInfo,
  colorFor: (b?: Booking) => string,
): string | undefined {
  switch (info.shape) {
    case 'full':
      return colorFor(info.occupying)
    case 'arrival': // Nachmittag belegt → unteres-rechtes Dreieck gefärbt
      return `linear-gradient(to bottom right, ${FREE_FILL} 50%, ${colorFor(info.arriving)} 50%)`
    case 'departure': // Vormittag belegt → oberes-linkes Dreieck gefärbt
      return `linear-gradient(to bottom right, ${colorFor(info.departing)} 50%, ${FREE_FILL} 50%)`
    case 'changeover': {
      // Zweifarbiger Fill (departing oben-links, arriving unten-rechts) plus
      // dünne Cream-Naht als sichtbares Zeichen des Wechseltags.
      const seam = `linear-gradient(to bottom right, transparent calc(50% - 0.75px), ${FREE_FILL} calc(50% - 0.75px), ${FREE_FILL} calc(50% + 0.75px), transparent calc(50% + 0.75px))`
      const fill = `linear-gradient(to bottom right, ${colorFor(info.departing)} 50%, ${colorFor(info.arriving)} 50%)`
      return `${seam}, ${fill}` // Naht-Schicht über dem Fill
    }
    default:
      return undefined // 'free' → kein Overlay, das bg-cream der Zelle zeigt sich
  }
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
