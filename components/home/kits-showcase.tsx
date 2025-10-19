'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Package, Sparkles, ArrowRight } from 'lucide-react'

const kits = [
  {
    id: 1,
    name: 'Complete Kit',
    subtitle: 'Your Full Skincare Routine',
    description: 'Everything you need for a complete skincare regimen. Perfect for achieving your best skin yet.',
    price: '₹3,999',
    originalPrice: '₹5,496',
    savings: 'Save ₹1,497',
    features: [
      'All 4 essential products',
      'Complete morning & night routine',
      'Premium packaging',
      '2 months supply',
    ],
    badge: 'Best Value',
    icon: Package,
    image: '/products/images/kit-1.png',
    gradient: 'from-accent-brown/30 via-amber-200/50 to-accent-brown/40',
  },
  {
    id: 2,
    name: 'Compact Kit',
    subtitle: 'Travel-Ready Essentials',
    description: 'Your favorite products in travel-friendly sizes. Perfect for maintaining your routine on the go.',
    price: '₹2,499',
    originalPrice: '₹3,200',
    savings: 'Save ₹701',
    features: [
      'Travel-size essentials',
      'TSA-approved packaging',
      'Perfect for trying',
      '2 weeks supply',
    ],
    badge: 'Travel Friendly',
    icon: Sparkles,
    image: '/products/images/kit-2.png',
    gradient: 'from-beige/80 via-accent-brown/20 to-amber-100/60',
  },
]

export function KitsShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-beige/30 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-accent-brown/10 flex items-center justify-center">
              <Package className="w-8 h-8 text-accent-brown" />
            </div>
          </motion.div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
            Curated Kits
          </h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            Complete solutions for your skincare journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {kits.map((kit, index) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <motion.div
                    initial={{ rotate: -12, scale: 0 }}
                    whileInView={{ rotate: -12, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: 'spring' }}
                    className="bg-accent-brown text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                  >
                    {kit.badge}
                  </motion.div>
                </div>

                {/* Kit Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={kit.image} 
                      alt={kit.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Kit image failed to load:', kit.image);
                        // Fallback to gradient background
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="absolute inset-0 bg-gradient-to-br ${kit.gradient} flex items-center justify-center">
                            <div class="text-center space-y-4">
                              <div class="w-32 h-32 mx-auto rounded-2xl bg-white/60 backdrop-blur-md flex items-center justify-center shadow-xl">
                                <div class="w-16 h-16 text-accent-brown">📦</div>
                              </div>
                              <p class="text-sm font-medium text-ink/60">Kit Image</p>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </motion.div>

                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-ink mb-2 group-hover:text-accent-brown transition-colors">
                      {kit.name}
                    </h3>
                    <p className="text-accent-brown font-semibold mb-3">
                      {kit.subtitle}
                    </p>
                    <p className="text-ink/70 leading-relaxed">
                      {kit.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {kit.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.6 + featureIndex * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-brown mt-2 flex-shrink-0" />
                        <span className="text-sm text-ink/60">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-end gap-3 pt-4 border-t border-ink/10">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-ink">
                          {kit.price}
                        </span>
                        <span className="text-lg text-ink/40 line-through">
                          {kit.originalPrice}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">
                        {kit.savings}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="w-full group/btn"
                      asChild
                    >
                      <Link href="/shop">
                        Shop Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

