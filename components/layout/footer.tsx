import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block flex flex-col items-start">
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
            <p className="text-sm text-ink/60">
              Clean, effective skincare backed by science.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 hover:text-accent-brown transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 hover:text-accent-brown transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/60 hover:text-accent-brown transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-ink mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?skin_type=oily"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  For Oily Skin
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?skin_type=dry"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  For Dry Skin
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?skin_type=sensitive"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  For Sensitive Skin
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold text-ink mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/journal"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/ingredients"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  Our Ingredients
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-ink mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-ink/60 hover:text-accent-brown transition-colors"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ink/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-ink/60">
              © {new Date().getFullYear()} NOFILTR. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-ink/60 hover:text-accent-brown transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-ink/60 hover:text-accent-brown transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

