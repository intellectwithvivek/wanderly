'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card,
  Combobox,
  DatePicker,
  Field,
  Select,
  toISODate,
  useToast,
} from '@the_viveksingh/vivek-ui'

import { trips } from '@/data/trips'

const DESTINATIONS = trips.map((trip) => ({
  value: trip.slug,
  label: `${trip.name}, ${trip.country}`,
}))

const TRAVELLERS = [
  { value: '1', label: '1 traveller' },
  { value: '2', label: '2 travellers' },
  { value: '3', label: '3 travellers' },
  { value: '4', label: '4 travellers' },
  { value: '6', label: '5–6 travellers' },
  { value: '8', label: '7 or more' },
]

/**
 * The search card overlapping the bottom of the hero.
 *
 * `today` arrives from the server as an ISO string rather than being read from
 * the clock here: a `new Date()` during render would give the server and the
 * browser two different answers, and the fix for a hydration mismatch is always
 * to stop reading the clock, not to suppress the warning.
 */
export function HeroSearch({ today }: { today: string }) {
  const router = useRouter()
  const { toast } = useToast()

  const [destination, setDestination] = useState<string | null>(null)
  const [departure, setDeparture] = useState<Date | null>(null)
  const [travellers, setTravellers] = useState('2')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // A chosen destination goes straight to its itinerary — the trip page has its
    // own booking rail, so passing the search along as query params would only put
    // state in the URL that nothing reads.
    if (destination) {
      const trip = trips.find((item) => item.slug === destination)
      toast({
        tone: 'success',
        title: `${trip?.name} it is`,
        description: `Opening the ${trip?.days}-day itinerary for ${travellers} travelling.`,
      })
      router.push(`/destinations/${destination}`)
      return
    }

    const params = new URLSearchParams({ travellers })
    // `toISODate`, not `toISOString().slice(0, 10)` — the latter converts to UTC
    // first, so west of Greenwich it prints yesterday for most of the day.
    if (departure) params.set('from', toISODate(departure))

    toast({
      tone: 'info',
      title: 'Showing all six trips',
      description: 'Pick a destination to jump straight to its itinerary.',
    })
    router.push(`/destinations?${params}`)
  }

  return (
    <Card variant="elevated" padding="lg" className="search-card">
      <form onSubmit={handleSubmit} className="search-grid">
        <Field label="Where to?">
          <Combobox
            options={DESTINATIONS}
            value={destination}
            onValueChange={setDestination}
            placeholder="Anywhere — start typing"
            emptyState="We do not run that one yet"
          />
        </Field>

        <Field label="Departing">
          <DatePicker
            value={departure}
            onValueChange={setDeparture}
            min={new Date(today)}
            placeholder="YYYY-MM-DD"
          />
        </Field>

        <Field label="Travellers">
          <Select
            options={TRAVELLERS}
            value={travellers}
            onChange={(event) => setTravellers(event.target.value)}
          />
        </Field>

        <Button type="submit" size="lg">
          Find trips
        </Button>
      </form>
    </Card>
  )
}
