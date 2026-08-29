import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatedCounter,
  Badge,
  BentoGrid,
  Button,
  CTA,
  Container,
  FAQ,
  Marquee,
  Rating,
  Section,
  Stats,
  Stepper,
  Testimonials,
  Text,
  toISODate,
} from '@the_viveksingh/vivek-ui'

import { ClimateCharts } from '@/components/climate-charts'
import { DealsCarousel } from '@/components/deals-carousel'
import { HeroSearch } from '@/components/hero-search'
import { JsonLd } from '@/components/jsonld'
import { NewsletterBlock } from '@/components/newsletter-block'
import { TicketCard } from '@/components/ticket-card'
import { faqPageJsonLd, siteFaq } from '@/data/faq'
import { travelAgencyJsonLd, webSiteJsonLd } from '@/data/schema'
import { OG_IMAGE, VIVEKUI, abs, docsUrl } from '@/data/site'
import { catalogueStats, tripBySlug, trips } from '@/data/trips'
import { renderDate, renderTime } from '@/lib/render-time'

/**
 * Revalidated hourly so the deal countdowns stay live.
 *
 * The alternative is rendering the page per request, which throws away the static
 * shell for the sake of three timers — and one hour is well inside the shortest
 * offer on the site.
 */
export const revalidate = 3600

export const metadata: Metadata = {
  title: {
    absolute: 'Free Travel Website Template (Next.js) — Wanderly | VivekUI',
  },
  description:
    'A free travel website template for Next.js: six trip pages with day-by-day itinerary timelines, best-time-to-visit climate charts, and a booking flow. Built with VivekUI — 91 React components, zero runtime dependencies. MIT licensed.',
  keywords: [
    'free travel website template nextjs',
    'nextjs travel template',
    'tour operator website template',
    'react travel website template',
    'vivekui template',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Free Travel Website Template (Next.js) — Wanderly',
    description:
      'Six trip pages, itinerary timelines, and climate charts that need no chart library. Free, open source, MIT.',
    images: [OG_IMAGE],
  },
}

/** The tile geometry for the destination wall. Widest tiles alternate sides. */
const SPANS: Record<string, { base: number; sm: number; lg: number }> = {
  bali: { base: 1, sm: 2, lg: 2 },
  santorini: { base: 1, sm: 1, lg: 1 },
  kyoto: { base: 1, sm: 1, lg: 1 },
  'swiss-alps': { base: 1, sm: 1, lg: 1 },
  ladakh: { base: 1, sm: 1, lg: 1 },
  iceland: { base: 1, sm: 2, lg: 2 },
}

const STEPS = [
  {
    label: 'Tell us the month',
    description:
      'Every trip page carries the real climate data. Pick the week that suits you, not the one we are trying to fill.',
  },
  {
    label: 'Hold your seats',
    description:
      'A 20% deposit holds a place for 48 hours while you book flights. Free to cancel for 14 days.',
  },
  {
    label: 'Turn up',
    description:
      'We meet you at the airport. Everything on the inclusions list is already paid for.',
  },
]

const TESTIMONIALS = [
  {
    id: 'nadia',
    quote:
      'The Batur climb started at two in the morning and I complained the entire way up. Standing on the rim at sunrise I understood exactly why they do it that way.',
    author: 'Nadia Okonkwo',
    role: 'Bali, September',
    avatar: 'https://i.pravatar.cc/128?img=45',
  },
  {
    id: 'tom',
    quote:
      'Booked Kyoto for November purely off the rainfall chart on the trip page. Eight days, not one wet afternoon. No other operator gave me the numbers.',
    author: 'Tom Aldridge',
    role: 'Kyoto, November',
    avatar: 'https://i.pravatar.cc/128?img=13',
  },
  {
    id: 'priya',
    quote:
      'Three days of doing almost nothing in Leh before we went anywhere high. Two people on another tour we met at Pangong were both ill. We were fine.',
    author: 'Priya Ramnath',
    role: 'Ladakh, July',
    avatar: 'https://i.pravatar.cc/128?img=32',
  },
  {
    id: 'lukas',
    quote:
      'Nine hours over the Sefinenfurgge was the hardest day I have had on a walking holiday, and the guide never once made me feel like the slow one.',
    author: 'Lukas Brenner',
    role: 'Swiss Alps, August',
    avatar: 'https://i.pravatar.cc/128?img=59',
  },
  {
    id: 'maria',
    quote:
      'Six of us on Santorini in June. We walked the caldera at half six in the morning and had it entirely to ourselves. By ten it was heaving.',
    author: 'Maria Kalliopi',
    role: 'Santorini, June',
    avatar: 'https://i.pravatar.cc/128?img=20',
  },
  {
    id: 'greg',
    quote:
      'Two nights at Jökulsárlón instead of the usual one, and that was the whole difference. The second morning the ice went out on the tide and it was silent.',
    author: 'Greg Halloran',
    role: 'Iceland, June',
    avatar: 'https://i.pravatar.cc/128?img=68',
  },
]

export default function HomePage() {
  const now = renderTime()
  const today = toISODate(renderDate())
  const bali = tripBySlug('bali')!

  return (
    <>
      <JsonLd data={travelAgencyJsonLd()} />
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={faqPageJsonLd(siteFaq, abs('/'))} />

      {/* ------------------------------------------------------------ Hero */}
      <div className="hero">
        <div className="hero__photo">
          <Image
            src="https://images.unsplash.com/photo-1503079230625-8a7c589a9007?auto=format&fit=crop&w=2000&q=75"
            alt="A road winding through green mountains above the cloud line at first light"
            fill
            sizes="100vw"
            preload
          />
        </div>
        <div className="hero__scrim" />

        <Container size="xl">
          <div className="hero__copy">
            <span className="hero__kicker">
              Six trips · 6–12 travellers · no coaches
            </span>
            <h1>Small-group trips to six places worth the flight.</h1>
            <p>
              Day-by-day itineraries written by the people who guide them, and honest
              month-by-month climate data on every trip — so you book the right week,
              not just the right place.
            </p>
          </div>
        </Container>
      </div>

      <Container size="xl">
        <HeroSearch today={today} />
      </Container>

      {/* ---------------------------------------------------------- Ticker */}
      <Section padding="md" bleed>
        <Marquee pauseOnHover gradient speed={0.75} gap={8} aria-label="Where we travel">
          {trips.map((trip) => (
            <span className="ticker-item" key={trip.slug}>
              <b>{trip.name}</b>
              {trip.code}
              <span className="ticker-dot" aria-hidden="true">
                ✳
              </span>
            </span>
          ))}
        </Marquee>
      </Section>

      {/* ---------------------------------------------------- Destinations */}
      <Section size="xl" padding="lg" id="destinations">
        <Section.Header
          eyebrow="The catalogue"
          title="Six destinations, and that is the whole list"
          description="We would rather run six trips properly than sixty badly. Each one is a fixed route we have walked, eaten and slept through ourselves."
        />
        <BentoGrid cols={{ base: 1, sm: 2, lg: 4 }} gap={6} rowHeight="12rem">
          {trips.map((trip) => (
            <BentoGrid.Item
              key={trip.slug}
              className="bento-tile"
              colSpan={SPANS[trip.slug]}
            >
              <TicketCard
                trip={trip}
                sizes={
                  SPANS[trip.slug].lg === 2
                    ? '(min-width: 1024px) 44rem, (min-width: 640px) 92vw, 92vw'
                    : '(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw'
                }
              />
            </BentoGrid.Item>
          ))}
        </BentoGrid>

        <div style={{ marginTop: 'var(--vk-space-8)', textAlign: 'center' }}>
          <Button asChild variant="outline" size="lg">
            <Link href="/destinations">Compare all six side by side</Link>
          </Button>
        </div>
      </Section>

      <Container size="xl">
        <hr className="perf-rule" />
      </Container>

      {/* ----------------------------------------------------------- Deals */}
      <Section size="xl" padding="lg" id="deals">
        <Section.Header
          eyebrow="Closing soon"
          title="Departures we are holding seats on"
          description="Real seats on real departures. When the countdown runs out the price goes back up — we do not restart it."
        />
        <DealsCarousel now={now} />
      </Section>

      {/* ----------------------------------------------------------- Stats */}
      <Stats
        background="muted"
        size="xl"
        eyebrow="Since 2014"
        title="Small numbers, on purpose"
        columns={{ base: 2, md: 4 }}
        items={[
          {
            id: 'countries',
            value: catalogueStats.countries,
            label: 'Countries',
            description: 'Six routes, six countries, no filler',
          },
          {
            id: 'travellers',
            value: (
              <AnimatedCounter
                value={catalogueStats.travellers}
                locale="en-US"
                suffix="+"
                format={{ maximumFractionDigits: 0 }}
              />
            ),
            label: 'Travellers',
            description: 'Guided since our first Bali departure',
          },
          {
            id: 'rating',
            value: (
              <span
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {catalogueStats.averageRating.toFixed(1)}
                <Rating
                  value={catalogueStats.averageRating}
                  readOnly
                  allowHalf
                  size="sm"
                  aria-label={`Average traveller rating: ${catalogueStats.averageRating} out of 5`}
                />
              </span>
            ),
            label: 'Average rating',
            description: `Across ${catalogueStats.reviews} reviews`,
          },
          {
            id: 'group',
            value: '12',
            label: 'Largest group',
            description: 'A hard cap, not a target',
          },
        ]}
      />

      {/* --------------------------------------------------- How it works */}
      <Section size="xl" padding="lg">
        <Section.Header
          eyebrow="How it works"
          title="Three steps, and none of them is a phone call"
        />
        <Stepper
          steps={STEPS}
          orientation="horizontal"
          activeStep={0}
          size="lg"
          label="How booking a trip works"
        />
      </Section>

      {/* ------------------------------------- Charts, as a homepage taste */}
      <Section size="xl" padding="lg" background="muted">
        <Section.Header
          eyebrow="Why our trip pages are different"
          title="We show you the weather before you pay"
          description="Every destination page carries these two charts. This is Bali's — the reason we push people towards May and June rather than August."
        />
        <ClimateCharts trip={bali} headingLevel={3} />
        <div style={{ marginTop: 'var(--vk-space-6)', textAlign: 'center' }}>
          <Button asChild>
            <Link href="/destinations/bali#best-time">See the full Bali trip</Link>
          </Button>
        </div>
      </Section>

      {/* ---------------------------------------------------- Testimonials */}
      <Testimonials
        size="xl"
        eyebrow="Travellers"
        title="What people say when they get back"
        items={TESTIMONIALS}
        columns={{ base: 1, md: 2, lg: 3 }}
      />

      {/* ------------------------------------------------------------- FAQ */}
      <FAQ
        size="xl"
        background="muted"
        eyebrow="Before you book"
        title="The questions we actually get asked"
        description="If yours is not here, email hello@wanderly.example and a human will answer."
        name="home-faq"
        defaultOpenIndex={0}
        items={siteFaq.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }))}
      />

      {/* ------------------------------------------------------ Newsletter */}
      <Section size="xl" padding="lg">
        <NewsletterBlock />
      </Section>

      {/* ---------------------------------------------- Promotion kit, body */}
      <CTA
        size="xl"
        background="primary"
        eyebrow="Free and open source"
        title="This whole site is a template you can have"
        description="Every card, chart, timeline and modal on this site is a VivekUI component. Clone it, change the trips, ship it — MIT licensed, credit removable."
        actions={
          <>
            <Button asChild size="lg" variant="solid">
              <Link href="/built-with">See every component used</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={docsUrl('hero')} target="_blank" rel="noopener noreferrer">
                Read the VivekUI docs
              </a>
            </Button>
          </>
        }
      />

      <Section size="xl" padding="md">
        <Text tone="muted" size="sm" align="center">
          <Badge tone="primary" variant="soft" size="sm" pill>
            ⚡ Built with VivekUI
          </Badge>{' '}
          91 React components · 6 SVG charts · zero runtime dependencies ·{' '}
          <a href={VIVEKUI.github} target="_blank" rel="noopener noreferrer">
            source on GitHub
          </a>
        </Text>
      </Section>
    </>
  )
}
