'use client'

import { Newsletter, useToast } from '@the_viveksingh/vivek-ui'

/**
 * The mailing-list signup.
 *
 * `onSubscribe` returns a promise, which is what makes `Newsletter` disable the
 * button until it settles — that is the mechanism that prevents a double
 * submission, rather than hoping nobody clicks twice. Swap the timeout for your
 * own API call and everything else keeps working.
 */
export function NewsletterBlock() {
  const { toast } = useToast()

  async function subscribe(email: string) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    toast({
      tone: 'success',
      title: 'You are on the list',
      description: `We will send the next itinerary release to ${email}. One email a month, never more.`,
    })
  }

  return (
    <Newsletter
      title="New itineraries, once a month"
      description="Where we are opening next, which departures are nearly full, and the honest month-by-month verdict on each one. No offers you did not ask for."
      placeholder="you@example.com"
      buttonLabel="Keep me posted"
      onSubscribe={subscribe}
      successMessage="Thanks — check your inbox for a confirmation."
      note="One email a month. Unsubscribe in one click, and we do not sell the list."
      layout="inline"
    />
  )
}
