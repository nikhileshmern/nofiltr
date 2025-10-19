'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ShoppingBag, CreditCard } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { trackEvent } from '@/components/analytics'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_at_price: number | null
  main_image_url: string
  hover_image_url: string | null
}

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { addItem, openCart } = useCartStore()

  useEffect(() => {
    setIsClient(true)
    console.log('ProductCard rendered with:', {
      name: product.name,
      image: product.main_image_url,
      index
    })
  }, [product.name, product.main_image_url, index])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.main_image_url,
      slug: product.slug,
    })

    trackEvent.addToCart(product.id, product.name, product.price, 1)
    openCart()
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Add item to cart first
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.main_image_url,
      slug: product.slug,
    })

    trackEvent.addToCart(product.id, product.name, product.price, 1)
    
    // Navigate to checkout
    router.push('/checkout')
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          {/* Image Container */}
          <div
            className="relative aspect-square overflow-hidden bg-gray-100 group "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
           
            
            {/* Main Product Image with Zoom Effect */}
            <img
              src={product.main_image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            {product.hover_image_url && product.hover_image_url !== product.main_image_url && (
              <Image
                src={product.hover_image_url}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            )}

            {/* Discount Badge */}
            {isClient && product.compare_at_price && product.compare_at_price > product.price && (
              <div className="absolute top-4 right-4 bg-accent-brown text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                {Math.round(
                  ((product.compare_at_price - product.price) /
                    product.compare_at_price) *
                    100
                )}% Off
              </div>
            )}

          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="font-display text-lg font-semibold text-ink mb-2 group-hover:text-accent-brown transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-ink">
                {formatPrice(product.price)}
              </span>
              {isClient && product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-sm text-ink/40 line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
                size="sm"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                className="flex-1 bg-accent-brown hover:bg-accent-brown/90 text-white"
                onClick={handleBuyNow}
                size="sm"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </Link>

    </motion.div>
  )
}

