import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

// Geteilt mit page.tsx generateMetadata (saisonales OG-Bild erbt Titel/Beschreibung).
export const SITE_URL = 'https://aclavigliaradons.ch'
export const SITE_TITLE = 'ACLA VIGLIA RADONS · Maiensäss in Savognin mieten'
export const SITE_DESCRIPTION =
  'Maiensäss in Radons über Savognin mieten: das ganze Haus auf 1885 m im Parc Ela, für 2 bis 8 Personen, Wochenmiete Samstag zu Samstag. Persönlich geführt von Angela und Gallus Liesch-Lombris. Im Sommer Zufahrt bis vor das Haus.'
const OG_IMAGE = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 553,
  alt: 'Maiensäss Acla Viglia in Radons über Savognin im Sommer',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: 'YH3fkTH29mjv4p4drEaAIRhhoTDuHlngCnn0jAxEZPI' },
  title: {
    default: SITE_TITLE,
    template: '%s · Acla Viglia Radons',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Acla Viglia Radons',
  authors: [{ name: 'Angela und Gallus Liesch-Lombris' }],
  creator: 'Angela und Gallus Liesch-Lombris',
  keywords: [
    'Maiensäss Radons',
    'Maiensäss mieten',
    'Ferienhaus Savognin',
    'Ferienhaus Graubünden',
    'Ferienhaus für Gruppen',
    'Ferienhaus mit Hund',
    'Sommerferien Savognin',
    'Wandern Parc Ela',
    'Skiferien Savognin',
    'Ski-In Ski-Out Savognin',
    'Parc Ela',
    'Val Surses',
    'Ferien Graubünden',
    'Maiensäss Graubünden',
    'Surses',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: SITE_URL,
    siteName: 'Acla Viglia Radons',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de-CH" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-parchment text-ink">
        {children}
        {/* Vercel Web Analytics: cookiefrei, keine Wiedererkennung einzelner
            Personen, deshalb ohne Consent-Banner zulaessig. In /datenschutz
            deklariert. Muss zusaetzlich im Vercel-Dashboard aktiviert sein,
            sonst laedt das Script ins Leere. */}
        <Analytics />
      </body>
    </html>
  )
}
