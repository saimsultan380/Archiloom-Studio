import type { Metadata } from "next";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { ProjectIndex } from "@/components/ProjectIndex";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects — Archiloom Studio",
  description:
    "Client architecture, interior and commercial case studies from Archiloom Studio — locations, briefs, image sets and completion media.",
  path: "/projects/",
});

export default function ProjectsPage() {
  return (
    <main id="main" className="pt-[72px]">
      <PageBreadcrumbs items={[{ name: "Projects", path: "/projects/" }]} />
      <ProjectIndex />
    </main>
  );
}
