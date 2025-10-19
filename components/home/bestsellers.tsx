import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/products/product-card'

export async function BestSellers() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(4)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-ink/60 max-w-2xl mx-auto">
            Discover our most-loved products, trusted by thousands for their
            transformative results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

