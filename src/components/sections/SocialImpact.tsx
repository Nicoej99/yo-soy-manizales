"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import CoffeeBeans from "@/components/CoffeeBeans";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    name: "Alejandro",
    role: "Vendedor de galletas",
    story:
      "Vendía galletas en el túnel de Manizales. Compramos todo su inventario y le gestionamos atención dental. Hoy avanzamos hacia conseguirle trabajo estable.",
    color: "#F5A41C",
  },
  {
    name: "Edilberto",
    role: "Emprendedor — No Pare Sigue Sigue",
    story:
      "Panadero profesional que montó su propio café. Le dimos visibilidad a sus productos tradicionales y su historia llegó a miles.",
    color: "#72B82C",
  },
  {
    name: "Leidy & Kliss",
    role: "Emprendedoras venezolanas — Chikiluki",
    story:
      "Profesionales venezolanas vendiendo café puerta a puerta. Compramos grandes cantidades y hoy promocionamos su sueño de tener un café propio.",
    color: "#1D3A6E",
  },
  {
    name: "Fundación Estoy Contigo",
    role: "Rescate de gatos callejeros",
    story:
      "Con Mishis Planet, proveemos alimento y visibilidad para gatos en situación de calle. La comunidad crece y cada post salva vidas.",
    color: "#2E6BC7",
  },
];

export default function SocialImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        cardsRef.current!.children,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 dark:bg-[#040E0A] bg-[#F2FAF5] relative overflow-hidden">
      <CoffeeBeans variant="left" />
      {/* Background phrase — vertical left side */}
      <div className="absolute inset-0 flex items-center justify-start pl-4 pointer-events-none select-none overflow-hidden">
        <span
          className="font-display text-[7vw] dark:text-white/[0.025] text-black/[0.03] leading-none"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
        >
          ORGULLO QUE NOS UNE
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 text-sm font-semibold mb-6">
            <Heart size={14} className="fill-current" />
            Impacto social
          </div>
          <h2 className="font-display text-4xl sm:text-5xl dark:text-white text-[#1A1A2E] leading-tight mb-4">
            MÁS QUE
            <span className="gradient-text dark:gradient-text-light"> MARKETING</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto text-base">
            Un porcentaje de nuestras ganancias va directo a comunidades vulnerables de Manizales. Estas son algunas de sus historias.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((s) => (
            <div
              key={s.name}
              className="group relative p-8 rounded-2xl dark:bg-[#13111E] bg-white border dark:border-[#2D2A3E] border-gray-100 hover:border-pink-400/40 transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-2xl transition-all duration-300 group-hover:w-2"
                style={{ background: s.color }}
              />
              <div className="pl-4">
                <div
                  className="inline-block w-10 h-10 rounded-full mb-4 flex items-center justify-center font-display text-lg text-white"
                  style={{ background: s.color }}
                >
                  {s.name[0]}
                </div>
                <h3 className="font-bold text-base dark:text-white text-[#1A1A2E] mb-1">
                  {s.name}
                </h3>
                <p className="text-xs font-semibold mb-4" style={{ color: s.color }}>
                  {s.role}
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{s.story}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
