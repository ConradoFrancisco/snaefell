"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit2, Trash2, Package, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  image_url: string
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      alert('Error al eliminar el producto')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Gestión de Inventario</h1>
          <p className="text-gray-400 text-sm mt-1">Administrá tus modelos de monopatines y accesorios.</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary" className="flex items-center gap-2 px-8">
            <Plus size={18} />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Package size={24} />
            </div>
            <span className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Productos</span>
          </div>
          <p className="text-4xl font-black italic">{products.length}</p>
        </div>
        {/* Podés agregar más estadísticas aquí */}
      </div>

      {/* Table */}
      <div className="glass rounded-[2.5rem] overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-gray-500 font-black border-b border-white/10">
                <th className="px-8 py-6">Producto</th>
                <th className="px-8 py-6">Categoría</th>
                <th className="px-8 py-6">Precio</th>
                <th className="px-8 py-6">Stock</th>
                <th className="px-8 py-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-500 italic">Cargando inventario...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-500 italic">No hay productos cargados todavía.</td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-800">
                        <Image 
                          src={product.image_url || 'https://via.placeholder.com/100'} 
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 italic">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-black italic text-primary">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="px-8 py-4">
                    <span className={`text-sm font-bold ${product.stock < 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
