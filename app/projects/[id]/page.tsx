import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <main id="main" className="bg-white pt-[72px] text-charcoal">
      <article>
        <header className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10 md:py-10">
          <div>
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-700 uppercase">{project.category}</p>
            <h1 className="mt-2 font-display text-[clamp(36px,5vw,64px)] leading-none font-medium tracking-[-0.04em]">{project.name}</h1>
          </div>
          <p className="max-w-sm text-[15px] leading-snug text-n-700">{project.summary}</p>
        </header>
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 md:gap-6 md:px-10">
          {project.frames.map((frame, frameIndex) => (
            <figure key={frame.src} className="relative h-[72vh] min-h-[420px] overflow-hidden bg-n-100 md:h-[86vh]">
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                priority={frameIndex === 0}
                className="object-cover"
                sizes="(min-width: 1440px) 1360px, 100vw"
              />
            </figure>
          ))}
        </div>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-8 md:px-10">
          <Link href="/projects" className="font-display text-sm font-semibold tracking-[0.08em] uppercase">
            All work
          </Link>
          <Link href="/contact" className="font-display text-sm font-semibold tracking-[0.08em] uppercase">
            Start a project
          </Link>
        </div>
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-10">
        <Link href={`/projects/${next.id}`} className="group relative block h-[62vh] min-h-[360px] overflow-hidden bg-charcoal">
          <Image src={next.image} alt="" fill className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]" sizes="(min-width: 1440px) 1360px, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white md:p-10">
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] uppercase text-white/70">Next</p>
            <p className="mt-2 font-display text-[clamp(32px,4vw,56px)] leading-none font-medium tracking-[-0.04em]">{next.name}</p>
          </div>
        </Link>
        </div>
      </article>
    </main>
  );
}
