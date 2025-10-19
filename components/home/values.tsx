'use client'

import { motion } from 'framer-motion'
import { Leaf, TestTube, Heart, Sparkles } from 'lucide-react'

const values = [
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description:
      'We believe in transparency. Every ingredient is carefully selected and safe for your skin.',
  },
  {
    icon: TestTube,
    title: 'Science-Backed',
    description:
      'Our formulations are developed with dermatologists and backed by clinical research.',
  },
  {
    icon: Heart,
    title: 'Cruelty-Free',
    description:
      'Never tested on animals. We\'re committed to ethical beauty practices.',
  },
  {
    icon: Sparkles,
    title: 'Real Results',
    description:
      'Visible improvements in skin health, texture, and radiance within weeks.',
  },
]

export function Values() {
  return (
    <section className="py-24 bg-beige">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
            Why Choose NOFILT<span 
              className="inline-block bg-gradient-to-r from-transparent via-[#8B6342] to-[#8B6342] from-20% via-40% bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >R.</span>
          </h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            Premium skincare that delivers on its promises
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent-brown/10 text-accent-brown mb-6 group-hover:bg-accent-brown group-hover:text-white transition-colors">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-3">
                  {value.title}
                </h3>
                <p className="text-ink/60 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

