import type { Metadata } from 'next'
import { SaisonSeite } from '@/components/SaisonSeite'
import { saisonseiten } from '@/lib/content'

const s = saisonseiten.sommer

export const metadata: Metadata = {
  title: s.title,
  description: s.description,
  alternates: { canonical: s.path },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: s.path,
    siteName: 'Acla Viglia Radons',
    title: s.title,
    description: s.description,
    images: [{ url: s.image, alt: s.alt }],
  },
}

export default function Page() {
  return <SaisonSeite season="sommer" />
}
