"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import { useAuth } from './AuthProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '/', active: true },
    { name: 'Nosotros', href: '/#nosotros' },
    { 
      name: 'Modelos', 
      href: '#', 
      dropdown: true,
      subPaths: [
        { name: 'Bestride F1', href: '/f1' },
        { name: 'Bestride Pro F2', href: '/f2' }
      ]
    },
    { name: 'Novedades', href: '/#novedades' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-gray-100 py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-56 h-12 pt-4">
          <Image
            src="https://i0.wp.com/snaefell.com.ar/wp-content/uploads/2026/01/Snaefell-Logo_Mesa-de-trabajo-1.png?resize=4000%2C618&ssl=1"
            alt="SNAEFELL Logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${link.active ? 'text-primary' : 'text-gray-900 hover:text-primary'
                  }`}
              >
                {link.name}
                {link.dropdown && <span className="text-[10px] transform translate-y-px opacity-50 transition-transform group-hover:rotate-180">▼</span>}
              </Link>
              
              {/* Desktop Dropdown */}
              {link.subPaths && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 min-w-[180px] overflow-hidden flex flex-col py-2">
                    {link.subPaths.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.href} 
                        className="px-6 py-3 text-sm font-bold text-gray-700 hover:text-primary hover:bg-gray-50 uppercase tracking-wider"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="https://wa.me/5491164454997?text=Hola%2C%20quiero%20ser%20distribuidor" target="_blank">
            <Button className="uppercase font-black tracking-widest text-sm px-8 bg-primary">Distribuidor</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 md:hidden flex flex-col p-8 space-y-6 shadow-2xl h-screen overflow-y-auto"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col space-y-4">
                <Link
                  href={link.href}
                  className={`text-xl font-black uppercase italic ${link.active ? 'text-primary' : 'text-gray-900'}`}
                  onClick={() => !link.dropdown && setIsOpen(false)}
                >
                  {link.name} {link.dropdown && <span className="text-sm opacity-50 not-italic ml-2">▼</span>}
                </Link>
                
                {/* Mobile Submenu */}
                {link.subPaths && (
                  <div className="flex flex-col space-y-4 pl-4 border-l-2 border-gray-100 ml-2">
                    {link.subPaths.map((sub) => (
                      <Link 
                        key={sub.name} 
                        href={sub.href} 
                        className="text-lg font-bold uppercase text-gray-600 hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <hr className="border-gray-100" />
            <Link href="https://wa.me/5491164454997?text=Hola%2C%20quiero%20ser%20distribuidor" target="_blank" onClick={() => setIsOpen(false)}>
              <Button className="w-full uppercase font-black text-sm tracking-widest py-6 bg-primary">Quiero ser distribuidor</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

