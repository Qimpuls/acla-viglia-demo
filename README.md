# ACLA VIGLIA RADONS · Demo

Statische Single-Page für das Maiensäss ACLA VIGLIA RADONS in Radons (Savognin, Val Surses, Graubünden). Deutsch (de-CH), Anker-Navigation, kein Backend.

- Live: https://acla-viglia-demo.vercel.app
- Repo: https://github.com/Qimpuls/acla-viglia-demo

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

### Hero-Saisonsteuerung

Das Hero-Bild wird beim Server-Render anhand des Build-Datums gewählt: November bis April → `hero-winter.jpg`, Mai bis Oktober → `hero-sommer.jpeg`. Logik in [src/components/Hero.tsx](src/components/Hero.tsx). Bei Vercel-Deploy wird die Entscheidung im Build neu gefällt — push-Trigger reichen, wenn der Saisonwechsel an einem Wochenende kommt einfach einen leeren Commit pushen.

## Architektur

```
src/
  app/
    layout.tsx        Fonts, Metadata, OG-Tags, JSON-LD-Hülle
    page.tsx          Single-Page mit JSON-LD LodgingBusiness
    globals.css       Tailwind v4 + @theme Farben/Fonts, scroll-margin-top
  components/
    Header.tsx        Sticky, transparent über Hero, kompakter Mobile-Header
    Hero.tsx          Vollbild, saisonales Bild, Trust-Mikrozeile, Scroll-Chevron
    ValueProps.tsx    Drei Karten: Parc Ela > Specksteinofen > Ski-In
    Maiensaess.tsx    Text + 2x3 Galerie + horizontaler Detail-Bildband
    Empfehlungen.tsx  Drei Tipp-Karten (Wanderung, Mittagstipp, Origen)
    Gastgeber.tsx     Aquarell-Portrait + Story
    Region.tsx        Intro + 2x2 Mosaik + Winter/Sommer-Bullets
    Preise.tsx        Value-Spotlight + Saisons + Inklusive-Checks + Kalender
    BookingCalendar.tsx  Sa-Sa-Wochenraster, klickbare freie Wochen
    Anreise.tsx       Sommer/Winter Karten
    Kontakt.tsx       Form-Embed + Adresse als Fallback
    ContactForm.tsx   Nativer Anfrage-Workflow mit mailto-Submit
    Footer.tsx        3-Spalten + Legal-Zeile
  lib/
    content.ts        Alle Texte zentralisiert
    bookings.ts       Belegungs-Array, Status-Logik, Anker-Monat
public/
  images/             22 Bilder
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

## Inhalte ändern

Sämtliche Texte sind in [src/lib/content.ts](src/lib/content.ts) zentralisiert. Bildreferenzen ebenso. Komponenten sind reine Layout-Container, die aus diesem Objekt rendern.

## Belegungskalender pflegen

Buchungen werden in [src/lib/bookings.ts](src/lib/bookings.ts) als Array gepflegt:

```ts
{ start: '2026-12-19', end: '2026-12-26' },                 // Standard, belegt
{ start: '2027-02-13', end: '2027-02-20', status: 'reserved' },
{ start: '2027-04-01', end: '2027-04-08', status: 'closed', note: 'Renovation' },
```

- `start` = Anreise-Samstag (nachmittags)
- `end`   = Abreise-Samstag (vormittags, exklusiv — Tag selbst wird nicht eingefärbt)
- `status` optional: `'booked'` (Default, larch), `'reserved'` (gelb), `'closed'` (rot)
- `note` rein intern, nicht öffentlich sichtbar

**Anzeige-Logik:** Die Wochen sind im Kalender als Samstag-zu-Freitag-Zeilen gerendert (Wochenstart Sa). Eine ganze Buchungswoche füllt visuell genau eine Zeile, der Abreise-Samstag bleibt weiss. Klick auf eine freie Woche schreibt `#kontakt?from=...&to=...` in die URL, scrollt zur Anfrage-Sektion und füllt das Formular vor. Standard-Ansicht zeigt 6 Monate ab Juli 2026 (Anker in `calendarAnchor`), Navigation in 6-Monats-Schritten.

**Workflow für Angela:**

1. Datei [src/lib/bookings.ts](src/lib/bookings.ts) im Browser auf GitHub editieren (Bleistift-Symbol)
2. Buchung als neue Zeile einfügen, sortiert nach Datum
3. Commit-Nachricht z.B. `Buchung Familie Müller 12.-19.07.2026`
4. Vercel deployt automatisch innerhalb von ~60 Sekunden

**Empfehlung für später** (optional):

- iCal-Feed-Integration: Angela verwaltet Buchungen in Apple Calendar / Google Calendar, die Website liest den `.ics`-Feed serverseitig (Aufwand 1-2 Tage, vermeidet Git-Workflow)
- Headless CMS (Decap, Sanity) als Alternative

## Anfrage-Formular

[src/components/ContactForm.tsx](src/components/ContactForm.tsx) ist eine native React-Form mit:

- Anreise / Abreise (HTML5-Datepicker, Anreise ab heute, Abreise ab Anreise)
- Erwachsene + Kinder mit Live-Summe und Hinweis bei >5 Personen
- Verfügbarkeits-Check gegen `bookings.ts`, freundlicher Hinweis bei Überlappung
- Name (Pflicht), E-Mail (Pflicht, validiert), Telefon, Herkunfts-Dropdown, Nachricht
- Pre-Fill aus `#kontakt?from=...&to=...` (vom Kalender-Klick)
- Submit baut einen strukturierten deutschen mailto-Link mit Subject und Body und öffnet den Mail-Client. Nach Klick wechselt die Form zu einem "Danke"-Bestätigungspanel mit Reset-Link.

Inline-Validierung, accessible Labels, mobile-friendly.

**Upgrade-Pfad** wenn Backend gewünscht: Vercel Edge Function + Resend (oder ähnlicher Mail-Provider). Form-State bleibt unverändert, nur Submit-Handler tauschen. Tally-Embed weiterhin möglich als Drop-in (URL-Param-Logik ist vorbereitet).

## Technische Entscheidungen

- **Tailwind v4 statt 3.4**: Mit `create-next-app@latest` wird automatisch Tailwind v4 installiert. Custom-Farben werden via CSS-`@theme`-Direktive in `globals.css` definiert (nicht mehr in `tailwind.config.ts`).
- **Mobile-Menü ausserhalb des Headers gerendert**: Der Header nutzte ursprünglich `backdrop-blur-sm`, was per CSS-Spezifikation einen Containing-Block für fixed-Elemente erzeugt. Das mobile Menü kollabierte auf Höhe 0. Lösung: Menü ist React-Geschwister-Element des Headers, beide in einem Fragment.
- **Wochenraster Samstag-Start**: Sa als erster Tag in der Woche-Header-Reihe (SA SO MO DI MI DO FR). Damit fällt jede Sa-Sa-Buchung visuell auf eine durchgehende Zeile und es entfallen die alten Halb-Tag-Dreiecke.
- **JSON-LD `LodgingBusiness`**: Inline im `<script type="application/ld+json">` in der Page-Komponente. Adresse, Geo-Koordinaten und Amenities (Ski-In, WLAN, Specksteinofen).
- **`metadataBase`**: Auf `https://acla-viglia-demo.vercel.app` gesetzt für Open-Graph-Auflösung. Vor Live-Schaltung auf produktive Domain ändern.
- **Scroll-Offset**: `scroll-margin-top: 5rem` auf Sektionen (3.5 rem auf Mobile), damit Anker-Sprünge nicht hinter dem Sticky-Header landen.

## Bestehende Domain `aclavigliaradons.ch` (Migration)

Die bisherige Webseite läuft bei **Hoststar** mit dem BaseKit-Website-Builder:

| Was | Wo |
|-----|-----|
| Nameserver | `ns1.hoststar.hosting`, `ns2.hoststar.hosting` |
| Web-Hosting | Hoststar Designer-Loadbalancer (Hetzner Datacenter Nürnberg, IP `213.239.221.71`) |
| CMS | BaseKit (white-label, im Hoststar Designer) |
| E-Mail | Hoststar, MX `mail.aclavigliaradons.ch` |

**Empfohlener Migrations-Pfad (minimaler DNS-Switch, E-Mail bleibt):**

1. Hoststar-Login besorgen (vom Kollegen, der die alte Site gebaut hat)
2. Im Hoststar-DNS-Panel:
   - A-Record `aclavigliaradons.ch` → `76.76.21.21` (Vercel)
   - CNAME `www` → `cname.vercel-dns.com`
   - MX-Records **nicht ändern**
3. In Vercel: Custom-Domain `aclavigliaradons.ch` + `www` hinterlegen, Let's-Encrypt-Zertifikat wird automatisch ausgestellt
4. 24-48 h DNS-Propagation abwarten
5. Erst nach 2-4 Wochen stabilem Betrieb das Hoststar-Webhosting kündigen. Domain + E-Mail bleiben dort.

Was vom Kollegen zwingend gebraucht wird: Hoststar-Login oder schriftliche Bestätigung dass er den DNS-Switch selbst macht. Optional der AuthInfo-Code falls die Domain später zu einem anderen Registrar wandern soll.

## Deployment

Pushed `main` deployt automatisch auf Vercel. Lokal ein neuer Stand:

```bash
git checkout -b feature/...
# Änderungen
git push -u origin feature/...
gh pr create --base main
# Review im Vercel-Preview, dann mergen
```

Erste Live-URL: `acla-viglia-demo.vercel.app`. Custom-Domain `aclavigliaradons.ch` siehe Migrations-Abschnitt.

## Quality Gates

- [x] Production-Build läuft ohne Warnings durch
- [x] TypeScript strict mode, keine Fehler
- [x] Cross-Browser-Check: Chrome, Safari (Desktop + iOS), Firefox
- [x] Mobile-Navigation getestet (390x844)
- [x] Alle Bilder mit beschreibendem `alt`-Text
- [x] HTML5-konform, `lang="de-CH"` gesetzt
- [ ] Lighthouse-Audit auf 95+ vor Custom-Domain-Live (siehe SEO-Roadmap)

## Geplante SEO/KI-Sichtbarkeit (offen)

Vor Custom-Domain-Live umsetzen:

- JSON-LD erweitern (Preise als Offers, Aufenthaltsdauer, ContactPoint, sameAs)
- JSON-LD `FAQPage` für häufige Gast-Fragen (Saison, WLAN, Hunde, Winter-Anreise)
- Eigenes OG-Image (1200×630) mit Headline gerendert
- `sitemap.xml` + `robots.txt` + `llms.txt`
- Favicon-Set komplett (16/32/180/192/512 + manifest)
- Google Search Console + Bing Webmaster nach DNS-Switch
- Listings: Graubünden Ferien, MySwitzerland, Parc Ela
- Lighthouse 95+ in allen vier Kategorien

## Was die Demo bewusst NICHT hat

- Kein Backend-Versand (Form öffnet Mail-Client des Besuchers)
- Keine Analytics, kein GTM, kein Plausible
- Keine Cookies, kein Consent-Banner
- Keine Mehrsprachigkeit
- Keine externen Widgets (Maps, Wetter)
- Keine Newsletter-Anmeldung

## Hinweise zur Marke

- Gastgeber-Bild ist eine **Aquarell-Illustration**, nicht ein Foto. (Caption "Illustration · Foto-Porträt folgt" wurde auf Wunsch der Auftraggeber entfernt.)
- Schweizer Hochdeutsch, `ss` statt `ß`, keine Gedankenstriche (`—` oder `–`) als Satzzeichen.
- Anrede: `Sie`.
