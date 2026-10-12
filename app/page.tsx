import { Suspense } from "react";
import { About } from "@/components/About";
import { ClientsGrid } from "@/components/ClientsGrid";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { ProofStrip } from "@/components/ProofStrip";
import { ReviewsTicker } from "@/components/ReviewsTicker";
import { ServiceBar } from "@/components/ServiceBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Team } from "@/components/Team";

export default function HomePage() {
  return (
    <main id="main">
        <Hero />
        <ServiceBar />
        <ProofStrip />
        <ServicesGrid />
        <Pricing />
        <Portfolio />
        <ReviewsTicker />
        <Team />
        <ClientsGrid />
        <About />
        <Process />
        <Suspense fallback={<div className="h-96 bg-white" aria-hidden />}>
          <Contact />
        </Suspense>
    </main>
  );
}
