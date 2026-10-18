"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectFilters, projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/cn";

export function ProjectIndex() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const visible = projects.filter((project) => filter === "All" || project.category === filter);

  return (
    <section className="bg-white pb-16 text-charcoal md:pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-10 md:px-10 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-[clamp(64px,10vw,128px)] leading-none font-medium tracking-[-0.05em]">
            WORK
          </h1>
          <p className="max-w-sm pb-2 text-[15px] leading-snug text-n-700">
            Case studies with location, timeline, brief, full image sets and completion video. More projects arrive as the client sends each one.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2" role="toolbar" aria-label="Filter projects">
          {projectFilters.map((item) => {
            const pressed = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(item)}
                className={cn(
                  "font-display text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors",
                  pressed ? "text-charcoal" : "text-n-500 hover:text-charcoal",
                )}
              >
                {pressed ? "● " : ""}
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-[1440px] px-6 md:mt-12 md:px-10">
        {visible.length === 0 ? (
          <p className="text-n-700">No studies in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {visible.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group min-w-0">
                <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[11px] font-semibold tracking-[0.16em] text-n-700 uppercase">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal" aria-hidden />
                  {project.name}
                  <span className="text-n-500">{project.location}</span>
                </p>
                <div className="relative aspect-[4/5] overflow-hidden bg-n-100">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                </div>
                <p className="mt-3 text-[14px] leading-snug text-n-700">{project.timeline}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
