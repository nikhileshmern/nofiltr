'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Sparkles, Package } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/products/product-card'
import { products } from '@/lib/data/products'

export default function ShopPage() {
  const [filter, setFilter] = useState<'all' | 'kits' | 'products'>('all')

  const filteredProducts = products.filter((product) => {
    if (filter === 'all') return true
    if (filter === 'kits') return product.type === 'kit'
    if (filter === 'products') return product.type === 'individual'
    return true
  })

  const kits = products.filter((p) => p.type === 'kit')
  const individualProducts = products.filter((p) => p.type === 'individual')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-beige/10 to-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-ink mb-4">
            Shop All
          </h1>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            Discover our full collection of premium skincare products
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="min-w-[120px]"
          >
            All Products
          </Button>
          <Button
            variant={filter === 'kits' ? 'default' : 'outline'}
            onClick={() => setFilter('kits')}
            className="min-w-[120px]"
          >
            <Package className="w-4 h-4 mr-2" />
            Kits
          </Button>
          <Button
            variant={filter === 'products' ? 'default' : 'outline'}
            onClick={() => setFilter('products')}
            className="min-w-[120px]"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Individual
          </Button>
        </motion.div>

        {/* Kits Section */}
        {(filter === 'all' || filter === 'kits') && (
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl font-bold text-ink mb-8 flex items-center gap-2"
            >
              <Package className="w-8 h-8 text-accent-brown" />
              Curated Kits
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {kits.map((kit, index) => (
                <motion.div
                  key={kit.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Badge */}
                    {kit.badge && (
                      <div className="absolute top-6 right-6 z-10 bg-accent-brown text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        {kit.badge}
                      </div>
                    )}

                    {/* Kit Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={kit.image} 
                        alt={kit.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Kit image failed to load:', kit.image);
                          // Fallback to gradient background
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="absolute inset-0 bg-gradient-to-br from-accent-brown/20 via-beige to-accent-brown/30 flex items-center justify-center">
                              <div class="text-center">
                                <div class="w-24 h-24 mx-auto rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-3">
                                  <div class="w-12 h-12 text-accent-brown">📦</div>
                                </div>
                                <p class="text-sm text-ink/50">Kit Image</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="mb-4">
                        <p className="text-sm text-accent-brown font-semibold mb-1">
                          {kit.category}
                        </p>
                        <h3 className="font-display text-2xl font-bold text-ink mb-2">
                          {kit.name}
                        </h3>
                        <p className="text-ink/60">{kit.description}</p>
                      </div>

                      <div className="mb-6 pb-6 border-b border-ink/10">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-ink">
                            ₹{kit.price.toLocaleString()}
                          </span>
                          <span className="text-lg text-ink/40 line-through">
                            ₹{kit.originalPrice?.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          Save ₹{(kit.originalPrice - kit.price).toLocaleString()}
                        </span>
                      </div>

                      <Button className="w-full group/btn" size="lg" asChild>
                        <Link href={`/products/${kit.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Individual Products Section */}
        {(filter === 'all' || filter === 'products') && (
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl font-bold text-ink mb-8 flex items-center gap-2"
            >
              <Sparkles className="w-8 h-8 text-accent-brown" />
              Individual Products
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {individualProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    compare_at_price: product.originalPrice,
                    main_image_url: product.image,
                    hover_image_url: product.hoverImage || null
                  }} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

