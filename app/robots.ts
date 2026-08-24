import type { MetadataRoute } from 'next'

import { abs } from '@/data/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // The AEO surfaces are welcome — public/llms.txt exists for exactly this.
      { userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'], allow: '/' },
    ],
    sitemap: abs('/sitemap.xml'),
    host: abs('/'),
  }
}
