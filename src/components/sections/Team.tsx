"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: "Laura Correa Botero", role: "Directora de Agencia", bg: "#7C3AED" },
  { name: "Daniel Hoyos Gómez", role: "Cofundador & Estrategia", bg: "#F59E0B" },
  { name: "Luis Alejandro Garzón", role: "Cofundador & Finanzas", bg: "#10B981" },
  { name: "Carolina Patiño", role: "Guionista & Administración", bg: "#EC4899" },
  { name: "María Daniela Rico", role: "Editora Senior", bg: "#6366F1" },
  { name: "María Camila Pineda", role: "Artista Visual & Animación", bg: "#F97316" },
  { name: "Daniela Garzón Correa", role: "Comunidad & Administración", bg: "#14B8A6" },
  { name: "Sara Alzate Botero", role: "Asuntos Legales", bg: "#8B5CF6" },
];

export default function Team() {
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
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="equipo" ref={sectionRef} className="py-24 px-4 sm:px-6 dark:bg-[#0D0B14] bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary dark:text-primary-light mb-4">
            Quiénes somos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl dark:text-white text-[#1A1A2E] leading-tight mb-4">
            EL EQUIPO
            <span className="gradient-text dark:gradient-text-light"> DETRÁS</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto text-base">
            Estrategas, creativos, editores y abogados — todos con un objetivo: impulsar las empresas de Manizales.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col items-center gap-4 p-6 rounded-2xl dark:bg-[#13111E] bg-[#FAFAF9] border dark:border-[#2D2A3E] border-gray-100 hover:border-primary/30 transition-all duration-300 text-center hover:-translate-y-1"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${member.bg}, ${member.bg}88)` }}
              >
                {member.name.split(" ")[0][0]}{member.name.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <p className="font-semibold text-sm dark:text-white text-[#1A1A2E] leading-tight mb-1">
                  {member.name}
                </p>
                <p className="text-xs text-[var(--muted)]">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
