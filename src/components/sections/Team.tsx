"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TeamScene = dynamic(() => import("./TeamScene"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "#F5A41C", borderTopColor: "transparent" }}
      />
    </div>
  ),
});

export default function Team() {
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
    <section
      id="equipo"
      ref={sectionRef}
      className="py-24 dark:bg-[#060C18] bg-[#F5F8FF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headingRef} className="text-center mb-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#1D3A6E] dark:text-[#4A85D9] mb-4">
            Quiénes somos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl dark:text-white text-[#0D1E3A] leading-tight mb-4">
            EL EQUIPO
            <span className="gradient-text dark:gradient-text-light"> DETRÁS</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto text-base">
            Estrategas, creativos, editores y abogados — todos con un objetivo: impulsar las empresas de Manizales.
          </p>
        </div>
      </div>

      <TeamScene />
    </section>
  );
}
