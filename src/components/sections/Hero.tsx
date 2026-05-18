"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Curtain opens from center
      tl.to([curtainLeftRef.current, curtainRightRef.current], {
        scaleX: 0,
        duration: 1.2,
        ease: "expo.inOut",
        stagger: 0,
      })
        .fromTo(
          orb1Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.6, duration: 1.4, ease: "elastic.out(1, 0.5)" },
          "-=0.6"
        )
        .fromTo(
          orb2Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.4, duration: 1.4, ease: "elastic.out(1, 0.5)" },
          "-=1.2"
        )
        .fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.8"
        )
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
          "-=0.5"
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );

      // Scroll parallax
      gsap.to(contentRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Orb float loop
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 25,
        x: -15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll indicator bounce
      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-[#0A0A0F] bg-[#FAFAF9]"
    >
      {/* Curtain panels */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-primary origin-left z-30"
        style={{ transformOrigin: "left center" }}
      />
      <div
        ref={curtainRightRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-accent origin-right z-30"
        style={{ transformOrigin: "right center" }}
      />

      {/* Background orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <p
          ref={taglineRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-white/10 bg-primary/10 text-primary dark:text-primary-light text-sm font-semibold tracking-widest uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Agencia de Marketing Digital · Manizales & Caldas
        </p>

        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-6"
        >
          <span className="block dark:text-white text-[#1A1A2E]">DESCUBRE EL</span>
          <span className="block gradient-text dark:gradient-text-light">
            POTENCIAL
          </span>
          <span className="block dark:text-white text-[#1A1A2E]">DE TU EMPRESA</span>
        </h1>

        <p
          ref={subRef}
          className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Impulsamos empresas de Manizales y Caldas con vídeos cortos de alto
          impacto. Más de{" "}
          <strong className="dark:text-white text-[#1A1A2E]">600 negocios</strong>{" "}
          ya lo descubrieron.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 cursor-pointer"
          >
            Impulsa tu empresa
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a
            href="https://www.instagram.com/yosoymanizales/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-8 py-4 rounded-full dark:border-white/20 border-black/20 border dark:text-white text-[#1A1A2E] font-semibold text-base hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer"
          >
            <Play size={16} className="fill-current" />
            Ver trabajos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-[var(--muted)] tracking-widest uppercase">
          Descubre
        </span>
        <ArrowDown size={16} className="text-[var(--muted)]" />
      </div>
    </section>
  );
}
