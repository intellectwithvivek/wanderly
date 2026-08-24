import type { MetadataRoute } from 'next'

import { abs } from '@/data/site'
import { trips } from '@/data/trips'

/**
 * Every indexable URL on the site. Generated from the catalogue, so adding a trip
 * to `data/trips.ts` puts it in the sitemap with no second edit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: abs('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: abs('/destinations'), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: abs('/plan'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: abs('/built-with'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
    ...trips.map((trip) => ({
      url: abs(`/destinations/${trip.slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
