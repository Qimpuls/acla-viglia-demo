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

### Saisonale Edition (automatisch per Datum)

Die gesamte Edition (Bilder, Texte, OG-Vorschaubild, Nav-Label) schaltet automatisch nach Kalenderdatum um:

| Edition | Zeitraum | Hero-Bild | OG-Bild |
|---------|----------|-----------|---------|
| Sommer | 1. April bis 14. Oktober | `hero-sommer.png` | `og-image.jpg` |
| Winter | 15. Oktober bis 31. März | `hero-winter.png` | `og-image-winter.jpg` |

Die Datumslogik liegt zentral in [src/lib/season.ts](src/lib/season.ts) (`getSeason`, Zeitzone Europe/Zurich). Die Startseite ist ISR mit `export const revalidate = 3600` ([src/app/page.tsx](src/app/page.tsx)); der Wechsel greift damit **automatisch** binnen ~1h nach dem Stichtag, ohne Deploy und ohne manuellen Eingriff. Der Vercel-Server entscheidet bei jedem Render nach Datum (kein Mac, keine Session nötig). Beide Editions-Texte leben strukturiert in [src/lib/content.ts](src/lib/content.ts) (je `sommer:`/`winter:` pro Sektion).

**Override:** Weicht die Schneelage vom Kalender ab, in [src/lib/season.ts](src/lib/season.ts) `SEASON_OVERRIDE` auf `'winter'` oder `'sommer'` setzen (wirkt per Redeploy). Vollständige Referenz: [docs/SAISON-WECHSEL.md](docs/SAISON-WECHSEL.md).

### Responsive Bildausschnitt

Beide Hero-Bilder nutzen unterschiedliche `object-position`-Werte für Desktop und Mobile, definiert in `globals.css` als `.hero-sommer-pos` und `.hero-winter-pos`. Sommer: Desktop `center 35%`, Mobile `center 40%`. Winter: Desktop `center center`, Mobile `70% center` (verschiebt nach rechts, damit das verschneite Maiensäss zentraler sitzt und die dunkle Holzwand-Kante nicht dominiert).

### Vollständiges Bild-Inventar

Aktiv in der Mobile-Sommerversion:

| Datei | Einsatz auf der Website |
|-------|-------------------------|
| `hero-sommer.png` | Hero-Bild, aktiv Mai-Oktober (echtes Foto, kein KI-Bild) |
| `hero-winter.png` | Hero-Bild, aktiv November-April |
| `sommer-wanderfamilie.png` | Sommerwoche-Banner (KI, Wanderfamilie am Maiensäss) |
| `umgebung-sommer-2.png` | Sommerumgebung Bild 1 (KI, Familie am Bergsee) |
| `region-bach.jpeg` | Sommerumgebung Bild 2 (Bergbach) |
| `abendessen-raclette.png` | Wohnen-Leitbild (KI, Raclette am langen Tisch) |
| `maiensaess-3.jpg` | Wohnen Raumkarte 1 (Doppelzimmer) |
| `familie-kinderzimmer.png` | Wohnen Raumkarte 2 (Kinder im Dreierzimmer, KI) |
| `maiensaess-5.jpg` | Wohnen Raumkarte 3 (Dachgalerie) |
| `maiensaess-2.jpg` | Wohnen Raumkarte 4 (Küche) |
| `maiensaess-6.jpg` | Wohnen Bad-Detail |
| `detail-4-sommer.png` | Familienleben Bild 1 (Wohnstube am Fenster, grüne Bergwiese). Winter-Pendant: `detail-4-winter.jpg` |
| `familie-kueche.png` | Familienleben Bild 2 (Familie am Tisch) |
| `familie-wohnzimmer-sommer.png` | Familienleben Bild 3 (KI, Wohnzimmer) |
| `gastgeber-foto.png` | Gastgeber-Sektion. **KI-Platzhalter**, TODO im Code: durch echtes Foto ersetzen |

Saison-Bildpaare (Sommer aktiv / Winter im Archiv, Wechsel siehe [docs/SAISON-WECHSEL.md](docs/SAISON-WECHSEL.md)): `hero-sommer.png`/`hero-winter.png`, `detail-4-sommer.png`/`detail-4-winter.jpg`, `anreise-sommer.jpeg`/`anreise-winter.jpg`.

Im Code vorhanden, aber aktuell NICHT gerendert (bewusst, kein Wiedereinbau geplant; Innenräume sind über Wohnen + Familienleben abgedeckt): `maiensaess-1.jpg` (Wohnstube) und `maiensaess-4.jpg` (leeres Dreierzimmer) sowie das alte `detail-4.jpg` (durch `detail-4-sommer` ersetzt, ungenutzt), `detail-1.jpg`…`detail-3.jpg` (Detailband), `usp-*`, die übrigen `region-*` (Region-Sektion), `gastgeber-portrait.png` (alte Aquarell-Illustration).

## Architektur

```
src/
  app/
    layout.tsx        Fonts, Metadata, OG-Tags, JSON-LD-Hülle
    page.tsx          Single-Page mit JSON-LD LodgingBusiness
    globals.css       Tailwind v4 + @theme Farben/Fonts, scroll-margin-top
  components/
    Header.tsx        Sticky, transparent über Hero, Sommer-Menü (Sommer/Haus/Gastgeber/Preise/Anfrage)
    Hero.tsx          Vollbild, saisonales Bild, Headline + Claim, ein CTA, links-gewichtetes Overlay
    ValueProps.tsx    Drei Sommergründe (reine Text-Karten, #sommer)
    Gastgeber.tsx     Schmale Claim-Zeile + Foto (KI-Platzhalter, TODO) + Story (#gastgeber, früh platziert)
    Sommerwoche.tsx   Banner + 3 kompakte Momente (Morgens/Tagsüber/Abends) + CTA
    Sommerumgebung.tsx  Bildsektion (2 Bilder: Familie am Wasser + Bach)
    Maiensaess.tsx    Haus: gekürzter Text + kompakte Fakten-Tabelle (#haus)
    Wohnen.tsx        So wohnen Sie hier oben: Raclette-Leitbild + 4 Raumkarten + Bad-Detail (#wohnen)
    Familienleben.tsx  Regentage-Sektion: detail-4 als grosses Leitbild + 2 kleinere Bilder
    Preise.tsx        Hauspreis-Box (ab CHF 220/Nacht) + Saisons + Inklusive
    Verfuegbarkeit.tsx  Intro + CTA + Kalender (#verfuegbarkeit)
    BookingCalendar.tsx  Sa-Sa-Wochenraster; Mobile-Akkordeon (2 → 4 → 6 Monate) + Vor/Zurück, Desktop 6 Monate + Pagination
    BookingCalendarSection.tsx  Server-Wrapper, lädt Belegung aus dem Speicher
    admin/            Admin-UI: LoginForm + BookingAdmin (Route /verwaltung)
    Anreise.tsx       Sommeranreise (Text)
    Winterteaser.tsx  Kompakter Winter-Teaser (#winter)
    Kontakt.tsx       Anfrage-Formular (reduziert: nur Headline, keine Trust-Bullets) + Adresse/Mail als Fallback
    ContactForm.tsx   Konversionsoptimiertes Anfrage-Formular, mailto-Submit
    StickyCta.tsx     Mobiler Sticky-CTA, nur beim Scrollen nach oben sichtbar
    Footer.tsx        3-Spalten + Legal-Zeile
    Region.tsx, Empfehlungen.tsx  NICHT mehr gerendert (Daten in content.ts, für Desktop-Runde)
  lib/
    content.ts        Alle Texte zentralisiert
    bookings.ts       Startbestand (Seed) + Typen
    store.ts          Belegungs-Speicher (Vercel Blob / lokale Datei)
    auth.ts           Admin-Login: Passwort, signiertes Cookie, Drosselung
    calendar.ts       Geteilte Kalender-Logik (Monatsraster, Wochen)
public/
  images/             Bilder (Hero saisonal, Sommer-Familien-/Umgebungsbilder, Galerie-Archiv)
```

### Mobile-First-Sommerversion (Stand 2026-06-06, live)

Mobile-First-Sommerversion mit Conversion-Fokus auf Sommerbuchungen (Juni bis September). Live auf `aclavigliaradons.ch` (Deploy `f5bf5a6`).

**Sektionsreihenfolge:** Hero · Sommergründe (`#sommer`) · Gastgeber (`#gastgeber`) · Sommerwoche (`#sommerwoche`) · Sommerumgebung (`#sommerumgebung`) · Haus (`#haus`) · So wohnen Sie hier oben (`#wohnen`) · Familienleben · Preise (`#preise`) · Verfügbarkeit (`#verfuegbarkeit`) · Sommeranreise (`#anreise`) · Winterteaser (`#winter`) · Kontakt (`#kontakt`) · Footer.

**Kernentscheide:**

- **Gastgeber bewusst früh** (Position 3) als Vertrauensanker vor Preis/Verfügbarkeit.
- **Claim** „Ein Maiensäss. Geführt wie ein gutes Hotel." im Hero (unter der Headline) und als schmale Zeile über dem Gastgeber. Der frühere dunkle Claim-Block (`Claim.tsx`) wurde entfernt.
- **Hero:** ein CTA, kein Scroll-Pfeil; links-gewichtetes Overlay (links dunkel für Lesbarkeit, rechts hell, damit das Maiensäss sichtbar bleibt) plus Mobile-only Boden-Verlauf.
- **Preise:** ganzes Haus „ab CHF 220 pro Nacht für bis zu 5 Personen". Kein Pro-Person-/Bettpreis. Keine öffentliche Rabatt-/Aktionskommunikation (Stammgäste-Aktionen laufen separat per E-Mail).
- **Kalender mobil:** Akkordeon (Default 2 Monate → +2 → alle 6) plus Vor/Zurück nach vollem Aufklappen, damit jeder Monat erreichbar ist. Desktop: 6 Monate + Pagination.
- **Sticky-CTA (mobil):** erscheint nur beim Scrollen nach oben, nicht im Hero, blendet im Kontaktbereich aus. Desktop: kein Sticky.
- **Mobile-Abstände** `py-16`; Desktop (`md:`) bewusst grosszügig für eine spätere dedizierte Desktop-Runde. Region/Empfehlungen ausgeblendet, Haus-Raumgalerie und Detail-Bildband in der Mobile-Version nicht gerendert (Daten in `content.ts` erhalten).

**QA (2026-06-06):** Build + Lint sauber, alle referenzierten Bilder vorhanden (live 200), iPhone 390 px und Desktop 1280 px geprüft (Sektionsreihenfolge, Texte, Formular, Kalender, Sticky-CTA, kein horizontaler Overflow, alt-Texte, eine `h1`).

**Desktop-Audit (2026-06-07, 1440 px):** Desktop rendert über die `md:`/`lg:`-Breakpoints durchgehend sauber und premium; keine kaputten Layouts. Entscheid Auftraggeber: **keine Wiedereinbindung** von Haus-Galerie/Region/Empfehlungen (Innenräume sind über Wohnen + Familienleben abgedeckt, eine zweite Galerie würde duplizieren). Nächster inhaltlicher Hebel ist die Winter-Edition im Oktober (siehe [docs/SAISON-WECHSEL.md](docs/SAISON-WECHSEL.md)). Weiterhin offen: echtes Gastgeberfoto statt KI-Platzhalter.

## Design-System

| Token | Wert | Verwendung |
|-------|------|------------|
| `parchment` | `#FAF5EC` | Hauptfläche |
| `linen` | `#F2E8D5` | Sektion-Hintergrund warm |
| `ink` | `#2A1F14` | Fliesstext |
| `soapstone` | `#3B2A1A` | Headlines, Markenfarbe |
| `larch` | `#7A6039` | Sekundäre Headlines, Links (auf AA-Kontrast 4.5:1 abgedunkelt) |
| `brass` | `#BFA77A` | Akzentlinien, Trenner |
| `brass-light` | `#D9C9A6` | Heller Akzent |
| `charcoal` | `#1F1B17` | Footer, dunkle Sektionen |
| `cream` | `#FBF7EE` | Karten-Hintergrund |

Definiert in [src/app/globals.css](src/app/globals.css) im `@theme`-Block (Tailwind v4). Klassen-Beispiel: `bg-parchment`, `text-soapstone`, `border-brass`.

## Inhalte ändern

Sämtliche Texte sind in [src/lib/content.ts](src/lib/content.ts) zentralisiert. Bildreferenzen ebenso. Komponenten sind reine Layout-Container, die aus diesem Objekt rendern.

## Belegungskalender pflegen

Buchungen liegen im **privaten Vercel Blob Store** (`acla-viglia-bookings`) und werden über den passwortgeschützten Admin gepflegt. [src/lib/bookings.ts](src/lib/bookings.ts) ist nur noch der **Startbestand (Seed)**, falls der Speicher leer ist, nicht der laufende Datensatz.

**Workflow für Angela:**

1. `/verwaltung` öffnen (z.B. `aclavigliaradons.ch/verwaltung`), Passwort eingeben, bleibt eingeloggt
2. Woche im Kalender anklicken
3. Status wählen: **Frei** oder **Belegt**
4. Bei Belegt optional den Kundennamen eintragen (nur intern sichtbar, nie öffentlich)
5. Speichern. Die öffentliche Seite zeigt die Änderung innert Sekunden

Kein Code, kein Git, kein Deploy. Woche von Anreise- bis Abreise-Samstag (Sa zu Sa).

**Ausnahme (einzelne Tage / abweichender Zeitraum):** Unter dem Kalender steht das Feld «Ausnahme: einzelne Tage / Zeitraum blockieren». Mit zwei Datumsfeldern (Anreise / Abreise) lässt sich ein beliebiger Zeitraum belegen, auch einzelne Nächte, unabhängig vom Sa-zu-Sa-Raster. Überschneidungen mit einer bestehenden Buchung werden abgelehnt (zuerst entfernen), Angrenzen am selben Tag ist erlaubt. In der Buchungs-Übersicht darunter lässt sich jeder Eintrag einzeln «Bearbeiten» oder «Entfernen». Eine Woche mit einzeln blockierten Tagen ist öffentlich nicht mehr als Ganzwoche anklickbar, die betroffenen Tage erscheinen aber korrekt als belegt.

**Datenmodell** (eine Buchung = ein Zeitraum, Standardfall eine Woche):

```ts
{ start: '2026-12-19', end: '2026-12-26', status: 'booked', note: 'Familie Müller' }
```

- `start` = Anreise-Samstag, `end` = Abreise-Samstag (exklusiv, Tag bleibt weiss)
- `status`: `'booked'` (larch). Die Typen `'reserved'`/`'closed'` bleiben im Datenmodell, der Admin bietet aber nur Frei/Belegt
- `note` = Kundenname, rein intern. Wird für alle öffentlichen Konsumenten serverseitig entfernt (`getPublicBookings`), erscheint nie im Seitenquelltext

**Anzeige-Logik:** Wochen sind als Samstag-zu-Freitag-Zeilen gerendert (eine Zeile = eine buchbare Woche, bewusst am Anreisetag ausgerichtet). Der Samstag ist Wechseltag und wird als **diagonal geteilte Zelle** dargestellt: Anreisetag = untere-rechte Hälfte gefärbt (Gast kommt nachmittags), Abreisetag = obere-linke Hälfte (Gast reist vormittags ab), reiner Wechseltag (Abreise + Anreise am selben Samstag) = voll gefärbt mit dünner Naht. Innentage (So bis Fr) sind voll gefärbt. Verfügbarkeit ist nach Nächten modelliert (halboffenes Intervall `[start, end)`, der Abreisetag bleibt frei und für die Folgewoche buchbar). Die Logik steckt in `dayShape()` / `cellBackground()` in [src/lib/calendar.ts](src/lib/calendar.ts), gespiegelt im öffentlichen Kalender und im Admin-Editor. Klick auf eine freie Woche schreibt `#kontakt?from=...&to=...` in die URL und füllt das Anfrage-Formular vor. Standard-Ansicht startet automatisch beim **aktuellen Monat** (dynamisch), Navigation in 6-Monats-Schritten.

**Technik:** Login via signiertes Cookie ([src/lib/auth.ts](src/lib/auth.ts)), Speicher-Abstraktion in [src/lib/store.ts](src/lib/store.ts) (Vercel Blob in Produktion, lokale Datei `.data/bookings.json` in der Entwicklung). Benötigte Umgebungsvariablen: `ADMIN_PASSWORD`, `AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN` (siehe [.env.example](.env.example)).

## Anfrage-Formular

[src/components/ContactForm.tsx](src/components/ContactForm.tsx) ist eine native React-Form mit:

Konversionsoptimiert auf eine erste Anfrage reduziert (kein Buchungsformular). Felder:

- Anreise / Abreise (Pflicht, HTML5-Datepicker, Anreise ab heute, Abreise ab Anreise)
- Anzahl Personen (Pflicht, Dropdown 2 bis 8)
- Name (Pflicht), E-Mail (Pflicht, validiert)
- Telefon (optional), Bemerkungen (optional)
- Verfügbarkeits-Check gegen die aktuelle Belegung, freundlicher Hinweis bei Überlappung
- Pre-Fill aus `#kontakt?from=...&to=...` (vom Kalender-Klick). Feld-IDs mit Prefix `anfrage-` (vermeidet ID-Kollision mit Sektion `#anreise`)
- CTA "Unverbindlich anfragen", darunter Hinweis "Sie erhalten eine persönliche Rückmeldung von Angela oder Gallus."
- Submit baut einen strukturierten deutschen mailto-Link mit Subject und Body und öffnet den Mail-Client. Nach Klick wechselt die Form zu einem "Danke"-Bestätigungspanel mit Reset-Link.

Entfernt gegenüber der Vorversion: getrennte Felder Erwachsene/Kinder inkl. Personen-Total-Logik, Herkunfts-Dropdown.

Inline-Validierung, accessible Labels, mobile-friendly.

**Mail-Schalter `MAIL_AKTIV`:** Der Schalter in [ContactForm.tsx](src/components/ContactForm.tsx) steht aktuell auf `true`, das Formular ist aktiv (mailto an `ferien@aclavigliaradons.ch`). Bei gestörtem Mailempfang auf `false` setzen: dann ersetzt das Formular den Absende-Button durch den Hinweis "Bitte rufen Sie uns an" plus Telefonnummer, Enter löst keinen mailto aus, und die E-Mail-Adresse wird überall ausgeblendet (Kontakt, Footer, JSON-LD, llms.txt). Zum Wieder-Einblenden umgekehrt vorgehen und `vercel --prod` deployen.

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

Der Mail-Entwurf an Thomas liegt unter [../email-thomas-domain-hosting.md](../email-thomas-domain-hosting.md).

**Status (2026-06-04):** Thomas hat **Variante 1** gewählt (er behält Domain + Mail, passt nur das Hosting via DNS an). `aclavigliaradons.ch` und `www` sind im Vercel-Projekt bereits hinterlegt und auf das aktuelle Production-Deployment aliased. Offen: Thomas setzt die zwei DNS-Einträge bei Hoststar (A `aclavigliaradons.ch` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`). Danach ist die Domain live, SSL automatisch. www leitet per 308 auf die Hauptdomain (in `next.config.ts`).

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

## Galerie und Partner-Inserate (sentiero.ch)

Die Foto-Galerie liegt unter `/galerie` ([src/app/galerie/page.tsx](src/app/galerie/page.tsx)), Inhalte in `galerie` in [src/lib/content.ts](src/lib/content.ts). Sie zeigt bewusst Sommer- und Winterbilder und bleibt damit ganzjährig aktuell, ohne Saison-Logik. Verlinkt im Top-Menü (Desktop + Mobile) und im Footer.

Die Galerie ist zugleich das **Klick-Ziel externer Inserate**. Das Inserat **BH575 Acla Viglia Radons** auf [sentiero.ch](https://www.sentiero.ch/de65_berghuette-miete-graubuenden.htm) verlinkt mit allen Fotos und „Mehr Fotos" auf die Pfade der früheren Webseite. Diese werden in [next.config.ts](next.config.ts) per 308 umgeleitet:

- `/impressionen1/*` → `/galerie`
- `/preise-belegung` → `/#preise`

**Wichtig:** `/galerie` und diese Redirects nicht entfernen und den `/galerie`-Pfad bei künftigen Umbauten stabil halten, sonst laufen die Bestandslinks von sentiero.ch wieder ins Leere (404). Das Wohnküchen-Bild der Galerie (`wohnkueche-cheminee.jpg`) ist eine KI-bereinigte (hundefreie) Version, das Originalfoto bleibt unter `maiensaess-1.jpg` erhalten.

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

## SEO/KI-Sichtbarkeit

Umgesetzt (Stand 2026-06-06, live):

- JSON-LD `LodgingBusiness` erweitert: `makesOffer` (ab CHF 220), `slogan`, `currenciesAccepted`, `ReserveAction`, Amenities, Geo, Adresse
- JSON-LD `FAQPage` (7 Q&A: Personenzahl, Sommer-/Winteranreise, Preis, Haustiere, WLAN, Buchung)
- OG-Bild `public/images/og-image.jpg` (1200×553, ~278 KB) mit deklarierten Massen; `og`/`twitter` gesetzt
- `sitemap.xml` (`sitemap.ts`), `robots.txt` (`robots.ts`, erlaubt explizit KI-Bots, sperrt `/verwaltung`), `public/llms.txt` (ausführlich)
- Geschärfte `description` + erweiterte Keywords, `canonical`, `metadataBase`

Offen:

- Favicon: Serif-Monogramm „A" (Cormorant Garamond 600, als Vektor-Outline) in Messing #D9C9A6 auf Anthrazit #1F1B17 mit Messing-Rahmen, als `icon.svg` (skalierbar) + `favicon.ico` (16/32/48, RGBA) + `apple-icon.png` (180). Offen: PWA-Manifest-Icons 192/512 + `manifest.webmanifest`
- Eigenes gerendertes OG-Image mit Headline (optional, statt Foto-Crop)
- Google Search Console + Bing Webmaster
- Listings: Graubünden Ferien, MySwitzerland, Parc Ela
- Lighthouse 95+ in allen vier Kategorien

## Was die Demo bewusst NICHT hat

- Kein Backend-Versand (Form öffnet Mail-Client des Besuchers). Bewusster
  Entscheid, von Angela praktisch getestet und von Marco am 15.07.2026
  bestätigt: bleibt so.
- Kein GTM, kein Plausible. Seit 15.07.2026 läuft Vercel Web Analytics
  (cookiefrei, keine Wiedererkennung einzelner Personen, deshalb ohne
  Consent-Banner). Muss im Vercel-Dashboard aktiviert sein, sonst lädt das
  Script ins Leere.
- Keine Cookies für Gäste, kein Consent-Banner. Ausnahme, schon vorher: das
  technisch notwendige Session-Cookie `av_session` im Admin unter
  `/verwaltung`. Beides ist in `/datenschutz` deklariert.
- Keine Mehrsprachigkeit
- Keine externen Widgets (Maps, Wetter)
- Keine Newsletter-Anmeldung

## Hinweise zur Marke

- Gastgeber-Bild ist eine **Aquarell-Illustration**, nicht ein Foto. (Caption "Illustration · Foto-Porträt folgt" wurde auf Wunsch der Auftraggeber entfernt.)
- Schweizer Hochdeutsch, `ss` statt `ß`, keine Gedankenstriche (`—` oder `–`) als Satzzeichen.
- Anrede: `Sie`.
