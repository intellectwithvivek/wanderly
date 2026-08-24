import Image from 'next/image'
import Link from 'next/link'
import { Badge, Carousel, Countdown, Heading, Text } from '@the_viveksingh/vivek-ui'

import { ORIGIN, deals, formatPrice } from '@/data/trips'

/**
 * Limited-time offers, one per slide, each with a live countdown to its expiry.
 *
 * The same boarding-pass motif as `TicketCard`, with `--ticket-stub` raised so
 * the countdown has room. Reusing the motif rather than inventing a second card
 * shape is the point.
 *
 * `now` is passed in from the page rather than read here, because `Countdown`
 * refuses to read the clock during render — a server rendering at 12:00:03 and a
 * browser hydrating at 12:00:05 would produce different HTML. Given a `now`, the
 * server HTML holds real digits and the client reproduces them exactly before
 * taking over on its own clock.
 */
export function DealsCarousel({ now }: { now: number }) {
  return (
    <Carousel
      slidesPerView={{ base: 1, sm: 2, lg: 3 }}
      gap={6}
      showArrows
      showDots
      loop
      label="Limited-time trip offers"
      slideLabel={(index, total) => `Offer ${index + 1} of ${total}`}
    >
      {deals.map((trip) => {
        const expiresAt = now + trip.deal.endsInHours * 60 * 60 * 1000

        return (
          <Link
            key={trip.slug}
            href={`/destinations/${trip.slug}`}
            className="ticket"
            style={{ '--ticket-stub': '5.75rem' } as React.CSSProperties}
          >
            <div className="ticket__media">
              <Image
                src={`${trip.hero.src}?auto=format&fit=crop&w=800&q=70`}
                alt={trip.hero.alt}
                fill
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
              />
              <span className="ticket__route">
                {ORIGIN}
                <span aria-hidden="true">✈</span>
                {trip.code}
              </span>
              <span className="ticket__price">−{trip.deal.off}%</span>
            </div>

            <div className="ticket__body">
              <Badge tone="warning" variant="soft" size="sm" style={{ alignSelf: 'start' }}>
                {trip.deal.label}
              </Badge>
              <Heading level={3} size="md">
                {trip.name}
              </Heading>
              <Text tone="muted" size="sm" lineClamp={2}>
                {trip.deal.copy}
              </Text>
              <Text size="sm" style={{ marginTop: 'auto' }}>
                <strong>{formatPrice(trip.priceFrom)}</strong>{' '}
                {trip.priceWas ? (
                  <Text as="s" size="sm" tone="muted">
                    {formatPrice(trip.priceWas)}
                  </Text>
                ) : null}{' '}
                <Text as="span" size="sm" tone="muted">
                  · {trip.days} days
                </Text>
              </Text>
            </div>

            <div className="ticket__stub" style={{ display: 'grid', placeItems: 'center' }}>
              <Countdown
                to={expiresAt}
                now={now}
                format={['days', 'hours', 'minutes', 'seconds']}
                label={`Time left on the ${trip.name} offer`}
                completeLabel="This offer has closed"
              />
            </div>
          </Link>
        )
      })}
    </Carousel>
  )
}
