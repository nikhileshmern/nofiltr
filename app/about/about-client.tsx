'use client'

import { motion } from 'framer-motion'

const differentiators = [
  {
    title: 'Transparency',
    description: 'We list every ingredient and explain exactly what it does for your skin. No secrets, no marketing fluff.'
  },
  {
    title: 'Science-Backed',
    description: 'Our formulations are based on clinical research and tested for real results, not just good marketing.'
  },
  {
    title: 'Sustainability',
    description: "From recyclable packaging to responsible sourcing, we're committed to protecting our planet."
  },
  {
    title: 'Direct-to-You',
    description: 'By selling directly, we skip the middleman markup and deliver premium quality at fair prices.'
  }
]

export function AboutClient() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl font-bold text-ink mb-8"
          >
            About NOFILTR<span className="text-accent-brown">.</span>
          </motion.h1>

          <div className="prose prose-lg max-w-none space-y-8 text-ink/80">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display text-3xl font-semibold text-ink mb-4">
                Our Story
              </h2>
              <p className="leading-relaxed">
                NOFILTR. was born from a simple belief: your skin deserves
                products that are as honest as they are effective. In a world
                full of filters and false promises, we decided to do things
                differently.
              </p>
              <p className="leading-relaxed">
                Founded in 2024, we set out to create a skincare brand that
                combines clean ingredients with proven science, all wrapped in a
                design that's as beautiful as the results you'll see.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-beige rounded-2xl p-8 my-12"
            >
              <h2 className="font-display text-3xl font-semibold text-ink mb-4">
                Our Philosophy
              </h2>
              <p className="leading-relaxed">
                <strong>Clean Beauty, Real Results.</strong> We believe you
                shouldn't have to choose between safety and efficacy. Every
                product we create is:
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent-brown font-bold">•</span>
                  <span>Formulated with premium, clinically-proven ingredients</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-brown font-bold">•</span>
                  <span>Free from harmful chemicals and unnecessary additives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-brown font-bold">•</span>
                  <span>Developed in collaboration with dermatologists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-brown font-bold">•</span>
                  <span>Never tested on animals</span>
                </li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="font-display text-3xl font-semibold text-ink mb-4">
                What Makes Us Different
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {differentiators.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="bg-white border border-ink/10 rounded-2xl p-6"
                  >
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-ink/70">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <h2 className="font-display text-3xl font-semibold text-ink mb-4">
                Our Commitment
              </h2>
              <p className="leading-relaxed">
                We're not just selling skincare—we're building a community of
                people who believe in authenticity. Every product, every
                ingredient, every decision is made with your skin's health in
                mind.
              </p>
              <p className="leading-relaxed">
                Because when it comes to skincare, we believe in showing your
                real skin—no filter needed.
              </p>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="text-center py-12 bg-beige rounded-2xl mt-12"
            >
              <p className="text-2xl font-display font-semibold text-ink mb-2">
                Your Skin, Your Story.
              </p>
              <p className="text-ink/70">
                Join thousands who've already discovered the NOFILTR. difference.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

