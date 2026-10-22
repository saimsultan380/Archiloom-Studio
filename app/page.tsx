import type { Metadata } from "next";
import { Suspense } from "react";
import { About } from "@/components/About";
import { ClientsGrid } from "@/components/ClientsGrid";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { ProofStrip } from "@/components/ProofStrip";
import { ReviewsTicker } from "@/components/ReviewsTicker";
import { ServiceBar } from "@/components/ServiceBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Team } from "@/components/Team";
import { studio } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: studio.title,
  description: studio.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd([])} />
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
