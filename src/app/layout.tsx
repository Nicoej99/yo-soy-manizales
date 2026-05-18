import type { Metadata } from "next";
import { Anton, Epilogue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yo Soy Manizales — Agencia de Marketing Digital",
  description:
    "Impulsamos empresas de Manizales y Caldas con videos cortos de alto impacto. +600 empresas, +47.000 seguidores. Descubre el potencial de tu negocio.",
  keywords: ["marketing digital", "Manizales", "Caldas", "videos cortos", "redes sociales", "agencia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${anton.variable} ${epilogue.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
