import type { Booking } from '@/lib/bookings'
import { isWeekFree, MONTH_NAMES } from '@/lib/calendar'

/**
 * Leitet den Verfügbarkeits-Fliesstext dynamisch aus dem Belegungskalender ab,
 * damit er nie veraltet (früher stand hier ein hartcodierter Satz mit Jahr und
 * fixer Monatsliste). Nennt die nächstgelegenen Monate mit freien Sa-Sa-Wochen.
 */

/** Nächster Samstag ab (einschliesslich) dem gegebenen Datum. JS: Samstag = 6. */
function nextSaturday(from: Date): Date {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const daysUntilSat = (6 - d.getDay() + 7) % 7
  d.setDate(d.getDate() + daysUntilSat)
  return d
}

/** Monatsnamen der kommenden Monate mit mindestens einer freien Sa-Sa-Woche. */
function freeMonths(bookings: Booking[], weeksAhead = 39): string[] {
  const start = nextSaturday(new Date())
  const months: string[] = []
  const seen = new Set<number>()
  for (let i = 0; i < weeksAhead; i++) {
    const sat = new Date(start)
    sat.setDate(sat.getDate() + i * 7)
    if (!isWeekFree(sat, bookings)) continue
    const key = sat.getFullYear() * 12 + sat.getMonth()
    if (seen.has(key)) continue
    seen.add(key)
    months.push(MONTH_NAMES[sat.getMonth()])
  }
  return months
}

/** Deutsche Aufzählung: "August" · "August und September" · "August, September und Oktober". */
function joinDe(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`
}

/** Verfügbarkeits-Fliesstext für die Sektion über dem Kalender. */
export function availabilityText(bookings: Booking[]): string {
  const months = freeMonths(bookings).slice(0, 3)
  if (months.length === 0) {
    return 'Die kommenden Wochen sind gut gebucht. Für einzelne Termine und die nächste Saison lohnt sich eine kurze Anfrage.'
  }
  return `Aktuell sind noch einzelne Wochen frei, unter anderem im ${joinDe(months)}. Wählen Sie eine freie Woche im Kalender oder senden Sie direkt eine Anfrage.`
}
