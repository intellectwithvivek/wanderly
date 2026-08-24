import { cache } from 'react'

/**
 * The wall clock, read exactly once per render pass.
 *
 * Reading `Date.now()` inline in a component is an impure call: two renders in the
 * same pass could disagree, which for a countdown means the server HTML and the
 * first client render disagree too. `cache` from React memoises the read for the
 * lifetime of the render, so every component in one pass sees the same instant.
 *
 * On a statically generated route this is the build (or revalidation) time, which
 * is exactly what the pages want — the homepage revalidates hourly so the offer
 * countdowns never drift far from real time.
 */
export const renderTime = cache(() => Date.now())

/** The same instant, as a `Date`. */
export const renderDate = () => new Date(renderTime())
