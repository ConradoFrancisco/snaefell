"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/AuthProvider'
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'next/navigation'
import { Truck, ChevronLeft, CreditCard, Loader2, CheckCircle2, MapPin, Phone, User, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'
import { motion, AnimatePresence } from 'framer-motion'

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, totalPrice } = useCartStore()
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment
  const [loading, setLoading] = useState(false)
  const [provinces, setProvinces] = useState<{ id: string, nombre: string }[]>([])
  const [cities, setCities] = useState<{ id: string, nombre: string }[]>([])
  const [loadingLocations, setLoadingLocations] = useState(false)

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: ''
  })

  useEffect(() => {
    fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
      .then(res => res.json())
      .then(data => setProvinces(data.provincias.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre))))
  }, [])

  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceName = e.target.value
    setFormData({ ...formData, state: provinceName, city: '' })

    if (provinceName) {
      setLoadingLocations(true)
      try {
        const res = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinceName}&max=1000&campos=id,nombre`)
        const data = await res.json()
        setCities(data.localidades.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre)))
      } catch (error) {
        console.error("Error fetching cities", error)
      } finally {
        setLoadingLocations(false)
      }
    } else {
      setCities([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const goToPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return alert('Debes iniciar sesión')

    setLoading(true)
    try {
      const { error } = await supabase
        .from('addresses')
        .insert([{
          user_id: user.id,
          ...formData
        }])

      if (error) throw error
      setStep(2)
      window.scrollTo(0, 0)
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFinalPayment = () => {
    setLoading(true)
    // Aquí iría la lógica de Mercado Pago
    alert('Redirigiendo a Mercado Pago...')
    setTimeout(() => setLoading(false), 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-neutral-950 text-white">
        <ShoppingBag size={64} className="text-primary mb-6 opacity-20" />
        <h2 className="text-2xl font-black uppercase mb-4 italic">El carrito está vacío</h2>
        <Link href="/products">
          <Button>Ir al Catálogo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Wizard Progress */}
        <div className="flex items-center justify-center mb-16 gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= 1 ? 'bg-primary text-white' : 'bg-white/5 text-gray-500 border border-white/10'}`}>1</div>
            <span className={`uppercase text-[10px] font-black tracking-[0.2em] ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Envío</span>
          </div>
          <div className={`w-12 h-px ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`} />
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= 2 ? 'bg-primary text-white' : 'bg-white/5 text-gray-500 border border-white/10'}`}>2</div>
            <span className={`uppercase text-[10px] font-black tracking-[0.2em] ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Pago</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => step === 2 ? setStep(1) : router.push('/cart')}
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white italic leading-none">
            {step === 1 ? 'Datos de' : 'Confirmar'} <span className="text-primary text-outline-white">{step === 1 ? 'Envío' : 'Pedido'}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center text-white rounded-2xl rotate-3">
                      <Truck size={24} className="-rotate-3" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Información del Destinatario</h2>
                  </div>

                  <form onSubmit={goToPayment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Nombre Completo</label>
                      <input required name="full_name" value={formData.full_name} onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-gray-900"
                        placeholder="Ej: Conrado Llanos"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Teléfono</label>
                      <input required name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-gray-900"
                        placeholder="Ej: 11 1234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Código Postal</label>
                      <input required name="postal_code" value={formData.postal_code} onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-gray-900"
                        placeholder="Ej: 1425"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Calle y Número</label>
                      <input required name="address_line_1" value={formData.address_line_1} onChange={handleChange}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-gray-900"
                        placeholder="Ej: Av. del Libertador 1234"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Provincia</label>
                      <select required name="state" value={formData.state} onChange={handleProvinceChange}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-gray-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right:1.5rem] bg-no-repeat"
                      >
                        <option value="">Seleccionar Provincia</option>
                        {provinces.map(p => <option key={p.id} value={p.nombre}>{p.nombre}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Localidad</label>
                      <select required name="city" value={formData.city} onChange={handleChange} disabled={!formData.state || loadingLocations}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-gray-900 appearance-none disabled:opacity-50 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right:1.5rem] bg-no-repeat"
                      >
                        <option value="">{loadingLocations ? 'Cargando...' : 'Seleccionar Localidad'}</option>
                        {cities.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <Button type="submit" disabled={loading} className="w-full py-6 text-sm h-16 flex items-center justify-center gap-3">
                        {loading ? <Loader2 className="animate-spin" /> : <>CONTINUAR AL PAGO <ChevronLeft className="rotate-180" size={20} /></>}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <div className="flex items-center gap-3 mb-10">
                      <div className="w-12 h-12 bg-green-500 flex items-center justify-center text-white rounded-2xl">
                        <CheckCircle2 size={24} />
                      </div>
                      <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Resumen de Envío</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <User size={20} className="text-primary mt-1" />
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Recibe</p>
                            <p className="font-bold text-gray-900">{formData.full_name}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Phone size={20} className="text-primary mt-1" />
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Teléfono</p>
                            <p className="font-bold text-gray-900">{formData.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <MapPin size={20} className="text-primary mt-1" />
                          <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Dirección</p>
                            <p className="font-bold text-gray-900">{formData.address_line_1}</p>
                            <p className="text-sm text-gray-500">{formData.city}, {formData.state} ({formData.postal_code})</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(1)}
                      className="mt-8 text-primary font-black text-[10px] uppercase tracking-widest hover:underline"
                    >
                      Editar datos de envío
                    </button>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-primary/20">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Método de Pago</h2>
                      <Image src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-0.png" alt="Mercado Pago" width={100} height={30} className="object-contain" />
                    </div>
                    <p className="text-gray-500 mb-10 font-medium">Serás redirigido a la plataforma segura de Mercado Pago para finalizar tu compra de forma protegida.</p>
                    <Button
                      onClick={handleFinalPayment}
                      disabled={loading}
                      className="w-full py-8 text-lg h-20 flex items-center justify-center gap-4 bg-[#009EE3] hover:bg-[#0081B9] group"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <div className="flex items-center gap-4">
                          <Image
                            src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-0.png"
                            alt="MP Logo"
                            width={100}
                            height={30}
                            className="object-contain"
                          />
                          <span className="font-black uppercase tracking-tighter">Finalizar Compra</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Summary (Persistent) */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 sticky top-32 shadow-2xl shadow-black/50">
              <h3 className="text-xl font-black uppercase mb-8 text-white italic">Tu Compra</h3>
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl overflow-hidden flex-shrink-0 relative border border-white/5 group-hover:border-primary/50 transition-colors">
                      <Image src={item.image_url} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-black text-sm uppercase leading-tight">{item.name}</p>
                      <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Cant: {item.quantity}</p>
                      <p className="text-primary font-black text-sm mt-1 italic">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Subtotal</p>
                  <p className="text-white font-bold">${totalPrice().toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Envío</p>
                  <p className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Bonificado</p>
                </div>
                <div className="flex justify-between pt-6 border-t border-white/5">
                  <p className="text-xl font-black uppercase tracking-tighter text-white">Total</p>
                  <p className="text-3xl font-black text-primary italic leading-none">${totalPrice().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
