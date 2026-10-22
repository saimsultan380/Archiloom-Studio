import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ServicesExtras } from "@/components/ServicesExtras";
import { ServicesGrid } from "@/components/ServicesGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Archiloom Studio",
  description:
    "Architecture, interiors, Revit drafting, permit sets, 3D modeling, rendering and architectural animation from Archiloom Studio.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <main id="main" className="pt-[72px]">
      <Container className="pt-6">
        <PageBreadcrumbs items={[{ name: "Services", path: "/services/" }]} />
      </Container>
      <PageHero
        label="Services"
        title={
          <>
            Services we offer <span className="title-accent">in detail</span>
          </>
        }
        description="Design and documentation for homeowners, developers, contractors and AEC firms."
        image="/images/stone-lobby.jpg"
        imageAlt="Stone lobby with a long timber bench and soft daylight"
      />
      <ServicesGrid showHeading={false} />
      <ServicesExtras />
    </main>
  );
}
