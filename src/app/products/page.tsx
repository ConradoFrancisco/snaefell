"use client"

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import NextImage from 'next/image'
import Link from 'next/link'
import { Search, ChevronRight, SlidersHorizontal, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const supabase = createClient()

  // 1. Cargar categorías únicas una sola vez
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('products').select('category')
      if (data) {
        const unique = Array.from(new Set(data.map(p => p.category)))
        setCategories(['all', ...unique])
      }
    }
    fetchCategories()
  }, [])

  // 2. Cargar productos filtrados desde Supabase
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('products').select('*')

    // Aplicar filtro de categoría en la base de datos
    if (filter !== 'all') {
      query = query.eq('category', filter)
    }

    // Aplicar búsqueda en la base de datos (ilike es insensible a mayúsculas)
    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (!error && data) {
      setProducts(data)
    }
    setLoading(false)
  }, [filter, search, supabase])

  // Debounce para no saturar la DB mientras escriben
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
    }, 400) // Espera 400ms después de que dejan de escribir
    return () => clearTimeout(timer)
  }, [fetchProducts])

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-4 italic">
              Nuestro <span className="text-primary text-outline-white">Catálogo</span>
            </h1>
            <p className="text-gray-400 font-medium max-w-lg">
              Explorá nuestra selección de vehículos eléctricos. Filtrado inteligente directo desde nuestra base de datos para máxima eficiencia.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              {loading ? (
                <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary animate-spin" size={20} />
              ) : (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
              )}
              <input 
                type="text" 
                placeholder="Buscar modelo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-64 font-bold text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6 text-white">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="font-black uppercase tracking-widest text-sm italic">Categorías</h3>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-bold transition-all uppercase text-[10px] tracking-widest ${
                      filter === cat 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white/5 text-gray-500 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {cat === 'all' ? 'Ver Todos' : cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 rounded-[2.5rem] aspect-[4/5] animate-pulse border border-white/5" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={product.id}
                      className="group"
                    >
                      <Link href={`/products/${product.id}`}>
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden p-8 aspect-[4/5] flex flex-col transition-all duration-500 hover:bg-white/[0.08] hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2 relative">
                          <div className="absolute top-8 right-8 z-10">
                            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-white/10">
                              {product.category}
                            </span>
                          </div>
                          
                          <div className="flex-1 relative mb-8">
                            <NextImage 
                              src={product.image_url} 
                              alt={product.name}
                              fill
                              className="object-contain transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>

                          <div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-1 leading-none italic">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between mt-4">
                              <p className="text-xl font-bold text-primary italic">
                                ${product.price.toLocaleString()}
                              </p>
                              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                                <ChevronRight size={20} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-32 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                <p className="text-gray-500 font-bold uppercase tracking-widest italic">No se encontraron modelos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
