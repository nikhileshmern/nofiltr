import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { WishlistDrawer } from '@/components/cart/wishlist-drawer'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/analytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Satoshi font temporarily disabled - download from https://www.fontshare.com/fonts/satoshi
// and place Satoshi-Variable.woff2 in public/fonts/ to enable
// const satoshi = localFont({
//   src: [
//     {
//       path: '../public/fonts/Satoshi-Variable.woff2',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-satoshi',
//   display: 'swap',
// })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'NOFILTR. | Premium Skincare for Your Natural Glow',
    template: '%s | NOFILTR.',
  },
  description:
    'Discover clean, effective skincare backed by science. NOFILTR. offers premium formulations for radiant, healthy skin.',
  keywords: [
    'skincare',
    'clean beauty',
    'premium skincare',
    'natural skincare',
    'NOFILTR',
    'face cleanser',
    'moisturizer',
    'D2C skincare',
  ],
  authors: [{ name: 'NOFILTR.' }],
  creator: 'NOFILTR.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'NOFILTR. | Premium Skincare',
    description: 'Clean, effective skincare backed by science.',
    siteName: 'NOFILTR.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOFILTR. | Premium Skincare',
    description: 'Clean, effective skincare backed by science.',
    creator: '@nofiltr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <WishlistDrawer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

