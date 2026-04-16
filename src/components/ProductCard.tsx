"use client"

import Image from 'next/image'
import { Plus, Info } from 'lucide-react'
import CustomButton from './Button'
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
    // Redirect to the specific model page for this design phase
    const modelPath = product.name.toLowerCase().includes('f1') ? '/f1' : '/f2';
    router.push(modelPath);
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
      className="bg-white group relative rounded-[2.5rem] overflow-hidden p-8 flex flex-col h-full shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-gray-100 hover:border-primary/30"
    >
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 mb-8">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized={!imageUrl.startsWith('http')}
        />
        <div className="absolute top-4 left-4 bg-primary text-[10px] font-black italic uppercase py-2 px-4 rounded-full text-white shadow-lg">
          {product.category}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-3 text-background">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-8 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Precio</span>
            <Price 
              amount={product.price || 0} 
              className="text-2xl font-black italic tracking-tighter text-background" 
            />
          </div>
          
          <div className="flex space-x-2">
            <CustomButton 
              className="px-8 py-3 rounded-full text-[10px] font-black uppercase italic tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              onClick={handleAction}
            >
              Ver más
            </CustomButton>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
