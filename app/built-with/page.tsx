import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Section,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { InstallCommand } from '@/components/install-command'
import { JsonLd } from '@/components/jsonld'
import { breadcrumbJsonLd, templateJsonLd, type Crumb } from '@/data/schema'
import { OG_IMAGE, VIVEKUI, authorUrl, chartsUrl, componentUrl, docsUrl } from '@/data/site'

export const metadata: Metadata = {
  title: 'Built with VivekUI — Every Component on This Site',
  description:
    'Every section of this free Next.js travel template maps to one VivekUI component, deep-linked to its documentation. 91 components, 6 SVG charts, zero runtime dependencies — including the climate charts, which need no chart library.',
  alternates: { canonical: '/built-with' },
  openGraph: {
    url: '/built-with',
    title: 'Built with VivekUI — every component on this site',
    description:
      'The section-by-section component map for this free Next.js travel website template.',
    images: [OG_IMAGE],
  },
}

const CRUMBS: readonly Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Built with', path: '/built-with' },
]

type Row = {
  where: string
  /** Display name. */
  name: string
  /** Docs slug — kebab-case, as the documentation site uses. */
  slug: string
  what: string
  /** Charts live in their own docs section rather than under /docs/components. */
  chart?: boolean
}

const ROWS: readonly Row[] = [
  { where: 'Every page — top bar', name: 'Navbar', slug: 'navbar', what: 'Sticky bar that collapses to a sheet on a narrow screen, with the “Built with VivekUI” badge' },
  { where: 'Every page — top bar', name: 'ThemeToggle', slug: 'theme-toggle', what: 'Light / dark / system, named after the action rather than the current state' },
  { where: 'Every page — footer', name: 'Footer', slug: 'footer', what: 'Link columns in one named nav, plus the credit block' },
  { where: 'Every page — footer', name: 'CopyButton', slug: 'copy-button', what: 'The install command, with a live-region confirmation and a legacy fallback' },
  { where: 'Every page — feedback', name: 'ToastProvider', slug: 'toast', what: 'Two live regions mounted empty at boot, so the first toast is never dropped' },

  { where: 'Home — hero search', name: 'Combobox', slug: 'combobox', what: 'Type-to-filter destination picker, ARIA activedescendant, focus never leaves the input' },
  { where: 'Home — hero search', name: 'DatePicker', slug: 'date-picker', what: 'Text entry first, calendar popup second' },
  { where: 'Home — hero search', name: 'Select', slug: 'select', what: 'A real native select, so the platform picker is inherited' },
  { where: 'Home — hero search', name: 'Field', slug: 'field', what: 'Owns the label, hint and error wiring for all three controls above' },
  { where: 'Home — ticker', name: 'Marquee', slug: 'marquee', what: 'Zero-JS infinite ticker; stops on hover, on focus and under reduced motion' },
  { where: 'Home — destination wall', name: 'BentoGrid', slug: 'bento-grid', what: 'The six trips, with wide feature tiles alternating sides' },
  { where: 'Home — deals', name: 'Carousel', slug: 'carousel', what: 'CSS scroll-snap track that works with JavaScript disabled' },
  { where: 'Home — deals', name: 'Countdown', slug: 'countdown', what: 'Given a server `now`, hydration-safe by construction — never reads the clock in render' },
  { where: 'Home — numbers', name: 'Stats', slug: 'stats', what: 'A description list, so every figure is announced with what it measures' },
  { where: 'Home — numbers', name: 'AnimatedCounter', slug: 'animated-counter', what: 'Renders the final value in server HTML, never a zero that hopefully animates' },
  { where: 'Home — numbers', name: 'Rating', slug: 'rating', what: 'Read-only average as a single `role="img"`, not six dead tab stops' },
  { where: 'Home — how it works', name: 'Stepper', slug: 'stepper', what: 'Three steps as an ordered list inside a nav landmark' },
  { where: 'Home — social proof', name: 'Testimonials', slug: 'testimonials', what: 'figure / blockquote / figcaption, the markup HTML actually defines for a quote' },
  { where: 'Home & trips — FAQ', name: 'FAQ', slug: 'faq', what: 'Native `<details>`, so it opens with no JavaScript and no ARIA at all' },
  { where: 'Home — signup', name: 'Newsletter', slug: 'newsletter', what: 'Promise-driven busy state, which is what actually stops a double submit' },
  { where: 'Home — closing ask', name: 'CTA', slug: 'cta', what: 'Container-queried, so it stacks correctly in a narrow column' },

  { where: 'Destinations — comparison', name: 'Table', slug: 'table', what: 'The six trips on the numbers, with a visually hidden caption naming the table' },
  { where: 'Destinations — search echo', name: 'Alert', slug: 'alert', what: 'Politeness picked from the tone, so it does not talk over the user' },

  { where: 'Trip page — gallery', name: 'Carousel', slug: 'carousel', what: 'Five photographs, two at a time above 768px' },
  { where: 'Trip page — itinerary', name: 'Timeline', slug: 'timeline', what: 'The day-by-day. `icon` carries the day number, `statusLabel` fixes the announcement' },
  { where: 'Trip page — inclusions', name: 'Badge', slug: 'badge', what: 'Decorative in / out marks; the headings carry the meaning' },
  { where: 'Trip page — location', name: 'MapEmbed', slug: 'map-embed', what: 'OpenStreetMap by default — no cookies set before the visitor has agreed to anything' },
  { where: 'Trip page — booking', name: 'Modal', slug: 'modal', what: 'Focus trapped, scroll locked, the rest of the page inert, focus returned on close' },
  { where: 'Trip page — booking', name: 'Card', slug: 'card', what: 'The sticky booking rail, header / body / footer' },
  { where: 'Trip page — booking', name: 'Divider', slug: 'divider', what: 'A real `<hr>`, which already means "thematic break"' },
  { where: 'Trip page — booking', name: 'Stack', slug: 'stack', what: 'Token-based vertical rhythm inside the card, which has no gap of its own' },

  { where: 'Plan — interests', name: 'TagInput', slug: 'tag-input', what: 'Live region announcing the whole tag list, and a spoken reason for every rejection' },
  { where: 'Plan — budget', name: 'Slider', slug: 'slider', what: 'Built on `<input type="range">`, so the keyboard and the slider role are the platform’s' },
  { where: 'Plan — no matches', name: 'EmptyState', slug: 'empty-state', what: 'The glyph, the reason, and the two buttons that fix it' },
  { where: 'Plan — results', name: 'Grid', slug: 'grid', what: 'Responsive columns compiled to custom properties — no CSS generated at render' },

  { where: 'Trip page — climate', name: 'LineChart', slug: 'line-chart', what: 'Average high temperature by month. Pure inline SVG, rendered on the server', chart: true },
  { where: 'Trip page — climate', name: 'BarChart', slug: 'bar-chart', what: 'Rainfall in millimetres by month, with a visually hidden data table', chart: true },

  { where: 'Structure — everywhere', name: 'Section', slug: 'section', what: 'Landmark, rhythm and the inner Container in one component' },
  { where: 'Structure — everywhere', name: 'Container', slug: 'container', what: 'Centres content and caps its width with a responsive gutter' },
  { where: 'Structure — everywhere', name: 'Heading', slug: 'heading', what: '`level` sets semantics, `size` sets appearance — separately, on purpose' },
  { where: 'Structure — everywhere', name: 'Text', slug: 'text', what: 'Body copy with tone, size, weight and line clamping' },
  { where: 'Structure — everywhere', name: 'Breadcrumb', slug: 'breadcrumb', what: 'The trail, in compound form so each hop is a `next/link`' },
  { where: 'Structure — everywhere', name: 'Button', slug: 'button', what: '`asChild` hands the element to `next/link`, so a link stays an `<a>`' },
  { where: 'Structure — trip cards', name: 'Flex', slug: 'flex', what: 'The wrapping badge row on every boarding-pass card' },
  { where: 'Footer & this page', name: 'Code', slug: 'code', what: 'The install command, beside its CopyButton' },
  { where: 'Theme — root layout', name: 'ThemeProvider', slug: 'theme-provider', what: 'Owns the theme, plus the blocking `themeScript` that prevents a wrong first paint' },
]

/**
 * Renders `backtick spans` in the table copy as real `<code>`.
 *
 * The rows are plain strings so the data stays greppable and diffable; this is the
 * one line that stops the backticks showing up as literal characters in the cell.
 */
function CodeSpans({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, index) =>
        index % 2 === 1 ? <code key={index}>{part}</code> : <span key={index}>{part}</span>,
      )}
    </>
  )
}

export default function BuiltWithPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
      <JsonLd data={templateJsonLd()} />

      <Container size="lg">
        <div className="page-head">
          <Breadcrumbs crumbs={CRUMBS} />
          <Heading level={1} size="2xl" style={{ marginTop: 'var(--vk-space-4)' }}>
            Built with VivekUI
          </Heading>
          <Text size="lg" style={{ marginTop: 'var(--vk-space-4)' }}>
            This entire website is built with VivekUI, a free React component library with
            zero runtime dependencies.
          </Text>
          <Text tone="muted" style={{ marginTop: 'var(--vk-space-4)' }}>
            No Tailwind, no shadcn, no MUI, no CSS-in-JS, and no chart library. One
            install, one CSS import, and the emerald accent you are looking at is seven
            custom properties in <code>globals.css</code>. Every row below deep-links to
            the component’s own documentation page.
          </Text>

          <InstallCommand size="md" />
        </div>
      </Container>

      <Section size="lg" padding="md">
        <Alert
          tone="success"
          variant="soft"
          title="The climate charts need no chart library"
          icon="📈"
        >
          The two “best time to visit” charts on every trip page are{' '}
          <strong>LineChart</strong> and <strong>BarChart</strong>, which ship inside
          VivekUI as pure inline SVG. Nothing is measured in the browser, so they render
          complete in the first HTML response — and each one emits a visually hidden{' '}
          <code>&lt;table&gt;</code> of the real numbers, so a screen reader gets the data
          rather than the word “graphic”. Recharts alone is roughly 100&nbsp;kB; all six
          VivekUI charts together are 8.3&nbsp;kB brotlied.{' '}
          <a href={chartsUrl('builtwith')} target="_blank" rel="noopener noreferrer">
            See the charts documentation
          </a>
          .
        </Alert>
      </Section>

      <Section size="lg" padding="md">
        <Heading level={2} size="lg">
          Section by section
        </Heading>
        <Text tone="muted" style={{ marginTop: '0.35rem', marginBottom: 'var(--vk-space-6)' }}>
          {ROWS.length} rows, covering every part of the site.
        </Text>

        <Table striped hoverable size="sm" stickyHeader>
          <Table.Caption visuallyHidden>
            Each section of the Wanderly template mapped to the VivekUI component that
            builds it, with a link to that component’s documentation.
          </Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Where on the site</Table.HeaderCell>
              <Table.HeaderCell>Component</Table.HeaderCell>
              <Table.HeaderCell>What it does here</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {ROWS.map((row, index) => (
              <Table.Row key={`${row.slug}-${index}`}>
                <Table.Cell label="Where on the site">{row.where}</Table.Cell>
                <Table.Cell label="Component" className="link-cell">
                  <a
                    href={row.chart ? chartsUrl('builtwith') : componentUrl(row.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.name}
                  </a>
                  {row.chart ? (
                    <>
                      {' '}
                      <Badge size="sm" variant="soft" tone="success">
                        chart
                      </Badge>
                    </>
                  ) : null}
                </Table.Cell>
                <Table.Cell label="What it does here">
                  <CodeSpans text={row.what} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      <Section size="lg" padding="lg" background="muted">
        <Heading level={2} size="lg">
          What is not in this project
        </Heading>
        <Text tone="muted" style={{ marginTop: '0.35rem', marginBottom: 'var(--vk-space-6)' }}>
          The dependency list is the point. Run <code>npm ls --omit=dev</code> and this is
          all of it.
        </Text>
        <Card variant="outline" padding="lg">
          <Card.Body>
            <ul className="tick-list">
              {[
                'No Tailwind, no PostCSS plugin, no build-time CSS pipeline',
                'No Radix, no CVA, no clsx',
                'No Recharts, Chart.js, D3 or canvas — the charts are VivekUI',
                'No Emotion or styled-components, so no runtime style computation',
                'No icon package — the star rating and the status glyphs are CSS',
                'Three dependencies in total: next, react, react-dom — plus VivekUI',
              ].map((item) => (
                <li key={item}>
                  <Badge tone="primary" variant="soft" size="sm" aria-hidden="true">
                    ✓
                  </Badge>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Section>

      <Section size="lg" padding="lg">
        <Heading level={2} size="lg">
          Take it
        </Heading>
        <Text tone="muted" style={{ marginTop: '0.35rem', marginBottom: 'var(--vk-space-6)' }}>
          MIT licensed. Clone it, swap <code>data/trips.ts</code>, change the accent
          tokens, ship it. The VivekUI credit in the footer is removable — a star on the
          repository is appreciated instead.
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--vk-space-3)' }}>
          <Button asChild size="lg">
            <a href={docsUrl('builtwith')} target="_blank" rel="noopener noreferrer">
              Read the Docs
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={VIVEKUI.github} target="_blank" rel="noopener noreferrer">
              Star on GitHub
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`${VIVEKUI.repo}/generate`} target="_blank" rel="noopener noreferrer">
              Use this template
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={`${VIVEKUI.repo}/blob/main/DOCUMENTATION.md`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the template docs
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href={authorUrl('builtwith')} target="_blank" rel="noopener noreferrer">
              Vivek Kumar Singh
            </a>
          </Button>
        </div>

        <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-6)' }}>
          Full guide — data model, theming, SEO, AEO and recipes — in{' '}
          <a
            href={`${VIVEKUI.repo}/blob/main/DOCUMENTATION.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            DOCUMENTATION.md
          </a>
          . Public repository: <code>intellectwithvivek/wanderly</code> ·{' '}
          <Link href="/">back to the trips</Link>
        </Text>
      </Section>
    </>
  )
}
