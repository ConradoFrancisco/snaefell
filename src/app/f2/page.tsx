"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { ArrowLeft, Zap, Shield, Move, Battery, Gauge, Wind, CheckCircle2 } from 'lucide-react'

export default function F2Page() {
  const specs = [
    { icon: <Zap size={24} />, title: "Potencia", value: "1000W", detail: "Doble motor brushless de 500W" },
    { icon: <Gauge size={24} />, title: "Velocidad", value: "55 KM/H", detail: "Rendimiento deportivo superior" },
    { icon: <Battery size={24} />, title: "Autonomía", value: "40 KM", detail: "Batería extraíble de larga duración" },
    { icon: <Shield size={24} />, title: "Estabilidad", value: "3 RUEDAS", detail: "Doble eje trasero para mayor control" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="absolute top-28 left-6 md:left-12 z-50">
        <Link href="/" className="inline-flex items-center text-white hover:text-primary transition-colors group text-sm font-bold tracking-widest uppercase mb-12">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>
      </div>

      {/* Hero Section F2 */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image 
            src="https://snaefell.com.ar/wp-content/uploads/2026/02/04.png"
            alt="Snaefell F2"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 md:px-12 mt-20">
          
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center max-w-sm"
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 text-white uppercase leading-none drop-shadow-lg">
              F2
            </h1>
            <div className="space-y-6">
               <p className="text-sm md:text-base text-gray-100 font-medium leading-relaxed drop-shadow-md">
                 Diseñado para quienes buscan ir más allá, el Snaefell Bestride PRO F2 redefine la experiencia de movilidad eléctrica.
               </p>
               <p className="text-sm md:text-base text-gray-100 font-medium leading-relaxed drop-shadow-md">
                 Con doble motor, gran autonomía y equipamiento completo, es el scooter ideal para explorar cualquier camino con confianza, potencia y estilo.
               </p>
            </div>
            
            <div className="mt-10">
               <Link href="https://wa.me/5491164454997?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20F2" target="_blank">
                  <Button size="lg" className="px-10 rounded-full font-bold uppercase tracking-wider bg-white text-black hover:bg-gray-200 shadow-xl border border-white/20 hover:-translate-y-1 transition-all">Consultar</Button>
               </Link>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="relative w-full bg-background overflow-hidden pt-24 pb-32">
        {/* Background Gradient Element */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-60 z-0 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-1/3 h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          
          {/* Top part: Image + Text */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-28">
            
            {/* Image Wrapper */}
            <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto lg:mx-0 lg:w-1/2">
               {/* Floating crosses */}
               <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 text-[#FF5A00] z-20">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
               </div>
               <div className="absolute -bottom-4 -left-6 md:-left-8 text-[#FF5A00] z-20">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
               </div>
               
               {/* Custom shape container */}
               <div className="relative w-full h-full bg-[#dbdbdb] rounded-[3rem] rounded-bl-[1.5rem] rounded-tr-[1.5rem] overflow-hidden shadow-2xl">
                 <Image 
                   src="https://i0.wp.com/snaefell.com.ar/wp-content/uploads/2026/02/05-2.png?resize=905%2C843&ssl=1"
                   alt="Snaefell F2 Features"
                   fill
                   className="object-cover object-center scale-[1.02]"
                 />
               </div>
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
                Deportivo & <br /> aventurero
              </h2>
              <div className="space-y-6 text-[13px] md:text-sm text-gray-200 leading-[1.8]">
                <p>
                   El F2 redefine lo que un monopatín eléctrico puede ser: tres ruedas, una estructura reforzada y una estabilidad superior que inspira confianza desde el primer trayecto. Una forma distinta de moverse, pensada para disfrutar cada recorrido con mayor control.
                </p>
                <p>
                   Su asiento ergonómico ajustable y su capacidad para transportar carga lo convierten en un vehículo versátil, pensado tanto para la ciudad como para recorridos más largos. El doble eje trasero aporta equilibrio y una sensación de control que transforma cada movimiento en una experiencia fluida. Perfecto para quienes viven la movilidad como una extensión de su personalidad.
                </p>
              </div>
            </div>
            
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
             
             {/* Card 1 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Zap size={28} />
                </div>
                <h3 className="text-primary font-black uppercase text-[15px] mb-4 tracking-wide leading-tight">
                  POTENCIA Y <br/>EMOCIÓN DOBLE
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block">Dos motores brushless de 500W</span>
                  <span className="text-gray-400 text-xs block mb-1">(1000W en total).</span>
                  Respuesta firme, conducción controlada.
                </p>
             </div>
             
             {/* Card 2 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Move size={28} />
                </div>
                <h3 className="text-primary font-black uppercase text-[15px] mb-4 tracking-wide leading-tight">
                  DISEÑO Y <br/>FUNCIONALIDAD
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">No solo es potente:</span>
                  también es práctico. Incluye accesorios integrados que hacen la diferencia.
                </p>
             </div>

             {/* Card 3 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Gauge size={28} />
                </div>
                <h3 className="text-primary font-black uppercase text-[15px] mb-4 tracking-wide leading-tight">
                  RENDIMIENTO Y <br/>EXPERIENCIA
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Velocidad máxima de 55 km/h,</span>
                  control preciso en aceleración y frenado.
                </p>
             </div>

             {/* Card 4 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Battery size={28} />
                </div>
                <h3 className="text-primary font-black uppercase text-[15px] mb-4 tracking-wide leading-tight">
                  AUTONOMÍA <br/>QUE LIBERA
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Hasta 40 km</span>
                  por carga batería extraíble.
                </p>
             </div>

             {/* Card 5 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <Shield size={28} />
                </div>
                <h3 className="text-primary font-black uppercase text-[15px] mb-4 tracking-wide leading-tight">
                  CONDUCCIÓN <br/>CÓMODA Y SEGURA
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Suspensión hidráulica</span>
                  + frenos delantero y trasero hidráulicos en ambas ruedas.
                </p>
             </div>

             {/* Card 6 */}
             <div className="group bg-white border border-gray-100 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                   <CheckCircle2 size={28} />
                </div>
                <h3 className="text-primary font-black uppercase text-[15px] mb-4 tracking-wide leading-tight">
                  RESPALDO <br/>SNAEFELL
                </h3>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1">Garantía extendida,</span>
                  componentes premium y soporte técnico.
                </p>
             </div>

          </div>
        </div>
      </section>
    </div>
  )
}
