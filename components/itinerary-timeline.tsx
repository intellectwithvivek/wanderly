import { Badge, Text, Timeline } from '@the_viveksingh/vivek-ui'

import type { Trip } from '@/data/trips'

/**
 * The day-by-day itinerary — the page's centrepiece.
 *
 * `Timeline` renders an ordered list, so the sequence is structure rather than
 * decoration. Two deliberate overrides:
 *
 * - `icon` replaces the status glyph with the day number, which is the thing a
 *   reader is actually scanning for.
 * - `statusLabel` replaces the announced word, because "complete" is nonsense for
 *   a trip that has not happened yet. A screen reader hears "Day 3 of 9".
 */
export function ItineraryTimeline({ trip }: { trip: Trip }) {
  return (
    <Timeline align="start">
      {trip.itinerary.map((day) => (
        <Timeline.Item
          key={day.day}
          status="complete"
          statusLabel={`Day ${day.day} of ${trip.days}`}
          icon={
            <span style={{ fontWeight: 'var(--vk-weight-bold)', fontSize: '0.8rem' }}>
              {day.day}
            </span>
          }
          timestamp={<span className="eyebrow">Day {day.day}</span>}
          title={day.title}
          headingLevel={3}
          description={
            <>
              <Text tone="muted" size="sm">
                {day.description}
              </Text>
              <span
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--vk-space-2)',
                  marginTop: 'var(--vk-space-3)',
                }}
              >
                <Badge variant="outline" tone="neutral" size="sm">
                  {day.stay ? `Night: ${day.stay}` : 'Depart today'}
                </Badge>
                <Badge variant="soft" tone="primary" size="sm">
                  Meals: {day.meals}
                </Badge>
              </span>
            </>
          }
        />
      ))}
    </Timeline>
  )
}
