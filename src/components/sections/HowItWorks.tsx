"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Lightbulb, Video, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Analizamos tu empresa",
    desc: "Entendemos tu negocio, tu mercado y tu audiencia ideal. Nada genérico — todo a la medida.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Diseñamos la estrategia",
    desc: "Creamos un plan de contenido con guiones, formatos y calendarios pensados para generar resultados reales.",
  },
  {
    number: "03",
    icon: Video,
    title: "Producimos el contenido",
    desc: "Videos cortos de alto impacto listos para Instagram, TikTok y Facebook. Producción profesional, precio democratizado.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lanzamos y escalamos",
    desc: "Publicamos, medimos y optimizamos continuamente. Tu empresa crece, nosotros ajustamos.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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
        stepsRef.current!.children,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 dark:bg-[#0B1626] bg-[#FFFBF2] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary dark:text-primary-light mb-4">
            El proceso
          </p>
          <h2 className="font-display text-4xl sm:text-5xl dark:text-white text-[#1A1A2E] leading-tight">
            ASÍ
            <span className="gradient-text dark:gradient-text-light"> FUNCIONA</span>
          </h2>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex gap-6 p-8 rounded-2xl dark:bg-[#13111E] bg-white border dark:border-[#2D2A3E] border-gray-100 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <span className="font-display text-6xl opacity-10 dark:text-white text-[#1A1A2E] leading-none">
                    {step.number}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon size={18} className="text-primary dark:text-primary-light" />
                    </div>
                    <h3 className="font-bold text-base dark:text-white text-[#1A1A2E]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

