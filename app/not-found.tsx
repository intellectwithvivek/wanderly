import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, Container, EmptyState, Grid } from '@the_viveksingh/vivek-ui'

import { TicketCard } from '@/components/ticket-card'
import { trips } from '@/data/trips'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Container size="lg">
      <div style={{ paddingBlock: 'var(--vk-space-16)' }}>
        <EmptyState
          size="lg"
          headingLevel={1}
          icon={
            <span aria-hidden="true" style={{ fontSize: '2.5rem' }}>
              🧭
            </span>
          }
          title="We do not run that route"
          description="The page you asked for is not here. We only run six trips, and all of them are below."
          actions={
            <>
              <Button asChild size="lg">
                <Link href="/destinations">See all six trips</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/plan">Plan a trip instead</Link>
              </Button>
            </>
          }
        />

        <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} style={{ marginTop: 'var(--vk-space-12)' }}>
          {trips.slice(0, 3).map((trip) => (
            <div key={trip.slug} className="bento-tile">
              <TicketCard trip={trip} headingLevel={2} />
            </div>
          ))}
        </Grid>
      </div>
    </Container>
  )
}
