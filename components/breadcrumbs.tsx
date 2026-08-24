import { Fragment } from 'react'
import Link from 'next/link'
import { Breadcrumb } from '@the_viveksingh/vivek-ui'

import type { Crumb } from '@/data/schema'

/**
 * The trail, in the compound form so each hop is a `next/link` rather than a plain
 * anchor — the `items` shorthand renders real `<a>` elements, which would cost a
 * full page load on every crumb.
 *
 * Separators are explicit here: the shorthand inserts them for you, the compound
 * form does not.
 */
export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
  const last = crumbs.length - 1

  return (
    <Breadcrumb size="sm" label="Breadcrumb">
      {crumbs.map((crumb, index) =>
        index === last ? (
          <Breadcrumb.Item key={crumb.path} current>
            {crumb.name}
          </Breadcrumb.Item>
        ) : (
          <Fragment key={crumb.path}>
            <Breadcrumb.Item asChild>
              <Link href={crumb.path}>{crumb.name}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
          </Fragment>
        ),
      )}
    </Breadcrumb>
  )
}
