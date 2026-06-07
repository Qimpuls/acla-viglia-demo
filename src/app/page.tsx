import { Anreise } from '@/components/Anreise'
import { Familienleben } from '@/components/Familienleben'
import { Footer } from '@/components/Footer'
import { Gastgeber } from '@/components/Gastgeber'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Kontakt } from '@/components/Kontakt'
import { Maiensaess } from '@/components/Maiensaess'
import { Preise } from '@/components/Preise'
import { Sommerumgebung } from '@/components/Sommerumgebung'
import { Sommerwoche } from '@/components/Sommerwoche'
import { StickyCta } from '@/components/StickyCta'
import { ValueProps } from '@/components/ValueProps'
import { Verfuegbarkeit } from '@/components/Verfuegbarkeit'
import { Winterteaser } from '@/components/Winterteaser'
import { Wohnen } from '@/components/Wohnen'

const SITE_URL = 'https://aclavigliaradons.ch'

const jsonLd = {
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
  telephone: '+41 79 520 87 96',
  email: 'ferien@aclavigliaradons.ch',
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
  maximumAttendeeCapacity: 8,
  petsAllowed: true,
  knowsLanguage: ['de-CH'],
  priceRange: 'CHF 220–280 pro Nacht',
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
      price: 220,
      minPrice: 220,
      maxPrice: 280,
      priceCurrency: 'CHF',
      unitText: 'pro Nacht für das ganze Haus, bis 5 Personen',
    },
    eligibleQuantity: {
      '@type': 'QuantitativeValue',
      minValue: 2,
      maxValue: 8,
      unitText: 'Personen',
    },
  },
  potentialAction: {
    '@type': 'ReserveAction',
    name: 'Sommerwoche anfragen',
    target: `${SITE_URL}/#kontakt`,
  },
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Für wie viele Personen ist das Maiensäss Acla Viglia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das ganze Maiensäss bietet Platz für 2 bis 8 Personen: ein Doppelzimmer, ein Dreierzimmer und zwei Doppelmatratzen auf der Dachgalerie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie komme ich im Sommer nach Radons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Von Ende Mai bis Ende Oktober ist die Zufahrt über Tigignas offen. Sie fahren mit dem Auto bis vor das Maiensäss und parkieren direkt davor. Einkaufen können Sie vorher in Savognin.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie ist die Anreise im Winter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Im Winter ist die Zufahrtsstrasse gesperrt. Gäste reisen mit Skiern, Schlitten, zu Fuss oder mit dem Winterbus ab Savognin an.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was kostet das Maiensäss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Das ganze Haus kostet ab CHF 220 pro Nacht für bis zu 5 Personen, je nach Saison bis CHF 280. Jede weitere erwachsene Person CHF 10 pro Tag. Nicht enthalten sind Endreinigung, Wäsche und Kurtaxen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Sind Haustiere erlaubt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, Haustiere sind nach Absprache erlaubt.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gibt es WLAN im Maiensäss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, im Maiensäss ist WLAN vorhanden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie läuft die Buchung ab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sie senden eine unverbindliche Anfrage über das Formular oder per E-Mail. Angela oder Gallus antworten persönlich.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <Gastgeber />
        <Sommerwoche />
        <Sommerumgebung />
        <Maiensaess />
        <Wohnen />
        <Familienleben />
        <Preise />
        <Verfuegbarkeit />
        <Anreise />
        <Winterteaser />
        <Kontakt />
      </main>
      <Footer />
      <StickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  )
}
