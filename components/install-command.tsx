import { Code, CopyButton } from '@the_viveksingh/vivek-ui'

import { VIVEKUI } from '@/data/site'

/**
 * `npm i @the_viveksingh/vivek-ui` with a copy button, which appears in the
 * footer and again on /built-with. Defined once so the two cannot drift.
 */
export function InstallCommand({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <span className="promo">
      <Code size={size === 'md' ? 'md' : 'sm'}>{VIVEKUI.installCommand}</Code>
      <CopyButton
        value={VIVEKUI.installCommand}
        variant="outline"
        size="sm"
        label="Copy"
        copiedLabel="Copied"
      />
    </span>
  )
}
