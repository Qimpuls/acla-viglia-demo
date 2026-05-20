export const navigation = [
  { label: 'Maiensäss', href: '#maiensaess' },
  { label: 'Gastgeber', href: '#gastgeber' },
  { label: 'Region', href: '#region' },
  { label: 'Preise', href: '#preise' },
  { label: 'Anreise', href: '#anreise' },
  { label: 'Kontakt', href: '#kontakt' },
] as const

export const brand = {
  name: 'ACLA VIGLIA RADONS',
  location: 'Savognin · Val Surses · 1885 m',
  email: 'info@aclavigliaradons.ch',
  postal: '7456 Savognin',
  region: 'Graubünden, Schweiz',
}

export const hero = {
  eyebrow: 'MAIENSÄSS IN RADONS · 1885 M',
  headlineTop: 'Ein Maiensäss.',
  headlineBottom: 'Geführt wie ein gutes Hotel.',
  subline:
    'Auf 1885 Metern im Maiensäss-Dorf Radons. Direkt an der Skipiste von Savognin. Mitten im Parc Ela, dem grössten Naturpark der Schweiz. Persönlich geführt von Angela und Gallus Liesch-Lombris.',
  primaryCta: { label: 'Verfügbarkeit anfragen', href: '#kontakt' },
  secondaryCta: { label: 'Das Maiensäss kennenlernen', href: '#maiensaess' },
  trust:
    'Persönlich geführt von Angela und Gallus Liesch-Lombris. 25 Jahre Hoteliers im Albulatal.',
  note: 'Wochenmiete Samstag zu Samstag. 2 bis 8 Personen.',
  imageSummer: '/images/hero-sommer.jpeg',
  imageWinter: '/images/hero-winter.jpg',
}

export const valueProps = {
  eyebrow: 'WARUM ACLA VIGLIA',
  headline: 'Drei Gründe, hier oben zu bleiben.',
  cards: [
    {
      number: '01',
      title: 'Skischuhe an, Tür auf, los.',
      body: 'Die Piste der Savognin Bergbahnen verläuft direkt am Maiensäss vorbei. Kein Skibus, keine Wartezeit. Am Abend dieselbe Tür, dieselben Schuhe.',
      image: '/images/usp-skiin.jpg',
      alt: 'Maiensäss seitlich mit verschneitem Tal im Winter',
    },
    {
      number: '02',
      title: 'Specksteinofen statt Designerheizung.',
      body: 'Das Maiensäss ist gewachsen, nicht gebaut. Holzbalken, offener Cheminée, ein Holz-Kochherd als Alternative zum Elektroherd. Komfort, wo er nützt. Tradition, wo sie zählt.',
      image: '/images/detail-4.jpg',
      alt: 'Detail des Wohnraums mit Holzbalken',
    },
    {
      number: '03',
      title: 'Mitten im Parc Ela.',
      body: 'Radons liegt im grössten Naturpark der Schweiz. Im Winter erreichbar nur mit dem Winterbus oder auf Skiern. Das hält die Strasse ruhig und die Sterne hell.',
      image: '/images/usp-lage.jpeg',
      alt: 'Maiensäss-Dorf Radons mit Bergpanorama im Sommer',
    },
  ],
}

export const maiensaess = {
  eyebrow: 'DAS HAUS',
  headline: 'Zwei Geschosse, eine Dachgalerie, kein Kompromiss.',
  paragraphs: [
    'Das Maiensäss wurde behutsam restauriert. Die Substanz blieb erhalten: zwei Bündner Specksteinöfen, Holzbalken, der offene Cheminée, der Holz-Kochherd. Ergänzt wurde, was den Aufenthalt erleichtert: neue Küche mit Geschirrspüler und zwei Kühlschränken, Bodenheizung im Erdgeschoss, SodaStream am Bergquellwasser, WLAN.',
    'Im Erdgeschoss empfängt Sie ein grosszügiger Eingangsbereich für Ski, Schlitten und Bikes, dahinter die Wohnküche mit Esstisch für sechs bis acht Personen und offenem Cheminée. Im Obergeschoss das Wohnzimmer mit Specksteinofen, das Elternschlafzimmer und das Kinderschlafzimmer mit Kajütenbett. In der Dachgalerie zwei weitere Schlafplätze.',
    'Acht Schlafplätze. Drei Räume mit Holzfeuer. Eine Aussicht auf den Piz Mitgel.',
  ],
  facts: [
    { label: 'Lage', value: 'Maiensäss-Dorf Radons, 1885 m' },
    { label: 'Kapazität', value: '2 bis 8 Personen' },
    {
      label: 'Schlafzimmer',
      value: '1 Elternzimmer, 1 Kinderzimmer, 2 Plätze Dachgalerie',
    },
    { label: 'Skipiste', value: 'Direkt am Haus' },
    { label: 'WLAN', value: 'Vorhanden' },
    { label: 'Haustiere', value: 'Nach Absprache' },
  ],
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
      src: '/images/detail-4.jpg',
      alt: 'Sessel mit Sicht aus dem Fenster',
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

export const gastgeber = {
  eyebrow: 'GASTGEBER',
  headline: 'Angela und Gallus Liesch-Lombris.',
  paragraphs: [
    'Wir stammen aus dem Albulatal. Über 25 Jahre lang führten wir das Hotel Restaurant Rätia in Filisur, ein traditionsreiches Haus an der UNESCO-geschützten Albulalinie der Rhätischen Bahn. Wir lernten die Saisons dieses Tals nicht aus Reiseführern, sondern aus tausenden Anreisen, Wetterstürzen und Gästegesprächen.',
    'Heute geben wir diese Erfahrung in einer persönlicheren Form weiter. In unserem eigenen Maiensäss in Radons, das wir mit der gleichen Sorgfalt führen, die uns im Hotel ausgemacht hat. Nur ohne Hotelbetrieb.',
    'Anfragen beantworten wir selbst. Empfehlungen geben wir aus eigener Erfahrung. Und wenn Sie ankommen, finden Sie eine handgeschriebene Liste mit den Beizen, Wanderungen und Geheimtipps, die wir in dreissig Jahren im Tal gesammelt haben.',
    'Allegra. Willkommen bei uns oben.',
  ],
  signature: 'Angela und Gallus Liesch-Lombris',
  meta: 'Ehemals Hotel Restaurant Rätia, Filisur. Mitglied im Parc Ela.',
  image: '/images/gastgeber-portrait.png',
  imageCaption: 'Illustration · Foto-Porträt folgt',
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
  },
}

export const preise = {
  eyebrow: 'PREISE',
  headline: 'Transparent. Inklusive.',
  intro:
    'Wochenmiete von Samstag bis Samstag, für 2 bis 8 Personen. Alle Nebenkosten sind im Tagespreis enthalten, ausser Endreinigung, Wäsche und Kurtaxen.',
  spotlight: {
    prefix: 'ab',
    amount: 'CHF 44',
    suffix: 'pro Person und Nacht',
    detail:
      'in der Sommer-Nebensaison bei 5 Personen. In der Hochsaison Winter bis CHF 70.',
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
  perDayNote:
    'Pro Tag bis 5 Personen. Jede weitere erwachsene Person CHF 10 pro Tag.',
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
        label: 'Kurtaxen Kinder (6–16 Jahre)',
        value: 'CHF 1.25 pro Tag',
      },
    ],
  },
  availabilityNote:
    'Aktuelle Verfügbarkeit auf Anfrage. Wir antworten persönlich, in der Regel innerhalb von 24 Stunden.',
  cta: { label: 'Verfügbarkeit anfragen', href: '#kontakt' },
}

export const anreise = {
  eyebrow: 'ANREISE',
  headline: 'Im Sommer mit dem Auto. Im Winter mit Skiern oder Winterbus.',
  cards: [
    {
      season: 'SOMMER',
      image: '/images/anreise-sommer.jpeg',
      alt: 'Wanderweg in Sommerstimmung',
      body: 'Vom Frühjahr bis Spätherbst erreichen Sie das Maiensäss bequem mit dem Auto und parken direkt davor. Die Zufahrtsstrasse über Tigignas ist offen von Ende Mai bis Ende Oktober.',
    },
    {
      season: 'WINTER',
      image: '/images/anreise-winter.jpg',
      alt: 'Winter-Abendbild mit Steinbock-Skulptur',
      body: 'Im Winter ist die Zufahrtsstrasse gesperrt. Das ist Teil des Erlebnisses: Sie kommen in einem Tal an, das nicht durch Strassenverkehr gestört wird.',
      bullets: [
        'Auf Skiern vom Piz Martegnas oder über den Panoramaweg.',
        'Zu Fuss in rund 45 Minuten ab Savognin Bergstation.',
        'Mit dem Winterbus von der Bushaltestelle Hotel JUFA in Savognin. Empfohlen für Gäste mit Gepäck. Auto auf dem Parkplatz Grava (hinter Hotel JUFA): CHF 35 pro Woche.',
      ],
    },
  ],
  note: 'Lebensmittel mitbringen oder in Savognin einkaufen (Coop, Volg). In Radons gibt es keinen Lebensmittelladen.',
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
  hosts: 'Angela und Gallus Liesch-Lombris',
  brand: 'ACLA VIGLIA RADONS',
  postal: '7456 Savognin',
  region: 'Graubünden, Schweiz',
  email: 'info@aclavigliaradons.ch',
  mailto:
    'mailto:info@aclavigliaradons.ch?subject=Anfrage%20ACLA%20VIGLIA%20RADONS',
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
    lines: ['Angela und Gallus Liesch-Lombris', 'info@aclavigliaradons.ch'],
  },
  navigation: [
    { label: 'Maiensäss', href: '#maiensaess' },
    { label: 'Gastgeber', href: '#gastgeber' },
    { label: 'Region', href: '#region' },
    { label: 'Anreise', href: '#anreise' },
    { label: 'Preise', href: '#preise' },
    { label: 'Kontakt', href: '#kontakt' },
  ],
  legal:
    '© 2026 Angela und Gallus Liesch-Lombris · Persönlich geführt seit 2020 · Ehemals Hotel Restaurant Rätia, Filisur',
}
