'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, Package, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/store/cart'

// Smart product recommendations based on cart analysis
const getRecommendations = (cartItems: any[]) => {
  const allProducts = [
    {
      id: 'complete-kit',
      name: 'NOFILTR. Complete Kit',
      slug: 'complete-kit',
      price: 3999,
      originalPrice: 5496,
      image: '/products/complete-kit.jpg',
      category: 'kit',
      tags: ['complete', 'routine', 'value'],
      description: 'Everything you need for a complete skincare regimen'
    },
    {
      id: 'compact-kit',
      name: 'NOFILTR. Compact Kit',
      slug: 'compact-kit',
      price: 2499,
      originalPrice: 3200,
      image: '/products/compact-kit.jpg',
      category: 'kit',
      tags: ['travel', 'compact', 'routine'],
      description: 'Your favorite products in travel-friendly sizes'
    },
    {
      id: 'face-cleanser',
      name: 'NOFILTR. Face Cleanser',
      slug: 'face-cleanser',
      price: 999,
      image: '/products/face-cleanser.jpg',
      category: 'cleanser',
      tags: ['cleanser', 'daily', 'gentle'],
      description: 'Gentle yet effective daily cleanser for all skin types'
    },
    {
      id: 'body-moisturizer',
      name: 'NOFILTR. Body Moisturizer',
      slug: 'body-moisturizer',
      price: 1299,
      image: '/products/body-moisturizer.jpg',
      category: 'moisturizer',
      tags: ['moisturizer', 'hydration', 'body'],
      description: 'Deep hydration for smooth, supple skin'
    },
    {
      id: 'sun-protector',
      name: 'NOFILTR. Sun Protector',
      slug: 'sun-protector',
      price: 1499,
      image: '/products/sun-protector.jpg',
      category: 'sunscreen',
      tags: ['sunscreen', 'spf', 'protection'],
      description: 'Broad spectrum protection for daily sun defense'
    },
    {
      id: 'lip-balm',
      name: 'NOFILTR. Lip Balm',
      slug: 'lip-balm',
      price: 899,
      image: '/products/lip-balm.jpg',
      category: 'lip-care',
      tags: ['lip', 'balm', 'nourishing'],
      description: 'Nourishing care for soft, healthy lips'
    }
  ]

  // Smart recommendation logic
  const cartCategories = cartItems.map(item => {
    const product = allProducts.find(p => p.name.includes(item.name.split(' ')[1] || ''))
    return product?.category
  }).filter(Boolean)

  const cartTags = cartItems.flatMap(item => {
    const product = allProducts.find(p => p.name.includes(item.name.split(' ')[1] || ''))
    return product?.tags || []
  })

  // Filter out items already in cart
  const availableProducts = allProducts.filter(product => 
    !cartItems.some(item => item.name === product.name)
  )

  // Smart scoring algorithm
  const scoredProducts = availableProducts.map(product => {
    let score = 0
    
    // Category matching
    if (cartCategories.includes(product.category)) {
      score += 3
    }
    
    // Tag matching
    const matchingTags = product.tags.filter(tag => cartTags.includes(tag))
    score += matchingTags.length * 2
    
    // Kit recommendations for individual products
    if (cartItems.length >= 2 && product.category === 'kit') {
      score += 5
    }
    
    // Complementary products
    if (product.category === 'sunscreen' && cartCategories.includes('cleanser')) {
      score += 4
    }
    if (product.category === 'moisturizer' && cartCategories.includes('cleanser')) {
      score += 3
    }
    if (product.category === 'lip-care' && cartItems.length >= 1) {
      score += 2
    }
    
    // Value-based recommendations
    if (product.category === 'kit' && cartItems.length >= 2) {
      score += 6 // Strong recommendation for kits when multiple items in cart
    }
    
    return { ...product, score }
  })

  // Sort by score and return top 4
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}

interface CartRecommendationsProps {
  cartItems: any[]
}

export function CartRecommendations({ cartItems }: CartRecommendationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const { addItem, openCart } = useCartStore()

  useEffect(() => {
    const recs = getRecommendations(cartItems)
    setRecommendations(recs)
  }, [cartItems])

  if (recommendations.length === 0) return null

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length)
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    })
  }

  const getRecommendationTitle = () => {
    const hasKit = cartItems.some(item => item.name.includes('Kit'))
    const hasIndividual = cartItems.some(item => !item.name.includes('Kit'))
    
    if (hasIndividual && !hasKit) {
      return "Complete Your Routine"
    }
    if (hasKit) {
      return "Perfect Additions"
    }
    return "You May Also Like"
  }

  const getRecommendationSubtitle = () => {
    const hasKit = cartItems.some(item => item.name.includes('Kit'))
    const hasIndividual = cartItems.some(item => !item.name.includes('Kit'))
    
    if (hasIndividual && !hasKit) {
      return "Save more with our complete kits"
    }
    if (hasKit) {
      return "These products pair perfectly with your selection"
    }
    return "Smart recommendations just for you"
  }

  return (
    <div className="border-t border-ink/10 bg-gradient-to-br from-beige/20 to-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-accent-brown" />
        <h3 className="font-display text-lg font-semibold text-ink">
          {getRecommendationTitle()}
        </h3>
      </div>
      <p className="text-sm text-ink/60 mb-4">
        {getRecommendationSubtitle()}
      </p>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <motion.div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {recommendations.map((product, index) => (
              <div key={product.id} className="w-full flex-shrink-0 px-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-ink/10 p-4 hover:shadow-lg transition-all duration-300 mx-1"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/products/${product.slug}`} className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-1 right-1 bg-accent-brown text-white text-xs px-1.5 py-0.5 rounded">
                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${product.slug}`}>
                        <h4 className="font-medium text-ink hover:text-accent-brown transition-colors line-clamp-2">
                          {product.name}
                        </h4>
                      </Link>
                      <p className="text-sm text-ink/60 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-ink">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-ink/40 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-accent-brown hover:bg-accent-brown/90 text-white"
                        >
                          <Package className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        {recommendations.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border-ink/20 hover:bg-white hover:border-ink/40 shadow-lg hover:shadow-xl transition-all duration-200 z-20"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4 text-ink/70" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border-ink/20 hover:bg-white hover:border-ink/40 shadow-lg hover:shadow-xl transition-all duration-200 z-20"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4 text-ink/70" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {recommendations.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {recommendations.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-accent-brown w-6' 
                    : 'bg-ink/20 hover:bg-ink/40'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Special Offer Banner */}
      {cartItems.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-gradient-to-r from-accent-brown/10 to-accent-brown/5 border border-accent-brown/20 rounded-lg p-3"
        >
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-accent-brown" />
            <span className="text-sm font-medium text-ink">
              💡 Pro Tip: Complete your routine with our kits and save up to 27%!
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
