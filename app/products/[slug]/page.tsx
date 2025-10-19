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

          {/* Product Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 mt-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden bg-gray-50 group rounded-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out rounded-2xl"
                  priority
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-accent-brown text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
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

          {/* Ingredients Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-ink mb-8">Ingredients</h2>
            <div className="space-y-4">
              {/* Key Ingredients */}
              <div className="border border-ink/10 rounded-lg">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedIngredient(expandedIngredient === 0 ? null : 0)}
                >
                  <span className="text-lg font-semibold text-ink">Key Ingredients</span>
                  {expandedIngredient === 0 ? (
                    <ChevronUp className="w-5 h-5 text-ink/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-ink/60" />
                  )}
                </button>
                {expandedIngredient === 0 && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.keyIngredients?.map((ingredient, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-accent-brown rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-ink">{ingredient}</h4>
                            {product.detailedIngredients?.[index] && (
                              <p className="text-sm text-ink/70 mt-1">
                                {product.detailedIngredients[index].description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* All Ingredients */}
              <div className="border border-ink/10 rounded-lg">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedIngredient(expandedIngredient === 1 ? null : 1)}
                >
                  <span className="text-lg font-semibold text-ink">All Ingredients</span>
                  {expandedIngredient === 1 ? (
                    <ChevronUp className="w-5 h-5 text-ink/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-ink/60" />
                  )}
                </button>
                {expandedIngredient === 1 && (
                  <div className="px-6 pb-6">
                    <p className="text-ink/70 leading-relaxed">
                      {product.ingredients?.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* You Might Also Like */}
          {relatedProducts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-ink mb-8">You might also like</h2>
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
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-ink">₹{relatedProduct.price.toLocaleString()}</span>
                        <span className="text-sm text-ink/60 line-through">₹{relatedProduct.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          size="sm"
                        >
                          Select Size
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Customer Reviews */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-ink mb-8">Customer Reviews</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const starRating = product.rating;
                    const fullStars = Math.floor(starRating);
                    const hasPartialStar = starRating % 1 !== 0;
                    const partialStarIndex = fullStars;
                    
                    if (i < fullStars) {
                      // Full star
                      return (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                        />
                      );
                    } else if (i === partialStarIndex && hasPartialStar) {
                      // Partial star
                      const fillPercentage = (starRating % 1) * 100;
                      return (
                        <div key={i} className="relative w-6 h-6">
                          <Star className="w-6 h-6 text-gray-300" />
                          <div 
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${fillPercentage}%` }}
                          >
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                          </div>
                        </div>
                      );
                    } else {
                      // Empty star
                      return (
                        <Star
                          key={i}
                          className="w-6 h-6 text-gray-300"
                        />
                      );
                    }
                  })}
                </div>
                <span className="text-2xl font-bold text-ink">{product.rating}</span>
                <span className="text-ink/60">({product.reviewCount} reviews)</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {(() => {
                      // Calculate realistic review distribution based on rating
                      const totalReviews = product.reviewCount;
                      const averageRating = product.rating;
                      
                      // Generate realistic distribution that matches the average rating
                      const distribution = [0, 0, 0, 0, 0]; // [5-star, 4-star, 3-star, 2-star, 1-star]
                      
                      if (averageRating >= 4.5) {
                        // High rating: mostly 5 and 4 stars
                        distribution[4] = Math.floor(totalReviews * 0.6); // 5-star
                        distribution[3] = Math.floor(totalReviews * 0.3); // 4-star
                        distribution[2] = Math.floor(totalReviews * 0.08); // 3-star
                        distribution[1] = Math.floor(totalReviews * 0.015); // 2-star
                        distribution[0] = Math.floor(totalReviews * 0.005); // 1-star
                      } else if (averageRating >= 4.0) {
                        // Good rating: mix of 5, 4, and 3 stars
                        distribution[4] = Math.floor(totalReviews * 0.4); // 5-star
                        distribution[3] = Math.floor(totalReviews * 0.4); // 4-star
                        distribution[2] = Math.floor(totalReviews * 0.15); // 3-star
                        distribution[1] = Math.floor(totalReviews * 0.04); // 2-star
                        distribution[0] = Math.floor(totalReviews * 0.01); // 1-star
                      } else {
                        // Lower rating: more spread out
                        distribution[4] = Math.floor(totalReviews * 0.2); // 5-star
                        distribution[3] = Math.floor(totalReviews * 0.3); // 4-star
                        distribution[2] = Math.floor(totalReviews * 0.25); // 3-star
                        distribution[1] = Math.floor(totalReviews * 0.15); // 2-star
                        distribution[0] = Math.floor(totalReviews * 0.1); // 1-star
                      }
                      
                      // Ensure total matches
                      const currentTotal = distribution.reduce((sum, count) => sum + count, 0);
                      const difference = totalReviews - currentTotal;
                      if (difference > 0) {
                        distribution[4] += difference; // Add remaining to 5-star
                      }
                      
                      return [5, 4, 3, 2, 1].map((stars, index) => {
                        const count = distribution[4 - index]; // Reverse order
                        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                        
                        return (
                          <div key={stars} className="flex items-center gap-4">
                            <span className="text-sm font-medium text-ink w-8">{stars}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-ink/60 w-12">{count}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Write a review
                  </Button>
                  <Button variant="outline" className="w-full">
                    See review summary
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-ink mb-4">Popular topics</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags?.slice(0, 6).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-ink/70 rounded-full text-sm hover:bg-accent-brown hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-100 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-accent-brown/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-accent-brown">
                            {String.fromCharCode(64 + review)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-ink">Customer {review}</span>
                            <span className="text-sm text-ink/60">•</span>
                            <span className="text-sm text-ink/60">25-30, Female, Oily Skin, Mumbai</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                          <h4 className="font-semibold text-ink mb-2">
                            {review === 1 ? 'Great product, works as expected' : 
                             review === 2 ? 'Amazing results in just 2 weeks' : 
                             'Perfect for my skin type'}
                          </h4>
                          <p className="text-ink/70 mb-3">
                            {review === 1 ? 'I\'ve been using this product for a month now and I can see visible improvements. The texture is smooth and it doesn\'t feel heavy on my skin.' :
                             review === 2 ? 'This is exactly what I was looking for. My skin feels much better and the results are visible within just 2 weeks of regular use.' :
                             'Highly recommend this product. It\'s gentle on my sensitive skin and gives great results without any irritation.'}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-ink/60">
                            <span>03/10/23</span>
                            <span>Was this review helpful?</span>
                            <Button variant="ghost" size="sm">Yes</Button>
                            <Button variant="ghost" size="sm">No</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-ink mb-8">FAQs</h2>
            <div className="space-y-4">
              {product.faqs?.map((faq, index) => (
                <div key={index} className="border border-ink/10 rounded-lg">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="text-lg font-semibold text-ink">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-ink/60" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-ink/60" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-ink/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
