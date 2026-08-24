'use client'

import { useMemo, useState } from 'react'
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Field,
  Heading,
  Modal,
  Select,
  Stack,
  Text,
  formatDate,
  parseISODate,
  toISODate,
  useToast,
} from '@the_viveksingh/vivek-ui'

import { formatPrice, type Trip } from '@/data/trips'

const TRAVELLERS = ['1', '2', '3', '4', '5', '6'].map((count) => ({
  value: count,
  label: count === '1' ? '1 traveller' : `${count} travellers`,
}))

/**
 * The sticky booking rail.
 *
 * The DatePicker only accepts dates the trip actually runs on — `disabledDates`
 * takes a predicate, so the set of real departures is the source of truth rather
 * than a second list that can drift from `trips.ts`.
 *
 * "Reserve" opens a summary the traveller confirms, because a booking that
 * happens on the first click is a booking people undo.
 */
export function BookingCard({ trip }: { trip: Trip }) {
  const { toast } = useToast()

  const departureDates = useMemo(
    () =>
      trip.departures
        .map((iso) => parseISODate(iso))
        .filter((date): date is Date => date !== null),
    [trip.departures],
  )

  const [departure, setDeparture] = useState<Date | null>(departureDates[0] ?? null)
  const [travellers, setTravellers] = useState('2')
  const [open, setOpen] = useState(false)

  const people = Number(travellers)
  const total = trip.priceFrom * people

  const allowed = useMemo(
    () => new Set(departureDates.map((date) => toISODate(date))),
    [departureDates],
  )

  function confirm() {
    setOpen(false)
    toast({
      tone: 'success',
      title: 'Seats held for 48 hours',
      description: `${trip.name}, ${
        departure ? formatDate(departure, 'en-GB', { dateStyle: 'long' }) : 'dates to confirm'
      }, ${people} ${people === 1 ? 'traveller' : 'travellers'}. A summary is on its way by email.`,
      duration: 9000,
    })
  }

  return (
    <>
      <Card variant="elevated" padding="lg" className="booking-rail">
        <Card.Header>
          <span className="eyebrow">From, per person</span>
          <Heading level={2} size="xl" style={{ marginTop: '0.15rem' }}>
            {formatPrice(trip.priceFrom)}
            {trip.priceWas ? (
              <Text as="s" size="md" tone="muted" style={{ marginLeft: '0.5rem' }}>
                {formatPrice(trip.priceWas)}
              </Text>
            ) : null}
          </Heading>
          <Text tone="muted" size="sm">
            {trip.days} days · {trip.nights} nights · group of {trip.groupSize}
          </Text>
        </Card.Header>

        <Card.Body>
          {/* `Card.Body` is `flex: 1; min-width: 0` and nothing else — it has no
              gap of its own, so the stacking is explicit. Without this the fields
              sit flush and the Divider disappears into its neighbours. */}
          <Stack gap={4}>
            <Field
              label="Departure"
              help={`${trip.departures.length} dates in the next 12 months`}
            >
              <DatePicker
                value={departure}
                onValueChange={setDeparture}
                disabledDates={(date) => !allowed.has(toISODate(date))}
                min={departureDates[0] ?? null}
                max={departureDates[departureDates.length - 1] ?? null}
              />
            </Field>

            <Field label="Travellers">
              <Select
                options={TRAVELLERS}
                value={travellers}
                onChange={(event) => setTravellers(event.target.value)}
              />
            </Field>

            <Divider />

            <div>
              <Text as="div" size="sm">
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    {formatPrice(trip.priceFrom)} × {people}
                  </span>
                  <strong>{formatPrice(total)}</strong>
                </span>
              </Text>
              <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-2)' }}>
                Deposit today is 20%. The balance is due 60 days before departure.
              </Text>
            </div>
          </Stack>
        </Card.Body>

        <Card.Footer>
          <Stack gap={2} style={{ inlineSize: '100%' }}>
            <Button fullWidth size="lg" onClick={() => setOpen(true)}>
              Reserve
            </Button>
            <Text tone="muted" size="sm" align="center">
              Free to cancel for 14 days.
            </Text>
          </Stack>
        </Card.Footer>
      </Card>

      <Modal
        open={open}
        onOpenChange={setOpen}
        size="md"
        title={`Reserve ${trip.name}`}
      >
        <Modal.Body>
          <Text tone="muted" size="sm" style={{ marginBottom: 'var(--vk-space-4)' }}>
            Nothing is charged yet — this holds your seats for 48 hours.
          </Text>
          <dl style={{ display: 'grid', gap: 'var(--vk-space-3)', margin: 0 }}>
            <Row label="Trip" value={trip.title} />
            <Row
              label="Departure"
              value={
                departure
                  ? formatDate(departure, 'en-GB', { dateStyle: 'full' })
                  : 'Not chosen yet'
              }
            />
            <Row label="Travellers" value={`${people}`} />
            <Row label="Duration" value={`${trip.days} days, ${trip.nights} nights`} />
            <Row
              label="Total"
              value={`${formatPrice(total)} · deposit ${formatPrice(Math.round(total * 0.2))}`}
            />
          </dl>
          <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-4)' }}>
            International flights are not included. See the exclusions above for the full list.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Back
          </Button>
          <Button onClick={confirm} disabled={!departure}>
            Confirm and hold
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--vk-space-4)' }}>
      <dt>
        <Text as="span" size="sm" tone="muted">
          {label}
        </Text>
      </dt>
      <dd style={{ margin: 0, textAlign: 'end' }}>
        <Text as="span" size="sm" weight="medium">
          {value}
        </Text>
      </dd>
    </div>
  )
}
