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
