'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

type Article = {
  title: string
  excerpt: string
  slug: string
  readTime: string
  date: string
  category: string
}

export function JournalClient({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
              The Journal
            </h1>
            <p className="text-lg text-ink/60">
              Expert insights, tips, and skincare knowledge
            </p>
          </motion.div>

          <div className="space-y-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-b border-ink/10 pb-8 last:border-0"
              >
                <Link href={`/journal/${article.slug}`}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-accent-brown font-medium">
                        {article.category}
                      </span>
                      <span className="text-ink/40">•</span>
                      <span className="text-ink/60">{article.date}</span>
                      <span className="text-ink/40">•</span>
                      <span className="text-ink/60">{article.readTime}</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-ink group-hover:text-accent-brown transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-ink/70 text-lg leading-relaxed">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center text-accent-brown font-medium group-hover:gap-2 transition-all">
                      Read Article →
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

