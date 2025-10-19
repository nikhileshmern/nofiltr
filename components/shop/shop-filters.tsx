'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const skinTypes = [
  { value: 'all', label: 'All Skin Types' },
  { value: 'oily', label: 'Oily' },
  { value: 'dry', label: 'Dry' },
  { value: 'combination', label: 'Combination' },
  { value: 'sensitive', label: 'Sensitive' },
  { value: 'normal', label: 'Normal' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
]

interface ShopFiltersProps {
  currentSkinType?: string
  currentSort?: string
}

export function ShopFilters({ currentSkinType, currentSort }: ShopFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'all' || value === 'newest') {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-beige rounded-2xl p-6">
        <h3 className="font-display font-semibold text-ink mb-4">Filters</h3>

        {/* Skin Type Filter */}
        <div className="space-y-3 mb-6">
          <Label>Skin Type</Label>
          <Select
            value={currentSkinType || 'all'}
            onValueChange={(value) => updateFilter('skin_type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select skin type" />
            </SelectTrigger>
            <SelectContent>
              {skinTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="space-y-3">
          <Label>Sort By</Label>
          <Select
            value={currentSort || 'newest'}
            onValueChange={(value) => updateFilter('sort', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

