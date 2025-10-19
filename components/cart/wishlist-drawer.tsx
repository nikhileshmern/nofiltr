'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useWishlistStore } from '@/lib/store/wishlist'
import { useCartStore } from '@/lib/store/cart'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

export function WishlistDrawer() {
  const { 
    isOpen, 
    closeWishlist, 
    items, 
    removeItem, 
    getTotalItems 
  } = useWishlistStore()
  
  const { addItem: addToCart, openCart } = useCartStore()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleAddToCart = (item: any) => {
    addToCart({
      id: `${item.productId}-${Date.now()}`,
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
    })
    openCart()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ink/10 p-6">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent-brown" />
                  <h2 className="text-lg font-semibold font-display">
                    Wishlist ({getTotalItems()})
                  </h2>
                </div>
                <Button variant="ghost" size="icon" onClick={closeWishlist}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close wishlist</span>
                </Button>
              </div>

              {/* Wishlist Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <div className="rounded-full bg-beige p-6">
                      <Heart className="h-12 w-12 text-ink/40" />
                    </div>
                    <div>
                      <p className="font-medium">Your wishlist is empty</p>
                      <p className="text-sm text-ink/60 mt-1">
                        Save products you love for later
                      </p>
                    </div>
                    <Button onClick={closeWishlist} asChild>
                      <Link href="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 rounded-xl border border-ink/10 p-4"
                      >
                        <Link
                          href={`/products/${item.slug}`}
                          className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg"
                          onClick={closeWishlist}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={closeWishlist}
                              className="font-medium hover:text-accent-brown transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-ink/60 mt-1">
                              {formatPrice(item.price)}
                            </p>
                            <p className="text-xs text-ink/40 mt-1">
                              Added {new Date(item.addedAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Add to Cart Button */}
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(item)}
                              className="bg-accent-brown hover:bg-accent-brown/90 text-white"
                            >
                              <ShoppingBag className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>

                            {/* Remove Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-ink/10 p-6 space-y-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={closeWishlist}
                    asChild
                  >
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
