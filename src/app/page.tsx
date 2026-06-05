import { Anreise } from '@/components/Anreise'
import { Empfehlungen } from '@/components/Empfehlungen'
import { Footer } from '@/components/Footer'
import { Gastgeber } from '@/components/Gastgeber'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Kontakt } from '@/components/Kontakt'
import { Maiensaess } from '@/components/Maiensaess'
import { Preise } from '@/components/Preise'
import { Region } from '@/components/Region'
import { ValueProps } from '@/components/ValueProps'

const SITE_URL = 'https://aclavigliaradons.ch'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${SITE_URL}/#lodging`,
  name: 'ACLA VIGLIA RADONS',
  description:
    'Persönlich geführtes Maiensäss auf 1885 m in Radons über Savognin, direkt an der Skipiste und mitten im Parc Ela. Wochenmiete Samstag zu Samstag für 2 bis 8 Personen.',
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
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <Maiensaess />
        <Empfehlungen />
        <Gastgeber />
        <Region />
        <Preise />
        <Anreise />
        <Kontakt />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
