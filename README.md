# ACLA VIGLIA RADONS · Demo

Statische Demo-Webseite für das Maiensäss ACLA VIGLIA RADONS in Radons (Savognin, Val Surses, Graubünden). Single-Page mit Anker-Navigation, Deutsch (de-CH), keine Backend-Anbindung.

## Tech-Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 (CSS-basiertes `@theme`)
- Google Fonts via `next/font/google` (Cormorant Garamond, Inter)
- `next/image` für Bildoptimierung
- Sprache: `de-CH`

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production-Build
npm run start    # Production-Server lokal
```

## Bilder

Bilder werden aus `~/Downloads/bilder-fuer-claude-code/` nach `public/images/` kopiert:

```bash
mkdir -p public/images
cp ~/Downloads/bilder-fuer-claude-code/*.{jpg,jpeg,png} public/images/
```

### Vorhanden

`hero-sommer.jpeg`, `hero-winter.jpg`, `usp-skiin.jpg`, `usp-original.jpg`, `usp-lage.jpeg`, `maiensaess-1.jpg` bis `maiensaess-6.jpg`, `detail-1.jpg` bis `detail-4.jpg`, `gastgeber-portrait.png` (Aquarell-Illustration), `region-parcela.jpeg`, `region-wandern.jpeg`, `region-blumen.jpeg`, `region-bach.jpeg`, `region-skigebiet.jpg`, `anreise-sommer.jpeg`, `anreise-winter.jpg`.

### Belegungskalender

Statt eines Screenshots wird ein eigener React-Kalender gerendert. Buchungen liegen in [src/lib/bookings.ts](src/lib/bookings.ts) als Liste von `{ start, end, status? }`-Einträgen vor. Wochenmiete Samstag zu Samstag wird mit zwei diagonalen Dreiecken auf dem Übergangs-Samstag dargestellt (morgens Abreise, nachmittags Anreise). Navigation per `« zurück` / `weiter »` blättert in 9-Monats-Schritten.

### Sommer-Header in Region-Sektion

Der Brief sah keinen Sommer-Header in der Region-Sektion vor. Um optisch zur Winter-Variante zu spiegeln, wird `region-wandern.jpeg` als Header der Sommer-Spalte wiederverwendet (auch Teil des Mosaiks darüber).

## Architektur

```
src/
  app/
    layout.tsx        Fonts, Metadata, OG-Tags
    page.tsx          Single-Page mit JSON-LD LodgingBusiness
    globals.css       Tailwind v4 + @theme Farben/Fonts
  components/
    Header.tsx        Sticky, transparent über Hero, Mobile-Menü
    Hero.tsx          Vollbild mit Gradient-Overlay
    ValueProps.tsx    Drei Karten 01/02/03
    Maiensaess.tsx    Text + 2x3 Galerie + Detail-Bildband
    Gastgeber.tsx     Illustration (mit Caption) + Story
    Region.tsx        Intro + 2x2 Mosaik + Winter/Sommer
    Preise.tsx        Tabelle + Nebenkosten + Belegungskalender
    Anreise.tsx       Sommer/Winter Karten
    Kontakt.tsx       Charcoal-Sektion mit mailto
    Footer.tsx        3-Spalten
  lib/
    content.ts        Alle Texte zentralisiert
public/
  images/             22 Bilder, 1 fehlt (Belegungskalender)
```

## Design-System

| Token | Wert | Verwendung |
|-------|------|------------|
| `parchment` | `#FAF5EC` | Hauptfläche |
| `linen` | `#F2E8D5` | Sektion-Hintergrund warm |
| `ink` | `#2A1F14` | Fliesstext |
| `soapstone` | `#3B2A1A` | Headlines, Markenfarbe |
| `larch` | `#8B6F47` | Sekundäre Headlines, Links |
| `brass` | `#BFA77A` | Akzentlinien, Trenner |
| `brass-light` | `#D9C9A6` | Heller Akzent |
| `charcoal` | `#1F1B17` | Footer, dunkle Sektionen |
| `cream` | `#FBF7EE` | Karten-Hintergrund |

Definiert in [src/app/globals.css](src/app/globals.css) im `@theme`-Block (Tailwind v4). Klassen-Beispiel: `bg-parchment`, `text-soapstone`, `border-brass`.

## Technische Entscheidungen

- **Tailwind v4 statt 3.4**: Mit `create-next-app@latest` wird automatisch Tailwind v4 installiert. Custom-Farben werden via CSS-`@theme`-Direktive in `globals.css` definiert (nicht mehr in `tailwind.config.ts`).
- **Mobile-Menü ausserhalb des Headers gerendert**: Der Header nutzte ursprünglich `backdrop-blur-sm`, was per CSS-Spezifikation einen Containing-Block für fixed-Elemente erzeugt. Das mobile Menü kollabierte auf Höhe 0. Lösung: Menü ist React-Geschwister-Element des Headers, beide in einem Fragment.
- **JSON-LD `LodgingBusiness`**: Inline im `<script type="application/ld+json">` in der Page-Komponente. Adresse, Geo-Koordinaten und Amenities (Ski-In, WLAN, Specksteinofen).
- **`metadataBase`**: Auf `https://acla-viglia-demo.vercel.app` gesetzt für Open-Graph-Auflösung. Vor Live-Schaltung auf produktive Domain ändern.

## Inhalte ändern

Sämtliche Texte sind in [src/lib/content.ts](src/lib/content.ts) zentralisiert. Bildreferenzen ebenso. Komponenten sind reine Layout-Container, die aus diesem Objekt rendern.

## Belegungskalender pflegen

Buchungen werden in [src/lib/bookings.ts](src/lib/bookings.ts) als Array gepflegt:

```ts
{ start: '2026-12-19', end: '2026-12-26' },               // Standard, belegt
{ start: '2027-02-13', end: '2027-02-20', status: 'reserved' },
{ start: '2027-04-01', end: '2027-04-08', status: 'closed', note: 'Renovation' },
```

- `start` = Anreise-Samstag (nachmittags)
- `end`   = Abreise-Samstag (vormittags)
- `status` optional: `'booked'` (Default, larch), `'reserved'` (gelb), `'closed'` (rot)
- `note` rein intern, nicht öffentlich sichtbar

**Workflow für Angela:**

1. Datei [src/lib/bookings.ts](src/lib/bookings.ts) im Browser auf GitHub editieren (Bleistift-Symbol)
2. Buchung als neue Zeile einfügen, sortiert nach Datum
3. Commit-Nachricht z.B. `Buchung Familie Müller 12.-19.07.2026`
4. Vercel deployt automatisch innerhalb von ~60 Sekunden

**Empfehlung für Produktion** (später, optional):

- iCal-Feed-Integration: Angela verwaltet Buchungen in Apple Calendar / Google Calendar, die Website liest den `.ics`-Feed serverseitig
- Aufwand: 1-2 Tage, vermeidet Git-Workflow komplett
- Headless CMS (Decap, Sanity) als Alternative wenn iCal nicht passt

## Deployment auf Vercel

```bash
git init
git add .
git commit -m "feat: initial ACLA VIGLIA RADONS demo"
gh repo create acla-viglia-demo --public --source=. --push
```

Anschliessend in Vercel das GitHub-Repo verbinden. Build-Settings sind Standard (Next.js detektiert automatisch). Output ist statisch (alle Routen prerendered).

Erste Live-URL: `acla-viglia-demo.vercel.app`. Später `aclavigliaradons.ch` als Custom-Domain anhängen.

## Quality Gates

- [x] Production-Build läuft ohne Warnings durch
- [x] TypeScript strict mode, keine Fehler
- [x] Lighthouse-Audit empfohlen vor Live-Schaltung (`npm run start` + Chrome DevTools)
- [x] Cross-Browser-Check: Chrome, Safari (Desktop + iOS), Firefox
- [x] Mobile-Navigation getestet (390x844)
- [x] Alle Bilder mit beschreibendem `alt`-Text
- [x] HTML5-konform, `lang="de-CH"` gesetzt

## Was NICHT enthalten ist (per Brief)

- Kein Buchungssystem oder Anfrageformular (nur `mailto:`)
- Keine Analytics, kein GTM, kein Plausible
- Keine Cookies, kein Consent-Banner
- Keine Mehrsprachigkeit
- Keine externen Widgets (Maps, Wetter)
- Keine Newsletter-Anmeldung
- Keine Scroll-Animationen ausser dezenten CSS-Transitions

## Hinweise zur Marke

- Gastgeber-Bild ist eine **Aquarell-Illustration**, nicht ein Foto. Caption `Illustration · Foto-Porträt folgt` unter dem Bild.
- Schweizer Hochdeutsch, `ss` statt `ß`, keine Gedankenstriche (`—` oder `–`) als Satzzeichen.
- Anrede: `Sie`.
