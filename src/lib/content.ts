export const navigation = [
  { label: 'Sommer', href: '#sommer' },
  { label: 'Haus', href: '#haus' },
  { label: 'Gastgeber', href: '#gastgeber' },
  { label: 'Preise', href: '#preise' },
  { label: 'Anfrage', href: '#kontakt' },
] as const

export const brand = {
  name: 'ACLA VIGLIA RADONS',
  location: 'Savognin · Val Surses · 1885 m',
  email: 'ferien@aclavigliaradons.ch',
  postal: 'Radons 104, 7464 Surses',
  region: 'Graubünden, Schweiz',
}

export const hero = {
  eyebrow: 'MAIENSÄSS IN RADONS · 1885 M',
  headline: 'Eine Woche, die länger nachwirkt.',
  claim: 'Ein Maiensäss. Geführt wie ein gutes Hotel.',
  subline:
    'Berge, Ruhe und ein Haus, das für gemeinsame Zeit gebaut wurde.',
  primaryCta: { label: 'Verfügbarkeit prüfen', href: '#verfuegbarkeit' },
  trust: 'Persönlich geführt von Angela und Gallus · Samstag bis Samstag',
  imageSummer: '/images/hero-sommer.png',
  imageWinter: '/images/hero-winter.png',
}

// Drei Sommergründe (reine Text-Karten, bewusst ohne Bilder gegen Bildüberladung)
export const valueProps = {
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
}

export const sommerwoche = {
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
  cta: { label: 'Verfügbarkeit prüfen', href: '#verfuegbarkeit' },
}

export const sommerumgebung = {
  eyebrow: 'SOMMERUMGEBUNG',
  headline: 'Wiesen, Wege und Wasser direkt vor dem Haus.',
  intro:
    'Vom Haus aus sind Sie sofort draussen: auf dem Weg, am Bach, auf der Wiese oder einfach auf der Bank vor der Tür.',
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
}

export const maiensaess = {
  eyebrow: 'DAS HAUS',
  headline: 'Platz für Familie, Freunde und ruhige Tage.',
  paragraphs: [
    'Das Maiensäss bietet Raum für 2 bis 8 Personen auf zwei Geschossen und einer Dachgalerie. Der Mittelpunkt ist die Wohnküche mit langem Tisch, Feuerstelle und Blick nach draussen.',
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
    'Das Maiensäss ist für gemeinsame Tage gemacht: ein langer Holztisch, warme Räume, Schlafplätze für Familien und Freunde und genug Rückzug, wenn das Wetter einmal wechselt.',
  hero: {
    src: '/images/abendessen-raclette.png',
    alt: 'Freundesgruppe beim Raclette am langen Holztisch im Maiensäss bei Kerzenlicht und Cheminée-Feuer',
    caption: 'Der lange Holztisch ist das Herz des Hauses.',
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

export const familienleben = {
  eyebrow: 'FAMILIENLEBEN IM HAUS',
  headline: 'Auch Regentage haben hier ihren Platz.',
  text: 'Manchmal bleibt man einfach drinnen. Die Kinder spielen, das Feuer brennt, jemand kocht, jemand liest. Dafür nutzen viele unserer Gäste das Haus.',
  // Rückzug/Atmosphäre. detail-4-sommer (Lese-Ecke am Fenster) zuerst und prominent.
  // Kein Dreierzimmer mehr (steht jetzt in [[wohnen]]), keine Bilddoppelung.
  images: [
    {
      // Sommer-Variante: gleiche Wohnstube, Blick auf die grüne Bergwiese.
      // Winter-Pendant liegt als detail-4-winter.jpg im Archiv (public/images),
      // für den Wintersaison-Wechsel.
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
      alt: 'Familie im Wohnzimmer des Maiensäss mit offenem Cheminée und Specksteinofen',
      caption: 'Der lange Holztisch bleibt oft bis spät besetzt.',
    },
  ],
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

export const preise = {
  eyebrow: 'PREISE',
  headline: 'Transparent. Inklusive.',
  intro:
    'Wochenmiete von Samstag bis Samstag. Alle Nebenkosten sind im Tagespreis enthalten, ausser Endreinigung, Wäsche und Kurtaxen.',
  priceBox: {
    label: 'Das ganze Maiensäss',
    prefix: 'ab',
    amount: 'CHF 220',
    unit: 'pro Nacht',
    subline: 'für bis zu 5 Personen',
    hint: 'Jede weitere erwachsene Person CHF 10 pro Tag.',
  },
  seasons: [
    {
      label: 'Weihnachten, Neujahr, Februar',
      tag: 'Hochsaison',
      price: 'CHF 280',
    },
    { label: 'Hochsaison Winter', tag: 'Hochsaison', price: 'CHF 280' },
    { label: 'Nebensaison Winter', tag: 'Winter', price: 'CHF 260' },
    { label: 'Juli und August', tag: 'Sommer', price: 'CHF 260' },
    { label: 'Nebensaison Sommer', tag: 'Sommer', price: 'CHF 220' },
  ],
  perDayNote: 'Preise pro Nacht für das ganze Haus, für bis zu 5 Personen.',
  inklusive: {
    label: 'Im Tagespreis enthalten',
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
      { label: 'Endreinigung', value: 'CHF 195 pauschal' },
      { label: 'Bett- und Frotteewäsche', value: 'CHF 25 pro Woche und Person' },
      { label: 'Kurtaxen Erwachsene', value: 'CHF 2.50 pro Tag' },
      {
        label: 'Kurtaxen Kinder (6 bis 16 Jahre)',
        value: 'CHF 1.25 pro Tag',
      },
    ],
  },
  cta: { label: 'Verfügbarkeit prüfen', href: '#verfuegbarkeit' },
}

export const verfuegbarkeit = {
  eyebrow: 'VERFÜGBARKEIT',
  headline: 'Freie Sommerwochen prüfen.',
  text: 'Aktuell gibt es noch freie Sommerwochen 2026, besonders im August sowie in einzelnen Wochen im Juni, Juli und September. Klicken Sie im Kalender auf eine freie Woche oder senden Sie direkt eine Anfrage.',
  cta: { label: 'Verfügbarkeit prüfen', href: '#kontakt' },
}

export const anreise = {
  eyebrow: 'ANREISE IM SOMMER',
  headline: 'Im Sommer fahren Sie bis vor das Haus.',
  text: 'Von Ende Mai bis Ende Oktober ist die Zufahrt über Tigignas offen. Sie parkieren direkt beim Maiensäss. Einkaufen können Sie vorher in Savognin. In Radons selbst gibt es keinen Lebensmittelladen.',
}

export const winterteaser = {
  eyebrow: 'WINTER IN RADONS',
  headline: 'Im Winter gehört Radons den Skiern, Schlitten und stillen Wegen.',
  text: 'Wenn die Strasse gesperrt ist, kommen Gäste mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus. Der Winter hat seinen eigenen Rhythmus. Ab Oktober steht er wieder stärker im Vordergrund.',
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

export const kontakt = {
  eyebrow: 'ANFRAGE UND KONTAKT',
  headline: 'Schreiben Sie uns. Wir antworten persönlich.',
  trust: [
    'Persönliche Antwort durch Angela oder Gallus.',
    'Antwort innerhalb von 24 Stunden.',
    'Direkter Kontakt mit den Gastgebern.',
  ],
  hosts: 'Angela und Gallus Liesch-Lombris',
  brand: 'ACLA VIGLIA RADONS',
  postal: 'Radons 104, 7464 Surses',
  region: 'Graubünden, Schweiz',
  phone: '+41 79 520 87 96',
  tel: '+41795208796',
  email: 'ferien@aclavigliaradons.ch',
  mailto:
    'mailto:ferien@aclavigliaradons.ch?subject=Anfrage%20ACLA%20VIGLIA%20RADONS',
  cta: 'E-Mail schreiben',
  note: 'Anfragen werden persönlich von Angela oder Gallus beantwortet, in der Regel innerhalb von 24 Stunden.',
}

export const footer = {
  brand: {
    title: 'ACLA VIGLIA RADONS',
    lines: ['Maiensäss in Radons', 'Savognin · Val Surses · 1885 m'],
  },
  contact: {
    title: 'Kontakt',
    lines: [
      'Angela und Gallus Liesch-Lombris',
      'Radons 104, 7464 Surses',
      'ferien@aclavigliaradons.ch',
      '+41 79 520 87 96',
    ],
  },
  navigation: [
    { label: 'Sommer', href: '#sommer' },
    { label: 'Haus', href: '#haus' },
    { label: 'Gastgeber', href: '#gastgeber' },
    { label: 'Preise', href: '#preise' },
    { label: 'Anreise', href: '#anreise' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  legal:
    '© 2026 Angela und Gallus Liesch-Lombris · Persönlich geführt seit 2020 · Ehemals Hotel Restaurant Rätia, Filisur',
}
