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
import { faq, hero } from '@/lib/content'
import { lodgingLd } from '@/lib/schema'
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  )
}
