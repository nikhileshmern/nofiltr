'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Product {
  ingredients: any
  usage_instructions: string
  benefits: string[]
}

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className="mb-24">
      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="usage">How to Use</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="space-y-4">
          <div className="bg-beige rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">
              Full Ingredients List
            </h3>
            {typeof product.ingredients === 'object' &&
            !Array.isArray(product.ingredients) ? (
              <div className="space-y-3">
                {Object.entries(product.ingredients).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-semibold text-ink">{key}</p>
                    <p className="text-ink/70">{String(value)}</p>
                  </div>
                ))}
              </div>
            ) : Array.isArray(product.ingredients) ? (
              <ul className="space-y-2">
                {product.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="text-ink/70">
                    {ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink/70">
                {product.ingredients || 'Ingredients information coming soon.'}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="bg-beige rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">
              How to Use
            </h3>
            <p className="text-ink/70 leading-relaxed whitespace-pre-line">
              {product.usage_instructions}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <div className="bg-beige rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-ink mb-4">
              Key Benefits
            </h3>
            <ul className="space-y-3">
              {product.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-brown mt-2 flex-shrink-0" />
                  <span className="text-ink/70">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

