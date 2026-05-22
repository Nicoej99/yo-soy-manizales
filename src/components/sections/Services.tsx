"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, MessageSquare, BarChart2, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: TrendingUp,
    name: "Potenciamiento",
    desc: "Creamos y administramos tus redes sociales desde cero. Posicionamiento de marca y aumento de ventas para empresas que quieren dar el salto digital.",
    tag: "Para negocios nuevos en digital",
    color: "#1D3A6E",
  },
  {
    icon: MessageSquare,
    name: "Asesoría",
    desc: "Consultoría estratégica para empresas con presencia digital estancada. Te mostramos exactamente qué cambiar y cómo crecer.",
    tag: "Para canales que no crecen",
    color: "#F5A41C",
  },
  {
    icon: BarChart2,
    name: "Análisis",
    desc: "Evaluación detallada de tus canales actuales. Identificamos problemas, oportunidades y el camino claro hacia el siguiente nivel.",
    tag: "Para tomar decisiones con datos",
    color: "#72B82C",
  },
  {
    icon: Heart,
    name: "Humanización",
    desc: "Mostramos la cara humana de tu empresa. Contenido que genera conexión real, confianza y fidelidad en tu comunidad digital.",
    tag: "Para marcas con alma",
    color: "#E87C1E",
  },
];

export default function Services() {
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
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="py-24 px-4 sm:px-6 dark:bg-[#060C18] bg-[#F5F8FF] relative overflow-hidden">
      {/* Background phrase — diagonal bottom-right */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden pb-8 pr-4">
        <span
          className="font-display text-[10vw] dark:text-white/[0.025] text-[#1D3A6E]/[0.04] leading-none whitespace-nowrap"
          style={{ transform: "rotate(8deg) translateX(5%)" }}
        >
          YO COMPRO LO NUESTRO
        </span>
      </div>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary dark:text-primary-light mb-4">
            Lo que hacemos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl dark:text-white text-[#1A1A2E] leading-tight mb-4">
            SERVICIOS QUE
            <span className="gradient-text dark:gradient-text-light"> TRANSFORMAN</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto text-base">
            Aliados con <strong className="dark:text-white text-[#1A1A2E]">Nativo AdsPro</strong> para publicidad en
            Google Ads, Meta Ads y TikTok Ads. Sin límites de industria.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="group relative p-8 rounded-2xl dark:bg-[#13111E] bg-[#FAFAF9] border dark:border-[#2D2A3E] border-gray-100 hover:border-primary/40 transition-all duration-400 overflow-hidden cursor-pointer"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${s.color}12 0%, transparent 60%)`,
                  }}
                />

                {/* Top line accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: s.color }}
                />

                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}20` }}
                >
                  <Icon size={22} style={{ color: s.color }} />
                </div>

                <span
                  className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4"
                  style={{ background: `${s.color}15`, color: s.color }}
                >
                  {s.tag}
                </span>

                <h3 className="font-display text-2xl dark:text-white text-[#1A1A2E] mb-3">
                  {s.name.toUpperCase()}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed text-sm">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
