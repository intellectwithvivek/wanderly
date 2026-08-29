'use client'

import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  DatePicker,
  EmptyState,
  Field,
  Grid,
  Heading,
  Slider,
  TagInput,
  Text,
  formatDate,
  parseISODate,
  useToast,
} from '@the_viveksingh/vivek-ui'

import { TicketCard } from '@/components/ticket-card'
import { INTERESTS, formatPrice, trips, type Interest, type Trip } from '@/data/trips'

const BUDGET_MIN = 1500
const BUDGET_MAX = 4000

interface Match {
  trip: Trip
  /** How many of the chosen interests this trip covers. Drives the ordering. */
  hits: number
  /** The first departure inside the requested window, if any. */
  departure: Date | null
}

/**
 * The /plan toy: interests, a budget ceiling and a date window in, ranked trips out.
 *
 * Filtering runs against the same `trips` array the rest of the site reads, so a
 * suggestion can never point at a trip that does not exist. Results are computed
 * on submit rather than on every keystroke — the button is the promise the page
 * makes, and honouring it is clearer than results that shift while you type.
 */
export function PlanBuilder({ today }: { today: string }) {
  const { toast } = useToast()

  const [interests, setInterests] = useState<string[]>(['food', 'trek'])
  const [budget, setBudget] = useState(3200)
  const [from, setFrom] = useState<Date | null>(null)
  const [until, setUntil] = useState<Date | null>(null)
  const [results, setResults] = useState<Match[] | null>(null)

  function build() {
    const chosen = interests.filter((tag): tag is Interest =>
      (INTERESTS as readonly string[]).includes(tag),
    )

    const matches = trips
      .map<Match>((trip) => {
        const hits = chosen.filter((tag) => trip.interests.includes(tag)).length

        const departure =
          trip.departures
            .map((iso) => parseISODate(iso))
            .find((date): date is Date => {
              if (!date) return false
              if (from && date < from) return false
              if (until && date > until) return false
              return true
            }) ?? null

        return { trip, hits, departure }
      })
      .filter((match) => {
        if (match.trip.priceFrom > budget) return false
        if (chosen.length > 0 && match.hits === 0) return false
        if ((from || until) && !match.departure) return false
        return true
      })
      .sort((a, b) => b.hits - a.hits || a.trip.priceFrom - b.trip.priceFrom)

    setResults(matches)
    toast({
      tone: matches.length ? 'success' : 'warning',
      title: matches.length
        ? `${matches.length} ${matches.length === 1 ? 'trip' : 'trips'} fit`
        : 'Nothing fits those constraints',
      description: matches.length
        ? 'Ranked by how many of your interests each one covers.'
        : 'Try lifting the budget or widening the dates.',
    })
  }

  function reset() {
    setInterests([])
    setBudget(BUDGET_MAX)
    setFrom(null)
    setUntil(null)
    setResults(null)
  }

  const unused = INTERESTS.filter((interest) => !interests.includes(interest))

  return (
    <>
      <Card variant="outline" padding="lg">
        <Card.Body>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            <Field
              label="What are you after?"
              help="beach, trek, food, culture or snow — add as many as you like"
            >
              <TagInput
                value={interests}
                onValueChange={setInterests}
                max={5}
                placeholder="Add an interest and press Enter"
                validate={(tag) =>
                  (INTERESTS as readonly string[]).includes(tag.toLowerCase())
                    ? true
                    : `We tag trips by ${INTERESTS.join(', ')} — "${tag}" is not one of them.`
                }
                onReject={(tag, reason) => {
                  if (reason === 'max') {
                    toast({ tone: 'info', title: 'Five interests is plenty' })
                  }
                }}
              />
            </Field>

            <Field
              label={`Budget up to ${formatPrice(budget)} per person`}
              help="Land price, excluding flights"
            >
              <Slider
                value={budget}
                onValueChange={setBudget}
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={50}
                showValue
                formatValue={(value) => formatPrice(value)}
                marks={[
                  { value: BUDGET_MIN, label: '$1.5k' },
                  { value: 2750, label: '$2.75k' },
                  { value: BUDGET_MAX, label: '$4k+' },
                ]}
              />
            </Field>

            <Field label="Earliest departure">
              <DatePicker value={from} onValueChange={setFrom} min={new Date(today)} />
            </Field>

            <Field label="Latest departure">
              <DatePicker
                value={until}
                onValueChange={setUntil}
                min={from ?? new Date(today)}
              />
            </Field>
          </Grid>

          {unused.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--vk-space-2)',
                alignItems: 'center',
                marginTop: 'var(--vk-space-5)',
              }}
            >
              <Text as="span" size="sm" tone="muted">
                Quick add:
              </Text>
              {unused.map((interest) => (
                <Button
                  key={interest}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setInterests((current) => [...current, interest])}
                >
                  + {interest}
                </Button>
              ))}
            </div>
          ) : null}
        </Card.Body>

        <Card.Footer>
          <div style={{ display: 'flex', gap: 'var(--vk-space-3)', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={build}>
              Build my trip
            </Button>
            <Button size="lg" variant="ghost" onClick={reset}>
              Clear
            </Button>
          </div>
        </Card.Footer>
      </Card>

      {results === null ? null : results.length === 0 ? (
        <EmptyState
          icon={<span style={{ fontSize: '2.25rem' }}>🧭</span>}
          title="No trip fits that combination"
          description="Six trips is a small catalogue on purpose. Loosen one constraint and we will almost certainly have something."
          actions={
            <>
              <Button onClick={() => setBudget(BUDGET_MAX)}>Lift the budget</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFrom(null)
                  setUntil(null)
                }}
              >
                Clear the dates
              </Button>
            </>
          }
          style={{ marginTop: 'var(--vk-space-10)' }}
        />
      ) : (
        <section aria-labelledby="suggestions" style={{ marginTop: 'var(--vk-space-12)' }}>
          <Heading id="suggestions" level={2} size="lg">
            {results.length} {results.length === 1 ? 'trip' : 'trips'} for you
          </Heading>
          <Text tone="muted" style={{ marginTop: '0.35rem' }}>
            Ranked by how many of your interests each trip covers.
          </Text>

          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} style={{ marginTop: 'var(--vk-space-6)' }}>
            {results.map(({ trip, hits, departure }) => (
              <div
                key={trip.slug}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--vk-space-3)',
                }}
              >
                <TicketCard trip={trip} headingLevel={3} />
                <Text as="p" size="sm" tone="muted">
                  {hits > 0 ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        flexWrap: 'wrap',
                        gap: '0.35rem',
                        alignItems: 'center',
                      }}
                    >
                      Matches
                      {trip.interests
                        .filter((interest) => interests.includes(interest))
                        .map((interest) => (
                          <Badge key={interest} size="sm" variant="soft" tone="success">
                            {interest}
                          </Badge>
                        ))}
                    </span>
                  ) : (
                    'Within budget'
                  )}
                  {departure ? (
                    <> · next departure {formatDate(departure, 'en-GB', { dateStyle: 'medium' })}</>
                  ) : null}
                </Text>
              </div>
            ))}
          </Grid>
        </section>
      )}
    </>
  )
}
