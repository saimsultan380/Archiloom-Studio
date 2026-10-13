import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesExtras } from "@/components/ServicesExtras";
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
        image="/images/northline-court.jpg"
        imageAlt="Courtyard looking toward a long glazed wing"
      />
      <ServicesGrid showHeading={false} />
      <ServicesExtras />
    </main>
  );
}
