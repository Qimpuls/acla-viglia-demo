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
    ]
  },
}

export default nextConfig
