"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Cathedral silhouette of Catedral Basílica de Manizales
// Central spire is ~1.6x taller than corner towers (119m vs 62m real proportions)
// Split exactly at x=50 so each curtain panel reveals its half
function Cathedral({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      style={style}
    >
      <g fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.035)" strokeWidth="0.25">

        {/* ── FACADE BODY ─────────────────────────────── */}
        <rect x="18" y="65" width="64" height="35" />
        {/* Horizontal cornice band */}
        <rect x="18" y="63" width="64" height="3" fill="rgba(255,255,255,0.18)" />

        {/* ── CENTRAL MAIN TOWER ─────────────────────── */}
        {/* Tower body — narrow, tall */}
        <rect x="43" y="32" width="14" height="33" />
        {/* Spire — very tall triangle, dominates skyline */}
        <polygon points="43,32 57,32 50,3" />
        {/* Cross vertical */}
        <rect x="49.3" y="1" width="1.4" height="5.5" />
        {/* Cross horizontal */}
        <rect x="47.2" y="3.2" width="5.6" height="1.4" />
        {/* Octagonal transition ring */}
        <rect x="42" y="30" width="16" height="3" fill="rgba(255,255,255,0.2)" />
        {/* Tower lancet window */}
        <rect x="46.5" y="38" width="7" height="10" rx="3.5" fill="rgba(0,0,0,0.25)" />

        {/* ── INNER LEFT TOWER ───────────────────────── */}
        <rect x="30" y="43" width="13" height="22" />
        <polygon points="30,43 43,43 36.5,25" />
        {/* Window */}
        <rect x="33.5" y="49" width="4" height="7" rx="2" fill="rgba(0,0,0,0.25)" />

        {/* ── INNER RIGHT TOWER ──────────────────────── */}
        <rect x="57" y="43" width="13" height="22" />
        <polygon points="57,43 70,43 63.5,25" />
        <rect x="62.5" y="49" width="4" height="7" rx="2" fill="rgba(0,0,0,0.25)" />

        {/* ── OUTER LEFT TOWER ───────────────────────── */}
        <rect x="18" y="50" width="12" height="15" />
        <polygon points="18,50 30,50 24,34" />
        <rect x="21" y="55" width="3.5" height="5" rx="1.75" fill="rgba(0,0,0,0.25)" />

        {/* ── OUTER RIGHT TOWER ──────────────────────── */}
        <rect x="70" y="50" width="12" height="15" />
        <polygon points="70,50 82,50 76,34" />
        <rect x="75.5" y="55" width="3.5" height="5" rx="1.75" fill="rgba(0,0,0,0.25)" />

        {/* ── THREE GOTHIC PORTALS ───────────────────── */}
        {/* Left portal */}
        <rect x="21" y="80" width="11" height="20" fill="rgba(0,0,0,0.3)" />
        <path d="M21,80 Q21,72 26.5,68 Q32,72 32,80 Z" fill="rgba(0,0,0,0.3)" />
        {/* Center portal — split at x=50 */}
        <rect x="41" y="76" width="18" height="24" fill="rgba(0,0,0,0.3)" />
        <path d="M41,76 Q41,65 50,60 Q59,65 59,76 Z" fill="rgba(0,0,0,0.3)" />
        {/* Right portal */}
        <rect x="68" y="80" width="11" height="20" fill="rgba(0,0,0,0.3)" />
        <path d="M68,80 Q68,72 73.5,68 Q79,72 79,80 Z" fill="rgba(0,0,0,0.3)" />

        {/* ── ROSE WINDOW (above center portal) ──────── */}
        <circle cx="50" cy="57" r="5" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" />
        <circle cx="50" cy="57" r="2.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="50" y1="52" x2="50" y2="62" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
        <line x1="45" y1="57" x2="55" y2="57" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />
        <line x1="46.5" y1="53.5" x2="53.5" y2="60.5" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        <line x1="53.5" y1="53.5" x2="46.5" y2="60.5" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

        {/* ── FLYING BUTTRESSES ──────────────────────── */}
        <line x1="8" y1="55" x2="18" y2="65" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="55" x2="82" y2="65" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" />

        {/* ── BASE STEPS ─────────────────────────────── */}
        <rect x="28" y="88" width="44" height="3" />
        <rect x="31" y="91" width="38" height="3" />
        <rect x="34" y="94" width="32" height="3" />
        <rect x="37" y="97" width="26" height="3" />
      </g>
    </svg>
  );
}

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
  const sideTagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Cathedral doors slide open
      tl.to(curtainLeftRef.current, {
        x: "-100%",
        duration: 1.5,
        ease: "expo.inOut",
      }, 0)
        .to(curtainRightRef.current, {
          x: "100%",
          duration: 1.5,
          ease: "expo.inOut",
        }, 0)
        .fromTo(
          orb1Ref.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.6, duration: 1.4, ease: "elastic.out(1, 0.5)" },
          "-=0.7"
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
          sideTagRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
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
        y: -30, x: 20, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 25, x: -15, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // Scroll indicator bounce
      gsap.to(scrollRef.current, {
        y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-[#060C18] bg-[#F5F8FF]"
    >
      {/* ── Cathedral curtain panels ─────────────────────────────────── */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-y-0 left-0 w-1/2 z-30 overflow-hidden"
        style={{ background: "#1D3A6E" }}
      >
        {/* Cathedral spans full screen width; overflow:hidden reveals left half only */}
        <Cathedral
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "200%",
            height: "88%",
          }}
        />
        {/* Subtle "La ciudad de las puertas abiertas" label during load */}
        <div
          className="absolute bottom-8 right-0 translate-x-1/2 text-center"
          style={{ pointerEvents: "none" }}
        >
          <p
            className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-semibold"
            style={{ writingMode: "vertical-rl" }}
          >
            Las puertas abiertas
          </p>
        </div>
      </div>

      <div
        ref={curtainRightRef}
        className="absolute inset-y-0 right-0 w-1/2 z-30 overflow-hidden"
        style={{ background: "#1D3A6E" }}
      >
        {/* Same SVG but offset left so right half aligns with this panel */}
        <Cathedral
          style={{
            position: "absolute",
            bottom: 0,
            left: "-100%",
            width: "200%",
            height: "88%",
          }}
        />
      </div>

      {/* ── Background orbs ──────────────────────────────────────────── */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(29,58,110,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,164,28,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Grid lines ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29,58,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(29,58,110,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Side tagline (vertical, fills empty margins) ─────────────── */}
      <div
        ref={sideTagRef}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10 opacity-0"
      >
        <div className="w-px h-16 dark:bg-white/10 bg-black/10" />
        <p
          className="text-[10px] font-semibold tracking-[0.35em] uppercase dark:text-white/25 text-black/20"
          style={{ writingMode: "vertical-rl" }}
        >
          La ciudad de las puertas abiertas
        </p>
        <div className="w-px h-16 dark:bg-white/10 bg-black/10" />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
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
          <span className="block dark:text-white text-[#0D1E3A]">DESCUBRE EL</span>
          <span className="block gradient-text dark:gradient-text-light">POTENCIAL</span>
          <span className="block dark:text-white text-[#0D1E3A]">DE TU EMPRESA</span>
        </h1>

        <p
          ref={subRef}
          className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Impulsamos empresas de Manizales y Caldas con vídeos cortos de alto impacto. Más de{" "}
          <strong className="dark:text-white text-[#0D1E3A]">600 negocios</strong>{" "}
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
            className="group flex items-center gap-2 px-8 py-4 rounded-full dark:border-white/20 border-black/20 border dark:text-white text-[#0D1E3A] font-semibold text-base hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer"
          >
            <Play size={16} className="fill-current" />
            Ver trabajos
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-[var(--muted)] tracking-widest uppercase">Descubre</span>
        <ArrowDown size={16} className="text-[var(--muted)]" />
      </div>
    </section>
  );
}
