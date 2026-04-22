"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X, Loader2, Plus, Info } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button'
import Image from 'next/image'

export default function NewProductPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  
  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('Monopatines')
  const [specs, setSpecs] = useState([{ key: '', value: '' }])
  
  // Images state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles([...selectedFiles, ...files])
      
      const newPreviews = files.map(file => URL.createObjectURL(file))
      setPreviews([...previews, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)

    const newPreviews = [...previews]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)
  }

  const addSpec = () => setSpecs([...specs, { key: '', value: '' }])
  const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const newSpecs = [...specs]
    newSpecs[index][field] = val
    setSpecs(newSpecs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Subir imágenes a Storage
      const imageUrls: string[] = []
      
      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `product-images/${fileName}`

        const { error: uploadError, data } = await supabase.storage
          .from('productos')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('productos')
          .getPublicUrl(filePath)
        
        imageUrls.push(publicUrl)
      }

      // 2. Preparar el objeto Specs (JSON)
      const specsJson = specs.reduce((acc: any, curr) => {
        if (curr.key) acc[curr.key] = curr.value
        return acc
      }, {})

      // 3. Insertar en tabla Products
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([{
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          category,
          image_url: imageUrls[0] || '', // Primera imagen como principal
          specs: specsJson
        }])
        .select()
        .single()

      if (productError) throw productError

      // 4. Insertar imágenes adicionales en product_images
      if (imageUrls.length > 1) {
        const additionalImages = imageUrls.slice(1).map(url => ({
          product_id: product.id,
          image_url: url
        }))
        
        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(additionalImages)
          
        if (imagesError) throw imagesError
      }

      router.push('/admin')
      router.refresh()
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/admin" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Volver al Dashboard
      </Link>

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Seccón: Imágenes */}
        <div className="glass p-8 rounded-[2.5rem] border border-white/10">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <Upload size={14} /> Imágenes del Producto
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                <Image src={preview} alt="Preview" fill className="object-cover" />
                <button 
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-primary/5">
              <Plus size={24} className="text-primary mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500 text-center px-4">Agregar Fotos</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
            </label>
          </div>
          <p className="text-[10px] text-gray-500 italic">La primera imagen será la portada principal.</p>
        </div>

        {/* Sección: Info Básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Nombre del Producto</label>
              <input 
                type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Ej: Snaefell F2 Pro"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Categoría</label>
              <select 
                value={category} onChange={e => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="Monopatines">Monopatines</option>
                <option value="Bicicletas">Bicicletas</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Precio ($)</label>
                <input 
                  type="number" required value={price} onChange={e => setPrice(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Stock Inicial</label>
                <input 
                  type="number" required value={stock} onChange={e => setStock(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Descripción Corta</label>
              <textarea 
                rows={4} required value={description} onChange={e => setDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Describe las características principales..."
              />
            </div>
          </div>
        </div>

        {/* Sección: Specs Técnicas */}
        <div className="glass p-8 rounded-[2.5rem] border border-white/10">
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
            <Info size={14} /> Especificaciones Técnicas (Opcional)
          </label>
          <div className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex gap-4">
                <input 
                  placeholder="Ej: Motor" value={spec.key} onChange={e => updateSpec(index, 'key', e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm"
                />
                <input 
                  placeholder="Ej: 500W" value={spec.value} onChange={e => updateSpec(index, 'value', e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm"
                />
              </div>
            ))}
            <button 
              type="button" onClick={addSpec}
              className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 mt-2 transition-colors"
            >
              <Plus size={14} /> Agregar especificación
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin">
            <Button variant="glass" type="button" className="px-10">Cancelar</Button>
          </Link>
          <Button variant="primary" type="submit" disabled={loading} className="px-16 min-w-[200px]">
            {loading ? <Loader2 className="animate-spin" /> : 'Publicar Producto'}
          </Button>
        </div>
      </form>
    </div>
  )
}
