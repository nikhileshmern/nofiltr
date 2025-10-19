'use client'

import React, { useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Share2, Check, Sparkles, Package, Star, ChevronDown, ChevronUp, Plus, Minus, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug, getRelatedProducts } from '@/lib/data/products'

// Enhanced product data with all sections
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
    includes: [
      'NOFILTR. Face Cleanser (100ml)',
      'NOFILTR. Body Moisturizer (200ml)',
      'NOFILTR. Sun Protector SPF 50+ (50ml)',
      'NOFILTR. Lip Balm (15g)',
    ],
    benefits: [
      'Complete morning and evening routine',
      'Save 27% compared to buying individually',
      'Premium gift packaging included',
      '2 months supply for daily use',
    ],
    howToUse: 'Morning: Cleanse with Face Cleanser, apply Sun Protector, and Lip Balm. Evening: Cleanse, then apply Body Moisturizer.',
    ingredients: 'Each product contains carefully selected clean ingredients. See individual products for complete ingredient lists.',
    keyIngredients: ['Hyaluronic Acid', 'Vitamin C', 'Niacinamide', 'SPF 50+'],
    detailedIngredients: [
      { name: 'Hyaluronic Acid', description: 'Deep hydration and plumping' },
      { name: 'Vitamin C', description: 'Brightening and antioxidant protection' },
      { name: 'Niacinamide', description: 'Pore minimizing and oil control' },
      { name: 'SPF 50+', description: 'Broad spectrum sun protection' },
    ],
    faqs: [
      {
        question: 'What are product specifications?',
        answer: 'The Complete Kit includes 4 full-size products with a total value of ₹5,496. Each product is dermatologist-tested and suitable for all skin types.'
      },
      {
        question: 'Can this product be used by men & women both?',
        answer: 'Yes, our products are designed for all genders and skin types. The formulations are unisex and work effectively for everyone.'
      },
      {
        question: 'What is the recommended age for using this product?',
        answer: 'Our products are suitable for ages 16 and above. For younger users, we recommend consulting with a dermatologist first.'
      },
      {
        question: 'Is this product pregnancy safe?',
        answer: 'Yes, all our products are pregnancy-safe. However, we recommend consulting with your healthcare provider before starting any new skincare routine during pregnancy.'
      }
    ],
    specifications: {
      dimensions: '25cm x 15cm x 8cm',
      country: 'India',
      sku: 'NOF-CK-001',
      manufacturer: 'NOFILTR. Cosmetics Pvt Ltd',
      address: '123 Beauty Street, Mumbai, Maharashtra 400001',
      contact: 'care@nofiltr.com, +91-9876543210'
    }
  },
  {
    id: 'face-cleanser',
    name: 'NOFILTR. Face Cleanser',
    slug: 'face-cleanser',
    category: 'Cleanser',
    shortDescription: 'Gentle yet effective daily cleanser for all skin types',
    description: 'Our Face Cleanser is formulated to gently remove impurities, makeup, and excess oil without stripping your skin&apos;s natural moisture barrier. Suitable for all skin types, including sensitive skin.',
    price: 999,
    image: '/products/face-cleanser.png',
    type: 'product',
    size: '100ml',
    rating: 4.6,
    reviewCount: 892,
    benefits: [
      'Removes dirt and impurities',
      'Maintains skin\'s pH balance',
      'Non-drying formula',
      'Suitable for all skin types',
      'Fragrance-free',
    ],
    howToUse: 'Apply to damp face, massage gently in circular motions, then rinse thoroughly with lukewarm water. Use morning and evening.',
    ingredients: 'Aqua, Glycerin, Sodium Cocoyl Glutamate, Niacinamide, Hyaluronic Acid, Aloe Vera Extract, Panthenol.',
    keyIngredients: ['Niacinamide', 'Hyaluronic Acid', 'Aloe Vera'],
    detailedIngredients: [
      { name: 'Niacinamide', description: 'Reduces pores and controls oil production' },
      { name: 'Hyaluronic Acid', description: 'Provides deep hydration' },
      { name: 'Aloe Vera', description: 'Soothes and calms the skin' },
    ],
    faqs: [
      {
        question: 'Is this cleanser suitable for sensitive skin?',
        answer: 'Yes, our Face Cleanser is specifically formulated for sensitive skin with gentle, non-irritating ingredients.'
      },
      {
        question: 'Can I use this cleanser twice daily?',
        answer: 'Absolutely! This cleanser is designed for twice-daily use - morning and evening.'
      }
    ],
    specifications: {
      dimensions: '8cm x 4cm x 15cm',
      country: 'India',
      sku: 'NOF-FC-001',
      manufacturer: 'NOFILTR. Cosmetics Pvt Ltd',
      address: '123 Beauty Street, Mumbai, Maharashtra 400001',
      contact: 'care@nofiltr.com, +91-9876543210'
    }
  }
]

// Related products data
const relatedProducts = [
  {
    id: 'body-moisturizer',
    name: 'NOFILTR. Body Moisturizer',
    category: 'Moisturizer',
    price: 1299,
    image: '/products/body-moisturizer.jpg',
    description: 'Deep hydration for smooth, supple skin'
  },
  {
    id: 'sun-protector',
    name: 'NOFILTR. Sun Protector',
    category: 'SPF 50+ Sunscreen',
    price: 1499,
    image: '/products/sun-protector.jpg',
    description: 'Broad spectrum protection for daily sun defense'
  },
  {
    id: 'vitamin-c-serum',
    name: 'NOFILTR. Vitamin C Serum',
    category: 'Serum',
    price: 1899,
    image: '/products/vitamin-c-serum.jpg',
    description: 'Brightening and antioxidant protection'
  },
  {
    id: 'niacinamide-serum',
    name: 'NOFILTR. Niacinamide Serum',
    category: 'Serum',
    price: 1699,
    image: '/products/niacinamide-serum.jpg',
    description: 'Pore minimizing and oil control'
  }
]

// Customer reviews data
const customerReviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    title: 'Amazing results!',
    review: 'I\'ve been using this for 2 months and my skin has never looked better. The cleanser is so gentle yet effective.',
    date: '2 months ago',
    verified: true,
    age: '28',
    skinType: 'Combination',
    skinConcern: 'Acne',
    helpful: 12
  },
  {
    id: 2,
    name: 'Raj Patel',
    rating: 4,
    title: 'Great product',
    review: 'Really good quality and fast delivery. My skin feels clean and fresh after using this.',
    date: '1 month ago',
    verified: true,
    age: '32',
    skinType: 'Oily',
    skinConcern: 'Blackheads',
    helpful: 8
  },
  {
    id: 3,
    name: 'Anita Singh',
    rating: 5,
    title: 'Love it!',
    review: 'Perfect for my sensitive skin. No irritation and leaves my skin feeling soft and clean.',
    date: '3 weeks ago',
    verified: true,
    age: '25',
    skinType: 'Sensitive',
    skinConcern: 'Redness',
    helpful: 15
  }
]

interface Props {
  params: { slug: string }
}

export default function ProductPage({ params }: Props) {
  const { slug } = params
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [expandedFaq, setExpandedFaq] = useState<string | number | null>(null)
  const [expandedIngredient, setExpandedIngredient] = useState<number | null>(null)
  const { addItem } = useCartStore()
  const router = useRouter()

  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      quantity,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      quantity,
    })
    router.push('/checkout')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm mt-8">
            <ol className="flex items-center space-x-2 text-ink/60">
              <li>
                <Link href="/" className="hover:text-accent-brown transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/shop" className="hover:text-accent-brown transition-colors">
                  Shop
                </Link>
              </li>
              <li>/</li>
              <li className="text-ink">{product.name}</li>
            </ol>
          </nav>

          {/* Product Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 ">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-accent-brown/20 via-beige to-accent-brown/30 sticky top-32">
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-6 right-6 z-10 bg-accent-brown text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.badge}
                  </div>
                )}
                
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4">
                      {product.type === 'kit' ? (
                        <Package className="w-16 h-16 text-accent-brown" />
                      ) : (
                        <Sparkles className="w-16 h-16 text-accent-brown" />
                      )}
                    </div>
                    <p className="text-sm text-ink/50">Product Image Placeholder</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <p className="text-accent-brown font-semibold mb-2">{product.category}</p>
                <h1 className="font-display text-4xl font-bold text-ink mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-ink">{product.rating}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-ink/60 text-sm">{product.reviewCount} Reviews</span>
                </div>

                <p className="text-lg text-ink/70 mb-4">{product.shortDescription}</p>
                <p className="text-ink/60 text-sm mb-4">
                  Highly rated by customers for: {product.category.toLowerCase()}, results, quality
                </p>
                <div className="space-y-4">
                  <h2 className="font-bold text-xl text-ink">
                    {product.type === 'kit' 
                      ? 'Complete skincare routine in one kit' 
                      : 'Reduces Acne, Blackheads & Excessive Oil'
                    }
                  </h2>
                  
                  <p className="text-ink/70">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-brown flex-shrink-0" />
                      <span className="text-sm text-ink/70">Fragrance free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-brown flex-shrink-0" />
                      <span className="text-sm text-ink/70">Essential oil free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-brown flex-shrink-0" />
                      <span className="text-sm text-ink/70">Non-comedogenic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-brown flex-shrink-0" />
                      <span className="text-sm text-ink/70">Dermatologist tested</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-white border border-ink/10 rounded-lg p-6 relative">
                <div className="absolute -top-3 left-4 bg-white px-2">
                  <span className="text-sm font-semibold text-ink">PRICE</span>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-ink font-medium">MRP</span>
                    <span className="text-lg text-ink/60 line-through">
                      ₹{product.originalPrice?.toLocaleString() || (product.price * 1.2).toFixed(0)}
                    </span>
                    <span className="text-3xl font-bold text-ink">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="bg-accent-brown text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {product.originalPrice 
                        ? `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off`
                        : '10% Off'
                      }
                    </span>
                  </div>
                  
                  <p className="text-sm text-ink/60">(incl. of all taxes)</p>
                  
                  {product.size && (
                    <p className="text-sm text-ink/60">Size: {product.size}</p>
                  )}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-ink">Quantity:</label>
                  <div className="flex items-center border border-ink/20 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-beige transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-2 border-x border-ink/20">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-beige transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 text-base"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-accent-brown hover:bg-accent-brown/90 text-white"
                    onClick={handleBuyNow}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button size="lg" variant="outline" className="flex-1">
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>


              {/* Expandable Details Sections */}
              <div className="space-y-2">
                {/* What Makes It Potent? */}
                <div className="border border-ink/10 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === 'potent' ? null : 'potent')}
                    className="w-full flex items-center justify-between p-4 hover:bg-beige/30 transition-colors"
                  >
                    <span className="font-medium text-ink text-left">What Makes It Potent?</span>
                    {expandedFaq === 'potent' ? (
                      <ChevronUp className="w-5 h-5 text-ink/60" />
                    ) : (
                      <Plus className="w-5 h-5 text-ink/60" />
                    )}
                  </button>
                  {expandedFaq === 'potent' && (
                    <div className="px-4 pb-4">
                      <p className="text-ink/70">
                        Our advanced formulation combines {product.keyIngredients?.join(', ')} for maximum efficacy. 
                        Each ingredient is carefully selected and clinically tested to deliver visible results.
                      </p>
                    </div>
                  )}
                </div>

                {/* Ideal For */}
                <div className="border border-ink/10 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === 'ideal' ? null : 'ideal')}
                    className="w-full flex items-center justify-between p-4 hover:bg-beige/30 transition-colors"
                  >
                    <span className="font-medium text-ink text-left">Ideal For</span>
                    {expandedFaq === 'ideal' ? (
                      <ChevronUp className="w-5 h-5 text-ink/60" />
                    ) : (
                      <Plus className="w-5 h-5 text-ink/60" />
                    )}
                  </button>
                  {expandedFaq === 'ideal' && (
                    <div className="px-4 pb-4">
                      <p className="text-ink/70">
                        Perfect for {product.category.toLowerCase()} and suitable for all skin types. 
                        Ideal for those looking for {product.shortDescription.toLowerCase()}.
                      </p>
                    </div>
                  )}
                </div>

                {/* How to Use */}
                <div className="border border-ink/10 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === 'usage' ? null : 'usage')}
                    className="w-full flex items-center justify-between p-4 hover:bg-beige/30 transition-colors"
                  >
                    <span className="font-medium text-ink text-left">How to Use</span>
                    {expandedFaq === 'usage' ? (
                      <ChevronUp className="w-5 h-5 text-ink/60" />
                    ) : (
                      <Plus className="w-5 h-5 text-ink/60" />
                    )}
                  </button>
                  {expandedFaq === 'usage' && (
                    <div className="px-4 pb-4">
                      <p className="text-ink/70">{product.howToUse}</p>
                    </div>
                  )}
                </div>

                {/* Consumer Studies */}
                <div className="border border-ink/10 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === 'studies' ? null : 'studies')}
                    className="w-full flex items-center justify-between p-4 hover:bg-beige/30 transition-colors"
                  >
                    <span className="font-medium text-ink text-left">Consumer Studies</span>
                    {expandedFaq === 'studies' ? (
                      <ChevronUp className="w-5 h-5 text-ink/60" />
                    ) : (
                      <Plus className="w-5 h-5 text-ink/60" />
                    )}
                  </button>
                  {expandedFaq === 'studies' && (
                    <div className="px-4 pb-4">
                      <p className="text-ink/70">
                        Clinical studies show {product.rating}/5 satisfaction rate with {product.reviewCount} verified reviews. 
                        {product.rating >= 4.5 ? ' Highly recommended by dermatologists and beauty experts.' : ' Proven results with consistent use.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* GOES WELL WITH Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-ink">GOES WELL WITH</h3>
                <div className="bg-white border border-ink/10 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-20 bg-gradient-to-br from-accent-brown/20 to-beige rounded flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto rounded bg-white/60 backdrop-blur-sm flex items-center justify-center mb-1">
                          <Sparkles className="w-4 h-4 text-accent-brown" />
                        </div>
                        <p className="text-xs text-ink/50">Product</p>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <p className="text-lg font-bold text-ink">₹299</p>
                      <p className="text-sm text-ink/70 mb-2">Salicylic Acid + LHA 2% Cleanser</p>
                      <Button size="sm" className="bg-ink text-white hover:bg-ink/90">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Included (for kits) */}
              {product.includes && (
                <div className="bg-white border border-ink/10 rounded-2xl p-6 space-y-3">
                  <h3 className="font-semibold text-lg text-ink">What&apos;s Included:</h3>
                  <ul className="space-y-2">
                    {product.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Package className="w-5 h-5 text-accent-brown flex-shrink-0 mt-0.5" />
                        <span className="text-ink/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Ingredients Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-ink mb-8">Ingredients</h2>
            <div className="space-y-4">
              {product.detailedIngredients?.map((ingredient, index) => (
                <div key={index} className="border border-ink/10 rounded-lg">
                  <button
                    onClick={() => setExpandedIngredient(expandedIngredient === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-beige/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Plus className="w-4 h-4 text-accent-brown" />
                      <span className="font-medium text-ink">{ingredient.name}</span>
                    </div>
                    {expandedIngredient === index ? (
                      <ChevronUp className="w-5 h-5 text-ink/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-ink/60" />
                    )}
                  </button>
                  {expandedIngredient === index && (
                    <div className="px-4 pb-4">
                      <p className="text-ink/70">{ingredient.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-ink mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white border border-ink/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-gradient-to-br from-accent-brown/20 to-beige flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-2">
                        <Sparkles className="w-8 h-8 text-accent-brown" />
                      </div>
                      <p className="text-xs text-ink/50">Product Image</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-ink mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-ink/60 mb-2">{relatedProduct.description}</p>
                    <p className="text-lg font-bold text-ink mb-3">From ₹{relatedProduct.price.toLocaleString()}</p>
                    <Button className="w-full" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Customer Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl font-bold text-ink">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-ink">{product.rating}</span>
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-beige/30 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-lg text-ink mb-4">Rating Distribution</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-ink/70 w-8">{star}★</span>
                    <div className="flex-1 bg-white rounded-full h-2">
                      <div 
                        className="bg-accent-brown h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-ink/70 w-8">{Math.floor(Math.random() * 50)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {customerReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-ink/10 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent-brown/20 rounded-full flex items-center justify-center">
                      <span className="text-accent-brown font-semibold">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-ink">{review.name}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Verified Buyer
                          </span>
                        )}
                        <span className="text-sm text-ink/60">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <h4 className="font-medium text-ink mb-2">{review.title}</h4>
                      <p className="text-ink/70 mb-3">{review.review}</p>
                      <div className="flex items-center gap-4 text-sm text-ink/60 mb-3">
                        <span>Age: {review.age}</span>
                        <span>Skin Type: {review.skinType}</span>
                        <span>Skin Concern: {review.skinConcern}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-ink/60">Was this review helpful?</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">Yes ({review.helpful})</Button>
                          <Button size="sm" variant="outline">No (0)</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-ink mb-8">FAQs</h2>
            <div className="space-y-4">
              {product.faqs?.map((faq, index) => (
                <div key={index} className="border border-ink/10 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 hover:bg-beige/30 transition-colors"
                  >
                    <span className="font-medium text-ink text-left">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-ink/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-ink/60" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-ink/70">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Product Specifications */}
            <div className="mt-8 bg-beige/30 rounded-2xl p-6">
              <h3 className="font-semibold text-lg text-ink mb-4">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-ink/60">Product dimensions (cm):</span>
                  <span className="ml-2 text-ink">{product.specifications?.dimensions}</span>
                </div>
                <div>
                  <span className="text-ink/60">Country of origin:</span>
                  <span className="ml-2 text-ink">{product.specifications?.country}</span>
                </div>
                <div>
                  <span className="text-ink/60">SKU code:</span>
                  <span className="ml-2 text-ink">{product.specifications?.sku}</span>
                </div>
                <div>
                  <span className="text-ink/60">Manufactured & marketed by:</span>
                  <span className="ml-2 text-ink">{product.specifications?.manufacturer}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-ink/60">Consumer Care address:</span>
                  <span className="ml-2 text-ink">{product.specifications?.address}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-ink/60">Consumer Care email/phone:</span>
                  <span className="ml-2 text-ink">{product.specifications?.contact}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}