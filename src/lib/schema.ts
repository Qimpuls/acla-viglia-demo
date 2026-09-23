import { SITE_URL } from '@/app/layout'
import { kontakt, preisWerte } from '@/lib/content'

// Strukturierte Daten (JSON-LD), geteilt zwischen Startseite und den
// Saisonseiten. Eine Quelle, damit Name, Adresse und Telefon (NAP) überall
// identisch bleiben: Website, Schema und Google-Unternehmensprofil.

export const lodgingLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${SITE_URL}/#lodging`,
  name: 'ACLA VIGLIA RADONS',
  description:
    'Persönlich geführtes Maiensäss auf 1885 m in Radons über Savognin, mitten im Parc Ela. Wochenmiete Samstag zu Samstag für 2 bis 8 Personen. Im Sommer bequeme Zufahrt bis vor das Haus.',
  url: SITE_URL,
  image: [
    `${SITE_URL}/images/hero-sommer.png`,
    `${SITE_URL}/images/hero-winter.png`,
  ],
  telephone: kontakt.phone,
  email: kontakt.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Radons 104',
    addressLocality: 'Surses',
    postalCode: '7464',
    addressRegion: 'GR',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.5598,
    longitude: 9.5546,
  },
  containedInPlace: {
    '@type': 'Place',
    name: 'Parc Ela, Val Surses',
  },
  numberOfRooms: 3,
  numberOfBathroomsTotal: 2,
  maximumAttendeeCapacity: preisWerte.capacityMax,
  // Wechseltag Samstag: Anreise ab 15 Uhr, Abreise bis 10 Uhr (sichtbar in der
  // FAQ-Sektion, hier maschinenlesbar für die Suche).
  checkinTime: '15:00',
  checkoutTime: '10:00',
  petsAllowed: true,
  knowsLanguage: ['de-CH'],
  priceRange: `CHF ${preisWerte.min} bis ${preisWerte.max} pro Nacht`,
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Ski-In/Ski-Out',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'WLAN',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Specksteinofen',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Cheminée',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Dusche',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Geschirrspüler',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Bodenheizung',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Holz-Kochherd',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Haustiere erlaubt',
      value: true,
    },
  ],
  slogan: 'Ein Maiensäss. Geführt wie ein gutes Hotel.',
  currenciesAccepted: 'CHF',
  makesOffer: {
    '@type': 'Offer',
    name: 'Das ganze Maiensäss, Wochenmiete Samstag bis Samstag',
    priceCurrency: 'CHF',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: preisWerte.min,
      minPrice: preisWerte.min,
      maxPrice: preisWerte.max,
      priceCurrency: 'CHF',
      unitText: `pro Nacht für das ganze Haus, bis ${preisWerte.personsBase} Personen`,
    },
    eligibleQuantity: {
      '@type': 'QuantitativeValue',
      minValue: preisWerte.capacityMin,
      maxValue: preisWerte.capacityMax,
      unitText: 'Personen',
    },
  },
  potentialAction: {
    '@type': 'ReserveAction',
    name: 'Woche anfragen',
    target: `${SITE_URL}/#kontakt`,
  },
}

// BreadcrumbList für Unterseiten: Startseite > Seite.
export function breadcrumbLd(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acla Viglia Radons', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  }
}
