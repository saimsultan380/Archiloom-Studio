"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectFilters, projects, type ProjectCategory } from "@/data/projects";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { cn } from "@/lib/cn";

export function ProjectIndex() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const visible = projects.filter((project) => filter === "All" || project.category === filter);
  const [featured, ...rest] = visible;

  return (
    <>
      <PageHero
        label="Work"
        title={<>Selected <span className="title-accent">work</span></>}
        description="Illustrative studies for this design draft. Each one opens on its own page. Client photography will replace them."
        image="/images/glass-tower.jpg"
        imageAlt="Slender glass tower at dusk"
      />
      <section className="bg-white py-12 text-charcoal md:py-16">
        <Container>
          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
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
          {featured ? (
            <Link href={`/projects/${featured.id}`} className="group mt-10 block">
              <div className="relative aspect-[16/9] overflow-hidden border border-n-300 md:aspect-[16/8]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1280px) 1232px, 100vw"
                />
              </div>
              <div className="mt-6 flex items-end justify-between gap-6">
                <div>
                  <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-700 uppercase">{featured.category}</p>
                  <h2 className="mt-2 font-display text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.03em]">{featured.name}</h2>
                  <p className="mt-3 max-w-2xl text-[17px] leading-[1.6] text-n-700">{featured.summary}</p>
                </div>
                <ArrowUpRight className="mb-1 hidden h-8 w-8 shrink-0 text-signal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" strokeWidth={1.5} aria-hidden />
              </div>
            </Link>
          ) : (
            <p className="mt-10 text-n-700">No studies in this category yet.</p>
          )}
          <div className="mt-16">
            {rest.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group grid items-center gap-6 border-t border-n-300 py-8 md:grid-cols-12 md:gap-10 md:py-10"
              >
                <div className={cn("relative aspect-[16/10] overflow-hidden border border-n-300 md:col-span-7", index % 2 === 1 && "md:order-2")}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 55vw, 100vw"
                  />
                </div>
                <div className={cn("md:col-span-5", index % 2 === 1 && "md:order-1")}>
                  <p className="font-display text-[12px] font-semibold tracking-[0.14em] text-n-700 uppercase">{project.category}</p>
                  <h2 className="mt-3 font-display text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.03em]">{project.name}</h2>
                  <p className="mt-3 text-[16px] leading-[1.6] text-n-700">{project.summary}</p>
                  <p className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold">
                    View project
                    <ArrowUpRight className="h-4 w-4 text-signal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
