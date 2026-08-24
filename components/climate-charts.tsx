import { Badge, Card, Heading, Text } from '@the_viveksingh/vivek-ui'
import { BarChart, LineChart } from '@the_viveksingh/vivek-ui/charts'

import { MONTHS, type Trip } from '@/data/trips'

/**
 * "Best time to visit" — the block that makes this template more than a brochure.
 *
 * Two charts from the trip's own climate arrays, and a verdict sentence naming
 * the months. Both render as inline SVG on the server: there is no chart library
 * here, no canvas, and nothing measured in the browser, so the block is complete
 * in the first HTML response.
 *
 * Colour never carries the meaning on its own — the temperature line is warm and
 * the rainfall bars are cool, both from VivekUI's colourblind-safe chart ramp,
 * and each chart also ships a visually hidden table of the real numbers.
 */
export function ClimateCharts({
  trip,
  headingLevel = 2,
}: {
  trip: Trip
  headingLevel?: 2 | 3
}) {
  // One level below the block's own heading, so the document outline never jumps
  // from h2 straight to h4.
  const chartHeading = headingLevel === 2 ? 'h3' : 'h4'

  const temperature = MONTHS.map((month, index) => ({
    x: month,
    y: trip.climate.highC[index],
  }))
  const rainfall = MONTHS.map((month, index) => ({
    x: month,
    y: trip.climate.rainMm[index],
  }))

  // Stated in words under each title, because a line chart's value axis does not
  // start at zero — that is correct for temperature, but it means a place whose
  // high barely moves all year (Bali: 30–32 °C) still draws a dramatic-looking
  // curve. The range removes the ambiguity without touching the chart.
  const tempRange = `${Math.min(...trip.climate.highC)}–${Math.max(...trip.climate.highC)} °C across the year`
  const rainRange = `${Math.min(...trip.climate.rainMm)}–${Math.max(...trip.climate.rainMm)} mm a month`

  return (
    <Card variant="outline" padding="lg" id="best-time">
      <Card.Header>
        <span className="eyebrow">Best time to visit</span>
        <Heading level={headingLevel} size="lg" style={{ marginTop: '0.35rem' }}>
          {trip.name}, month by month
        </Heading>
        <Text tone="muted" size="sm" style={{ marginTop: '0.35rem' }}>
          Average daily high and average monthly rainfall. Our own recommendation is{' '}
          <strong>{trip.bestMonths}</strong>.
        </Text>
      </Card.Header>

      <Card.Body>
        <div className="chart-pair">
          <div className="chart-frame">
            <Text as={chartHeading} size="sm" weight="semibold">
              Average high temperature
            </Text>
            <Text tone="muted" size="sm" style={{ marginBottom: 'var(--vk-space-3)' }}>
              {tempRange}
            </Text>
            <LineChart
              series={[
                {
                  name: 'Average high (°C)',
                  data: temperature,
                  color: 'var(--vk-chart-2)',
                  dash: '',
                },
              ]}
              height={230}
              curve="smooth"
              strokeWidth={2.5}
              showGrid
              showAxes
              tooltip
              xLabel="Month"
              yLabel="°C"
              formatValue={(value) => `${value}°C`}
              title={`Average daily high temperature in ${trip.name}, by month`}
              description={`Monthly average high in degrees Celsius across the year in ${trip.name}, ${trip.country}.`}
            />
          </div>

          <div className="chart-frame">
            <Text as={chartHeading} size="sm" weight="semibold">
              Average rainfall
            </Text>
            <Text tone="muted" size="sm" style={{ marginBottom: 'var(--vk-space-3)' }}>
              {rainRange}
            </Text>
            <BarChart
              series={[{ name: 'Rainfall (mm)', data: rainfall }]}
              height={230}
              showGrid
              showAxes
              tooltip
              barRadius={3}
              categoryPadding={0.3}
              xLabel="Month"
              yLabel="mm"
              formatValue={(value) => `${value} mm`}
              title={`Average monthly rainfall in ${trip.name}, in millimetres`}
              description={`Monthly rainfall total in millimetres across the year in ${trip.name}, ${trip.country}.`}
            />
          </div>
        </div>

        <p className="verdict">
          <Badge tone="primary" variant="solid" size="sm" pill>
            Verdict
          </Badge>
          <span>{trip.verdict}</span>
        </p>
      </Card.Body>

      <Card.Footer>
        <Text tone="muted" size="sm">
          Both charts are VivekUI components — <code>LineChart</code> and{' '}
          <code>BarChart</code> — rendered as inline SVG on the server. No chart
          library is installed in this project.
        </Text>
      </Card.Footer>
    </Card>
  )
}
