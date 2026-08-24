import type { Metadata, Viewport } from 'next'
import { ThemeProvider, ToastProvider, themeScript } from '@the_viveksingh/vivek-ui'

import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { SiteFooter } from '@/components/site-footer'
import { SiteNavbar } from '@/components/site-navbar'
import { OG_IMAGE, SITE } from '@/data/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Wanderly — Small-Group Trips to Six Places Worth the Flight',
    template: '%s · Wanderly',
  },
  description:
    'Wanderly runs small-group trips to Bali, Santorini, Kyoto, the Swiss Alps, Ladakh and Iceland. Day-by-day itineraries, honest best-time-to-visit climate data, and no coaches.',
  applicationName: 'Wanderly',
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Wanderly',
    locale: SITE.locale,
    url: '/',
    title: 'Wanderly — Small-Group Trips to Six Places Worth the Flight',
    description:
      'Six curated trips, day-by-day itineraries, and month-by-month climate charts so you book the right week — not just the right place.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
    creator: SITE.twitter,
  },
  robots: { index: true, follow: true },
  category: 'travel',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ecfdf5' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Blocking, and deliberately so. The server does not know which theme this
          visitor chose, so without this the browser paints the default before
          hydration can correct it. No amount of React fixes a first paint.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <ToastProvider position="bottom-end" duration={6000}>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <SiteNavbar />
            <main id="main">{children}</main>
            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
