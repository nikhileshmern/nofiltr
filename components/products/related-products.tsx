import { createClient } from '@/lib/supabase/server'
import { ProductCard } from './product-card'

interface RelatedProductsProps {
  currentProductId: string
  skinTypes: string[]
}

export async function RelatedProducts({
  currentProductId,
  skinTypes,
}: RelatedProductsProps) {
  const supabase = await createClient()

  // Get products with matching skin types, excluding current product
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .neq('id', currentProductId)
    .limit(4)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="font-display text-3xl font-bold text-ink mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}

