import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
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
    { label: "Location", value: project.location },
    { label: "Timeline", value: project.timeline },
    { label: "Discipline", value: project.category },
  ];

  return (
    <main id="main" className="bg-white pt-[72px] text-charcoal">
      <article>
        <div className="relative h-[62vh] min-h-[380px] bg-charcoal md:h-[78vh]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-10 md:pb-14">
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-white/75 uppercase">
              {project.category} · {project.location}
            </p>
            <h1 className="mt-3 max-w-4xl font-display text-[clamp(36px,6vw,72px)] leading-[0.95] font-semibold tracking-[-0.04em] text-white">
              {project.name}
            </h1>
          </div>
        </div>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <p className="max-w-3xl font-display text-[clamp(22px,2.8vw,34px)] leading-[1.25] font-medium tracking-[-0.03em] lg:col-span-7">
              {project.summary}
            </p>
            <div className="lg:col-span-5">
              <dl className="grid gap-6 border-t border-n-300 pt-6 sm:grid-cols-3 lg:grid-cols-1">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-500 uppercase">{fact.label}</dt>
                    <dd className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="mt-12 max-w-3xl border-t border-n-300 pt-10">
            <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 uppercase">Brief</p>
            <p className="mt-4 text-[17px] leading-[1.7] text-n-700">{project.brief}</p>
            <p className="mt-6 text-sm text-n-500">{project.sourceNote}</p>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 md:gap-6 md:px-10">
          {project.frames.map((frame, frameIndex) => (
            <figure key={`${frame.src}-${frameIndex}`} className="relative h-[70vh] min-h-[400px] overflow-hidden bg-n-100 md:h-[84vh]">
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

        <section className="mx-auto w-full max-w-[1440px] px-6 py-14 md:px-10 md:py-20">
          <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 uppercase">Completion video</p>
          <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.03em]">
            Walk the finished room.
          </h2>
          {project.video.src ? (
            <div className="relative mt-8 aspect-video overflow-hidden bg-charcoal">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                poster={project.video.poster}
                src={project.video.src}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="relative mt-8 aspect-video overflow-hidden bg-charcoal">
              <Image src={project.video.poster} alt="" fill className="object-cover opacity-50" sizes="(min-width: 1440px) 1360px, 100vw" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/40 font-display text-sm tracking-[0.12em] uppercase">
                  Play
                </span>
                <p className="mt-5 font-display text-[15px] font-semibold tracking-[0.08em] uppercase">{project.video.label}</p>
                <p className="mt-2 max-w-md text-[15px] text-white/70">
                  Drop the completion film here when the client sends it. The poster stays until then.
                </p>
              </div>
            </div>
          )}
        </section>

        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-6 px-6 py-8 md:px-10">
          <Link href="/projects" className="font-display text-sm font-semibold tracking-[0.08em] uppercase">
            All work
          </Link>
          <Button href="/contact">Start a project like this</Button>
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-10">
          <Link href={`/projects/${next.id}`} className="group relative block h-[58vh] min-h-[340px] overflow-hidden bg-charcoal">
            <Image
              src={next.image}
              alt=""
              fill
              className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(min-width: 1440px) 1360px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white md:p-10">
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] uppercase text-white/70">Next project</p>
              <p className="mt-2 font-display text-[clamp(28px,4vw,52px)] leading-none font-medium tracking-[-0.04em]">{next.name}</p>
              <p className="mt-3 text-[14px] text-white/70">{next.location}</p>
            </div>
          </Link>
        </div>
      </article>
    </main>
  );
}
