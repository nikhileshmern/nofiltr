'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const articles = [
  {
    title: 'Understanding Your Skin Type',
    excerpt: 'Learn how to identify your skin type and choose the right products.',
    slug: 'understanding-your-skin-type',
    readTime: '5 min read',
  },
  {
    title: 'The Science of Skincare',
    excerpt: 'Discover the key ingredients that transform your skin.',
    slug: 'science-of-skincare',
    readTime: '7 min read',
  },
]

export function JournalTeaser() {
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
            From the Journal
          </h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            Expert insights, tips, and skincare knowledge
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {articles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/journal/${article.slug}`}>
                <div className="bg-white rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4">
                    <span className="text-sm text-accent-brown font-medium">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-ink mb-3 group-hover:text-accent-brown transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-ink/60 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-accent-brown group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/journal">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

