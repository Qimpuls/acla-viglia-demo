import { Anreise } from '@/components/Anreise'
import { Footer } from '@/components/Footer'
import { Gastgeber } from '@/components/Gastgeber'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Kontakt } from '@/components/Kontakt'
import { Maiensaess } from '@/components/Maiensaess'
import { Preise } from '@/components/Preise'
import { Region } from '@/components/Region'
import { ValueProps } from '@/components/ValueProps'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'ACLA VIGLIA RADONS',
  description: 'Maiensäss in Radons, Savognin, Graubünden',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Savognin',
    postalCode: '7456',
    addressRegion: 'GR',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.5598,
    longitude: 9.5546,
  },
  email: 'info@aclavigliaradons.ch',
  numberOfRooms: 3,
  petsAllowed: 'true',
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
