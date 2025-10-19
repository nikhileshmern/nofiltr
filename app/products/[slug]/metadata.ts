import { Metadata } from 'next'

// Product data (same as in page.tsx)
const productsData = [
  {
    id: 'complete-kit',
    name: 'NOFILTR. Complete Kit',
    slug: 'complete-kit',
    category: 'Full Routine',
    shortDescription: 'Everything you need for a complete skincare regimen',
    description: 'Our Complete Kit includes all four of our essential products, carefully curated to provide a comprehensive skincare routine. Perfect for those starting their NOFILTR. journey or looking for a complete solution.',
    price: 3999,
    originalPrice: 5496,
    savings: 1497,
    image: '/products/complete-kit.jpg',
    badge: 'Best Value',
    type: 'kit',
    rating: 4.8,
    reviewCount: 1247,
  },
  {
    id: 'face-cleanser',
    name: 'NOFILTR. Face Cleanser',
    slug: 'face-cleanser',
    category: 'Cleanser',
    shortDescription: 'Gentle yet effective daily cleanser for all skin types',
    description: 'Our Face Cleanser is formulated to gently remove impurities, makeup, and excess oil without stripping your skin\'s natural moisture barrier. Suitable for all skin types, including sensitive skin.',
    price: 999,
    image: '/products/face-cleanser.png',
    type: 'product',
    size: '100ml',
    rating: 4.6,
    reviewCount: 892,
  }
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = productsData.find((p) => p.slug === params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  const title = `${product.name} | NOFILTR. - Premium Skincare`
  const description = `${product.shortDescription} ${product.description.substring(0, 150)}...`
  const keywords = [
    'skincare',
    'beauty',
    'NOFILTR',
    product.category.toLowerCase(),
    product.name.toLowerCase(),
    'premium skincare',
    'clean beauty',
    'dermatologist recommended',
    'natural ingredients',
    'skincare routine',
    'beauty products',
    'skin care',
    'face care',
    'body care'
  ]

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'NOFILTR.' }],
    creator: 'NOFILTR.',
    publisher: 'NOFILTR.',
    openGraph: {
      type: 'website',
      title,
      description,
      url: `/products/${product.slug}`,
      siteName: 'NOFILTR.',
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
      creator: '@nofiltr',
    },
    alternates: {
      canonical: `/products/${product.slug}`,
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
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'INR',
      'product:availability': 'in stock',
      'product:condition': 'new',
      'product:brand': 'NOFILTR.',
      'product:category': product.category,
    },
  }
}
