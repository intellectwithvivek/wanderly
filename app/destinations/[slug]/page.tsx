import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Badge,
  Card,
  Carousel,
  Container,
  Divider,
  FAQ,
  Grid,
  Heading,
  MapEmbed,
  Rating,
  Section,
  Stats,
  Text,
} from '@the_viveksingh/vivek-ui'

import { BookingCard } from '@/components/booking-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ClimateCharts } from '@/components/climate-charts'
import { ItineraryTimeline } from '@/components/itinerary-timeline'
import { JsonLd } from '@/components/jsonld'
import { faqPageJsonLd, tripFaq } from '@/data/faq'
import { breadcrumbJsonLd, touristTripJsonLd, type Crumb } from '@/data/schema'
import { abs } from '@/data/site'
import { ORIGIN, formatPrice, tripBySlug, trips } from '@/data/trips'

/** All six pages are prerendered at build time. */
export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const trip = tripBySlug(slug)
  if (!trip) return {}

  const path = `/destinations/${trip.slug}`
  const image = `${trip.hero.src}?auto=format&fit=crop&w=1200&h=630&q=75`

  return {
    title: `${trip.title} — ${trip.days}-Day Small-Group Trip`,
    description: `${trip.summary.slice(0, 150)}… From ${formatPrice(trip.priceFrom)} per person. Best months: ${trip.bestMonths}.`,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: `${trip.title} — ${trip.days} days with Wanderly`,
      description: trip.tagline,
      images: [{ url: image, width: 1200, height: 630, alt: trip.hero.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
    },
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const trip = tripBySlug(slug)
  if (!trip) notFound()

  const path = `/destinations/${trip.slug}`
  const crumbs: readonly Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: trip.name, path },
  ]
  const faq = tripFaq(trip)
  const slides = [trip.hero, ...trip.gallery]

  return (
    <>
      <JsonLd data={touristTripJsonLd(trip)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqPageJsonLd(faq, abs(path))} />

      <Container size="xl">
        <div className="page-head">
          <Breadcrumbs crumbs={crumbs} />

          <span className="eyebrow" style={{ display: 'block', marginTop: 'var(--vk-space-5)' }}>
            {ORIGIN} <span aria-hidden="true">✈</span> {trip.code} · {trip.country}
          </span>

          <Heading level={1} size="2xl" style={{ marginTop: 'var(--vk-space-2)' }}>
            {trip.title}
          </Heading>

          <Text tone="muted" size="lg" style={{ marginTop: 'var(--vk-space-4)', maxWidth: '48rem' }}>
            {trip.summary}
          </Text>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--vk-space-3)',
              alignItems: 'center',
              marginTop: 'var(--vk-space-5)',
            }}
          >
            {/* `aria-label`, not `label`: `label` renders a visible <legend>, which
                here would just repeat the "4.7 · 128 reviews" line beside it. A
                read-only Rating is a single role="img", so the name is enough. */}
            <Rating
              value={trip.rating}
              readOnly
              allowHalf
              size="sm"
              aria-label={`Rated ${trip.rating} out of 5 by travellers`}
            />
            <Text as="span" size="sm" tone="muted">
              {trip.rating} · {trip.reviewCount} reviews
            </Text>
            {trip.interests.map((interest) => (
              <Badge key={interest} variant="outline" tone="neutral" size="sm">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </Container>

      {/* -------------------------------------------------------- Gallery */}
      <Container size="xl">
        <Carousel
          slidesPerView={{ base: 1, md: 2 }}
          gap={4}
          showArrows
          showDots
          label={`Photographs of ${trip.name}`}
          slideLabel={(index, total) => `Photograph ${index + 1} of ${total}`}
        >
          {slides.map((image, index) => (
            <figure key={image.src} className="slide-media" style={{ margin: 0 }}>
              <Image
                src={`${image.src}?auto=format&fit=crop&w=1200&q=72`}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 92vw"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </Carousel>
      </Container>

      {/* ----------------------------------------------------- Quick facts */}
      <Stats
        size="xl"
        padding="md"
        columns={{ base: 2, md: 4 }}
        items={[
          { id: 'days', value: trip.days, label: 'Days', description: `${trip.nights} nights` },
          { id: 'group', value: trip.groupSize, label: 'Group size', description: 'Hard cap' },
          {
            id: 'difficulty',
            value: trip.difficulty,
            label: 'Difficulty',
            description: 'See the day-by-day below',
          },
          {
            id: 'price',
            value: formatPrice(trip.priceFrom),
            label: 'From, per person',
            description: 'Land price, no flights',
          },
        ]}
      />

      {/* ------------------------------------- Itinerary + booking + rest */}
      <Container size="xl">
        <div className="detail-layout" style={{ paddingBlock: 'var(--vk-space-8)' }}>
          <div>
            <section aria-labelledby="itinerary">
              <span className="eyebrow">Day by day</span>
              <Heading id="itinerary" level={2} size="xl" style={{ marginTop: '0.35rem' }}>
                The {trip.days} days, in order
              </Heading>
              <Text tone="muted" style={{ marginTop: 'var(--vk-space-3)', marginBottom: 'var(--vk-space-8)' }}>
                Written by the guide who runs it. Where a day is hard, it says so.
              </Text>
              <ItineraryTimeline trip={trip} />
            </section>

            <hr className="perf-rule" />

            {/* ------------------------------------- Best time to visit */}
            <ClimateCharts trip={trip} />

            <hr className="perf-rule" />

            {/* --------------------------------- Inclusions / exclusions */}
            <section aria-labelledby="whats-included">
              <span className="eyebrow">The small print, up front</span>
              <Heading id="whats-included" level={2} size="xl" style={{ marginTop: '0.35rem' }}>
                What is and is not in the price
              </Heading>

              <Grid cols={{ base: 1, md: 2 }} gap={8} style={{ marginTop: 'var(--vk-space-6)' }}>
                <div>
                  <Heading level={3} size="md" style={{ marginBottom: 'var(--vk-space-4)' }}>
                    Included
                  </Heading>
                  <ul className="tick-list">
                    {trip.includes.map((item) => (
                      <li key={item}>
                        {/* Decorative: the "Included" heading above already says
                            which list this is, so announcing it per row is noise. */}
                        <Badge tone="success" variant="soft" size="sm" aria-hidden="true">
                          ✓
                        </Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Heading level={3} size="md" style={{ marginBottom: 'var(--vk-space-4)' }}>
                    Not included
                  </Heading>
                  <ul className="tick-list">
                    {trip.excludes.map((item) => (
                      <li key={item}>
                        <Badge tone="neutral" variant="outline" size="sm" aria-hidden="true">
                          −
                        </Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Grid>
            </section>

            <hr className="perf-rule" />

            {/* ------------------------------------------------------ Map */}
            <section aria-labelledby="where">
              <span className="eyebrow">Where you will be</span>
              <Heading id="where" level={2} size="xl" style={{ marginTop: '0.35rem' }}>
                {trip.map.query}
              </Heading>
              <Text tone="muted" style={{ marginTop: 'var(--vk-space-3)', marginBottom: 'var(--vk-space-5)' }}>
                Centred on where the trip is based. OpenStreetMap, so nothing is requested
                from a third party that sets cookies.
              </Text>
              <div className="map-frame">
                <MapEmbed
                  title={`Map of ${trip.map.query}`}
                  lat={trip.map.lat}
                  lon={trip.map.lon}
                  zoom={trip.map.zoom}
                  ratio={16 / 9}
                  provider="openstreetmap"
                />
              </div>
            </section>
          </div>

          {/* ------------------------------------------------ Booking rail */}
          <aside aria-label={`Reserve the ${trip.name} trip`}>
            <BookingCard trip={trip} />
          </aside>
        </div>
      </Container>

      {/* ------------------------------------------------------------- FAQ */}
      <FAQ
        size="xl"
        background="muted"
        eyebrow={`${trip.name} questions`}
        title={`Before you book ${trip.name}`}
        name={`faq-${trip.slug}`}
        defaultOpen={0}
        items={faq.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }))}
      />

      {/* --------------------------------------------------- Other trips */}
      <Section size="xl" padding="lg">
        <Section.Header eyebrow="Or try" title="The other five" headingLevel={2} />
        <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6}>
          {trips
            .filter((other) => other.slug !== trip.slug)
            .map((other) => (
              <Card key={other.slug} variant="outline" padding="md" interactive>
                <Card.Body>
                  <Heading level={3} size="sm">
                    <Link href={`/destinations/${other.slug}`}>{other.name}</Link>
                  </Heading>
                  <Text tone="muted" size="sm" lineClamp={2}>
                    {other.tagline}
                  </Text>
                  <Divider />
                  <Text size="sm">
                    From {formatPrice(other.priceFrom)} · {other.days} days ·{' '}
                    {other.difficulty}
                  </Text>
                </Card.Body>
              </Card>
            ))}
        </Grid>
      </Section>
    </>
  )
}
