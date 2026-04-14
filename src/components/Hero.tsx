"use client"

import Image from 'next/image'
import Button from './Button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10" />
        {/* Using a placeholder high-res image for now */}
        <Image 
          src="https://images.unsplash.com/photo-1611329533182-3e284a14138e?q=80&w=2070&auto=format&fit=crop"
          alt="Snaefell Scooter"
          fill
          className="object-cover object-center grayscale-[20%]"
          priority
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-primary font-bold tracking-widest uppercase mb-4 block">
            Bestride Series
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 leading-tight">
            F2 <span className="text-white block md:inline font-sans not-italic text-4xl md:text-6xl align-middle ml-2">| Deportivo & aventurero</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg">
            Conquista la ciudad con potencia y libertad real de movimiento. 
            El Snaefell F2 combina ingeniería de precisión con un diseño imparable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Ver Modelos
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg">
              Saber más
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
