"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMsg(null)
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/') 
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        })
        if (error) throw error
        setSuccessMsg('¡Cuenta creada! Revisa tu correo electrónico para confirmarla o inicia sesión.')
        setIsLogin(true)
        setPassword('')
      }
    } catch (err: any) {
      if (err.message.includes('Invalid login credentials')) {
         setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      } else {
         setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass relative z-10 w-full max-w-md rounded-[2.5rem] p-8 md:p-12 text-center"
      >
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Volver
        </Link>
        
        <div className="flex justify-center mb-6">
          <Image
            src="https://i0.wp.com/snaefell.com.ar/wp-content/uploads/2026/01/Snaefell-Logo_Mesa-de-trabajo-1.png?resize=4000%2C618&ssl=1"
            alt="SNAEFELL"
            width={180}
            height={50}
            className="object-contain brightness-0 invert"
          />
        </div>
        <p className="text-gray-400 mb-6 text-sm h-10 flex items-center justify-center">
          {isLogin ? 'Inicia sesión para gestionar tus pedidos y acceder a beneficios exclusivos.' : 'Crea una cuenta para unirte a la experiencia Snaefell.'}
        </p>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}
          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm"
            >
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6 text-left">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="email"
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password"
              placeholder="Contraseña"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <Button 
            type="submit"
            variant="primary" 
            size="lg" 
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </Button>
        </form>

        <div className="relative py-4 mb-4">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
          <span className="relative z-10 bg-background px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
            O continuar con
          </span>
        </div>

        <div className="space-y-4 flex flex-col items-center">
          <Button 
            variant="glass" 
            size="lg" 
            className="w-full relative group overflow-hidden"
            onClick={handleGoogleLogin}
            type="button"
          >
            <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </Button>
          
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSuccessMsg(null);
            }}
            className="text-sm text-gray-400 hover:text-white transition-colors mt-4 inline-block"
          >
            {isLogin ? '¿No tienes cuenta?  Regístrate aquí' : '¿Ya tienes una cuenta?  Inicia sesión'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2 max-w-xs">
            Al continuar, aceptas nuestros términos de servicio y política de privacidad.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
