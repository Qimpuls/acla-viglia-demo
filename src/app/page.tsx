import type { Metadata } from 'next'
import { Anreise } from '@/components/Anreise'
import { Familienleben } from '@/components/Familienleben'
import { Faq } from '@/components/Faq'
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
import { faq, hero, kontakt, preisWerte } from '@/lib/content'
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
          height: 630,
          alt: hero.winter.alt,
        }
      : {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
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
    name: 'Sommerwoche anfragen',
    target: `${SITE_URL}/#kontakt`,
  },
}

// FAQ-Markup aus derselben Quelle wie die sichtbare Sektion (Faq.tsx). Google
// akzeptiert FAQPage nur mit sichtbarem Inhalt; aus content.faq abgeleitet
// können Markup und Seite nicht auseinanderlaufen.
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map((item) => ({
    '@type': 'Question',
    name: item.frage,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.antwort,
    },
  })),
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
        <Faq />
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
