import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesGrid } from "@/components/ServicesGrid";

export const metadata: Metadata = {
  title: "Services — Archiloom Studio",
  description: "Design and documentation for homeowners, developers, contractors and AEC firms.",
};

export default function ServicesPage() {
  return (
    <main id="main" className="pt-[72px]">
      <PageHero
        label="Services"
        title={<>Services we offer <span className="title-accent">in detail</span></>}
        description="Design and documentation for homeowners, developers, contractors and AEC firms."
        image="/images/courtyard-house.jpg"
        imageAlt="Low courtyard house in pale concrete and timber"
      />
      <ServicesGrid showHeading={false} />
    </main>
  );
}
