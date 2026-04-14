import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-muted py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-black italic tracking-tighter text-white mb-6 block">
            SNAE<span className="text-primary">FELL</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Redefiniendo la movilidad eléctrica con potencia, estilo e ingeniería de vanguardia.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Navegación</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link href="/#modelos" className="hover:text-primary transition-colors">Modelos</Link></li>
            <li><Link href="/#nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/#novedades" className="hover:text-primary transition-colors">Novedades</Link></li>
            <li><Link href="/distribuidor" className="hover:text-primary transition-colors">Ser Distribuidor</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Soporte</h4>
           <ul className="space-y-4 text-sm text-gray-500">
             <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
             <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
             <li><Link href="/garantia" className="hover:text-primary transition-colors">Garantía</Link></li>
           </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
          <p className="text-sm text-gray-500 mb-4">Suscríbete para recibir novedades y ofertas.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Tu email" 
              className="bg-black border border-white/10 rounded-l-full px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors"
            />
            <button className="bg-primary px-4 py-2 rounded-r-full text-xs font-bold uppercase hover:bg-primary/90 transition-colors">
              Unirse
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>© 2026 SNAEFELL. Todos los derechos reservados.</p>
        <div className="flex space-x-6">
          <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
        </div>
      </div>
    </footer>
  )
}
