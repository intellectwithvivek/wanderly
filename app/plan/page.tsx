import type { Metadata } from 'next'
import { Container, Heading, Section, Text, toISODate } from '@the_viveksingh/vivek-ui'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/jsonld'
import { PlanBuilder } from '@/components/plan-builder'
import { breadcrumbJsonLd, type Crumb } from '@/data/schema'
import { OG_IMAGE } from '@/data/site'
import { INTERESTS } from '@/data/trips'
import { renderDate } from '@/lib/render-time'

export const metadata: Metadata = {
  title: 'Plan a Trip — Match Six Itineraries to Your Interests and Budget',
  description:
    'Tell us what you are after, what you want to spend and when you can travel. We match it against all six Wanderly itineraries and rank what fits.',
  alternates: { canonical: '/plan' },
  openGraph: {
    url: '/plan',
    title: 'Plan a trip with Wanderly',
    description:
      'Interests, budget and dates in — ranked itineraries out. No account, no email required.',
    images: [OG_IMAGE],
  },
}

const CRUMBS: readonly Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Plan a trip', path: '/plan' },
]

export default function PlanPage() {
  const today = toISODate(renderDate())

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <Container size="lg">
        <div className="page-head">
          <Breadcrumbs crumbs={CRUMBS} />
          <Heading level={1} size="2xl" style={{ marginTop: 'var(--vk-space-4)' }}>
            Plan a trip
          </Heading>
          <Text tone="muted" size="lg" style={{ marginTop: 'var(--vk-space-3)' }}>
            Three constraints — what you are after, what you want to spend, and when you
            can go. We check them against all six itineraries and rank what actually
            fits. No account, no email, and nothing is sent anywhere.
          </Text>
        </div>
      </Container>

      <Section size="lg" padding="md">
        <PlanBuilder today={today} />
      </Section>

      <Section size="lg" padding="lg" background="muted">
        <Section.Header
          eyebrow="How the matching works"
          title="Deliberately simple, and it says so"
          headingLevel={2}
          description={`Every trip is tagged with the subset of ${INTERESTS.join(', ')} it genuinely covers. A trip is offered when it is inside your budget, has a departure inside your window, and covers at least one interest you asked for — then ranked by how many it covers. That is all it does. It is 40 lines of ordinary array work against the same catalogue the rest of the site reads, which is why it can never suggest a trip that does not exist.`}
        />
      </Section>
    </>
  )
}
