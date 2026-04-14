"use client"

import Image from 'next/image'
import { Plus, Info } from 'lucide-react'
import Button from './Button'
import Price from './Price'
import { useCartStore, Product } from '@/stores/useCartStore'
import { useAuth } from './AuthProvider'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { user } = useAuth()
  const router = useRouter()

  const handleAction = () => {
    if (!user) {
      router.push('/login')
      return
    }
    addItem(product)
  }

  // Fallback image if the URL is invalid or missing
  const imageUrl = product.image_url && (product.image_url.startsWith('http') || product.image_url.startsWith('/')) 
    ? product.image_url 
    : 'https://images.unsplash.com/photo-1611329533182-3e284a14138e?w=800&auto=format&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass group relative rounded-3xl overflow-hidden p-4 flex flex-col h-full"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized={!imageUrl.startsWith('http')} // Optimization fallback
        />
        <div className="absolute top-3 left-3 bg-primary/90 text-[10px] font-bold uppercase py-1 px-3 rounded-full">
          {product.category}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block">Precio</span>
            <Price 
              amount={product.price || 0} 
              className="text-2xl font-black italic tracking-tighter" 
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={user ? "glass" : "primary"}
              className="px-4 py-2 rounded-xl text-sm font-bold"
              onClick={handleAction}
            >
              {user ? <><Plus size={18} className="mr-1" /> Añadir</> : "Inicia sesión"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
