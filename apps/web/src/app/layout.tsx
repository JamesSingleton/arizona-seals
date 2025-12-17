import '@workspace/ui/globals.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { Suspense } from 'react'
import { preconnect, prefetchDNS } from 'react-dom'

import { FooterServer, FooterSkeleton } from '@/components/footer'
import { NavbarServer, NavbarSkeleton } from '@/components/navbar'
import { PreviewBar } from '@/components/preview-bar'
import { Providers } from '@/components/providers'
import { SanityLive } from '@/lib/sanity/live'

const fontGeist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  preconnect('https://cdn.sanity.io')
  prefetchDNS('https://cdn.sanity.io')
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontGeist.variable} ${fontMono.variable} font-geist antialiased`}>
        <Providers>
          <Suspense fallback={<NavbarSkeleton />}>
            <NavbarServer />
          </Suspense>
          {(await draftMode()).isEnabled ? (
            <>
              {children}
              <PreviewBar />
              <VisualEditing />
            </>
          ) : (
            children
          )}
          <Suspense fallback={<FooterSkeleton />}>
            <FooterServer />
          </Suspense>
          <SanityLive />
        </Providers>
      </body>
    </html>
  )
}
