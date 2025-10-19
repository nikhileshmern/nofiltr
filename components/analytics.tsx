'use client'

import Script from 'next/script'

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Analytics event tracking functions
export const trackEvent = {
  viewItem: (productId: string, productName: string, price: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'INR',
        value: price,
        items: [
          {
            item_id: productId,
            item_name: productName,
            price: price,
          },
        ],
      })
    }
  },
  addToCart: (productId: string, productName: string, price: number, quantity: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'INR',
        value: price * quantity,
        items: [
          {
            item_id: productId,
            item_name: productName,
            price: price,
            quantity: quantity,
          },
        ],
      })
    }
  },
  beginCheckout: (items: any[], total: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'INR',
        value: total,
        items: items,
      })
    }
  },
  purchase: (orderId: string, total: number, items: any[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        currency: 'INR',
        value: total,
        items: items,
      })
    }
  },
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

