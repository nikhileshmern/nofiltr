'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'
import { trackEvent } from '@/components/analytics'
import { ShoppingBag, Truck, Shield, Sparkles } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compare_at_price: number | null
  inventory_quantity: number
  main_image_url: string
  volume: string
  benefits: string[]
}

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem, openCart } = useCartStore()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.main_image_url,
      slug: product.slug,
      quantity,
    })

    trackEvent.addToCart(product.id, product.name, product.price, quantity)

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    })

    openCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
          {product.name}
        </h1>
        <p className="text-lg text-ink/70 leading-relaxed">{product.description}</p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-ink">
          {formatPrice(product.price)}
        </span>
        {product.compare_at_price && product.compare_at_price > product.price && (
          <>
            <span className="text-xl text-ink/40 line-through">
              {formatPrice(product.compare_at_price)}
            </span>
            <span className="bg-accent-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
              Save{' '}
              {Math.round(
                ((product.compare_at_price - product.price) /
                  product.compare_at_price) *
                  100
              )}
              %
            </span>
          </>
        )}
      </div>

      {/* Volume */}
      <div className="text-ink/60">
        <span className="font-medium">Volume:</span> {product.volume}
      </div>

      {/* Benefits */}
      {product.benefits && product.benefits.length > 0 && (
        <div>
          <h3 className="font-semibold text-ink mb-3">Key Benefits</h3>
          <ul className="space-y-2">
            {product.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-ink/70">
                <Sparkles className="h-5 w-5 text-accent-brown flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-medium text-ink">Quantity:</label>
          <div className="flex items-center border-2 border-ink/20 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-ink/5 transition-colors"
            >
              -
            </button>
            <span className="px-6 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="px-4 py-2 hover:bg-ink/5 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={handleAddToCart}>
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-ink/10">
        <div className="text-center">
          <Truck className="h-6 w-6 text-accent-brown mx-auto mb-2" />
          <p className="text-xs text-ink/60">Free Shipping</p>
        </div>
        <div className="text-center">
          <Shield className="h-6 w-6 text-accent-brown mx-auto mb-2" />
          <p className="text-xs text-ink/60">Quality Assured</p>
        </div>
        <div className="text-center">
          <Sparkles className="h-6 w-6 text-accent-brown mx-auto mb-2" />
          <p className="text-xs text-ink/60">Clean Ingredients</p>
        </div>
      </div>
    </motion.div>
  )
}

