"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import { useAuth } from './AuthProvider'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, User as UserIcon, ShoppingCart } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/stores/useCartStore'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, profile } = useAuth()
  const items = useCartStore((state) => state.items)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

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
    { name: 'Catalogo', href: '/products' },
  ]

  if (pathname.startsWith('/admin')) return null;

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
                className={`text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer ${link.active ? 'text-primary' : 'text-gray-900 hover:text-primary'
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
                        className="px-6 py-3 text-sm font-bold text-gray-700 hover:text-primary hover:bg-gray-50 uppercase tracking-wider cursor-pointer"
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

          {user && (
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors group">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white transform translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden group-hover:border-primary transition-all">
                  {profile?.avatar_url ? (
                    <Image src={profile.avatar_url} alt="Profile" width={40} height={40} className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                      <UserIcon size={20} />
                    </div>
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Cuenta</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{profile?.full_name || user.email}</p>
                      </div>

                      {profile?.role === 'admin' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          <LayoutDashboard size={16} /> Panel Admin
                        </Link>
                      )}

                      <Link
                        href="/cart"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        <ShoppingCart size={16} /> Mis Pedidos
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                      >
                        <LogOut size={16} /> Cerrar Sesión
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className="cursor-pointer">
              <Button variant="outline" className="text-sm font-bold uppercase tracking-wider px-6 py-2">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900 focus:outline-none cursor-pointer"
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
                  className={`text-xl font-black uppercase italic cursor-pointer ${link.active ? 'text-primary' : 'text-gray-900'}`}
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
                        className="text-lg font-bold uppercase text-gray-600 hover:text-primary cursor-pointer"
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
            {user ? (
              <Link href="/cart" className="text-xl font-black uppercase italic text-gray-900 cursor-pointer" onClick={() => setIsOpen(false)}>Mi Cuenta</Link>
            ) : (
              <Link href="/login" className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full text-xl font-black uppercase italic py-6">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
            <Link href="https://wa.me/5491164454997?text=Hola%2C%20quiero%20ser%20distribuidor" target="_blank" onClick={() => setIsOpen(false)}>
              <Button className="w-full uppercase font-black text-sm tracking-widest py-6 bg-primary">Quiero ser distribuidor</Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

