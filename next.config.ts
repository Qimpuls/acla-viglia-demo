import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
