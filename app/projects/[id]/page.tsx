import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { projects } from "@/data/projects";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return { title: "Project — Archiloom Studio" };
  return {
    title: `${project.name} — Archiloom Studio`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const index = projects.findIndex((item) => item.id === id);
  const project = projects[index];
  if (!project) notFound();
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Discipline", value: project.category },
    { label: "Drawing", value: project.imageLabel },
    { label: "Status", value: "Illustrative study" },
  ];

  return (
    <main id="main" className="pt-[72px]">
      <article>
        <div className="relative h-[68vh] min-h-[420px] bg-charcoal">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-charcoal/10" />
          <Container className="absolute inset-x-0 bottom-0 pb-10 text-white md:pb-14">
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-white/80 uppercase">{project.category}</p>
            <h1 className="mt-3 max-w-4xl font-display text-[clamp(40px,6vw,84px)] leading-[0.95] font-semibold tracking-[-0.04em]">
              {project.name}
            </h1>
          </Container>
        </div>
        <section className="bg-white py-14 text-charcoal md:py-20">
          <Container>
            <p className="max-w-3xl font-display text-[clamp(24px,3vw,36px)] leading-[1.25] font-medium tracking-[-0.03em]">
              {project.summary}
            </p>
            <dl className="mt-12 grid border-t border-n-300 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-n-300 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                  <dt className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-500 uppercase">{fact.label}</dt>
                  <dd className="mt-3 font-display text-[18px] font-semibold tracking-[-0.02em]">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 max-w-2xl text-[16px] leading-[1.7] text-n-700">
              This page is a layout study, not a record of a completed commission. The photograph is a stand-in until the studio sends the real project set.
            </p>
            <div className="mt-10">
              <Button href="/contact">Start a project like this</Button>
            </div>
          </Container>
        </section>
        <section className="border-t border-n-300 bg-n-100 py-14 md:py-20">
          <Container>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-700 uppercase">Next study</p>
            <Link href={`/projects/${next.id}`} className="group mt-6 grid items-center gap-8 md:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden border border-n-300 md:col-span-7">
                <Image
                  src={next.image}
                  alt={next.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
              </div>
              <div className="md:col-span-5">
                <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-700 uppercase">{next.category}</p>
                <h2 className="mt-3 font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.03em]">{next.name}</h2>
                <p className="mt-3 text-[16px] leading-[1.6] text-n-700">{next.summary}</p>
                <p className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold">
                  View project
                  <ArrowUpRight className="h-4 w-4 text-signal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
                </p>
              </div>
            </Link>
          </Container>
        </section>
      </article>
    </main>
  );
}
