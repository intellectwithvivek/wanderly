/**
 * FAQ copy, as plain strings.
 *
 * Deliberately not JSX: the same text has to appear inside the visible `FAQ`
 * component *and* inside the FAQPage JSON-LD. Storing it once as a string is what
 * guarantees the two agree — and a rich-results answer that does not match the
 * page is exactly the mismatch Google penalises.
 */

import type { Trip } from '@/data/trips'

export interface Qa {
  id: string
  question: string
  answer: string
}

export const siteFaq: readonly Qa[] = [
  {
    id: 'flights',
    question: 'Are flights included in the price?',
    answer:
      'No. Every price on this site is the land price — accommodation, guides, transport, entries and the meals listed on each itinerary. International flights are excluded on purpose: travellers join us from four continents, and quoting one fare would make the price wrong for almost everybody. We will happily hold a departure while you book yours, and we tell you which airport and which arrival window works.',
  },
  {
    id: 'customise',
    question: 'Can I customize an itinerary?',
    answer:
      'Yes, within reason. Small changes — an extra night at the start, a different room grade, skipping a hard walking day — cost nothing but an email. Larger reshapes turn it into a private trip, which we run for groups of four or more at roughly 20% above the shared price. What we will not do is bolt on a destination that breaks the acclimatisation or travel logic of the route, and on Ladakh in particular we will say no to compressing the first three days.',
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer:
      'Free cancellation for 14 days after booking, with the deposit refunded in full. After that: cancel more than 60 days before departure and you lose the 20% deposit only; between 60 and 30 days, 50% of the trip price; inside 30 days, the full amount. If we cancel a departure — too few travellers, or a route genuinely closed — you choose between a full refund and a transfer to any other date.',
  },
  {
    id: 'best-time-bali',
    question: 'When is the best time to visit Bali?',
    answer:
      'May to September. The climate charts on the Bali trip page show why: rainfall drops from about 345 mm in January to roughly 30 mm in August, while the average daily high barely moves off 30–32 °C all year. Bali is not a question of temperature but of water — the wet season is what changes the trip, not the heat. The terraces are still green through May and June from the rain that has just stopped, which is the reason we prefer those two months over August.',
  },
  {
    id: 'group-size',
    question: 'How big are the groups?',
    answer:
      'Between six and twelve travellers, depending on the trip, and the cap is a hard one. It is set by what a single guide can hold a conversation with and by what a family-run guesthouse can actually seat — not by the size of a coach.',
  },
  {
    id: 'solo',
    question: 'Do you charge a single supplement?',
    answer:
      'Only if you want a room to yourself, in which case it is 25–35% of the trip price depending on the destination. Travelling solo and happy to share, we pair you with someone of the same gender at no extra cost, and about half of every group is travelling alone.',
  },
]

/** Per-destination questions, generated from the trip's own data so they cannot drift. */
export function tripFaq(trip: Trip): readonly Qa[] {
  return [
    {
      id: 'best-time',
      question: `When is the best time to visit ${trip.name}?`,
      answer: `${trip.bestMonths}. ${trip.verdict} The two charts in the "best time to visit" block above plot the average daily high and the average monthly rainfall for all twelve months, so you can judge it against your own tolerance for heat and rain rather than taking our word for it.`,
    },
    {
      id: 'difficulty',
      question: `How hard is the ${trip.name} trip?`,
      answer: `We rate it ${trip.difficulty.toLowerCase()}. It runs ${trip.days} days with a group of ${trip.groupSize}, and the day-by-day itinerary above says exactly what each day asks of you. If a particular day looks like too much, say so when you book — sitting one out is normal and costs nothing.`,
    },
    {
      id: 'included',
      question: `What is included in the ${trip.name} price?`,
      answer: `${trip.includes.slice(0, 3).join('; ')} — and more; the full list is in the inclusions above. Flights are not included.`,
    },
    {
      id: 'cancellation',
      question: 'What is the cancellation policy?',
      answer: siteFaq.find((item) => item.id === 'cancellation')!.answer,
    },
  ]
}

/** FAQPage structured data from the same strings the page renders. */
export function faqPageJsonLd(items: readonly Qa[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
