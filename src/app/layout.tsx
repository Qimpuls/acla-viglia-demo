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

export const metadata: Metadata = {
  metadataBase: new URL('https://acla-viglia-demo.vercel.app'),
  title: 'ACLA VIGLIA RADONS · Maiensäss in Savognin',
  description:
    'Maiensäss auf 1885 m, direkt an der Skipiste Savognin. Persönlich geführt von Angela und Gallus Liesch-Lombris. Für 2 bis 8 Personen.',
  openGraph: {
    title: 'ACLA VIGLIA RADONS · Maiensäss in Savognin',
    description:
      'Maiensäss auf 1885 m, direkt an der Skipiste Savognin. Persönlich geführt von Angela und Gallus Liesch-Lombris.',
    images: ['/images/hero-sommer.jpeg'],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACLA VIGLIA RADONS · Maiensäss in Savognin',
    description:
      'Maiensäss auf 1885 m, direkt an der Skipiste Savognin. Persönlich geführt von Angela und Gallus Liesch-Lombris.',
    images: ['/images/hero-sommer.jpeg'],
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
