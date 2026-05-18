"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 600, suffix: "+", label: "Empresas impulsadas", description: "Negocios de Manizales y Caldas" },
  { value: 47000, suffix: "+", label: "Seguidores en Instagram", description: "Comunidad digital activa" },
  { value: 10, suffix: "%", label: "De la población de Manizales", description: "Nos sigue en redes sociales" },
  { value: 4, suffix: " años", label: "De experiencia", description: "Creando contenido de alto impacto" },
];

function Counter({ value, suffix, label, description }: typeof stats[0]) {
  const numRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        { val: 0 },
        { val: value },
        {
          val: value,
          duration: 2,
          ease: "power2.out",
          snap: { val: value > 100 ? 10 : 1 },
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
          onUpdate: function () {
            if (numRef.current) {
              const v = Math.round(this.targets()[0].val);
              numRef.current.textContent =
                v >= 1000 ? (v / 1000).toFixed(0) + "K" : String(v);
            }
          },
        }
      );
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <div
      ref={cardRef}
      className="group relative p-8 rounded-2xl dark:bg-[#13111E] bg-white border dark:border-[#2D2A3E] border-gray-100 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}
      />
      <div className="font-display text-5xl sm:text-6xl dark:text-white text-[#1A1A2E] mb-2">
        <span ref={numRef}>0</span>
        <span className="gradient-text dark:gradient-text-light">{suffix}</span>
      </div>
      <div className="font-bold text-base dark:text-white text-[#1A1A2E] mb-1">{label}</div>
      <div className="text-sm text-[var(--muted)]">{description}</div>
    </div>
  );
}

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 dark:bg-[#0A0A0F] bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary dark:text-primary-light mb-4">
            Nuestro impacto
          </p>
          <h2 className="font-display text-4xl sm:text-5xl dark:text-white text-[#1A1A2E] leading-tight">
            NÚMEROS QUE
            <span className="gradient-text dark:gradient-text-light"> HABLAN</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Counter key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
