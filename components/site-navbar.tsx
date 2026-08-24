'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge, Button, Navbar, ThemeToggle, Tooltip } from '@the_viveksingh/vivek-ui'

import { GitHubMark, Logo } from '@/components/logo'
import { NAV, VIVEKUI, docsUrl } from '@/data/site'

/**
 * The site bar.
 *
 * A Client Component for exactly one reason: `usePathname` is what sets
 * `aria-current="page"` on the link you are already on. `Navbar.Link asChild`
 * hands the anchor over to `next/link`, so client-side navigation still works
 * without the library depending on a router.
 */
export function SiteNavbar() {
  const pathname = usePathname()

  return (
    <Navbar sticky container="xl">
      <Navbar.Brand asChild>
        <Link href="/" aria-label="Wanderly — home">
          <Logo id="nav" size="1.6rem" />
          <strong className="nav-wordmark" style={{ letterSpacing: '-0.02em' }}>
            Wanderly
          </strong>
        </Link>
      </Navbar.Brand>

      <Navbar.Links>
        {NAV.map((item) => (
          <Navbar.Link
            key={item.href}
            asChild
            active={
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            }
          >
            <Link href={item.href}>{item.label}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Links>

      <Navbar.Actions>
        <a
          href={docsUrl('navbar')}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
          title="VivekUI — the component library this site is built with"
        >
          <Badge tone="primary" variant="soft" pill>
            ⚡ <span className="nav-credit-long">Built with </span>VivekUI
          </Badge>
        </a>

        {/*
          The template's own source, one click from every page.

          No `aria-label`: the visible word IS the name, which is what WCAG 2.5.3
          wants, and the Tooltip supplies the longer explanation as a description.
          Below 768px the label is hidden the visually-hidden way rather than with
          `display: none`, so the bar stays narrow and the link keeps its name.
        */}
        <Tooltip content="Source on GitHub — clone this template">
          <Button asChild variant="ghost" size="sm">
            <a href={VIVEKUI.repo} target="_blank" rel="noopener noreferrer">
              <GitHubMark />
              <span className="nav-repo-label">Code</span>
            </a>
          </Button>
        </Tooltip>

        <Button asChild size="sm">
          <Link href="/plan">Plan a trip</Link>
        </Button>
        <ThemeToggle mode="cycle" />
        <Navbar.Toggle />
      </Navbar.Actions>
    </Navbar>
  )
}
