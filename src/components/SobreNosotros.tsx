import Link from 'next/link';

export default function SobreNosotros() {
  return (
    <section id="nosotros" className="bg-background text-white py-40 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* First Column - About */}
          <div className="md:col-span-12 lg:col-span-5">
            <h2 className="text-5xl md:text-6xl font-light mb-10 tracking-tight">Sobre nosotros</h2>
            <div className="space-y-6 text-base text-gray-300 leading-relaxed pr-4">
              <p>
                En <span className="font-bold text-white">Snaefell</span> creemos en una movilidad eléctrica que combine potencia, diseño y libertad real de movimiento. Desarrollamos monopatines pensados para el uso urbano y la aventura cotidiana, con foco en la calidad constructiva, la seguridad y la experiencia del usuario.
              </p>
              <p>
                Cada modelo nace de un proceso de diseño cuidadoso, donde la ingeniería y la identidad visual trabajan juntas para ofrecer un producto confiable, versátil y con carácter propio. Snaefell no es sólo un medio de transporte: es una forma de moverse sin límites, adaptada al ritmo de cada persona.
              </p>
            </div>
          </div>

          {/* Second Column - F1 */}
          <div className="md:col-span-6 lg:col-span-3 lg:col-start-7 pt-2">
            <h3 className="text-4xl font-light mb-6 tracking-tight">Bestride-F1</h3>
            <p className="text-base text-gray-300 mb-8 leading-relaxed">
              <span className="font-semibold text-white">Urbano & dinámico</span> para quienes buscan ir más allá redefiniendo la experiencia de movilidad eléctrica.
            </p>
            <Link href="/f1" className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white text-base py-3 px-8 rounded-md transition-colors">
              Ver más <span className="ml-2 font-light">&gt;</span>
            </Link>
          </div>

          {/* Third Column - F2 */}
          <div className="md:col-span-6 lg:col-span-3 pt-2">
            <h3 className="text-4xl font-light mb-6 tracking-tight">Bestride pro-F2</h3>
            <p className="text-base text-gray-300 mb-8 leading-relaxed">
              <span className="font-semibold text-white">Deportivo & aventurero</span> con un diseño para conquistar la ciudad, combinando rendimiento y estilo.
            </p>
            <Link href="/f2" className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white text-base py-3 px-8 rounded-md transition-colors">
              Ver más <span className="ml-2 font-light">&gt;</span>
            </Link>
          </div>

        </div>
        
        {/* Bottom divider line */}
        <div className="w-full h-px bg-white/20 mt-28"></div>
      </div>
    </section>
  );
}
