'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, LogIn } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface LoginWarningDialogProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export function LoginWarningDialog({ isOpen, onClose, onLogin }: LoginWarningDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-50">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Login Required
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-ink/70">
                  Please login to add items to your wishlist and save your favorites for later.
                </p>
                
                <div className="bg-beige/30 rounded-lg p-4">
                  <h4 className="font-medium text-ink mb-2">Benefits of logging in:</h4>
                  <ul className="text-sm text-ink/70 space-y-1">
                    <li>• Save products to your wishlist</li>
                    <li>• Track your order history</li>
                    <li>• Get personalized recommendations</li>
                    <li>• Faster checkout experience</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={onLogin}
                    className="flex-1 bg-accent-brown hover:bg-accent-brown/90 text-white"
                    asChild
                  >
                    <Link href="/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
