"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, Users, Settings, ArrowLeft, Loader2 } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!profile || profile.role !== 'admin')) {
      router.push('/')
    }
  }, [profile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    )
  }

  if (!profile || profile.role !== 'admin') {
    return null // O un mensaje de "Acceso denegado"
  }
  return (
    <div className="min-h-screen bg-background text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col hidden md:flex">
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 text-primary font-black italic uppercase tracking-tighter text-xl">
            SNAEFELL <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded italic">ADMIN</span>
          </Link>
        </div>

        <nav className="space-y-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-all">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <ShoppingBag size={20} />
            Productos
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Users size={20} />
            Pedidos
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
            Volver a la web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
