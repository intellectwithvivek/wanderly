'use client'

import { useSearchParams } from 'next/navigation'
import { Alert } from '@the_viveksingh/vivek-ui'

/**
 * Echoes the hero search back on /destinations.
 *
 * Reading the query string on the *client* rather than through the page's
 * `searchParams` prop is what keeps this route statically prerendered. The server
 * prop is a request-time API and would opt the whole route into rendering on
 * demand — which also costs the route its `next/link` prefetch. `useSearchParams`
 * renders nothing during the prerender and fills in on hydration, so the route
 * stays static and only this strip is late.
 *
 * It needs a Suspense boundary above it; the page provides one.
 */
export function SearchEcho() {
  const params = useSearchParams()
  const travellers = params.get('travellers')
  const from = params.get('from')

  if (!travellers && !from) return null

  const count = Number(travellers)
  const parts = [
    Number.isFinite(count) && count > 0
      ? `${count} ${count === 1 ? 'traveller' : 'travellers'}`
      : null,
    from ? `departing on or after ${from}` : null,
  ].filter(Boolean)

  return (
    <Alert
      tone="info"
      title="Carrying your search across"
      style={{ marginBottom: 'var(--vk-space-8)' }}
    >
      You asked about {parts.join(', ')}. Every trip below runs for groups of six to
      twelve — open any of them and the booking rail will only offer dates the trip
      actually departs on.
    </Alert>
  )
}
