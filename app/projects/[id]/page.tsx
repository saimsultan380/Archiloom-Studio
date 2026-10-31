import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { ProjectDetail } from "@/components/ProjectDetail";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) {
    return pageMetadata({
      title: "Project — Archiloom Studio",
      description: "Project case study from Archiloom Studio.",
      path: `/projects/${id}/`,
      index: false,
    });
  }
  return pageMetadata({
    title: `${project.name} — Archiloom Studio`,
    description: project.summary,
    path: `/projects/${project.id}/`,
    ogType: "article",
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const index = projects.findIndex((item) => item.id === id);
  const project = projects[index];
  if (!project) notFound();
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" className="bg-white pt-[72px] text-charcoal">
      <PageBreadcrumbs
        items={[
          { name: "Projects", path: "/projects/" },
          { name: project.name, path: `/projects/${project.id}/` },
        ]}
      />
      <ProjectDetail project={project} next={next} />
    </main>
  );
}
