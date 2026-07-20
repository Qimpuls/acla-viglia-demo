import type { NextConfig } from 'next'

// Alles same-origin (keine Drittskripte, Fonts self-hosted via next/font,
// Vercel Analytics unter /_vercel/insights). 'unsafe-inline' braucht Next.js
// für seine Inline-Skripte/Styles. data: deckt die Inline-SVG-Hintergründe
// (Select-Pfeil) ab. Bei einer künftigen Karten-Einbettung frame-src ergänzen.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const nextConfig: NextConfig = {
  images: {
    // AVIF zuerst (kleiner), WebP als Fallback. Verkleinert die ausgelieferten
    // Hero-/Galeriebilder zusätzlich gegenüber den grossen PNG-Quellen.
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ]
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
