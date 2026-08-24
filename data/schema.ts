/**
 * Structured data, built from the same objects the pages render.
 *
 * One rule throughout: only properties the type actually defines. `aggregateRating`
 * is on the `TravelAgency` and not on `TouristTrip`, because schema.org's `Trip`
 * has no such property — a validator that warns today is a rich result that
 * disappears tomorrow.
 */

import { SITE, VIVEKUI, abs } from '@/data/site'
import { formatPrice, catalogueStats, type Trip } from '@/data/trips'

const ORG_ID = abs('/#travelagency')

/** The tour operator itself. Rendered once, on the homepage. */
export function travelAgencyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: SITE.name,
    description:
      'Boutique tour operator running small-group trips to Bali, Santorini, Kyoto, the Swiss Alps, Ladakh and Iceland.',
    url: abs('/'),
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: SITE.founded,
    priceRange: `${formatPrice(1690)}–${formatPrice(3480)}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: ['Indonesia', 'Greece', 'Japan', 'Switzerland', 'India', 'Iceland'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: catalogueStats.averageRating,
      reviewCount: catalogueStats.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [VIVEKUI.repo],
  }
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: SITE.name,
    url: abs('/'),
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  }
}

/** One trip. `itinerary` and `offers` are the two properties that earn the type. */
export function touristTripJsonLd(trip: Trip) {
  const url = abs(`/destinations/${trip.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: trip.title,
    description: trip.summary,
    url,
    image: trip.gallery.map((image) => `${image.src}?auto=format&fit=crop&w=1200&q=75`),
    touristType: [...trip.interests],
    provider: { '@id': ORG_ID },
    subjectOf: {
      '@type': 'WebPage',
      '@id': url,
      name: trip.title,
    },
    itinerary: {
      '@type': 'ItemList',
      name: `${trip.days}-day itinerary for ${trip.name}`,
      numberOfItems: trip.itinerary.length,
      itemListElement: trip.itinerary.map((day, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `Day ${day.day}: ${day.title}`,
        description: day.description,
      })),
    },
    offers: {
      '@type': 'Offer',
      '@id': `${url}#offer`,
      url,
      name: `${trip.days}-day small-group trip, from ${trip.groupSize} travellers`,
      price: trip.priceFrom,
      priceCurrency: trip.currency,
      availability: 'https://schema.org/InStock',
      category: 'Land price, international flights excluded',
      seller: { '@id': ORG_ID },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: trip.priceFrom,
        priceCurrency: trip.currency,
        valueAddedTaxIncluded: false,
      },
    },
  }
}

/**
 * The template itself, as structured data.
 *
 * Rendered on /built-with, where the subject genuinely is the software rather than
 * the trips. `SoftwareSourceCode` is the honest type for "here is a repository you
 * can clone", and it is what lets an answer engine say what this project is, what it
 * is written in, and where to get it.
 */
export function templateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${abs('/built-with')}#template`,
    name: 'Wanderly — free travel website template for Next.js',
    description:
      'A free, MIT-licensed travel and tours website template for Next.js 16 and React 19. Six trip pages with day-by-day itinerary timelines, best-time-to-visit climate charts, and a booking flow. Built entirely with VivekUI, a React component library with zero runtime dependencies — no Tailwind and no charting library.',
    codeRepository: VIVEKUI.repo,
    url: abs('/built-with'),
    sameAs: abs('/'),
    programmingLanguage: ['TypeScript', 'CSS'],
    runtimePlatform: ['Next.js 16', 'React 19', 'Node.js 20.9+'],
    applicationCategory: 'DeveloperApplication',
    codeSampleType: 'full solution',
    license: 'https://opensource.org/licenses/MIT',
    author: {
      '@type': 'Person',
      name: 'Vivek Kumar Singh',
      url: 'https://vivekkumarsingh.in/',
    },
    isBasedOn: {
      '@type': 'SoftwareApplication',
      name: '@the_viveksingh/vivek-ui',
      description:
        'A free React component library with 91 accessible components, 6 SVG charts and zero runtime dependencies.',
      url: VIVEKUI.docs,
      downloadUrl: VIVEKUI.npm,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    },
    keywords: [
      'free travel website template nextjs',
      'nextjs template',
      'react component library',
      'vivekui',
      'tour operator website',
    ],
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbJsonLd(crumbs: readonly Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  }
}
