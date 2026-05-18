import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import Portfolio from "@/components/sections/Portfolio";
import SocialImpact from "@/components/sections/SocialImpact";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <HowItWorks />
        <Portfolio />
        <SocialImpact />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
