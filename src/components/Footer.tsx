import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <Link href="/" className="relative w-40 h-10 mb-8 block">
            <Image 
              src="https://snaefell.com.ar/wp-content/uploads/2024/09/Logo-snaefell-blanco.png"
              alt="SNAEFELL Logo"
              fill
              className="object-contain"
            />
          </Link>
          <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
            <p>
              Snaefell impulsa una nueva forma de moverse, donde la libertad y la conexión con el recorrido son parte de la experiencia.
            </p>
            <p className="font-bold text-white pt-4 uppercase tracking-tighter italic">Garantía:</p>
            <ul className="space-y-1 text-xs">
              <li>· 2 años para el chasis</li>
              <li>· 1 año para componentes eléctricos</li>
              <li>· 3 meses para partes delicadas</li>
            </ul>
          </div>
        </div>

        {/* Nuestros Modelos */}
        <div>
          <h4 className="font-black italic text-primary mb-8 uppercase tracking-tighter text-sm">Nuestros modelos</h4>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-300">
            <li><Link href="/f1" className="hover:text-primary transition-colors">Bestride-F1</Link></li>
            <li><Link href="/f2" className="hover:text-primary transition-colors">Bestride pro-F2</Link></li>
          </ul>
        </div>

        {/* Accesorios */}
        <div>
          <h4 className="font-black italic text-primary mb-8 uppercase tracking-tighter text-sm">Accesorios y recambios</h4>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-300">
            <li><Link href="/#" className="hover:text-primary transition-colors">Asientos</Link></li>
            <li><Link href="/#" className="hover:text-primary transition-colors">Cascos</Link></li>
            <li><Link href="/#" className="hover:text-primary transition-colors">Espejos</Link></li>
            <li><Link href="/#" className="hover:text-primary transition-colors">Portaequipaje</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-black italic text-primary mb-8 uppercase tracking-tighter text-sm">Unite a nuestro newsletter</h4>
          <form className="space-y-4">
             <div className="relative">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm w-full focus:outline-none focus:border-primary transition-all"
                />
             </div>
             <button className="w-full bg-primary py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic hover:bg-primary/90 transition-all">
                Suscribirme
             </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
        <p>© 2026 SNAEFELL. MOVIMIENTO SIN LÍMITES.</p>
        <div className="flex space-x-8">
          <Link href="/#" className="hover:text-white transition-colors">Instagram</Link>
          <Link href="/#" className="hover:text-white transition-colors">Facebook</Link>
        </div>
      </div>
    </footer>
  )
}
