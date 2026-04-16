"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { ArrowLeft, Zap, Shield, Move, Battery, Gauge, CheckCircle2, Wrench } from 'lucide-react'

export default function F1Page() {
  const specs = [
    { icon: <Zap size={24} />, title: "Potencia", value: "500W", detail: "Motor Brushless suave y constante" },
    { icon: <Battery size={24} />, title: "Autonomía", value: "40 KM", detail: "Batería extraíble de alto rendimiento" },
    { icon: <Move size={24} />, title: "Peso", value: "28.7 KG", detail: "Estructura ligera y plegable" },
    { icon: <Gauge size={24} />, title: "Agilidad", value: "Urbana", detail: "Diseño compacto de dos ruedas" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="absolute top-28 left-6 md:left-12 z-50">
        <Link href="/" className="inline-flex items-center text-white hover:text-primary transition-colors group text-sm font-bold tracking-widest uppercase">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>
      </div>

      {/* Hero Section F1 */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image 
            src="https://snaefell.com.ar/wp-content/uploads/2026/02/02.png"
            alt="Snaefell F1"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 mt-20">
          
          {/* Left Side - Title and short desc */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 text-white uppercase leading-none drop-shadow-lg">
              F1
            </h1>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-sm drop-shadow-md">
              El Snaefell Bestride-F1 está hecho para quienes no esperan a que las cosas se muevan: las hacen mover.
            </p>
          </motion.div>

          {/* Right Side - Brand message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center text-right items-end"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase text-white leading-tight mb-4 drop-shadow-lg flex flex-col">
              <span>MOVIMIENTO</span>
              <span>SIN LÍMITES</span>
            </h2>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-sm text-right drop-shadow-md">
              Con alma urbana y espíritu deportivo, combina potencia, autonomía y diseño inteligente para que cada trayecto sea una experiencia libre, fluida y con estilo.
            </p>
          </motion.div>
          
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="relative w-full overflow-hidden pt-24 pb-32">
        {/* Background Gradient Element */}
        <div className="absolute top-0 right-0 w-full md:w-3/4 h-full bg-gradient-to-bl from-primary/30 via-transparent to-transparent opacity-80 z-0 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          
          {/* Top part: Text + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            {/* Text */}
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
                Urbano & <br />
                dinámico
              </h2>
              <div className="space-y-6 text-[13px] md:text-sm text-gray-200 leading-[1.8]">
                <p>
                   Diseñado para conquistar la ciudad, el F1 combina rendimiento y estilo en un diseño compacto de dos ruedas, ideal para quienes buscan agilidad en sus trayectos diarios. La solidez de su estructura garantiza la eficiencia de su motor que se traduce en un manejo preciso y confiable.
                </p>
                <p>
                   Con suspensión delantera y neumáticos de alto agarre, el F1 se adapta perfectamente a calles urbanas y caminos irregulares, brindando una sensación de control total. Su estética moderna —líneas limpias, acabados metálicos y detalles en contraste— refuerza la idea de tecnología y vanguardia que define a Snaefell.
                </p>
              </div>
            </div>
            
            {/* Image Wrapper */}
            <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto lg:ml-auto mt-12 lg:mt-0">
               {/* Floating crosses */}
               <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 text-[#FF5A00] z-20">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
               </div>
               <div className="absolute -bottom-4 -left-6 md:-left-8 text-[#FF5A00] z-20">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
               </div>
               
               {/* Image Container with custom shape */}
               <div className="relative w-full h-full bg-[#dbdbdb] rounded-[3rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] overflow-hidden shadow-2xl">
                 <Image 
                   src="https://i0.wp.com/snaefell.com.ar/wp-content/uploads/2026/02/03-2.png?resize=905%2C843&ssl=1"
                   alt="Snaefell F1 Features"
                   fill
                   className="object-cover object-center scale-[1.02]"
                 />
               </div>
            </div>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
             
             {/* Card 1 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Zap size={28} />
                </div>
                <h3 className="text-gray-900 font-black uppercase text-base mb-3 tracking-widest group-hover:text-primary transition-colors">
                  Potencia sin esfuerzo
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Motor brushless 500W</span>
                  Aceleración suave y energía constante en cualquier terreno.
                </p>
             </div>
             
             {/* Card 2 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Gauge size={28} />
                </div>
                <h3 className="text-gray-900 font-black uppercase text-base mb-3 tracking-widest group-hover:text-primary transition-colors">
                  Diseño Inteligente
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Estructura plegable</span>
                  Asiento desmontable y estilo urbano para máxima comodidad.
                </p>
             </div>

             {/* Card 3 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Move size={28} />
                </div>
                <h3 className="text-gray-900 font-black uppercase text-base mb-3 tracking-widest group-hover:text-primary transition-colors">
                  Movete a tu manera
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Ligero (28.7 kg)</span>
                  Estructura resistente y disponible en múltiples colores.
                </p>
             </div>

             {/* Card 4 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Battery size={28} />
                </div>
                <h3 className="text-gray-900 font-black uppercase text-base mb-3 tracking-widest group-hover:text-primary transition-colors">
                  Autonomía que libera
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Hasta 40 km por carga</span>
                  Sistema de batería extraíble de alto rendimiento.
                </p>
             </div>

             {/* Card 5 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Shield size={28} />
                </div>
                <h3 className="text-gray-900 font-black uppercase text-base mb-3 tracking-widest group-hover:text-primary transition-colors">
                  Seguridad en detalles
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Suspensión hidráulica</span>
                  Frenos de disco en ambas ruedas para un control total.
                </p>
             </div>

             {/* Card 6 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <CheckCircle2 size={28} />
                </div>
                <h3 className="text-gray-900 font-black uppercase text-base mb-3 tracking-widest group-hover:text-primary transition-colors">
                  Respaldo Snaefell
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Garantía extendida</span>
                  Componentes premium y soporte técnico especializado.
                </p>
             </div>

          </div>
        </div>
      </section>
    </div>
  )
}
