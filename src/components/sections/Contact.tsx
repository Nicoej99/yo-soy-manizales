"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 relative overflow-hidden dark:bg-[#0A0A0F] bg-[#FAFAF9]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.15) 0%, transparent 60%)",
        }}
      />

      <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary dark:text-primary-light mb-4">
          Hablemos
        </p>

        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl dark:text-white text-[#1A1A2E] leading-none mb-6">
          ¿LISTO PARA
          <br />
          <span className="gradient-text dark:gradient-text-light">DESCUBRIRTE?</span>
        </h2>

        <p className="text-lg text-[var(--muted)] mb-10 max-w-lg mx-auto">
          Cuéntanos sobre tu empresa. Sin compromisos — solo una conversación para ver cómo podemos impulsarte.
        </p>

        {/* Primary CTA */}
        <a
          href="https://wa.me/573206551167?text=Hola,%20quiero%20conocer%20más%20sobre%20sus%20servicios"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/30 mb-10 cursor-pointer"
        >
          <MessageCircle size={22} />
          Escríbenos por WhatsApp
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>

        {/* Secondary contacts */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:holayosoymanizales@gmail.com"
            className="flex items-center gap-2 px-6 py-3 rounded-full dark:border-white/20 border-black/20 border dark:text-white text-[#1A1A2E] hover:border-primary hover:text-primary transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            <Mail size={16} />
            holayosoymanizales@gmail.com
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/yosoymanizales/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-3 rounded-full dark:bg-white/10 bg-black/5 hover:scale-110 transition-all duration-200 cursor-pointer"
            style={{ color: "#E1306C" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/yosoymanizalesoficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-3 rounded-full dark:bg-white/10 bg-black/5 hover:scale-110 transition-all duration-200 cursor-pointer"
            style={{ color: "#1877F2" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@yosoymanizales1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="p-3 rounded-full dark:bg-white/10 bg-black/5 hover:scale-110 transition-all duration-200 cursor-pointer dark:text-white text-[#1A1A2E]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.89a8.2 8.2 0 004.83 1.56V7a4.85 4.85 0 01-1.06-.31z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
