"use client"

import Link from 'next/link'
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import Button from './Button'
import { useCartStore } from '@/stores/useCartStore'
import { useAuth } from './AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  const totalItems = useCartStore((state) => state.totalItems())
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/#nosotros' },
    { name: 'Modelos', href: '/#modelos' },
    { name: 'Novedades', href: '/#novedades' },
  ]

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black italic tracking-tighter text-white">
          SNAE<span className="text-primary">FELL</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/cart" className="relative p-2 text-white hover:text-primary transition-colors">
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="flex items-center space-x-2 text-white bg-white/5 py-1 px-3 rounded-full border border-white/10">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium truncate max-w-[100px]">{user.email?.split('@')[0]}</span>
                <button 
                  onClick={handleLogout}
                  className="hover:text-primary transition-colors pl-1"
                  title="Cerrar sesión"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="glass">Inicia Sesión</Button>
            </Link>
          )}
          <Button size="sm" className="rounded-md">
            Quiero ser distribuidor
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
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
            className="absolute top-full left-0 w-full glass border-t border-white/10 md:hidden flex flex-col p-6 space-y-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            <div className="flex items-center space-x-6 text-white pt-2">
               <Link href="/cart" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                 <ShoppingCart size={22} />
                 <span>Carrito ({totalItems})</span>
               </Link>
            </div>
            <Button className="w-full">Quiero ser distribuidor</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
