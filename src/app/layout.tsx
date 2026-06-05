import type { Metadata } from 'next'
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

const SITE_URL = 'https://aclavigliaradons.ch'
const SITE_TITLE = 'ACLA VIGLIA RADONS · Maiensäss in Savognin mieten'
const SITE_DESCRIPTION =
  'Maiensäss auf 1885 m an der Skipiste Savognin, mitten im Parc Ela. Persönlich geführt von zwei erfahrenen Hoteliers, Wochenmiete für 2 bis 8 Personen.'
const OG_IMAGE = {
  url: '/images/hero-sommer.png',
  alt: 'Maiensäss Acla Viglia in Radons über Savognin im Sommer',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    'Ferienwohnung Savognin',
    'Skiferien Savognin',
    'Ski-In Ski-Out Savognin',
    'Parc Ela',
    'Val Surses',
    'Ferien Graubünden',
    'Maiensäss Graubünden',
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
      <body className="min-h-screen bg-parchment text-ink">{children}</body>
    </html>
  )
}
