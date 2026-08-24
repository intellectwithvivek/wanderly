/**
 * The whole product catalogue. Six curated trips, typed, with everything the routes
 * need: pricing, itineraries, inclusions, monthly climate arrays and a map anchor.
 *
 * Swap the objects and the site is yours — nothing is hardcoded in a component.
 */

/** The five things people actually search a tour catalogue by. Drives /plan. */
export type Interest = 'beach' | 'trek' | 'food' | 'culture' | 'snow'

export const INTERESTS: readonly Interest[] = ['beach', 'trek', 'food', 'culture', 'snow']

export type Difficulty = 'Easy' | 'Moderate' | 'Challenging'

export interface ItineraryDay {
  day: number
  title: string
  description: string
  /** Where the group sleeps. `null` on the final travel day. */
  stay: string | null
  /** Breakfast / lunch / dinner shorthand, e.g. `'B · D'`. */
  meals: string
}

export interface Climate {
  /** Average daily high, °C, Jan → Dec. Exactly 12 entries. */
  highC: readonly number[]
  /** Average monthly rainfall, mm, Jan → Dec. Exactly 12 entries. */
  rainMm: readonly number[]
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface Trip {
  slug: string
  /** Short display name — "Bali". Used on the boarding-pass stub. */
  name: string
  /** Full trip title — the h1 on the destination page. */
  title: string
  country: string
  /** Three-letter code printed on the ticket stub. */
  code: string
  tagline: string
  /** Two or three sentences. The meta description falls back to this. */
  summary: string
  hero: GalleryImage
  gallery: readonly GalleryImage[]
  priceFrom: number
  /** What the price was before the current deal, when there is one. */
  priceWas?: number
  currency: 'USD'
  days: number
  nights: number
  groupSize: string
  difficulty: Difficulty
  interests: readonly Interest[]
  /** Free-text answer to "when should I go?", shown beside the charts. */
  bestMonths: string
  /** The one-line chart verdict. Always names months. */
  verdict: string
  climate: Climate
  itinerary: readonly ItineraryDay[]
  includes: readonly string[]
  excludes: readonly string[]
  map: { query: string; lat: number; lon: number; zoom: number }
  rating: number
  reviewCount: number
  /** ISO dates the trip actually runs. Feeds the departure Select. */
  departures: readonly string[]
  /** Set on the trips currently on offer. Drives the deals carousel. */
  deal?: {
    label: string
    /** Percent off `priceWas`. */
    off: number
    /** Hours from render until the offer lapses — keeps the demo countdown live. */
    endsInHours: number
    copy: string
  }
}

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

/** Where every trip departs from. Printed on the left of the ticket stub. */
export const ORIGIN = 'LIS'

export const trips: readonly Trip[] = [
  /* ---------------------------------------------------------------- Bali */
  {
    slug: 'bali',
    name: 'Bali',
    title: 'Bali: Rice Terraces, Reef and Ritual',
    country: 'Indonesia',
    code: 'DPS',
    tagline: 'Nine days between the terraces and the reef',
    summary:
      'Ubud for the temples and the terrace walks, Sidemen for the quiet, Amed for the reef. We stay in family-run guesthouses, eat where the drivers eat, and start the Batur climb at two in the morning so you are on the rim before the light arrives.',
    hero: {
      src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47',
      alt: 'Terraced rice paddies stepping down a valley in Bali at first light',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1559628233-eb1b1a45564b',
        alt: 'Palm-lined rice terrace path near Tegallalang, Bali',
      },
      {
        src: 'https://images.unsplash.com/photo-1576475706812-822620fc23ba',
        alt: 'Stone temple gate framing green hills in central Bali',
      },
      {
        src: 'https://images.unsplash.com/photo-1682406187130-84561b4e0e78',
        alt: 'Fishing boats drawn up on black volcanic sand at Amed',
      },
      {
        src: 'https://images.unsplash.com/photo-1715755455989-76413081ad10',
        alt: 'Mist rising off the rice fields below Mount Batur at dawn',
      },
    ],
    priceFrom: 1690,
    priceWas: 1890,
    currency: 'USD',
    days: 9,
    nights: 8,
    groupSize: '8–12',
    difficulty: 'Moderate',
    interests: ['beach', 'trek', 'food', 'culture'],
    bestMonths: 'May to September',
    verdict:
      'Sweet spot: May–September — barely any rain, the terraces are still green from the wet season, and the reef at Amed is glass-flat.',
    climate: {
      highC: [31, 31, 31, 32, 31, 30, 30, 30, 31, 31, 31, 31],
      rainMm: [345, 275, 225, 80, 75, 60, 55, 30, 50, 70, 130, 270],
    },
    itinerary: [
      {
        day: 1,
        title: 'Land in Denpasar, drive north to Ubud',
        description:
          'Airport pickup and an hour and a half north through Batubulan. Nothing scheduled after that beyond dinner on the guesthouse terrace — you will have crossed too many time zones to want more.',
        stay: 'Guesthouse in Penestanan, Ubud',
        meals: 'D',
      },
      {
        day: 2,
        title: 'Campuhan ridge, then the market before it turns touristy',
        description:
          'Out at six for the Campuhan ridge walk while it is still cool, back through Ubud market at the hour the restaurant buyers use it. Afternoon at Goa Gajah and Yeh Pulu, which most itineraries skip.',
        stay: 'Guesthouse in Penestanan, Ubud',
        meals: 'B · L',
      },
      {
        day: 3,
        title: 'Cooking with Ibu Wayan',
        description:
          'A full day in one kitchen: market at seven, then base gede from scratch, lawar, sate lilit, and the long slow business of betutu. You will not want dinner.',
        stay: 'Guesthouse in Penestanan, Ubud',
        meals: 'B · L',
      },
      {
        day: 4,
        title: 'Jatiluwih terraces and the road to Sidemen',
        description:
          'The UNESCO-listed terraces at Jatiluwih on the way through, then east into the Sidemen valley where the tour buses do not go. Weaving workshop in the village if the light holds.',
        stay: 'Valley lodge, Sidemen',
        meals: 'B · D',
      },
      {
        day: 5,
        title: 'Mount Batur, 02:00 start',
        description:
          'Up at half one, on the trail by three, on the crater rim for sunrise over Abang with Rinjani beyond it. Two hours up, ninety minutes down, breakfast cooked in a steam vent. Back in the valley by ten and the rest of the day is yours.',
        stay: 'Valley lodge, Sidemen',
        meals: 'B · L',
      },
      {
        day: 6,
        title: 'Down to the coast at Amed',
        description:
          'Tirta Gangga water palace on the way, then the black-sand coast. Afternoon check dive or a long snorkel over the Japanese wreck, depending on what you are certified for.',
        stay: 'Beachfront bungalows, Amed',
        meals: 'B · D',
      },
      {
        day: 7,
        title: 'Reef day',
        description:
          'Two boat dives at Jemeluk and the drop-off, or a jukung out to the coral garden with a mask and nothing else. Grilled fish on the sand for lunch, which is the best meal of the trip and nobody expects it.',
        stay: 'Beachfront bungalows, Amed',
        meals: 'B · L',
      },
      {
        day: 8,
        title: 'Lempuyang, then west',
        description:
          'Early at Pura Lempuyang before the queue for the gate forms, then back across the island to Sanur for the last night and a proper dinner as a group.',
        stay: 'Hotel in Sanur',
        meals: 'B · D',
      },
      {
        day: 9,
        title: 'Fly out',
        description:
          'Twenty minutes to the airport. Late flight? Leave your bag with us and take the morning on the beach.',
        stay: null,
        meals: 'B',
      },
    ],
    includes: [
      '8 nights in family-run guesthouses and lodges, twin share',
      'All ground transport in an air-conditioned minibus with driver',
      'Guide with you for all 9 days, plus local guides at each site',
      'Cooking class, weaving workshop and every temple entry',
      'Mount Batur permit, guide and headtorch',
      'Breakfast daily, plus 6 lunches and 4 dinners',
      'Airport transfers on both days',
    ],
    excludes: [
      'International flights to and from Denpasar (DPS)',
      'Indonesia visa on arrival, currently IDR 500,000',
      'Travel insurance — required, and we check it',
      'Dive certification and equipment hire at Amed',
      'Meals not listed, and all drinks',
      'Tips for drivers and local guides',
    ],
    map: { query: 'Ubud, Bali, Indonesia', lat: -8.5069, lon: 115.2625, zoom: 10 },
    rating: 4.9,
    reviewCount: 214,
    departures: ['2026-09-12', '2026-10-03', '2026-10-24', '2027-05-08', '2027-06-05'],
    deal: {
      label: 'Shoulder-season release',
      off: 11,
      endsInHours: 68,
      copy: 'Four seats left on the 12 September departure at the shoulder-season rate.',
    },
  },

  /* ----------------------------------------------------------- Santorini */
  {
    slug: 'santorini',
    name: 'Santorini',
    title: 'Santorini: The Caldera, Slowly',
    country: 'Greece',
    code: 'JTR',
    tagline: 'Seven days on the rim, off the cruise-ship clock',
    summary:
      'Most people get six hours on Santorini and spend four of them queuing in Oia. We give it a week: the caldera path at dawn, the assyrtiko vineyards inland, Thirassia by fishing boat, and the Akrotiri excavation with an archaeologist rather than an audio guide.',
    hero: {
      src: 'https://images.unsplash.com/photo-1720630941637-19875699aae7',
      alt: 'Blue-domed church above the Santorini caldera in late afternoon light',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1724075700355-e54bf35dc5be',
        alt: 'Whitewashed alley stepping down towards the caldera in Oia',
      },
      {
        src: 'https://images.unsplash.com/photo-1743427495409-bf19fdaa4c16',
        alt: 'Cliffside village of Imerovigli seen from the caldera path',
      },
      {
        src: 'https://images.unsplash.com/photo-1669842550664-6696b383029c',
        alt: 'Fishing boats moored in Ammoudi bay below Oia',
      },
      {
        src: 'https://images.unsplash.com/photo-1623682177466-0cb7f8ae59d3',
        alt: 'Sun setting into the Aegean beyond the caldera rim',
      },
    ],
    priceFrom: 2340,
    currency: 'USD',
    days: 7,
    nights: 6,
    groupSize: '6–10',
    difficulty: 'Easy',
    interests: ['beach', 'food', 'culture'],
    bestMonths: 'May, June, September and early October',
    verdict:
      'Sweet spot: May–June — the sea is already swimmable, rainfall is effectively nil, and the caldera path is yours before the August crowds and the 30 °C afternoons.',
    climate: {
      highC: [15, 15, 17, 20, 24, 28, 30, 30, 27, 23, 19, 16],
      rainMm: [70, 55, 40, 20, 10, 3, 1, 2, 12, 50, 75, 90],
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrive Thira, settle in Imerovigli',
        description:
          'Twenty minutes from the airport to Imerovigli, which is on the rim but not on the cruise route. Sunset from the terrace, dinner in the village.',
        stay: 'Cave house, Imerovigli',
        meals: 'D',
      },
      {
        day: 2,
        title: 'The caldera path, north',
        description:
          'Imerovigli to Oia along the rim, ten kilometres of it, starting at half six so you finish before the heat and the coaches. Swim at Ammoudi, then the long lunch you have earned at the bottom of the 300 steps.',
        stay: 'Cave house, Imerovigli',
        meals: 'B · L',
      },
      {
        day: 3,
        title: 'Akrotiri with an archaeologist',
        description:
          'The Bronze Age town under the ash roof, walked with someone who has worked the site — two hours that reframe the whole island. Afternoon at the Red Beach and Vlychada.',
        stay: 'Cave house, Imerovigli',
        meals: 'B',
      },
      {
        day: 4,
        title: 'Assyrtiko, and the vines that grow in baskets',
        description:
          'Inland to Pyrgos and the vineyards, where the vines are trained into low koulara baskets against the wind. Three estates, a barrel tasting, and tomatokeftedes at a kafenio in Emporio.',
        stay: 'Cave house, Imerovigli',
        meals: 'B · L',
      },
      {
        day: 5,
        title: 'Thirassia by fishing boat',
        description:
          'Across the caldera to the island Santorini used to be: one village, one road, no hotels to speak of. Swim off the boat at the hot springs on the way back.',
        stay: 'Cave house, Imerovigli',
        meals: 'B · L',
      },
      {
        day: 6,
        title: 'Ancient Thera and the east coast',
        description:
          'Up Mesa Vouno to the Dorian city on the ridge, with the whole island laid out either side. Afternoon free — most people sleep. Farewell dinner in Megalochori.',
        stay: 'Cave house, Imerovigli',
        meals: 'B · D',
      },
      {
        day: 7,
        title: 'Fly out',
        description:
          'Transfer to Thira for your flight, or on to the ferry port if you are carrying on through the Cyclades.',
        stay: null,
        meals: 'B',
      },
    ],
    includes: [
      '6 nights in a caldera-facing cave house, twin share',
      'Guide throughout, and a site archaeologist at Akrotiri',
      'Private fishing boat to Thirassia and the hot springs',
      'Three-estate wine tasting with the growers',
      'All site entries: Akrotiri, Ancient Thera, the museum',
      'Breakfast daily, 4 lunches, 2 dinners',
      'Airport transfers on both days',
    ],
    excludes: [
      'Flights to and from Thira (JTR)',
      'Travel insurance — required',
      'Meals not listed, and all drinks outside the tastings',
      'The cable car and donkey path in Fira',
      'Tips',
    ],
    map: { query: 'Oia, Santorini, Greece', lat: 36.4618, lon: 25.3753, zoom: 12 },
    rating: 4.8,
    reviewCount: 167,
    departures: ['2026-09-19', '2026-10-10', '2027-05-15', '2027-06-12', '2027-09-18'],
  },

  /* --------------------------------------------------------------- Kyoto */
  {
    slug: 'kyoto',
    name: 'Kyoto',
    title: 'Kyoto: Temples, Knives and the Slow Hours',
    country: 'Japan',
    code: 'KIX',
    tagline: 'Eight days of early mornings and long dinners',
    summary:
      'Kyoto rewards people who get up early and stay out late, and punishes everyone in between. We build the week around the two quiet windows: temples at opening, kaiseki at eight. Plus a day in Nara, a morning with a knife maker in Sakai, and one night in a mountain ryokan at Kurama.',
    hero: {
      src: 'https://images.unsplash.com/photo-1573047330192-4e6bb1594325',
      alt: 'Lantern-lit street of wooden machiya houses in Kyoto at dusk',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1717649389730-ba6d16053b43',
        alt: 'Vermilion torii gates climbing the hillside at Fushimi Inari',
      },
      {
        src: 'https://images.unsplash.com/photo-1732832261506-06ccc8609a6b',
        alt: 'Moss and maples in a temple garden in eastern Kyoto',
      },
      {
        src: 'https://images.unsplash.com/photo-1671941042634-ffa4a2942e7b',
        alt: 'Narrow stone lane in the Higashiyama district early in the morning',
      },
      {
        src: 'https://images.unsplash.com/photo-1671680055297-185d60542c9f',
        alt: 'Wooden temple veranda looking out over a raked gravel garden',
      },
    ],
    priceFrom: 2780,
    currency: 'USD',
    days: 8,
    nights: 7,
    groupSize: '6–10',
    difficulty: 'Easy',
    interests: ['food', 'culture'],
    bestMonths: 'Late March to April, and November',
    verdict:
      'Sweet spot: late March–April and November — 18–22 °C, half the rain of the June tsuyu, and you get either the blossom or the maples.',
    climate: {
      highC: [9, 10, 14, 20, 25, 28, 32, 34, 29, 23, 17, 12],
      rainMm: [50, 68, 113, 116, 161, 215, 221, 132, 177, 121, 71, 48],
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrive Kansai, train into Kyoto',
        description:
          'The Haruka express from KIX, seventy-five minutes. Machiya townhouse in Nishijin, then a walk to Nishiki market for whatever is still open and a first bowl of soba.',
        stay: 'Machiya townhouse, Nishijin',
        meals: 'D',
      },
      {
        day: 2,
        title: 'Higashiyama at opening',
        description:
          'Kiyomizu-dera at six, when the veranda is empty, down through Sannenzaka before the shops raise their shutters, then Kodai-ji and Chion-in. Afternoon off. Evening in Pontocho.',
        stay: 'Machiya townhouse, Nishijin',
        meals: 'B · L',
      },
      {
        day: 3,
        title: 'Arashiyama, and the temple nobody queues for',
        description:
          'First train west. The bamboo grove for twenty minutes because you have to, then Okochi Sanso and Jojakko-ji, which have the same views and none of the people. Yudofu lunch by the river.',
        stay: 'Machiya townhouse, Nishijin',
        meals: 'B · L',
      },
      {
        day: 4,
        title: 'Sakai: a morning with a knife maker',
        description:
          'An hour south to the forges that have supplied Japanese kitchens for six centuries. You will grind and sharpen a blade yourself, badly, and then watch someone do it properly in ninety seconds.',
        stay: 'Machiya townhouse, Nishijin',
        meals: 'B · L',
      },
      {
        day: 5,
        title: 'Nara, and the older capital',
        description:
          'Todai-ji and the Great Buddha, Kasuga Taisha through the lantern avenue, and Isuien garden for the borrowed-scenery lesson. Deer everywhere, and they are not tame.',
        stay: 'Machiya townhouse, Nishijin',
        meals: 'B',
      },
      {
        day: 6,
        title: 'Up to Kurama, and the ryokan night',
        description:
          'The two-carriage Eizan line into the hills, the walk over the pass from Kurama to Kibune, and then a ryokan: onsen, yukata, and a kaiseki dinner of eleven courses served in your room.',
        stay: 'Ryokan, Kurama',
        meals: 'B · D',
      },
      {
        day: 7,
        title: 'Fushimi Inari, then the last long dinner',
        description:
          'Back down early for the full Inari climb — past the tourist turnaround at the Yotsutsuji junction, where the gates thin out and it goes quiet. Farewell kaiseki in Gion.',
        stay: 'Machiya townhouse, Nishijin',
        meals: 'B · D',
      },
      {
        day: 8,
        title: 'Fly out',
        description:
          'Haruka back to Kansai. If you have a late flight, the Kyoto National Museum is ten minutes from the station and worth the detour.',
        stay: null,
        meals: 'B',
      },
    ],
    includes: [
      '6 nights in a private machiya townhouse plus 1 night in a Kurama ryokan',
      'Kaiseki dinner at the ryokan and a farewell kaiseki in Gion',
      'Knife-forging morning in Sakai, with the tool to take home',
      'All temple and garden entries, and the Nara day',
      'IC travel card loaded for the week, and all group rail',
      'Breakfast daily, 4 lunches, 3 dinners',
      'Airport transfers by express train on both days',
    ],
    excludes: [
      'Flights to and from Osaka Kansai (KIX)',
      'Travel insurance — required',
      'Meals not listed, and all drinks',
      'Bullet-train extensions to Tokyo or Hiroshima (we will book them)',
      'Tips — not expected in Japan, and politely refused',
    ],
    map: { query: 'Higashiyama, Kyoto, Japan', lat: 35.0116, lon: 135.7681, zoom: 12 },
    rating: 4.9,
    reviewCount: 302,
    departures: ['2026-11-07', '2027-03-27', '2027-04-10', '2027-04-24', '2027-11-06'],
    deal: {
      label: 'Maple-season last seats',
      off: 8,
      endsInHours: 41,
      copy: 'Two seats on the 7 November maple departure, held for 48 hours.',
    },
  },

  /* ---------------------------------------------------------- Swiss Alps */
  {
    slug: 'swiss-alps',
    name: 'Swiss Alps',
    title: 'Swiss Alps: The Bernese Oberland on Foot and by Rail',
    country: 'Switzerland',
    code: 'ZRH',
    tagline: 'Eight days, six mountain walks, one very good railway',
    summary:
      'The Jungfrau region does something no other range manages: it puts genuine high-alpine walking within twenty minutes of a train. We use that shamelessly — walk the good parts, ride the rest, sleep in mountain inns above the cloud line, and never once carry a full pack up a valley.',
    hero: {
      src: 'https://images.unsplash.com/photo-1586752488885-6ce47fdfd874',
      alt: 'Red mountain train crossing a stone viaduct beneath snow-covered Alps',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1572041341933-57caa3b8f6d5',
        alt: 'Alpine meadow path above Grindelwald with the Eiger north face behind',
      },
      {
        src: 'https://images.unsplash.com/photo-1577953521789-b1e88d5785a8',
        alt: 'Cogwheel railway climbing through pine forest in the Bernese Oberland',
      },
      {
        src: 'https://images.unsplash.com/photo-1574499307074-f9a427d03a45',
        alt: 'Turquoise alpine lake below a glaciated ridge',
      },
      {
        src: 'https://images.unsplash.com/photo-1587312858518-421067ab0bd6',
        alt: 'Wooden chalets scattered across a green slope under high peaks',
      },
    ],
    priceFrom: 3150,
    currency: 'USD',
    days: 8,
    nights: 7,
    groupSize: '8–12',
    difficulty: 'Challenging',
    interests: ['trek', 'snow'],
    bestMonths: 'Late June to mid September',
    verdict:
      'Sweet spot: July–September — the high passes are clear of snow, every mountain railway is running, and the light holds past nine in the evening.',
    climate: {
      highC: [3, 5, 9, 13, 18, 21, 23, 22, 18, 13, 7, 4],
      rainMm: [75, 70, 80, 90, 130, 155, 160, 150, 110, 95, 90, 85],
    },
    itinerary: [
      {
        day: 1,
        title: 'Zürich to Grindelwald',
        description:
          'Two and a half hours by train through Bern and Interlaken, the last stretch climbing beside the Lütschine. Kit check over dinner: we will tell you honestly if your boots will not do.',
        stay: 'Chalet hotel, Grindelwald',
        meals: 'D',
      },
      {
        day: 2,
        title: 'Bachalpsee and the First ridge',
        description:
          'Gondola to First, then the ridge walk to Bachalpsee with the Schreckhorn reflected in it, and on to Faulhorn for lunch at the oldest mountain hotel in Europe. Twelve kilometres, mostly downhill after the first hour.',
        stay: 'Chalet hotel, Grindelwald',
        meals: 'B · L',
      },
      {
        day: 3,
        title: 'The Eiger Trail',
        description:
          'Eigergletscher down to Alpiglen, directly under the north face — six kilometres that take four hours because nobody can stop looking up. Afternoon train to Wengen, which has no cars.',
        stay: 'Mountain inn, Wengen',
        meals: 'B · L',
      },
      {
        day: 4,
        title: 'Jungfraujoch, and then back down to the flowers',
        description:
          'Early to the Top of Europe at 3,454 m before the cloud builds — the Aletsch glacier from the Sphinx terrace is the biggest view of the trip. Down by midday, then an easy walk through the meadows to Mürren.',
        stay: 'Mountain inn, Mürren',
        meals: 'B · D',
      },
      {
        day: 5,
        title: 'Schilthorn and the Northface Trail',
        description:
          'Cable car to 2,970 m, the whole Bernese wall in one sweep, then the Northface Trail traverse back to Mürren past Suppenalp. Cheese and bread at an alp dairy that has been in one family for two centuries.',
        stay: 'Mountain inn, Mürren',
        meals: 'B · L',
      },
      {
        day: 6,
        title: 'Sefinenfurgge pass',
        description:
          'The hard day, and the best one: 1,100 m of ascent to a 2,612 m notch on the Via Alpina, then down into the Kiental. Nine hours, and you will remember every one of them.',
        stay: 'Mountain inn, Mürren',
        meals: 'B · L · D',
      },
      {
        day: 7,
        title: 'Lauterbrunnen valley, gently',
        description:
          'A deliberately easy last day: the valley floor past the Staubbach and Trümmelbach falls, then the Schynige Platte cog railway and its alpine botanical garden. Farewell dinner in Interlaken.',
        stay: 'Hotel, Interlaken',
        meals: 'B · D',
      },
      {
        day: 8,
        title: 'Train out',
        description:
          'Direct to Zürich airport, two hours ten. There is a left-luggage counter at Interlaken Ost if you want the morning on the lake first.',
        stay: null,
        meals: 'B',
      },
    ],
    includes: [
      '7 nights in chalet hotels and mountain inns, twin share',
      'Mountain guide for all six walking days',
      'Every lift, cog railway and cable car on the itinerary, Jungfraujoch included',
      'Regional rail pass and all group transfers from Zürich',
      'Breakfast daily, 5 packed lunches, 4 dinners',
      'Emergency mountain-rescue cover for the walking days',
    ],
    excludes: [
      'Flights to and from Zürich (ZRH)',
      'Travel insurance — required, and it must cover walking to 3,500 m',
      'Boots, poles and waterproofs (hire available in Grindelwald)',
      'Meals not listed, and all drinks',
      'Tips for the guide',
    ],
    map: { query: 'Grindelwald, Switzerland', lat: 46.6244, lon: 8.0413, zoom: 11 },
    rating: 4.9,
    reviewCount: 189,
    departures: ['2026-09-05', '2027-06-26', '2027-07-10', '2027-07-31', '2027-08-21'],
  },

  /* -------------------------------------------------------------- Ladakh */
  {
    slug: 'ladakh',
    name: 'Ladakh',
    title: 'Ladakh: High Passes, Pangong and the Indus Monasteries',
    country: 'India',
    code: 'IXL',
    tagline: 'Ten days above 3,000 metres, acclimatised properly',
    summary:
      'Ladakh at 3,500 m is not a place to rush, so the first three days are deliberately slow — Leh, the Indus monasteries, and nothing higher until your body has caught up. Then Nubra over Khardung La, two nights at Pangong, and the drive back over Chang La.',
    hero: {
      src: 'https://images.unsplash.com/photo-1593118845043-359e5f628214',
      alt: 'Deep blue water of Pangong Lake between bare Himalayan ridges',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1635255506105-b74adbd94026',
        alt: 'Whitewashed Ladakhi monastery on a rock spur above the Indus valley',
      },
      {
        src: 'https://images.unsplash.com/photo-1536295243470-d7cba4efab7b',
        alt: 'Prayer flags strung across a high Himalayan pass',
      },
      {
        src: 'https://images.unsplash.com/photo-1600356033695-a003690a6351',
        alt: 'Road switchbacking up a barren mountainside in Ladakh',
      },
      {
        src: 'https://images.unsplash.com/photo-1606857090627-27ca46667290',
        alt: 'Sand dunes and twin-humped camels in the Nubra valley',
      },
    ],
    priceFrom: 1970,
    priceWas: 2190,
    currency: 'USD',
    days: 10,
    nights: 9,
    groupSize: '6–10',
    difficulty: 'Challenging',
    interests: ['trek', 'culture', 'snow'],
    bestMonths: 'June to September',
    verdict:
      'Sweet spot: June–September — Khardung La and Chang La are both open, Pangong is ice-free, and the whole region takes under 20 mm of rain a month all summer.',
    climate: {
      highC: [-2, 1, 6, 12, 17, 21, 25, 24, 21, 14, 8, 2],
      rainMm: [12, 9, 12, 8, 7, 5, 15, 16, 8, 5, 3, 8],
    },
    itinerary: [
      {
        day: 1,
        title: 'Fly into Leh — and then do nothing',
        description:
          'You land at 3,500 m, which is why today has no plan beyond water, a short walk to the bazaar and an early night. Altitude briefing at six. Anyone who pushes harder on day one regrets it on day three.',
        stay: 'Guesthouse, Leh',
        meals: 'D',
      },
      {
        day: 2,
        title: 'Leh, on foot and slowly',
        description:
          'Namgyal Tsemo above the old town for the valley view, the Leh palace, and the old-town restoration work with one of the architects. Nothing above 3,800 m, on purpose.',
        stay: 'Guesthouse, Leh',
        meals: 'B · D',
      },
      {
        day: 3,
        title: 'The Indus monasteries',
        description:
          'Thiksey at seven for the morning puja — monks, horns, butter tea, and no other visitors. Then Hemis, and Stakna on its rock. Back in Leh by four.',
        stay: 'Guesthouse, Leh',
        meals: 'B · L',
      },
      {
        day: 4,
        title: 'Over Khardung La to Nubra',
        description:
          'The pass at 5,359 m, twenty minutes there and no longer, then down into Nubra and the cold-desert dunes at Hunder. Monastery at Diskit with the 32-metre Maitreya over the valley.',
        stay: 'Camp, Hunder',
        meals: 'B · D',
      },
      {
        day: 5,
        title: 'Turtuk, the last village before the line',
        description:
          'Up the Shyok to Turtuk, Balti-speaking and Indian only since 1971. Apricot orchards, a walk between the three hamlets, lunch in a family kitchen.',
        stay: 'Camp, Hunder',
        meals: 'B · L',
      },
      {
        day: 6,
        title: 'The Shyok road to Pangong',
        description:
          'The long day: seven hours along the Shyok riverbed, which is a road in the loosest sense. Arrive at Pangong in the late afternoon, when the water turns the colour it is famous for.',
        stay: 'Lakeside camp, Spangmik',
        meals: 'B · L · D',
      },
      {
        day: 7,
        title: 'Pangong, all day',
        description:
          'Walk the shore east to Man and Merak, away from the day-trip crowd at Spangmik. Nothing else scheduled. At 4,350 m with no light for a hundred kilometres, the sky after dinner is the reason people come back.',
        stay: 'Lakeside camp, Spangmik',
        meals: 'B · L · D',
      },
      {
        day: 8,
        title: 'Chang La, and back to the Indus',
        description:
          'Out over Chang La at 5,360 m, down to Chemrey and Takthok, and into Leh mid-afternoon. A hot shower will never have meant more.',
        stay: 'Guesthouse, Leh',
        meals: 'B · L',
      },
      {
        day: 9,
        title: 'Alchi and Likir, west down the valley',
        description:
          'The eleventh-century wall paintings at Alchi — Kashmiri work, unlike anything else in Ladakh — then Likir and the confluence at Nimmu. Farewell dinner in the old town.',
        stay: 'Guesthouse, Leh',
        meals: 'B · D',
      },
      {
        day: 10,
        title: 'Fly out',
        description:
          'Morning flights only — Leh closes to traffic once the valley wind picks up. The airport is fifteen minutes away and we leave early.',
        stay: null,
        meals: 'B',
      },
    ],
    includes: [
      '9 nights: guesthouses in Leh, and permanent camps at Hunder and Pangong',
      'All transport in 4×4 Innovas with local drivers, two guests per bench',
      'Ladakhi guide throughout and inner-line permits for Nubra and Pangong',
      'Oxygen cylinder and pulse oximeter in every vehicle',
      'All monastery entries and the old-town architecture walk',
      'Breakfast daily, 6 lunches, 7 dinners',
      'Airport transfers, and the altitude briefing on arrival',
    ],
    excludes: [
      'Flights to and from Leh (IXL), usually via Delhi',
      'India e-visa',
      'Travel insurance — required, and it must cover 5,400 m and helicopter evacuation',
      'Meals not listed, bottled water and all drinks',
      'Tips for drivers and guide',
    ],
    map: { query: 'Leh, Ladakh, India', lat: 34.1526, lon: 77.5771, zoom: 9 },
    rating: 4.8,
    reviewCount: 143,
    departures: ['2026-09-06', '2027-06-13', '2027-07-04', '2027-08-15', '2027-09-05'],
    deal: {
      label: 'Final 2026 departure',
      off: 10,
      endsInHours: 95,
      copy: 'The 6 September run is the last before the passes close. Three seats.',
    },
  },

  /* ------------------------------------------------------------- Iceland */
  {
    slug: 'iceland',
    name: 'Iceland',
    title: 'Iceland: The South Coast and the Highland Edge',
    country: 'Iceland',
    code: 'KEF',
    tagline: 'Seven days of waterfalls, black sand and long light',
    summary:
      'The Ring Road in a week is a driving holiday, not a trip. We take the southern quarter instead and actually stop: behind Seljalandsfoss, into the Þórsmörk highland, out onto Sólheimajökull with crampons on, and two nights at Jökulsárlón where the icebergs go out with the tide.',
    hero: {
      src: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae',
      alt: 'Wide Icelandic waterfall falling over a mossy basalt cliff',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1506261423908-ea2559c1f24c',
        alt: 'Meltwater river braiding across black volcanic sand in Iceland',
      },
      {
        src: 'https://images.unsplash.com/photo-1445108771252-d1cc31a02a3c',
        alt: 'Icebergs drifting in a glacial lagoon under low cloud',
      },
      {
        src: 'https://images.unsplash.com/photo-1621959721891-d297dfd9d6ee',
        alt: 'Basalt sea stacks off the black beach at Reynisfjara',
      },
      {
        src: 'https://images.unsplash.com/photo-1572508779898-98f775d91fa6',
        alt: 'Green aurora over a turf-roofed farmhouse in southern Iceland',
      },
    ],
    priceFrom: 3480,
    currency: 'USD',
    days: 7,
    nights: 6,
    groupSize: '8–12',
    difficulty: 'Moderate',
    interests: ['trek', 'snow'],
    bestMonths: 'June to August for the light, late September for the aurora',
    verdict:
      'Sweet spot: June–August — 12–14 °C, the lowest rainfall of the year, and light enough at midnight to keep walking. Come late September instead if you want a real chance of aurora.',
    climate: {
      highC: [3, 3, 4, 6, 10, 12, 14, 13, 11, 7, 4, 3],
      rainMm: [76, 72, 82, 58, 44, 50, 52, 62, 67, 86, 73, 79],
    },
    itinerary: [
      {
        day: 1,
        title: 'Keflavík, and east along the coast',
        description:
          'Straight out of the airport and east — Reykjavík can wait until the end. Guesthouse near Hvolsvöllur under Eyjafjallajökull, with the volcano that closed European airspace directly above the breakfast table.',
        stay: 'Guesthouse, Hvolsvöllur',
        meals: 'D',
      },
      {
        day: 2,
        title: 'Seljalandsfoss, Gljúfrabúi and Skógafoss',
        description:
          'Behind Seljalandsfoss first — you will get wet, that is the point — then the hidden one up the slot canyon next door that the coaches drive past. Afternoon on the Fimmvörðuháls trail above Skógafoss, as far as the tenth waterfall.',
        stay: 'Guesthouse, Hvolsvöllur',
        meals: 'B · L',
      },
      {
        day: 3,
        title: 'Þórsmörk by highland bus',
        description:
          'Across the unbridged rivers in a modified 4×4 bus, into the valley between three glaciers. Valahnúkur for the view in every direction, then the birch woods at Básar. This road is open about four months a year.',
        stay: 'Guesthouse, Hvolsvöllur',
        meals: 'B · L',
      },
      {
        day: 4,
        title: 'Reynisfjara, Dyrhólaey and the glacier tongue',
        description:
          'The black beach and the basalt stacks, the arch at Dyrhólaey, and then crampons and an ice axe for two hours on Sólheimajökull with a glacier guide. Sleep at Kirkjubæjarklaustur.',
        stay: 'Country hotel, Kirkjubæjarklaustur',
        meals: 'B · D',
      },
      {
        day: 5,
        title: 'Skaftafell and Svartifoss',
        description:
          'Into Vatnajökull National Park: the walk up to Svartifoss under its hanging basalt columns, then on to the Skaftafellsjökull overlook. East to the lagoon for two nights.',
        stay: 'Hotel, Jökulsárlón',
        meals: 'B · L',
      },
      {
        day: 6,
        title: 'Jökulsárlón, Diamond Beach and the boat',
        description:
          'A zodiac in among the icebergs in the morning, Diamond Beach on the outgoing tide when the ice is stranded on black sand, and Fjallsárlón in the evening light. Aurora watch after dinner if the sky is clear and the season is right.',
        stay: 'Hotel, Jökulsárlón',
        meals: 'B · D',
      },
      {
        day: 7,
        title: 'Back west, and out',
        description:
          'The long drive back along the coast with a stop at Fjaðrárgljúfur canyon, then Keflavík. Evening flights only — it is five hours of road.',
        stay: null,
        meals: 'B',
      },
    ],
    includes: [
      '6 nights in guesthouses and country hotels, twin share',
      'All transport in a 4×4 minibus, plus the Þórsmörk highland bus',
      'Guide throughout and a certified glacier guide at Sólheimajökull',
      'Crampons, harness, helmet and axe for the glacier walk',
      'Zodiac boat among the icebergs at Jökulsárlón',
      'National park fees and the Þórsmörk access',
      'Breakfast daily, 4 lunches, 3 dinners',
    ],
    excludes: [
      'Flights to and from Keflavík (KEF)',
      'Travel insurance — required, and it must cover glacier travel',
      'Waterproofs and walking boots (hire available on day one)',
      'Meals not listed, and all drinks',
      'The Blue Lagoon, if you want it on the last afternoon — we will book it',
      'Tips',
    ],
    map: { query: 'Jökulsárlón, Iceland', lat: 64.0784, lon: -16.2306, zoom: 8 },
    rating: 4.7,
    reviewCount: 128,
    departures: ['2026-09-26', '2027-06-19', '2027-07-17', '2027-08-14', '2027-09-25'],
  },
]

/* ------------------------------------------------------------------ *
 * Lookups
 * ------------------------------------------------------------------ */

export const tripBySlug = (slug: string): Trip | undefined =>
  trips.find((trip) => trip.slug === slug)

export const tripSlugs = trips.map((trip) => trip.slug)

/** Only the trips currently on offer, for the deals carousel. */
export const deals = trips.filter(
  (trip): trip is Trip & { deal: NonNullable<Trip['deal']> } => Boolean(trip.deal),
)

export const formatPrice = (value: number) =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

/** Rolled up for the homepage Stats row, so the numbers cannot contradict the catalogue. */
export const catalogueStats = {
  countries: new Set(trips.map((trip) => trip.country)).size,
  trips: trips.length,
  travellers: 4820,
  reviews: trips.reduce((total, trip) => total + trip.reviewCount, 0),
  averageRating:
    Math.round(
      (trips.reduce((total, trip) => total + trip.rating * trip.reviewCount, 0) /
        trips.reduce((total, trip) => total + trip.reviewCount, 0)) *
        10,
    ) / 10,
}
