# Saison-Wechsel: Sommer- ↔ Winter-Edition

Die Seite läuft aktuell als **Sommer-Edition** (Conversion-Fokus Sommerbuchungen Juni bis September).
Geplanter Wechsel auf die **Winter-Edition: Oktober**.

Alle Winter-Bildvarianten liegen bereits im Repo unter `public/images/`. Nichts muss
mehr beschafft werden. Dieser Wechsel ist eine Abhak-Liste, keine Neuentwicklung.

Alle Texte stehen zentral in [src/lib/content.ts](../src/lib/content.ts), die Komponenten
sind reine Layout-Container. Ein Wechsel ist also fast vollständig ein Edit dieser einen Datei
plus dem Hero-Schalter.

---

## 1. Bilder tauschen (Archiv ist vollständig)

| Stelle | Referenz in `content.ts` | Sommer (aktuell) | Winter (Archiv, bereit) |
|--------|--------------------------|------------------|--------------------------|
| Hero | `hero.imageSummer` / `hero.imageWinter` | `hero-sommer.png` | `hero-winter.png` (Schalter, siehe §3) |
| Familienleben, Bild 1 | `familienleben.images[0].src` | `detail-4-sommer.png` | `detail-4-winter.jpg` |
| Haus-Detailband (nicht gerendert) | `maiensaess.details[0].src` | `detail-4-sommer.png` | `detail-4-winter.jpg` |
| Anreise (optional, aktuell text-only) | — | `anreise-sommer.jpg` | `anreise-winter.jpg` |

`detail-4-sommer.png` (grüne Bergwiese) und `detail-4-winter.jpg` (Schnee) zeigen dieselbe
Wohnstube am Fenster, nur die Aussicht wechselt. Identischer Bildausschnitt, sauberer Swap.

Weitere Winter-Motive bereits archiviert für Sommerumgebung/Region-Inhalte:
`region-tiefschnee.webp`, `region-skigebiet.jpg`, `region-pferde.webp`.

---

## 2. Texte umstellen (Sommer → Winter)

Der inhaltliche Kern der Edition. Jede Zeile in `content.ts`:

- [ ] **Navigation** (`nav`, ~Z2 und Footer ~Z437): Label `Sommer` → `Winter`
- [ ] **Hero** `subline` (~Z22): „Im Sommer fahren Sie bis vor das Haus …" → Winterzugang (Strasse gesperrt, Ski/Schlitten/Winterbus)
- [ ] **Hero** `primaryCta` (~Z23): „Freie Sommerwochen prüfen" → „Freie Winterwochen prüfen"
- [ ] **ValueProps** `eyebrow`/`headline` (~Z31/32): „WARUM IM SOMMER" / „Warum Gäste im Sommer bleiben." → Winter
- [ ] **ValueProps** `body` (~Z42): Wandern/Bergseen → Skifahren/Schlitteln/Ruhe im Schnee
- [ ] **Sommerwoche** (`sommerwoche`, ~Z52-73): ganze Sektion → Winterwoche (Banner `sommer-wanderfamilie.png` ersetzen, 3 Momente neu)
- [ ] **Sommerumgebung** (`sommerumgebung`, ~Z76-85): Text + Bilder → Winterumgebung (`region-tiefschnee`, `region-skigebiet`)
- [ ] **Verfügbarkeit** `headline`/`text` (~Z358/359): „Freie Sommerwochen prüfen" + Sommermonate → Winter (Hochsaison Weihnachten/Februar)
- [ ] **Anreise** `eyebrow`/`headline` (~Z364/365): „ANREISE IM SOMMER" / „Im Sommer fahren Sie bis vor das Haus." → Winteranreise
- [ ] **Winterteaser** (`winterteaser`, ~Z369-372): wird zum **Sommerteaser** (Richtung umdrehen, auf Sommersaison ausblicken)

Hinweis Winterteaser-Text Z372: „Ab Oktober steht er wieder stärker im Vordergrund." im
Winter-Modus anpassen (dann ist Winter bereits aktiv).

---

## 3. Hero-Schalter

Der Hero schaltet über `isWinterSeason()` in [src/components/Hero.tsx](../src/components/Hero.tsx):
`month >= 11 || month <= 4` → Winter erst ab **November**.

Für einen **Oktober**-Wechsel zwei Wege:
1. **Manuell (empfohlen, schnell):** `const winter = isWinterSeason()` → `const winter = true` setzen.
   Zusätzlich OG-/Twitter-Bild in [src/app/layout.tsx](../src/app/layout.tsx) von `hero-sommer.png` auf `hero-winter.png`.
2. **Schwelle anpassen:** in `isWinterSeason()` auf `month >= 10` ändern (dann automatisch ab Oktober).

Rückwärts (April) analog: `const winter = false`, OG zurück auf Sommer.

---

## 4. Saison-neutral (kein Wechsel nötig)

Gastgeber, Wohnen (Innenräume), Preise (enthält bereits Winter- **und** Sommer-Saisonzeilen),
Belegungskalender (dynamisch ab aktuellem Monat), Kontakt/Formular, Footer.

---

## 5. Abschluss

- [ ] `npm run build` + `npm run lint` grün
- [ ] Lighthouse-Check (a11y bleibt 100, Kontraste)
- [ ] Commit `feat: switch to winter edition`, push
- [ ] `vercel --prod` (Git-Push deployt NICHT automatisch) + Curl-Verifikation der Live-URL

Stand: 2026-06-07. Sommer-Edition live (Commit-Historie auf `main`).
