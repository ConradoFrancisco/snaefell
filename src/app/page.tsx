import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SobreNosotros from "@/components/SobreNosotros";
import ProductCard from "@/components/ProductCard";
import CustomButton from "@/components/Button";
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

      {/* Sobre Nosotros - Essencia */}
      <SobreNosotros />

      {/* Modelos Section */}
      {/*  <section id="modelos" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 uppercase">
            Nuestros <span className="text-primary">Modelos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Explora la gama SNAEFELL. Desde la elegancia urbana hasta la potencia deportiva, 
            tenemos el monopatín perfecto para tu estilo de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full h-64 flex items-center justify-center text-gray-500 italic">
               Cargando modelos...
            </div>
          )}
        </div>
      </section> */}

      {/* CTA Section */}
      <section id="contacto" className="py-32 bg-primary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase italic mb-8">¿Querés distribuir Snaefell?</h2>
          <p className="text-xl text-gray-400 mb-12">Sumate a la red de movilidad eléctrica más innovadora del país.</p>
          <Link href="https://wa.me/5491164454997?text=Hola%2C%20quiero%20ser%20distribuidor" target="_blank">
            <CustomButton size="lg" className="px-16 py-6 rounded-full font-black uppercase italic tracking-widest text-lg">Contactar ahora</CustomButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
