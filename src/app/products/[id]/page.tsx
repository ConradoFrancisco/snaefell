"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingCart, ShieldCheck, Truck, Zap, Plus, Minus, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'
import { useCartStore } from '@/stores/useCartStore'
import { useAuth } from '@/components/AuthProvider'
import { toast } from 'sonner'
import AuthModal from '@/components/AuthModal'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  specs: Record<string, string>
  quantity: number
}

interface ProductImage {
  image_url: string
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [extraImages, setExtraImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { user } = useAuth()
  const router = useRouter()

  const supabase = createClient()

  useEffect(() => {
    if (id) fetchProductDetails()
  }, [id])

  const fetchProductDetails = async () => {
    setLoading(true)

    // 1. Fetch Product
    const { data: productData, error: pError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (productData) {
      setProduct(productData)
      setActiveImage(productData.image_url)

      // 2. Fetch Extra Images
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('image_url')
        .eq('product_id', id)

      if (imagesData) {
        setExtraImages(imagesData.map(img => img.image_url))
      }
    }
    setLoading(false)
  }

  const allImages = product ? [product.image_url, ...extraImages] : []

  const handleAddToCart = () => {
    if (!user) {
      setIsAuthModalOpen(true)
      return
    }

    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: quantity
    } as any)

    toast.success(`¡Agregado!`, {
      description: `${product.name} ya está en tu carrito.`,
    })
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  )

  if (!product) return <div className="min-h-screen pt-40 text-center">Producto no encontrado</div>

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-gray-50 rounded-[3rem] overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full p-12"
                >
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary shadow-lg scale-105' : 'border-transparent bg-gray-50'
                    }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 mb-4 leading-none">
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-gray-900">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
              {product.description}
            </p>

            {/* Specs Grid */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-10">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{key}</p>
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-6 mt-auto">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-primary"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-black text-lg text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-primary"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 text-sm h-14 flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} /> AGREGAR AL CARRITO
                </Button>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Garantía Oficial</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Truck size={20} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Envío Gratis</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                    <Zap size={20} />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Service Express</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
