# Saison-Wechsel: Sommer- ↔ Winter-Edition

**Seit 2026-07-14 automatisch.** Die Website schaltet die visuelle Edition (Bilder +
Texte + OG-Vorschaubild + Nav-Label) selbst nach Kalenderdatum um. Kein manueller
Umbau, kein Deploy nötig, kein Mac nötig: der Vercel-Server entscheidet bei jedem
Render nach Datum.

- **Winter-Edition:** 15. Oktober bis 31. März
- **Sommer-Edition:** 1. April bis 14. Oktober

Zeitzone Europe/Zurich, tag-genau. Der Flip greift binnen ~1h nach dem Stichtag
(die Startseite ist ISR mit `revalidate = 3600`).

## Mechanismus (wo was liegt)

| Was | Wo |
|-----|-----|
| Datumslogik + Override | [src/lib/season.ts](../src/lib/season.ts) (`getSeason`, `SEASON_OVERRIDE`) |
| Beide Editions-Texte (sommer/winter) | [src/lib/content.ts](../src/lib/content.ts) (`hero`, `valueProps`, `sommerwoche`, `sommerumgebung`, `familienleben`, `verfuegbarkeit`, `anreise`, `winterteaser`, `getNavigation`, `getFooterNavigation`) |
| ISR-Revalidate + saisonales OG-Bild | [src/app/page.tsx](../src/app/page.tsx) (`revalidate`, `generateMetadata`) |
| Verfügbarkeitstext (dynamisch aus Kalender) | [src/lib/availability.ts](../src/lib/availability.ts) |

Die Komponenten (Server) rufen `getSeason()` direkt; der Client-`Header` bekommt die
Season als Prop aus `page.tsx` (kein Hydration-Mismatch).

## Override (Schneelage weicht vom Kalender ab)

Fällt der Schnee spät oder liegt er lange, den Kalender per einer Zeile übersteuern.
In [src/lib/season.ts](../src/lib/season.ts):

```ts
export const SEASON_OVERRIDE: Season | null = null   // 'winter' | 'sommer' | null
```

Auf `'winter'` oder `'sommer'` setzen, committen, `vercel --prod`. Zurück auf `null`
schaltet die Automatik wieder scharf. (Redeploy nötig, da Code-Änderung.)

## Texte ändern

Sommer- und Winter-Texte stehen strukturiert nebeneinander in `content.ts` (je
`sommer:` und `winter:` pro Sektion). Editieren, committen, deployen. Kein Kopieren
mehr zwischen Doku und Code.

## Winterbus Savognin–Radons (jährlich prüfen, steht NICHT auf der Seite)

Der Winterbus-Fahrplan ändert je Saison und ist bewusst nicht auf der gerenderten
Seite (die Winter-Anreise-Sektion nennt nur "mit dem Winterbus ab Savognin"; Gäste
klären Details direkt mit Angela und Gallus, Entscheid Marco 2026-06-07). Referenz
letzte bekannte Saison 2025/26 (vor Verwendung neu prüfen):

- Betrieb ca. 20. Dezember bis 6. April, Fahrzeit je ~30 Min.
- ab Savognin: 9.00, 10.15, 11.30, 13.20, 14.35, 15.50 Uhr
- ab Radons: 9.35, 10.50, 12.45, 14.00, 15.15, 16.30 Uhr
- Transportiert Schlittenfahrer, keine Ski-/Snowboardfahrer (Ausnahme Tourengänger 9.00 Uhr)
- Reservation bis 1h vor Abfahrt; Haltestelle und Reservationsnummer je Saison bestätigen.

## Offene Punkte

- **Winter-OG-Bild:** aktuell nutzt Winter das Hero-Bild `hero-winter.png` direkt als
  OG-Vorschau. Optional später ein sauberer 1200x553-Schnitt `og-image-winter.jpg`.
- **Gastgeberfoto** `public/images/gastgeber-foto.png` ist noch KI-Platzhalter (echtes
  Foto von Angela und Gallus einsetzen, sobald vorhanden).

## Bild-Mapping (Referenz)

Alle Winter-Bilder liegen bereits in `public/images/` und sind in `content.ts` verdrahtet.

| Sektion | Sommer | Winter |
|---------|--------|--------|
| Hero | `hero-sommer.png` | `hero-winter.png` |
| Saisonwoche-Banner | `sommer-wanderfamilie.png` | `winter-familie.png` |
| Umgebung Leitbild (breit, nur Winter) | (keins) | `dorf-radons-winter.png` |
| Umgebung Bild 1 | `umgebung-sommer-2.png` | `region-tiefschnee.webp` |
| Umgebung Bild 2 | `region-bach.jpeg` | `region-skigebiet.jpg` |
| Familienleben Leitbild | `detail-4-sommer.png` | `detail-4-winter.jpg` |

Saisonneutral (kein Wechsel): Gastgeber, Wohnen, Haus-Fakten, Preise, Kalender,
Kontakt, Footer, Galerie (zeigt bewusst beide Saisons).

Stand: 2026-07-14. Automatik live, aktuell Sommer-Edition (per Datum).
