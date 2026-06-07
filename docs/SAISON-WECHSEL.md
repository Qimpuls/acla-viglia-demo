# Saison-Wechsel: Sommer- ↔ Winter-Edition

Manueller Wechsel. Marco hat einen Kalender-Reminder (Mitte Oktober für Winter,
Mitte/Ende März für Sommer) und beauftragt Claude jeweils mit dem Umbau.

Dieses Dokument ist die **einzige Quelle der Wahrheit** und enthält beide Editionen
komplett und fertig formuliert:

- **Sommer-Edition** = aktueller Live-Stand (= Archiv für das Frühjahr).
- **Winter-Edition** = fertige Texte, Headlines und Bildzuordnung, griffbereit.

Alles steht zentral in [src/lib/content.ts](../src/lib/content.ts). Umbau = die
Winter-Werte unten in content.ts eintragen (Sommer-Werte bleiben hier archiviert).
Alle Winter-Bilder liegen bereits in `public/images/`, nichts zu beschaffen.

> Auftrag-Phrase Winter: „Mach jetzt das Wintersetup."
> Auftrag-Phrase Sommer: „Stell auf die Sommer-Edition zurück."

---

## Apply-Schritte (Claude)

1. Pro Sektion unten die **Winter**-Werte in `content.ts` eintragen (bzw. **Sommer** beim Rückwechsel).
2. Hero-Bild + OG-Bild umstellen (siehe §Hero und §Hero-Schalter).
3. `npm run lint` + `npm run build` grün.
4. Lighthouse-Kurzcheck (a11y bleibt 100, Kontraste).
5. Commit `feat: switch to winter edition` (bzw. summer), push.
6. `vercel --prod` (Git-Push deployt NICHT automatisch) + Curl-Verifikation der Live-URL.
7. Memory + dieses Dokument bei Bedarf nachführen.

---

## Bild-Mapping (Übersicht)

| Sektion | Sommer (Archiv) | Winter (bereit) |
|---------|-----------------|------------------|
| Hero | `hero-sommer.png` | `hero-winter.png` |
| OG-/Twitter-Bild (layout.tsx) | `og-image.jpg` (aus hero-sommer) | für Winter ideal aus `hero-winter.png` neu schneiden, sonst `hero-winter.png` direkt |
| Sommerwoche/Winterwoche Banner | `sommer-wanderfamilie.png` | `anreise-winter.jpg` (Haus im Schnee, Dämmerung) |
| Umgebung Bild 1 | `umgebung-sommer-2.png` | `region-tiefschnee.webp` |
| Umgebung Bild 2 | `region-bach.jpeg` | `region-skigebiet.jpg` |
| Regentage Leitbild | `detail-4-sommer.png` | `detail-4-winter.jpg` |
| Anreise (optional Bild) | text-only | `anreise-winter.jpg` verfügbar |

Saisonneutral, **kein** Bildwechsel: Gastgeber, Wohnen (Innenräume + Bad), Haus-Fakten,
Familienleben Bild 2 + 3 (`familie-kueche.png`, `familie-wohnzimmer-sommer.png`), Kalender,
Kontakt, Footer.

Hinweis `detail-4`: `detail-4.jpg` und `detail-4-winter.jpg` zeigen dieselbe Wohnstube mit
Schnee draussen (praktisch identisch). Für Winter `detail-4-winter.jpg` verwenden.

---

## Texte pro Sektion (Sommer = Archiv · Winter = bereit)

### Navigation (`navigation`)
- **Sommer:** Label `Sommer` (href `#sommer`)
- **Winter:** Label `Winter` (href `#sommer` bleibt, nur Label)

### Hero (`hero`) — bereits saisonneutral, nur Bild wechseln
- eyebrow, headline, claim, subline, trust bleiben in **beiden** Editionen gleich:
  - eyebrow: `MAIENSÄSS IN RADONS · 1885 M`
  - headline: `Eine Woche, die länger nachwirkt.`
  - claim: `Ein Maiensäss. Geführt wie ein gutes Hotel.`
  - subline: `Berge, Ruhe und ein Haus, das für gemeinsame Zeit gebaut wurde.`
  - trust: `Persönlich geführt von Angela und Gallus · Samstag bis Samstag`
- **Nur** `imageSummer`/`imageWinter` greift über den Hero-Schalter (siehe unten).

### ValueProps (`valueProps`)
**Sommer (Archiv):**
- eyebrow: `WARUM IM SOMMER`
- headline: `Warum Gäste im Sommer bleiben.`
- Karte 01: `Ankommen. Parkieren. Durchatmen.` / `Von Ende Mai bis Ende Oktober fahren Sie bequem bis vor das Maiensäss. Danach wird es still: keine Hektik, kein Durchgangsverkehr, nur Radons und die Berge.`
- Karte 02: `Eine Woche, die nicht lang wird.` / `Wandern ab der Haustür, Bergseen, Bikewege, Origen in Riom, Ruhetage im Haus und Abende am Feuer. Der Sommer hier oben hat Raum für Familien, Freunde und stille Tage.`
- Karte 03: `Nachts wird der Himmel dunkel.` / `Radons liegt weit weg vom Licht der grossen Orte. An klaren Abenden sieht man Sterne, wie man sie im Mittelland kaum noch kennt.`

**Winter (bereit):**
- eyebrow: `WARUM IM WINTER`
- headline: `Warum Gäste im Winter kommen.`
- Karte 01: `Ski-In, Ski-Out.` / `Die Piste der Savognin Bergbahnen liegt direkt am Haus. Morgens anschnallen, abends mit Schlitten oder Fellen zurück zur Tür.`
- Karte 02: `Die Strasse ist zu. Die Ruhe bleibt.` / `Im Winter ist die Zufahrt gesperrt. Gäste kommen mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus. Dafür ist es oben still.`
- Karte 03: `Drinnen Feuer, draussen Sterne.` / `Zwei Specksteinöfen und ein offenes Cheminée halten das Haus warm. An klaren Winterabenden steht der Himmel voller Sterne über Radons.`

### Sommerwoche / Winterwoche (`sommerwoche`)
**Sommer (Archiv):**
- eyebrow: `SOMMERWOCHE IN RADONS`
- headline: `So fühlt sich eine Woche hier oben an.`
- banner: `sommer-wanderfamilie.png` (alt: `Wanderfamilie auf dem Weg zum Maiensäss Acla Viglia in Radons im Sommer`)
- Morgens: `Kaffee am Fenster. Die Sonne steht früh an den Hängen.`
- Tagsüber: `Wandern, Bergseen, Alp Flix oder einfach vor dem Haus bleiben.`
- Abends: `Feuer, Wein und Sterne über Radons.`
- cta: `Verfügbarkeit prüfen` (href `#verfuegbarkeit`)

**Winter (bereit):**
- eyebrow: `WINTERWOCHE IN RADONS`
- headline: `So fühlt sich eine Woche hier oben an.` (bleibt)
- banner: `anreise-winter.jpg` (alt: `Maiensäss Acla Viglia in Radons im Schnee bei Dämmerung mit warmem Licht`)
- Morgens: `Frische Spur im Schnee, bevor die Piste voll ist.`
- Tagsüber: `Skifahren, Schlitteln, Schneeschuhe oder ein Tag am Feuer.`
- Abends: `Fondue, Wein und Stille über dem verschneiten Tal.`
- cta: `Verfügbarkeit prüfen` (href `#verfuegbarkeit`)

### Umgebung (`sommerumgebung`)
**Sommer (Archiv):**
- eyebrow: `SOMMERUMGEBUNG`
- headline: `Wiesen, Wege und Wasser direkt vor dem Haus.`
- intro: `Vom Haus aus sind Sie sofort draussen: auf dem Weg, am Bach, auf der Wiese oder einfach auf der Bank vor der Tür.`
- Bild 1: `umgebung-sommer-2.png` · `Sommerwege für Familien und ruhige Tage.`
- Bild 2: `region-bach.jpeg` · `Kristallklare Bergbäche und frische Höhenluft.`

**Winter (bereit):**
- eyebrow: `WINTERUMGEBUNG`
- headline: `Schnee, Stille und Spuren direkt vor dem Haus.`
- intro: `Vom Haus aus sind Sie sofort im Schnee: auf der Piste, auf der Schlittenbahn, auf Schneeschuhen oder auf der Bank in der Wintersonne.`
- Bild 1: `region-tiefschnee.webp` (alt: `Tiefverschneiter Hang über Radons mit Skitouren- und Schlittenspuren`) · `Tiefschnee und stille Wege über Radons.`
- Bild 2: `region-skigebiet.jpg` (alt: `Verschneite Maiensässe vor der Bergkette von Savognin im Winter`) · `Die Bergkulisse von Savognin im Winter.`

### Haus-Sektion / Regentage Headline (`familienleben`)
- Headline Sommer: `Auch Regentage haben hier ihren Platz.`
- Headline Winter (bereit): `Auch graue Tage haben hier ihren Platz.`
- Text bleibt beide: `Manchmal bleibt man einfach drinnen. Die Kinder spielen, das Feuer brennt, jemand kocht, jemand liest. Viele Gäste nutzen das Haus genau so.`
- Leitbild Sommer: `detail-4-sommer.png` · Winter: `detail-4-winter.jpg` · Caption beide: `Ein Buch. Ein Feuer. Ein Blick nach draussen.`
- Bild 2 + 3 bleiben (`familie-kueche.png` / `familie-wohnzimmer-sommer.png`) mit Captions `Morgens Kaffee, Brot und Zeit am grossen Tisch.` und `Drinnen spielen, lesen, Feuer machen.`

### Verfügbarkeit (`verfuegbarkeit`)
**Sommer (Archiv):**
- headline: `Freie Sommerwochen prüfen.`
- text: `Für 2026 gibt es noch einzelne freie Wochen im Sommer. Besonders August sowie einzelne Wochen im Juni, Juli und September sind noch möglich. Wählen Sie eine freie Woche im Kalender oder senden Sie direkt eine Anfrage.`
- cta: `Verfügbarkeit prüfen`

**Winter (bereit):**
- headline: `Freie Winterwochen prüfen.`
- text: `Für die Wintersaison gibt es noch einzelne freie Wochen. Hochsaison sind Weihnachten, Neujahr und Februar. Wählen Sie eine freie Woche im Kalender oder senden Sie direkt eine Anfrage.` (Monate je nach Stand anpassen)
- cta: `Verfügbarkeit prüfen`

### Anreise (`anreise`)
**Sommer (Archiv):**
- eyebrow: `ANREISE IM SOMMER`
- headline: `Im Sommer fahren Sie bis vor das Haus.`
- text: `Von Ende Mai bis Ende Oktober ist die Zufahrt über Tigignas offen. Sie parkieren direkt beim Maiensäss. Einkaufen können Sie vorher in Savognin. In Radons selbst gibt es keinen Lebensmittelladen.`

**Winter (bereit):**
- eyebrow: `ANREISE IM WINTER`
- headline: `Im Winter kommen Sie mit Ski, Schlitten oder Winterbus.`
- text: `Im Winter ist die Zufahrtsstrasse gesperrt. Von Savognin reisen Sie mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus an. Einkaufen können Sie vorher in Savognin. In Radons selbst gibt es keinen Lebensmittelladen.`

### Gegen-Teaser (`winterteaser`) — dreht die Richtung
**Sommer (Archiv, teasert den Winter):**
- eyebrow: `WINTER IN RADONS`
- headline: `Im Winter gehört Radons den Skiern, Schlitten und stillen Wegen.`
- text: `Wenn die Strasse gesperrt ist, kommen Gäste mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus. Der Winter hat seinen eigenen Rhythmus. Ab Oktober steht er wieder stärker im Vordergrund.`

**Winter (bereit, teasert den Sommer):**
- eyebrow: `SOMMER IN RADONS`
- headline: `Im Sommer fahren Sie bis vor das Haus.`
- text: `Von Ende Mai bis Ende Oktober ist die Zufahrt offen. Wanderwege ab der Haustür, Bergseen und lange, helle Abende. Ab dem Frühjahr rückt der Sommer wieder in den Vordergrund.`

---

## Saisonneutral (kein Wechsel)

Gastgeber, Wohnen (`wohnen`, Innenräume + Bad), Haus-Fakten (`maiensaess`), Preise
(`preise`, enthält Winter- und Sommer-Saisonzeilen; Preis-Card „ab CHF 220" bleibt als
Untergrenze korrekt), Belegungskalender, Kontakt/Formular, Footer.

---

## Hero-Schalter (`Hero.tsx`)

`isWinterSeason()` schaltet automatisch nur Nov bis Apr (`month >= 11 || month <= 4`).
Da wir manuell Mitte Oktober wechseln, beim Wintersetup hart setzen:

1. In [src/components/Hero.tsx](../src/components/Hero.tsx): `const winter = isWinterSeason()` → `const winter = true` (Rückwechsel: `false`).
2. In [src/app/layout.tsx](../src/app/layout.tsx): OG-/Twitter-Bild auf `hero-winter.png` (Rückwechsel: `hero-sommer.png` bzw. `og-image.jpg`).

Stand dieses Dokuments: 2026-06-07. Live = Sommer-Edition.
