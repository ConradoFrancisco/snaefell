"use client"

import { useCartStore } from '@/stores/useCartStore'
import { useAuth } from '@/components/AuthProvider'
import Button from '@/components/Button'
import Price from '@/components/Price'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, totalPrice } = useCartStore()
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="min-h-screen pt-32 px-6 flex items-center justify-center text-gray-400">Cargando...</div>
  }

  if (!user) return null

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
          <ShoppingBag size={48} className="text-gray-600" />
        </div>
        <h1 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">
          Tu carrito está <span className="text-primary">vacío</span>
        </h1>
        <p className="text-gray-400 mb-10 max-w-md">
          Parece que aún no has añadido nada. ¡Explora nuestros modelos y encuentra el Snaefell perfecto para ti!
        </p>
        <Link href="/#modelos">
          <Button size="lg">Ir a la tienda</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Link href="/#modelos" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a la tienda
      </Link>

      <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-12 uppercase">
        Tu <span className="text-primary">Carrito</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Lista de Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            const imageUrl = item.image_url && (item.image_url.startsWith('http') || item.image_url.startsWith('/'))
              ? item.image_url
              : 'https://images.unsplash.com/photo-1611329533182-3e284a14138e?w=800&auto=format&fit=crop';

            return (
              <div key={item.id} className="glass rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized={!imageUrl.startsWith('http')}
                  />
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wider">{item.category}</p>
                  <Price amount={item.price} className="text-xl font-black italic text-primary" />
                </div>

                <div className="flex items-center space-x-4 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:text-primary transition-colors disabled:opacity-30"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-bold w-6 text-center text-lg">{item.quantity}</span>
                  <button
                    onClick={() => addItem(item)}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-3 text-gray-600 hover:text-red-500 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Resumen de Compra */}
        <div className="lg:col-span-1">
          <div className="glass rounded-[2.5rem] p-8 lg:p-10 sticky top-32">
            <h2 className="text-2xl font-bold mb-8">Resumen</h2>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-gray-400 text-lg">
                <span>Subtotal</span>
                <Price amount={totalPrice()} />
              </div>
              <div className="flex justify-between text-gray-400 text-lg">
                <span>Envío</span>
                <span className="text-secondary font-bold uppercase text-sm tracking-widest">Gratis</span>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <div className="flex justify-between items-center text-2xl font-black italic tracking-tighter">
                <span>Total</span>
                <Price amount={totalPrice()} className="text-primary text-3xl" />
              </div>
            </div>
            <Button size="lg" className="w-full text-lg uppercase tracking-tighter italic">
              Finalizar Pedido
            </Button>
            <div className="mt-8 flex flex-col items-center gap-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">
                Secure Checkout by MercadoPago
              </p>
              <div className="flex gap-4 opacity-30 grayscale">
                <div className="w-8 h-5 bg-white rounded-sm" />
                <div className="w-8 h-5 bg-white rounded-sm" />
                <div className="w-8 h-5 bg-white rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
