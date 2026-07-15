import type { Season } from '@/lib/season'

// Erstes Nav-Label folgt der Saison (Sommer/Winter), der Rest bleibt gleich.
// Der Anchor #sommer bleibt stabil (interne Section-ID, für Gäste unsichtbar).
export function getNavigation(season: Season) {
  return [
    { label: season === 'winter' ? 'Winter' : 'Sommer', href: '#sommer' },
    { label: 'Haus', href: '#haus' },
    { label: 'Galerie', href: '/galerie' },
    { label: 'Gastgeber', href: '#gastgeber' },
    { label: 'Preise', href: '#preise' },
    { label: 'Anfrage', href: '#kontakt' },
  ]
}

export const brand = {
  name: 'ACLA VIGLIA RADONS',
  location: 'Savognin · Val Surses · 1885 m',
  email: 'ferien@aclavigliaradons.ch',
  postal: 'Radons 104, 7464 Surses',
  region: 'Graubünden, Schweiz',
}

// Gemeinsame Felder plus saisonale Varianten. Hero.tsx liest hero.eyebrow etc.
// und hero[season].headline. Winter-Texte aus docs/SAISON-WECHSEL.md.
// Der Claim "Ein Maiensäss. Geführt wie ein gutes Hotel." stand hier UND über
// den Gastgebern, zweimal innerhalb von zwei Bildschirmen. Er lebt jetzt nur
// noch dort (siehe `claim`), wo er die beiden Hoteliers einleitet. Der Hero
// trägt die Aussage weiterhin über die trust-Zeile "Persönlich geführt von".
export const hero = {
  eyebrow: 'MAIENSÄSS IN RADONS · 1885 M',
  primaryCta: { label: 'Verfügbarkeit prüfen', href: '#verfuegbarkeit' },
  trust: 'Persönlich geführt von Angela und Gallus · Samstag bis Samstag',
  sommer: {
    headline: 'Eine Woche, die länger nachwirkt.',
    subline:
      'Berge, Ruhe und ein Haus, das für gemeinsame Zeit gebaut wurde.',
    image: '/images/hero-sommer.png',
    alt: 'Maiensäss ACLA VIGLIA RADONS im Sommer mit Steinbock-Skulpturen und Bergpanorama in Radons',
    positionClass: 'hero-sommer-pos',
  },
  winter: {
    headline: 'Ski an der Tür. Feuer im Haus. Ruhe im Tal.',
    subline:
      'Direkt an der Piste, ohne Autoverkehr, mit Feuer im Haus und Zeit für Familie und Freunde.',
    image: '/images/hero-winter.png',
    alt: 'Verschneites Maiensäss ACLA VIGLIA RADONS im Tiefwinter mit Bergkette in Radons',
    positionClass: 'hero-winter-pos',
  },
}

// Drei Saisongründe (reine Text-Karten, bewusst ohne Bilder gegen Bildüberladung).
// ValueProps.tsx liest valueProps[season]. Winter-Texte aus docs/SAISON-WECHSEL.md.
export const valueProps = {
  sommer: {
    eyebrow: 'WARUM IM SOMMER',
    headline: 'Warum Gäste im Sommer bleiben.',
    cards: [
      {
        number: '01',
        title: 'Ankommen. Parkieren. Durchatmen.',
        body: 'Von Ende Mai bis Ende Oktober fahren Sie bequem bis vor das Maiensäss. Danach wird es still: keine Hektik, kein Durchgangsverkehr, nur Radons und die Berge.',
      },
      {
        number: '02',
        title: 'Eine Woche, die nicht lang wird.',
        body: 'Wandern ab der Haustür, Bergseen, Bikewege, Origen in Riom, Ruhetage im Haus und Abende am Feuer. Der Sommer hier oben hat Raum für Familien, Freunde und stille Tage.',
      },
      {
        number: '03',
        title: 'Nachts wird der Himmel dunkel.',
        body: 'Radons liegt weit weg vom Licht der grossen Orte. An klaren Abenden sieht man Sterne, wie man sie im Mittelland kaum noch kennt.',
      },
    ],
  },
  winter: {
    eyebrow: 'WARUM IM WINTER',
    headline: 'Warum Gäste im Winter kommen.',
    cards: [
      {
        number: '01',
        title: 'Ski anziehen. Losfahren. Zurück bis vors Haus.',
        body: 'Die Piste der Savognin Bergbahnen liegt direkt am Maiensäss. Morgens starten Sie vor der Tür. Abends kommen Sie mit Skiern oder Schlitten zurück.',
      },
      {
        number: '02',
        title: 'Kein Autoverkehr. Mehr Winter.',
        body: 'Im Winter bleibt die Strasse nach Radons geschlossen. Gäste kommen mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus. Oben bleibt es still: nur der Wind, der Schnee und das Feuer im Ofen.',
      },
      {
        number: '03',
        title: 'Feuer drinnen. Dunkelheit draussen.',
        body: 'Zwei Specksteinöfen und ein offenes Cheminée wärmen das Haus. Wenn der Himmel klar ist, sieht man über Radons Sterne, die im Tal unten verschwunden sind.',
      },
    ],
  },
}

// Name historisch (sommerwoche), Inhalt saisonal. Sommerwoche.tsx liest
// sommerwoche.cta und sommerwoche[season]. Winter aus docs/SAISON-WECHSEL.md.
export const sommerwoche = {
  cta: { label: 'Verfügbarkeit prüfen', href: '#verfuegbarkeit' },
  sommer: {
    eyebrow: 'SOMMERWOCHE IN RADONS',
    headline: 'So fühlt sich eine Woche hier oben an.',
    banner: {
      src: '/images/sommer-wanderfamilie.png',
      alt: 'Wanderfamilie auf dem Weg zum Maiensäss Acla Viglia in Radons im Sommer',
    },
    timeline: [
      {
        time: 'Morgens',
        text: 'Kaffee am Fenster. Die Sonne steht früh an den Hängen.',
      },
      {
        time: 'Tagsüber',
        text: 'Wandern, Bergseen, Alp Flix oder einfach vor dem Haus bleiben.',
      },
      {
        time: 'Abends',
        text: 'Feuer, Wein und Sterne über Radons.',
      },
    ],
  },
  winter: {
    eyebrow: 'WINTERWOCHE IN RADONS',
    headline: 'Ein Wintertag in Radons.',
    banner: {
      src: '/images/winter-familie.png',
      alt: 'Familie mit Schlitten vor dem verschneiten Maiensäss Acla Viglia in Radons bei Dämmerung',
    },
    timeline: [
      {
        time: 'Morgens',
        text: 'Frische Spur im Schnee, bevor die Piste voll ist.',
      },
      {
        time: 'Tagsüber',
        text: 'Skifahren, Schlitteln, Schneeschuhe oder ein Tag am Feuer.',
      },
      {
        time: 'Abends',
        text: 'Käse auf dem Tisch, Holz im Ofen, draussen wird es früh dunkel.',
      },
    ],
  },
}

// Name historisch, Inhalt saisonal. Sommerumgebung.tsx liest sommerumgebung[season].
// Winter hat zusätzlich ein breites Leitbild (volle Sektionsbreite über dem 2er-Grid),
// Sommer nicht (leitbild: null). Winter aus docs/SAISON-WECHSEL.md.
export const sommerumgebung = {
  sommer: {
    eyebrow: 'SOMMERUMGEBUNG',
    headline: 'Wiesen, Wege und Wasser direkt vor dem Haus.',
    intro:
      'Vom Haus aus sind Sie sofort draussen: auf dem Weg, am Bach, auf der Wiese oder einfach auf der Bank vor der Tür.',
    leitbild: null,
    images: [
      {
        src: '/images/umgebung-sommer-2.png',
        alt: 'Familie auf einem Sommerweg an einem Bergsee bei Radons mit Bergpanorama',
        caption: 'Sommerwege für Familien und ruhige Tage.',
      },
      {
        src: '/images/region-bach.jpeg',
        alt: 'Kristallklarer Bergbach über Steinen mit Berggipfel im Parc Ela',
        caption: 'Kristallklare Bergbäche und frische Höhenluft.',
      },
    ],
  },
  winter: {
    eyebrow: 'WINTERUMGEBUNG',
    headline: 'Piste, Schnee und stille Wege vor der Tür.',
    intro:
      'Vom Haus aus sind Sie sofort im Schnee: auf der Piste, auf der Schlittenbahn, auf Schneeschuhen oder auf der Bank in der Wintersonne.',
    leitbild: {
      src: '/images/dorf-radons-winter.png',
      alt: 'Das verschneite Maiensäss-Dorf Radons in der Wintersonne mit Bergkette',
      caption: 'Das verschneite Dörfchen Radons in der Wintersonne.',
    },
    images: [
      {
        src: '/images/region-tiefschnee.webp',
        alt: 'Tiefverschneiter Hang über Radons mit Skitouren- und Schlittenspuren',
        caption: 'Tiefschnee und stille Wege über Radons.',
      },
      {
        src: '/images/region-skigebiet.jpg',
        alt: 'Verschneite Maiensässe vor der Bergkette von Savognin im Winter',
        caption: 'Die Bergkulisse von Savognin im Winter.',
      },
    ],
  },
}

export const maiensaess = {
  eyebrow: 'DAS HAUS',
  headline: 'Platz für Familie, Freunde und ruhige Tage.',
  paragraphs: [
    'Das Maiensäss bietet Raum für 2 bis 8 Personen auf zwei Geschossen und einer Dachgalerie. Der Mittelpunkt ist die Wohnküche mit rustikalem Tisch, Feuerstelle und Blick nach draussen.',
    'Ob Familienwoche, Wanderferien oder ein paar Tage mit Freunden: Das Haus ist einfach, warm und sorgfältig geführt.',
  ],
  facts: [
    { label: 'Lage', value: 'Maiensäss-Dorf Radons, 1885 m' },
    { label: 'Kapazität', value: '2 bis 8 Personen' },
    {
      label: 'Schlafen',
      value: '1 Doppelzimmer, 1 Dreierzimmer, 2 Doppelmatratzen in der Dachgalerie',
    },
    { label: 'Bad', value: '2 separate WCs, eines mit Dusche' },
    {
      label: 'Küche',
      value: 'Geschirrspüler, 2 Kühlschränke, Holz- und Elektroherd',
    },
    {
      label: 'Wärme',
      value: '2 Specksteinöfen, offener Cheminée, Bodenheizung im Erdgeschoss',
    },
    { label: 'Skipiste', value: 'Direkt am Haus' },
    { label: 'WLAN', value: 'Vorhanden' },
    { label: 'Haustiere', value: 'Erlaubt, nach Absprache' },
  ],
  // Galerie und Detailband bleiben als Daten erhalten (Desktop-Runde), werden in der
  // Mobile-Sommerversion aber nicht gerendert. Das Familienleben trägt die Innenbilder.
  gallery: [
    {
      src: '/images/maiensaess-1.jpg',
      alt: 'Wohnstube mit Specksteinofen und Esstisch',
    },
    { src: '/images/maiensaess-2.jpg', alt: 'Küche mit Backofen und Spüle' },
    {
      src: '/images/maiensaess-3.jpg',
      alt: 'Elternschlafzimmer mit Doppelbett',
    },
    { src: '/images/maiensaess-4.jpg', alt: 'Kinderzimmer mit Etagenbett' },
    {
      src: '/images/maiensaess-5.jpg',
      alt: 'Dachgalerie mit Matratzen unter Holzbalken',
    },
    { src: '/images/maiensaess-6.jpg', alt: 'Badezimmer mit Dusche' },
  ],
  details: [
    {
      src: '/images/detail-4-sommer.png',
      alt: 'Schaukelstuhl mit Blick auf die grüne Bergwiese',
    },
    {
      src: '/images/detail-3.jpg',
      alt: 'Wohnzimmer mit Specksteinofen',
    },
    { src: '/images/detail-2.jpg', alt: 'Küche mit Holzbalken' },
    {
      src: '/images/detail-1.jpg',
      alt: 'Gewürzregal mit Becher-Reihe an der Decke',
    },
  ],
}

export const wohnen = {
  eyebrow: 'SO WOHNEN SIE HIER OBEN',
  headline: 'Gemeinsam essen, schlafen, ankommen.',
  intro:
    'Das Maiensäss ist für gemeinsame Tage gemacht: ein rustikaler Holztisch, warme Räume, Schlafplätze für Familien und Freunde und genug Rückzug, wenn das Wetter einmal wechselt.',
  hero: {
    src: '/images/abendessen-raclette.png',
    alt: 'Freundesgruppe beim Raclette am rustikalen Holztisch im Maiensäss bei Kerzenlicht und Cheminée-Feuer',
    caption: 'Der rustikale Holztisch ist das Herz des Hauses.',
  },
  rooms: [
    {
      src: '/images/maiensaess-3.jpg',
      alt: 'Doppelzimmer mit Edelweiss-Bettwäsche und Fenster mit Bergblick',
      caption: 'Das grosse Doppelzimmer mit Blick auf die Berge.',
    },
    {
      // Kinder im Dreierzimmer: emotional statt leeres Raumfoto. Steht NUR hier,
      // nicht mehr in [[Familienleben]] (kein Dreierzimmer-Duplikat).
      src: '/images/familie-kinderzimmer.png',
      alt: 'Kinder im Dreierzimmer mit Kajütenbett aus Holz',
      caption: 'Drei Betten für Kinder, Jugendliche oder Freunde.',
    },
    {
      src: '/images/maiensaess-5.jpg',
      alt: 'Dachgalerie mit zusätzlichen Schlafplätzen unter Holzbalken',
      caption: 'Zusätzliche Schlafplätze auf der Dachgalerie.',
    },
    {
      src: '/images/maiensaess-2.jpg',
      alt: 'Gut ausgestattete Küche mit Holz- und Elektroherd',
      caption: 'Gut ausgestattete Küche für eine ganze Woche.',
    },
  ],
  detail: {
    src: '/images/maiensaess-6.jpg',
    alt: 'Badezimmer mit Dusche',
    caption: 'Bad mit Dusche und separaten WCs.',
  },
}

// Regentage/graue Tage. eyebrow gemeinsam, Rest saisonal. Familienleben.tsx liest
// familienleben.eyebrow und familienleben[season] ([lead, ...rest] aus images).
// Nur das Leitbild (images[0]) wechselt die Saison, die zwei Familienbilder bleiben.
export const familienleben = {
  eyebrow: 'FAMILIENLEBEN IM HAUS',
  sommer: {
    headline: 'Auch Regentage haben hier ihren Platz.',
    text: 'Manchmal bleibt man einfach drinnen. Die Kinder spielen, das Feuer brennt, jemand kocht, jemand liest. Viele Gäste nutzen das Haus genau so.',
    images: [
      {
        src: '/images/detail-4-sommer.png',
        alt: 'Schaukelstuhl am grossen Fenster der Wohnstube mit Blick auf die grüne Bergwiese',
        caption: 'Ein Buch. Ein Feuer. Ein Blick nach draussen.',
      },
      {
        src: '/images/familie-kueche.png',
        alt: 'Familie beim Frühstück am grossen Holztisch der Wohnküche mit offenem Cheminée',
        caption: 'Morgens Kaffee, Brot und Zeit am grossen Tisch.',
      },
      {
        src: '/images/familie-wohnzimmer-sommer.png',
        alt: 'Familie im Wohnzimmer des Maiensäss, Kinder spielen auf dem Boden vor dem Specksteinofen',
        caption: 'Drinnen spielen, lesen, Feuer machen.',
      },
    ],
  },
  winter: {
    headline: 'Auch graue Tage haben hier ihren Platz.',
    text: 'Manchmal bleibt man einfach drinnen. Die Kinder spielen, das Feuer brennt, jemand kocht, jemand liest.',
    images: [
      {
        src: '/images/detail-4-winter.jpg',
        alt: 'Schaukelstuhl am grossen Fenster der Wohnstube mit Blick auf die verschneite Bergwiese',
        caption: 'Ein Buch. Ein Feuer. Ein Blick nach draussen.',
      },
      {
        src: '/images/familie-kueche.png',
        alt: 'Familie beim Frühstück am grossen Holztisch der Wohnküche mit offenem Cheminée',
        caption: 'Morgens Kaffee, Brot und Zeit am grossen Tisch.',
      },
      {
        src: '/images/familie-wohnzimmer-sommer.png',
        alt: 'Familie im Wohnzimmer des Maiensäss, Kinder spielen auf dem Boden vor dem Specksteinofen',
        caption: 'Drinnen spielen, lesen, Feuer machen.',
      },
    ],
  },
}

export const claim = {
  text: 'Ein Maiensäss. Geführt wie ein gutes Hotel.',
}

export const gastgeber = {
  eyebrow: 'GASTGEBER',
  headline: 'Angela und Gallus Liesch-Lombris.',
  paragraphs: [
    'Wir stammen aus dem Albulatal. Über 25 Jahre lang führten wir das Hotel Restaurant Rätia in Filisur, ein traditionsreiches Haus an der UNESCO-geschützten Albulalinie der Rhätischen Bahn.',
    'Heute geben wir diese Erfahrung persönlicher weiter: in unserem Maiensäss in Radons. Anfragen beantworten wir selbst. Empfehlungen geben wir aus eigener Erfahrung. Und bei Ihrer Ankunft finden Sie unsere handgeschriebene Sammlung mit Beizen, Wanderungen und Lieblingsorten im Tal.',
    'Allegra. Willkommen bei uns oben.',
  ],
  signature: 'Angela und Gallus Liesch-Lombris',
  meta: 'Ehemals Hotel Restaurant Rätia, Filisur · Persönlich geführt seit 2020',
  // TODO: durch echtes Foto von Angela und Gallus ersetzen, sobald vorhanden.
  // Aktuell temporärer KI-Platzhalter.
  image: '/images/gastgeber-foto.png',
}

export const region = {
  eyebrow: 'VAL SURSES UND PARC ELA',
  headline:
    'Im Herzen Graubündens, am Rand des grössten Naturparks der Schweiz.',
  intro:
    'Die Ferienregion Val Surses Savognin Bivio liegt im Parc Ela, im romanischsprachigen Val Surses. Hier treffen drei Sprachräume aufeinander, hier liegt einer der grössten zusammenhängenden Naturschutzräume der Alpen, und hier gibt es ein Skigebiet, das ohne den Massentourismus der grossen Orte funktioniert.',
  mosaic: [
    {
      src: '/images/region-parcela.jpeg',
      alt: 'Lai Barnagn, Bergsee mit Bergpanorama',
    },
    {
      src: '/images/usp-lage.jpeg',
      alt: 'Maiensäss-Dorf Radons mit Bergpanorama',
    },
    { src: '/images/region-blumen.jpeg', alt: 'Wildblumen vor Tal und Bergen' },
    { src: '/images/region-bach.jpeg', alt: 'Bergbach zwischen Steinen' },
  ],
  winter: {
    label: 'WINTER',
    image: '/images/region-skigebiet.jpg',
    alt: 'Winter-Aussenaufnahme mit Blick über das verschneite Tal',
    items: [
      'Skigebiet Savognin: 80 km Pisten, sonnenexponiert, familienfreundlich',
      'Schlitteln auf beleuchteter Bahn',
      'Schneeschuhwandern ab der Haustür',
      'Skitouren am Piz Martegnas',
      'Langlauf im Tal',
    ],
    extraImage: {
      src: '/images/region-tiefschnee.webp',
      alt: 'Verschneiter Hang mit Skitourenspuren im Tiefschnee oberhalb der Maiensäss-Häuser von Radons',
      caption: 'Unverspurter Tiefschnee direkt oberhalb der Hütten',
    },
  },
  summer: {
    label: 'SOMMER',
    items: [
      'Wandern: Lai Barnagn, Piz Martegnas, Alp Flix',
      'Mountainbike: ausgeschilderte Trails, E-Bike-Vermietung in Savognin',
      'Golf: Golfplatz Alvaneu, 30 Minuten',
      'Origen Festival Cultural in Riom, international beachtet',
      'Sternenhimmel: Radons liegt in einer Zone mit sehr geringer Lichtverschmutzung',
    ],
    extraImages: [
      {
        src: '/images/region-pferde.webp',
        alt: 'Freilaufende Pferde mit Fohlen auf der Sommerweide von Radons vor Bergpanorama',
        caption: 'Sömmerung auf den Weiden von Radons',
      },
      {
        src: '/images/region-wegweiser.webp',
        alt: 'Gelber Wanderwegweiser in Radons auf 1885 Metern mit Zielen Alp Schmorras, Piz Martegnas und Savognin',
        caption: 'Wanderknotenpunkt Radons, 1885 m',
      },
    ],
  },
}

// Preis-Grundwerte: EINE Quelle. Die Anzeige-Strings unten sowie JSON-LD, FAQ
// (page.tsx) und llms.txt (route.ts) leiten hieraus ab. Preisänderung nur hier.
export const preisWerte = {
  min: 220, // Untergrenze, Nebensaison Sommer
  max: 280, // Obergrenze, Hochsaison Winter / Festtage
  sommerHoch: 260, // Juli und August
  winterNeben: 260, // Nebensaison Winter
  // Pro weitere erwachsene Person und Nacht. Angeglichen an den Nachtpreis des
  // Hauses (Entscheid Marco 15.07.2026), vorher inkonsistent als "pro Tag" geführt.
  extraPerson: 10,
  cleaning: 195, // Endreinigung pauschal
  laundry: 25, // Bett- und Frotteewäsche pro Woche und Person
  // Gästetaxe Gemeinde Surses, Ausführungsbestimmungen zum GTT ab 01.05.2024, Art. 7.
  // Radons hat PLZ 7464 Parsonz und liegt damit in Feriendestinationszone C
  // (Tinizong, Rona, Riom, Parsonz) = CHF 2.50, nicht Zone A Savognin = CHF 4.00.
  // Erhebung pro LOGIERNACHT (GTT Art. 4), nicht pro Kalendertag.
  taxAdult: 2.5,
  // GTT Art. 6 Abs. 2: Kinder vom vollendeten 6. bis 16. Altersjahr zahlen die Hälfte.
  // Art. 6 Abs. 1 lit. a: Kinder unter 6 Jahren sind befreit (bewusst nicht auf der
  // Seite ausgewiesen, wird bei der Anfrage persönlich geklärt).
  taxChild: 1.25,
  personsBase: 5, // im Grundpreis enthalten
  capacityMin: 2,
  capacityMax: 8,
  nightsPerWeek: 7, // Sa bis Sa = 7 Logiernächte, 8 Kalendertage
}

// Formatiert CHF-Beträge: ganze Zahl ohne Dezimal, sonst zwei Stellen (2.50, 1.25).
// Tausender mit Schweizer Hochkomma (CHF 1'540).
export function chf(n: number): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2)
  const [whole, frac] = s.split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "'")
  return `CHF ${frac ? `${grouped}.${frac}` : grouped}`
}

// Wochenpreis aus dem Nachtpreis. Eine Quelle, keine zweite Zahlenpflege.
export function chfWoche(proNacht: number): string {
  return chf(proNacht * preisWerte.nightsPerWeek)
}

export const preise = {
  eyebrow: 'PREISE',
  headline: 'Transparent. Inklusive.',
  intro:
    'Wochenmiete von Samstag bis Samstag. Alle Nebenkosten sind im Preis enthalten, ausser Endreinigung, Wäsche und Kurtaxen.',
  priceBox: {
    label: 'Das ganze Maiensäss',
    prefix: 'ab',
    amount: chf(preisWerte.min),
    unit: 'pro Nacht',
    subline: `für bis zu ${preisWerte.personsBase} Personen`,
    hint: `Jede weitere erwachsene Person ${chf(preisWerte.extraPerson)} pro Nacht.`,
  },
  // week wird aus price abgeleitet (chfWoche), damit es nur eine Zahlenquelle gibt.
  seasons: [
    {
      label: 'Weihnachten, Neujahr, Februar',
      tag: 'Hochsaison',
      price: chf(preisWerte.max),
      week: chfWoche(preisWerte.max),
    },
    {
      label: 'Hochsaison Winter',
      tag: 'Hochsaison',
      price: chf(preisWerte.max),
      week: chfWoche(preisWerte.max),
    },
    {
      label: 'Nebensaison Winter',
      tag: 'Winter',
      price: chf(preisWerte.winterNeben),
      week: chfWoche(preisWerte.winterNeben),
    },
    {
      label: 'Juli und August',
      tag: 'Sommer',
      price: chf(preisWerte.sommerHoch),
      week: chfWoche(preisWerte.sommerHoch),
    },
    {
      label: 'Nebensaison Sommer',
      tag: 'Sommer',
      price: chf(preisWerte.min),
      week: chfWoche(preisWerte.min),
    },
  ],
  perDayNote: `Preise für das ganze Haus, für bis zu ${preisWerte.personsBase} Personen. Eine Woche sind ${preisWerte.nightsPerWeek} Nächte, von Samstag bis Samstag.`,
  inklusive: {
    label: 'Im Preis enthalten',
    items: [
      'MWST',
      'Strom und Wasser',
      'WLAN',
      'Holz für Cheminée und Kochherd',
      'SodaStream am Bergquellwasser',
      'Eine Flasche Prosecco und eine Flasche Amarone bei Anreise',
    ],
  },
  zusatzkosten: {
    label: 'Zusatzkosten',
    items: [
      { label: 'Endreinigung', value: `${chf(preisWerte.cleaning)} pauschal` },
      {
        label: 'Bett- und Frotteewäsche',
        value: `${chf(preisWerte.laundry)} pro Woche und Person`,
      },
      { label: 'Kurtaxen Erwachsene', value: `${chf(preisWerte.taxAdult)} pro Nacht` },
      {
        label: 'Kurtaxen Kinder (6 bis 16 Jahre)',
        value: `${chf(preisWerte.taxChild)} pro Nacht`,
      },
    ],
    // Gästekarte Val Surses. Belegt an zwei Primärquellen: valsurses.ch Anspruch
    // ("Gäste ab einer Übernachtung erhalten die Karte vom Gastgeber") und die
    // Tarifseite der Savognin Bergbahnen ("Der Personentransport ist mit der
    // Gästekarte Val Surses im Sommer kostenlos").
    //
    // BEWUSST OHNE Betriebszeiten und ohne Aufzählung einzelner Bahnen: der
    // Sommerfahrplan 2026 läuft nur 30.05. bis 18.10., im Juni nur an Wochenenden
    // und ohne 2. Sektion. Konkrete Daten würden hier jährlich veralten und im
    // Einzelfall falsche Erwartungen wecken. Deshalb Leistung nennen, Zeiten
    // verlinken.
    note: 'Mit der Kurtaxe erhalten Sie die Gästekarte Val Surses. Das Postauto im Tal ist damit ganzjährig kostenlos, die Savogniner Bergbahnen im Sommer während ihrer Betriebszeiten.',
    // URL am 15.07.2026 auf 200 geprüft (die naheliegende /de/inhalt/... ist 404).
    noteLink: {
      label: 'Aktuelle Leistungen und Betriebszeiten bei Val Surses',
      href: 'https://www.valsurses.ch/de/buchen/gaestekarte-val-surses',
    },
  },
  cta: { label: 'Verfügbarkeit prüfen', href: '#verfuegbarkeit' },
}

// Nur headline saisonal. Der Fliesstext ist dynamisch (src/lib/availability.ts,
// aus dem Belegungskalender abgeleitet), steht nicht mehr statisch hier.
export const verfuegbarkeit = {
  eyebrow: 'VERFÜGBARKEIT',
  cta: { label: 'Verfügbarkeit prüfen', href: '#kontakt' },
  sommer: { headline: 'Freie Sommerwochen prüfen.' },
  winter: { headline: 'Freie Winterwochen prüfen.' },
}

// Anreise.tsx liest anreise[season]. Winter aus docs/SAISON-WECHSEL.md.
export const anreise = {
  sommer: {
    eyebrow: 'ANREISE IM SOMMER',
    headline: 'Im Sommer fahren Sie bis vor das Haus.',
    text: 'Von Ende Mai bis Ende Oktober ist die Zufahrt über Tigignas offen. Sie parkieren direkt beim Maiensäss. Einkaufen können Sie vorher in Savognin. In Radons selbst gibt es keinen Lebensmittelladen.',
  },
  winter: {
    eyebrow: 'ANREISE IM WINTER',
    headline: 'Im Winter kommen Sie mit Ski, Schlitten oder Winterbus.',
    text: 'Im Winter ist die Zufahrtsstrasse gesperrt. Von Savognin reisen Sie mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus an. Einkaufen können Sie vorher in Savognin. In Radons selbst gibt es keinen Lebensmittelladen.',
  },
}

// Gegen-Teaser, dreht die Richtung: im Sommer teasert er den Winter, im Winter
// den Sommer. Winterteaser.tsx liest winterteaser[season]. Aus docs/SAISON-WECHSEL.md.
export const winterteaser = {
  sommer: {
    eyebrow: 'WINTER IN RADONS',
    headline: 'Im Winter gehört Radons den Skiern, Schlitten und stillen Wegen.',
    text: 'Wenn die Strasse gesperrt ist, kommen Gäste mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus. Der Winter hat seinen eigenen Rhythmus. Ab Oktober steht er wieder stärker im Vordergrund.',
  },
  winter: {
    eyebrow: 'SOMMER IN RADONS',
    headline: 'Im Sommer fahren Sie bis vor das Haus.',
    text: 'Von Ende Mai bis Ende Oktober ist die Zufahrt offen. Wanderwege ab der Haustür, Bergseen und lange, helle Abende. Ab dem Frühjahr rückt der Sommer wieder in den Vordergrund.',
  },
}

export const empfehlungen = {
  eyebrow: 'EMPFEHLUNGEN AUS DEM TAL',
  headline: 'Was wir Ihnen ans Herz legen.',
  intro:
    'In dreissig Jahren als Gastgeber im Albulatal haben wir Lieblingsorte gesammelt. Eine Auswahl davon legen wir Ihnen ans Herz. Die ausführliche Liste finden Sie als handgeschriebenes Heft im Maiensäss.',
  cards: [
    {
      eyebrow: 'WANDERUNG SOMMER',
      title: 'Lai Barnagn ab Tigignas',
      body: 'Sechs Kilometer, eineinhalb Stunden. Wer in Savognin startet, sollte vorher bei der Bäckerei Casparin Brot und ein Stück Bündner Nusstorte holen. Am See picknicken, dann zurück mit der Gondel. Geht auch mit Kinderwagen.',
    },
    {
      eyebrow: 'MITTAGSTIPP',
      title: 'Mungga-Stuba in Radons',
      body: 'Zehn Gehminuten vom Maiensäss. Bekannt für hausgemachte Capuns und selbstgemachte Pommes. Die sonnige Terrasse mit Blick auf Piz Mez und Piz Forbesch. Bei schönem Wetter unbedingt früh reservieren, sonst keine Chance auf einen Platz draussen.',
    },
    {
      eyebrow: 'IM SOMMER NICHT VERPASSEN',
      title: 'Origen Festival in Riom',
      body: 'Theaterfestival in romanischer Sprache, international beachtet. Findet Juli bis September statt, 15 Autominuten vom Maiensäss. Wir empfehlen vor allem die Aufführungen im Burgturm bei Sonnenuntergang. Tickets früh sichern, beliebte Vorstellungen sind schnell ausgebucht.',
    },
  ],
  footnote:
    'Diese Tipps sind kuratiert und werden saisonal aktualisiert. Die persönliche Empfehlung erhalten Sie bei Ihrer Anreise.',
}

// Datenschutzerklärung. Bewusst kurz und in Alltagssprache: die Seite erhebt fast
// nichts, das darf man auch so sagen. Deckt revDSG Art. 19 (Informationspflicht,
// in Kraft seit 01.09.2023) und, für Gäste aus der EU, DSGVO Art. 13 ab.
// Rechtstext: Änderungen nur nach Freigabe durch Marco/die Gastgeber.
export const datenschutz = {
  title: 'Datenschutz',
  headline: 'Was wir mit Ihren Daten machen.',
  stand: 'Stand: Juli 2026',
  intro:
    'Kurz gesagt: wir sammeln so wenig wie möglich. Das Anfrageformular sendet nichts an diese Website, es öffnet Ihr eigenes Mail-Programm. Wir setzen keine Werbe-Cookies und geben Ihre Daten niemals für Werbung weiter.',
  sections: [
    {
      title: 'Wer verantwortlich ist',
      body: [
        'Angela und Gallus Liesch-Lombris, Radons 104, 7464 Surses. Sie erreichen uns unter ferien@aclavigliaradons.ch oder +41 79 349 58 89.',
      ],
    },
    {
      title: 'Das Anfrageformular',
      body: [
        'Das Formular auf dieser Seite schickt Ihre Angaben nicht an unseren Server. Es öffnet Ihr Mail-Programm mit einer vorbereiteten Nachricht. Erst wenn Sie dort auf Senden drücken, erreichen uns Ihre Angaben als ganz normale E-Mail.',
        'Wir erhalten dann Ihren Namen, Ihre E-Mail-Adresse, die gewünschten Reisedaten, die Anzahl Personen und, falls Sie sie angeben, Ihre Telefonnummer und Ihre Bemerkungen. Wir verwenden das ausschliesslich, um Ihre Anfrage zu beantworten und eine Buchung vorzubereiten. Grundlage ist Ihre Anfrage selbst.',
      ],
    },
    {
      title: 'Wenn Sie bei uns übernachten',
      body: [
        'Das Gesetz über die Gäste- und Tourismustaxen verpflichtet uns, Übernachtungsgäste bei der Gemeinde Surses zu melden und die Gästetaxe abzurechnen. Dafür geben wir die im Meldeschein verlangten Angaben an das Meldesystem der Tourismus Savognin Bivio Albula AG weiter. Das ist eine gesetzliche Pflicht und keine freiwillige Weitergabe.',
      ],
    },
    {
      title: 'Website und Hosting',
      body: [
        'Diese Website läuft bei Vercel Inc. Wie jeder Webserver protokolliert Vercel technische Daten wie IP-Adresse, Zeitpunkt und aufgerufene Seite. Diese Protokolle dienen dem Betrieb und der Sicherheit. Die Bearbeitung kann auch ausserhalb der Schweiz stattfinden.',
      ],
    },
    {
      title: 'Reichweitenmessung',
      body: [
        'Wir messen mit Vercel Web Analytics, wie oft welche Seite aufgerufen wird. Das läuft ohne Cookies und ohne Wiedererkennung einzelner Personen. Wir sehen Zahlen, keine Profile.',
      ],
    },
    {
      title: 'Cookies',
      body: [
        'Für Sie als Gast setzt diese Website keine Cookies. Ein einziges technisch notwendiges Cookie gibt es in unserem internen Verwaltungsbereich, den nur wir benutzen.',
      ],
    },
    {
      title: 'Wie lange wir etwas aufbewahren',
      body: [
        'Anfragen, aus denen keine Buchung wird, löschen wir, sobald sie erledigt sind. Unterlagen zu Buchungen bewahren wir so lange auf, wie es die gesetzlichen Aufbewahrungsfristen verlangen, in der Regel zehn Jahre.',
      ],
    },
    {
      title: 'Ihre Rechte',
      body: [
        'Sie können jederzeit erfahren, welche Daten wir über Sie haben, und deren Berichtigung oder Löschung verlangen. Eine kurze Mail an ferien@aclavigliaradons.ch genügt. Wenn Sie in der EU wohnen, stehen Ihnen zusätzlich die Rechte der Datenschutz-Grundverordnung zu.',
      ],
    },
  ],
}

export const kontakt = {
  eyebrow: 'ANFRAGE UND KONTAKT',
  headline: 'Schreiben Sie uns. Wir antworten persönlich.',
  hosts: 'Angela und Gallus Liesch-Lombris',
  brand: 'ACLA VIGLIA RADONS',
  postal: 'Radons 104, 7464 Surses',
  region: 'Graubünden, Schweiz',
  phone: '+41 79 349 58 89',
  tel: '+41793495889',
  email: 'ferien@aclavigliaradons.ch',
  mailto:
    'mailto:ferien@aclavigliaradons.ch?subject=Anfrage%20ACLA%20VIGLIA%20RADONS',
  cta: 'E-Mail schreiben',
  note: 'Anfragen werden persönlich von Angela oder Gallus beantwortet.',
}

// Bildergalerie unter /galerie. Klick-Ziel der Inserate auf Partner-Plattformen
// (z.B. sentiero.ch) und eigenständige Galerie-Seite. Zeigt bewusst Sommer- und
// Winterbilder, bleibt damit ganzjährig aktuell, ohne Saison-Logik.
export const galerie = {
  eyebrow: 'BILDERGALERIE',
  headline: 'Acla Viglia Radons in Bildern.',
  intro:
    'Das Maiensäss im Sommer und im Winter, die Räume drinnen und die Berge ringsum. Eine Auswahl unserer Bilder aus Radons auf 1885 m im Parc Ela.',
  groups: [
    {
      title: 'Das Maiensäss',
      images: [
        {
          src: '/images/hero-sommer.png',
          alt: 'Das Maiensäss Acla Viglia in Radons im Sommer vor dem Bergpanorama',
          caption: 'Das Haus im Sommer.',
        },
        {
          src: '/images/hero-winter.png',
          alt: 'Das verschneite Maiensäss Acla Viglia im Tiefwinter mit Bergkette',
          caption: 'Das Haus im Winter.',
        },
        {
          src: '/images/usp-lage.jpeg',
          alt: 'Das Maiensäss-Dorf Radons auf 1885 Metern mit Bergpanorama',
          caption: 'Radons auf 1885 m, mitten im Skigebiet von Savognin.',
        },
      ],
    },
    {
      title: 'Wohnen und Geniessen',
      images: [
        {
          src: '/images/abendessen-raclette.png',
          alt: 'Freundesgruppe beim Raclette am rustikalen Holztisch bei Cheminée-Feuer',
          caption: 'Der rustikale Holztisch, das Herz des Hauses.',
        },
        {
          src: '/images/wohnkueche-cheminee.jpg',
          alt: 'Wohnküche mit offenem Cheminée und rustikalem Esstisch',
          caption: 'Wohnküche mit offenem Cheminée.',
        },
        {
          src: '/images/familie-wohnzimmer-sommer.png',
          alt: 'Familie im Wohnzimmer, Kinder spielen auf dem Boden vor dem Specksteinofen',
          caption: 'Drinnen spielen, lesen, Feuer machen.',
        },
        {
          src: '/images/maiensaess-2.jpg',
          alt: 'Moderne, gut ausgestattete Küche mit Geschirrspüler und Herd',
          caption: 'Moderne Küche für die ganze Woche.',
        },
        {
          src: '/images/familie-kueche.png',
          alt: 'Familie beim Frühstück am grossen Holztisch der Wohnküche mit offenem Cheminée',
          caption: 'Morgens Kaffee, Brot und Zeit am grossen Tisch.',
        },
        {
          src: '/images/detail-4-sommer.png',
          alt: 'Schaukelstuhl am grossen Fenster der Wohnstube mit Blick auf die grüne Bergwiese',
          caption: 'Die Leseecke am Fenster.',
        },
        {
          src: '/images/detail-1.jpg',
          alt: 'Gewürzregal mit Becherreihe an der Holzdecke der Küche',
          caption: 'Liebe zum Detail.',
        },
      ],
    },
    {
      title: 'Schlafen',
      images: [
        {
          src: '/images/maiensaess-3.jpg',
          alt: 'Doppelzimmer mit Edelweiss-Bettwäsche und Fenster mit Bergblick',
          caption: 'Das grosse Doppelzimmer mit Bergblick.',
        },
        {
          src: '/images/familie-kinderzimmer.png',
          alt: 'Kinder im Dreierzimmer mit Kajütenbett aus Holz',
          caption: 'Das Dreierzimmer für Kinder, Jugendliche oder Freunde.',
        },
        {
          src: '/images/maiensaess-5.jpg',
          alt: 'Dachgalerie mit zusätzlichen Schlafplätzen unter Holzbalken',
          caption: 'Zusätzliche Schlafplätze auf der Dachgalerie.',
        },
        {
          src: '/images/maiensaess-6.jpg',
          alt: 'Badezimmer mit Dusche im Maiensäss',
          caption: 'Bad mit Dusche und separaten WCs.',
        },
      ],
    },
    {
      title: 'Sommer in Radons',
      images: [
        {
          src: '/images/sommer-wanderfamilie.png',
          alt: 'Wanderfamilie auf dem Weg zum Maiensäss Acla Viglia in Radons im Sommer',
          caption: 'Wandern ab der Haustür.',
        },
        {
          src: '/images/umgebung-sommer-2.png',
          alt: 'Familie auf einem Sommerweg an einem Bergsee bei Radons mit Bergpanorama',
          caption: 'Bergseen und Sommerwege für ruhige Tage.',
        },
        {
          src: '/images/region-parcela.jpeg',
          alt: 'Lai Barnagn, Bergsee mit Bergpanorama im Parc Ela',
          caption: 'Lai Barnagn, einer der Bergseen im Parc Ela.',
        },
        {
          src: '/images/region-bach.jpeg',
          alt: 'Kristallklarer Bergbach über Steinen mit Berggipfel im Parc Ela',
          caption: 'Kristallklare Bergbäche und frische Höhenluft.',
        },
        {
          src: '/images/region-pferde.webp',
          alt: 'Freilaufende Pferde mit Fohlen auf der Sommerweide von Radons vor Bergpanorama',
          caption: 'Sömmerung auf den Weiden von Radons.',
        },
        {
          src: '/images/region-blumen.jpeg',
          alt: 'Alpine Wildblumen vor Tal und Bergen im Parc Ela',
          caption: 'Alpine Blumenwiesen im Sommer.',
        },
        {
          src: '/images/region-wegweiser.webp',
          alt: 'Gelber Wanderwegweiser in Radons auf 1885 Metern mit Zielen Alp Schmorras, Piz Martegnas und Savognin',
          caption: 'Wanderknotenpunkt Radons, 1885 m.',
        },
      ],
    },
    {
      title: 'Winter in Radons',
      images: [
        {
          src: '/images/dorf-radons-winter.png',
          alt: 'Das verschneite Maiensäss-Dorf Radons im Winter',
          caption: 'Radons im Winter.',
        },
        {
          src: '/images/region-skigebiet.jpg',
          alt: 'Blick über das verschneite Tal im Skigebiet Savognin',
          caption: 'Skigebiet Savognin, direkt vor dem Haus.',
        },
        {
          src: '/images/region-tiefschnee.webp',
          alt: 'Unverspurter Tiefschnee mit Skitourenspuren oberhalb der Maiensäss-Häuser von Radons',
          caption: 'Unverspurter Tiefschnee oberhalb der Hütten.',
        },
        {
          src: '/images/winter-familie.png',
          alt: 'Familie im Schnee vor dem verschneiten Maiensäss in Radons',
          caption: 'Wintertage in Radons.',
        },
        {
          src: '/images/anreise-winter.jpg',
          alt: 'Winterliche Anreise durch den Schnee nach Radons',
          caption: 'Anreise im Winter mit Ski, Schlitten oder Winterbus.',
        },
      ],
    },
  ],
}

export const footer = {
  brand: {
    title: 'ACLA VIGLIA RADONS',
    lines: ['Maiensäss in Radons', 'Savognin · Val Surses · 1885 m'],
  },
  // Kontaktzeilen aus den zentralen Quellen (brand/kontakt), nicht dupliziert.
  contact: {
    title: 'Kontakt',
    lines: [kontakt.hosts, brand.postal, brand.email, kontakt.phone],
  },
  // legal ohne Jahr: Footer.tsx stellt das aktuelle Jahr dynamisch voran.
  legal:
    'Angela und Gallus Liesch-Lombris · Persönlich geführt seit 2020 · Ehemals Hotel Restaurant Rätia, Filisur',
}

// Footer-Navigation mit absoluten Ankern (/#...), damit die Links auch von
// Unterseiten wie /galerie zurück zur richtigen Sektion führen. Erstes Label
// folgt der Saison. Footer.tsx ruft dies mit getSeason().
export function getFooterNavigation(season: Season) {
  return [
    { label: season === 'winter' ? 'Winter' : 'Sommer', href: '/#sommer' },
    { label: 'Haus', href: '/#haus' },
    { label: 'Gastgeber', href: '/#gastgeber' },
    { label: 'Preise', href: '/#preise' },
    { label: 'Anreise', href: '/#anreise' },
    { label: 'Kontakt', href: '/#kontakt' },
    { label: 'Galerie', href: '/galerie' },
  ]
}
