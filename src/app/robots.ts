import type { MetadataRoute } from 'next'

const SITE_URL = 'https://aclavigliaradons.ch'

export default function robots(): MetadataRoute.Robots {
  // Alle Crawler erlaubt, inklusive KI-Bots (GPTBot, ClaudeBot, PerplexityBot
  // etc.) für maximale Auffindbarkeit. Nur der Admin-Bereich bleibt aussen vor.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/verwaltung',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
