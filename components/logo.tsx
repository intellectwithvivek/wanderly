/**
 * The Wanderly mark: the site's own boarding-pass motif — a punched notch either
 * side and a perforated tear line — with a compass star for the "wander" half.
 *
 * Inline rather than an `<img src="/logo.svg">` so it costs no extra request, scales
 * with `font-size`, and can be recoloured from CSS.
 *
 * `id` is required because the gradient and the mask need document-unique ids, and
 * the mark renders twice on every page (navbar and footer). Taking the suffix as a
 * prop keeps this a Server Component — `useId` would be the other way to do it, and
 * it would drag a `'use client'` boundary along for the sake of a logo.
 */
export function Logo({
  id,
  size = '1.5em',
  className,
}: {
  id: string
  size?: string
  className?: string
}) {
  const bg = `wl-bg-${id}`
  const notch = `wl-notch-${id}`

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flex: 'none' }}
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#065f46" />
        </linearGradient>
        <mask id={notch}>
          <rect width="64" height="64" fill="#fff" />
          <circle cx="0" cy="47" r="5.5" fill="#000" />
          <circle cx="64" cy="47" r="5.5" fill="#000" />
        </mask>
      </defs>

      <rect width="64" height="64" rx="14" fill={`url(#${bg})`} mask={`url(#${notch})`} />

      <path
        d="M9 47h46"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 4.5"
      />

      <path
        d="M32 10.5 35.8 22.6 47.5 26.5 35.8 30.4 32 42.5 28.2 30.4 16.5 26.5 28.2 22.6Z"
        fill="#ffffff"
      />
    </svg>
  )
}

/** The GitHub glyph, for the repository link in the navbar and footer. */
export function GitHubMark({ size = '1.05em' }: { size?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      style={{ display: 'block', flex: 'none' }}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.995 7.995 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}
