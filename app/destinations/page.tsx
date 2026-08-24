import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Badge,
  Container,
  Grid,
  Heading,
  Section,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/jsonld'
import { SearchEcho } from '@/components/search-echo'
import { TicketCard } from '@/components/ticket-card'
import { breadcrumbJsonLd, type Crumb } from '@/data/schema'
import { OG_IMAGE, abs } from '@/data/site'
import { formatPrice, trips } from '@/data/trips'

export const metadata: Metadata = {
  title: 'All Six Destinations — Trips, Prices and Best Months',
  description:
    'Compare all six Wanderly trips side by side: Bali, Santorini, Kyoto, the Swiss Alps, Ladakh and Iceland. Price, duration, group size, difficulty and the best months to go.',
  alternates: { canonical: '/destinations' },
  openGraph: {
    url: '/destinations',
    title: 'All six Wanderly destinations, compared',
    description:
      'Price, duration, group size, difficulty and the best months for each of the six trips.',
    images: [OG_IMAGE],
  },
}

const CRUMBS: readonly Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
]

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${abs('/destinations')}#trips`,
          name: 'Wanderly destinations',
          numberOfItems: trips.length,
          itemListElement: trips.map((trip, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: trip.title,
            url: abs(`/destinations/${trip.slug}`),
          })),
        }}
      />

      <Container size="xl">
        <div className="page-head">
          <Breadcrumbs crumbs={CRUMBS} />
          <Heading level={1} size="2xl" style={{ marginTop: 'var(--vk-space-4)' }}>
            All six destinations
          </Heading>
          <Text tone="muted" size="lg" style={{ marginTop: 'var(--vk-space-3)', maxWidth: '46rem' }}>
            Six fixed routes, each one walked, eaten and slept through by the people who
            guide it. Compare them on the numbers first, then read the itineraries.
          </Text>
        </div>
      </Container>

      <Section size="xl" padding="md">
        {/* `useSearchParams` inside — the boundary is what lets this route stay
            statically prerendered instead of rendering on demand. */}
        <Suspense fallback={null}>
          <SearchEcho />
        </Suspense>

        <Table
          striped
          hoverable
          size="md"
          containerProps={{ 'data-testid': 'comparison' }}
        >
          <Table.Caption visuallyHidden>
            The six Wanderly trips compared by price, duration, group size, difficulty and
            best months to travel.
          </Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Trip</Table.HeaderCell>
              <Table.HeaderCell numeric>From</Table.HeaderCell>
              <Table.HeaderCell numeric>Days</Table.HeaderCell>
              <Table.HeaderCell>Group</Table.HeaderCell>
              <Table.HeaderCell>Difficulty</Table.HeaderCell>
              <Table.HeaderCell>Best months</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {trips.map((trip) => (
              <Table.Row key={trip.slug}>
                <Table.HeaderCell scope="row">
                  <Link href={`/destinations/${trip.slug}`}>{trip.name}</Link>
                  {trip.country === trip.name ? null : (
                    <Text as="span" size="sm" tone="muted">
                      {' · '}
                      {trip.country}
                    </Text>
                  )}
                </Table.HeaderCell>
                <Table.Cell numeric label="From">
                  {formatPrice(trip.priceFrom)}
                </Table.Cell>
                <Table.Cell numeric label="Days">
                  {trip.days}
                </Table.Cell>
                <Table.Cell label="Group">{trip.groupSize}</Table.Cell>
                <Table.Cell label="Difficulty">
                  <Badge
                    size="sm"
                    variant="soft"
                    tone={
                      trip.difficulty === 'Easy'
                        ? 'success'
                        : trip.difficulty === 'Moderate'
                          ? 'primary'
                          : 'warning'
                    }
                  >
                    {trip.difficulty}
                  </Badge>
                </Table.Cell>
                <Table.Cell label="Best months">{trip.bestMonths}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section size="xl" padding="lg">
        <Section.Header
          eyebrow="The trips"
          title="Pick one and read the day-by-day"
          headingLevel={2}
        />
        <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
          {trips.map((trip) => (
            <div key={trip.slug} className="bento-tile">
              <TicketCard trip={trip} />
            </div>
          ))}
        </Grid>
      </Section>
    </>
  )
}
