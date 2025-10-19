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
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/checkout')
  }

  const relatedProducts = getRelatedProducts(product, 4)

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

          {/* Product Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 ">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-accent-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-accent-brown font-medium mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-ink mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-ink font-medium">{product.rating}</span>
                  <span className="text-ink/60">({product.reviewCount} Reviews)</span>
                </div>

                <p className="text-ink/70 text-lg mb-6">{product.shortDescription}</p>
                
                <p className="text-ink/60 text-sm mb-6">
                  Highly rated by customers for: {product.tags?.slice(0, 3).join(', ')}
                </p>
              </div>

              {/* Benefits Section */}
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

              {/* Price Section */}
              <div className="bg-white border border-ink/10 rounded-lg p-6 relative">
                <div className="absolute -top-3 left-4 bg-white px-2">
                  <span className="text-sm font-semibold text-ink">PRICE</span>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-ink font-medium">MRP</span>
                    <span className="text-lg text-ink/60 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-3xl font-bold text-ink">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="bg-accent-brown text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {product.discount}% Off
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleAddToCart}
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    className="flex-1 bg-accent-brown hover:bg-accent-brown/90 text-white"
                    onClick={handleBuyNow}
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-ink mb-8 text-center">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-ink mb-2">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-ink">₹{relatedProduct.price.toLocaleString()}</span>
                        <span className="text-sm text-ink/60 line-through">₹{relatedProduct.originalPrice.toLocaleString()}</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
