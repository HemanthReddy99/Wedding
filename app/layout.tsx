import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hemanth & Samantha — 30 August 2026',
  description: 'Join us as we celebrate our wedding day.',
  openGraph: {
    title: 'Hemanth & Samantha — 30 August 2026',
    description: 'Join us as we celebrate our wedding day.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </head>
      <body>
        {children}
        <Script id="youtube-iframe-api" src="https://www.youtube.com/iframe_api" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
