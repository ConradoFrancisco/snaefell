"use client"

import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image 
          src="https://snaefell.com.ar/wp-content/uploads/2026/03/01-v3.png"
          alt="Snaefell Hero Banner"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Animated Main Title */}
          <h1 className="flex flex-col items-center">
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-extralight tracking-[0.4em] mb-4 uppercase text-white/80"
            >
              Movimiento
            </motion.span>
            
            <motion.span 
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.4,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }
                }
              }}
              className="text-5xl md:text-8xl font-black tracking-[-0.05em] uppercase text-white drop-shadow-[0_0_30px_rgba(83,33,202,0.4)] italic"
            >
              Sin límites
            </motion.span>
          </h1>
          
          {/* Pulsing Decorative Line */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "80px", opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="h-1 bg-primary mt-12 mb-8 rounded-full shadow-[0_0_15px_#5321CA]"
          ></motion.div>
          
          {/* Background Pulsing Glow */}
          <motion.div
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"
          ></motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent opacity-50" />
      </motion.div>
    </section>
  )
}
