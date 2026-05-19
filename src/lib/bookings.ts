/**
 * Buchungsdaten ACLA VIGLIA RADONS
 *
 * Pflege: Angela trägt Buchungen hier ein und schiebt einen Commit zu GitHub.
 * Vercel deployt automatisch neu. Format ISO-Datum (YYYY-MM-DD).
 *
 * Konvention: Wochenmiete Samstag zu Samstag.
 *   start = Anreisetag (Samstag Nachmittag)
 *   end   = Abreisetag (Samstag Vormittag)
 * Übergangs-Samstage werden in der Anzeige automatisch mit zwei Dreiecken
 * (Abreise vormittag + Anreise nachmittag) dargestellt.
 *
 * Status:
 *   'booked'     blau gefüllt
 *   'reserved'   gelb gefüllt (optional vorgemerkt)
 *   'closed'     rot gefüllt (geschlossen)
 */

export type BookingStatus = 'booked' | 'reserved' | 'closed'

export interface Booking {
  start: string
  end: string
  status?: BookingStatus
  /** Interne Notiz, nicht öffentlich angezeigt. */
  note?: string
}

export const bookings: Booking[] = [
  // 2026
  { start: '2026-06-20', end: '2026-06-27' },
  { start: '2026-07-11', end: '2026-07-18' },
  { start: '2026-07-25', end: '2026-08-01' },
  { start: '2026-09-12', end: '2026-09-19' },
  { start: '2026-09-19', end: '2026-09-26' },
  { start: '2026-10-17', end: '2026-10-24' },
  { start: '2026-12-12', end: '2026-12-19' },
  { start: '2026-12-19', end: '2026-12-26' },
  { start: '2026-12-26', end: '2027-01-02' },

  // 2027 Winter – durchgehend belegt
  { start: '2027-01-02', end: '2027-01-09' },
  { start: '2027-01-09', end: '2027-01-16' },
  { start: '2027-01-16', end: '2027-01-23' },
  { start: '2027-01-23', end: '2027-01-30' },
  { start: '2027-01-30', end: '2027-02-06' },
  { start: '2027-02-06', end: '2027-02-13' },
  { start: '2027-02-13', end: '2027-02-20' },
  { start: '2027-02-20', end: '2027-02-27' },
  { start: '2027-02-27', end: '2027-03-06' },
  { start: '2027-03-06', end: '2027-03-13' },
  { start: '2027-03-13', end: '2027-03-20' },

  // 2027 Sommer
  { start: '2027-07-10', end: '2027-07-17' },
  { start: '2027-07-17', end: '2027-07-24' },

  // 2027/2028 Winter
  { start: '2027-12-18', end: '2027-12-25' },
  { start: '2027-12-25', end: '2028-01-01' },
  { start: '2028-01-01', end: '2028-01-08' },
  { start: '2028-01-08', end: '2028-01-15' },
  { start: '2028-01-15', end: '2028-01-22' },
  { start: '2028-01-22', end: '2028-01-29' },
  { start: '2028-01-29', end: '2028-02-05' },
  { start: '2028-02-05', end: '2028-02-12' },
  { start: '2028-02-12', end: '2028-02-19' },
  { start: '2028-02-19', end: '2028-02-26' },
  { start: '2028-02-26', end: '2028-03-04' },
  { start: '2028-03-04', end: '2028-03-11' },
  { start: '2028-03-11', end: '2028-03-18' },

  // 2028/2029 Winter
  { start: '2028-12-16', end: '2028-12-23' },
  { start: '2028-12-23', end: '2028-12-30' },
  { start: '2028-12-30', end: '2029-01-06' },
  { start: '2029-01-06', end: '2029-01-13' },
  { start: '2029-01-13', end: '2029-01-20' },
  { start: '2029-01-20', end: '2029-01-27' },
  { start: '2029-01-27', end: '2029-02-03' },
  { start: '2029-02-03', end: '2029-02-10' },
  { start: '2029-02-10', end: '2029-02-17' },
  { start: '2029-02-24', end: '2029-03-03' },
]

/**
 * Anker-Jahr für den Kalender. Default-Startansicht zeigt das ganze Jahr
 * (Januar bis Dezember). Wenn Angela die Default-Startansicht verschieben
 * will, hier ändern.
 */
export const calendarAnchor = { year: 2026, month: 0 }
