import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const featuredProducts = products || [];

  return (
    <div className="w-full">
      <Hero />

      {/* Modelos Section */}
      <section id="modelos" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4 uppercase">
            Nuestros <span className="text-primary">Modelos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Explora la gama SNAEFELL. Desde la elegancia urbana hasta la potencia deportiva, 
            tenemos el monopatín perfecto para tu estilo de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sobre Nosotros - Essencia from Screenshot */}
      <section id="nosotros" className="py-24 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-8 uppercase leading-tight">
              Sobre <span className="text-primary">Nosotros</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                En <span className="text-white font-bold">Snaefell</span> creemos en una movilidad eléctrica que combine potencia, diseño y libertad real de movimiento. Desarrollamos monopatines pensados para el uso urbano y la aventura cotidiana, con foco en la calidad constructiva y la experiencia del usuario.
              </p>
              <p>
                Cada modelo nace de un proceso de diseño cuidadoso, donde la ingeniería y la identidad visual trabajan juntas para ofrecer un producto confiable, versátil y con carácter propio.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
             <Image 
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop"
                alt="Factory"
                fill
                className="object-cover"
             />
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
