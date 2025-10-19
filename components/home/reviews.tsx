'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    text: "Best cleanser I've ever used! My skin feels so soft and clean without being stripped.",
    product: 'Daily Face Cleanser',
  },
  {
    name: 'Ananya Patel',
    rating: 5,
    text: 'The moisturizer is a game-changer. My dry skin has never looked better!',
    product: 'Daily Moisturizer',
  },
  {
    name: 'Kavya Reddy',
    rating: 5,
    text: 'Finally found a brand I can trust. Clean ingredients and amazing results.',
    product: 'Daily Face Cleanser',
  },
]

export function Reviews() {
  return (
    <section className="py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            Real reviews from real customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-beige rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent-brown text-accent-brown"
                  />
                ))}
              </div>
              <p className="text-ink mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="border-t border-ink/10 pt-4">
                <p className="font-semibold text-ink">{review.name}</p>
                <p className="text-sm text-ink/60">{review.product}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

