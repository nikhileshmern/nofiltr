export interface Product {
  id: string
  name: string
  slug: string
  category: string
  shortDescription: string
  description: string
  price: number
  originalPrice: number
  discount: number
  image: string
  hoverImage?: string
  badge?: string
  type: 'individual' | 'kit'
  rating: number
  reviewCount: number
  inStock: boolean
  size?: string
  ingredients?: string[]
  benefits?: string[]
  howToUse?: string
  keyIngredients?: string[]
  detailedIngredients?: Array<{
    name: string
    description: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  includes?: string[]
  specifications?: Record<string, string>
  tags?: string[]
  featured?: boolean
  bestseller?: boolean
  newArrival?: boolean
}

export const products: Product[] = [
  // Individual Products
  {
    id: 'face-cleanser',
    name: 'NOFILTR. Face Cleanser',
    slug: 'face-cleanser',
    category: 'Cleanser',
    shortDescription: 'Gentle yet effective daily cleanser for all skin types',
    description: 'Our Face Cleanser is formulated to gently remove impurities, makeup, and excess oil without stripping your skin\'s natural moisture barrier. Suitable for all skin types, including sensitive skin.',
    price: 999,
    originalPrice: 1199,
    discount: 17,
    image: '/products/images/face-cleanser.png',
    hoverImage: '/products/images/face-cleanser-hover.jpg',
    badge: 'Best Seller',
    type: 'individual',
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    size: '100ml',
    ingredients: ['Salicylic Acid', 'Niacinamide', 'Hyaluronic Acid'],
    benefits: [
      'Removes excess oil and impurities',
      'Prevents breakouts and blackheads',
      'Maintains skin\'s natural pH balance',
      'Suitable for sensitive skin'
    ],
    howToUse: 'Apply to wet face, massage gently for 30 seconds, then rinse with lukewarm water. Use morning and evening.',
    keyIngredients: ['Salicylic Acid', 'Niacinamide', 'Hyaluronic Acid'],
    detailedIngredients: [
      { name: 'Salicylic Acid', description: 'Exfoliates and unclogs pores' },
      { name: 'Niacinamide', description: 'Reduces oil production and inflammation' },
      { name: 'Hyaluronic Acid', description: 'Provides deep hydration' }
    ],
    faqs: [
      {
        question: 'Is this suitable for sensitive skin?',
        answer: 'Yes, our Face Cleanser is formulated to be gentle on all skin types, including sensitive skin.'
      },
      {
        question: 'How often should I use this?',
        answer: 'Use twice daily - once in the morning and once in the evening for best results.'
      }
    ],
    specifications: {
      'Volume': '100ml',
      'Skin Type': 'All skin types',
      'Key Benefits': 'Oil control, pore cleansing, hydration'
    },
    tags: ['cleanser', 'oil-control', 'sensitive-skin'],
    featured: true,
    bestseller: true
  },
  {
    id: 'body-moisturizer',
    name: 'NOFILTR. Body Moisturizer',
    slug: 'body-moisturizer',
    category: 'Moisturizer',
    shortDescription: 'Lightweight, non-greasy moisturizer for all-day hydration',
    description: 'Our Body Moisturizer provides 24-hour hydration without leaving a greasy residue. Enriched with natural ingredients to keep your skin soft and supple.',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    image: '/products/images/body-moisturizer.png',
    hoverImage: '/products/images/body-moisturizer.png',
    badge: 'New',
    type: 'individual',
    rating: 4.5,
    reviewCount: 634,
    inStock: true,
    size: '200ml',
    ingredients: ['Shea Butter', 'Vitamin E', 'Glycerin'],
    benefits: [
      '24-hour hydration',
      'Non-greasy formula',
      'Quick absorption',
      'Suitable for all skin types'
    ],
    howToUse: 'Apply to clean, dry skin after showering. Massage gently until absorbed.',
    keyIngredients: ['Shea Butter', 'Vitamin E', 'Glycerin'],
    detailedIngredients: [
      { name: 'Shea Butter', description: 'Deep moisturization and skin protection' },
      { name: 'Vitamin E', description: 'Antioxidant protection and skin repair' },
      { name: 'Glycerin', description: 'Attracts and retains moisture' }
    ],
    faqs: [
      {
        question: 'Is this suitable for oily skin?',
        answer: 'Yes, our lightweight formula is designed to hydrate without clogging pores.'
      }
    ],
    specifications: {
      'Volume': '200ml',
      'Skin Type': 'All skin types',
      'Key Benefits': 'Hydration, non-greasy, quick absorption'
    },
    tags: ['moisturizer', 'hydration', 'body-care'],
    featured: true
  },
  {
    id: 'sun-protector',
    name: 'NOFILTR. Sun Protector',
    slug: 'sun-protector',
    category: 'SPF 50+ Sunscreen',
    shortDescription: 'Broad spectrum SPF 50+ protection for daily use',
    description: 'Our Sun Protector offers broad spectrum SPF 50+ protection against UVA and UVB rays. Lightweight, non-greasy formula perfect for daily use.',
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    image: '/products/images/sunscreen.png',
    hoverImage: '/products/images/sunscreen.png',
    type: 'individual',
    rating: 4.7,
    reviewCount: 456,
    inStock: true,
    size: '50ml',
    ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin C'],
    benefits: [
      'SPF 50+ protection',
      'Broad spectrum coverage',
      'Water-resistant',
      'Non-comedogenic'
    ],
    howToUse: 'Apply liberally 15 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating.',
    keyIngredients: ['Zinc Oxide', 'Titanium Dioxide', 'Vitamin C'],
    detailedIngredients: [
      { name: 'Zinc Oxide', description: 'Physical sunscreen protection' },
      { name: 'Titanium Dioxide', description: 'Additional UV protection' },
      { name: 'Vitamin C', description: 'Antioxidant protection' }
    ],
    faqs: [
      {
        question: 'Is this water-resistant?',
        answer: 'Yes, our Sun Protector is water-resistant for up to 80 minutes.'
      }
    ],
    specifications: {
      'Volume': '50ml',
      'SPF': '50+',
      'Protection': 'Broad spectrum UVA/UVB',
      'Water Resistance': '80 minutes'
    },
    tags: ['sunscreen', 'spf50', 'sun-protection'],
    featured: true
  },
  {
    id: 'lip-balm',
    name: 'NOFILTR. Lip Balm',
    slug: 'lip-balm',
    category: 'Lip Care',
    shortDescription: 'Nourishing lip balm with natural ingredients',
    description: 'Keep your lips soft and protected with our nourishing lip balm. Enriched with natural ingredients to provide long-lasting moisture.',
    price: 899,
    originalPrice: 1099,
    discount: 18,
    image: '/products/images/lipbalm.png',
    hoverImage: '/products/images/lipbalm.png',
    type: 'individual',
    rating: 4.4,
    reviewCount: 234,
    inStock: true,
    size: '15g',
    ingredients: ['Beeswax', 'Coconut Oil', 'Vitamin E'],
    benefits: [
      'Long-lasting moisture',
      'Natural ingredients',
      'SPF protection',
      'Non-sticky formula'
    ],
    howToUse: 'Apply to lips as needed throughout the day.',
    keyIngredients: ['Beeswax', 'Coconut Oil', 'Vitamin E'],
    detailedIngredients: [
      { name: 'Beeswax', description: 'Natural emollient and protective barrier' },
      { name: 'Coconut Oil', description: 'Deep moisturization' },
      { name: 'Vitamin E', description: 'Antioxidant protection' }
    ],
    specifications: {
      'Weight': '15g',
      'Key Benefits': 'Moisturization, protection, natural ingredients'
    },
    tags: ['lip-care', 'moisturizer', 'natural'],
    featured: true
  },

  // Kit Products
  {
    id: 'complete-kit',
    name: 'NOFILTR. Complete Kit',
    slug: 'complete-kit',
    category: 'Skincare Kit',
    shortDescription: 'Everything you need for a complete skincare regimen',
    description: 'Our Complete Kit includes all four of our essential products, carefully curated to provide a comprehensive skincare routine. Perfect for those starting their NOFILTR. journey or looking for a complete solution.',
    price: 3999,
    originalPrice: 5496,
    discount: 27,
    image: '/products/images/kit-1.png',
    hoverImage: '/products/images/kit-1.png',
    badge: 'Best Value',
    type: 'kit',
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    includes: [
      'NOFILTR. Face Cleanser (100ml)',
      'NOFILTR. Body Moisturizer (200ml)',
      'NOFILTR. Sun Protector SPF 50+ (50ml)',
      'NOFILTR. Lip Balm (15g)'
    ],
    benefits: [
      'Complete morning and evening routine',
      'Save 27% compared to buying individually',
      'Premium gift packaging included',
      '2 months supply for daily use'
    ],
    howToUse: 'Morning: Cleanse with Face Cleanser, apply Sun Protector, and Lip Balm. Evening: Cleanse, then apply Body Moisturizer.',
    ingredients: ['Hyaluronic Acid', 'Vitamin C', 'Niacinamide', 'SPF 50+'],
    keyIngredients: ['Hyaluronic Acid', 'Vitamin C', 'Niacinamide', 'SPF 50+'],
    detailedIngredients: [
      { name: 'Hyaluronic Acid', description: 'Deep hydration and plumping' },
      { name: 'Vitamin C', description: 'Brightening and antioxidant protection' },
      { name: 'Niacinamide', description: 'Pore minimizing and oil control' },
      { name: 'SPF 50+', description: 'Broad spectrum sun protection' }
    ],
    faqs: [
      {
        question: 'What are product specifications?',
        answer: 'The Complete Kit includes 4 full-size products with a total value of ₹5,496. Each product is dermatologist-tested and suitable for all skin types.'
      },
      {
        question: 'Can this product be used by men & women both?',
        answer: 'Yes, our products are designed for all genders and skin types. The formulations are unisex and work effectively for everyone.'
      }
    ],
    specifications: {
      'Total Value': '₹5,496',
      'Savings': '₹1,497 (27% off)',
      'Products Included': '4 full-size products',
      'Skin Type': 'All skin types',
      'Duration': '2 months supply'
    },
    tags: ['kit', 'complete-routine', 'best-value', 'gift'],
    featured: true,
    bestseller: true
  },
  {
    id: 'compact-kit',
    name: 'NOFILTR. Compact Kit',
    slug: 'compact-kit',
    category: 'Travel Kit',
    shortDescription: 'Essential skincare for travel and on-the-go',
    description: 'Perfect for travel or those who prefer a minimal routine. This compact kit includes our most essential products in travel-friendly sizes.',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    image: '/products/images/kit-2.png',
    hoverImage: '/products/images/kit-2.png',
    badge: 'Travel Essential',
    type: 'kit',
    rating: 4.6,
    reviewCount: 567,
    inStock: true,
    includes: [
      'NOFILTR. Face Cleanser (50ml)',
      'NOFILTR. Body Moisturizer (100ml)',
      'NOFILTR. Sun Protector SPF 50+ (30ml)'
    ],
    benefits: [
      'Travel-friendly sizes',
      'Essential skincare routine',
      'TSA compliant',
      'Save 24% compared to individual purchase'
    ],
    howToUse: 'Perfect for travel or minimal routines. Use as needed for your skincare routine.',
    ingredients: ['Salicylic Acid', 'Hyaluronic Acid', 'SPF 50+'],
    keyIngredients: ['Salicylic Acid', 'Hyaluronic Acid', 'SPF 50+'],
    detailedIngredients: [
      { name: 'Salicylic Acid', description: 'Gentle exfoliation and pore cleansing' },
      { name: 'Hyaluronic Acid', description: 'Lightweight hydration' },
      { name: 'SPF 50+', description: 'Daily sun protection' }
    ],
    faqs: [
      {
        question: 'Is this TSA compliant?',
        answer: 'Yes, all products in the Compact Kit are TSA compliant and perfect for carry-on travel.'
      },
      {
        question: 'How long will this kit last?',
        answer: 'The Compact Kit provides approximately 1 month of daily use.'
      }
    ],
    specifications: {
      'Total Value': '₹3,299',
      'Savings': '₹800 (24% off)',
      'Products Included': '3 travel-size products',
      'Travel Friendly': 'TSA compliant',
      'Duration': '1 month supply'
    },
    tags: ['travel', 'compact', 'essential', 'tsa-compliant'],
    featured: true
  }
]

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured)
}

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.bestseller)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category)
}

export const getRelatedProducts = (currentProduct: Product, limit: number = 4): Product[] => {
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || product.type === currentProduct.type)
    )
    .slice(0, limit)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
