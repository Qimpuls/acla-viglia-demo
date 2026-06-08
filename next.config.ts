import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // AVIF zuerst (kleiner), WebP als Fallback. Verkleinert die ausgelieferten
    // Hero-/Galeriebilder zusätzlich gegenüber den grossen PNG-Quellen.
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        // Canonical host: 308 redirect www -> apex domain
        source: '/:path*',
        has: [{ type: 'host', value: 'www.aclavigliaradons.ch' }],
        destination: 'https://aclavigliaradons.ch/:path*',
        permanent: true,
      },
      {
        // Alt-Galerie der früheren Webseite. Wird extern verlinkt (das Inserat
        // BH575 auf sentiero.ch verweist mit allen Fotos hierher). 308 auf die
        // neue Galerie, damit die Bestandslinks nie ins Leere laufen.
        source: '/impressionen1/:path*',
        destination: '/galerie',
        permanent: true,
      },
      {
        // Alter Belegungs-/Preis-Pfad der früheren Webseite, ebenfalls extern
        // verlinkt. 308 auf die Preis-Sektion der neuen Startseite.
        source: '/preise-belegung',
        destination: '/#preise',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
