import type { Metadata } from "next";
import { ProjectIndex } from "@/components/ProjectIndex";

export const metadata: Metadata = {
  title: "Projects — Archiloom Studio",
  description: "Illustrative architecture, interior, commercial and visualization studies.",
};

export default function ProjectsPage() {
  return (
    <main id="main" className="pt-[72px]">
      <ProjectIndex />
    </main>
  );
}
