/**
 * Saison-Steuerung ACLA VIGLIA RADONS (Single Source of Truth).
 *
 * Die visuelle Edition (Bilder + Texte) schaltet automatisch nach Kalenderdatum:
 *   Winter: 15. Oktober bis 31. März
 *   Sommer: 1. April bis 14. Oktober
 *
 * Der Vercel-Server entscheidet bei jedem Render nach Datum, kein manueller
 * Eingriff nötig. Voraussetzung: `export const revalidate = 3600` in page.tsx,
 * damit die Route stündlich neu rendert und der Flip binnen ~1h nach dem
 * Stichtag greift.
 *
 * Marketing-Timing quellengeprüft (Buchungs-Vorlaufzeit + Val-Surses-Kalender):
 * Winter 15.10. trägt die früh startende Winter-Buchungswelle; Sommer 1.4.
 * vermeidet die Kollision mit der Ski-Sportferien-Hochsaison (Skibetrieb bis
 * Anfang April) und der bis Ende Mai gesperrten Radons-Zufahrt.
 */

export type Season = 'sommer' | 'winter'

/**
 * Override: übersteuert die Datums-Automatik. `null` = automatisch nach Datum.
 * Bei abweichender Schneelage (früher Wintereinbruch, langer Frühwinter) hart
 * auf `'winter'` oder `'sommer'` setzen. Wirkt beim nächsten Deploy,
 * unabhängig vom Cache.
 */
export const SEASON_OVERRIDE: Season | null = null

/**
 * Bestimmt die Saison anhand der Datumsteile in Europe/Zurich (nicht der
 * Server-Zeitzone; Vercel läuft UTC). Intl mit `timeZone` löst auch die
 * Sommerzeit-Umstellung korrekt, sodass der Flip tag-genau am 15.10. bzw.
 * 1.4. um Mitternacht Schweizer Zeit passiert.
 */
function seasonForZurich(now = new Date()): Season {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zurich',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const month = Number(parts.find((p) => p.type === 'month')!.value)
  const day = Number(parts.find((p) => p.type === 'day')!.value)
  const mmdd = month * 100 + day // 15. Oktober -> 1015

  // Winter: 15.10. (1015) bis 31.03. (0331). Sommer: 01.04. bis 14.10.
  const isWinter = mmdd >= 1015 || mmdd < 401
  return isWinter ? 'winter' : 'sommer'
}

/** Aktuelle Saison. Override hat Vorrang, sonst datumsbasiert. */
export function getSeason(now = new Date()): Season {
  return SEASON_OVERRIDE ?? seasonForZurich(now)
}
