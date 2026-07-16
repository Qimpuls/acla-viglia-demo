import type { Metadata } from 'next'
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
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/app/layout'
import { anreise, chf, chfWoche, hero, kontakt, preisWerte } from '@/lib/content'
import { getSeason } from '@/lib/season'

// ISR: die Route rendert stündlich neu. Das ist die Voraussetzung dafür, dass die
// datumsbasierte Saison-Umschaltung (season.ts) und der dynamische Verfügbarkeits-
// text ohne Buchungsänderung von selbst greifen (nicht im statischen HTML einfrieren).
export const revalidate = 3600

// OG-/Twitter-Bild folgt der Saison (Startseite überschreibt die Layout-Defaults).
export async function generateMetadata(): Promise<Metadata> {
  const season = getSeason()
  const ogImage =
    season === 'winter'
      ? {
          url: '/images/og-image-winter.jpg',
          width: 1200,
          height: 553,
          alt: hero.winter.alt,
        }
      : {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 553,
          alt: hero.sommer.alt,
        }
  return {
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      url: SITE_URL,
      siteName: 'Acla Viglia Radons',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [ogImage.url],
    },
  }
}

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
        text: anreise.sommer.text,
      },
    },
    {
      '@type': 'Question',
      name: 'Wie ist die Anreise im Winter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: anreise.winter.text,
      },
    },
    {
      '@type': 'Question',
      name: 'Was kostet das Maiensäss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Das ganze Haus kostet ab ${chf(preisWerte.min)} pro Nacht für bis zu ${preisWerte.personsBase} Personen, je nach Saison bis ${chf(preisWerte.max)}. Eine Woche von Samstag bis Samstag sind ${preisWerte.nightsPerWeek} Nächte, also ab ${chfWoche(preisWerte.min)}. Jede weitere erwachsene Person ${chf(preisWerte.extraPerson)} pro Nacht. Nicht enthalten sind Endreinigung, Wäsche und Kurtaxen.`,
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
  const season = getSeason()
  return (
    <>
      <Header season={season} />
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
