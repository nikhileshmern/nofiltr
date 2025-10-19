import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createClient } from '@/lib/supabase/client'

interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  slug: string
  addedAt: string
}

interface WishlistStore {
  items: WishlistItem[]
  isOpen: boolean
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => Promise<boolean>
  removeItem: (id: string) => void
  clearWishlist: () => void
  toggleWishlist: () => void
  openWishlist: () => void
  closeWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getTotalItems: () => number
  checkAuth: () => Promise<boolean>
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: async (item) => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          return false // User not authenticated
        }
        
        set((state) => {
          // Check if item already exists
          const existingItem = state.items.find((i) => i.productId === item.productId)
          if (existingItem) {
            return state // Don't add if already exists
          }
          return {
            items: [...state.items, { ...item, addedAt: new Date().toISOString() }],
          }
        })
        return true
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId)
      },
      getTotalItems: () => {
        return get().items.length
      },
      checkAuth: async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        return !!user
      },
    }),
    {
      name: 'nofiltr-wishlist',
    }
  )
)
