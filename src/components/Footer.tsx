export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 dark:bg-[#0D0B14] bg-white border-t dark:border-[#2D2A3E] border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display text-sm tracking-tight">
          <span className="gradient-text dark:gradient-text-light">YO SOY</span>{" "}
          <span className="dark:text-white text-[#1A1A2E]">MANIZALES</span>
        </div>
        <p className="text-xs text-[var(--muted)] text-center">
          © {new Date().getFullYear()} Yo Soy Manizales · Agencia de Marketing Digital · Manizales, Colombia
        </p>
        <p className="text-xs text-[var(--muted)]">
          Hecho con{" "}
          <span className="text-pink-500">♥</span>{" "}
          en Manizales
        </p>
      </div>
    </footer>
  );
}
