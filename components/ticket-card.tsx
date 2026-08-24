import Image from 'next/image'
import Link from 'next/link'
import { Badge, Flex, Heading, Text } from '@the_viveksingh/vivek-ui'

import { ORIGIN, formatPrice, type Trip } from '@/data/trips'

/**
 * The site's one motif: a trip as a boarding-pass stub.
 *
 * The perforation, the punched side notches and the mono route strip are all in
 * `globals.css` under `.ticket`. Every list of trips on the site uses this
 * component, so the motif never appears in two slightly different forms.
 */
export function TicketCard({
  trip,
  headingLevel = 3,
  sizes = '(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw',
}: {
  trip: Trip
  headingLevel?: 2 | 3 | 4
  sizes?: string
}) {
  return (
    <Link href={`/destinations/${trip.slug}`} className="ticket">
      <div className="ticket__media">
        <Image
          src={`${trip.hero.src}?auto=format&fit=crop&w=900&q=70`}
          alt={trip.hero.alt}
          fill
          sizes={sizes}
        />
        <span className="ticket__route">
          {ORIGIN}
          <span aria-hidden="true">✈</span>
          {trip.code}
        </span>
        {trip.deal ? (
          <span className="ticket__price">−{trip.deal.off}% this week</span>
        ) : null}
      </div>

      <div className="ticket__body">
        <Heading level={headingLevel} size="md">
          {trip.name}
          {/* Iceland's trip is called "Iceland" and is in Iceland — printing both
              reads as a bug, so the country is dropped when it repeats the name. */}
          {trip.country === trip.name ? null : (
            <Text as="span" tone="muted" size="sm" weight="normal">
              {' · '}
              {trip.country}
            </Text>
          )}
        </Heading>
        <Text tone="muted" size="sm" lineClamp={2}>
          {trip.tagline}
        </Text>
        <Flex gap={2} wrap style={{ marginTop: 'auto' }}>
          <Badge variant="soft" tone="primary" size="sm">
            {trip.difficulty}
          </Badge>
          {trip.interests.slice(0, 2).map((interest) => (
            <Badge key={interest} variant="outline" tone="neutral" size="sm">
              {interest}
            </Badge>
          ))}
        </Flex>
      </div>

      <dl className="ticket__stub">
        <div className="ticket__cell">
          <dt>From</dt>
          <dd>{formatPrice(trip.priceFrom)}</dd>
        </div>
        <div className="ticket__cell">
          <dt>Days</dt>
          <dd>{trip.days}</dd>
        </div>
        <div className="ticket__cell">
          <dt>Group</dt>
          <dd>{trip.groupSize}</dd>
        </div>
      </dl>
    </Link>
  )
}
