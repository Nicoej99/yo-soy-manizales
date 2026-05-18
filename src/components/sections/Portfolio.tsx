"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { emoji: "☕", label: "Cafés especiales", count: "12+" },
  { emoji: "🛒", label: "Tiendas y comercios", count: "80+" },
  { emoji: "🐾", label: "Tiendas de mascotas", count: "15+" },
  { emoji: "🍽️", label: "Restaurantes", count: "35+" },
  { emoji: "💪", label: "Deportes y salud", count: "25+" },
  { emoji: "🏗️", label: "Construcción e inmuebles", count: "20+" },
  { emoji: "🎨", label: "Creativos y diseño", count: "18+" },
  { emoji: "⚖️", label: "Legal y profesional", count: "10+" },
  { emoji: "🌿", label: "Bienestar y estética", count: "30+" },
  { emoji: "🍎", label: "Alimentos y mercados", count: "45+" },
  { emoji: "🖥️", label: "Tecnología y servicios", count: "22+" },
  { emoji: "🎓", label: "Educación y formación", count: "14+" },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        gridRef.current!.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.05,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impacto" ref={sectionRef} className="py-24 px-4 sm:px-6 dark:bg-[#0D0B14] bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary dark:text-primary-light mb-4">
            Industrias que impulsamos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl dark:text-white text-[#1A1A2E] leading-tight mb-4">
            +600 EMPRESAS,
            <span className="gradient-text dark:gradient-text-light"> SIN LÍMITES</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto text-base">
            De la tienda de barrio al negocio de alto impacto — trabajamos con todas las industrias de Manizales y Caldas.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl dark:bg-[#13111E] bg-[#FAFAF9] border dark:border-[#2D2A3E] border-gray-100 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 text-center cursor-default"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                {cat.emoji}
              </span>
              <span className="text-sm font-medium dark:text-white text-[#1A1A2E] leading-tight">
                {cat.label}
              </span>
              <span className="text-xs font-bold text-primary dark:text-primary-light">
                {cat.count}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial highlight */}
        <div className="mt-16 relative p-8 sm:p-12 rounded-3xl dark:bg-[#13111E] bg-[#FAFAF9] border dark:border-[#2D2A3E] border-gray-100 text-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%)",
            }}
          />
          <p className="font-display text-2xl sm:text-3xl dark:text-white text-[#1A1A2E] mb-4 relative z-10">
            "IMPULSAR A LAS EMPRESAS AL ÉXITO CON UN{" "}
            <span className="gradient-text dark:gradient-text-light">PRECIO DEMOCRATIZADO"</span>
          </p>
          <p className="text-[var(--muted)] text-sm relative z-10">
            Nuestra promesa a cada empresa de Manizales y Caldas
          </p>
        </div>
      </div>
    </section>
  );
}
