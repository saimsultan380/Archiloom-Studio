"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import {
  ProjectFrameGrid,
  ProjectGallery,
  ProjectGalleryTile,
} from "@/components/ProjectGallery";
import type { Project, ProjectFrame } from "@/data/projects";

export function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const facts = [
    { label: "Location", value: project.location },
    { label: "Timeline", value: project.timeline },
    { label: "Discipline", value: project.category },
  ];

  const galleryItems: ProjectFrame[] = [
    { src: project.image, alt: project.imageAlt },
    ...project.frames,
  ];
  const isLoop =
    Boolean(project.video.src) &&
    (project.video.kind === "gif" ||
      project.video.src.endsWith(".gif") ||
      project.video.src.includes("-completion."));
  const isFilm = Boolean(project.video.src) && project.video.kind === "video";
  if (isLoop) {
    galleryItems.push({
      src: project.video.src,
      alt: `${project.name} — ${project.video.label}`,
    });
  }
  const gifIndex = isLoop ? galleryItems.length - 1 : -1;

  return (
    <ProjectGallery items={galleryItems} projectName={project.name}>
      {({ openAt, onEnter, onMove, onLeave }) => (
        <article>
          <div className="relative h-[62vh] min-h-[380px] bg-charcoal md:h-[78vh]">
            <ProjectGalleryTile
              frame={{ src: project.image, alt: project.imageAlt }}
              fill
              priority
              onOpen={() => openAt(0)}
              onEnter={onEnter}
              onMove={onMove}
              onLeave={onLeave}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-10 md:pb-14">
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
                      <dt className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-500 uppercase">
                        {fact.label}
                      </dt>
                      <dd className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em]">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="mt-12 max-w-3xl border-t border-n-300 pt-10">
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 uppercase">
                Brief
              </p>
              <p className="mt-4 text-[17px] leading-[1.7] text-n-700">{project.brief}</p>
              {project.sourceNote ? (
                <p className="mt-6 text-sm text-n-500">{project.sourceNote}</p>
              ) : null}
            </div>
          </section>

          <ProjectFrameGrid
            frames={project.frames}
            indexOffset={1}
            openAt={openAt}
            onEnter={onEnter}
            onMove={onMove}
            onLeave={onLeave}
          />

          {gifIndex >= 0 || isFilm ? (
            <section className="mx-auto w-full max-w-[1440px] px-6 py-14 md:px-10 md:py-20">
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 uppercase">
                {isLoop ? "Completion loop" : "Completion video"}
              </p>
              <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.03em]">
                Walk the finished room.
              </h2>
              {gifIndex >= 0 ? (
                <div className="mt-8">
                  <ProjectGalleryTile
                    frame={galleryItems[gifIndex]}
                    tall
                    onOpen={() => openAt(gifIndex)}
                    onEnter={onEnter}
                    onMove={onMove}
                    onLeave={onLeave}
                  />
                </div>
              ) : (
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
              )}
            </section>
          ) : project.video.poster ? (
            <section className="mx-auto w-full max-w-[1440px] px-6 py-14 md:px-10 md:py-20">
              <p className="font-display text-[12px] font-semibold tracking-[0.16em] text-n-500 uppercase">
                Selected view
              </p>
              <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.03em]">
                Walk the finished room.
              </h2>
              <div className="relative mt-8 aspect-video overflow-hidden bg-n-100">
                <Image
                  src={project.video.poster}
                  alt={`${project.name} — selected view`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1440px) 1360px, 100vw"
                />
              </div>
            </section>
          ) : null}

          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-6 px-6 py-8 md:px-10">
            <Link
              href="/projects"
              className="font-display text-sm font-semibold tracking-[0.08em] uppercase"
            >
              All work
            </Link>
            <Button href="/contact">Start a project like this</Button>
          </div>

          <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 md:px-10">
            <Link
              href={`/projects/${next.id}`}
              className="group relative block h-[58vh] min-h-[340px] overflow-hidden bg-charcoal"
            >
              <Image
                src={next.image}
                alt=""
                fill
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 1440px) 1360px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white md:p-10">
                <p className="font-display text-[12px] font-semibold tracking-[0.16em] uppercase text-white/70">
                  Next project
                </p>
                <p className="mt-2 font-display text-[clamp(28px,4vw,52px)] leading-none font-medium tracking-[-0.04em]">
                  {next.name}
                </p>
                <p className="mt-3 text-[14px] text-white/70">{next.location}</p>
              </div>
            </Link>
          </div>
        </article>
      )}
    </ProjectGallery>
  );
}
