/**
 * One structured-data block.
 *
 * Every `<` is rewritten to its unicode escape before the JSON reaches the DOM.
 * Our data is hand-written rather than user-supplied, so this is belt and braces —
 * but it is the one line that stops a stray `</script>` in a future trip
 * description from ending the script element early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
