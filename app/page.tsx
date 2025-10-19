import { Suspense } from 'react'
import { Hero } from '@/components/home/hero'
import { BestSellers } from '@/components/home/bestsellers'
import { KitsShowcase } from '@/components/home/kits-showcase'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Values } from '@/components/home/values'
import { Reviews } from '@/components/home/reviews'
import { JournalTeaser } from '@/components/home/journal-teaser'

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <BestSellers />
      </Suspense>
      <KitsShowcase />
      <FeaturedProducts />
      <Values />
      <Reviews />
      <JournalTeaser />
    </>
  )
}

