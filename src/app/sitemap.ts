import type { MetadataRoute } from 'next'

const SITE_URL = 'https://aclavigliaradons.ch'

// Echtes Änderungsdatum des letzten inhaltlichen Durchgangs, nicht new Date():
// sonst meldet jeder Build Google eine Änderung und das Signal wird wertlos.
// Bei jeder inhaltlichen Änderung einer Seite hier nachziehen.
const LAST_CONTENT_CHANGE = new Date('2026-09-23')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/sommer`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/winter`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/galerie`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: LAST_CONTENT_CHANGE,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]
}
