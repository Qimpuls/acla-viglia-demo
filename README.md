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

## Bild-Archiv und Saison-Hero-Steuerung

Alle auf der Website genutzten Bilder liegen in `public/images/`. Neue Bilder kommen vom Auftraggeber via `~/Downloads/bilder-fuer-claude-code/` und werden in `public/images/` kopiert.

### Hero-Bilder (saisonal gesteuert)

| Datei | Inhalt | Status | Aktiv in Saison |
|-------|--------|--------|-----------------|
| `hero-sommer.png` | Echtes Maiensäss im Sommer, Steinbock-Skulpturen, Strasse als Diagonale | AKTIV | Mai bis Oktober |
| `hero-winter.png` | Echtes Maiensäss im Tiefwinter, Holzwand-Rahmen links, Bergkette | bereit, archiviert | November bis April |

Die Datumslogik in [src/components/Hero.tsx](src/components/Hero.tsx) (Funktion `isWinterSeason`) entscheidet beim **Build-Vorgang**, welches Bild gerendert wird. Die Seite ist statisch und wird auf Vercel-CDN gecached. Das heisst: der Wechsel passiert erst beim nächsten Deploy, nicht automatisch am Stichtag.

**Aktueller Workflow (vereinbart):** Manuelle Aktivierung via Claude, getriggert durch Kalender-Erinnerung. Termine:

- **15. Oktober** → Auftrag an Claude: *"Aktiviere das Winter-Hero-Bild jetzt"* (Vorlauf für Vorbuchungsphase Winter)
- **15. April** → Auftrag an Claude: *"Aktiviere das Sommer-Hero-Bild jetzt"*

Claude setzt dann `const winter = true` bzw. `false` in Hero.tsx, aktualisiert das OG-Image in layout.tsx, committet und deployt. Dauer: 60 Sekunden.

**Alternative für später** (falls echter Auto-Switch gewünscht): ISR mit `export const revalidate = 86400` auf der Page kombiniert mit einem Vercel-Cron-Job (in `vercel.json`) der am 1.5. und 1.11. einen Revalidate-Endpoint pingt. Aufwand ~30 Minuten.

### Responsive Bildausschnitt

Beide Hero-Bilder nutzen unterschiedliche `object-position`-Werte für Desktop und Mobile, definiert in `globals.css` als `.hero-sommer-pos` und `.hero-winter-pos`. Sommer: Desktop `center 35%`, Mobile `center 40%`. Winter: Desktop `center center`, Mobile `70% center` (verschiebt nach rechts, damit das verschneite Maiensäss zentraler sitzt und die dunkle Holzwand-Kante nicht dominiert).

### Manueller Saisonwechsel — Schritt für Schritt

Wenn der Auftrag "Aktiviere das Winter-Hero-Bild jetzt" reinkommt, macht Claude:

1. In [src/components/Hero.tsx](src/components/Hero.tsx): `const winter = isWinterSeason()` → `const winter = true`
2. In [src/app/layout.tsx](src/app/layout.tsx): OG- und Twitter-Card-Image von `hero-sommer.png` auf `hero-winter.png`
3. Commit `feat(hero): switch homepage to winter image`, push, Vercel-Deploy
4. Curl gegen die Live-URL zur Verifikation

Rückwärts genauso (`= false`, OG zurück auf Sommer). Das Winter-Bild liegt bereit unter `public/images/hero-winter.png`, das Sommer-Bild unter `public/images/hero-sommer.png`.

### Vollständiges Bild-Inventar

| Datei | Einsatz auf der Website |
|-------|-------------------------|
| `hero-sommer.png` | Hero-Bild, aktiv Mai-Oktober |
| `hero-winter.png` | Hero-Bild, aktiv November-April |
| `usp-skiin.jpg` | ValueProps Karte 03 "Skischuhe an, Tür auf, los." |
| `usp-original.jpg` | (archiviert, vorher Karte 02; nicht mehr aktiv im Code referenziert) |
| `usp-lage.jpeg` | ValueProps Karte 01 "Mitten im Parc Ela" + Region-Mosaik oben rechts |
| `maiensaess-1.jpg` … `maiensaess-6.jpg` | Maiensäss-Sektion 2×3 Galerie (Wohnstube, Küche, Eltern-Schlaf, Kinder-Schlaf, Dachgalerie, Bad) |
| `detail-1.jpg` … `detail-4.jpg` | Maiensäss-Sektion horizontaler Detail-Bildband (Reihenfolge: detail-4, detail-3, detail-2, detail-1) |
| `gastgeber-portrait.png` | Gastgeber-Sektion, Aquarell-Illustration von Angela und Gallus |
| `region-parcela.jpeg` | Region-Sektion Mosaik oben links (Lai Barnagn) |
| `region-blumen.jpeg` | Region-Sektion Mosaik unten links (Wildblumen vor Bergen) |
| `region-bach.jpeg` | Region-Sektion Mosaik unten rechts (Bergbach zwischen Steinen) |
| `region-wandern.jpeg` | Region-Sektion Sommer-Spalten-Header (Wanderweg) |
| `region-skigebiet.jpg` | Region-Sektion Winter-Spalten-Header (Skigebiet) |
| `region-tiefschnee.webp` | Region-Sektion Winter-Spalte unten, mit Caption "Unverspurter Tiefschnee" |
| `region-pferde.webp` | Region-Sektion Sommer-Spalte, Caption "Sömmerung auf den Weiden von Radons" |
| `region-wegweiser.webp` | Region-Sektion Sommer-Spalte, Caption "Wanderknotenpunkt Radons, 1885 m" |
| `anreise-sommer.jpeg` | Anreise-Sektion Sommer-Karte |
| `anreise-winter.jpg` | Anreise-Sektion Winter-Karte |

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

Die bisherige Webseite läuft bei **Hoststar** mit dem BaseKit-Website-Builder, betreut von Thomas (Freundschaftsdienst, Kosten von ihm getragen):

| Was | Wo |
|-----|-----|
| Nameserver | `ns1.hoststar.hosting`, `ns2.hoststar.hosting` |
| Web-Hosting | Hoststar Designer-Loadbalancer (Hetzner Datacenter Nürnberg, IP `213.239.221.71`) |
| CMS | BaseKit (white-label, im Hoststar Designer) |
| E-Mail | Hoststar, MX `mail.aclavigliaradons.ch` |

Der Mail-Entwurf an Thomas liegt unter [../email-thomas-domain-hosting.md](../email-thomas-domain-hosting.md) (Stand 2026-05-21, noch nicht gesendet).

### Variante 1: Thomas bleibt Verwalter von Domain und Mail

DNS-Anpassung bei Hoststar, danach läuft alles unverändert weiter:

1. Im Hoststar-DNS-Panel:
   - A-Record `aclavigliaradons.ch` → `76.76.21.21` (Vercel)
   - CNAME `www` → `cname.vercel-dns.com`
   - MX-Records **nicht ändern**
2. In Vercel: Custom-Domain `aclavigliaradons.ch` + `www` hinterlegen, Let's-Encrypt-Zertifikat wird automatisch ausgestellt
3. 24-48 h DNS-Propagation abwarten
4. Erst nach 2-4 Wochen stabilem Betrieb kann Thomas das Hoststar-Webhosting (BaseKit-Designer) runterstufen oder kündigen. Domain + E-Mail bleiben dort.
5. Thomas teilt Gallus die jährlichen Kosten (Domain + Mail) mit, damit Gallus die Position selbst übernehmen kann.

### Variante 2: Thomas gibt Domain und Mail ab

Komplett-Übernahme zu **Hostpoint** (Marco hat dort bereits alle Domains, ein zusätzliches Konto wäre unnötig):

- **Domain-Transfer zu Hostpoint.** Thomas entsperrt die Domain bei Hoststar und gibt den AuthInfo-Code raus, der Rest läuft automatisch über Hostpoint.
- **Mail bei Hostpoint.** Postfächer im Webhosting-Paket inkludiert, oder Standalone via MyMail (ab CHF 28/Jahr für 1 Postfach). Bestehende Adressen 1:1 nachbauen, alte Postfächer per IMAP-Sync übernehmen, damit keine Mails verloren gehen.
- **Hosting auf Vercel** wie in Variante 1.
- **Halter (Whois):** Gallus. **Technischer Verwalter:** Marco (Hostpoint-Account-Zugriff).
- **Rechnung:** läuft über Marco, Weiterverrechnung an Gallus.

Stichtag für den Domain-Transfer mit Thomas abstimmen, damit Webseite und Mail nahtlos übergehen.

### Was wir von Thomas brauchen

- Antwort auf Variante 1 oder 2
- Bei Variante 1: DNS-Einträge gesetzt (oder Hoststar-Login zur Selbst-Umstellung)
- Bei Variante 2: AuthInfo-Code, Domain-Entsperrung, Mail-Postfächer-Inventar (Adressen, Aliase, Weiterleitungen)

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
