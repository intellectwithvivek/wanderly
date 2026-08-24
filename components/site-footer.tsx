import { Button, Footer, Text } from '@the_viveksingh/vivek-ui'

import { InstallCommand } from '@/components/install-command'
import { GitHubMark, Logo } from '@/components/logo'
import { SITE, VIVEKUI, authorUrl, docsUrl } from '@/data/site'
import { trips } from '@/data/trips'

/**
 * The site footer, and the permanent home of the VivekUI credit.
 *
 * A Server Component — `Footer` needs no client boundary, and neither does the
 * `CopyButton` inside `InstallCommand`, which carries its own.
 */
export function SiteFooter() {
  return (
    <Footer
      navLabel="Footer"
      headingLevel={2}
      columns={[
        {
          title: 'Destinations',
          links: trips.map((trip) => ({
            label: trip.name,
            href: `/destinations/${trip.slug}`,
          })),
        },
        {
          title: 'Wanderly',
          links: [
            { label: 'All destinations', href: '/destinations' },
            { label: 'Plan a trip', href: '/plan' },
            { label: 'Built with VivekUI', href: '/built-with' },
            { label: 'Source on GitHub', href: VIVEKUI.repo, target: '_blank' },
            {
              label: 'Use this template',
              href: `${VIVEKUI.repo}/generate`,
              target: '_blank',
            },
          ],
        },
        {
          title: 'VivekUI',
          links: [
            { label: 'Documentation', href: docsUrl('footer'), target: '_blank' },
            { label: 'npm package', href: VIVEKUI.npm, target: '_blank' },
            { label: 'Library on GitHub', href: VIVEKUI.github, target: '_blank' },
            { label: 'Vivek Kumar Singh', href: authorUrl('footer'), target: '_blank' },
          ],
        },
      ]}
      brand={
        <div>
          <Text
            as="p"
            weight="semibold"
            size="lg"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.35rem',
            }}
          >
            <Logo id="footer" size="1.5rem" />
            Wanderly
          </Text>
          <Text tone="muted" size="sm">
            {SITE.tagline} Six destinations, six to twelve travellers, no coaches.
          </Text>

          <Text size="sm" style={{ marginTop: 'var(--vk-space-4)' }}>
            {VIVEKUI.blurb}
          </Text>
          <InstallCommand />

          {/* The repository, spelled out rather than buried in a link column. */}
          <div style={{ marginTop: 'var(--vk-space-4)' }}>
            <Button asChild variant="outline" size="sm">
              <a href={VIVEKUI.repo} target="_blank" rel="noopener noreferrer">
                <GitHubMark />
                <span>intellectwithvivek/wanderly</span>
              </a>
            </Button>
            <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-2)' }}>
              Public repository — clone it, swap <code>data/trips.ts</code>, ship it.
            </Text>
          </div>
        </div>
      }
      copyright={`© ${SITE.founded}–2026 Wanderly — a free MIT-licensed Next.js template by Vivek Kumar Singh. The VivekUI credit is removable; a star on GitHub is appreciated.`}
    />
  )
}
