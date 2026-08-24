import type { MetadataRoute } from 'next'

import { SITE } from '@/data/site'

/**
 * The web app manifest.
 *
 * Worth having on a marketing site for two reasons that are not "make it an app":
 * it gives Android a real name, colour and icon when someone adds the site to their
 * home screen, and search engines read `name`/`description`/`categories` as another
 * consistent signal alongside the Metadata API and the JSON-LD.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — small-group trips to six places worth the flight`,
    short_name: SITE.name,
    description:
      'Curated small-group trips to Bali, Santorini, Kyoto, the Swiss Alps, Ladakh and Iceland, with day-by-day itineraries and month-by-month climate data.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0b',
    theme_color: '#047857',
    lang: 'en',
    categories: ['travel', 'lifestyle'],
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/logo-mark.png', type: 'image/png', sizes: '512x512', purpose: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  }
}
