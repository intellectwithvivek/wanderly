<div align="center">
  <img src="public/logo-mark.svg" width="76" alt="">

# Wanderly — Documentation

**A free Next.js travel website template, and a showcase for
[VivekUI](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=travel&utm_medium=readme).**

[Live site](https://wanderly.vivekkumarsingh.in) ·
[Repository](https://github.com/intellectwithvivek/wanderly) ·
[Use this template](https://github.com/intellectwithvivek/wanderly/generate) ·
[Component map](https://wanderly.vivekkumarsingh.in/built-with)

</div>

---

## Contents

1. [Why this template exists](#1-why-this-template-exists)
2. [What you get](#2-what-you-get)
3. [Getting it running](#3-getting-it-running)
4. [Making it yours in four edits](#4-making-it-yours-in-four-edits)
5. [How the project is organised](#5-how-the-project-is-organised)
6. [The data model](#6-the-data-model)
7. [Theming and the ticket motif](#7-theming-and-the-ticket-motif)
8. [The charts, and why there is no chart library](#8-the-charts-and-why-there-is-no-chart-library)
9. [SEO](#9-seo)
10. [AEO — being answerable](#10-aeo--being-answerable)
11. [Accessibility](#11-accessibility)
12. [Deploying to Vercel](#12-deploying-to-vercel)
13. [Recipes](#13-recipes)
14. [Decisions worth knowing about](#14-decisions-worth-knowing-about)
15. [Licence and credit](#15-licence-and-credit)

---

## 1. Why this template exists

Two reasons, and they are worth stating plainly.

**To show what VivekUI can actually build.** A component library is easy to demo with a
button and a modal. It is much harder to demo with a whole site — a booking flow, a
day-by-day itinerary, live countdowns, real charts, a filterable planner, dark mode, and
structured data — without reaching for Tailwind halfway through. Wanderly is that
demonstration. Every visible element is a VivekUI component, and the entire custom
stylesheet is one file of about 500 lines that mostly draws a single decorative motif.

**To save you the first two weeks.** Most travel and tour sites need the same things:
a catalogue, a detail page with an itinerary, a comparison table, a booking form, and
enough SEO to be found. Those are built here, wired together, and verified in a browser.
Replace the data and you have a working site — not a scaffold that still needs a
component library, a chart library, a CSS strategy and a metadata pass.

**What it is not.** Wanderly is a fictional company. The trips, prices, reviews and
climate figures are invented for the demo (the climate numbers are realistic but you
should not plan a holiday with them). There is no backend: forms resolve to a toast, and
"Reserve" holds nothing. Wiring those up is your job, and every place that needs it is
marked in the code.

---

## 2. What you get

| | |
|---|---|
| **Routes** | `/`, `/destinations`, `/destinations/[slug]` (×6), `/plan`, `/built-with`, 404 |
| **Generated** | `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `llms.txt` |
| **Rendering** | Every route statically prerendered; homepage revalidates hourly for the countdowns |
| **Components** | 45 VivekUI components + 2 SVG charts — the full list is on [`/built-with`](https://wanderly.vivekkumarsingh.in/built-with) |
| **Dependencies** | `next`, `react`, `react-dom`, `@the_viveksingh/vivek-ui`. That is all |
| **Custom CSS** | One file, `app/globals.css` |
| **Structured data** | TravelAgency, WebSite, TouristTrip, SoftwareSourceCode, BreadcrumbList, FAQPage |
| **Licence** | MIT, credit removable |

---

## 3. Getting it running

Requires **Node.js 20.9 or newer** (22 LTS recommended).

```bash
git clone https://github.com/intellectwithvivek/wanderly.git
cd wanderly
npm install
npm run dev            # http://localhost:3000
```

There is no third step. No CLI to run, no config file to fill in, no design tokens to
generate, no PostCSS pipeline.

```bash
npm run build          # production build — prerenders all 11 pages
npm run start          # serve the build
npm run lint           # eslint (next/core-web-vitals + react-hooks)
npm run typecheck      # tsc --noEmit
```

**Prefer a clean history?** Use
[**Use this template**](https://github.com/intellectwithvivek/wanderly/generate) on
GitHub instead of cloning — you get the files with your own first commit.

---

## 4. Making it yours in four edits

This is the whole customisation path. Everything else is generated from these.

### Edit 1 — your trips

[`data/trips.ts`](data/trips.ts) holds the entire catalogue. Replace the six objects with
your own and the homepage, the destinations index, the comparison table, all six detail
pages, the planner, the footer link column, the sitemap and the JSON-LD all follow. The
`Trip` interface is documented field by field in the file.

### Edit 2 — your identity

[`data/site.ts`](data/site.ts):

```ts
export const SITE = {
  name: 'Wanderly',
  url: 'https://wanderly.vivekkumarsingh.in',   // ← your domain
  // …
}
```

`SITE.url` is the single source for canonicals, `metadataBase`, Open Graph URLs, the
sitemap and every JSON-LD `@id`. Change it once.

### Edit 3 — your colour

The top of [`app/globals.css`](app/globals.css) is seven custom properties per theme:

```css
:root {
  --vk-color-primary: #047857;
  --vk-color-primary-fg: #ffffff;
  --vk-color-primary-hover: #065f46;
  --vk-color-primary-active: #064e3b;
  --vk-color-primary-subtle: #ecfdf5;
  --vk-color-primary-subtle-fg: #065f46;
  --vk-color-ring: #047857;
}

[data-theme='dark'] { /* the same seven, lifted for a dark ground */ }
```

Change those and every component re-skins, because every value in VivekUI is a custom
property. Radius, spacing, shadow and typography tokens work the same way — the full
list is in the [theming docs](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=travel&utm_medium=readme).

> **Do not delete the `[data-theme='dark']` block.** VivekUI's own dark rule is a bare
> `[data-theme=dark]` selector with the same specificity as `:root`, so a `:root`-only
> override would win in *both* themes and your accent would stay light-mode in the dark.
> That is why the override is restated rather than inherited.

### Edit 4 — your FAQ

[`data/faq.ts`](data/faq.ts) holds each question and answer as a plain string, and the
same string feeds both the visible `FAQ` component and the FAQPage structured data. That
is deliberate: a rich-result answer that does not match the page is the mismatch search
engines penalise, and storing it once makes drift impossible.

---

## 5. How the project is organised

```
app/
  layout.tsx              ThemeProvider, ToastProvider, anti-flash script, navbar, footer
  page.tsx                homepage
  globals.css             the whole custom stylesheet
  icon.svg                favicon (Next serves it automatically)
  apple-icon.png          180×180 touch icon
  favicon.ico             legacy, three frames (16/32/48)
  destinations/
    page.tsx              comparison table + card grid
    [slug]/page.tsx       one trip: gallery, itinerary, charts, map, booking
  plan/page.tsx           the planner
  built-with/page.tsx     the component map
  not-found.tsx           404
  sitemap.ts robots.ts manifest.ts

components/               13 components, each doing one job
data/
  trips.ts                the catalogue          ← edit this
  site.ts                 identity + UTM links   ← edit this
  faq.ts                  FAQ copy + FAQPage schema
  schema.ts               all other structured data
lib/render-time.ts        one clock read per render pass
public/                   llms.txt, screenshots, OG card, logo
```

**Server by default.** Only five components are client components, and each for one
specific reason:

| Component | Why it needs the client |
|---|---|
| `site-navbar` | `usePathname`, to mark the current link |
| `hero-search` | form state, and `useRouter` to navigate |
| `booking-card` | form state, modal state, `useToast` |
| `plan-builder` | filter state |
| `newsletter-block`, `search-echo` | a promise callback; `useSearchParams` |

Everything else — including both charts, the itinerary timeline, the ticket cards, the
deals carousel and the footer — renders on the server.

---

## 6. The data model

One trip, abridged. The full interface with per-field notes is at the top of
[`data/trips.ts`](data/trips.ts).

```ts
export interface Trip {
  slug: string                  // URL segment, and the React key
  name: string                  // "Bali" — on the ticket stub
  title: string                 // the <h1>
  country: string
  code: string                  // "DPS" — printed on the boarding pass
  tagline: string               // one line, on the card
  summary: string               // 2–3 sentences; the meta description falls back to it
  hero: { src, alt }            // Unsplash base URL, no query string
  gallery: { src, alt }[]       // four more
  priceFrom: number
  priceWas?: number             // shows a strike-through when a deal is on
  days, nights: number
  groupSize: string             // "8–12"
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  interests: Interest[]         // beach | trek | food | culture | snow — drives /plan
  bestMonths: string
  verdict: string               // the chart's one-line conclusion
  climate: { highC: number[]; rainMm: number[] }   // exactly 12 each, Jan → Dec
  itinerary: { day, title, description, stay, meals }[]
  includes: string[]
  excludes: string[]
  map: { query, lat, lon, zoom }
  rating: number; reviewCount: number
  departures: string[]          // ISO dates the trip actually runs
  deal?: { label, off, endsInHours, copy }
}
```

Three details that matter:

- **`climate.highC` and `climate.rainMm` must have exactly 12 entries**, January first.
  The charts index straight into them.
- **`departures` are the only dates the booking DatePicker will accept.** It blocks
  everything else with a predicate, so the calendar can never offer a date you do not run.
- **Image URLs carry no query string.** The components append `?auto=format&fit=crop&w=…`
  themselves, so one entry serves every size.

---

## 7. Theming and the ticket motif

The site's one piece of decoration is the boarding-pass card: a mono route strip, a
perforated tear line, and a semicircle punched out of each side. It lives in
`.ticket` in [`app/globals.css`](app/globals.css) and is used by every list of trips on
the site.

The notches are two `radial-gradient` masks composited together:

```css
.ticket {
  --ticket-stub: 3.5rem;                              /* height of the bottom strip */
  --ticket-notch: 0.7rem;
  --ticket-tear: calc(100% - var(--ticket-stub));      /* where the notches sit */

  mask-image:
    radial-gradient(circle var(--ticket-notch) at 0    var(--ticket-tear), #0000 98%, #000 100%),
    radial-gradient(circle var(--ticket-notch) at 100% var(--ticket-tear), #0000 98%, #000 100%);
  mask-composite: intersect;
}
```

`--ticket-stub` is the knob: the deals carousel raises it to `5.75rem` inline to make room
for a countdown, and the notches follow automatically.

**Two consequences of using a mask, both handled, both worth knowing if you edit this:**

1. **No `box-shadow`.** A mask clips everything painted outside the kept region, a shadow
   included. The hover lift is a `transform` plus a border colour instead.
2. **The focus ring has to be a pseudo-element.** An `outline` is clipped by the mask too,
   so a focused card had no visible indicator at all. `outline-offset: -3px` moves the ring
   inside the mask but then the card's own photograph paints over it. So `.ticket::after`
   carries the ring at `inset: 0` with a `z-index` above the media. If you change the
   motif, keep that.

---

## 8. The charts, and why there is no chart library

Every destination page answers "when should I go?" with two charts and a verdict:

```tsx
import { BarChart, LineChart } from '@the_viveksingh/vivek-ui/charts'

<LineChart
  series={[{ name: 'Average high (°C)', data: temperature, color: 'var(--vk-chart-2)' }]}
  height={230} curve="smooth" showGrid showAxes tooltip
  formatValue={(v) => `${v}°C`}
  title={`Average daily high temperature in ${trip.name}, by month`}
/>
```

`color: 'var(--vk-chart-2)'` rather than a hex value is the trick worth copying: the chart
palette is theme-aware, so the warm series stays legible on a dark ground without a second
code path.

**Why this matters for the template.** Recharts is roughly 100 kB and needs a client
boundary. These charts are pure inline SVG with nothing measured in the browser, so they
render complete in the first HTML response, cost 8.3 kB brotlied for all six types, and
work with JavaScript disabled. Each one also emits a visually hidden `<table>` of the real
numbers, so a screen reader gets the data rather than the word "graphic".

**One limitation to know:** `LineChart` has no y-axis domain control, so a temperature
line does not start at zero. That is correct for temperature, but it means a place whose
high barely moves all year — Bali, 30–32 °C — still draws a dramatic curve. The template
states the range in words under each title (`30–32 °C across the year`) rather than letting
the shape mislead. Keep that if you change the copy.

---

## 9. SEO

Everything here is generated from `data/`, so adding a trip needs no SEO edit.

- **Metadata API per route**, with `metadataBase` from `SITE.url`, a canonical on every
  page, Open Graph and Twitter cards.
- **`app/sitemap.ts`** maps the four static routes plus one entry per trip.
- **`app/robots.ts`** allows everything and points at the sitemap.
- **One `<h1>` per page**, and no skipped heading levels — verified in a browser, not
  assumed.
- **Server components by default**, so the crawler gets the content in the HTML.
- **`next/image`** with `remotePatterns`, explicit `sizes`, and `preload` on the one hero
  image that is the LCP element.

> **A gotcha the hard way:** a route that declares its own `openGraph` **replaces** the
> layout's rather than merging into it. Four routes here set a custom `og:title` and
> silently lost the image because of it. That is why the card lives in one exported
> constant, `OG_IMAGE` in `data/site.ts`, and every route spreads it in.

### Structured data

| Type | Where | Carries |
|---|---|---|
| `TravelAgency` | `/` | address, area served, aggregate rating |
| `WebSite` | `/` | name, publisher |
| `TouristTrip` | each trip | `itinerary` as an ItemList, `offers` with price |
| `SoftwareSourceCode` | `/built-with` | the template itself, its repo and licence |
| `BreadcrumbList` | every nested page | |
| `FAQPage` | `/` and each trip | the same strings the page renders |
| `ItemList` | `/destinations` | the six trips in order |

`aggregateRating` sits on the `TravelAgency` and deliberately **not** on `TouristTrip`:
schema.org's `Trip` has no such property, and a validator that warns today is a rich
result that disappears tomorrow.

---

## 10. AEO — being answerable

Answer engines and assistants do not browse; they extract. Three things make that easy:

**`public/llms.txt`** — a plain-Markdown brief at a conventional path: what the site is,
what each page holds, all six trips with prices and best months, the FAQ answers in full,
the stack, and the repository. When something asks "what is Wanderly", this is the file
that answers without a crawl.

**FAQ answers that are prose, not fragments.** Each answer in `data/faq.ts` is a
self-contained paragraph that repeats its own subject, because an extracted answer arrives
with no surrounding page. Compare:

> ❌ "No, they are not."
> ✅ "No. Every price on this site is the land price — accommodation, guides, transport,
> entries and the meals listed on each itinerary. International flights are excluded on
> purpose: travellers join us from four continents…"

**Numbers in the answer, not only in the chart.** The Bali "best time to visit" answer
says *"rainfall drops from about 345 mm in January to roughly 30 mm in August, while the
average daily high barely moves off 30–32 °C"*. A model cannot read an SVG, but it can
read that — and it matches what the chart plots, because both come from
`trip.climate`.

`robots.ts` also names `GPTBot`, `ClaudeBot`, `PerplexityBot` and `Google-Extended` with
an explicit `Allow`. Flip those to `disallow` if you would rather not be quoted.

---

## 11. Accessibility

Target is WCAG 2.2 AA, and it was checked in a real browser rather than reasoned about.

- One `<h1>` per page; no skipped heading levels anywhere
- A skip link as the **first** tab stop, visible on focus
- 2px focus rings with a real contrast ring on the photo-backed cards
- `prefers-reduced-motion`: the marquee goes **static**, not slower; card transitions off
- Every `<img>` has real alt text; the map `<iframe>` has a title
- Charts ship a visually hidden data table
- Emerald `#047857` on white is 5.55:1; `#34d399` on the dark ground is 10.3:1
- No horizontal overflow at 390px or at 1440px
- Zero console errors on every route

> **A bug worth learning from:** VivekUI hides each chart's data table with the standard
> visually-hidden recipe (`position: absolute; inline-size: 1px; overflow: hidden`). That
> works for every element except a `<table>`, whose used width is never less than its
> min-content width — so the "1px" box was really 345px, and on a 390px phone it pushed the
> document's scroll width to 402 and made every page scroll sideways. The fix is
> `overflow-x: clip` on `.vk-chart`, one level up. If you add charts elsewhere, keep that
> rule.

---

## 12. Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2Fwanderly&project-name=wanderly&repository-name=wanderly)

1. Import the repository at [vercel.com/new](https://vercel.com/new). No settings to
   change — Next.js is detected, and there are no environment variables.
2. **Add your domain** under *Settings → Domains*. This site runs on
   `wanderly.vivekkumarsingh.in`; for a subdomain, add a `CNAME` pointing at
   `cname.vercel-dns.com`.
3. **Set `SITE.url` in [`data/site.ts`](data/site.ts) to that domain** and redeploy.
   Canonicals, Open Graph URLs, the sitemap and every JSON-LD `@id` follow from it — if
   you skip this, they will all still point at the old host.
4. Submit `https://your-domain/sitemap.xml` in Google Search Console, and validate a trip
   page in the [Rich Results Test](https://search.google.com/test/rich-results).

Images come from Unsplash, Pexels, picsum.photos and i.pravatar.cc, all pre-listed in
`next.config.ts` under `images.remotePatterns`. Add your own host there before using it,
or `next/image` will return a 400.

---

## 13. Recipes

### Add a seventh destination

Append one object to `trips` in `data/trips.ts`. Nothing else — the route, the sitemap
entry, the footer link, the comparison row, the planner candidate and the JSON-LD are all
derived. `generateStaticParams` will prerender it on the next build.

### Change the departure city on the ticket

`ORIGIN` in `data/trips.ts`. It is the `LIS` in `LIS ✈ DPS`.

### Remove the VivekUI credit

Delete the `brand` block from `components/site-footer.tsx` and the badge from
`components/site-navbar.tsx`. The licence permits it. A ⭐ on
[the library](https://github.com/intellectwithvivek/vivek_UI) is appreciated instead.

### Wire the booking form to a real backend

`components/booking-card.tsx`, the `confirm()` function. It currently fires a toast; make
it `await fetch('/api/reserve', …)` and keep the toast for the result. `Newsletter`'s
`onSubscribe` already takes a promise and disables the button until it settles, which is
what actually prevents a double submit — so put your API call there in
`components/newsletter-block.tsx`.

### Swap the accent for something warmer

Replace the seven `--vk-color-primary*` values in both theme blocks. Check contrast: the
`-fg` value must clear 4.5:1 against its `primary`, and `primary` must clear 4.5:1 against
the page background wherever it is used as text.

### Turn off the deals countdown

Delete the `deal` key from the trips that have one. `deals` in `data/trips.ts` filters on
it, and the carousel disappears when the array is empty. You can then drop
`export const revalidate = 3600` from `app/page.tsx`, since the only reason the homepage
revalidates is to keep those timers honest.

---

## 14. Decisions worth knowing about

Places where the obvious thing was not the right thing.

**The clock is read once per render pass.** `lib/render-time.ts` wraps `Date.now()` in
React's `cache()`. Calling it inline in a component is an impure read that two renders in
the same pass can disagree on — and for a countdown, a disagreement between the server
render and the first client render is a hydration error. `Countdown` is given both `to` and
`now`, so the server HTML contains real digits the client reproduces exactly.

**`/destinations` reads the query string on the client.** Using the server `searchParams`
prop would opt the whole route into rendering on demand and cost it `next/link` prefetch,
all to echo two values. `useSearchParams` in a small Suspense-wrapped client component
keeps the route static.

**`toISODate`, never `toISOString().slice(0, 10)`.** The latter converts to UTC first, so
for anyone west of Greenwich it prints yesterday's date for most of the day. VivekUI
exports `toISODate` for exactly this.

**Breadcrumbs use the compound form.** `Breadcrumb`'s `items` shorthand renders real
`<a>` elements, which would cost a full page load per crumb. The compound form takes
`next/link` via `asChild` — at the price of writing the separators yourself.

**The itinerary's `statusLabel` is overridden.** `Timeline.Item` announces its status, and
"complete" is nonsense for a trip that has not happened. Each day announces "Day 3 of 9"
instead, with the day number in the marker via `icon`.

**Read-only ratings use `aria-label`, not `label`.** `label` renders a visible `<legend>`,
which would just repeat the "4.7 · 128 reviews" line beside it.

---

## 15. Licence and credit

[MIT](LICENSE) © 2026 Vivek Kumar Singh. Commercial use included, no attribution required.

Wanderly is fictional; the trips, prices and reviews are invented. Photographs are
hot-linked from [Unsplash](https://unsplash.com) under the Unsplash licence and are not
redistributed in this repository. Avatars are from [i.pravatar.cc](https://i.pravatar.cc).

<div align="center">

**Built with ❤️ using VivekUI** — 91 React components · 6 SVG charts · zero runtime
dependencies.

```bash
npm i @the_viveksingh/vivek-ui
```

[Docs](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=travel&utm_medium=readme)
· [Components](https://ui.vivekkumarsingh.in/docs/components?utm_source=vivekui-template&utm_campaign=travel&utm_medium=readme)
· [Charts](https://ui.vivekkumarsingh.in/docs/charts?utm_source=vivekui-template&utm_campaign=travel&utm_medium=readme)
· [npm](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
· [GitHub](https://github.com/intellectwithvivek/vivek_UI)
· [Vivek Kumar Singh](https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=travel&utm_medium=readme)

</div>
