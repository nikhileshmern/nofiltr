'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full Background Image */}
      <motion.div 
        className="absolute inset-0"
        initial={{ filter: 'blur(5px)' }}
        animate={{ filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Image 
          src="/products/images/hero-image-2.png" 
          alt="NOFILTR. Skincare Hero" 
          fill 
          className="object-cover object-[center_40%] sm:object-[center_center] md:object-center" 
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Responsive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-black/20 md:via-transparent md:to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center md:justify-start px-4 sm:px-8 lg:px-13 pt-20 md:pt-24">
          <div className="w-full max-w-7xl mx-auto">
            {/* Empty space for image text on desktop, mobile-friendly spacing */}
            <div className="h-32 md:h-48 lg:h-64" />
            {/* <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base w-1/2 sm:text-lg md:text-xl text-white/50 leading-relaxed mb-8 md:mb-12 mt-32 ml-0"
              >
                Clean, effective skincare backed by science. Formulated with premium ingredients for radiant, healthy skin.
              </motion.p> */}
          </div>
          
        </div>


        {/* Buttons Section - Bottom */}
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 pb-12 md:pb-16 lg:pb-20">
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  asChild 
                  className="group w-full sm:w-auto min-w-[160px] shadow-xl hover:shadow-2xl transition-all"
                >
                  <Link href="/shop">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="w-full sm:w-auto min-w-[160px] bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-ink shadow-xl hover:shadow-2xl transition-all"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile, visible on desktop */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2 backdrop-blur-sm"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}

