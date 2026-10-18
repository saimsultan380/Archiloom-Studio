"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectFilters, projects, type Project, type ProjectCategory } from "@/data/projects";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Modal } from "@/components/Modal";
import { GreenBar, SectionLabel } from "@/components/SectionLabel";
import { cn } from "@/lib/cn";

export function Portfolio() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter((project) => filter === "All" || project.category === filter);
  const showOffset = filter === "All" && visible.length > 3;
  const firstRow = showOffset ? visible.slice(0, 3) : visible;
  const secondRow = showOffset ? visible.slice(3) : [];

  function card(project: Project) {
    return (
      <button
        type="button"
        className="project-card group block w-full text-left"
        onClick={() => {
          setCursor((current) => ({ ...current, visible: false }));
          setSelected(project);
        }}
        onMouseEnter={(event) => setCursor({ x: event.clientX, y: event.clientY, visible: true })}
        onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, visible: true })}
        onMouseLeave={() => setCursor((current) => ({ ...current, visible: false }))}
      >
        <div className="overflow-hidden border border-n-300">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 768px) 33vw, 84vw"
            />
          </div>
        </div>
        <p className="text-link mt-4 inline-block font-display text-[15px] font-medium">
          {project.name}. {project.location}
        </p>
      </button>
    );
  }

  return (
    <section id="work" className="bg-white py-16 md:py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel label="Work" />
            <h2 className="mt-4 font-display text-[clamp(56px,8vw,104px)] leading-[0.9] font-light tracking-[-0.045em]">
              We <span className="title-accent">create</span>
            </h2>
            <GreenBar />
          </div>
          <Link href="/projects" className="text-link mb-2 font-display text-sm font-semibold">
            See all projects →
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
          {projectFilters.map((item) => {
            const pressed = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(item)}
                className={cn(
                  "min-h-10 rounded-full border px-4 font-display text-[12px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300",
                  pressed ? "border-charcoal bg-charcoal text-white" : "border-n-300 bg-white text-charcoal hover:border-charcoal",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-n-700">Draft case studies seeded from Behance. Client photography and completion videos will replace them.</p>
        <div id="work-grid" className="mt-8">
          {visible.length === 0 ? (
            <p className="text-n-700">No studies in this category yet.</p>
          ) : (
            <>
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
                {visible.map((project) => (
                  <div key={project.id} className="w-[84%] shrink-0 snap-start">
                    {card(project)}
                  </div>
                ))}
              </div>
              <div className="hidden flex-col gap-14 md:flex">
                <div className="grid grid-cols-3 gap-8">{firstRow.map((project) => <div key={project.id}>{card(project)}</div>)}</div>
                {secondRow.length > 0 ? (
                  <div className="grid grid-cols-3 gap-8 pl-[7%]">
                    {secondRow.map((project) => (
                      <div key={project.id}>{card(project)}</div>
                    ))}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </Container>
      <div
        className="view-pill pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2"
        style={{ left: cursor.x, top: cursor.y, opacity: cursor.visible ? 1 : 0 }}
        aria-hidden
      >
        <span className="rounded-full bg-charcoal px-3 py-1.5 font-display text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
          View
        </span>
      </div>
      <Modal open={Boolean(selected)} title={selected?.name ?? "Project"} onClose={() => setSelected(null)}>
        {selected ? (
          <>
            <div className="relative aspect-[16/10] overflow-hidden border border-n-300">
              <Image src={selected.image} alt={selected.imageAlt} fill className="object-cover" sizes="720px" />
            </div>
            <p className="mt-5 font-display text-sm font-semibold tracking-[0.08em] text-n-700 uppercase">
              {selected.location} · {selected.timeline}
            </p>
            <p className="mt-3 text-[16px] leading-[1.6]">{selected.summary}</p>
            <div className="mt-8">
              <Button href={`/projects/${selected.id}`} onClick={() => setSelected(null)}>
                Open case study
              </Button>
              <Button href="/contact" variant="secondary" className="ml-3" onClick={() => setSelected(null)}>
                Start a Project
              </Button>
            </div>
          </>
        ) : null}
      </Modal>
    </section>
  );
}
