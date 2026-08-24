/**
 * One place for everything that appears in more than one route: the canonical
 * origin, the nav, and the VivekUI promotion links.
 *
 * Every outbound VivekUI link is UTM-tagged through `docsUrl` / `authorUrl`, so the
 * campaign is attached in exactly one place and cannot drift between the navbar, the
 * footer and the /built-with table.
 */

export const SITE = {
  name: 'Wanderly',
  tagline: 'Small-group trips, planned by people who have been there.',
  /** Change this one line when you deploy to your own domain. */
  url: 'https://wanderly.vivekkumarsingh.in',
  locale: 'en_US',
  twitter: '@intellectwithvk',
  /** Where the tour company nominally lives — used by the TravelAgency JSON-LD. */
  address: {
    street: '14 Harbour Walk',
    city: 'Lisbon',
    region: 'Lisboa',
    postalCode: '1100-148',
    country: 'PT',
  },
  phone: '+351-21-000-0000',
  email: 'hello@wanderly.example',
  founded: '2014',
} as const

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/plan', label: 'Plan a trip' },
  { href: '/built-with', label: 'Built with' },
] as const

/* ------------------------------------------------------------------ *
 * Promotion kit
 * ------------------------------------------------------------------ */

const UTM_SOURCE = 'vivekui-template'
const UTM_CAMPAIGN = 'travel'

export const VIVEKUI = {
  pkg: '@the_viveksingh/vivek-ui',
  installCommand: 'npm i @the_viveksingh/vivek-ui',
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  charts: 'https://ui.vivekkumarsingh.in/docs/charts',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
  /** This template's own repository — public, and linked from the navbar and footer. */
  repo: 'https://github.com/intellectwithvivek/wanderly',
  blurb:
    'Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime dependencies. One install, one CSS import, no config.',
} as const

/** `utm_medium` values used across the site, so a typo cannot silently split a report. */
export type Medium = 'navbar' | 'footer' | 'builtwith' | 'readme' | 'hero' | 'body'

function tagged(base: string, medium: Medium) {
  const url = new URL(base)
  url.searchParams.set('utm_source', UTM_SOURCE)
  url.searchParams.set('utm_campaign', UTM_CAMPAIGN)
  url.searchParams.set('utm_medium', medium)
  return url.toString()
}

/** The VivekUI docs home, UTM-tagged for the surface it is linked from. */
export const docsUrl = (medium: Medium) => tagged(VIVEKUI.docs, medium)

/** The author's site, UTM-tagged. */
export const authorUrl = (medium: Medium) => tagged(VIVEKUI.author, medium)

/**
 * A deep link to one component's documentation page.
 *
 * `name` is the kebab-case slug the docs use — `bento-grid`, not `BentoGrid`.
 */
export const componentUrl = (name: string, medium: Medium = 'builtwith') =>
  tagged(`${VIVEKUI.components}/${name}`, medium)

/**
 * The site-wide Open Graph card.
 *
 * Exported rather than inherited: a route that declares its own `openGraph` REPLACES
 * the layout's rather than merging into it, so a page that sets a custom og:title and
 * forgets this would silently share with no image at all.
 */
export const OG_IMAGE = {
  url: '/opengraph-image.jpg',
  width: 1200,
  height: 630,
  alt: 'The Wanderly homepage: a mountain road from above, with the trip search below it',
} as const

/** The charts section of the docs, where `LineChart` and `BarChart` are documented. */
export const chartsUrl = (medium: Medium = 'builtwith') => tagged(VIVEKUI.charts, medium)

/** Absolute URL for canonicals, OG tags and JSON-LD `@id`s. */
export const abs = (path = '/') => new URL(path, SITE.url).toString()
