'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShoppingBag, User, Menu, X, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { useWishlistStore } from '@/lib/store/wishlist'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(232, 217, 200, 0)', 'rgba(232, 217, 200, 0.95)']
  )
  
  const headerTop = useTransform(
    scrollY,
    [0, 100],
    ['3rem', '0rem'] // Move from 3rem (48px) to 0rem when scrolling
  )
  
  const { toggleCart, getTotalItems } = useCartStore()
  const { toggleWishlist, getTotalItems: getWishlistItems } = useWishlistStore()
  const cartItemsCount = getTotalItems()
  const wishlistItemsCount = getWishlistItems()

  // Banner carousel functions
  const nextBannerSlide = () => {
    setCurrentBannerSlide((prev) => (prev + 1) % 3)
  }

  const prevBannerSlide = () => {
    setCurrentBannerSlide((prev) => (prev - 1 + 3) % 3)
  }

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-advance banner slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerSlide((prev) => (prev + 1) % 3)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Top Banner Carousel */}
      <div className="bg-accent-brown text-white py-1 text-xs relative overflow-hidden z-50">
        <div className="flex items-center justify-center">
          <div className="flex items-center relative">
            {/* Left Arrow - Fixed Position */}
            <button 
              onClick={prevBannerSlide}
              className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors z-10 relative"
            >
              <ChevronLeft className="w-3 h-3 text-white" />
            </button>
            
            {/* Text Container with Overflow Hidden */}
            <div className="w-96 mx-4 overflow-hidden relative">
              {/* Text Content - Slides Behind Arrows */}
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentBannerSlide * 100}%)` }}>
                <div className="w-full flex-shrink-0 text-center whitespace-nowrap">
                  Free Shipping on all orders • 30-day money-back guarantee
                </div>
                <div className="w-full flex-shrink-0 text-center whitespace-nowrap">
                  Get 10% off your first order • Use code WELCOME10
                </div>
                <div className="w-full flex-shrink-0 text-center whitespace-nowrap">
                  New arrivals every week • Follow us for updates
                </div>
              </div>
            </div>
            
            {/* Right Arrow - Fixed Position */}
            <button 
              onClick={nextBannerSlide}
              className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors z-10 relative"
            >
              <ChevronRight className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      </div>

      <motion.header
        style={{ backgroundColor, top: headerTop }}
        className={cn(
          'fixed z-40 w-full transition-shadow duration-300',
          isScrolled && 'shadow-md backdrop-blur-md'
        )}
      >
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex h-20 items-center justify-between transition-all duration-300 relative"
        )}>
          {/* Logo and Navigation Container */}
          <div className={cn(
            "flex items-center transition-all duration-300",
            !isScrolled && "space-x-48"
          )}>
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group">
              <span className="font-display text-2xl font-bold tracking-tight leading-none">
                NOFILT<span 
                  className="inline-block bg-gradient-to-r from-transparent via-[#8B6342] to-[#8B6342] from-20% via-40% bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >R.</span>
              </span>
              <span className="text-[10px] text-ink/70 tracking-wider mt-0.5 font-light">
                Confidence unfiltered
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className={cn(
              "hidden md:flex md:items-center md:space-x-8 transition-all duration-300",
              isScrolled && "absolute left-1/2 -translate-x-1/2"
            )}>
            <Link
              href="/shop"
              className={cn(
                "text-sm font-medium transition-colors relative",
                pathname === '/shop' 
                  ? "text-accent-brown after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent-brown" 
                  : "text-ink hover:text-accent-brown"
              )}
            >
              Shop
            </Link>
            <Link
              href="/journal"
              className={cn(
                "text-sm font-medium transition-colors relative",
                pathname === '/journal' || pathname?.startsWith('/journal/')
                  ? "text-accent-brown after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent-brown" 
                  : "text-ink hover:text-accent-brown"
              )}
            >
              Journal
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors relative",
                pathname === '/about' 
                  ? "text-accent-brown after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent-brown" 
                  : "text-ink hover:text-accent-brown"
              )}
            >
              About
            </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/account">
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            
            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleWishlist}
            >
              <Heart className="h-5 w-5" />
              {isClient && wishlistItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-brown text-xs font-bold text-white"
                >
                  {wishlistItemsCount}
                </motion.span>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>
            
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {isClient && cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-brown text-xs font-bold text-white"
                >
                  {cartItemsCount}
                </motion.span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <Link
              href="/shop"
              className={cn(
                "block text-base font-medium transition-colors",
                pathname === '/shop'
                  ? "text-accent-brown font-bold"
                  : "text-ink hover:text-accent-brown"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/journal"
              className={cn(
                "block text-base font-medium transition-colors",
                pathname === '/journal' || pathname?.startsWith('/journal/')
                  ? "text-accent-brown font-bold"
                  : "text-ink hover:text-accent-brown"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Journal
            </Link>
            <Link
              href="/about"
              className={cn(
                "block text-base font-medium transition-colors",
                pathname === '/about'
                  ? "text-accent-brown font-bold"
                  : "text-ink hover:text-accent-brown"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </motion.div>
        )}
      </nav>
      </motion.header>
    </>
  )
}

